# Measurement Tiles Multi-Event Support

## Overview
Extended the MeasurementTilesView component to display measurement data for three related event types, with special handling for merging data from sequential events in CoursePlay mode.

## Supported Event Types

### 1. TPS.Simulator.ShotStarting
**When**: First event in CoursePlay sequence (shot begins)
**Data Available**: Limited launch parameters
- BallSpeed
- LaunchAngle
- LaunchDirection
- PlayerId
- StartingLie, StartingPosition, etc.

**Display**: Shows tiles for any available measurement fields

### 2. TPS.Live.OnStrokeCompletedEvent
**When**: 
- Standalone mode: Only this event fires
- CoursePlay mode: Second event in sequence (after ShotStarting)

**Data Available**: Full TrackMan measurement data (28+ parameters)
- Launch Data: BallSpeed, ClubSpeed, SmashFactor, LaunchAngle, LaunchDirection
- Club Data: AttackAngle, ClubPath, FaceAngle, FaceToPath, DynamicLoft
- Spin Data: SpinRate, SpinAxis, SpinLoft
- Distance Data: Carry, Total, CarrySide, TotalSide, Curve
- Trajectory: MaxHeight, HangTime, LandingAngle
- Impact: ImpactHeight, ImpactOffset
- Swing: SwingPlane, SwingRadius
- Low Point: LowPointDistance, LowPointHeight, LowPointSide

**Display**: Shows all available measurement tiles organized by category

### 3. TPS.Simulator.ShotFinish
**When**: Final event in CoursePlay sequence (shot lands on course)

**Data Available**: 
- All fields from the previous OnStrokeCompletedEvent (merged)
- Plus 5 additional "Actual" outcome fields from the simulator:
  - `Carry` → displays as "Carry Actual"
  - `Total` → displays as "Total Actual"
  - `Curve` → displays as "Curve Actual"
  - `Side` → displays as "Side Actual"
  - `SideTotal` → displays as "Total Side Actual"

**Display**: 
- Shows all measurement tiles from OnStrokeCompletedEvent
- Adds a new "On Course Data" category with the 5 Actual values

## Event Flow in CoursePlay

```
Time →
┌─────────────────┐    ┌──────────────────────────┐    ┌─────────────────────┐
│ ShotStarting    │ -> │ OnStrokeCompletedEvent   │ -> │ ShotFinish          │
├─────────────────┤    ├──────────────────────────┤    ├─────────────────────┤
│ • BallSpeed     │    │ • Full Measurement Data  │    │ • Previous Measure- │
│ • LaunchAngle   │    │ • 28+ TrackMan params    │    │   ment (merged)     │
│ • LaunchDir     │    │ • Categorized tiles      │    │ • + CarryActual     │
└─────────────────┘    └──────────────────────────┘    │ • + TotalActual     │
                                                        │ • + CurveActual     │
                                                        │ • + SideActual      │
                                                        │ • + SideTotalActual │
                                                        └─────────────────────┘
```

## Implementation Details

### MeasurementTilesView.tsx Changes

1. **Updated Measurement Interface**
   ```typescript
   interface Measurement {
     // ... existing 28+ fields
     
     // On-Course Actual values (from ShotFinish event)
     CarryActual?: number;
     TotalActual?: number;
     CurveActual?: number;
     SideActual?: number;
     SideTotalActual?: number;
   }
   ```

2. **Added New Tiles**
   ```typescript
   // On Course Data (Actual values from ShotFinish)
   { title: 'Carry Actual', key: 'CarryActual', unitType: 'distance', precision: 1, category: 'On Course Data' },
   { title: 'Total Actual', key: 'TotalActual', unitType: 'distance', precision: 1, category: 'On Course Data' },
   { title: 'Curve Actual', key: 'CurveActual', unitType: 'distance', precision: 1, category: 'On Course Data' },
   { title: 'Side Actual', key: 'SideActual', unitType: 'distance', precision: 1, category: 'On Course Data' },
   { title: 'Total Side Actual', key: 'SideTotalActual', unitType: 'distance', precision: 1, category: 'On Course Data' },
   ```

### WebhookInspector.tsx Changes

1. **Event Detection Function**
   ```typescript
   const isMeasurementEvent = (e: EventItem) => {
     return e.eventType === 'TPS.Live.OnStrokeCompletedEvent' || 
            e.eventType === 'TPS.Simulator.ShotStarting' ||
            e.eventType === 'TPS.Simulator.ShotFinish' ||
            e.eventType.includes('StrokeCompleted') ||
            e.eventType.includes('ShotStarting') ||
            e.eventType.includes('ShotFinish');
   };
   ```

2. **Enhanced getMeasurementData Function**
   - Handles all three event types
   - For ShotStarting: Builds minimal measurement object from available fields
   - For OnStrokeCompletedEvent: Returns full Measurement object
   - For ShotFinish: 
     - Searches backward in event history to find previous OnStrokeCompletedEvent
     - Merges that measurement data
     - Adds the 5 "Actual" fields from ShotFinish payload

3. **Data Merging Logic for ShotFinish**
   ```typescript
   // Find the most recent OnStrokeCompletedEvent before this event
   const currentIndex = filtered.findIndex(evt => evt === e);
   let strokeCompletedMeasurement: any = {};
   
   // Search backward from current event
   for (let i = currentIndex - 1; i >= 0; i--) {
     const prevEvent = filtered[i];
     if (prevEvent.eventType === 'TPS.Live.OnStrokeCompletedEvent') {
       const prevPayload = getEventModelPayload(prevEvent);
       if (prevPayload && prevPayload.Measurement) {
         strokeCompletedMeasurement = { ...prevPayload.Measurement };
         break;
       }
     }
   }
   
   // Add the "Actual" fields from ShotFinish
   if (payload.Carry !== undefined) strokeCompletedMeasurement.CarryActual = payload.Carry;
   // ... etc for all 5 fields
   ```

## Unit Conversion Support

All 5 new "Actual" fields support the Imperial/Metric toggle:
- **Imperial**: Yards (yds)
- **Metric**: Meters (m)

This matches the existing distance fields (Carry, Total, CarrySide, TotalSide, Curve).

## Display Categories

Tiles are organized into these categories (in order):
1. **Launch** - Ball/club speed, smash factor, launch angles
2. **Club** - Attack angle, club path, face angle, etc.
3. **Spin** - Spin rate, axis, loft
4. **Distance** - Carry, total, side distances, curve
5. **Trajectory** - Max height, hang time, landing angle
6. **Impact** - Impact height/offset
7. **Swing** - Swing plane, radius
8. **Low Point** - Low point distance/height/side
9. **On Course Data** - The 5 "Actual" values (only present in ShotFinish)

## Testing Scenarios

### Scenario 1: Standalone OnStrokeCompletedEvent
**Setup**: Drive Range / Practice mode (not CoursePlay)
**Expected**: 
- Only OnStrokeCompletedEvent fires
- Shows full measurement tiles
- No "On Course Data" category

### Scenario 2: CoursePlay Full Sequence
**Setup**: Playing a hole in CoursePlay mode
**Expected**: 
1. ShotStarting event shows minimal tiles (BallSpeed, LaunchAngle, LaunchDirection if available)
2. OnStrokeCompletedEvent shows all 28+ measurement tiles
3. ShotFinish shows:
   - All tiles from OnStrokeCompletedEvent
   - Plus 5 additional "Actual" tiles in "On Course Data" category

### Scenario 3: ShotFinish Without Previous OnStrokeCompletedEvent
**Setup**: Edge case - ShotFinish arrives but no previous OnStrokeCompletedEvent in history
**Expected**:
- Shows only the 5 "Actual" values in "On Course Data" category
- No other measurement data (graceful degradation)

## API Field Mapping

From `events.ts` interface definitions:

**ShotFinishEvent** fields mapped to "Actual" fields:
```typescript
export interface ShotFinishEvent extends BaseEvent {
  Carry?: number | null;        // → CarryActual
  Total?: number | null;         // → TotalActual
  Curve?: number | null;         // → CurveActual
  Side?: number | null;          // → SideActual
  SideTotal?: number | null;     // → SideTotalActual
  // ... other fields
}
```

**StrokeCompletedEvent** full measurement:
```typescript
export interface StrokeCompletedEvent {
  PlayerId: string;
  Measurement: Measurement;  // Full TrackMan measurement object
}
```

## Benefits

1. **Unified View**: Same UI component handles all three related event types
2. **Data Correlation**: ShotFinish merges with previous OnStrokeCompletedEvent to show complete picture
3. **Comparison**: Users can compare TrackMan measured values vs simulator actual outcomes
4. **Flexibility**: Works in both standalone and CoursePlay modes
5. **User-Friendly**: Automatic detection and display - no manual configuration needed

## Notes

- All "Actual" fields are optional and will only display if present in the ShotFinish event
- The backward search for OnStrokeCompletedEvent stops at the first match (most recent)
- If no previous OnStrokeCompletedEvent is found, ShotFinish will only show the "Actual" fields
- The component automatically filters out null/undefined values, so only available data is shown
- Unit conversion applies to all distance values consistently

## Future Enhancements

Possible improvements:
1. Add visual indicators to distinguish "Measured" vs "Actual" values
2. Show delta/difference between measured and actual values
3. Color-code tiles based on accuracy (green = close match, yellow = moderate difference, red = large difference)
4. Add tooltips explaining the difference between measured and actual values
5. Store event correlation metadata for better historical analysis
