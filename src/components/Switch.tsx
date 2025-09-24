import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  className = ''
}) => {
  return (
    <button
      type="button"
      className={`switch ${checked ? 'checked' : ''} ${className}`}
      onClick={() => onChange(!checked)}
      aria-checked={checked ? 'true' : 'false'}
      role="switch"
      aria-label="Toggle randomize"
    >
      <div className="switch-thumb" />
    </button>
  );
};