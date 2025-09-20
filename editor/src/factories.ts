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
  return opts as ScriptedActivity;
}

export function createStep(opts: any): ScriptedStep {
  return opts as ScriptedStep;
}
