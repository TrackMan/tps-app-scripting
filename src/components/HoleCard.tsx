import React from 'react';

interface HoleCardProps {
  holeNumber: number;
  distance: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  setupType?: 'tee' | 'approach';
}

export const HoleCard: React.FC<HoleCardProps> = ({
  holeNumber,
  distance,
  selected,
  onClick,
  disabled = false,
  setupType = 'tee'
}) => {
  return (
    <div 
      className={`hole-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="hole-image">
        <img 
          src={`/images/holes/${setupType}/hole-${holeNumber}.png`}
          alt={`Hole ${holeNumber} ${setupType} view`}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.classList.add('hidden');
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.classList.remove('hidden');
          }}
        />
        <div className="hole-placeholder hidden"></div>
        <div className="hole-number">{holeNumber}</div>
      </div>
      <div className="hole-distance">{distance}</div>
    </div>
  );
};