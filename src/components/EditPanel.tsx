import React from 'react';
import { Activity, Step, isActivity } from '../types';
import { CollapsibleSection } from './CollapsibleSection';
import { MessageEditor } from './MessageEditor';

interface EditPanelProps {
  node: Activity | Step;
  onChange: (patch: Partial<Activity> | Partial<Step>) => void;
}

export const EditPanel: React.FC<EditPanelProps> = ({ node, onChange }) => {
  const isActivityNode = isActivity(node);
  
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

      <MessageEditor
        title="Intro Message"
        message={node.introMessage}
        onChange={introMessage => onChange({ introMessage } as any)}
      />

      {isActivityNode && (
        <MessageEditor
          title="End Message"
          message={(node as Activity).endMessage}
          onChange={endMessage => onChange({ endMessage } as any)}
        />
      )}

      {!isActivityNode && (
        <>
          <MessageEditor
            title="Success Message"
            message={(node as Step).successMessage}
            onChange={successMessage => onChange({ successMessage } as any)}
          />
          <MessageEditor
            title="Fail Message"
            message={(node as Step).failMessage}
            onChange={failMessage => onChange({ failMessage } as any)}
          />
        </>
      )}
    </CollapsibleSection>
  );
};