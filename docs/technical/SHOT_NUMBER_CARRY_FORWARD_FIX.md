# Shot Number Carry-Forward Fix

## Problem

Hole and shot information was only visible when viewing `TPS.Simulator.ChangePlayer` events. Other events between ChangePlayer events (like `ShotStarting`, `OnStrokeCompletedEvent`, `ShotFinish`) didn't show the hole/shot information, even though they logically belong to the same shot.

### Visual Example of the Issue

```
Timeline (newest to oldest):
┌─────────────────────────────────────────────────────────┐
│ Event 1: ChangePlayer (Hole: 1, Shot: 0)               │
│          Banner: "Hole 1 • Shot 1 • Player 1"          │
├─────────────────────────────────────────────────────────┤
│ Event 2: ShotStarting                                   │
│          Banner: Course info only (no hole/shot)       │
├─────────────────────────────────────────────────────────┤
│ Event 3: OnStrokeCompletedEvent                         │
│          Banner: Course info only (no hole/shot)       │
├─────────────────────────────────────────────────────────┤
│ Event 4: ShotFinish                                     │
│          Banner: Course info only (no hole/shot)       │
├─────────────────────────────────────────────────────────┤
│ Event 5: ChangePlayer (Hole: 1, Shot: 1)               │
│          Banner: "Hole 1 • Shot 2 • Player 1"          │
└─────────────────────────────────────────────────────────┘
```

### User Experience Impact

When navigating through events:
- Click on ChangePlayer → See hole/shot 
- Click on next event (ShotStarting) → Hole/shot disappears 
- Click on next event (OnStrokeCompletedEvent) → Still no hole/shot 
- Click on next event (ShotFinish) → Still no hole/shot 
- Click on next ChangePlayer → Hole/shot appears again 

This made it difficult to understand which hole/shot each event belonged to.

## Solution: Carry-Forward Pattern

Implemented a search algorithm that "carries forward" the hole/shot information from the most recent `ChangePlayer` event to all subsequent events in the same `ActivitySession`.

### How It Works

1. **User selects an event** to view
2. **Check if event has hole/shot data** (ChangePlayer events do)
   - If yes → Use that data
3. **If no hole/shot data**, search backward through time:
   - Start at current event index
   - Search forward through array (remember: newest at index 0)
   - Look for `TPS.Simulator.ChangePlayer` events
   - Must be in same `ActivitySession`
   - Extract `ActiveHole` and `ShotNumber` from first match
4. **Display the carried-forward data** in the banner

### Implementation

Added helper function `findRecentChangePlayerData()` in `WebhookInspector.tsx`:

```typescript
/**
 * Find the most recent ChangePlayer event before the given event in the same ActivitySession.
 * This allows us to display hole/shot info for all events between ChangePlayer events.
 */
const findRecentChangePlayerData = (event: EventItem, eventsList: EventItem[]) => {
  try {
    const { activitySessionId } = getSessionIds(event);
    if (!activitySessionId) return null;

    // First check if this event itself has the data
    const payload = getEventModelPayload(event);
    if (payload?.ActiveHole !== undefined && payload?.ShotNumber !== undefined) {
      return {
        hole: payload.ActiveHole,
        shot: payload.ShotNumber + 1, // Convert to 1-indexed
        playerName: payload.Name
      };
    }

    // Find current event index
    const currentIdx = eventsList.findIndex(e => e.id === event.id);
    if (currentIdx === -1) return null;

    // Search forward (to older events) for the most recent ChangePlayer in the same session
    for (let i = currentIdx + 1; i < eventsList.length; i++) {
      const prevEvent = eventsList[i];
      const { activitySessionId: prevSessionId } = getSessionIds(prevEvent);
      
      // Only look at events in the same ActivitySession
      if (prevSessionId !== activitySessionId) continue;
      
      if (prevEvent.eventType === 'TPS.Simulator.ChangePlayer') {
        const prevPayload = getEventModelPayload(prevEvent);
        if (prevPayload?.ActiveHole !== undefined && prevPayload?.ShotNumber !== undefined) {
          return {
            hole: prevPayload.ActiveHole,
            shot: prevPayload.ShotNumber + 1, // Convert to 1-indexed
            playerName: prevPayload.Name
          };
        }
      }
    }

    return null;
  } catch (err) {
    return null;
  }
};
```

### Usage in CourseInfoBanner

```typescript
// Find the most recent ChangePlayer data for this event
const changePlayerData = findRecentChangePlayerData(selectedEvent, filtered);

<CourseInfoBanner 
  sessionData={sessionData} 
  isLoading={sessionData.isLoadingCourse}
  eventHole={changePlayerData?.hole}
  eventShot={changePlayerData?.shot}
  eventPlayerName={changePlayerData?.playerName}
/>
```

## Result: Fixed User Experience

```
Timeline (newest to oldest):
┌─────────────────────────────────────────────────────────┐
│ Event 1: ChangePlayer (Hole: 1, Shot: 0)               │
│          Banner: "Hole 1 • Shot 1 • Player 1"          │
├─────────────────────────────────────────────────────────┤
│ Event 2: ShotStarting                                   │
│          Banner: "Hole 1 • Shot 1 • Player 1"          │
│          (carried forward from Event 1)                 │
├─────────────────────────────────────────────────────────┤
│ Event 3: OnStrokeCompletedEvent                         │
│          Banner: "Hole 1 • Shot 1 • Player 1"          │
│          (carried forward from Event 1)                 │
├─────────────────────────────────────────────────────────┤
│ Event 4: ShotFinish                                     │
│          Banner: "Hole 1 • Shot 1 • Player 1"          │
│          (carried forward from Event 1)                 │
├─────────────────────────────────────────────────────────┤
│ Event 5: ChangePlayer (Hole: 1, Shot: 1)               │
│          Banner: "Hole 1 • Shot 2 • Player 1"          │
└─────────────────────────────────────────────────────────┘
```

### New Behavior

When navigating through events:
- Click on ChangePlayer → See "Hole 1 • Shot 1" 
- Click on ShotStarting → Still see "Hole 1 • Shot 1" 
- Click on OnStrokeCompletedEvent → Still see "Hole 1 • Shot 1" 
- Click on ShotFinish → Still see "Hole 1 • Shot 1" 
- Click on next ChangePlayer → See "Hole 1 • Shot 2" 

**Every event now shows which hole/shot it belongs to!**

## Key Technical Details

### Event Array Ordering
- **Newest events** are at **index 0**
- **Older events** are at **higher indices**
- To search backward in time = search **forward** through array (i++)

### SessionId Matching
- Only carry forward data from events in the **same ActivitySession**
- Different sessions have different hole/shot progressions
- Prevents cross-contamination between different play sessions

### 0-Indexed to 1-Indexed Conversion
- API sends `ShotNumber: 0` for first shot
- UI displays "Shot 1" for better UX
- Conversion: `shot = ShotNumber + 1`

### Fallback Behavior
- If no ChangePlayer found → return `null`
- Banner won't show progress section
- Course info (name, description) still visible

## Testing

To verify the fix works:

1.  Refresh browser to load updated code
2.  Navigate to a course play activity with multiple events
3.  Click on a ChangePlayer event → Should show hole/shot
4.  Click on the next event (non-ChangePlayer) → Should STILL show same hole/shot
5.  Continue clicking through events → Hole/shot persists until next ChangePlayer
6.  Click on next ChangePlayer with new ShotNumber → Should update to new shot number
7.  Events after that should carry forward the NEW shot number

## Files Modified

1. **`src/components/WebhookInspector.tsx`**
   - Added `findRecentChangePlayerData()` helper function
   - Updated CourseInfoBanner render to use the helper
   - Searches backward through event list to find ChangePlayer

2. **`src/components/CourseInfoBanner.tsx`**
   - No changes needed (already accepts event-specific props)

3. **`src/hooks/useActivitySessionState.ts`**
   - No changes needed (session state only stores course info)

## Design Pattern: Temporal Context Search

This fix implements a common pattern for time-series event data:

**Pattern Name**: Temporal Context Carry-Forward

**When to use**: 
- Events in a stream don't all have the same fields
- Some events establish context (ChangePlayer sets hole/shot)
- Other events inherit that context (ShotFinish uses same hole/shot)
- Context changes periodically (new ChangePlayer updates hole/shot)

**Implementation**:
1. Identify "context-setting" events (ChangePlayer)
2. Identify "context-inheriting" events (all others)
3. When displaying an event, search backward to find most recent context
4. Display inherited context alongside event data

**Benefits**:
- No state mutation (search is done per-render)
- No session storage needed for transient data
- Always shows correct context for each event
- Works even if events are added/removed from list
