import Ajv2020, { ErrorObject } from 'ajv/dist/2020';
import schema from './schema/app-scripting.schema.json';
import { ScriptData } from './types';

// Use JSON Schema 2020-12 aware constructor to satisfy $schema reference
const ajv = new Ajv2020({ allErrors: true, strict: false });
let validateFn: any;
let validatorInitError: Error | null = null;
try {
  validateFn = ajv.compile<ScriptData>(schema as any);
} catch (e: any) {
  console.error('Schema compile error:', e);
  validatorInitError = e;
  // create a no-op validator that always returns false
  validateFn = () => false;
  validateFn.errors = [
    { instancePath: '', schemaPath: '', keyword: 'compile', params: {}, message: e?.message || 'Schema compile failed' }
  ];
}

export interface ValidationResult {
  valid: boolean;
  errors: ErrorObject[] | null | undefined;
}

export function validateScript(data: ScriptData): ValidationResult {
  const valid = validateFn(data) as boolean;
  return { valid, errors: validateFn.errors };
}

export function getValidatorStatus() {
  return { ok: !validatorInitError, error: validatorInitError };
}

export function formatErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors) return [];
  return errors.map(e => {
    const path = e.instancePath || e.schemaPath;
    return `${path} ${e.message}`.trim();
  });
}
