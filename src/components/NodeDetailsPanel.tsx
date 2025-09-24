import React from 'react';
import { SubTabBar } from './SubTabBar';
import { Activity, Step, isActivity, isStep, ConditionGroup } from '../types';
import { ConditionEditor } from './ConditionEditor';
import { EditPanel } from './EditPanel';
import { CollapsibleSection } from './CollapsibleSection';
import { SetupEditor } from './SetupEditor';
import { UIEditor } from './UIEditor';

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


  const [activeTab, setActiveTab] = React.useState('Meta Data');
  const tabList = ['Meta Data', 'Logic', 'UI Configuration', 'Script'];

  // Helper for safe logic update
  function safeUpdateStepLogic(s: Step, patch: Partial<Step['logic']>) {
    updateStep(s.id!, { logic: { ...s.logic, ...patch } } as Partial<Step>);
  }

  return (
    <div className="tree-main">
      <h2>Node Details</h2>
      {selectedNode ? (
        <>
          <SubTabBar tabs={tabList} activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'Meta Data' && (
            <EditPanel
              node={selectedNode}
              onChange={(patch: Partial<Activity> | Partial<Step>) => {
                if (isActivitySelected) {
                  updateActivity(selectedNode.id!, patch as Partial<Activity>);
                } else if (isStepSelected) {
                  updateStep(selectedNode.id!, patch as Partial<Step>);
                }
              }}
            />
          )}

          {activeTab === 'Logic' && isStepSelected && (selectedNode as Step).logic && (
            <div className="logic-block logic-inner">
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
                  safeUpdateStepLogic(s, { successCondition: c });
                }}
              />
              <ConditionEditor
                label="Fail Condition"
                condition={(selectedNode as Step).logic.failCondition as ConditionGroup}
                showConditionType={true}
                onChange={(c) => {
                  const s = selectedNode as Step;
                  safeUpdateStepLogic(s, { failCondition: c });
                }}
              />
              <div className="logic-flags">
                <label>Can Retry: <input type="checkbox" checked={!!(selectedNode as Step).logic.canRetry} onChange={e => { const s = selectedNode as Step; safeUpdateStepLogic(s, { canRetry: e.target.checked }); }} /></label>
                <label>Skip On Success: <input type="checkbox" checked={!!(selectedNode as Step).logic.skipOnSuccess} onChange={e => { const s = selectedNode as Step; safeUpdateStepLogic(s, { skipOnSuccess: e.target.checked }); }} /></label>
              </div>
            </div>
          )}

          {activeTab === 'UI Configuration' && isStepSelected && ((selectedNode as Step).nodeType === 'RangeAnalysisScriptedStep' || (selectedNode as Step).nodeType === 'PerformanceCenterScriptedStep') && (
            <div className="ui-block ui-inner">
              <UIEditor
                step={selectedNode as Step}
                onUpdateStep={updateStep}
              />
            </div>
          )}

          {activeTab === 'Script' && (
            <pre>{JSON.stringify(selectedNode, null, 2)}</pre>
          )}
        </>
      ) : (
        <p>Select an activity or step from the tree.</p>
      )}
    </div>
  );
};