import React from 'react';
import { CollapsibleSection } from '../CollapsibleSection';
import { LocationSelector } from './LocationSelector';
import { BaySelector } from './BaySelector';
import { Bay, Location } from '../../types/sidebarTypes';

interface SidebarBayOperationsProps {
  selectedFacilityId: string | null;
  selectedLocationId: string | null;
  persistedLocationId: string | null;
  selectedBayId: string | null;
  persistedBayId: string | null;
  onLocationSelect: (location: Location | null) => void;
  onBaySelect: (bay: Bay | null) => void;
  canExecute: boolean;
  executing: boolean;
  execMessage: string | null;
  onExecuteScript: () => void;
  isValid: boolean;
  selectedBayObj: Bay | null;
}

export const SidebarBayOperations: React.FC<SidebarBayOperationsProps> = ({
  selectedFacilityId,
  selectedLocationId,
  persistedLocationId,
  selectedBayId,
  persistedBayId,
  onLocationSelect,
  onBaySelect,
  canExecute,
  executing,
  execMessage,
  onExecuteScript,
  isValid,
  selectedBayObj,
}) => {
  return (
    <CollapsibleSection
      title="Bay Operations"
      className="bay-operations-section"
      bodyClassName="bay-buttons"
      defaultOpen
      persistKey="bay-operations"
    >
      <LocationSelector
        selectedFacilityId={selectedFacilityId}
        selectedLocationId={selectedLocationId}
        persistedLocationId={persistedLocationId}
        onLocationSelect={onLocationSelect}
      />
      <BaySelector
        selectedFacilityId={selectedFacilityId}
        selectedLocationId={selectedLocationId}
        selectedBayId={selectedBayId}
        persistedBayId={persistedBayId}
        onBaySelect={onBaySelect}
      />
      <button
        className="tree-btn execute-btn"
        disabled={!canExecute || executing}
        onClick={onExecuteScript}
        title={!isValid ? 'Script must be valid' : !selectedBayObj ? 'Select a bay first' : 'Execute script on bay'}
      >
        {executing ? 'Executing...' : 'Execute Script'}
      </button>
      {execMessage && (
        <div className="exec-status small-note">{execMessage}</div>
      )}
    </CollapsibleSection>
  );
};
