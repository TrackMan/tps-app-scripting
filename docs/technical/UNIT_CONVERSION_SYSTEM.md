# Unit Conversion System for Measurement Tiles

## Overview

The Measurement Tiles View now supports **automatic unit conversion** between Imperial and Metric systems with a toggle button. Data from the API arrives in **SI units** (meters, m/s, etc.) and is converted on-the-fly for display.

## Features

### ✅ Unit System Toggle
- **Imperial** (default): mph, yards, inches, degrees, rpm
- **Metric**: m/s, meters, centimeters, degrees, rpm
- Toggle button in the header
- Preference saved to localStorage

### ✅ Automatic Conversion

#### Speed (m/s ↔ mph)
- **SI Input**: meters per second (m/s)
- **Imperial**: mph (×2.23694)
- **Metric**: m/s (no conversion)
- **Applies to**: Ball Speed, Club Speed

#### Distance (meters ↔ yards)
- **SI Input**: meters (m)
- **Imperial**: yards (×1.09361)
- **Metric**: meters (no conversion)
- **Applies to**: Carry, Total, Carry Side, Total Side, Curve, Max Height

#### Height/Small Distances (meters ↔ inches/cm)
- **SI Input**: meters (m)
- **Imperial**: inches (×39.3701)
- **Metric**: centimeters (×100)
- **Applies to**: Impact Height, Impact Offset, Swing Radius, Low Point measurements

#### Angles (degrees)
- No conversion needed
- **Applies to**: Launch Angle, Attack Angle, Club Path, Face Angle, etc.

#### RPM & Time
- No conversion needed
- **Applies to**: Spin Rate (rpm), Hang Time (seconds)

#### Unitless Values
- No conversion needed
- **Applies to**: Smash Factor

## Usage

### For Users

1. Open a StrokeCompletedEvent in the Webhook tab
2. Look for the **Imperial/Metric** toggle buttons at the top
3. Click to switch between unit systems
4. Your preference is saved automatically

### For Developers

The conversion system is built into `MeasurementTilesView.tsx`:

```typescript
// Unit types
type UnitType = 'speed' | 'distance' | 'height' | 'angle' | 'rpm' | 'time' | 'none';

// Conversion function
const convertValue = (value: number, unitType: UnitType, toSystem: UnitSystem): number => {
  // Handles conversion based on unit type and target system
};

// Get unit label
const getUnitLabel = (unitType: UnitType, system: UnitSystem): string => {
  // Returns appropriate unit label (mph/m/s, yds/m, in/cm, etc.)
};
```

## Data Flow

```
1. API sends event with SI units:
   BallSpeed: 33.8 m/s
   Carry: 79.5 m
   ImpactHeight: -0.0023 m

2. Component receives raw SI values

3. User selects unit system:
   [Imperial] [Metric]
              ↓
4. convertValue() transforms values:
   Imperial:
     BallSpeed: 75.6 mph
     Carry: 86.9 yds
     ImpactHeight: -0.09 in
   
   Metric:
     BallSpeed: 33.8 m/s
     Carry: 79.5 m
     ImpactHeight: -0.23 cm

5. Tiles display converted values
```

## Conversion Factors

### Speed
```
m/s × 2.23694 = mph
mph ÷ 2.23694 = m/s
```

### Distance
```
meters × 1.09361 = yards
yards ÷ 1.09361 = meters
```

### Height
```
meters × 39.3701 = inches
meters × 100 = centimeters
```

## Configuration

### Adding New Measurement Types

To add a new measurement with conversion:

```typescript
// 1. Add to MEASUREMENT_TILES array
const MEASUREMENT_TILES: MeasurementTile[] = [
  // ...
  { 
    title: 'New Measurement',
    key: 'NewMeasurement',
    unitType: 'distance',  // Choose appropriate type
    precision: 1,
    category: 'YourCategory'
  },
];
```

### Customizing Conversion Factors

Edit the `unitConversions` object:

```typescript
const unitConversions = {
  speedToImperial: (ms: number) => ms * 2.23694,
  distanceToImperial: (m: number) => m * 1.09361,
  heightToImperial: (m: number) => m * 39.3701,
};
```

### Adjusting Precision

Each tile can have custom precision:

```typescript
{ title: 'Ball Speed', unitType: 'speed', precision: 1 },     // 75.6
{ title: 'Smash Factor', unitType: 'none', precision: 2 },    // 1.48
{ title: 'Impact Height', unitType: 'height', precision: 2 }, // -0.09
```

## Unit System Persistence

The selected unit system is saved to localStorage:

- **Key**: `measurementUnitSystem`
- **Values**: `'imperial'` or `'metric'`
- **Default**: `'imperial'`
- **Scope**: Per browser, persists across sessions

## Testing

### Test with Sample Data

```typescript
const testMeasurement = {
  BallSpeed: 33.8,      // m/s
  ClubSpeed: 22.8,      // m/s
  Carry: 79.5,          // meters
  Total: 86.4,          // meters
  ImpactHeight: -0.0023, // meters
  MaxHeight: 9.25,      // meters
  LaunchAngle: 10.3,    // degrees
  SpinRate: 2617,       // rpm
};
```

### Expected Results

**Imperial:**
- Ball Speed: 75.6 mph
- Club Speed: 51.0 mph
- Carry: 86.9 yds
- Total: 94.5 yds
- Impact Height: -0.09 in
- Max Height: 10.1 yds
- Launch Angle: 10.3°
- Spin Rate: 2617 rpm

**Metric:**
- Ball Speed: 33.8 m/s
- Club Speed: 22.8 m/s
- Carry: 79.5 m
- Total: 86.4 m
- Impact Height: -0.23 cm
- Max Height: 9.3 m
- Launch Angle: 10.3°
- Spin Rate: 2617 rpm

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Edge, Safari)
- ✅ localStorage support required
- ✅ Fallback to imperial if localStorage unavailable

## Future Enhancements

Possible improvements:

1. **More Unit Systems**: Add support for other regional systems
2. **Per-Category Units**: Mix and match units (e.g., mph with meters)
3. **Temperature**: Add temperature conversion for future data
4. **User Profiles**: Sync preferences across devices
5. **Quick Convert**: Tooltip showing both units on hover

## Files Modified

- ✅ `src/components/MeasurementTilesView.tsx` - Added conversion logic and toggle
- ✅ `src/components/MeasurementTilesView.css` - Styled toggle buttons

## API Assumptions

The component assumes API data is in SI units:
- ✅ Speed in m/s
- ✅ Distance in meters
- ✅ Small distances in meters (converted to in/cm)
- ✅ Angles in degrees
- ✅ Spin in rpm
- ✅ Time in seconds

If API format changes, update `convertValue()` function accordingly.
