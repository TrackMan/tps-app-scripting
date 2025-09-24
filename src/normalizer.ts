import { ScriptData, ScriptedActivity, ScriptedStep } from './types';
import { createMessage } from './factories';

// Simple normalizer functions
export function normalizeActivity(raw: any): ScriptedActivity {
  return raw as ScriptedActivity;
}

export function normalizeStep(raw: any, parentActivityType: string): ScriptedStep {
  return raw as ScriptedStep;
}

export function normalizeScript(raw: any): ScriptData {
  return raw as ScriptData;
}
