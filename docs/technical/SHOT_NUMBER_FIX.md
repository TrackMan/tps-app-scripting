# Shot Number Display Fix

## Issues Identified

### Issue 1: Course Name and Description Not Showing
**Problem**: Course name and description were still in the code but might not have been visible due to timing or data loading issues.

**Resolution**: Course info display was actually correct in the code. The issue was likely related to session state overwriting or data not being properly loaded.

### Issue 2: Shot Number Static Across All Events
**Problem**: The shot number was being stored at the **session level** (shared state), so all events in the same ActivitySession showed the same shot number (the latest one). This was incorrect because each event has its own `ShotNumber` value that increases over time.

**Example of the problem**:
- Event 1: ChangePlayer with ShotNumber: 0 → Displayed "Shot 1" ✓
- Event 2: ChangePlayer with ShotNumber: 1 → Updates session state to "Shot 2"
- **Bug**: Event 1 now also shows "Shot 2" because they share session state ✗

## Solution

Changed from **session-level storage** to **event-level extraction**:

### Before (Incorrect Approach)
```typescript
// Session state stored hole/shot for the entire session
interface ActivitySessionData {
  currentHole?: number;      // ❌ Session-level (all events show same value)
  currentShot?: number;      // ❌ Session-level (all events show same value)
  currentPlayerName?: string;
}

// processChangePlayer() updated session state
// All events in session showed the latest hole/shot
```

### After (Correct Approach)
```typescript
// Session state only stores shared data (course info)
interface ActivitySessionData {
  courseInfo?: CourseInfo;   // ✓ Truly session-level (shared across events)
  isLoadingCourse?: boolean;
  // NO hole/shot/player - these are event-specific
}

// Extract hole/shot from each individual event when displaying
const payload = getEventModelPayload(selectedEvent);
const eventHole = payload?.ActiveHole;
const eventShot = payload?.ShotNumber !== undefined 
  ? payload.ShotNumber + 1  // Convert 0-indexed to 1-indexed
  : undefined;
const eventPlayerName = payload?.Name;
```

## Changes Made

### 1. `useActivitySessionState.ts`
- ✅ Removed `currentHole`, `currentShot`, `currentPlayerName` from `ActivitySessionData` interface
- ✅ Removed `processChangePlayer()` function entirely
- ✅ Session state now only stores truly shared data (course information)

### 2. `CourseInfoBanner.tsx`
- ✅ Added optional props: `eventHole`, `eventShot`, `eventPlayerName`
- ✅ Component now displays event-specific data passed as props
- ✅ Course name, description, difficulty, holes count still displayed (never removed)
- ✅ Progress section (Hole X • Shot Y • Player Name) uses event-specific props

### 3. `WebhookInspector.tsx`
- ✅ Removed all `processChangePlayer()` calls (initial load and SSE)
- ✅ Removed `processChangePlayer` from hook destructuring
- ✅ Updated `CourseInfoBanner` render to extract hole/shot/player from event:
  ```typescript
  const payload = getEventModelPayload(selectedEvent);
  const eventHole = payload?.ActiveHole;
  const eventShot = payload?.ShotNumber !== undefined ? payload.ShotNumber + 1 : undefined;
  const eventPlayerName = payload?.Name;
  
  <CourseInfoBanner 
    sessionData={sessionData} 
    eventHole={eventHole}
    eventShot={eventShot}
    eventPlayerName={eventPlayerName}
  />
  ```
- ✅ Updated condition to show banner when `courseInfo` or `isLoadingCourse` is present

## How It Works Now

### For Each Event:
1. **Session-level data** (course info) is loaded once per ActivitySession
   - Course ID fetched via GraphQL
   - Course name, description, difficulty loaded
   - Stored in session state and reused for all events in that session

2. **Event-level data** (hole/shot/player) is extracted from each event
   - `ActiveHole` - which hole (1, 2, 3, etc.)
   - `ShotNumber` - which shot (0-indexed in API, converted to 1-indexed for display)
   - `Name` - player name
   - These values are different for each event and extracted on-demand

### Display Behavior:
- **Event 1**: ChangePlayer (ActiveHole: 1, ShotNumber: 0)
  - Banner shows: "Course Name" + "Hole 1 • Shot 1 • Player 1"
  
- **Event 2**: ChangePlayer (ActiveHole: 1, ShotNumber: 1)
  - Banner shows: "Course Name" + "Hole 1 • Shot 2 • Player 1"
  
- **Event 3**: ShotFinish (no ActiveHole/ShotNumber)
  - Banner shows: "Course Name" only (no progress section)

## Testing

To verify the fix:

1. ✅ Refresh browser to load updated code
2. ✅ Click on different events in the same ActivitySession
3. ✅ Each event should show its own hole/shot number
4. ✅ Course name and description should always be visible (when available)
5. ✅ ShotNumber 0 displays as "Shot 1", ShotNumber 1 as "Shot 2", etc.

## Key Insight

**The bug was a conceptual error**: We treated hole/shot as "session state" (shared across all events), but they're actually **event-specific metadata** that changes with each event. The fix extracts this data from each event individually rather than storing it at the session level.

Session state should only contain data that is truly shared across all events in the session:
- ✅ Course information (same for all events in a course play session)
- ✅ Activity type/subtype (same for all events in the session)
- ❌ Hole/shot/player (changes event-to-event, should be extracted per event)
