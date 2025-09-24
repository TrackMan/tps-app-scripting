import React from 'react';

interface CloneSelectedButtonProps {
  selectedNode: any;
  isValid: boolean;
  onClick: () => void;
}

export const CloneSelectedButton: React.FC<CloneSelectedButtonProps> = ({ 
  selectedNode, 
  isValid, 
  onClick 
}) => {
  return (
    <button
      className="tree-btn"
      disabled={!selectedNode || !isValid}
      onClick={onClick}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
      </svg>
      Clone Selected
    </button>
  );
};