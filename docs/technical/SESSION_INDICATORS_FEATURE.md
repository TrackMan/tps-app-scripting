# Session/Activity Visual Indicators

**Feature:** Colored dots to visually identify CustomerSession and ActivitySession groupings in webhook events

## Overview

Events in the webhook inspector now display two colored dots that help identify which events belong to the same session and activity. This makes it easy to visually group related events without reading session IDs.

## Visual Design

Each event shows up to two colored dots:

```
┌─────────────────────────────────────────┐
│ TPS.SessionInfo                         │
│ Oct 2, 2025, 3:45:12 PM                │
│ ● ●  ← Session indicators              │
│ ↑ ↑                                     │
│ │ └─ Activity Session (green)          │
│ └─── Customer Session (blue)           │
└─────────────────────────────────────────┘
```

### Dot Meanings

- **First dot (left):** CustomerSession
  - All events with the same CustomerSession.Id have the same color
  - A customer session can contain 0 or more activities
  
- **Second dot (right):** ActivitySession
  - All events with the same ActivitySession.Id have the same color
  - An activity is a subset of a customer session

### Color Assignment

Colors are automatically assigned from a palette of 10 distinct colors:
1. Blue (#3b82f6)
2. Green (#10b981)
3. Amber (#f59e0b)
4. Red (#ef4444)
5. Violet (#8b5cf6)
6. Pink (#ec4899)
7. Cyan (#06b6d4)
8. Orange (#f97316)
9. Lime (#84cc16)
10. Indigo (#6366f1)

Colors are assigned in order as new session IDs are encountered. If more than 10 sessions exist, colors cycle through the palette.

## Implementation

### Session ID Extraction

**File:** `src/components/WebhookInspector.tsx` (lines 5-32)

```typescript
const getSessionIds = (e: EventItem): { customerSessionId?: string; activitySessionId?: string } => {
  const raw = e.raw as any;
  const data = raw?.data || raw;
  
  // Extract CustomerSession.Id from various possible locations
  const customerSessionId = 
    data?.CustomerSession?.Id || 
    data?.common?.CustomerSession?.Id ||
    raw?.common?.CustomerSession?.Id;
  
  // Extract ActivitySession.Id from various possible locations
  const activitySessionId = 
    data?.ActivitySession?.Id || 
    data?.common?.ActivitySession?.Id ||
    raw?.common?.ActivitySession?.Id;
  
  return { customerSessionId, activitySessionId };
};
```

### Color Assignment Logic

**File:** `src/components/WebhookInspector.tsx` (lines 34-44)

```typescript
const getColorForId = (id: string | undefined, colorMap: Map<string, string>): string | null => {
  if (!id) return null;
  
  if (!colorMap.has(id)) {
    // Assign a color based on the current size of the map
    const colorIndex = colorMap.size % SESSION_COLORS.length;
    colorMap.set(id, SESSION_COLORS[colorIndex]);
  }
  
  return colorMap.get(id) || null;
};
```

### State Management

Color maps are stored in React refs to persist across renders:

```typescript
const customerSessionColors = React.useRef(new Map<string, string>()).current;
const activitySessionColors = React.useRef(new Map<string, string>()).current;
```

### Rendering

**File:** `src/components/WebhookInspector.tsx` (lines 291-320)

Each event extracts session IDs, gets colors, and renders dots:

```tsx
{filtered.map((e, idx) => {
  const { customerSessionId, activitySessionId } = getSessionIds(e);
  const customerColor = getColorForId(customerSessionId, customerSessionColors);
  const activityColor = getColorForId(activitySessionId, activitySessionColors);
  
  return (
    <li className="webhook-event-item">
      <div className="event-type">{e.eventType}</div>
      <div className="event-meta">{new Date(e.timestamp).toLocaleString()}</div>
      <div className="event-session-indicators">
        {customerColor && <div className="session-dot" style={{ backgroundColor: customerColor }} />}
        {activityColor && <div className="session-dot" style={{ backgroundColor: activityColor }} />}
      </div>
    </li>
  );
})}
```

### CSS Styling

**File:** `src/components/WebhookInspector.css`

```css
.event-session-indicators{
  display:flex;
  gap:6px;
  margin-top:6px;
  align-items:center
}

.session-dot{
  width:10px;
  height:10px;
  border-radius:50%;
  border:1px solid rgba(0,0,0,0.1)
}
```

## Usage Examples

### Single Session, Multiple Activities

```
Event 1: ● ●  (blue, green)   - Session A, Activity 1
Event 2: ● ●  (blue, green)   - Session A, Activity 1
Event 3: ● ●  (blue, amber)   - Session A, Activity 2
Event 4: ● ●  (blue, amber)   - Session A, Activity 2
```

All events share the same CustomerSession (blue dot), but activities 1 and 2 have different colors.

### Multiple Sessions

```
Event 1: ● ●  (blue, green)   - Session A, Activity 1
Event 2: ● ●  (blue, green)   - Session A, Activity 1
Event 3: ● ●  (amber, red)    - Session B, Activity 3
Event 4: ● ●  (amber, red)    - Session B, Activity 3
```

Different sessions have completely different color pairs.

### Events Without Sessions

If an event doesn't have CustomerSession or ActivitySession data, no dots are shown for those missing values:

```
Event 1: ●    (blue only)     - Has CustomerSession, no ActivitySession
Event 2:      (no dots)        - No session data
Event 3: ● ●  (blue, green)   - Both sessions present
```

## Tooltip Information

Hovering over a dot shows the actual session ID:

- **CustomerSession dot:** "Customer Session: a3b5c7d9-..."
- **ActivitySession dot:** "Activity Session: f1e2d3c4-..."

This helps when you need to reference the actual ID values.

## Benefits

✅ **Visual grouping** - Quickly identify related events without reading IDs  
✅ **Session boundaries** - Easily spot when a new session starts  
✅ **Activity transitions** - See when activities change within a session  
✅ **Pattern recognition** - Identify event sequences by color patterns  
✅ **Debugging** - Trace event flow through sessions and activities  

## Migration from Bay Display

**Previous:** Each event showed "Bay: X" text
**Now:** Events show session/activity colored dots

The bay information is still available in the event data when you select an event for preview. The session indicators provide more useful grouping information at a glance.

## Event Data Structure

Session IDs are extracted from the `common` metadata in webhook events:

```json
{
  "eventType": "TPS.SessionInfo",
  "data": {
    "common": {
      "CustomerSession": {
        "Id": "a3b5c7d9-e1f2-4a5b-8c9d-0e1f2a3b4c5d"
      },
      "ActivitySession": {
        "Id": "f1e2d3c4-b5a6-4c7d-8e9f-0a1b2c3d4e5f"
      }
    }
  }
}
```

Or from the root level:

```json
{
  "eventType": "TPS.Live.OnStrokeCompletedEvent",
  "common": {
    "CustomerSession": { "Id": "..." },
    "ActivitySession": { "Id": "..." }
  }
}
```

## Testing

1. **Send multiple events in the same session**
   - All should have the same CustomerSession dot color
   
2. **Start a new activity within the same session**
   - CustomerSession dot color stays the same
   - ActivitySession dot color changes
   
3. **Start a new customer session**
   - Both dot colors change
   
4. **Mix events with and without session data**
   - Events without session data show no dots
   - Events with partial session data show only relevant dots

## Future Enhancements

Potential improvements (not implemented):

1. **Legend** - Show all active sessions with their colors and IDs
2. **Filtering** - Click a dot to filter events by that session
3. **Custom colors** - Allow users to assign specific colors to known sessions
4. **Session stats** - Show event count per session
5. **Timeline view** - Visualize sessions on a timeline

## Related Files

- `src/components/WebhookInspector.tsx` - Main component logic
- `src/components/WebhookInspector.css` - Styling for dots
- `server/src/events.ts` - Event type definitions including CommonEventData
- `server/src/webhook.ts` - Server-side event extraction

## References

- Session/Activity metadata is defined in `server/src/events.ts` (lines 322-333)
- CustomerSession and ActivitySession are part of CommonEventData interface
