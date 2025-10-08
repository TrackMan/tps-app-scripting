import { EventRecord } from './webhook';

/**
 * LRU Cache for webhook events per userPath (bay).
 * Provides fast initial load from memory while background-fetching from Azure Table Storage.
 */

interface CacheEntry {
  events: EventRecord[];
  timestamp: number;
  isStale: boolean; // True when we're fetching fresh data from storage
}

const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHED_PATHS = 50; // LRU eviction after 50 different bays
const MAX_EVENTS_PER_PATH = 500; // Keep last 500 events per bay in cache

export class WebhookEventCache {
  private cache: Map<string, CacheEntry> = new Map();
  private accessOrder: string[] = []; // For LRU tracking

  /**
   * Get cached events for a userPath (bay).
   * Returns immediately with cached data if available, null otherwise.
   */
  get(userPath: string): EventRecord[] | null {
    const entry = this.cache.get(userPath);
    
    if (!entry) {
      return null;
    }

    // Update access order for LRU
    this.updateAccessOrder(userPath);

    // Check if cache is expired
    const age = Date.now() - entry.timestamp;
    if (age > CACHE_EXPIRY_MS) {
      entry.isStale = true;
      console.log(`📦 Cache hit for ${userPath} but STALE (${(age / 1000).toFixed(1)}s old)`);
    } else {
      console.log(`📦 Cache hit for ${userPath} (${(age / 1000).toFixed(1)}s old, ${entry.events.length} events)`);
    }

    return entry.events;
  }

  /**
   * Store events in cache for a userPath.
   */
  set(userPath: string, events: EventRecord[]): void {
    // Limit events per path to prevent memory bloat
    const limitedEvents = events.slice(0, MAX_EVENTS_PER_PATH);

    this.cache.set(userPath, {
      events: limitedEvents,
      timestamp: Date.now(),
      isStale: false,
    });

    this.updateAccessOrder(userPath);
    this.evictLRU();

    console.log(`💾 Cached ${limitedEvents.length} events for ${userPath}`);
  }

  /**
   * Merge new events into existing cache.
   * Deduplicates by event ID and maintains chronological order (newest first).
   */
  merge(userPath: string, newEvents: EventRecord[]): void {
    const cached = this.cache.get(userPath);
    
    if (!cached) {
      // No cache exists, just set
      this.set(userPath, newEvents);
      return;
    }

    // Merge: deduplicate by event ID
    const existingIds = new Set(
      cached.events.map(e => e.id).filter(Boolean)
    );

    const uniqueNew = newEvents.filter(e => {
      if (!e.id) return true; // Keep events without ID
      return !existingIds.has(e.id);
    });

    if (uniqueNew.length === 0) {
      console.log(`📦 No new events to merge for ${userPath}`);
      // Refresh timestamp anyway
      cached.timestamp = Date.now();
      cached.isStale = false;
      return;
    }

    // Combine: newest first (newEvents should already be sorted)
    const merged = [...uniqueNew, ...cached.events];
    
    // Limit total events
    const limited = merged.slice(0, MAX_EVENTS_PER_PATH);

    this.cache.set(userPath, {
      events: limited,
      timestamp: Date.now(),
      isStale: false,
    });

    console.log(`🔄 Merged ${uniqueNew.length} new events for ${userPath} (total: ${limited.length})`);
  }

  /**
   * Check if cache entry is stale (needs refresh from storage).
   */
  isStale(userPath: string): boolean {
    const entry = this.cache.get(userPath);
    if (!entry) return true; // No cache = stale
    
    const age = Date.now() - entry.timestamp;
    return entry.isStale || age > CACHE_EXPIRY_MS;
  }

  /**
   * Mark a cache entry as stale (trigger background refresh).
   */
  markStale(userPath: string): void {
    const entry = this.cache.get(userPath);
    if (entry) {
      entry.isStale = true;
    }
  }

  /**
   * Clear cache for a specific userPath.
   */
  clear(userPath: string): void {
    this.cache.delete(userPath);
    this.accessOrder = this.accessOrder.filter(p => p !== userPath);
    console.log(`🗑️  Cleared cache for ${userPath}`);
  }

  /**
   * Clear all cached data.
   */
  clearAll(): void {
    this.cache.clear();
    this.accessOrder = [];
    console.log('🗑️  Cleared all webhook event cache');
  }

  /**
   * Get cache statistics for monitoring.
   */
  getStats() {
    const entries = Array.from(this.cache.entries());
    const totalEvents = entries.reduce((sum, [, entry]) => sum + entry.events.length, 0);
    const staleCount = entries.filter(([, entry]) => entry.isStale).length;

    return {
      cachedPaths: this.cache.size,
      totalEvents,
      stalePaths: staleCount,
      oldestCacheAge: entries.length > 0 
        ? Math.max(...entries.map(([, e]) => Date.now() - e.timestamp)) / 1000
        : 0,
    };
  }

  /**
   * Update LRU access order.
   */
  private updateAccessOrder(userPath: string): void {
    // Remove from current position
    this.accessOrder = this.accessOrder.filter(p => p !== userPath);
    // Add to end (most recently used)
    this.accessOrder.push(userPath);
  }

  /**
   * Evict least recently used entries if over limit.
   */
  private evictLRU(): void {
    while (this.cache.size > MAX_CACHED_PATHS) {
      const lru = this.accessOrder.shift();
      if (lru) {
        this.cache.delete(lru);
        console.log(`♻️  Evicted LRU cache for ${lru} (over ${MAX_CACHED_PATHS} paths)`);
      }
    }
  }
}

// Global singleton instance
export const webhookEventCache = new WebhookEventCache();
