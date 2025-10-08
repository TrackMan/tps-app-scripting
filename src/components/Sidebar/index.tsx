import React from 'react';
import { SidebarProps } from '../../types/sidebarTypes';
import { useScriptExecution } from '../../hooks/useScriptExecution';
import { SidebarFileOperations } from './SidebarFileOperations';
import { SidebarBayOperations } from './SidebarBayOperations';
import { SidebarEditOperations } from './SidebarEditOperations';
import { SidebarValidationPanel } from './SidebarValidationPanel';

export const Sidebar: React.FC<SidebarProps> = ({
  script,
  selectedRef,
  selectedNode,
  isValid,
  validationErrors,
  selectedFacilityId,
  selectedLocationId,
  persistedLocationId,
  selectedBayId,
  persistedBayId,
  selectedBayObj,
  onLoadScript,
  onDownloadScript,
  onLocationSelect,
  onBaySelect,
  onCloneSelected,
  onShowActivityDialog,
  onShowStepDialog,
  onSelectScript,
  onSelectActivity,
  onSelectStep,
  onDeleteActivity,
  onDeleteStep,
  parentActivityForAdd,
}) => {
  const { executing, execMessage, canExecute, executeScript } = useScriptExecution({
    isValid,
    selectedBayObj,
    script,
  });

  return (
    <div className="tree-sidebar">
      <div className="sidebar-content">
        {/* File Operations Section */}
        <SidebarFileOperations
          isValid={isValid}
          onLoadScript={onLoadScript}
          onDownloadScript={onDownloadScript}
        />

        {/* Bay Operations Section */}
        <SidebarBayOperations
          selectedFacilityId={selectedFacilityId}
          selectedLocationId={selectedLocationId}
          persistedLocationId={persistedLocationId}
          selectedBayId={selectedBayId}
          persistedBayId={persistedBayId}
          onLocationSelect={onLocationSelect}
          onBaySelect={onBaySelect}
          canExecute={canExecute}
          executing={executing}
          execMessage={execMessage}
          onExecuteScript={executeScript}
          isValid={isValid}
          selectedBayObj={selectedBayObj}
        />

        {/* Edit Operations Section */}
        <SidebarEditOperations
          script={script}
          selectedRef={selectedRef}
          selectedNode={selectedNode}
          isValid={isValid}
          parentActivityForAdd={parentActivityForAdd}
          onCloneSelected={onCloneSelected}
          onShowActivityDialog={onShowActivityDialog}
          onShowStepDialog={onShowStepDialog}
          onSelectScript={onSelectScript}
          onSelectActivity={onSelectActivity}
          onSelectStep={onSelectStep}
          onDeleteActivity={onDeleteActivity}
          onDeleteStep={onDeleteStep}
        />
      </div>
      
      {/* Validation panel at bottom of sidebar */}
      <SidebarValidationPanel
        isValid={isValid}
        validationErrors={validationErrors}
        script={script}
      />
    </div>
  );
};