import React from 'react';

interface AddActivityButtonProps {
  onClick: () => void;
}

export const AddActivityButton: React.FC<AddActivityButtonProps> = ({ onClick }) => {
  return (
    <button className="tree-btn" onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M11,15H13V17H15V15H17V13H15V11H13V13H11V15Z"/>
      </svg>
      Add Activity
    </button>
  );
};