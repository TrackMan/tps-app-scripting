// Domain type definitions for script authoring

export interface Message {
  header: string;
  description: string;
  seconds: number;
}

export interface ParameterCondition {
  parameter: string;
  min?: number;
  max?: number;
}

export interface ConditionGroup {
  nodeType?: string; // e.g. RangeAnalysisScriptedConditions
  shots?: number; // number of shots to evaluate / needed
  conditionType?: 'And' | 'Or';
  conditions?: ParameterCondition[]; // list of parameter constraints
}

export interface LogicNode {
  nodeType?: string; // e.g. RangeAnalysisScriptedLogic
  setup?: Record<string, any>; // defer strict typing until schema finalized
  successCondition?: ConditionGroup;
  failCondition?: ConditionGroup;
  canRetry?: boolean;
  skipOnSuccess?: boolean;
}

export interface BaseNode {
  nodeType: string;
  id: string;
  introMessage: Message;
}

export interface Step extends BaseNode {
  successMessage: Message;
  failMessage: Message;
  logic: LogicNode;
  ui?: Record<string, any>;
}

export interface Activity extends BaseNode {
  endMessage: Message;
  steps: Step[];
}

// Enums matching schema definitions
export type StartMode = 'Append' | 'Overwrite';
export type EndMode = 'Wait' | 'Exit';

export interface ScriptData {
  id?: string;
  startMode?: StartMode;
  endMode?: EndMode;
  activities: Activity[];
}

// Type guards
export function isActivity(node: Activity | Step | any): node is Activity {
  return !!node && Array.isArray((node as any).steps);
}

export function isStep(node: Activity | Step | any): node is Step {
  return !!node && !Array.isArray((node as any).steps) && !!(node as any).successMessage;
}
