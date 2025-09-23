import React from 'react';
import { ScriptData, Activity, Step } from '../types';
import { TreeView } from './TreeView';
import { BaySelector } from './BaySelector';
import { LocationSelector } from './LocationSelector';
import { CollapsibleSection } from './CollapsibleSection';
import { NodeEditor } from './NodeEditor';
import { LoadScriptButton, DownloadButton, CloneSelectedButton, AddActivityButton, AddStepButton } from './buttons';

interface Bay {
  id: string;
  dbId: number;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

interface SidebarProps {
  script: ScriptData;
  selectedRef: { kind: 'script' } | { kind: 'activity'; activityId: string } | { kind: 'step'; activityId: string; stepId: string } | null;
  selectedNode: Activity | Step | null;
  isValid: boolean;
  validationErrors: string[];
  selectedFacilityId: string | null;
  selectedLocationId: string | null;
  persistedLocationId: string | null;
  selectedBayId: string | null;
  persistedBayId: string | null;
  selectedBayObj: Bay | null;
  onLoadScript: () => void;
  onDownloadScript: () => void;
  onLocationSelect: (location: Location | null) => void;
  onBaySelect: (bay: Bay | null) => void;
  onCloneSelected: () => void;
  onShowActivityDialog: () => void;
  onShowStepDialog: () => void;
  onSelectScript: () => void;
  onSelectActivity: (activityId: string) => void;
  onSelectStep: (activityId: string, stepId: string) => void;
  onDeleteActivity: (activityId: string) => void;
  onDeleteStep: (activityId: string, stepId: string) => void;
  parentActivityForAdd: Activity | undefined;
}

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
  onUpdateActivity,
  onUpdateStep,
}) => {
  const [executing, setExecuting] = React.useState(false);
  const [execMessage, setExecMessage] = React.useState<string | null>(null);
  // Track selection locally to avoid deselection after ID change
  const [localSelectedRef, setLocalSelectedRef] = React.useState(selectedRef);

  React.useEffect(() => {
    setLocalSelectedRef(selectedRef);
  }, [selectedRef]);

  // Track last selected node ID for reselection after ID change
  const lastSelectedRef = React.useRef(selectedRef);

  React.useEffect(() => {
    lastSelectedRef.current = selectedRef;
  }, [selectedRef]);

  // Handler to reselect node after ID change
  function handleNodeIdChange(oldId: string, newId: string, kind: 'activity' | 'step', parentActivityId?: string) {
    if (kind === 'activity') {
      setLocalSelectedRef({ kind: 'activity', activityId: newId });
      onSelectActivity(newId);
    } else if (kind === 'step' && parentActivityId) {
      setLocalSelectedRef({ kind: 'step', activityId: parentActivityId, stepId: newId });
      onSelectStep(parentActivityId, newId);
    }
  }

  const canExecute = isValid && !!selectedBayObj?.dbId;

  async function handleExecuteScript() {
    if (!canExecute || !selectedBayObj) return;
    setExecuting(true);
    setExecMessage(null);
    try {
      const { ENV_URLS } = await import('../lib/env');
      const endpoint = `${ENV_URLS.rest || ENV_URLS.backendBase + '/api'}/remote/tps/execute-script`;
      const body = {
        Name: `Script - ${new Date().toLocaleString()}`,
        Kind: 'Embedded',
        Script: JSON.stringify(script, null, 2),
        BayIds: [selectedBayObj.dbId],
      };
      // Acquire token (reuse authService)
      const { authService } = await import('../lib/auth-service');
      const token = await authService.getAccessToken();
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errTxt = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${errTxt}`);
      }
      setExecMessage('✅ Script execution requested successfully');
    } catch (e: any) {
      setExecMessage(`❌ Failed: ${e.message || e}`);
    } finally {
      setExecuting(false);
      setTimeout(() => setExecMessage(null), 6000);
    }
  }

  return (
    <div className="tree-sidebar">
      <div className="sidebar-content">
        {/* File Operations Section */}
        <CollapsibleSection
          title="File Operations"
          className="file-operations-section"
          bodyClassName="file-buttons"
          defaultOpen
          persistKey="file-operations"
        >
          <LoadScriptButton onClick={onLoadScript} />
          <DownloadButton isValid={isValid} onClick={onDownloadScript} />
        </CollapsibleSection>

        {/* Bay Operations Section */}
        <CollapsibleSection
          title="Bay Operations"
          className="bay-operations-section"
          bodyClassName="bay-buttons"
          defaultOpen
          persistKey="bay-operations"
        >
          <LocationSelector
            selectedFacilityId={selectedFacilityId}
            selectedLocationId={selectedLocationId}
            persistedLocationId={persistedLocationId}
            onLocationSelect={onLocationSelect}
          />
          <BaySelector
            selectedFacilityId={selectedFacilityId}
            selectedLocationId={selectedLocationId}
            selectedBayId={selectedBayId}
            persistedBayId={persistedBayId}
            onBaySelect={onBaySelect}
          />
          <button
            className="tree-btn execute-btn"
            disabled={!canExecute || executing}
            onClick={handleExecuteScript}
            title={!isValid ? 'Script must be valid' : !selectedBayObj ? 'Select a bay first' : 'Execute script on bay'}
          >
            {executing ? 'Executing...' : 'Execute Script'}
          </button>
          {execMessage && (
            <div className="exec-status small-note">{execMessage}</div>
          )}
        </CollapsibleSection>

        {/* Edit Operations Section */}
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
          {/* Pass handleNodeIdChange to NodeEditor below */}
          <TreeView
            script={script}
            selectedRef={localSelectedRef}
            onSelectScript={onSelectScript}
            onSelectActivity={onSelectActivity}
            onSelectStep={onSelectStep}
            onDeleteActivity={onDeleteActivity}
            onDeleteStep={onDeleteStep}
          />
          {selectedNode && (
            <NodeEditor
              node={selectedNode}
              onUpdateActivity={(activityId: string, patch: Partial<Activity>) => {
                if (patch.id && patch.id !== activityId) {
                  handleNodeIdChange(activityId, patch.id, 'activity');
                }
                onUpdateActivity(activityId, patch);
              }}
              onUpdateStep={(stepId: string, patch: Partial<Step>) => {
                if (patch.id && patch.id !== stepId) {
                  let parentId = null;
                  if (selectedRef && selectedRef.kind === 'step') {
                    parentId = selectedRef.activityId;
                  }
                  handleNodeIdChange(stepId, patch.id, 'step', parentId || undefined);
                }
                onUpdateStep(stepId, patch);
              }}
            />
          )}
        </CollapsibleSection>
      </div>
      
      {/* Validation panel at bottom of sidebar */}
      <div className={`validation-panel-sidebar-bottom ${isValid ? 'ok' : 'fail'}`}> 
        <div className="validation-status">Schema: {isValid ? 'Valid' : 'Invalid'}</div>
        {!isValid && (
          <>
            {script.activities.length === 0 && (
              <div className="validation-hint-empty">Add your first activity to satisfy required 'activities'.</div>
            )}
            <ul className="validation-errors">
              {validationErrors.slice(0,8).map((e,i) => <li key={i}>{e}</li>)}
              {validationErrors.length > 8 && <li>...{validationErrors.length - 8} more</li>}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};