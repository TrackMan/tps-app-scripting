import React from 'react';
import { DialogManager } from '../components/DialogManager';
import { Sidebar } from '../components/Sidebar';
import { ScriptEditor } from '../components/ScriptEditor';
import { NodeEditor } from '../components/NodeEditor';
import { DocViewer } from '../components/DocViewer';
import WebhookView from '../components/WebhookView';
import { ScriptData } from '../types';
import { SidebarProps } from '../components/Sidebar';

export type TabType = 'edit' | 'documentation' | 'webhook';

export interface RoutesProps {
  activeTab: TabType;
  state: any;
  selectedNode?: any;
  script: ScriptData;
  isValid: boolean;
  validationErrors: string[];
  selections: any;
  selectedLocation: any;
  selectedBayObj: any;
  selectedFacilityId: string | null;
  parentActivityForAdd?: any;
  onLoadScript: () => void;
  onDownloadScript: () => void;
  onLocationSelect: (l: any) => void;
  onBaySelect: (b: any) => void;
  onSelectActivity?: SidebarProps['onSelectActivity'];
  onSelectStep?: SidebarProps['onSelectStep'];
  dispatch: any;
}

const Routes: React.FC<RoutesProps> = ({
  activeTab,
  state,
  selectedNode,
  script,
  isValid,
  validationErrors,
  selections,
  selectedLocation,
  selectedBayObj,
  selectedFacilityId,
  parentActivityForAdd,
  onLoadScript,
  onDownloadScript,
  onLocationSelect,
  onBaySelect,
  dispatch
}) => {
  const effectiveSelectedNode = (() => {
    if (selectedNode !== undefined) return selectedNode;
    try { return (state && state.selectedRef && state.selectedRef.kind !== 'script') ? state.selectedRef : null; } catch { return null; }
  })();

  if (activeTab === 'edit') {
    return (
      <div className="tree-flex">
        <DialogManager
          // preserved minimal API here; detailed dialog state is still in App.tsx
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
          selectedNode={effectiveSelectedNode}
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
          parentActivityForAdd={parentActivityForAdd}
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
          ) : effectiveSelectedNode ? (
            <NodeEditor
              node={effectiveSelectedNode}
              onUpdateActivity={(activityId: string, patch: any) => dispatch({ type: 'UPDATE_ACTIVITY', activityId, patch })}
              onUpdateStep={(stepId: string, patch: any) => dispatch({ type: 'UPDATE_STEP', stepId, patch })}
            />
          ) : (
            <div className="empty-node-editor">Select a node to edit its details.</div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === 'documentation') {
    return (
      <div className="documentation-flex">
        <DocViewer />
      </div>
    );
  }

  if (activeTab === 'webhook') {
    return (
      <div className="documentation-flex">
        <WebhookView selectedBayDbId={selectedBayObj?.dbId ?? null} />
      </div>
    );
  }

  return null;
};

export default Routes;
