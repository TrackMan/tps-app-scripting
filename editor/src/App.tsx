import React, { useState, useEffect, useReducer, useRef } from 'react';
import './treeview.css';
import { TopBar } from './components/TopBar';
import { TabBar } from './components/TabBar';
import { Sidebar } from './components/Sidebar';
// ...existing code...
import { ScriptEditor } from './components/ScriptEditor';
import { NodeEditor } from './components/NodeEditor';
import { DialogManager } from './components/DialogManager';
import { DocViewer } from './components/DocViewer';
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
  const [authChecked, setAuthChecked] = useState(false);
  
  // Persistence hook for selections
  const { selections, isLoading: isLoadingSelections, saveSelection } = usePersistedSelections();

  // Bay and facility state
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedBayId, setSelectedBayId] = useState<string | null>(null);
  const [selectedBayObj, setSelectedBayObj] = useState<Bay | null>(null);
  
  // Track if we've initialized from persistence to prevent re-initialization
  const hasInitializedFromPersistence = useRef(false);
  
  const { script } = state;
  const { isValid, errors: validationErrors } = state.validation;

  // Immediate authentication check and redirect
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Skip auth check if we're handling OAuth callback
      if (window.location.pathname === '/account/callback') {
        setAuthChecked(true);
        return;
      }

      // Check if we just came back from logout
      const urlParams = new URLSearchParams(window.location.search);
      const loggedOut = urlParams.get('logged_out');
      const forceLogin = urlParams.get('force_login');
      const completeLogout = urlParams.get('complete_logout');
      const logoutComplete = urlParams.get('logout_complete');
      const promptLogin = urlParams.get('prompt');
      
      if (loggedOut || forceLogin || completeLogout || logoutComplete) {
        // Clear all logout-related parameters from URL
        window.history.replaceState({}, document.title, '/');
        console.log('🔄 Returned from logout, forcing fresh login...');
        
        // Clear any remaining authentication state to ensure fresh login
        try {
          const { authService } = await import('./lib/auth-service');
          authService.clearToken(); // Make sure all tokens are cleared
          
          // Also try to clear localStorage/sessionStorage again
          localStorage.clear();
          sessionStorage.clear();
        } catch (error) {
          console.warn('Failed to clear tokens:', error);
        }
        
        // If this is the logout completion page, show a brief message then redirect to OAuth
        if (logoutComplete) {
          console.log('✅ Logout completed successfully, redirecting to login...');
          // Add a small delay to show the logout was successful
          setTimeout(async () => {
            try {
              const { authService } = await import('./lib/auth-service');
              await authService.startOAuthLogin('login'); // Force login screen
            } catch (error) {
              console.error('Failed to start OAuth login:', error);
              window.location.reload(); // Fallback
            }
          }, 1000);
          setAuthChecked(true);
          return;
        }
      }

      try {
        const { authService } = await import('./lib/auth-service');
        
        if (!authService.isAuthenticated() || loggedOut || forceLogin || completeLogout) {
          console.log('🔐 User not authenticated or logout forced, redirecting to TrackMan login...');
          
          // If we have a prompt parameter, pass it to the OAuth login to force login screen
          if (promptLogin === 'login') {
            console.log('🔑 Adding prompt=login to force login screen...');
          }
          
          await authService.startOAuthLogin(promptLogin === 'login' ? 'login' : undefined);
          // This will redirect away, so we won't reach the next line
          return;
        }
        
        console.log('✅ User is authenticated');
        setAuthChecked(true);
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        setAuthChecked(true); // Show app anyway if auth check fails
      }
    };

    checkAuthAndRedirect();
  }, []);

  // Handle OAuth callback - monitor URL changes
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const currentUrl = window.location.href;
      const urlPath = window.location.pathname;
      
      // Extract code from URL to create unique processing key
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const callbackKey = `oauth_callback_processed_${code}`;
      
      // Check if we've already processed this specific callback
      const alreadyProcessed = sessionStorage.getItem(callbackKey);
      
      console.log('🔍 Checking OAuth callback:', { 
        urlPath, 
        hasCode: currentUrl.includes('code='), 
        processed: !!alreadyProcessed,
        codePreview: code?.substring(0, 8) + '...'
      });
      
      if (urlPath === '/account/callback' && code && !alreadyProcessed) {
        // Mark this specific callback as being processed
        sessionStorage.setItem(callbackKey, 'true');
        
        console.log('🔄 OAuth callback detected:', currentUrl);
        try {
          const { authService } = await import('./lib/auth-service');
          await authService.handleOAuthCallback(currentUrl);
          
          // Clear the URL parameters and redirect to main app
          window.history.replaceState({}, document.title, '/');
          
          console.log('✅ OAuth login successful, reloading app...');
          window.location.reload();
        } catch (error) {
          console.error('❌ OAuth callback failed:', error);
          console.error('❌ Full error details:', {
            name: (error as Error).name,
            message: (error as Error).message,
            stack: (error as Error).stack
          });
          
          // Clear the processing flag on error so user can retry
          sessionStorage.removeItem(callbackKey);
          
          // Show a more user-friendly error message
          const errorMsg = (error as Error).message;
          if (errorMsg.includes('invalid_grant')) {
            alert('Login failed: Authorization code has already been used or expired.\n\nThis can happen if the login process runs multiple times. Please try logging in again.');
          } else if (errorMsg.includes('Failed to fetch')) {
            alert('Login failed: Unable to connect to authentication server. This may be a network or CORS issue.\n\nPlease check:\n1. Your internet connection\n2. If you are on a corporate network, contact your IT administrator\n3. Try refreshing the page');
          } else {
            alert('Login failed: ' + errorMsg);
          }
          window.history.replaceState({}, document.title, '/');
        }
      }
    };

    // Handle callback on mount
    handleOAuthCallback();

    // Also listen for URL changes (in case of navigation without page reload)
    const handlePopState = () => {
      handleOAuthCallback();
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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

  // Initialize selections from persisted data on startup (only once)
  useEffect(() => {
    if (!isLoadingSelections && selections && !hasInitializedFromPersistence.current) {
      // Only restore facility if we don't already have one selected
      if (selections.facilityId && !selectedFacilityId) {
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
      
      // Mark as initialized to prevent re-running
      hasInitializedFromPersistence.current = true;
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

      let baseId = step.id?.trim() || 'step';
      let candidate = baseId;
      let counter = 1;
      const existingIds = new Set(parent.steps.map(s => s.id));
      
      while (existingIds.has(candidate)) {
        candidate = `${baseId}-${counter++}`;
      }
      if (candidate !== step.id) {
        step = { ...step, id: candidate } as Step;

      }
    }
    

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

  // Don't render anything until auth check is complete
  if (!authChecked) {
    // Check if we're on the logout completion page
    const urlParams = new URLSearchParams(window.location.search);
    const logoutComplete = urlParams.get('logout_complete');
    
    if (logoutComplete) {
      return (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ margin: '0 0 1rem 0', color: '#333' }}>Logout Successful</h2>
            <p style={{ margin: '0', color: '#666' }}>
              You have been logged out successfully.<br/>
              Redirecting to login page...
            </p>
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '0.9em',
              color: '#666'
            }}>
              <div className="spinner" style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid #ddd',
                borderTop: '2px solid #007acc',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '8px'
              }}></div>
              Please wait...
            </div>
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }
    
    return null; // This prevents any UI from showing during redirect
  }

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
  {/* <EnvironmentDebug /> */}
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
          <div className="tree-main">
            {state.selectedRef?.kind === 'script' ? (
              <>
                <h2>Script Configuration</h2>
                <ScriptEditor
                  script={script}
                  onChange={updateScript}
                />
                <pre>{JSON.stringify(script, null, 2)}</pre>
              </>
            ) : selectedNode ? (
              <NodeEditor
                node={selectedNode}
                onUpdateActivity={updateActivity}
                onUpdateStep={updateStep}
              />
            ) : (
              <div className="empty-node-editor">Select a node to edit its details.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="documentation-flex">
          <DocViewer />
        </div>
      )}
    </div>
  );
}


