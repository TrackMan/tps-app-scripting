import React from 'react';
import { CollapsibleSection } from '../CollapsibleSection';
import { LoadScriptButton, DownloadButton } from '../buttons';

interface SidebarFileOperationsProps {
  isValid: boolean;
  onLoadScript: () => void;
  onDownloadScript: () => void;
}

export const SidebarFileOperations: React.FC<SidebarFileOperationsProps> = ({
  isValid,
  onLoadScript,
  onDownloadScript,
}) => {
  return (
    <CollapsibleSection
      title="File Operations"
      className="file-operations-section"
      bodyClassName="file-buttons"
      defaultOpen
      persistKey="file-operations"
    >
      <LoadScriptButton onClick={onLoadScript} />
      <DownloadButton isValid={isValid} onClick={onDownloadScript} />
    </CollapsibleSection>
  );
};
