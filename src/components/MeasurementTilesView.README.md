# Measurement Tiles View

## Overview
The Measurement Tiles View provides a TrackMan-style visual display for shot measurement data from `StrokeCompletedEvent` events. Instead of showing raw JSON data, measurements are displayed in an organized grid of tiles similar to the TrackMan display interface.

## Features

### Visual Display
- **Tile-based Layout**: Each measurement parameter is displayed in its own tile
- **Three-part Tile Design**:
  - **Title** (top): Parameter name in uppercase
  - **Value** (middle): Large, prominent numerical value
  - **Unit** (bottom): Measurement unit (mph, °, yds, etc.)

### Organization
Measurements are grouped into logical categories:
- **Launch**: Ball Speed, Club Speed, Smash Factor, Launch Angle, Launch Direction
- **Club**: Attack Angle, Club Path, Face Angle, Face to Path, Dynamic Loft
- **Spin**: Spin Rate, Spin Axis, Spin Loft
- **Distance**: Carry, Total, Carry Side, Total Side, Curve
- **Trajectory**: Max Height, Hang Time, Landing Angle
- **Impact**: Impact Height, Impact Offset
- **Swing**: Swing Plane, Swing Radius
- **Low Point**: Low Point Distance, Low Point Height, Low Point Side

### Smart Filtering
- Only displays tiles for measurements that have valid data
- Automatically hides missing or null values
- Shows player ID when available

## Usage

### In WebhookInspector
The tiles view is automatically used when viewing `TPS.Live.OnStrokeCompletedEvent` events:

1. Navigate to the **Webhook** tab
2. Select a bay/location to filter events
3. Click on any `TPS.Live.OnStrokeCompletedEvent` in the events list
4. The preview pane will show the measurement tiles instead of JSON

### Component API

```typescript
import MeasurementTilesView from './MeasurementTilesView';

<MeasurementTilesView 
  measurement={measurementData}
  playerId="optional-player-id"
/>
```

**Props:**
- `measurement` (required): The Measurement object containing shot data
- `playerId` (optional): Player ID to display above the tiles

## Styling

The tiles are styled to match TrackMan's visual design:
- Clean white tiles with subtle shadows
- Hover effect: tiles lift slightly on hover
- Responsive grid layout adapts to screen size
- Category sections with clear headers
- Professional color scheme with good contrast

## Customization

To modify which measurements are displayed or their formatting, edit the `MEASUREMENT_TILES` array in `MeasurementTilesView.tsx`:

```typescript
const MEASUREMENT_TILES: MeasurementTile[] = [
  { 
    title: 'Ball Speed', 
    key: 'BallSpeed', 
    unit: 'mph', 
    precision: 1, 
    category: 'Launch' 
  },
  // ... more tiles
];
```

Each tile configuration includes:
- `title`: Display name
- `key`: Property name in Measurement object
- `unit`: Unit of measurement
- `precision`: Decimal places to show
- `category`: Grouping category

## Files

- **MeasurementTilesView.tsx**: React component implementation
- **MeasurementTilesView.css**: Styling and layout
- **WebhookInspector.tsx**: Integration point for automatic display
