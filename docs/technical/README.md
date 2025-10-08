# Technical Documentation Index

> **Note for AI Assistants**: This folder contains technical documentation about features, fixes, and implementation details. Always check here for context about past work before making changes.

## 📁 Quick Navigation

### Core Features
- [Activity Session State](./ACTIVITY_SESSION_STATE.md) - Session state management across events
- [Measurement Tiles Multi-Event](./MEASUREMENT_TILES_MULTI_EVENT.md) - Multi-event support for measurement display
- [Unit Conversion System](./UNIT_CONVERSION_SYSTEM.md) - Imperial/Metric unit conversion
- [Device ID Filtering](./DEVICE_ID_FILTERING.md) - Device and bay filtering system
- [Session Indicators Feature](./SESSION_INDICATORS_FEATURE.md) - Visual session indicators
- [Hole Image Display](./HOLE_IMAGE_DISPLAY.md) - Visual hole layout images in course info banner
- [Shot Trajectory Visualization](./SHOT_TRAJECTORY_VISUALIZATION.md) - 3D→2D shot path overlay on hole images
- [Auto-Save Feature](./AUTO_SAVE_FEATURE.md) - Browser cache persistence to prevent data loss

### Bug Fixes & Improvements
- [Shot Number Carry-Forward Fix](./SHOT_NUMBER_CARRY_FORWARD_FIX.md) - Making hole/shot persist across events
- [Shot Number Fix](./SHOT_NUMBER_FIX.md) - Initial shot number display fix
- [Webhook Local Fix](./WEBHOOK_LOCAL_FIX.md) - Local development webhook setup
- [Fixed Dotenv Loading](./FIXED_DOTENV_LOADING.md) - Environment variable loading fix
- [SSE Fix](./SSE_FIX.md) - Server-Sent Events connection fix
- [SSE Azure Front Door Fix](./SSE_AZURE_FRONTDOOR_FIX.md) - Azure Front Door SSE compatibility

### Infrastructure & Setup
- [Local Azure Storage Setup](./LOCAL_AZURE_STORAGE_SETUP.md) - Local Azure Table Storage configuration
- [Azure Table Storage Setup](./AZURE_TABLE_STORAGE_SETUP.md) - Production Azure Table Storage setup
- [Azure Storage Quick Setup](./AZURE_STORAGE_QUICK_SETUP.md) - Quick Azure Storage configuration guide
- [Quick Fix Local Storage](./QUICK_FIX_LOCAL_STORAGE.md) - Quick local storage setup
- [Storage Implementation Summary](./STORAGE_IMPLEMENTATION_SUMMARY.md) - Overview of storage implementation
- [Fixed Webhook Summary](./FIXED_WEBHOOK_SUMMARY.md) - Webhook system overview

### Deployment & DevOps
- [Azure Deployment Setup](./AZURE_DEPLOYMENT_SETUP.md) - Azure Static Web App deployment configuration
- [Azure Front Door](./AZURE_FRONTDOOR.md) - Azure Front Door setup and configuration
- [Docker Deployment](./DOCKER_DEPLOYMENT.md) - Docker containerization and deployment
- [Deployment Fix](./DEPLOYMENT_FIX.md) - Deployment troubleshooting and fixes
- [Debugging Enhancement](./DEBUGGING_ENHANCEMENT.md) - Development debugging tools and features

### Component Documentation
- [Measurement Tiles View](./MEASUREMENT_TILES_VIEW.md) - MeasurementTilesView component documentation
- [Component Refactoring October 2025](./COMPONENT_REFACTORING_2025_10.md) - Dependency-based component reorganization
- [Documentation Organization](./DOCUMENTATION_ORGANIZATION_SUMMARY.md) - Documentation structure overview

---

## 📚 Documentation by Topic

### Event Handling & State Management

#### Activity Session State
**File**: [ACTIVITY_SESSION_STATE.md](./ACTIVITY_SESSION_STATE.md)

Manages shared state across events with the same `ActivitySession.Id`. Key features:
- Course information fetching via GraphQL
- Session-level data storage using `useRef`
- Automatic course detection for Course-type activities

**Key APIs**:
- `processSessionInfo(event)` - Extract activity info, fetch course data
- `getSessionData(activitySessionId)` - Retrieve session data
- `clearAllSessions()` - Cleanup

#### Shot Number Carry-Forward
**File**: [SHOT_NUMBER_CARRY_FORWARD_FIX.md](./SHOT_NUMBER_CARRY_FORWARD_FIX.md)

Ensures hole/shot information persists across all events between `ChangePlayer` events.

**Implementation**: Searches backward through event list to find most recent `ChangePlayer` event in the same session.

```typescript
findRecentChangePlayerData(event, eventsList) → { hole, shot, playerName }
```

**Use Case**: User clicks on `ShotFinish` event → Still shows "Hole 1 • Shot 1" from earlier `ChangePlayer`.

---

### Measurement Display

#### Multi-Event Support
**File**: [MEASUREMENT_TILES_MULTI_EVENT.md](./MEASUREMENT_TILES_MULTI_EVENT.md)

Displays measurement tiles for three event types:
1. **ShotStarting** - Shows limited initial data
2. **OnStrokeCompletedEvent** - Shows full measurement
3. **ShotFinish** - Merges measurement + actual values

**Data Merging**: `ShotFinish` searches forward through events to find previous `OnStrokeCompletedEvent` and merges its measurement data with actual values (CarryActual, TotalActual, etc.).

#### Unit Conversion
**File**: [UNIT_CONVERSION_SYSTEM.md](./UNIT_CONVERSION_SYSTEM.md)

Converts SI units (m/s, meters, radians) to Imperial/Metric for display.

**Features**:
- Toggle between systems (localStorage persistence)
- 28 measurement tiles + 5 "Actual" tiles
- Proper unit formatting (mph, yds, °, rpm)

**Conversion Factors**:
- Speed: m/s × 2.23694 = mph
- Distance: m × 1.09361 = yards
- Angles: radians × 180/π = degrees

---

### Filtering & Organization

#### Device/Bay Filtering
**File**: [DEVICE_ID_FILTERING.md](./DEVICE_ID_FILTERING.md)

Filters webhook events by Device ID or Bay ID from URL query parameters.

**URL Patterns**:
- `?deviceId=abc123` - Show only events from this device
- `?bayId=bay-1` - Show only events from this bay
- Toggle "Show All Events" to bypass filter

#### Session Indicators
**File**: [SESSION_INDICATORS_FEATURE.md](./SESSION_INDICATORS_FEATURE.md)

Visual colored dots indicating CustomerSession and ActivitySession groupings.

**Color Assignment**: Deterministic hash-based colors ensure same session always gets same color.

---

### Infrastructure & Deployment

#### Webhook System
**Files**: 
- [WEBHOOK_LOCAL_FIX.md](./WEBHOOK_LOCAL_FIX.md)
- [FIXED_WEBHOOK_SUMMARY.md](./FIXED_WEBHOOK_SUMMARY.md)

**Local Development**:
- Vite proxy: `localhost:5000` → `localhost:4000`
- Auto-detection of localhost vs. production
- Environment-specific API URLs

**Production**:
- Azure Table Storage for event persistence
- Server-Sent Events (SSE) for real-time updates
- Webhook endpoint receives TrackMan events

#### Azure Storage Setup
**Files**:
- [LOCAL_AZURE_STORAGE_SETUP.md](./LOCAL_AZURE_STORAGE_SETUP.md)
- [QUICK_FIX_LOCAL_STORAGE.md](./QUICK_FIX_LOCAL_STORAGE.md)
- [STORAGE_IMPLEMENTATION_SUMMARY.md](./STORAGE_IMPLEMENTATION_SUMMARY.md)

**Configuration**:
```bash
# server/.env
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;...
```

**Table Structure**:
- Table: `webhookEvents`
- PartitionKey: `userPath`
- RowKey: Event ID (timestamp + UUID)

#### Environment Variables
**File**: [FIXED_DOTENV_LOADING.md](./FIXED_DOTENV_LOADING.md)

**Issue**: Server wasn't loading `.env` file.

**Fix**: Added `dotenv` package and explicit config:
```typescript
dotenv.config({ path: path.join(__dirname, '../.env') });
```

#### Server-Sent Events (SSE)
**Files**:
- [SSE_FIX.md](./SSE_FIX.md)
- [SSE_AZURE_FRONTDOOR_FIX.md](./SSE_AZURE_FRONTDOOR_FIX.md)

**Issues Fixed**:
1. SSE connections not working locally
2. Azure Front Door buffering SSE responses

**Solutions**:
- Proper SSE headers and keep-alive
- Compression disabled for SSE endpoints
- Front Door rules to bypass buffering for `/stream` endpoints

---

## 🔍 Common Patterns

### Event List Ordering
**Important**: Events are ordered with **newest at index 0**.

To search backward in time:
```typescript
// Search forward through array (increasing indices) = older events
for (let i = currentIndex + 1; i < events.length; i++) {
  const olderEvent = events[i];
}
```

### Session Matching
Always check `ActivitySession.Id` when correlating events:
```typescript
const { activitySessionId } = getSessionIds(event);
if (prevSessionId === activitySessionId) {
  // Events belong to same session
}
```

### Data Extraction
Events have nested structures:
```typescript
const payload = event?.data?.EventModel || event?.EventModel || event;
```

---

## 🎯 Quick Reference for AI Assistants

### Before Making Changes

1. **Check session state** → [ACTIVITY_SESSION_STATE.md](./ACTIVITY_SESSION_STATE.md)
2. **Check event handling** → [MEASUREMENT_TILES_MULTI_EVENT.md](./MEASUREMENT_TILES_MULTI_EVENT.md)
3. **Check filtering** → [DEVICE_ID_FILTERING.md](./DEVICE_ID_FILTERING.md)
4. **Check recent fixes** → [SHOT_NUMBER_CARRY_FORWARD_FIX.md](./SHOT_NUMBER_CARRY_FORWARD_FIX.md)
5. **Check course display** → [HOLE_IMAGE_DISPLAY.md](./HOLE_IMAGE_DISPLAY.md)

### Event Types Reference

| Event Type | Has Measurement? | Has Hole/Shot? | Purpose |
|------------|------------------|----------------|---------|
| `TPS.SessionInfo` | ❌ | ❌ | Activity/Course info |
| `TPS.Simulator.ChangePlayer` | ❌ | ✅ | Hole/Shot/Player tracking |
| `TPS.Simulator.ShotStarting` | ✅ (limited) | ❌ | Initial shot data |
| `TPS.Live.OnStrokeCompletedEvent` | ✅ (full) | ❌ | Complete measurement |
| `TPS.Simulator.ShotFinish` | ✅ (merged + actuals) | ❌ | Final shot data |

### Key Files to Know

**Frontend**:
- `src/components/WebhookInspector.tsx` - Main event display
- `src/components/MeasurementTilesView.tsx` - Measurement tiles
- `src/components/CourseInfoBanner.tsx` - Course info display with hole images
- `src/hooks/useActivitySessionState.ts` - Session state hook
- `src/graphql/queries.ts` - GraphQL queries including course/hole data

**Backend**:
- `server/src/index.ts` - Express server, webhook endpoint
- `server/src/events.ts` - Event type definitions
- `server/.env` - Azure Storage connection string

---

## 📝 Adding New Documentation

When you create new technical documentation:

1. **Create file** in `docs/technical/`
2. **Use descriptive name**: `FEATURE_NAME.md` or `FIX_DESCRIPTION.md`
3. **Update this README** in the appropriate section
4. **Include**:
   - Problem statement
   - Solution approach
   - Code examples
   - Testing instructions

### Template Structure

```markdown
# Feature/Fix Title

## Problem
[What issue were we solving?]

## Solution
[How did we solve it?]

## Implementation
[Code examples and key changes]

## Files Modified
[List of changed files]

## Testing
[How to verify it works]

## Related Documentation
[Links to related docs]
```

---

## 🔄 Update History

- **2025-10-03**: Created technical docs folder and index
- **2025-10-03**: Added shot number carry-forward fix
- **2025-10-03**: Added activity session state management
- **2025-10-03**: Added measurement tiles multi-event support
- **2025-10-03**: Added unit conversion system
- **2025-10-03**: Added device/bay filtering
- **2025-10-03**: Added session indicators feature

---

## 💡 Tips for Future Work

### When Adding Features
1. Check if session state needs updating
2. Consider event ordering (newest at index 0)
3. Handle both initial load AND SSE updates
4. Test with device/bay filtering active

### When Fixing Bugs
1. Check if other events need same fix
2. Verify SSE and initial load paths
3. Test with and without Azure Storage
4. Document the fix in this folder

### When Refactoring
1. Read related docs first
2. Update docs after changes
3. Keep this index up to date
4. Preserve backward compatibility

---

**Last Updated**: October 3, 2025
**Maintained by**: Development team + AI assistants
