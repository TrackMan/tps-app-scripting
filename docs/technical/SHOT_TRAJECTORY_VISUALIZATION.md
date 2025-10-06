# Shot Trajectory Visualization Feature

## Overview

Added visual shot trajectory overlay that displays a line from the starting position to the finishing position of a golf shot, projected onto the hole layout image using Unity camera projection mathematics.

## Visual Result

When viewing a `ShotFinish` event with both `StartingPosition` and `FinishingPosition`:

```
┌──────────────────────────────────────────────┐
│ 🏌️  Adare Manor                              │
│     Hole 1 • Shot 1 • Player 1              │
│     ────────────────────────────────────     │
│     [  Hole Image with Trajectory  ]        │
│        ○━━━━━━━━━━━━━━━━━⦿                   │
│        ^                  ^                   │
│        Start              Finish              │
└──────────────────────────────────────────────┘
```

- **Orange line**: Shot trajectory
- **White circle with orange border**: Starting position
- **Orange target (bullseye)**: Finishing position

## Implementation

### 1. Projection Mathematics (`projectionUtils.ts`)

Implements the standard graphics pipeline for transforming 3D world coordinates to 2D pixel coordinates:

```typescript
// Pipeline: World → Camera → Clip → NDC → Pixel
World (x,y,z) 
  → Camera Space: c = V * w
  → Clip Space: q = P * c  
  → NDC: n = q/q.w
  → Pixel: (u, v)
```

#### Key Functions

**`loadHoleMetadata(metaDataUrl: string)`**
- Fetches and caches hole metadata JSON
- Contains `WorldToCameraMatrix` and `ProjectionMatrix`
- Returns: `HoleMetadata` with camera transforms

**`projectWorldToPixel(worldPos: Vector3, metadata: HoleMetadata)`**
- Transforms 3D Unity coordinate to 2D pixel coordinate
- Uses 4x4 matrix multiplication
- Returns: `PixelCoordinate` with x, y, percentages, and visibility flag

#### Matrix Mathematics

Unity provides matrices in column-major format:

```typescript
Matrix4x4 = [
  M00, M10, M20, M30,  // Column 0
  M01, M11, M21, M31,  // Column 1
  M02, M12, M22, M32,  // Column 2
  M03, M13, M23, M33   // Column 3
]
```

Matrix-vector multiplication for column vectors:

```typescript
result[row] = Σ(col=0 to 3) M[col*4 + row] * v[col]
```

#### Coordinate Transformation

1. **Homogeneous coordinates**: `w = [X, Y, Z, 1]`
2. **Camera space**: `c = WorldToCameraMatrix * w`
3. **Clip space**: `q = ProjectionMatrix * c`
4. **NDC (Normalized Device Coordinates)**: `ndc = q.xyz / q.w`
   - Range: [-1, 1] for x, y, z
5. **Pixel coordinates**:
   ```typescript
   u = (ndc.x * 0.5 + 0.5) * width
   v = (1 - (ndc.y * 0.5 + 0.5)) * height  // Y-flip for top-left origin
   ```

#### Metadata Cache

```typescript
const metadataCache = new Map<string, HoleMetadata>();
```

- Prevents redundant network requests
- Single fetch per unique `metaDataUrl`
- Cleared via `clearMetadataCache()`

### 2. Trajectory Overlay Component (`ShotTrajectoryOverlay.tsx`)

React component that renders hole image with SVG trajectory overlay.

#### Props

```typescript
interface Props {
  imageUrl: string;           // Hole image URL
  metaDataUrl: string;         // Metadata JSON URL
  startPosition?: Vector3;     // Starting position (Unity coords)
  finishPosition?: Vector3;    // Finishing position (Unity coords)
  imageWidth?: number;         // Optional image dimensions
  imageHeight?: number;
}
```

#### Rendering Logic

1. **Load metadata** on mount or when props change
2. **Project positions** to pixel coordinates
3. **Render image** as base layer
4. **Overlay SVG** with trajectory line and markers
5. **Handle errors** gracefully with status messages

#### SVG Structure

```tsx
<svg viewBox="0 0 {width} {height}" preserveAspectRatio="none">
  {/* Trajectory line */}
  <line x1={start.x} y1={start.y} x2={finish.x} y2={finish.y} 
        stroke="#ff7a00" strokeWidth="3" />
  
  {/* Start marker (white circle with orange border) */}
  <circle cx={start.x} cy={start.y} r="6" 
          fill="#ffffff" stroke="#ff7a00" strokeWidth="2" />
  
  {/* Finish marker (orange target with white center) */}
  <circle cx={finish.x} cy={finish.y} r="8" 
          fill="#ff7a00" stroke="#ffffff" strokeWidth="2" />
  <circle cx={finish.x} cy={finish.y} r="3" fill="#ffffff" />
</svg>
```

#### Error Handling

- **Metadata load fails**: Shows error message at bottom
- **Projection fails**: No trajectory drawn
- **Point off-image**: No trajectory drawn (only visible points)
- **Loading state**: Shows "Loading trajectory..." overlay

### 3. Banner Integration (`CourseInfoBanner.tsx`)

Updated to accept and display trajectory data:

#### New Props

```typescript
interface Props {
  // ... existing props
  startPosition?: Vector3;      // From ShotFinish event
  finishPosition?: Vector3;     // From ShotFinish event
}
```

#### Conditional Rendering

```tsx
// If we have trajectory data AND metadata, use overlay component
if (startPosition && finishPosition && metaDataUrl) {
  return (
    <ShotTrajectoryOverlay
      imageUrl={imageUrl}
      metaDataUrl={metaDataUrl}
      startPosition={startPosition}
      finishPosition={finishPosition}
    />
  );
}

// Otherwise, just show the static image
return <img src={imageUrl} alt={`Hole ${eventHole} layout`} />;
```

### 4. Data Flow (`WebhookInspector.tsx`)

Extracts trajectory data from events and passes to banner:

```typescript
// Extract trajectory data if this is a ShotFinish event
const payload = getEventModelPayload(selectedEvent);
const startPosition = payload?.StartingPosition;
const finishPosition = payload?.FinishingPosition;

<CourseInfoBanner 
  sessionData={sessionData}
  eventHole={changePlayerData?.hole}
  eventShot={changePlayerData?.shot}
  startPosition={startPosition}
  finishPosition={finishPosition}
/>
```

## Data Sources

### ShotFinish Event

From `server/src/events.ts`:

```typescript
export interface ShotFinishEvent extends BaseEvent {
  PlayerId: string;
  StartingLie?: string;
  StartingPosition?: Vector3;      // ← Source of start point
  StartingDistanceToPin?: number | null;
  FinishingLie?: string;
  FinishingPosition?: Vector3;     // ← Source of finish point
  FinishingDistanceToPin?: number | null;
  // ... measurement fields
}

export interface Vector3 {
  X: number;  // Unity world coordinates
  Y: number;
  Z: number;
}
```

### Hole Metadata

From GraphQL `GET_COURSE_INFORMATION` query:

```graphql
holes {
  holeNumber
  images {
    url           # Image URL
    metaDataUrl   # ← Metadata JSON URL
  }
}
```

### Metadata JSON Structure

```json
{
  "Width": 1280,
  "Height": 720,
  "FieldOfView": 50.0,
  "NearClipPlane": 0.3,
  "FarClipPlane": 1000.0,
  "Aspect": 1.7777,
  "ProjectionMatrix": {
    "M00": ..., "M01": ..., ..., "M33": ...
  },
  "WorldToCameraMatrix": {
    "M00": ..., "M01": ..., ..., "M33": ...
  }
}
```

## Visual Design

### Colors (TrackMan Orange)
- **Trajectory line**: `#ff7a00` (TrackMan orange)
- **Start marker**: White fill, orange border
- **Finish marker**: Orange fill, white border + center

### Styling
- **Line width**: 3px with rounded caps
- **Start marker**: 6px radius circle
- **Finish marker**: 8px outer + 3px inner (target pattern)
- **Opacity**: 0.9 for subtle blending

### Positioning
- **Relative container**: Maintains aspect ratio
- **Absolute SVG overlay**: Covers entire image
- **Pointer events none**: SVG doesn't block interactions
- **ViewBox**: Matches image pixel dimensions

## Performance

### Optimizations
1. **Metadata caching**: Single fetch per unique URL
2. **Async loading**: Non-blocking UI updates
3. **Cancelled requests**: Cleanup on unmount/prop changes
4. **Conditional rendering**: Only projects when data available

### Considerations
- **Metadata size**: ~1-2KB JSON per hole
- **Network requests**: One per unique hole metadata URL
- **Computation**: Matrix math is fast (~microseconds)
- **Re-renders**: Only when event changes

## Testing

### Test Scenarios

1. **ShotFinish with positions**:
   - Select ShotFinish event
   - Should see trajectory line and markers
   - Line connects start to finish accurately

2. **ShotFinish without positions**:
   - Some events may not have positions
   - Should fall back to plain image
   - No errors logged

3. **Missing metadata**:
   - If `metaDataUrl` is null
   - Should show plain image
   - No trajectory attempted

4. **Off-image positions**:
   - Positions outside image bounds
   - No trajectory drawn (filtered by `isVisible`)
   - Graceful degradation

5. **Metadata load error**:
   - Network failure or 404
   - Error message displayed at bottom
   - Console logs error details

### Manual Testing

```bash
# 1. Start simulator with course play
# 2. Hit a shot to generate ShotFinish event
# 3. Open webhook inspector
# 4. Click on ShotFinish event
# 5. Verify:
#    - Image loads
#    - Trajectory appears
#    - Markers positioned correctly
#    - Console shows projection logs
```

### Console Logs

```
[ShotTrajectory] Loading metadata from: https://...
[ShotTrajectory] Projecting start position: {X: 100, Y: 0, Z: 200}
[ShotTrajectory] Start pixel: {x: 450, y: 300, xPct: 0.35, yPct: 0.42, isVisible: true}
[ShotTrajectory] Projecting finish position: {X: 105, Y: 0, Z: 150}
[ShotTrajectory] Finish pixel: {x: 480, y: 250, xPct: 0.38, yPct: 0.35, isVisible: true}
```

## Edge Cases

### Missing Data
- ✅ No `StartingPosition` → No trajectory
- ✅ No `FinishingPosition` → No trajectory
- ✅ No `metaDataUrl` → Plain image only
- ✅ Hole not found → Plain image only

### Projection Issues
- ✅ Point not projectable (w ≈ 0) → Filtered out
- ✅ Point off-image → `isVisible: false`, no line drawn
- ✅ Both points off-image → No trajectory

### Network Issues
- ✅ Metadata 404 → Error message shown
- ✅ Metadata parse error → Error logged, graceful fallback
- ✅ Slow network → Loading indicator displayed

## Future Enhancements

### Potential Improvements

1. **Flight path arc**: Show ball flight curve (requires trajectory samples)
2. **Distance markers**: Show yardage along path
3. **Landing angle**: Indicate ball landing angle
4. **Multiple shots**: Overlay multiple shot paths on practice mode
5. **Animation**: Animate ball along trajectory
6. **Elevation data**: Show elevation changes on 3D terrain
7. **Wind indicators**: Display wind direction/strength
8. **Zoom/pan**: Interactive image exploration
9. **Shot statistics**: Overlay carry/total distances
10. **Replay mode**: Step through shot progression

### Technical Improvements

1. **Web Worker**: Offload matrix math to worker thread
2. **Lazy loading**: Only load metadata when image visible
3. **Progressive enhancement**: Show image immediately, add trajectory when ready
4. **Error recovery**: Retry failed metadata loads
5. **Telemetry**: Track projection accuracy and performance
6. **Unit tests**: Test matrix math and coordinate transforms
7. **E2E tests**: Automated visual regression testing

## Files Created/Modified

### New Files
- ✅ `src/utils/projectionUtils.ts` - Matrix math and projection utilities
- ✅ `src/components/ShotTrajectoryOverlay.tsx` - Trajectory rendering component
- ✅ `src/components/ShotTrajectoryOverlay.css` - Trajectory overlay styles
- ✅ `docs/technical/SHOT_TRAJECTORY_VISUALIZATION.md` - This documentation

### Modified Files
- ✅ `src/components/CourseInfoBanner.tsx` - Added trajectory props and conditional rendering
- ✅ `src/components/WebhookInspector.tsx` - Extract and pass trajectory data

### Existing Files (Unchanged)
- ℹ️ `src/graphql/queries.ts` - Already includes `metaDataUrl` in `GET_COURSE_INFORMATION`
- ℹ️ `server/src/events.ts` - Already defines `ShotFinishEvent` with positions
- ℹ️ `src/hooks/useActivitySessionState.ts` - Already fetches course data

## Related Documentation

- [Hole Image Display](./HOLE_IMAGE_DISPLAY.md) - Basic hole image rendering
- [Activity Session State](./ACTIVITY_SESSION_STATE.md) - Course info management
- [Shot Number Carry-Forward](./SHOT_NUMBER_CARRY_FORWARD_FIX.md) - Hole tracking

## Mathematics Reference

### Standard Graphics Pipeline

```
World Space (Unity coords)
    ↓ World→Camera Matrix (View Transform)
Camera Space
    ↓ Projection Matrix
Clip Space (homogeneous coords)
    ↓ Perspective Divide (÷w)
NDC (Normalized Device Coordinates: -1 to 1)
    ↓ Viewport Transform
Screen Space (pixels: 0 to width/height)
```

### Y-Axis Flip

Images have origin at top-left, but NDC has origin at center:
- NDC Y: -1 (bottom) to +1 (top)
- Pixel Y: 0 (top) to height (bottom)
- Transform: `v = (1 - (ndc.y * 0.5 + 0.5)) * height`

### Matrix4x4 Memory Layout

Unity/OpenGL column-major:
```
Index:  0  1  2  3    4  5  6  7    8  9 10 11   12 13 14 15
Matrix: [M00 M10 M20 M30 | M01 M11 M21 M31 | M02 M12 M22 M32 | M03 M13 M23 M33]
        └─ Column 0 ─┘   └─ Column 1 ─┘   └─ Column 2 ─┘   └─ Column 3 ─┘
```

---

**Added**: October 3, 2025
**Purpose**: Visualize shot trajectories on hole layout images
**Impact**: Enhanced understanding of shot paths and landing positions
**Dependencies**: Unity camera metadata, GraphQL course data, ShotFinish events
