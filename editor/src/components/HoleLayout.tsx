import React from 'react';
import { HoleCard } from './HoleCard';

interface HoleLayoutProps {
  selectedHole: number;
  onHoleSelect: (hole: number) => void;
  randomized: boolean;
  setupType?: 'tee' | 'approach';
}

// Hole data based on your images
const HOLE_DATA = [
  { id: 1, distance: '360 yds' },
  { id: 2, distance: '400 yds' },
  { id: 3, distance: '330 yds' },
  { id: 4, distance: '350 yds' },
  { id: 5, distance: '340 yds' },
  { id: 6, distance: '500 yds' },
  { id: 7, distance: '321 yds' },
  { id: 8, distance: '462 yds' },
  { id: 9, distance: '250 yds' },
];

export const HoleLayout: React.FC<HoleLayoutProps> = ({
  selectedHole,
  onHoleSelect,
  randomized,
  setupType = 'tee'
}) => {
  return (
    <div className="hole-layout">
      <div className="hole-grid">
        {HOLE_DATA.map((hole) => (
          <HoleCard
            key={hole.id}
            holeNumber={hole.id}
            distance={hole.distance}
            selected={selectedHole === hole.id}
            onClick={() => onHoleSelect(hole.id)}
            disabled={randomized}
            setupType={setupType}
          />
        ))}
      </div>
    </div>
  );
};