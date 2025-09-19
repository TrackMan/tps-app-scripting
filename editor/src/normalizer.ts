import { ScriptData, Activity, Step, isActivity } from './types';
import { createActivity, createStep } from './factories';

// Ensure activity has required structural defaults
export function normalizeActivity(raw: any): Activity {
  if (isActivity(raw)) {
    // ensure messages have seconds and required fields
    const nodeType = (raw.nodeType === 'PerformanceCenterScriptedActivity') ? 'PerformanceCenterScriptedActivity' : 'RangeAnalysisScriptedActivity';
    const base = createActivity({
      nodeType,
      id: raw.id || 'activity-unnamed',
      introHeader: raw.introMessage?.header || 'Intro',
      introDescription: raw.introMessage?.description || '',
    });
    base.endMessage = {
      header: raw.endMessage?.header || base.endMessage.header,
      description: raw.endMessage?.description || base.endMessage.description,
      seconds: raw.endMessage?.seconds ?? 3,
    };
    base.steps = Array.isArray(raw.steps) ? raw.steps.map(s => normalizeStep(s, nodeType)) : [];
    return base;
  }
  // fallback create new
  return createActivity({ nodeType: 'RangeAnalysisScriptedActivity', id: 'activity-unnamed', introHeader: 'Intro' });
}

export function normalizeStep(raw: any, parentActivityType: 'RangeAnalysisScriptedActivity' | 'PerformanceCenterScriptedActivity'): Step {
  const base = createStep({
    parentActivityType,
    id: raw.id || 'step-unnamed',
    introHeader: raw.introMessage?.header || 'Step Intro',
    introDescription: raw.introMessage?.description || '',
    successHeader: raw.successMessage?.header,
    failHeader: raw.failMessage?.header,
  });
  // merge logic specifics if present (preserve user-entered data)
  if (raw.logic) {
    base.logic = { ...base.logic, ...raw.logic };
    // Ensure setup presence and required properties
    const stepType = base.nodeType;
    if (!base.logic.setup || typeof base.logic.setup !== 'object') {
      // leave base.logic.setup from factory
    } else {
      if (stepType === 'RangeAnalysisScriptedStep') {
        base.logic.setup.nodeType = 'RangeAnalysisScriptedSetup';
        base.logic.setup.club = base.logic.setup.club || 'Drv';
        base.logic.setup.distance = base.logic.setup.distance ?? 200;
      } else { // Performance Center
        if (base.logic.setup.nodeType !== 'PerformanceCenterApproachScriptedSetup' && base.logic.setup.nodeType !== 'PerformanceCenterTeeShotsScriptedSetup') {
          // default to Approach variant
          base.logic.setup = { nodeType: 'PerformanceCenterApproachScriptedSetup', hole: 1, pin: 1, playerCategory: 'Handicap', hcp: 10, gender: 'Unspecified', minDistance: 50, maxDistance: 150 };
        } else {
          // fill variant specifics
          if (base.logic.setup.nodeType === 'PerformanceCenterApproachScriptedSetup') {
            base.logic.setup.hole = base.logic.setup.hole || 1;
            base.logic.setup.pin = base.logic.setup.pin || 1;
            base.logic.setup.playerCategory = base.logic.setup.playerCategory || 'Handicap';
            base.logic.setup.hcp = base.logic.setup.hcp ?? 10;
            base.logic.setup.gender = base.logic.setup.gender || 'Unspecified';
            base.logic.setup.minDistance = base.logic.setup.minDistance ?? 50;
            base.logic.setup.maxDistance = base.logic.setup.maxDistance ?? 150;
          } else {
            base.logic.setup.hole = base.logic.setup.hole || 1;
            base.logic.setup.playerCategory = base.logic.setup.playerCategory || 'Handicap';
            base.logic.setup.hcp = base.logic.setup.hcp ?? 10;
            base.logic.setup.gender = base.logic.setup.gender || 'Unspecified';
            base.logic.setup.courseDistance = base.logic.setup.courseDistance ?? 6000;
          }
        }
      }
    }
    // Ensure at least one condition in success/fail when arrays exist
    const ensureConditions = (grp: any) => {
      if (!grp) return grp;
      if (!Array.isArray(grp.conditions) || grp.conditions.length === 0) {
        grp.conditions = [{ parameter: 'Total', min: 0 }];
      }
      grp.nodeType = grp.nodeType || (stepType === 'RangeAnalysisScriptedStep' ? 'RangeAnalysisScriptedConditions' : 'PerformanceCenterScriptedConditions');
      grp.shots = grp.shots || 1;
      grp.conditionType = grp.conditionType || 'And';
      return grp;
    };
    base.logic.successCondition = ensureConditions(base.logic.successCondition);
    base.logic.failCondition = ensureConditions(base.logic.failCondition);
  }
  if (raw.ui) {
    base.ui = { ...base.ui, ...raw.ui };
  }
  return base;
}

export function normalizeScript(raw: any): ScriptData {
  const activities = Array.isArray(raw.activities) ? raw.activities.map((a: any) => normalizeActivity(a)) : [];
  
  // Preserve root-level properties in proper order: id, startMode, endMode, activities
  const result: ScriptData = { activities };
  
  // Add properties in desired order by reconstructing the object
  const orderedResult: ScriptData = { activities: [] };
  
  if (raw.id !== undefined) {
    orderedResult.id = raw.id;
  }
  if (raw.startMode !== undefined) {
    orderedResult.startMode = raw.startMode;
  }
  if (raw.endMode !== undefined) {
    orderedResult.endMode = raw.endMode;
  }
  
  // Always include activities last (required property)
  orderedResult.activities = activities;
  
  return orderedResult;
}
