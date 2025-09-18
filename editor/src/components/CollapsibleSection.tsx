import React, { useState, ReactNode, useEffect } from 'react';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string; // extra wrapper classes
  bodyClassName?: string; // inner body classes
  persistKey?: string; // unique key to isolate state (e.g., node id + section name)
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  defaultOpen = true,
  children,
  className = '',
  bodyClassName = '',
  persistKey
}) => {
  // localStorage key if provided so each unique section instance can have independent remembered state
  const storageKey = persistKey ? `collapsible:${persistKey}` : null;
  const initial = () => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        const v = window.localStorage.getItem(storageKey);
        if (v === 'open') return true;
        if (v === 'closed') return false;
      } catch {
        /* ignore */
      }
    }
    return defaultOpen;
  };
  const [open, setOpen] = useState<boolean>(initial);

  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, open ? 'open' : 'closed');
      } catch {
        /* ignore */
      }
    }
  }, [open, storageKey]);

  const sectionId = `sect-${title.replace(/\s+/g,'-').toLowerCase()}-${persistKey || 'default'}`;

  return (
    <div className={`collapsible ${open ? 'open' : 'closed'} ${className}`.trim()}>
      <button
        type="button"
        className="collapsible-header"
        onClick={() => setOpen(o => !o)}
        aria-controls={sectionId}
        aria-label={`${open ? 'Collapse' : 'Expand'} section ${title}`}
      >
        <svg
          className={`dropdown-arrow ${open ? 'open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 9L1.5 4.5L2.5 3.5L6 7L9.5 3.5L10.5 4.5L6 9Z" />
        </svg>
        <span className="title-text">{title}</span>
      </button>
      <div
        id={sectionId}
        className={`collapsible-body ${open ? '' : 'hidden'}`.trim()}
        data-expanded={open ? 'true' : 'false'}
      >
        <div className={bodyClassName}>{children}</div>
      </div>
    </div>
  );
};
