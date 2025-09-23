import { Message, ScriptedActivity, ScriptedStep } from './types';

// Minimal factory functions for compilation
export function createMessage(partial: Partial<Message> = {}): Message {
  return {
    header: partial.header || '',
    description: partial.description || '',
    seconds: partial.seconds ?? 3,
  };
}

export function createActivity(opts: any): ScriptedActivity {
  const activity = {
    nodeType: opts.nodeType || 'RangeAnalysisScriptedActivity',
    id: opts.id,
    introMessage: opts.introMessage || {
      header: opts.introHeader || '',
      description: opts.introDescription || '',
      seconds: -1
    },
    endMessage: opts.endMessage || {
      header: '',
      description: '',
      seconds: -1
    },
    steps: opts.steps || []
  };
  
  return activity as ScriptedActivity;
}

export function createStep(opts: any): ScriptedStep {
  const stepType = opts.nodeType || 'RangeAnalysisScriptedStep';
  const isPerformanceCenter = stepType === 'PerformanceCenterScriptedStep';
  
  const step = {
    nodeType: stepType,
    id: opts.id,
    introMessage: opts.introMessage || {
      header: opts.introHeader || '',
      description: opts.introDescription || '',
      seconds: -1
    },
    successMessage: opts.successMessage || {
      header: '',
      description: '',
      seconds: -1
    },
    failMessage: opts.failMessage || {
      header: '',
      description: '',
      seconds: -1
    },
    logic: opts.logic || {
      nodeType: isPerformanceCenter ? 'PerformanceCenterScriptedLogic' : 'RangeAnalysisScriptedLogic',
      setup: isPerformanceCenter ? {
        nodeType: 'PerformanceCenterApproachScriptedSetup',
        hole: 1,
        pin: 1,
        playerCategory: 'Handicap',
        hcp: 10,
        gender: 'Unspecified',
        minDistance: 30.0,
        maxDistance: 220.0
      } : {
        nodeType: 'RangeAnalysisScriptedSetup',
        club: 'Drv',
        distance: 200
      },
      successCondition: {
        nodeType: isPerformanceCenter ? 'PerformanceCenterScriptedConditions' : 'RangeAnalysisScriptedConditions',
        shots: 1
      },
      skipOnSuccess: false
    },
    ui: {
      nodeType: isPerformanceCenter ? 'PerformanceCenterScriptedUI' : 'RangeAnalysisScriptedUI'
    }
  };
  
  return step as ScriptedStep;
}
