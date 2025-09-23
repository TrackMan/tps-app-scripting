import React, { useState, useEffect } from 'react';

import { Step } from '../types';
import { createStep } from '../factories';

interface StepDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (step: Step, parentActivityId: string) => void;
  parentActivityType?: 'RangeAnalysisScriptedActivity' | 'PerformanceCenterScriptedActivity';
  parentActivityId?: string;
}

export const StepDialog: React.FC<StepDialogProps> = ({ open, onClose, onAdd, parentActivityType, parentActivityId }) => {
  const [id, setId] = useState('');
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  // Whenever dialog is (re)opened or parent activity type changes, reset the fields.
  useEffect(() => {

    if (open) {
      setId('');
      setHeader('');
      setDescription('');
    }
  }, [open, parentActivityType]);

  const derivedStepType = parentActivityType === 'PerformanceCenterScriptedActivity'
    ? 'PerformanceCenterScriptedStep'
    : 'RangeAnalysisScriptedStep';
  const nodeType = derivedStepType; // no manual selection now
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal dialog">
        <h3 className="dialog-title">Add Step</h3>
        <div className="dialog-body">
          <div className="field">
            <label className="field-label">ID</label>
            <input
              className="field-input"
              placeholder="unique-step-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <div className="field-hint">Identifier within its activity</div>
          </div>
          <div className="field">
            <label className="field-label">Type</label>
            <input className="field-input" value={nodeType} disabled aria-label="Derived Step Type" />
            <div className="field-hint">Derived from parent activity</div>
          </div>
          <div className="field">
            <label className="field-label">Intro Header</label>
            <input
              className="field-input"
              placeholder="e.g. Capture 5 Shots"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
            <div className="field-hint">What the user sees first</div>
          </div>
          <div className="field">
            <label className="field-label">Description</label>
            <textarea
              className="field-input field-textarea"
              placeholder="Explain purpose or instructions"
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="field-hint">Optional supporting text (multi-line)</div>
          </div>
        </div>
        <div className="dialog-footer">
          <button
            disabled={!id || !header}
            onClick={() => {
              if (!parentActivityType || !parentActivityId) {
                return;
              }
              const step: Step = createStep({
                nodeType,
                id,
                introHeader: header,
                introDescription: description,
              });

              onAdd(step, parentActivityId);
              onClose();
            }}
          >Add Step</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
