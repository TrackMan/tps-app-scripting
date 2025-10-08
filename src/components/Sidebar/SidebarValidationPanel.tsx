import React from 'react';
import { ScriptData } from '../../types';

interface SidebarValidationPanelProps {
  isValid: boolean;
  validationErrors: string[];
  script: ScriptData;
}

export const SidebarValidationPanel: React.FC<SidebarValidationPanelProps> = ({
  isValid,
  validationErrors,
  script,
}) => {
  return (
    <div className={`validation-panel-sidebar-bottom ${isValid ? 'ok' : 'fail'}`}> 
      <div className="validation-status">Schema: {isValid ? 'Valid' : 'Invalid'}</div>
      {!isValid && (
        <>
          {script.activities.length === 0 && (
            <div className="validation-hint-empty">Add your first activity to satisfy required 'activities'.</div>
          )}
          <ul className="validation-errors">
            {validationErrors.slice(0, 8).map((e, i) => <li key={i}>{e}</li>)}
            {validationErrors.length > 8 && <li>...{validationErrors.length - 8} more</li>}
          </ul>
        </>
      )}
    </div>
  );
};
