import React from 'react';
import { Activity, Step } from '../../types';
import { ActivityDialog } from './ActivityDialog';
import { StepDialog } from './StepDialog';

interface DialogManagerProps {
  showActivityDialog: boolean;
  showStepDialog: boolean;
  onCloseActivityDialog: () => void;
  onCloseStepDialog: () => void;
  onAddActivity: (activity: Activity) => void;
  onAddStep: (step: Step, parentActivityId: string) => void;
  parentActivityForAdd?: Activity;
}

export const DialogManager: React.FC<DialogManagerProps> = ({
  showActivityDialog,
  showStepDialog,
  onCloseActivityDialog,
  onCloseStepDialog,
  onAddActivity,
  onAddStep,
  parentActivityForAdd,
}) => {
  return (
    <>
      <ActivityDialog
        open={showActivityDialog}
        onClose={onCloseActivityDialog}
        onAdd={onAddActivity}
      />
      <StepDialog
        open={showStepDialog}
        onClose={onCloseStepDialog}
        onAdd={onAddStep}
        parentActivityType={parentActivityForAdd ? parentActivityForAdd.nodeType as any : undefined}
        parentActivityId={parentActivityForAdd ? parentActivityForAdd.id : undefined}
      />
    </>
  );
};