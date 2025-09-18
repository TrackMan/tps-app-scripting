import React from 'react';
import { Activity } from '../../types';

interface AddStepButtonProps {
  parentActivityForAdd: Activity | undefined;
  onShowStepDialog: () => void;
}

export const AddStepButton: React.FC<AddStepButtonProps> = ({ 
  parentActivityForAdd, 
  onShowStepDialog 
}) => {
  return (
    <button
      className="tree-btn"
      disabled={!parentActivityForAdd}
      onClick={() => {
        if (parentActivityForAdd) {
          onShowStepDialog();
        }
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
      </svg>
      Add Step
    </button>
  );
};