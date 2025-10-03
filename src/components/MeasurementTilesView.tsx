import React from 'react';
import './MeasurementTilesView.css';

interface Measurement {
  BallSpeed?: number;
  ClubSpeed?: number;
  SmashFactor?: number;
  LaunchAngle?: number;
  LaunchDirection?: number;
  AttackAngle?: number;
  ClubPath?: number;
  FaceAngle?: number;
  FaceToPath?: number;
  SpinRate?: number;
  SpinAxis?: number;
  SpinLoft?: number;
  DynamicLoft?: number;
  Carry?: number;
  Total?: number;
  CarrySide?: number;
  TotalSide?: number;
  Curve?: number;
  MaxHeight?: number;
  HangTime?: number;
  LandingAngle?: number;
  ImpactHeight?: number;
  ImpactOffset?: number;
  SwingPlane?: number;
  SwingRadius?: number;
  LowPointDistance?: number;
  LowPointHeight?: number;
  LowPointSide?: number;
  [key: string]: any;
}

type UnitSystem = 'metric' | 'imperial';
type UnitType = 'speed' | 'distance' | 'height' | 'angle' | 'rpm' | 'time' | 'none';

interface MeasurementTile {
  title: string;
  key: keyof Measurement;
  unitType: UnitType;
  precision?: number;
  category?: string;
}

// Unit conversion utilities
const unitConversions = {
  // Speed: m/s to mph
  speedToImperial: (ms: number) => ms * 2.23694,
  speedToMetric: (mph: number) => mph / 2.23694,
  
  // Distance: meters to yards
  distanceToImperial: (m: number) => m * 1.09361,
  distanceToMetric: (yds: number) => yds / 1.09361,
  
  // Height: meters to inches
  heightToImperial: (m: number) => m * 39.3701,
  heightToMetric: (inches: number) => inches / 39.3701,
};

const getUnitLabel = (unitType: UnitType, system: UnitSystem): string => {
  switch (unitType) {
    case 'speed': return system === 'imperial' ? 'mph' : 'm/s';
    case 'distance': return system === 'imperial' ? 'yds' : 'm';
    case 'height': return system === 'imperial' ? 'in' : 'cm';
    case 'angle': return '°';
    case 'rpm': return 'rpm';
    case 'time': return 's';
    case 'none': return '';
    default: return '';
  }
};

const convertValue = (value: number, unitType: UnitType, toSystem: UnitSystem): number => {
  // Input data is in SI units (m/s, meters, etc.)
  // Convert to the target system
  if (toSystem === 'metric') {
    // For metric, some values need adjustment
    switch (unitType) {
      case 'height':
        // Convert meters to centimeters
        return value * 100;
      default:
        return value;
    }
  } else {
    // Convert to imperial
    switch (unitType) {
      case 'speed':
        return unitConversions.speedToImperial(value);
      case 'distance':
        return unitConversions.distanceToImperial(value);
      case 'height':
        return unitConversions.heightToImperial(value);
      default:
        return value;
    }
  }
};

const MEASUREMENT_TILES: MeasurementTile[] = [
  // Launch Data
  { title: 'Ball Speed', key: 'BallSpeed', unitType: 'speed', precision: 1, category: 'Launch' },
  { title: 'Club Speed', key: 'ClubSpeed', unitType: 'speed', precision: 1, category: 'Launch' },
  { title: 'Smash Factor', key: 'SmashFactor', unitType: 'none', precision: 2, category: 'Launch' },
  { title: 'Launch Angle', key: 'LaunchAngle', unitType: 'angle', precision: 1, category: 'Launch' },
  { title: 'Launch Direction', key: 'LaunchDirection', unitType: 'angle', precision: 1, category: 'Launch' },
  
  // Club Data
  { title: 'Attack Angle', key: 'AttackAngle', unitType: 'angle', precision: 1, category: 'Club' },
  { title: 'Club Path', key: 'ClubPath', unitType: 'angle', precision: 1, category: 'Club' },
  { title: 'Face Angle', key: 'FaceAngle', unitType: 'angle', precision: 1, category: 'Club' },
  { title: 'Face to Path', key: 'FaceToPath', unitType: 'angle', precision: 1, category: 'Club' },
  { title: 'Dynamic Loft', key: 'DynamicLoft', unitType: 'angle', precision: 1, category: 'Club' },
  
  // Spin Data
  { title: 'Spin Rate', key: 'SpinRate', unitType: 'rpm', precision: 0, category: 'Spin' },
  { title: 'Spin Axis', key: 'SpinAxis', unitType: 'angle', precision: 1, category: 'Spin' },
  { title: 'Spin Loft', key: 'SpinLoft', unitType: 'angle', precision: 1, category: 'Spin' },
  
  // Distance Data
  { title: 'Carry', key: 'Carry', unitType: 'distance', precision: 1, category: 'Distance' },
  { title: 'Total', key: 'Total', unitType: 'distance', precision: 1, category: 'Distance' },
  { title: 'Carry Side', key: 'CarrySide', unitType: 'distance', precision: 1, category: 'Distance' },
  { title: 'Total Side', key: 'TotalSide', unitType: 'distance', precision: 1, category: 'Distance' },
  { title: 'Curve', key: 'Curve', unitType: 'distance', precision: 1, category: 'Distance' },
  
  // Trajectory
  { title: 'Max Height', key: 'MaxHeight', unitType: 'distance', precision: 1, category: 'Trajectory' },
  { title: 'Hang Time', key: 'HangTime', unitType: 'time', precision: 2, category: 'Trajectory' },
  { title: 'Landing Angle', key: 'LandingAngle', unitType: 'angle', precision: 1, category: 'Trajectory' },
  
  // Impact
  { title: 'Impact Height', key: 'ImpactHeight', unitType: 'height', precision: 2, category: 'Impact' },
  { title: 'Impact Offset', key: 'ImpactOffset', unitType: 'height', precision: 2, category: 'Impact' },
  
  // Swing
  { title: 'Swing Plane', key: 'SwingPlane', unitType: 'angle', precision: 1, category: 'Swing' },
  { title: 'Swing Radius', key: 'SwingRadius', unitType: 'height', precision: 1, category: 'Swing' },
  
  // Low Point
  { title: 'Low Point Distance', key: 'LowPointDistance', unitType: 'height', precision: 2, category: 'Low Point' },
  { title: 'Low Point Height', key: 'LowPointHeight', unitType: 'height', precision: 2, category: 'Low Point' },
  { title: 'Low Point Side', key: 'LowPointSide', unitType: 'height', precision: 2, category: 'Low Point' },
];

interface Props {
  measurement: Measurement;
  playerId?: string;
}

const MeasurementTilesView: React.FC<Props> = ({ measurement, playerId }) => {
  // Unit system state (persisted in localStorage)
  const [unitSystem, setUnitSystem] = React.useState<UnitSystem>(() => {
    const saved = localStorage.getItem('measurementUnitSystem');
    return (saved === 'metric' || saved === 'imperial') ? saved : 'imperial';
  });

  // Save unit system preference
  React.useEffect(() => {
    localStorage.setItem('measurementUnitSystem', unitSystem);
  }, [unitSystem]);

  // Filter tiles to only show those with values
  const availableTiles = MEASUREMENT_TILES.filter(tile => {
    const value = measurement[tile.key];
    return value !== undefined && value !== null && !isNaN(Number(value));
  });

  const formatValue = (value: number, precision: number = 1): string => {
    return value.toFixed(precision);
  };

  if (availableTiles.length === 0) {
    return (
      <div className="measurement-tiles-empty">
        <p>No measurement data available</p>
      </div>
    );
  }

  // Group tiles by category
  const categories = Array.from(new Set(availableTiles.map(t => t.category || 'Other')));

  return (
    <div className="measurement-tiles-container">
      {/* Unit System Toggle */}
      <div className="measurement-controls">
        {playerId && (
          <div className="measurement-player-info">
            <strong>Player ID:</strong> {playerId}
          </div>
        )}
        <div className="unit-system-toggle">
          <button
            className={`unit-toggle-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
            onClick={() => setUnitSystem('imperial')}
            title="Imperial units (mph, yards, inches)"
          >
            Imperial
          </button>
          <button
            className={`unit-toggle-btn ${unitSystem === 'metric' ? 'active' : ''}`}
            onClick={() => setUnitSystem('metric')}
            title="Metric units (m/s, meters, centimeters)"
          >
            Metric
          </button>
        </div>
      </div>
      
      {categories.map(category => {
        const categoryTiles = availableTiles.filter(t => (t.category || 'Other') === category);
        
        return (
          <div key={category} className="measurement-category">
            <h5 className="measurement-category-title">{category}</h5>
            <div className="measurement-tiles-grid">
              {categoryTiles.map(tile => {
                const rawValue = measurement[tile.key];
                const numValue = Number(rawValue);
                
                // Convert value based on unit system
                const convertedValue = convertValue(numValue, tile.unitType, unitSystem);
                const unit = getUnitLabel(tile.unitType, unitSystem);
                
                return (
                  <div key={tile.key} className="measurement-tile">
                    <div className="tile-title">{tile.title}</div>
                    <div className="tile-value">{formatValue(convertedValue, tile.precision)}</div>
                    <div className="tile-unit">{unit}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeasurementTilesView;
