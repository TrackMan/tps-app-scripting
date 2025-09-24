import React from 'react';
import { ScriptData, StartMode, EndMode } from '../types';
import { CollapsibleSection } from './CollapsibleSection';

interface ScriptEditorProps {
  script: ScriptData;
  onChange: (script: ScriptData) => void;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({ script, onChange }) => {
  const update = (patch: Partial<ScriptData>) => {
    onChange({ ...script, ...patch });
  };

  return (
    <CollapsibleSection
      title="Edit Script Configuration"
      className="edit-panel"
      bodyClassName="edit-panel-body"
      defaultOpen
      persistKey="script-config"
    >
      <div className="edit-field">
        <label>
          ID
          <input 
            type="text" 
            value={script.id || ''} 
            onChange={e => update({ id: e.target.value || undefined })}
            placeholder="Enter script identifier..."
          />
        </label>
      </div>

      <div className="edit-field">
        <label>
          Start Mode
          <select 
            className="cond-input"
            value={script.startMode || 'Overwrite'} 
            onChange={e => update({ startMode: e.target.value as StartMode })}
          >
            <option value="Overwrite">Overwrite</option>
            <option value="Append">Append</option>
          </select>
        </label>
      </div>

      <div className="edit-field">
        <label>
          End Mode
          <select 
            className="cond-input"
            value={script.endMode || 'Exit'} 
            onChange={e => update({ endMode: e.target.value as EndMode })}
          >
            <option value="Exit">Exit</option>
            <option value="Wait">Wait</option>
          </select>
        </label>
      </div>
    </CollapsibleSection>
  );
};