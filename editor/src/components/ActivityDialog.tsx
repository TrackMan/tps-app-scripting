import React, { useState } from 'react';

import { Activity } from '../types';
import { createActivity } from '../factories';

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (activity: Activity) => void;
}

export const ActivityDialog: React.FC<ActivityDialogProps> = ({ open, onClose, onAdd }) => {
  const [id, setId] = useState('');
  const [nodeType, setNodeType] = useState('RangeAnalysisScriptedActivity');
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal dialog">
        <h3 className="dialog-title">Add Activity</h3>
        <div className="dialog-body">
          <div className="field">
            <label className="field-label">ID</label>
            <input
              className="field-input"
              placeholder="unique-activity-id"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <div className="field-hint">Lowercase or camelCase identifier (no spaces)</div>
          </div>
          <div className="field">
            <label className="field-label">Type</label>
            <select aria-label="Activity Type" className="field-input" value={nodeType} onChange={e => setNodeType(e.target.value)}>
              <option value="RangeAnalysisScriptedActivity">RangeAnalysisScriptedActivity</option>
              <option value="PerformanceCenterScriptedActivity">PerformanceCenterScriptedActivity</option>
            </select>
            <div className="field-hint">Choose the activity implementation class</div>
          </div>
            <div className="field">
              <label className="field-label">Intro Header</label>
              <input
                className="field-input"
                placeholder="e.g. Range Analysis Warmup"
                value={header}
                onChange={e => setHeader(e.target.value)}
              />
              <div className="field-hint">Short headline shown to the user</div>
            </div>
            <div className="field">
              <label className="field-label">Description</label>
              <textarea
                className="field-input field-textarea"
                placeholder="What the player should focus on"
                value={description}
                rows={5}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="field-hint">Optional supporting text (multi-line)</div>
            </div>
        </div>
        <div className="dialog-footer">
          <button
            disabled={!id || !header}
            onClick={() => {
              const activity: Activity = createActivity({
                nodeType: nodeType as any,
                id,
                introHeader: header,
                introDescription: description,
              });
              onAdd(activity);
              onClose();
            }}
          >Add Activity</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
