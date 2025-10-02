import { TableClient, TableEntity } from '@azure/data-tables';
import { EventRecord } from './webhook';

// Azure Table Storage entity for webhook events
interface WebhookEventEntity extends TableEntity {
  partitionKey: string; // userPath
  rowKey: string; // timestamp_eventId for ordering
  eventType: string;
  timestamp: string;
  eventId?: string;
  data: string; // JSON stringified
  raw: string; // JSON stringified
  typed?: string; // JSON stringified (optional)
  common?: string; // JSON stringified (optional)
}

class WebhookEventStorage {
  private tableClient: TableClient | null = null;
  private enabled: boolean = false;
  private tableName = 'WebhookEvents';

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    
    if (!connectionString) {
      console.warn('AZURE_STORAGE_CONNECTION_STRING not set. Table Storage disabled. Events will only be stored in-memory.');
      return;
    }

    try {
      this.tableClient = TableClient.fromConnectionString(
        connectionString,
        this.tableName
      );

      // Ensure table exists
      await this.tableClient.createTable();
      this.enabled = true;
      console.log(`✅ Azure Table Storage initialized: ${this.tableName}`);
    } catch (err: any) {
      if (err?.statusCode === 409) {
        // Table already exists
        this.enabled = true;
        console.log(`✅ Azure Table Storage connected: ${this.tableName}`);
      } else {
        console.error('Failed to initialize Azure Table Storage:', err?.message || err);
        console.warn('Table Storage disabled. Events will only be stored in-memory.');
      }
    }
  }

  /**
   * Store an event in Azure Table Storage
   */
  async storeEvent(userPath: string, event: EventRecord): Promise<void> {
    if (!this.enabled || !this.tableClient) {
      return; // Silently skip if storage is disabled
    }

    try {
      // Create a unique RowKey: reverse timestamp for descending order + event ID
      // Using reverse timestamp (9999999999999 - timestamp) ensures newest events appear first
      const timestampMs = new Date(event.timestamp).getTime();
      const reverseTimestamp = (9999999999999 - timestampMs).toString().padStart(13, '0');
      const eventId = event.id || `${timestampMs}-${Math.random().toString(36).substr(2, 9)}`;
      const rowKey = `${reverseTimestamp}_${eventId}`;

      const entity: WebhookEventEntity = {
        partitionKey: userPath,
        rowKey,
        eventType: event.eventType,
        timestamp: event.timestamp,
        eventId: event.id,
        data: JSON.stringify(event.data),
        raw: JSON.stringify(event.raw),
        typed: event.typed ? JSON.stringify(event.typed) : undefined,
        common: event.common ? JSON.stringify(event.common) : undefined,
      };

      await this.tableClient.createEntity(entity);
    } catch (err: any) {
      // Don't fail the webhook if storage fails
      console.error(`Failed to persist event to Table Storage: ${err?.message || err}`);
    }
  }

  /**
   * Retrieve events for a webhook path with pagination
   */
  async getEvents(
    userPath: string,
    options: { limit?: number; continuationToken?: string } = {}
  ): Promise<{ events: EventRecord[]; continuationToken?: string }> {
    if (!this.enabled || !this.tableClient) {
      return { events: [] };
    }

    const limit = options.limit || 100;

    try {
      const entities = this.tableClient.listEntities<WebhookEventEntity>({
        queryOptions: {
          filter: `PartitionKey eq '${userPath}'`,
        },
      });

      const events: EventRecord[] = [];
      let count = 0;

      for await (const entity of entities) {
        if (count >= limit) break;

        try {
          events.push({
            id: entity.eventId,
            eventType: entity.eventType,
            timestamp: entity.timestamp,
            data: JSON.parse(entity.data),
            raw: JSON.parse(entity.raw),
            typed: entity.typed ? JSON.parse(entity.typed) : null,
            common: entity.common ? JSON.parse(entity.common) : null,
          });
          count++;
        } catch (parseErr) {
          console.warn('Failed to parse event from Table Storage:', parseErr);
        }
      }

      return { events };
    } catch (err: any) {
      console.error(`Failed to query events from Table Storage: ${err?.message || err}`);
      return { events: [] };
    }
  }

  /**
   * Delete all events for a webhook path
   */
  async deleteEvents(userPath: string): Promise<number> {
    if (!this.enabled || !this.tableClient) {
      return 0;
    }

    try {
      const entities = this.tableClient.listEntities<WebhookEventEntity>({
        queryOptions: {
          filter: `PartitionKey eq '${userPath}'`,
        },
      });

      let count = 0;
      const deletePromises: Promise<any>[] = [];

      for await (const entity of entities) {
        deletePromises.push(
          this.tableClient.deleteEntity(entity.partitionKey, entity.rowKey)
        );
        count++;

        // Batch deletes in groups of 50 to avoid overwhelming the API
        if (deletePromises.length >= 50) {
          await Promise.all(deletePromises);
          deletePromises.length = 0;
        }
      }

      // Delete remaining
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }

      console.log(`Deleted ${count} events from Table Storage for webhook ${userPath}`);
      return count;
    } catch (err: any) {
      console.error(`Failed to delete events from Table Storage: ${err?.message || err}`);
      return 0;
    }
  }

  /**
   * Get count of stored events for a webhook path
   */
  async getEventCount(userPath: string): Promise<number> {
    if (!this.enabled || !this.tableClient) {
      return 0;
    }

    try {
      const entities = this.tableClient.listEntities<WebhookEventEntity>({
        queryOptions: {
          filter: `PartitionKey eq '${userPath}'`,
        },
      });

      let count = 0;
      for await (const _ of entities) {
        count++;
      }

      return count;
    } catch (err: any) {
      console.error(`Failed to count events from Table Storage: ${err?.message || err}`);
      return 0;
    }
  }

  /**
   * Check if Table Storage is enabled and ready
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}

// Singleton instance
export const webhookEventStorage = new WebhookEventStorage();
