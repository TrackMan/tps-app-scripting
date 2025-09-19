import React from 'react';
import { Activity, Step, isActivity, isStep, ConditionGroup } from '../types';
import { ConditionEditor } from './ConditionEditor';
import { EditPanel } from './EditPanel';
import { CollapsibleSection } from './CollapsibleSection';
import { SetupEditor } from './SetupEditor';

interface NodeDetailsPanelProps {
  selectedNode: Activity | Step | null;
  onUpdateActivity: (activityId: string, patch: Partial<Activity>) => void;
  onUpdateStep: (stepId: string, patch: Partial<Step>) => void;
}

export const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({
  selectedNode,
  onUpdateActivity,
  onUpdateStep,
}) => {
  const isActivitySelected = !!selectedNode && isActivity(selectedNode);
  const isStepSelected = !!selectedNode && isStep(selectedNode);

  const updateStep = (stepId: string, patch: Partial<Step>) => {
    onUpdateStep(stepId, patch);
  };

  const updateActivity = (activityId: string, patch: Partial<Activity>) => {
    onUpdateActivity(activityId, patch);
  };

  return (
    <div className="tree-main">
      <h2>Node Details</h2>
      {selectedNode ? (
        <>
          {/* For both activities and steps, show metadata first */}
          <EditPanel
            node={selectedNode}
            onChange={(patch: Partial<Activity> | Partial<Step>) => {
              if (isActivitySelected) {
                updateActivity(selectedNode.id, patch as Partial<Activity>);
              } else if (isStepSelected) {
                updateStep(selectedNode.id, patch as Partial<Step>);
              }
            }}
          />
          {/* Step-only logic section follows metadata */}
          {isStepSelected && (selectedNode as Step).logic && (
            <CollapsibleSection title="Logic" className="logic-block" bodyClassName="logic-inner" defaultOpen persistKey={`${(selectedNode as Step).id}-logic`}>
              <SetupEditor
                step={selectedNode as Step}
                onUpdateStep={updateStep}
              />
              <ConditionEditor
                label="Success Condition"
                condition={(selectedNode as Step).logic.successCondition as ConditionGroup}
                showConditionType={true}
                onChange={(c) => {
                  const s = selectedNode as Step;
                  updateStep(s.id, { logic: { ...s.logic, successCondition: c } });
                }}
              />
              <ConditionEditor
                label="Fail Condition"
                condition={(selectedNode as Step).logic.failCondition as ConditionGroup}
                showConditionType={true}
                onChange={(c) => {
                  const s = selectedNode as Step;
                  updateStep(s.id, { logic: { ...s.logic, failCondition: c } });
                }}
              />
              <div className="logic-flags">
                <label>Can Retry: <input type="checkbox" checked={!!(selectedNode as Step).logic.canRetry} onChange={e => { const s = selectedNode as Step; updateStep(s.id, { logic: { ...s.logic, canRetry: e.target.checked } }); }} /></label>
                <label>Skip On Success: <input type="checkbox" checked={!!(selectedNode as Step).logic.skipOnSuccess} onChange={e => { const s = selectedNode as Step; updateStep(s.id, { logic: { ...s.logic, skipOnSuccess: e.target.checked } }); }} /></label>
              </div>
            </CollapsibleSection>
          )}
          <pre>{JSON.stringify(selectedNode, null, 2)}</pre>
        </>
      ) : (
        <p>Select an activity or step from the tree.</p>
      )}
    </div>
  );
};