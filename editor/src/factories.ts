import { Activity, Step, Message, LogicNode } from './types';

// Shared message factory with sensible defaults
export function createMessage(partial: Partial<Message>): Message {
  return {
    header: partial.header || '',
    description: partial.description || '',
    seconds: partial.seconds ?? 3,
  };
}

export interface CreateActivityOptions {
  nodeType: 'RangeAnalysisScriptedActivity' | 'PerformanceCenterScriptedActivity';
  id: string;
  introHeader: string;
  introDescription?: string;
}

export function createActivity(opts: CreateActivityOptions): Activity {
  return {
    nodeType: opts.nodeType,
    id: opts.id,
    introMessage: createMessage({ header: opts.introHeader, description: opts.introDescription }),
    endMessage: createMessage({ header: opts.introHeader + ' ended', description: opts.introDescription }),
    steps: [],
  };
}

export interface CreateStepOptions {
  parentActivityType: 'RangeAnalysisScriptedActivity' | 'PerformanceCenterScriptedActivity';
  id: string;
  introHeader: string;
  introDescription?: string;
  successHeader?: string;
  failHeader?: string;
}

export function createStep(opts: CreateStepOptions): Step {
  const stepType = opts.parentActivityType === 'PerformanceCenterScriptedActivity'
    ? 'PerformanceCenterScriptedStep'
    : 'RangeAnalysisScriptedStep';
  const logicNodeType = stepType.replace('Step', 'Logic');
  const conditionsNodeType = stepType.replace('Step', 'Conditions');
  const uiNodeType = stepType.replace('Step', 'UI');
  // Setup nodeType differs between RA and PC variants
  const setupNodeType = stepType === 'RangeAnalysisScriptedStep'
    ? 'RangeAnalysisScriptedSetup'
    : 'PerformanceCenterApproachScriptedSetup'; // pick Approach variant as default for PC
  // Provide minimal required setup defaults per schema
  const setup: Record<string, any> = setupNodeType === 'RangeAnalysisScriptedSetup'
    ? { nodeType: setupNodeType, club: 'Drv', distance: 200 }
    : { nodeType: setupNodeType, hole: 1, pin: 1, playerCategory: 'Handicap', hcp: 10, gender: 'Unspecified', minDistance: 50, maxDistance: 150 };
  // Seed one default condition clause to satisfy minItems:1 (author can edit/remove later via UI — consider UI allowing removal only when replaced)
  const defaultCondition = { parameter: 'Total', min: 0 };
  const logic: LogicNode = {
    nodeType: logicNodeType,
    setup,
    successCondition: { nodeType: conditionsNodeType, shots: 1, conditionType: 'And', conditions: [defaultCondition] },
    failCondition: { nodeType: conditionsNodeType, shots: 1, conditionType: 'And', conditions: [defaultCondition] },
    canRetry: true,
    skipOnSuccess: false,
  };
  return {
    nodeType: stepType,
    id: opts.id,
    introMessage: createMessage({ header: opts.introHeader, description: opts.introDescription }),
    successMessage: createMessage({ header: opts.successHeader || 'Success!', description: '' }),
    failMessage: createMessage({ header: opts.failHeader || 'Failed', description: '' }),
    logic,
    ui: { nodeType: uiNodeType },
  };
}
