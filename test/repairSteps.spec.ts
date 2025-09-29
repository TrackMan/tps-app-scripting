import { describe, it, expect } from 'vitest';
import { repairActivities } from '../src/lib/repairSteps';
import { Activity } from '../src/types';

describe('repairActivities', () => {
  it('adds setup and default conditions for RangeAnalysis steps when missing', () => {
    const activities: Activity[] = [
      {
        nodeType: 'RangeAnalysisScriptedActivity',
        steps: [
          {
            nodeType: 'RangeAnalysisScriptedStep',
            logic: {
              nodeType: 'RangeAnalysisScriptedLogic',
              // setup missing -> should be added
              successCondition: undefined,
              failCondition: undefined,
            } as any,
          } as any,
        ],
      } as any,
    ];

    const res = repairActivities(activities);
    expect(res.mutated).toBe(true);
    expect(res.activities[0].steps[0].logic.setup).toBeDefined();
    expect(res.activities[0].steps[0].logic.setup.nodeType).toBe('RangeAnalysisScriptedSetup');
    expect(res.activities[0].steps[0].logic.successCondition).toBeUndefined();
  });

  it('adds setup and default conditions for PerformanceCenter steps when missing', () => {
    const activities: Activity[] = [
      {
        nodeType: 'PerformanceCenterScriptedActivity',
        steps: [
          {
            nodeType: 'PerformanceCenterScriptedStep',
            logic: {
              nodeType: 'PerformanceCenterScriptedLogic',
              // setup missing -> should be added
              successCondition: undefined,
              failCondition: undefined,
            } as any,
          } as any,
        ],
      } as any,
    ];

    const res = repairActivities(activities);
    expect(res.mutated).toBe(true);
    expect(res.activities[0].steps[0].logic.setup).toBeDefined();
    expect(res.activities[0].steps[0].logic.setup.nodeType).toBe('PerformanceCenterApproachScriptedSetup');
  });

  it('does not mutate already-correct activities', () => {
    const activities: Activity[] = [
      {
        nodeType: 'RangeAnalysisScriptedActivity',
        steps: [
          {
            nodeType: 'RangeAnalysisScriptedStep',
            logic: {
              nodeType: 'RangeAnalysisScriptedLogic',
              setup: { nodeType: 'RangeAnalysisScriptedSetup', club: 'Drv', distance: 100 },
              successCondition: { nodeType: 'RangeAnalysisScriptedConditions', shots: 1, conditionType: 'And', conditions: [{ parameter: 'Total', min: 0 }] },
            } as any,
          } as any,
        ],
      } as any,
    ];

    const res = repairActivities(activities);
    expect(res.mutated).toBe(false);
  });
});
