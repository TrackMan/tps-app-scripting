import React from 'react';
import { Message } from '../types';

interface MessageEditorProps {
  title: string;
  message: Message | undefined;
  onChange: (message: Message) => void;
}

export const MessageEditor: React.FC<MessageEditorProps> = ({ title, message, onChange }) => {
  // Provide default empty message if undefined
  const currentMessage: Message = message || { header: '', description: '', seconds: -1 };
  
  const update = (patch: Partial<Message>) => {
    onChange({ ...currentMessage, ...patch });
  };

  const isHidden = currentMessage.seconds === 0;

  return (
    <div className="message-editor">
      <h5 className="message-title">{title}</h5>
      
      <div className="edit-field">
        <label>
          Display Duration
          <select 
            className="cond-input"
            value={currentMessage.seconds || 0} 
            onChange={e => update({ seconds: Number(e.target.value) })}
          >
            <option value={0}>Hidden</option>
            <option value={-1}>Need to accept</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num} second{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>
      </div>

      {!isHidden && (
        <>
          <div className="edit-field">
            <label>
              Header
              <input 
                type="text" 
                value={currentMessage.header} 
                onChange={e => update({ header: e.target.value })}
                placeholder="Enter message header..."
              />
            </label>
          </div>

          <div className="edit-field">
            <label>
              Description
              <input 
                type="text" 
                value={currentMessage.description || ''} 
                onChange={e => update({ description: e.target.value })}
                placeholder="Optional supporting text..."
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};