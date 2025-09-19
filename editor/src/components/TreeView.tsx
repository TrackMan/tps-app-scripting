import React from 'react';
import { ScriptData, Activity, Step } from '../types';

// Convert PascalCase to readable title (e.g., "RangeAnalysisScriptedStep" -> "Range Analysis Scripted Step")
const formatNodeType = (nodeType: string): string => {
  return nodeType
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .trim(); // Remove leading space
};

interface TreeViewProps {
  script: ScriptData;
  selectedRef: { kind: 'script' } | { kind: 'activity'; activityId: string } | { kind: 'step'; activityId: string; stepId: string } | null;
  onSelectScript: () => void;
  onSelectActivity: (activityId: string) => void;
  onSelectStep: (activityId: string, stepId: string) => void;
  onDeleteActivity: (id: string) => void;
  onDeleteStep: (activityId: string, stepId: string) => void;
}

export const TreeView: React.FC<TreeViewProps> = ({ script, selectedRef, onSelectScript, onSelectActivity, onSelectStep, onDeleteActivity, onDeleteStep }) => {
  return (
    <div className="tree-container">
      <h2>Script Structure</h2>
      <ul>
        {/* Root Script Node */}
        <li>
          <div className="tree-item-container">
            <span className={"tree-activity" + (selectedRef && selectedRef.kind === 'script' ? ' tree-selected' : '')} onClick={() => onSelectScript()}>
              <div className="tree-node-id">Script</div>
              <div className="tree-node-type">Configuration</div>
            </span>
          </div>
        </li>
        
        {/* Activities Section Header */}
        {script.activities.length > 0 && (
          <li>
            <div className="tree-section-header">Activities</div>
          </li>
        )}
        
        {/* Activities at same level as Script */}
        {script.activities.map((activity, i) => (
          <li key={activity.id || i}>
            <div className="tree-item-container">
              <span className={"tree-activity" + (selectedRef && selectedRef.kind === 'activity' && selectedRef.activityId === activity.id ? ' tree-selected' : '')} onClick={() => onSelectActivity(activity.id)}>
                <div className="tree-node-id">{activity.id}</div>
                <div className="tree-node-type">{formatNodeType(activity.nodeType)}</div>
              </span>
              <button className="mini-btn" title="Delete Activity" onClick={() => onDeleteActivity(activity.id)}>✕</button>
            </div>
            <ul>
              {activity.steps && activity.steps.map((step, j) => (
                <li key={step.id || j}>
                  <div className="tree-item-container">
                    <span className={"tree-step" + (selectedRef && selectedRef.kind === 'step' && selectedRef.stepId === step.id ? ' tree-selected' : '')} onClick={() => onSelectStep(activity.id, step.id)}>
                      <div className="tree-node-id">{step.id}</div>
                      <div className="tree-node-type">{formatNodeType(step.nodeType)}</div>
                    </span>
                    <button className="mini-btn" title="Delete Step" onClick={() => onDeleteStep(activity.id, step.id)}>✕</button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
