import React from 'react';
import { Activity, Step, isActivity } from '../types';
import { CollapsibleSection } from './CollapsibleSection';

interface EditPanelProps {
  node: Activity | Step;
  onChange: (patch: Partial<Activity> | Partial<Step>) => void;
}

export const EditPanel: React.FC<EditPanelProps> = ({ node, onChange }) => {
  const isActivityNode = isActivity(node);
  const intro = node.introMessage; 
  const endOrSuccess = isActivityNode ? (node as Activity).endMessage : (node as Step).successMessage; 
  
  return (
    <CollapsibleSection
      key={`${isActivityNode ? 'activity' : 'step'}-${node.id}`}
      title={`Edit ${isActivityNode ? 'Activity' : 'Step'} Metadata`}
      className="edit-panel"
      bodyClassName="edit-panel-body"
      defaultOpen
      persistKey={`${node.id}-meta`}
    >
      <div className="edit-field">
        <label>ID <input value={node.id} onChange={e => onChange({ id: e.target.value })} /></label>
      </div>
      <div className="edit-field">
        <label>Header <input value={intro.header} onChange={e => onChange({ introMessage: { ...intro, header: e.target.value } as any })} /></label>
      </div>
      <div className="edit-field">
        <label>Description <input value={intro.description} onChange={e => onChange({ introMessage: { ...intro, description: e.target.value } as any })} /></label>
      </div>
      {!isActivityNode && (
        <div className="edit-field">
          <label>Success Header <input value={endOrSuccess.header} onChange={e => onChange({ successMessage: { ...endOrSuccess, header: e.target.value } as any })} /></label>
        </div>
      )}
      {isActivityNode && (
        <div className="edit-field">
          <label>End Header <input value={endOrSuccess.header} onChange={e => onChange({ endMessage: { ...endOrSuccess, header: e.target.value } as any })} /></label>
        </div>
      )}
    </CollapsibleSection>
  );
};