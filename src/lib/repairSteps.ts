import { ScriptData, Step, Activity } from '../types';

// Extract and export the migration logic so it can be unit tested.
export function repairActivities(activities: Activity[]): { activities: Activity[]; mutated: boolean } {
  let mutated = false;

  const repairedActivities = activities.map(act => {
    if (act.nodeType === 'RangeAnalysisScriptedActivity') {
      const repairedSteps = act.steps.map(step => {
        const newStep = { ...step } as Step;
        if (newStep.logic) {
          if (newStep.nodeType === 'RangeAnalysisScriptedStep') {
            if (!newStep.logic.setup || newStep.logic.setup.nodeType !== 'RangeAnalysisScriptedSetup') {
              newStep.logic.setup = { nodeType: 'RangeAnalysisScriptedSetup', club: 'Drv', distance: 200 } as any;
              mutated = true;
            }
          }

          const fixCondRange = (grp: any): any => {
            if (!grp) return grp;
            if (!grp.nodeType) {
              grp.nodeType = 'RangeAnalysisScriptedConditions';
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

          newStep.logic.successCondition = fixCondRange(newStep.logic.successCondition);
          newStep.logic.failCondition = fixCondRange(newStep.logic.failCondition);
        }
        return newStep;
      });
      if (repairedSteps.some((s, idx) => s !== act.steps[idx])) {
        mutated = true;
        return { ...act, steps: repairedSteps } as Activity;
      }
      return act;
    }

    // PerformanceCenterScriptedActivity
    const repairedSteps = act.steps.map(step => {
      const newStep = { ...step } as Step;
      if (newStep.logic) {
        if (newStep.nodeType === 'PerformanceCenterScriptedStep') {
          if (!newStep.logic.setup || (newStep.logic.setup.nodeType !== 'PerformanceCenterApproachScriptedSetup' && newStep.logic.setup.nodeType !== 'PerformanceCenterTeeShotsScriptedSetup')) {
            newStep.logic.setup = { nodeType: 'PerformanceCenterApproachScriptedSetup', hole: 1, pin: 1, playerCategory: 'Handicap', hcp: 10, gender: 'Male', minDistance: 50, maxDistance: 150 } as any;
            mutated = true;
          }
        }

        const fixCondPerf = (grp: any): any => {
          if (!grp) return grp;
          if (!grp.nodeType) {
            grp.nodeType = 'PerformanceCenterScriptedConditions';
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

        newStep.logic.successCondition = fixCondPerf(newStep.logic.successCondition);
        newStep.logic.failCondition = fixCondPerf(newStep.logic.failCondition);
      }
      return newStep;
    });
    if (repairedSteps.some((s, idx) => s !== act.steps[idx])) {
      mutated = true;
      return { ...act, steps: repairedSteps } as Activity;
    }
    return act;
  });

  return { activities: repairedActivities, mutated };
}
