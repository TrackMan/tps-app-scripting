import { Activity, Step, ScriptData } from './types';
import { normalizeActivity, normalizeStep } from './normalizer';

export interface EditorState {
  script: ScriptData;
  selectedRef: { kind: 'script' } | { kind: 'activity'; activityId: string } | { kind: 'step'; activityId: string; stepId: string } | null;
  validation: { isValid: boolean; errors: string[] };
}

export const initialScript: ScriptData = { activities: [] };

export const initialEditorState: EditorState = {
  script: initialScript,
  selectedRef: null,
  validation: { isValid: true, errors: [] },
};

export type EditorAction =
  | { type: 'LOAD_SCRIPT'; script: ScriptData }
  | { type: 'ADD_ACTIVITY'; activity: Activity; select?: boolean }
  | { type: 'ADD_STEP'; parentActivityId: string; step: Step; select?: boolean }
  | { type: 'UPDATE_ACTIVITY'; activityId: string; patch: Partial<Activity> }
  | { type: 'UPDATE_STEP'; stepId: string; patch: Partial<Step> }
  | { type: 'DELETE_ACTIVITY'; activityId: string }
  | { type: 'DELETE_STEP'; activityId: string; stepId: string }
  | { type: 'SELECT_SCRIPT' }
  | { type: 'SELECT_ACTIVITY'; activityId: string }
  | { type: 'SELECT_STEP'; activityId: string; stepId: string }
  | { type: 'CLONE_SELECTED' }
  | { type: 'SET_VALIDATION'; isValid: boolean; errors: string[] };

function findActivity(script: ScriptData, id: string): Activity | undefined {
  return script.activities.find(a => a.id === id);
}

function findStep(script: ScriptData, id: string): { parent: Activity; step: Step } | undefined {
  for (const a of script.activities) {
    const s = a.steps.find(st => st.id === id);
    if (s) return { parent: a, step: s };
  }
  return undefined;
}

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'LOAD_SCRIPT':
      return { ...state, script: action.script };
    case 'ADD_ACTIVITY':
      return { 
        ...state, 
        script: { ...state.script, activities: [...state.script.activities, action.activity] },
        selectedRef: action.select ? { kind: 'activity', activityId: action.activity.id } : state.selectedRef
      };
    case 'ADD_STEP': {
      console.log('🔍 ADD_STEP reducer:', { 
        parentActivityId: action.parentActivityId, 
        stepId: action.step.id, 
        select: action.select,
        currentActivities: state.script.activities.map(a => ({ id: a.id, stepCount: a.steps.length }))
      });
      
      const activities = state.script.activities.map(a =>
        a.id === action.parentActivityId ? { ...a, steps: [...a.steps, action.step] } : a
      );
      
      const newState = {
        ...state,
        script: { ...state.script, activities },
        selectedRef: action.select ? { kind: 'step' as const, activityId: action.parentActivityId, stepId: action.step.id } : state.selectedRef
      };
      
      console.log('🔍 ADD_STEP result:', {
        newActivities: newState.script.activities.map(a => ({ id: a.id, stepCount: a.steps.length, steps: a.steps.map(s => s.id) })),
        newSelectedRef: newState.selectedRef
      });
      
      return newState;
    }
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        script: {
          ...state.script,
            activities: state.script.activities.map(a => a.id === action.activityId ? { ...a, ...action.patch } : a)
        }
      };
    case 'UPDATE_STEP':
      return {
        ...state,
        script: {
          ...state.script,
          activities: state.script.activities.map(a => ({
            ...a,
            steps: a.steps.map(s => s.id === action.stepId ? { ...s, ...action.patch } : s)
          }))
        }
      };
    case 'DELETE_ACTIVITY': {
      const activities = state.script.activities.filter(a => a.id !== action.activityId);
      const selectedRef = state.selectedRef && state.selectedRef.kind === 'activity' && state.selectedRef.activityId === action.activityId ? null : state.selectedRef;
      return { ...state, script: { ...state.script, activities }, selectedRef };
    }
    case 'DELETE_STEP': {
      const activities = state.script.activities.map(a =>
        a.id === action.activityId ? { ...a, steps: a.steps.filter(s => s.id !== action.stepId) } : a
      );
      const selectedRef = state.selectedRef && state.selectedRef.kind === 'step' && state.selectedRef.stepId === action.stepId ? null : state.selectedRef;
      return { ...state, script: { ...state.script, activities }, selectedRef };
    }
    case 'SELECT_SCRIPT':
      return { ...state, selectedRef: { kind: 'script' } };
    case 'SELECT_ACTIVITY':
      return { ...state, selectedRef: { kind: 'activity', activityId: action.activityId } };
    case 'SELECT_STEP':
      return { ...state, selectedRef: { kind: 'step', activityId: action.activityId, stepId: action.stepId } };
    case 'CLONE_SELECTED': {
      const ref = state.selectedRef;
      if (!ref) return state;
      if (ref.kind === 'script') {
        // Cannot clone script itself
        return state;
      }
      if (ref.kind === 'activity') {
        const act = findActivity(state.script, ref.activityId);
        if (act) {
          const cloned = normalizeActivity({ ...act, id: act.id + '-copy' });
          return { ...state, script: { ...state.script, activities: [...state.script.activities, cloned] } };
        }
        return state;
      }
      if (ref.kind === 'step') {
        const stepFound = findStep(state.script, ref.stepId);
        if (stepFound) {
          const { parent, step } = stepFound;
          const cloned = normalizeStep({ ...step, id: step.id + '-copy' }, parent.nodeType as any);
          return {
            ...state,
            script: {
              ...state.script,
              activities: state.script.activities.map(a =>
                a.id === parent.id ? { ...a, steps: [...a.steps, cloned] } : a
              )
            }
          };
        }
      }
      return state;
    }
    case 'SET_VALIDATION':
      return { ...state, validation: { isValid: action.isValid, errors: action.errors } };
    default:
      return state;
  }
}

export function getSelectedNode(state: EditorState): Activity | Step | null {
  const ref = state.selectedRef;
  if (!ref) return null;
  if (ref.kind === 'script') {
    // Script selection doesn't return a node, handled separately in App
    return null;
  }
  if (ref.kind === 'activity') {
    return state.script.activities.find(a => a.id === ref.activityId) || null;
  }
  if (ref.kind === 'step') {
    const parent = state.script.activities.find(a => a.id === ref.activityId);
    if (!parent) return null;
    return parent.steps.find(s => s.id === ref.stepId) || null;
  }
  return null;
}
