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
  const step = {
    nodeType: opts.nodeType || 'RangeAnalysisScriptedStep',
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
      // Default logic based on step type
      ...(opts.nodeType === 'PerformanceCenterScriptedStep' ? {
        nodeType: 'PerformanceCenterScriptedLogic'
      } : {
        nodeType: 'RangeAnalysisScriptedLogic'
      })
    }
  };
  
  return step as ScriptedStep;
}
