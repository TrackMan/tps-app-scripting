import React, { useState, useEffect, useReducer } from 'react';
import './treeview.css';
import { TopBar } from './components/TopBar';
import { TabBar } from './components/TabBar';
import { Sidebar } from './components/Sidebar';
import { NodeDetailsPanel } from './components/NodeDetailsPanel';
import { ScriptEditor } from './components/ScriptEditor';
import { DialogManager } from './components/DialogManager';
import { DocumentationViewer } from './components/DocumentationViewer';
import { EnvironmentDebug } from './components/EnvironmentDebug';
import { Activity, Step, ScriptData, isActivity, isStep, LogicNode } from './types';
import { normalizeScript } from './normalizer';
import { createActivity, createStep } from './factories';
import { validateScript, formatErrors, getValidatorStatus } from './validator';
import { editorReducer, initialEditorState, getSelectedNode } from './editorReducer';
import { usePersistedSelections } from './hooks/usePersistedSelections';

type TabType = 'edit' | 'documentation';

interface Bay {
  id: string;
  dbId: number;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

interface Facility {
  id: string;
  name: string;
  kind: string;
  developerAccess?: string | null;
  apiDeveloperAccess?: string | null;
}

// --- Main App ---------------------------------------------------------
export default function App() {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);
  const selectedNode = getSelectedNode(state);
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('edit');
  
  // Persistence hook for selections
  const { selections, isLoading: isLoadingSelections, saveSelection } = usePersistedSelections();

  // Bay and facility state
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedBayId, setSelectedBayId] = useState<string | null>(null);
  const [selectedBayObj, setSelectedBayObj] = useState<Bay | null>(null);
  
  const { script } = state;
  const { isValid, errors: validationErrors } = state.validation;

  // One-time migration effect: ensure any pre-existing steps have required setup & at least one condition
  const [migrationComplete, setMigrationComplete] = useState(false);
  useEffect(() => {
    if (migrationComplete) return; // Only run once
    
    let mutated = false;
    const repairedActivities = script.activities.map(act => {
      const repairedSteps = act.steps.map(step => {
        const newStep = { ...step } as Step;
        if (newStep.logic) {
          // Repair setup
            if (newStep.nodeType === 'RangeAnalysisScriptedStep') {
              if (!newStep.logic.setup || newStep.logic.setup.nodeType !== 'RangeAnalysisScriptedSetup') {
                newStep.logic.setup = { nodeType: 'RangeAnalysisScriptedSetup', club: 'Drv', distance: 200 };
                mutated = true;
              }
            } else if (newStep.nodeType === 'PerformanceCenterScriptedStep') {
              if (!newStep.logic.setup || (newStep.logic.setup.nodeType !== 'PerformanceCenterApproachScriptedSetup' && newStep.logic.setup.nodeType !== 'PerformanceCenterTeeShotsScriptedSetup')) {
                newStep.logic.setup = { nodeType: 'PerformanceCenterApproachScriptedSetup', hole: 1, pin: 1, playerCategory: 'Handicap', hcp: 10, gender: 'Unspecified', minDistance: 50, maxDistance: 150 };
                mutated = true;
              }
            }
          const fixCond = (grp: any, isRange: boolean) => {
            if (!grp) return grp;
            if (!grp.nodeType) {
              grp.nodeType = isRange ? 'RangeAnalysisScriptedConditions' : 'PerformanceCenterScriptedConditions';
              mutated = true;
            }
            if (!Array.isArray(grp.conditions) || grp.conditions.length === 0) {
              grp.conditions = [{ parameter: 'Total', min: 0 }];
              mutated = true;
            }
            if (!grp.shots) { grp.shots = 1; mutated = true; }
            if (!grp.conditionType) { grp.conditionType = 'And'; mutated = true; }
            return grp;
          };
          const isRange = newStep.nodeType === 'RangeAnalysisScriptedStep';
          newStep.logic.successCondition = fixCond(newStep.logic.successCondition, isRange);
          newStep.logic.failCondition = fixCond(newStep.logic.failCondition, isRange);
        }
        return newStep;
      });
      if (repairedSteps.some((s, idx) => s !== act.steps[idx])) {
        mutated = true;
        return { ...act, steps: repairedSteps };
      }
      return act;
    });
    if (mutated) {
      // dispatch minimal updates via LOAD_SCRIPT to reuse validation effect
      dispatch({ type: 'LOAD_SCRIPT', script: { activities: repairedActivities } });
    }
    setMigrationComplete(true);
  }, [script.activities, migrationComplete]);

  // Revalidate whenever script changes
  useEffect(() => {
    const status = getValidatorStatus();
    if (!status.ok) {
      dispatch({ type: 'SET_VALIDATION', isValid: false, errors: [status.error?.message || 'Schema validator failed to initialize'] });
      return;
    }
    const { valid, errors } = validateScript(script);
    dispatch({ type: 'SET_VALIDATION', isValid: valid, errors: formatErrors(errors) });
  }, [script]);

  // Initialize selections from persisted data on startup
  useEffect(() => {
    if (!isLoadingSelections && selections) {
      if (selections.facilityId && selections.facilityId !== selectedFacilityId) {
        setSelectedFacilityId(selections.facilityId);
        console.log('Restored facility ID from persistence:', selections.facilityId);
        // Note: The facility object will be restored by the FacilitySelectorPortal 
        // when it loads facilities and finds the matching ID
      }
      // Location and bay restoration will be handled by their respective selectors
      if (selections.locationId) {
        console.log('Will restore location ID from persistence:', selections.locationId);
      }
      if (selections.bayId) {
        console.log('Will restore bay ID from persistence:', selections.bayId);
      }
    }
  }, [isLoadingSelections, selections, selectedFacilityId]);

  const loadScript = async () => {
    try {
      // Create a file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.multiple = false;
      
      // Handle file selection
      input.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        
        if (!file) return;
        
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          dispatch({ type: 'LOAD_SCRIPT', script: normalizeScript(data) });
          console.log('Script loaded successfully:', file.name);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Error loading script: Invalid JSON file. Please check the file format.');
        }
      };
      
      // Trigger file dialog
      input.click();
    } catch (error) {
      console.error('Error opening file dialog:', error);
      alert('Error opening file dialog.');
    }
  };

  const downloadScript = async () => {
    if (!isValid) {
      alert('Cannot download: Script contains validation errors. Please fix them first.');
      return;
    }

    try {
      // Use default script name
      const scriptName = 'untitled-script';
      const filename = `${scriptName}.json`;
      const jsonString = JSON.stringify(script, null, 2);
      
      // Create and trigger download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      console.log('Script downloaded successfully:', filename);
    } catch (error) {
      console.error('Error downloading script:', error);
      alert('Error downloading script.');
    }
  };

  const handleFacilitySelect = async (facility: Facility | null) => {
    setSelectedFacility(facility);
    setSelectedFacilityId(facility ? facility.id : null);
    // Clear location and bay selection when facility changes
    setSelectedLocation(null);
    setSelectedBayId(null);
    
    // Persist facility selection
    try {
      await saveSelection('FACILITY_ID', facility?.id || null);
      // Also clear persisted location and bay when facility changes
      await saveSelection('LOCATION_ID', null);
      await saveSelection('BAY_ID', null);
      console.log('Facility selected and persisted:', facility);
    } catch (error) {
      console.error('Failed to persist facility selection:', error);
    }
  };

  const handleLocationSelect = async (location: Location | null) => {
    setSelectedLocation(location);
    // Clear bay selection when location changes
    setSelectedBayId(null);
    
    // Persist location selection
    try {
      await saveSelection('LOCATION_ID', location?.id || null);
      // Also clear persisted bay when location changes
      await saveSelection('BAY_ID', null);
      console.log('Location selected and persisted:', location);
    } catch (error) {
      console.error('Failed to persist location selection:', error);
    }
  };

  const handleBaySelect = async (bay: Bay | null) => {
    const bayId = bay?.id || null;
    setSelectedBayId(bayId);
    setSelectedBayObj(bay);
    try {
      await saveSelection('BAY_ID', bayId);
      console.log('Bay selected and persisted:', bay);
    } catch (error) {
      console.error('Failed to persist bay selection:', error);
    }
  };

  const handleAddActivity = (activity: Activity) => {
    dispatch({ type: 'ADD_ACTIVITY', activity, select: true });
  };

  const handleAddStep = (step: Step, targetParentActivityId: string) => {
    console.log('🔍 handleAddStep called:', { 
      stepId: step.id, 
      targetParentActivityId, 
      currentSelected: state.selectedRef,
      stepObject: step 
    });
    
    // Ensure unique step id within the parent activity to avoid selection confusion
    const parent = script.activities.find(a => a.id === targetParentActivityId);
    if (parent) {
      console.log('🔍 Found parent activity:', parent.id, 'existing steps:', parent.steps.map(s => s.id));
      let baseId = step.id?.trim() || 'step';
      let candidate = baseId;
      let counter = 1;
      const existingIds = new Set(parent.steps.map(s => s.id));
      
      while (existingIds.has(candidate)) {
        candidate = `${baseId}-${counter++}`;
      }
      if (candidate !== step.id) {
        step = { ...step, id: candidate } as Step;
        console.log('🔍 Updated step id to:', candidate);
      }
    }
    
    console.log('🔍 Dispatching ADD_STEP with:', { parentActivityId: targetParentActivityId, stepId: step.id });
    dispatch({ type: 'ADD_STEP', parentActivityId: targetParentActivityId, step, select: true });
  };

  const deleteActivity = (activityId: string) => {
    dispatch({ type: 'DELETE_ACTIVITY', activityId });
  };

  const deleteStep = (activityId: string, stepId: string) => {
    dispatch({ type: 'DELETE_STEP', activityId, stepId });
  };

  const updateActivity = (activityId: string, patch: Partial<Activity>) => {
    dispatch({ type: 'UPDATE_ACTIVITY', activityId, patch });
  };



  // Find the parent activity for adding a new step
  const parentActivityForAdd = React.useMemo(() => {
    if (!state.selectedRef) {
      return undefined;
    }
    
    if (state.selectedRef.kind === 'script') {
      return undefined;
    }
    
    const activityId = state.selectedRef.activityId;
    return script.activities.find(a => a.id === activityId);
  }, [state.selectedRef, script.activities]);

  // Helper to update a step (by id) inside the script
  const updateStep = (stepId: string, patch: Partial<Step>) => {
    dispatch({ type: 'UPDATE_STEP', stepId, patch });
  };

  // Helper to update the script data while preserving property order
  const updateScript = (patch: Partial<ScriptData>) => {
    // Merge patch into current script first
    const merged = { ...script, ...patch };
    
    // Force property order by using JSON parse/stringify trick
    const orderedScript: any = {};
    
    // Build object with explicit property order
    const propertyOrder: (keyof ScriptData)[] = ['id', 'startMode', 'endMode', 'activities'];
    
    for (const key of propertyOrder) {
      if (key === 'activities') {
        // Always include activities (required)
        orderedScript.activities = merged.activities;
      } else if (merged[key] !== undefined && merged[key] !== '') {
        orderedScript[key] = merged[key];
      }
    }
    
    // Ensure we have a clean object with proper property order
    const cleanScript = JSON.parse(JSON.stringify(orderedScript));
    
    dispatch({ type: 'LOAD_SCRIPT', script: cleanScript as ScriptData });
  };

  // Ensure step logic is properly initialized when a step is selected
  useEffect(() => {
    const isStepSelected = !!selectedNode && isStep(selectedNode);
    if (!isStepSelected || !selectedNode) return;
    const step = selectedNode as Step;
    if (step.logic && step.logic.successCondition && step.logic.failCondition) return;
    
    // Only add logic if it doesn't already exist, and avoid string replacement corruption
    if (!step.nodeType || !step.id) return;
    
    // Create proper default logic based on step type without corrupting existing valid data
    let logicPatch: Partial<LogicNode> = {};
    
    if (step.nodeType === 'RangeAnalysisScriptedStep') {
      logicPatch = {
        nodeType: 'RangeAnalysisScriptedLogic',
        setup: step.logic?.setup || { nodeType: 'RangeAnalysisScriptedSetup' },
        successCondition: step.logic?.successCondition || { 
          nodeType: 'RangeAnalysisScriptedConditions', 
          shots: 1, 
          conditions: [] 
        },
        failCondition: step.logic?.failCondition || { 
          nodeType: 'RangeAnalysisScriptedConditions', 
          shots: 1, 
          conditions: [] 
        },
        canRetry: step.logic?.canRetry ?? true,
        skipOnSuccess: step.logic?.skipOnSuccess ?? false,
      };
    } else if (step.nodeType === 'PerformanceCenterScriptedStep') {
      logicPatch = {
        nodeType: 'PerformanceCenterScriptedLogic',
        setup: step.logic?.setup || { nodeType: 'PerformanceCenterTeeShotsScriptedSetup' },
        successCondition: step.logic?.successCondition || { 
          nodeType: 'PerformanceCenterScriptedConditions', 
          shots: 1, 
          conditions: [] 
        },
        failCondition: step.logic?.failCondition || { 
          nodeType: 'PerformanceCenterScriptedConditions', 
          shots: 1, 
          conditions: [] 
        },
        canRetry: step.logic?.canRetry ?? true,
        skipOnSuccess: step.logic?.skipOnSuccess ?? false,
      };
    } else {
      // Unknown step type, don't modify
      return;
    }
    
    updateStep(step.id, { logic: logicPatch } as any);
  }, [selectedNode]);

  return (
    <div className="app-container">
      <TopBar 
        selectedFacility={selectedFacility}
        selectedFacilityId={selectedFacilityId}
        onFacilitySelect={handleFacilitySelect}
      />
      <TabBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      <EnvironmentDebug />
      {activeTab === 'edit' ? (
        <div className="tree-flex">
          <DialogManager
            showActivityDialog={showActivityDialog}
            showStepDialog={showStepDialog}
            onCloseActivityDialog={() => setShowActivityDialog(false)}
            onCloseStepDialog={() => setShowStepDialog(false)}
            onAddActivity={handleAddActivity}
            onAddStep={handleAddStep}
            parentActivityForAdd={parentActivityForAdd}
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
            selectedBayId={selectedBayId}
            persistedBayId={selections?.bayId || null}
            selectedBayObj={selectedBayObj}
            onLoadScript={loadScript}
            onDownloadScript={downloadScript}
            onLocationSelect={handleLocationSelect}
            onBaySelect={handleBaySelect}
            onCloneSelected={() => dispatch({ type: 'CLONE_SELECTED' })}
            onShowActivityDialog={() => setShowActivityDialog(true)}
            onShowStepDialog={() => setShowStepDialog(true)}
            onSelectScript={() => dispatch({ type: 'SELECT_SCRIPT' })}
            onSelectActivity={(activityId: string) => dispatch({ type: 'SELECT_ACTIVITY', activityId })}
            onSelectStep={(activityId: string, stepId: string) => dispatch({ type: 'SELECT_STEP', activityId, stepId })}
            onDeleteActivity={deleteActivity}
            onDeleteStep={deleteStep}
            parentActivityForAdd={parentActivityForAdd}
          />
          {state.selectedRef?.kind === 'script' ? (
            <div className="tree-main">
              <h2>Script Configuration</h2>
              <ScriptEditor
                script={script}
                onChange={updateScript}
              />
              <pre>{JSON.stringify(script, null, 2)}</pre>
            </div>
          ) : (
            <NodeDetailsPanel
              selectedNode={selectedNode}
              onUpdateActivity={updateActivity}
              onUpdateStep={updateStep}
            />
          )}
        </div>
      ) : (
        <div className="documentation-flex">
          <DocumentationViewer />
        </div>
      )}
    </div>
  );
}


