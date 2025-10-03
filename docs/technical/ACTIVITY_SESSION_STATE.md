# Activity Session State Management

## Overview
This feature provides shared state management across webhook events that belong to the same `ActivitySession`. When events are grouped by their `ActivitySession.Id`, they can share contextual information extracted from the initial `TPS.SessionInfo` event.

## Key Components

### 1. Activity Session State Hook (`useActivitySessionState.ts`)
A custom React hook that manages state for activity sessions.

**Features:**
- Tracks activity session data (activity type, subtype, identifiers)
- Automatically fetches course information when a Course activity is detected
- Provides methods to query session data by ActivitySession ID

**API:**
```typescript
const {
  processSessionInfo,    // Process a SessionInfo event
  getSessionData,        // Get data for a specific session
  getAllSessions,        // Get all tracked sessions
  clearSession,          // Clear a specific session
  clearAllSessions      // Clear all sessions
} = useActivitySessionState();
```

### 2. Course Info Banner (`CourseInfoBanner.tsx`)
A visual component that displays course information in a prominent banner.

**Displays:**
- Course display name
- Difficulty level
- Description
- Number of holes
- Loading state while fetching course data

**Styling:**
- TrackMan orange gradient background
- Golf emoji icon
- Responsive layout

### 3. WebhookInspector Integration
The WebhookInspector component now:
- Processes `TPS.SessionInfo` events to extract activity information
- Displays course information banner for all events in a course play session
- Clears session state when events are cleared

## Event Flow

### Course Play Activity Detection

```
1. TPS.SessionInfo Event Arrives
   ↓
2. Extract ActivitySession.Id
   ↓
3. Check Activity.Type === 'Course'
   ↓
4. Get Activity.Identifier (course identifier)
   ↓
5. Query FIND_COURSE_ID GraphQL
   ↓
6. Query GET_COURSE_INFORMATION GraphQL
   ↓
7. Store course info in session state
   ↓
8. Display CourseInfoBanner for all events in this session
```

### Example SessionInfo Event Structure

```typescript
{
  eventType: "TPS.SessionInfo",
  data: {
    ActivitySession: {
      Id: "abc123..."
    },
    EventModel: {
      Activity: {
        Type: "Course",              // ← Triggers course lookup
        SubType: "VirtualGolf3",
        Identifier: "ballyneety_gc", // ← Course identifier
        Properties: {
          Course: "Ballyneety Golf Club",
          CourseVersion: "1.0"
        }
      },
      Players: [...],
      Language: "en",
      IsLocked: false
    }
  }
}
```

## GraphQL Queries Used

### FIND_COURSE_ID
Finds the course ID from a course identifier string.

```graphql
query FindCourseId($courseIdentifiers: String!) {
  courses(courseIdentifiers: [$courseIdentifiers]) {
    items {
      id
    }
  }
}
```

**Input:** `"ballyneety_gc"`
**Output:** `{ id: "Q291cnNlCmJhbGx5bmVldHlfZ2M=" }`

### GET_COURSE_INFORMATION
Retrieves detailed course information by ID.

```graphql
query GetCourseInformation($courseId: ID!) {
  node(id: $courseId) {
    ... on Course {
      displayName
      difficulty
      description 
      holes {
        holeNumber
        images {
          url
          metaDataUrl
        }
      }
    }
  }
}
```

**Output:**
```json
{
  "displayName": "Ballyneety Golf Club",
  "difficulty": "Championship",
  "description": "A challenging parkland course...",
  "holes": [
    {
      "holeNumber": 1,
      "images": [...]
    },
    ...
  ]
}
```

## Data Structure

### ActivitySessionData Interface
```typescript
interface ActivitySessionData {
  activitySessionId: string;      // Unique session identifier
  activityType?: string;           // "Course", "TPS", "Other"
  activitySubType?: string;        // "VirtualGolf3", "ShotAnalysis", etc.
  courseIdentifier?: string;       // e.g., "ballyneety_gc"
  courseInfo?: CourseInfo;         // Full course details (if loaded)
  isLoadingCourse?: boolean;       // Loading state
  timestamp: string;               // When session was first seen
}
```

### CourseInfo Interface
```typescript
interface CourseInfo {
  id: string;                      // GraphQL node ID
  displayName: string;             // "Ballyneety Golf Club"
  difficulty?: string;             // "Championship", "Resort", etc.
  description?: string;            // Course description
  holes?: Array<{                  // Hole information
    holeNumber: number;
    images: Array<{
      url: string;
      metaDataUrl?: string;
    }>;
  }>;
}
```

## Usage Example

### In a Component
```typescript
import { useActivitySessionState } from '../hooks/useActivitySessionState';

function MyComponent() {
  const { getSessionData } = useActivitySessionState();
  
  // Get course info for a specific event
  const handleEventClick = (event: EventItem) => {
    const { activitySessionId } = getSessionIds(event);
    if (activitySessionId) {
      const sessionData = getSessionData(activitySessionId);
      if (sessionData?.courseInfo) {
        console.log('Playing on:', sessionData.courseInfo.displayName);
      }
    }
  };
}
```

## Visual Display

When a course play activity is active, all events in that session will show a banner:

```
┌─────────────────────────────────────────────────────────┐
│ 🏌️  Ballyneety Golf Club                               │
│     Difficulty: CHAMPIONSHIP                            │
│     A challenging parkland course in County Limerick   │
│     18 holes                                            │
└─────────────────────────────────────────────────────────┘
```

## Benefits

1. **Contextual Information**: Every event in a course play session shows the course being played
2. **Automatic Enrichment**: No manual intervention needed - course info is fetched automatically
3. **Performance**: Course information is fetched once per session and cached
4. **User Experience**: Users immediately see what course is being played
5. **Extensible**: Can easily add more session-level data (weather, tournament info, etc.)

## Future Enhancements

Possible additions to the session state system:

1. **Player Information**: Track active players from SessionInfo
2. **Hole Tracking**: Show current hole number from ChangePlayer events
3. **Scoring**: Display running scores for course play
4. **Weather Conditions**: If available in session data
5. **Tournament Context**: For competitive play sessions
6. **Historical Session Replay**: Store and replay past sessions

## Console Logging

The system logs key operations for debugging:

```
[ActivitySession] Course detected: ballyneety_gc
[ActivitySession] Course ID query result: {...}
[ActivitySession] Course info query result: {...}
[ActivitySession] Course info loaded: Ballyneety Golf Club
```

## Error Handling

- If course ID lookup fails, the session continues without course info
- GraphQL errors are logged to console but don't break the event flow
- Loading state shown while fetching to provide feedback
- Missing or invalid SessionInfo events are silently ignored

## Performance Considerations

- Course information is fetched asynchronously (doesn't block event rendering)
- Data is cached per ActivitySession (fetched only once per session)
- State stored in ref (doesn't trigger re-renders when updated)
- GraphQL queries are optimized to fetch only needed fields

## Testing

To test this feature:

1. Start a course play activity in the simulator
2. Open the Webhook tab in the editor
3. Look for TPS.SessionInfo event - should trigger course lookup
4. Subsequent events (ShotStarting, ShotFinish, etc.) should show the course banner
5. Check browser console for activity session logs
