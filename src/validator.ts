import Ajv2020, { ErrorObject } from 'ajv/dist/2020';
import schema from '../schema/latest/app-scripting.schema.json';
import shared from '../schema/latest/shared.schema.json';
import rangeAnalysis from '../schema/latest/activity-range-analysis.schema.json';
import perfCenter from '../schema/latest/activity-performance-center.schema.json';
import { ScriptData } from './types';

// Use JSON Schema 2020-12 aware constructor to satisfy $schema reference
const ajv = new Ajv2020({ allErrors: true, strict: false });
ajv.addSchema(shared);
ajv.addSchema(rangeAnalysis);
ajv.addSchema(perfCenter);
console.log('Ajv loaded schema IDs:', Object.keys(ajv.schemas));
// Extra diagnostics for performance-center mismatch investigation
try {
  const perfId = (perfCenter && (perfCenter as any).$id) || '(no $id)';
  console.log('perfCenter.$id (from import):', perfId);
  const registeredPerfKeys = Object.keys(ajv.schemas).filter(k => k.includes('performance-center'));
  console.log('Ajv registered keys containing "performance-center":', registeredPerfKeys);
  const registeredPerf = ajv.getSchema(perfId as string);
  console.log('ajv.getSchema(perfId) present?:', !!registeredPerf);
  if (registeredPerf && (registeredPerf as any).schema) {
    console.log('registered schema $id:', (registeredPerf as any).schema.$id);
  }
} catch (e) {
  console.error('perfCenter diagnostic error:', e);
}
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
