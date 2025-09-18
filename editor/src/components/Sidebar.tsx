import React from 'react';
import { ScriptData, Activity, Step } from '../types';
import { TreeView } from './TreeView';
import { BaySelector } from './BaySelector';
import { LocationSelector } from './LocationSelector';

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
  selectedRef: { kind: 'activity'; activityId: string } | { kind: 'step'; activityId: string; stepId: string } | null;
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
  onSelectActivity,
  onSelectStep,
  onDeleteActivity,
  onDeleteStep,
  parentActivityForAdd,
}) => {
  const [executing, setExecuting] = React.useState(false);
  const [execMessage, setExecMessage] = React.useState<string | null>(null);

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
      {/* File Operations Section */}
      <div className="file-operations-section">
        <h3 className="section-title">File Operations</h3>
        <div className="file-buttons">
          <button className="tree-btn load-btn" onClick={onLoadScript}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Load Script
          </button>
          <button 
            className="tree-btn download-btn" 
            disabled={!isValid}
            onClick={onDownloadScript}
            title={!isValid ? "Fix validation errors before downloading" : "Download script"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Bay Operations Section */}
      <div className="bay-operations-section">
        <h3 className="section-title">Bay Operations</h3>
        <div className="bay-buttons">
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
        </div>
      </div>

      {/* Edit Operations Section */}
      <div className="edit-operations-section">
        <h3 className="section-title">Edit Operations</h3>
        <div className="edit-buttons">
          <button
            className="tree-btn"
            disabled={!selectedNode || !isValid}
            onClick={onCloneSelected}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
            </svg>
            Clone Selected
          </button>
          <button className="tree-btn" onClick={onShowActivityDialog}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M11,15H13V17H15V15H17V13H15V11H13V13H11V15Z"/>
            </svg>
            Add Activity
          </button>
          <button
            className="tree-btn"
            disabled={!parentActivityForAdd}
            onClick={() => {
              if (parentActivityForAdd) {
                onShowStepDialog();
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
            </svg>
            Add Step
          </button>
        </div>
      </div>
      <TreeView
        script={script}
        selectedRef={selectedRef}
        onSelectActivity={onSelectActivity}
        onSelectStep={onSelectStep}
        onDeleteActivity={onDeleteActivity}
        onDeleteStep={onDeleteStep}
      />
      
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