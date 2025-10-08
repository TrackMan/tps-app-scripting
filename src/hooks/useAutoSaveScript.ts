import { useEffect, useRef } from 'react';
import { ScriptData } from '../types';

const AUTOSAVE_KEY = 'app-scripting-autosave';
const AUTOSAVE_DELAY_MS = 500; // Debounce delay - 500ms after last change

interface AutoSaveMetadata {
  script: ScriptData;
  timestamp: number;
  version: string;
}

/**
 * Custom hook to automatically save script to localStorage with debouncing.
 * Saves asynchronously to avoid blocking the UI.
 * 
 * @param script - Current script state to auto-save
 * @param enabled - Whether auto-save is enabled (default: true)
 */
export function useAutoSaveScript(script: ScriptData, enabled: boolean = true) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Check if script actually changed (avoid unnecessary saves)
    const currentScriptString = JSON.stringify(script);
    if (currentScriptString === lastSavedRef.current) {
      return;
    }

    // Debounce: wait for user to stop making changes
    saveTimeoutRef.current = setTimeout(() => {
      // Use requestIdleCallback if available for better performance
      const saveToStorage = () => {
        try {
          const metadata: AutoSaveMetadata = {
            script,
            timestamp: Date.now(),
            version: '1.0.0',
          };
          
          localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(metadata));
          lastSavedRef.current = currentScriptString;
          
          console.log('📝 Script auto-saved to browser cache');
        } catch (error) {
          console.error('Failed to auto-save script:', error);
          // Handle quota exceeded error gracefully
          if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            console.warn('⚠️ localStorage quota exceeded. Consider clearing old data.');
          }
        }
      };

      // Use requestIdleCallback for non-blocking save
      if ('requestIdleCallback' in window) {
        requestIdleCallback(saveToStorage, { timeout: 1000 });
      } else {
        // Fallback to immediate save
        saveToStorage();
      }
    }, AUTOSAVE_DELAY_MS);

    // Cleanup on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [script, enabled]);
}

/**
 * Load auto-saved script from localStorage.
 * Returns null if no auto-save exists or if it's invalid.
 */
export function loadAutoSavedScript(): ScriptData | null {
  try {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (!saved) return null;

    const metadata: AutoSaveMetadata = JSON.parse(saved);
    
    // Validate the saved data
    if (!metadata.script || !metadata.script.activities) {
      console.warn('Invalid auto-saved script data');
      return null;
    }

    const ageInHours = (Date.now() - metadata.timestamp) / (1000 * 60 * 60);
    console.log(`📂 Found auto-saved script from ${ageInHours.toFixed(1)} hours ago`);
    
    return metadata.script;
  } catch (error) {
    console.error('Failed to load auto-saved script:', error);
    return null;
  }
}

/**
 * Clear auto-saved script from localStorage.
 */
export function clearAutoSavedScript(): void {
  try {
    localStorage.removeItem(AUTOSAVE_KEY);
    console.log('🗑️ Auto-saved script cleared');
  } catch (error) {
    console.error('Failed to clear auto-saved script:', error);
  }
}

/**
 * Check if an auto-saved script exists.
 */
export function hasAutoSavedScript(): boolean {
  try {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    return saved !== null;
  } catch {
    return false;
  }
}
