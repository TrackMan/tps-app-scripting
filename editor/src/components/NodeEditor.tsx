import React, { useState } from 'react';
import { Activity, Step, isActivity, isStep } from '../types';
import { SubTabBar } from './SubTabBar';
import { SetupEditor } from './SetupEditor';
import { UIEditor } from './UIEditor';
import { MessageEditor } from './MessageEditor';

interface NodeEditorProps {
  node: Activity | Step;
  onUpdateActivity?: (activityId: string, patch: Partial<Activity>) => void;
  onUpdateStep?: (stepId: string, patch: Partial<Step>) => void;
}

const ACTIVITY_TABS = ['Meta Data', 'Script'];
const STEP_TABS = ['Meta Data', 'Logic', 'UI Configuration', 'Script'];

export const NodeEditor: React.FC<NodeEditorProps> = ({ node, onUpdateActivity, onUpdateStep }) => {
  const [activeTab, setActiveTab] = useState('Meta Data');

  if (!node) return null;

  // Activity editing
  if (isActivity(node)) {
    return (
      <div className="node-editor">
        <div className="tab-bar-wrapper">
          <SubTabBar tabs={ACTIVITY_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="tab-panel">
          {activeTab === 'Meta Data' && (
            <>
              <div className="edit-field">
                <label>
                  ID
                  <input
                    type="text"
                    defaultValue={node.id || ''}
                    onBlur={e => {
                      const newId = e.target.value;
                      if (newId !== node.id) {
                        onUpdateActivity?.(node.id!, { id: newId });
                      }
                    }}
                    placeholder="Enter activity ID..."
                  />
                </label>
              </div>
              <MessageEditor
                title="Intro Message"
                message={node.introMessage}
                onChange={msg => onUpdateActivity?.(node.id!, { introMessage: msg })}
              />
            </>
          )}
          {activeTab === 'Script' && (
            <pre>{JSON.stringify(node, null, 2)}</pre>
          )}
        </div>
      </div>
    );
  }

  // Step editing
  if (isStep(node)) {
    return (
      <div className="node-editor" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="tab-bar-wrapper">
          <SubTabBar tabs={STEP_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="tab-panel" style={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'Meta Data' && (
            <>
              <div className="edit-field">
                <label>
                  ID
                  <input
                    type="text"
                    defaultValue={node.id || ''}
                    onBlur={e => {
                      const newId = e.target.value;
                      if (newId !== node.id) {
                        onUpdateStep?.(node.id!, { id: newId });
                      }
                    }}
                    placeholder="Enter step ID..."
                  />
                </label>
              </div>
              <MessageEditor
                title="Intro Message"
                message={node.introMessage}
                onChange={msg => onUpdateStep?.(node.id!, { introMessage: msg })}
              />
              <MessageEditor
                title="Success Message"
                message={node.successMessage}
                onChange={msg => onUpdateStep?.(node.id!, { successMessage: msg })}
              />
              <MessageEditor
                title="Fail Message"
                message={node.failMessage}
                onChange={msg => onUpdateStep?.(node.id!, { failMessage: msg })}
              />
            </>
          )}
          {activeTab === 'Logic' && (
            <SetupEditor step={node} onUpdateStep={onUpdateStep!} />
          )}
          {activeTab === 'UI Configuration' && (
            <UIEditor step={node} onUpdateStep={onUpdateStep!} />
          )}
          {activeTab === 'Script' && (
            <pre>{JSON.stringify(node, null, 2)}</pre>
          )}
        </div>
      </div>
    );
  }

  return null;
};
