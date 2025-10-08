import React from 'react';
import { CollapsibleSection } from '../CollapsibleSection';
import { TreeView } from '../TreeView';
import { CloneSelectedButton, AddActivityButton, AddStepButton } from '../buttons';
import { ScriptData, Activity, Step } from '../../types';

interface SidebarEditOperationsProps {
  script: ScriptData;
  selectedRef: { kind: 'script' } | { kind: 'activity'; activityId: string } | { kind: 'step'; activityId: string; stepId: string } | null;
  selectedNode: Activity | Step | null;
  isValid: boolean;
  parentActivityForAdd: Activity | undefined;
  onCloneSelected: () => void;
  onShowActivityDialog: () => void;
  onShowStepDialog: () => void;
  onSelectScript: () => void;
  onSelectActivity: (activityId: string) => void;
  onSelectStep: (activityId: string, stepId: string) => void;
  onDeleteActivity: (activityId: string) => void;
  onDeleteStep: (activityId: string, stepId: string) => void;
}

export const SidebarEditOperations: React.FC<SidebarEditOperationsProps> = ({
  script,
  selectedRef,
  selectedNode,
  isValid,
  parentActivityForAdd,
  onCloneSelected,
  onShowActivityDialog,
  onShowStepDialog,
  onSelectScript,
  onSelectActivity,
  onSelectStep,
  onDeleteActivity,
  onDeleteStep,
}) => {
  return (
    <CollapsibleSection
      title="Edit Operations"
      className="edit-operations-section"
      bodyClassName="edit-buttons"
      defaultOpen
      persistKey="edit-operations"
    >
      <CloneSelectedButton 
        selectedNode={selectedNode} 
        isValid={isValid} 
        onClick={onCloneSelected} 
      />
      <AddActivityButton onClick={onShowActivityDialog} />
      <AddStepButton 
        parentActivityForAdd={parentActivityForAdd} 
        onShowStepDialog={onShowStepDialog} 
      />
      {/* Script Structure Tree */}
      <TreeView
        script={script}
        selectedRef={selectedRef}
        onSelectScript={onSelectScript}
        onSelectActivity={onSelectActivity}
        onSelectStep={onSelectStep}
        onDeleteActivity={onDeleteActivity}
        onDeleteStep={onDeleteStep}
      />
    </CollapsibleSection>
  );
};
