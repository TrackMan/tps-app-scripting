/**
 * Migration Script: Backfill deviceId field for existing events in Azure Table Storage
 * 
 * This script reads all existing events from Azure Table Storage, extracts the deviceId
 * from the JSON payload, and updates the entity with the deviceId field for server-side filtering.
 * 
 * Usage:
 *   npm run migrate-device-ids
 * 
 * Or directly:
 *   npx tsx server/src/migrate-device-ids.ts
 */

import { TableClient, TableEntity } from '@azure/data-tables';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '../.env' });

interface WebhookEventEntity extends TableEntity {
  partitionKey: string;
  rowKey: string;
  eventType: string;
  timestamp: string;
  eventId?: string;
  deviceId?: string;
  data: string;
  raw: string;
  typed?: string;
  common?: string;
}

/**
 * Extract Device.Id from an event's JSON payload
 */
function extractDeviceId(entity: WebhookEventEntity): string | undefined {
  try {
    // Parse raw JSON
    const raw = JSON.parse(entity.raw);
    
    // Check common locations for Device.Id
    if (raw?.data?.Device?.Id) return raw.data.Device.Id;
    if (raw?.Device?.Id) return raw.Device.Id;
    
    // Try parsing data field if available
    if (entity.data) {
      try {
        const data = JSON.parse(entity.data);
        if (data?.Device?.Id) return data.Device.Id;
      } catch {
        // Ignore parse errors
      }
    }
    
    return undefined;
  } catch (err) {
    return undefined;
  }
}

async function migrateDeviceIds() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  
  if (!connectionString) {
    console.error('❌ AZURE_STORAGE_CONNECTION_STRING not set');
    console.error('   Please set it in server/.env file');
    process.exit(1);
  }

  const tableName = 'WebhookEvents';
  console.log(`\n🔄 Starting migration for table: ${tableName}\n`);

  try {
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    // Verify table exists
    try {
      await tableClient.createTable();
      console.log('✅ Table verified/created');
    } catch (err: any) {
      if (err?.statusCode === 409) {
        console.log('✅ Table exists');
      } else {
        throw err;
      }
    }

    // Fetch all entities
    console.log('\n📥 Fetching all events from Azure Table Storage...');
    const entities = tableClient.listEntities<WebhookEventEntity>();
    
    let totalCount = 0;
    let alreadyHasDeviceId = 0;
    let deviceIdFound = 0;
    let noDeviceId = 0;
    let updated = 0;
    let errors = 0;

    const updates: Array<{ entity: WebhookEventEntity; deviceId: string }> = [];

    // First pass: collect entities that need updating
    console.log('🔍 Scanning events...\n');
    for await (const entity of entities) {
      totalCount++;

      // Show progress every 100 events
      if (totalCount % 100 === 0) {
        process.stdout.write(`   Scanned ${totalCount} events...\r`);
      }

      // Skip if already has deviceId
      if (entity.deviceId) {
        alreadyHasDeviceId++;
        continue;
      }

      // Try to extract deviceId
      const deviceId = extractDeviceId(entity);
      
      if (deviceId) {
        deviceIdFound++;
        updates.push({ entity, deviceId });
      } else {
        noDeviceId++;
        if (noDeviceId <= 5) {
          // Log first few examples of events without deviceId
          console.log(`\n⚠️  No deviceId found for event: ${entity.eventType} (${entity.eventId || 'no-id'})`);
        }
      }
    }

    console.log(`\n\n📊 Scan Results:`);
    console.log(`   Total events: ${totalCount}`);
    console.log(`   Already have deviceId: ${alreadyHasDeviceId}`);
    console.log(`   Found deviceId to add: ${deviceIdFound}`);
    console.log(`   No deviceId available: ${noDeviceId}`);

    if (updates.length === 0) {
      console.log('\n✅ No updates needed. All events already have deviceId or cannot be migrated.');
      return;
    }

    // Ask for confirmation
    console.log(`\n❓ Proceed with updating ${updates.length} events? (y/n)`);
    
    // In non-interactive mode (CI/CD), auto-confirm
    const isInteractive = process.stdin.isTTY;
    if (!isInteractive) {
      console.log('   Non-interactive mode: proceeding automatically...');
    } else {
      // Wait for user input
      const answer = await new Promise<string>((resolve) => {
        process.stdin.once('data', (data) => {
          resolve(data.toString().trim().toLowerCase());
        });
      });

      if (answer !== 'y' && answer !== 'yes') {
        console.log('❌ Migration cancelled by user');
        return;
      }
    }

    // Second pass: update entities
    console.log(`\n🔄 Updating ${updates.length} events...\n`);
    
    for (let i = 0; i < updates.length; i++) {
      const { entity, deviceId } = updates[i];
      
      // Show progress
      if ((i + 1) % 50 === 0 || i === updates.length - 1) {
        process.stdout.write(`   Updated ${i + 1}/${updates.length} events...\r`);
      }

      try {
        // Update the entity with deviceId
        const updatedEntity: WebhookEventEntity = {
          ...entity,
          deviceId,
        };

        // Use updateEntity with 'Merge' mode to only update the deviceId field
        await tableClient.updateEntity(updatedEntity, 'Merge');
        updated++;
      } catch (err: any) {
        errors++;
        if (errors <= 5) {
          console.log(`\n❌ Error updating event ${entity.eventId || 'unknown'}: ${err?.message || err}`);
        }
      }
    }

    console.log(`\n\n✅ Migration Complete!\n`);
    console.log(`📊 Final Results:`);
    console.log(`   Total events scanned: ${totalCount}`);
    console.log(`   Successfully updated: ${updated}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Already had deviceId: ${alreadyHasDeviceId}`);
    console.log(`   Events without deviceId: ${noDeviceId}`);
    
    if (errors > 0) {
      console.log(`\n⚠️  ${errors} errors occurred during migration`);
    }

  } catch (err: any) {
    console.error('\n❌ Migration failed:', err?.message || err);
    process.exit(1);
  }
}

// Run migration
migrateDeviceIds()
  .then(() => {
    console.log('\n✨ Migration script finished\n');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Unexpected error:', err);
    process.exit(1);
  });
