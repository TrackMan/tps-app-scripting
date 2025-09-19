import React from 'react';
import { Step } from '../types';
import { HoleSelector } from './HoleSelector';

interface SetupEditorProps {
  step: Step;
  onUpdateStep: (stepId: string, patch: Partial<Step>) => void;
}

export const SetupEditor: React.FC<SetupEditorProps> = ({ step, onUpdateStep }) => {
  const setup = step.logic?.setup || {};
  const nodeType = setup.nodeType || '';

  // Check if this is a Performance Center step that can have different setup types
  const isPerformanceCenterStep = step.nodeType === 'PerformanceCenterScriptedStep';
  const isApproachSetup = nodeType === 'PerformanceCenterApproachScriptedSetup';
  const isTeeShotsSetup = nodeType === 'PerformanceCenterTeeShotsScriptedSetup';
  const isRangeAnalysisStep = step.nodeType === 'RangeAnalysisScriptedStep';

  const updateSetup = (setupPatch: any) => {
    const newLogic = {
      ...step.logic,
      setup: {
        ...setup,
        ...setupPatch
      }
    };
    onUpdateStep(step.id, { logic: newLogic });
  };

  const switchSetupType = (newNodeType: string) => {
    let newSetup: any = { nodeType: newNodeType };
    
    if (newNodeType === 'PerformanceCenterApproachScriptedSetup') {
      newSetup = {
        ...newSetup,
        hole: setup.hole || 1,
        pin: setup.pin || 1,
        playerCategory: setup.playerCategory || 'Handicap',
        hcp: setup.hcp || 0,
        gender: setup.gender || 'Unspecified',
        minDistance: setup.minDistance || 0,
        maxDistance: setup.maxDistance || 100
      };
    } else if (newNodeType === 'PerformanceCenterTeeShotsScriptedSetup') {
      newSetup = {
        ...newSetup,
        hole: setup.hole || 1,
        playerCategory: setup.playerCategory || 'Handicap',
        hcp: setup.hcp || 0,
        gender: setup.gender || 'Unspecified',
        courseDistance: setup.courseDistance || 5000
      };
    }

    const newLogic = {
      ...step.logic,
      setup: newSetup
    };
    onUpdateStep(step.id, { logic: newLogic });
  };

  if (isRangeAnalysisStep) {
    return (
      <div className="setup-editor">
        <h4>Range Analysis Setup</h4>
        <div className="edit-field">
          <label>
            Club
            <select 
              className="cond-input"
              value={setup.club || 'None'}
              onChange={e => updateSetup({ club: e.target.value })}
            >
              <option value="None">None</option>
              <option value="Drv">Driver</option>
              <option value="_2W">2 Wood</option>
              <option value="_3W">3 Wood</option>
              <option value="_4W">4 Wood</option>
              <option value="_5W">5 Wood</option>
              <option value="_6W">6 Wood</option>
              <option value="_7W">7 Wood</option>
              <option value="_8W">8 Wood</option>
              <option value="_9W">9 Wood</option>
              <option value="_1H">1 Hybrid</option>
              <option value="_2H">2 Hybrid</option>
              <option value="_3H">3 Hybrid</option>
              <option value="_4H">4 Hybrid</option>
              <option value="_5H">5 Hybrid</option>
              <option value="_6H">6 Hybrid</option>
              <option value="_7H">7 Hybrid</option>
              <option value="_8H">8 Hybrid</option>
              <option value="_9H">9 Hybrid</option>
              <option value="_1I">1 Iron</option>
              <option value="_2I">2 Iron</option>
              <option value="_3I">3 Iron</option>
              <option value="_4I">4 Iron</option>
              <option value="_5I">5 Iron</option>
              <option value="_6I">6 Iron</option>
              <option value="_7I">7 Iron</option>
              <option value="_8I">8 Iron</option>
              <option value="_9I">9 Iron</option>
              <option value="_PW">Pitching Wedge</option>
              <option value="_SW">Sand Wedge</option>
              <option value="_LW">Lob Wedge</option>
              <option value="_50W">50° Wedge</option>
              <option value="_52W">52° Wedge</option>
              <option value="_54W">54° Wedge</option>
              <option value="_56W">56° Wedge</option>
              <option value="_58W">58° Wedge</option>
              <option value="_60W">60° Wedge</option>
              <option value="Putt">Putter</option>
            </select>
          </label>
        </div>
        <div className="edit-field">
          <label>
            Distance (meters)
            <input
              type="number"
              min="0"
              step="0.1"
              value={setup.distance || 0}
              onChange={e => updateSetup({ distance: parseFloat(e.target.value) || 0 })}
            />
          </label>
        </div>
      </div>
    );
  }

  if (isPerformanceCenterStep) {
    return (
      <div className="setup-editor">
        <h4>Performance Center Setup</h4>
        
        {/* Setup Type Switch */}
        <div className="edit-field">
          <label>Setup Type</label>
          <div className="setup-type-switch">
            <button
              className={`setup-type-btn ${isApproachSetup ? 'active' : ''}`}
              onClick={() => switchSetupType('PerformanceCenterApproachScriptedSetup')}
            >
              Approach Shots
            </button>
            <button
              className={`setup-type-btn ${isTeeShotsSetup ? 'active' : ''}`}
              onClick={() => switchSetupType('PerformanceCenterTeeShotsScriptedSetup')}
            >
              Tee Shots
            </button>
          </div>
        </div>

        {/* Common Fields */}
        <div className="edit-field">
          <label>Hole</label>
          <HoleSelector
            selectedHole={setup.hole || 1}
            onHoleSelect={(holeNumber) => updateSetup({ hole: holeNumber })}
            setupType={isTeeShotsSetup ? 'tee' : 'approach'}
          />
        </div>

        <div className="edit-field">
          <label>
            Player Category
            <select 
              className="cond-input"
              value={setup.playerCategory || 'Handicap'}
              onChange={e => updateSetup({ playerCategory: e.target.value })}
            >
              <option value="Handicap">Handicap</option>
              <option value="PGA">PGA</option>
              <option value="LPGA">LPGA</option>
            </select>
          </label>
        </div>

        {/* Handicap - only show for Handicap player category */}
        {setup.playerCategory === 'Handicap' && (
          <div className="edit-field">
            <label>
              Handicap
              {isTeeShotsSetup ? (
                <select 
                  className="cond-input"
                  value={setup.hcp || 0}
                  onChange={e => updateSetup({ hcp: parseInt(e.target.value) || 0 })}
                >
                  {Array.from({ length: 16 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  min="-10"
                  max="54"
                  value={setup.hcp || 0}
                  onChange={e => updateSetup({ hcp: parseInt(e.target.value) || 0 })}
                />
              )}
            </label>
          </div>
        )}

        <div className="edit-field">
          <label>
            Gender
            <select 
              className="cond-input"
              value={setup.gender || 'Unspecified'}
              onChange={e => updateSetup({ gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unspecified">Unspecified</option>
            </select>
          </label>
        </div>

        {/* Approach-specific fields */}
        {isApproachSetup && (
          <>
            <div className="edit-field">
              <label>
                Pin
                <input
                  type="number"
                  min="1"
                  value={setup.pin || 1}
                  onChange={e => updateSetup({ pin: parseInt(e.target.value) || 1 })}
                />
              </label>
            </div>
            <div className="edit-field">
              <label>
                Min Distance (meters)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={setup.minDistance || 0}
                  onChange={e => updateSetup({ minDistance: parseFloat(e.target.value) || 0 })}
                />
              </label>
            </div>
            <div className="edit-field">
              <label>
                Max Distance (meters)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={setup.maxDistance || 100}
                  onChange={e => updateSetup({ maxDistance: parseFloat(e.target.value) || 100 })}
                />
              </label>
            </div>
          </>
        )}

        {/* Tee shots specific fields */}
        {isTeeShotsSetup && (
          <div className="edit-field">
            <label>
              Course Distance (meters)
              <input
                type="number"
                min="1000"
                max="9000"
                value={setup.courseDistance || 5000}
                onChange={e => updateSetup({ courseDistance: parseInt(e.target.value) || 5000 })}
              />
            </label>
          </div>
        )}
      </div>
    );
  }

  return null;
};