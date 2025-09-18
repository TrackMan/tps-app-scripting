import React from 'react';
import { ConditionGroup, ParameterCondition } from '../types';

interface ConditionEditorProps {
  label: string;
  condition: ConditionGroup | undefined;
  onChange: (c: ConditionGroup) => void;
  showConditionType?: boolean;
}

export const ConditionEditor: React.FC<ConditionEditorProps> = ({ label, condition, onChange, showConditionType }) => {
  const c: ConditionGroup = condition || { shots: 0, conditions: [] };

  const update = (patch: Partial<ConditionGroup>) => {
    onChange({ ...c, ...patch });
  };

  const updateConditionRow = (idx: number, patch: Partial<ParameterCondition>) => {
    const rows = [...(c.conditions || [])];
    rows[idx] = { ...rows[idx], ...patch };
    update({ conditions: rows });
  };

  const addRow = () => {
    update({ conditions: [...(c.conditions || []), { parameter: '', min: undefined, max: undefined }] });
  };

  const removeRow = (idx: number) => {
    const rows = [...(c.conditions || [])];
    rows.splice(idx, 1);
    update({ conditions: rows });
  };

  return (
    <div className="cond-editor">
      <h4 className="cond-title">{label}</h4>
      <label className="cond-label">Shots: <input className="cond-input-narrow" type="number" value={c.shots ?? ''} onChange={e => update({ shots: Number(e.target.value) })} /></label>
      {showConditionType && (
        <label className="cond-label">Condition Type:
          <select className="cond-select" value={c.conditionType || ''} onChange={e => update({ conditionType: e.target.value as any })}>
            <option value="">(none)</option>
            <option value="And">And</option>
            <option value="Or">Or</option>
          </select>
        </label>
      )}
      <div className="cond-conditions">
        <strong>Conditions</strong>
        {(c.conditions || []).length === 0 && <div className="cond-empty">No parameter constraints</div>}
        {(c.conditions || []).map((row, i) => (
          <div key={i} className="cond-row">
            <input className="cond-input" placeholder="parameter" value={row.parameter || ''} onChange={e => updateConditionRow(i, { parameter: e.target.value })} />
            <input className="cond-input-narrow" placeholder="min" type="number" value={row.min ?? ''} onChange={e => updateConditionRow(i, { min: e.target.value === '' ? undefined : Number(e.target.value) })} />
            <input className="cond-input-narrow" placeholder="max" type="number" value={row.max ?? ''} onChange={e => updateConditionRow(i, { max: e.target.value === '' ? undefined : Number(e.target.value) })} />
            <button className="cond-remove" onClick={() => removeRow(i)}>✕</button>
          </div>
        ))}
        <button className="cond-add" onClick={addRow}>Add Condition</button>
      </div>
    </div>
  );
};
