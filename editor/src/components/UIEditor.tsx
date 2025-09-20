import React from 'react';
import { Step, RangeAnalysisScriptedStep, PerformanceCenterScriptedStep, ParameterName, UIFrameName, UIFrameAction } from '../types';
import './UIEditor.css';

interface UIEditorProps {
  step: Step;
  onUpdateStep: (stepId: string, patch: Partial<Step>) => void;
}

const PARAMETER_OPTIONS: ParameterName[] = [
  // Club metrics
  'ClubSpeed', 'AttackAngle', 'ClubPath', 'DynamicLoft', 'FaceAngle',
  'DynamicLie', 'ImpactHeight', 'SpinLoft', 'FaceToPath', 'SwingPlane',
  'SwingDirection', 'LowPoint', 'ImpactOffset',
  // Ball flight
  'Curve', 'Height', 'Carry', 'Total', 'Side', 'SideTotal',
  'LandingAngle', 'FromPin', 'BallSpeed', 'SmashFactor',
  'LaunchAngle', 'LaunchDirection', 'SpinRate', 'SpinAxis',
  // Performance
  'StrokesGained'
];

const UI_FRAME_OPTIONS: UIFrameName[] = [
  'Player', 'Markers', 'Tiles', 'ShotList', 'GoToSetup', 'Minimap',
  'BroadcastTiles', 'ClubDelivery', 'AllTiles', 'LandingCamera',
  'StrokesGainedSummaryTile', 'StrokesGainedShotResult', 'TargetCarry'
];

export const UIEditor: React.FC<UIEditorProps> = ({ step, onUpdateStep }) => {
  const isRangeAnalysisStep = step.nodeType === 'RangeAnalysisScriptedStep';
  const isPerformanceCenterStep = step.nodeType === 'PerformanceCenterScriptedStep';
  
  if (!isRangeAnalysisStep && !isPerformanceCenterStep) {
    return null; // Only show UI editor for steps that support UI configuration
  }

  // Initialize UI object if it doesn't exist with proper defaults
  const defaultUI = {
    nodeType: isRangeAnalysisStep ? 'RangeAnalysisScriptedUI' as const : 'PerformanceCenterScriptedUI' as const,
    targetAvailable: true,
    activeDataTiles: [] as ParameterName[],
    shotListParameters: ['Total', 'Carry', 'BallSpeed'] as ParameterName[],
    defaultShotListParameter: 'Carry' as ParameterName,
    beforeShot: undefined as UIFrameAction | undefined,
    duringShot: undefined as UIFrameAction | undefined,
    afterShot: undefined as UIFrameAction | undefined,
  };

  const ui = { ...defaultUI, ...step.ui };

  const updateUI = (patch: Partial<typeof ui>) => {
    const newUI = { ...ui, ...patch };
    onUpdateStep(step.id!, { ui: newUI } as Partial<Step>);
  };

  const updateUIFrameAction = (actionType: 'beforeShot' | 'duringShot' | 'afterShot', action: Partial<UIFrameAction>) => {
    const currentAction = ui[actionType] || {};
    const newAction = { ...currentAction, ...action };
    updateUI({ [actionType]: newAction });
  };

  const handleParameterArrayChange = (field: 'activeDataTiles' | 'shotListParameters', values: ParameterName[]) => {
    if (field === 'activeDataTiles' && values.length > 8) {
      values = values.slice(0, 8); // Limit to 8 items for activeDataTiles
    }
    updateUI({ [field]: values });
  };

  const handleFrameArrayChange = (
    actionType: 'beforeShot' | 'duringShot' | 'afterShot',
    frameType: 'addFrames' | 'removeFrames' | 'disableFrames',
    values: UIFrameName[]
  ) => {
    updateUIFrameAction(actionType, { [frameType]: values });
  };

  const MultiSelectDropdown: React.FC<{
    label: string;
    options: readonly string[];
    values: string[];
    onChange: (values: string[]) => void;
    maxItems?: number;
  }> = ({ label, options, values, onChange, maxItems }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const toggleOption = (option: string) => {
      const newValues = values.includes(option)
        ? values.filter(v => v !== option)
        : [...values, option];
      
      if (maxItems && newValues.length > maxItems) {
        return; // Don't allow more than maxItems
      }
      
      onChange(newValues);
    };

    return (
      <div className="multi-select-dropdown">
        <label>{label}</label>
        <div className="dropdown-container">
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-toggle"
          >
            {values.length === 0 ? 'Select...' : `${values.length} selected`}
            <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              {options.map(option => (
                <label key={option} className="dropdown-option">
                  <input
                    type="checkbox"
                    checked={values.includes(option)}
                    onChange={() => toggleOption(option)}
                    disabled={!!(maxItems && !values.includes(option) && values.length >= maxItems)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
        {values.length > 0 && (
          <div className="selected-values">
            {values.map(value => (
              <span key={value} className="selected-tag">
                {value}
                <button
                  type="button"
                  onClick={() => onChange(values.filter(v => v !== value))}
                  className="remove-tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {maxItems && (
          <small className="help-text">Maximum {maxItems} selections allowed</small>
        )}
      </div>
    );
  };

  const UIFrameActionEditor: React.FC<{
    title: string;
    action: UIFrameAction | undefined;
    onChange: (action: Partial<UIFrameAction>) => void;
  }> = ({ title, action, onChange }) => {
    const currentAction = action || {};

    return (
      <div className="ui-frame-action">
        <h4>{title}</h4>
        <MultiSelectDropdown
          label="Add Frames"
          options={UI_FRAME_OPTIONS}
          values={currentAction.addFrames || []}
          onChange={(values) => onChange({ addFrames: values as UIFrameName[] })}
        />
        <MultiSelectDropdown
          label="Remove Frames"
          options={UI_FRAME_OPTIONS}
          values={currentAction.removeFrames || []}
          onChange={(values) => onChange({ removeFrames: values as UIFrameName[] })}
        />
        <MultiSelectDropdown
          label="Disable Frames"
          options={UI_FRAME_OPTIONS}
          values={currentAction.disableFrames || []}
          onChange={(values) => onChange({ disableFrames: values as UIFrameName[] })}
        />
      </div>
    );
  };

  return (
    <div className="ui-editor">
      <div className="ui-basic-settings">
        <label>
          <input
            type="checkbox"
            checked={ui.targetAvailable !== false}
            onChange={(e) => updateUI({ targetAvailable: e.target.checked })}
          />
          Target Available (defaults to true)
        </label>
      </div>

      <div className="ui-data-settings">
        <MultiSelectDropdown
          label="Active Data Tiles"
          options={PARAMETER_OPTIONS}
          values={ui.activeDataTiles || []}
          onChange={(values) => handleParameterArrayChange('activeDataTiles', values as ParameterName[])}
          maxItems={8}
        />

        <MultiSelectDropdown
          label="Shot List Parameters"
          options={PARAMETER_OPTIONS}
          values={ui.shotListParameters || []}
          onChange={(values) => handleParameterArrayChange('shotListParameters', values as ParameterName[])}
        />

        <div className="single-select">
          <label htmlFor="default-shot-list-param">Default Shot List Parameter</label>
          <select
            id="default-shot-list-param"
            value={ui.defaultShotListParameter || 'Carry'}
            onChange={(e) => updateUI({ defaultShotListParameter: e.target.value as ParameterName })}
          >
            {PARAMETER_OPTIONS.map(param => (
              <option key={param} value={param}>{param}</option>
            ))}
          </select>
          <small className="help-text">Defaults to 'Carry'</small>
        </div>
      </div>

      <div className="ui-frame-actions">
        <h3>UI Frame Actions</h3>
        <UIFrameActionEditor
          title="Before Shot"
          action={ui.beforeShot}
          onChange={(action) => updateUIFrameAction('beforeShot', action)}
        />
        <UIFrameActionEditor
          title="During Shot"
          action={ui.duringShot}
          onChange={(action) => updateUIFrameAction('duringShot', action)}
        />
        <UIFrameActionEditor
          title="After Shot"
          action={ui.afterShot}
          onChange={(action) => updateUIFrameAction('afterShot', action)}
        />
      </div>
    </div>
  );
};