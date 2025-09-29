import React from 'react';
import { TopBar } from '../components/TopBar';
import { TabBar } from '../components/TabBar';
import { Sidebar } from '../components/Sidebar';
import { DialogManager } from '../components/DialogManager';
import { ScriptEditor } from '../components/ScriptEditor';
import { NodeEditor } from '../components/NodeEditor';
import { DocViewer } from '../components/DocViewer';
import WebhookView from '../components/WebhookView';

export type TabType = 'edit' | 'documentation' | 'webhook';

export interface AppShellProps {
  // the props below are a subset of the props used by the original App
  selectedFacility: any;
  selectedFacilityId: string | null;
  onFacilitySelect: (f: any) => void;
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
  // editor state and handlers (kept generic to avoid tight coupling in this step)
  state: any;
  script: any;
  isValid: boolean;
  validationErrors: any[];
  selections: any;
  selectedLocation: any;
  selectedBayObj: any;
  onLoadScript: () => void;
  onDownloadScript: () => void;
  onLocationSelect: (l: any) => void;
  onBaySelect: (b: any) => void;
  dispatch: any;
}

export const AppShell: React.FC<AppShellProps> = (props) => {
  const {
    selectedFacility,
    selectedFacilityId,
    onFacilitySelect,
    activeTab,
    setActiveTab,
    state,
    script,
    isValid,
    validationErrors,
    selections,
    selectedLocation,
    selectedBayObj,
    onLoadScript,
    onDownloadScript,
    onLocationSelect,
    onBaySelect,
    dispatch
  } = props;

  const selectedNode = (() => {
    try { return (state && state.selectedRef && state.selectedRef.kind !== 'script') ? state.selectedRef : null; } catch { return null; }
  })();

  return (
    <div className="app-container">
      <TopBar 
        selectedFacility={selectedFacility}
        selectedFacilityId={selectedFacilityId}
        onFacilitySelect={onFacilitySelect}
      />
      <TabBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'edit' ? (
        <div className="tree-flex">
          <DialogManager
            // dialog props are expected to be provided via dispatch or parent
            showActivityDialog={false}
            showStepDialog={false}
            onCloseActivityDialog={() => {}}
            onCloseStepDialog={() => {}}
            onAddActivity={() => {}}
            onAddStep={() => {}}
            parentActivityForAdd={undefined}
          />
          <Sidebar
            script={script}
            selectedRef={state.selectedRef}
            selectedNode={selectedNode}
            isValid={isValid}
            validationErrors={validationErrors}
            selectedFacilityId={selectedFacilityId}
            selectedLocationId={selectedLocation?.id || null}
            persistedLocationId={selections?.locationId || null}
            selectedBayId={selectedBayObj?.id || null}
            persistedBayId={selections?.bayId || null}
            selectedBayObj={selectedBayObj}
            onLoadScript={onLoadScript}
            onDownloadScript={onDownloadScript}
            onLocationSelect={onLocationSelect}
            onBaySelect={onBaySelect}
            onCloneSelected={() => dispatch({ type: 'CLONE_SELECTED' })}
            onShowActivityDialog={() => {}}
            onShowStepDialog={() => {}}
            onSelectScript={() => dispatch({ type: 'SELECT_SCRIPT' })}
            onSelectActivity={(activityId: string) => dispatch({ type: 'SELECT_ACTIVITY', activityId })}
            onSelectStep={(activityId: string, stepId: string) => dispatch({ type: 'SELECT_STEP', activityId, stepId })}
            onDeleteActivity={(id: string) => dispatch({ type: 'DELETE_ACTIVITY', activityId: id })}
            onDeleteStep={(activityId: string, stepId: string) => dispatch({ type: 'DELETE_STEP', activityId, stepId })}
            parentActivityForAdd={undefined}
          />

          <div className="tree-main">
            {state.selectedRef?.kind === 'script' ? (
              <>
                <h2>Script Configuration</h2>
                <ScriptEditor
                  script={script}
                  onChange={(s: any) => dispatch({ type: 'LOAD_SCRIPT', script: s })}
                />
                <pre>{JSON.stringify(script, null, 2)}</pre>
              </>
            ) : selectedNode ? (
              <NodeEditor
                node={selectedNode}
                onUpdateActivity={(activityId: string, patch: any) => dispatch({ type: 'UPDATE_ACTIVITY', activityId, patch })}
                onUpdateStep={(stepId: string, patch: any) => dispatch({ type: 'UPDATE_STEP', stepId, patch })}
              />
            ) : (
              <div className="empty-node-editor">Select a node to edit its details.</div>
            )}
          </div>
        </div>
      ) : activeTab === 'documentation' ? (
        <div className="documentation-flex">
          <DocViewer />
        </div>
      ) : activeTab === 'webhook' ? (
        <div className="documentation-flex">
          <WebhookView selectedBayDbId={selectedBayObj?.dbId ?? null} />
        </div>
      ) : null}
    </div>
  );
};

export default AppShell;
