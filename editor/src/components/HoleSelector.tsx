import React from 'react';
import { HoleLayout } from './HoleLayout';
import './HoleSelector.css';

interface HoleSelectorProps {
  selectedHole: number;
  onHoleSelect: (hole: number) => void;
  className?: string;
}

export const HoleSelector: React.FC<HoleSelectorProps> = ({
  selectedHole,
  onHoleSelect,
  className = ''
}) => {
  return (
    <div className={`hole-selector ${className}`}>
      <div className="header">
        <div className="title">Hole layout</div>
      </div>

      <div className="hole-selector-content">
        <HoleLayout
          selectedHole={selectedHole}
          onHoleSelect={onHoleSelect}
          randomized={false}
          setupType="tee"
        />
        
        <div className="hole-preview">
          <div className="hole-preview-header">
            <span className="hole-preview-number">Hole {selectedHole}</span>
            <span className="hole-preview-distance">
              {(() => {
                const holeDistances = ['360 yds', '400 yds', '330 yds', '350 yds', '340 yds', '500 yds', '321 yds', '462 yds', '250 yds'];
                return holeDistances[selectedHole - 1] || '360 yds';
              })()}
            </span>
          </div>
          <div className="hole-preview-image">
            <img 
              src={`/images/holes/tee/hole-${selectedHole}.png`}
              alt={`Hole ${selectedHole} tee view preview`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.classList.add('hidden');
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.classList.remove('hidden');
              }}
            />
            <div className="hole-preview-placeholder hidden">
              <div className="hole-preview-placeholder-text">Hole {selectedHole}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};