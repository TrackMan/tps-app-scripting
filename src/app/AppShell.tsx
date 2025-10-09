import React from 'react';
import { TopBar } from '../components/TopBar';
import { TabBar } from '../components/TabBar';
import { Sidebar } from '../components/Sidebar';
import { DialogManager } from '../components/Dialogs';
import { ScriptEditor } from '../components/ScriptEditor';
import { NodeEditor } from '../components/NodeEditor';
import { DocViewer } from '../components/DocViewer';
import WebhookView from '../components/WebhookView';
import Routes from './Routes';
import { ScriptData, Activity, Step } from '../types';
import { SidebarProps } from '../components/Sidebar';

export type TabType = 'edit' | 'documentation' | 'webhook';

export interface AppShellProps {
  // the props below are a subset of the props used by the original App
  selectedFacility: any;
  selectedFacilityId: string | null;
  onFacilitySelect: (f: any) => void;
  onClearSelections?: () => Promise<void>;
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
  // editor state and handlers (kept generic to avoid tight coupling in this step)
  state: any;
  selectedNode?: Activity | Step | null;
  script: ScriptData;
  isValid: boolean;
  validationErrors: string[];
  selections: any;
  selectedLocation: any;
  selectedBayObj: any;
  parentActivityForAdd?: any;
  onLoadScript: () => void;
  onDownloadScript: () => void;
  onLocationSelect: (l: any) => void;
  onBaySelect: (b: any) => void;
  dispatch: any;
  // Dialog state and handlers
  showActivityDialog: boolean;
  showStepDialog: boolean;
  onShowActivityDialog: () => void;
  onShowStepDialog: () => void;
  onCloseActivityDialog: () => void;
  onCloseStepDialog: () => void;
  onAddActivity: (activity: Activity) => void;
  onAddStep: (step: Step, parentActivityId: string) => void;
}

export const AppShell: React.FC<AppShellProps> = (props) => {
  const {
    selectedFacility,
    selectedFacilityId,
    onFacilitySelect,
    onClearSelections,
    activeTab,
    setActiveTab,
    state,
    script,
    isValid,
    validationErrors,
    selections,
    selectedLocation,
    selectedBayObj,
    parentActivityForAdd,
    onLoadScript,
    onDownloadScript,
    onLocationSelect,
    onBaySelect,
    dispatch,
    showActivityDialog,
    showStepDialog,
    onShowActivityDialog,
    onShowStepDialog,
    onCloseActivityDialog,
    onCloseStepDialog,
    onAddActivity,
    onAddStep,
  } = props;

  // Prefer a hydrated selected node object from the top-level App when available
  const effectiveSelectedNode = (() => {
    if (props.selectedNode !== undefined) return props.selectedNode;
    try { return (state && state.selectedRef && state.selectedRef.kind !== 'script') ? state.selectedRef : null; } catch { return null; }
  })();

  return (
    <div className="app-container">
      <TopBar 
        selectedFacility={selectedFacility}
        selectedFacilityId={selectedFacilityId}
        onFacilitySelect={onFacilitySelect}
        onClearSelections={onClearSelections}
      />
      <TabBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <Routes
        activeTab={activeTab}
        state={state}
        selectedNode={effectiveSelectedNode ?? null}
        script={script}
        isValid={isValid}
        validationErrors={validationErrors}
        selections={selections}
        selectedFacilityId={selectedFacilityId}
        parentActivityForAdd={parentActivityForAdd}
        selectedLocation={selectedLocation}
        selectedBayObj={selectedBayObj}
        onLoadScript={onLoadScript}
        onDownloadScript={onDownloadScript}
        onLocationSelect={onLocationSelect}
        onBaySelect={onBaySelect}
        dispatch={dispatch}
        showActivityDialog={showActivityDialog}
        showStepDialog={showStepDialog}
        onShowActivityDialog={onShowActivityDialog}
        onShowStepDialog={onShowStepDialog}
        onCloseActivityDialog={onCloseActivityDialog}
        onCloseStepDialog={onCloseStepDialog}
        onAddActivity={onAddActivity}
        onAddStep={onAddStep}
      />
    </div>
  );
};

export default AppShell;
