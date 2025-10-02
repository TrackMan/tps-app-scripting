# Device ID Filtering Implementation

## Summary
Updated webhook event filtering to use Device ID from events instead of Bay ID. This allows filtering webhook events based on the device that generated them, matching the `deviceId` field from the GraphQL bay query.

## Changes Made

### 1. GraphQL Query Update
**File: `src/graphql/queries.ts`**
- Updated `BAYS_IN_LOCATION_QUERY` to include `deviceId` field for SimulatorBay type
- Query now returns: `id`, `dbId`, `name`, and `deviceId`

### 2. Bay Interface Update
**File: `src/App.tsx`**
- Added optional `deviceId?: string` field to the `Bay` interface
- This allows the bay object to carry the device ID throughout the application

### 3. Event Filtering Logic
**File: `src/components/WebhookInspector.tsx`**

#### Replaced Function:
- **Old:** `getBayIdFromEvent(e: EventItem)` - extracted Bay.Id from events
- **New:** `getDeviceIdFromEvent(e: EventItem)` - extracts Device.Id from events

#### New Function Implementation:
```typescript
const getDeviceIdFromEvent = (e: EventItem) => {
  try {
    const raw = e.raw as any;
    const data = e.data as any;
    // Check for Device.Id in various locations
    if (raw && raw.data && raw.data.Device && raw.data.Device.Id) return raw.data.Device.Id;
    if (raw && raw.Device && raw.Device.Id) return raw.Device.Id;
    if (data && data.Device && data.Device.Id) return data.Device.Id;
    return null;
  } catch (err) {
    return null;
  }
};
```

#### Props Interface Update:
- **Old:** `selectedBayDbId?: number | null`
- **New:** `selectedDeviceId?: string | null`

#### Filtering Logic:
- Updated SSE message filtering to match Device ID from events with selected bay's deviceId
- Updated `filtered` useMemo to use Device ID comparison
- Updated "Show All Events" button visibility condition

### 4. WebhookView Component
**File: `src/components/WebhookView.tsx`**
- Updated `WebhookViewProps` interface: `selectedDeviceId?: string | null`
- Updated component to receive and pass `selectedDeviceId` to WebhookInspector
- Changed prop from `selectedBayDbId` to `selectedDeviceId`

### 5. Routes Component
**File: `src/app/Routes.tsx`**
- Updated WebhookView instantiation:
  - **Old:** `<WebhookView selectedBayDbId={selectedBayObj?.dbId ?? null} />`
  - **New:** `<WebhookView selectedDeviceId={selectedBayObj?.deviceId ?? null} />`

## Event Data Structure

### Device ID Location in Events
According to `server/src/events.ts`, the Device ID is found in the common event data:

```typescript
export interface CommonEventData {
  Facility?: FacilityRef;
  Location?: LocationRef;
  Bay?: BayRef;
  Client?: ClientInfo;
  Device?: DeviceRef;  // <-- Device.Id is here
  Radar?: RadarInfo;
  User?: UserRef;
  CustomerSession?: SessionRef;
  ActivitySession?: SessionRef;
}

export interface DeviceRef { 
  Id?: string;  // <-- The Device ID
}
```

### Example Event Structure
From `server/examples/events/TPS.SessionInfo.5.json`:
```json
{
  "data": {
    "Device": {
      "Id": "1d1d211b-981e-4ff4-907c-fc22f776358c"
    },
    "Bay": {
      "Id": "e9acfb8b-6ddd-45ac-9d5b-f23e51b1fe2d",
      "Name": "JFE Office"
    }
  }
}
```

## How It Works

1. **Bay Selection:** User selects a bay from the dropdown in the UI
2. **Device ID Retrieved:** The selected bay object includes its `deviceId` from the GraphQL query
3. **Event Filtering:** When webhook events arrive via SSE:
   - Extract `Device.Id` from the event's common data
   - Compare it with the selected bay's `deviceId`
   - Only show events where Device IDs match
4. **Real-time Updates:** Events are filtered in real-time as they arrive via Server-Sent Events

## Benefits

1. **Accurate Filtering:** Matches events to bays based on the actual device that generated them
2. **Direct Mapping:** Uses the device identifier that's consistently present in both:
   - Event data (Device.Id)
   - Bay configuration (deviceId from GraphQL)
3. **Future-Proof:** Works with the device-centric architecture of the TrackMan system

## Testing

To verify the changes work correctly:

1. Select a bay from the dropdown
2. Generate events from that bay's device
3. Verify that only events from that device appear in the webhook inspector
4. Switch to a different bay and verify filtering updates correctly
5. Use "Show All Events" toggle to see events from all devices

## Notes

- The `selectedBayId` prop is still supported as a fallback for backward compatibility
- Device IDs are GUIDs/UUIDs in the format: `1d1d211b-981e-4ff4-907c-fc22f776358c`
- Bay IDs are also GUIDs but represent the bay itself, not the device
- This change aligns with the fact that devices can be associated with different bays over time
