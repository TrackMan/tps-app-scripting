import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'urql';
import { BAYS_IN_LOCATION_QUERY } from '../graphql/queries';

interface Bay {
  id: string;
  dbId: number;
  name: string;
}

interface BayQueryData {
  node: {
    bays: Bay[];
  } | null;
}

interface BaySelectorProps {
  selectedFacilityId: string | null;
  selectedLocationId: string | null;
  selectedBayId: string | null;
  persistedBayId: string | null;
  onBaySelect: (bay: Bay | null) => void;
}

export const BaySelector: React.FC<BaySelectorProps> = ({
  selectedFacilityId,
  selectedLocationId,
  selectedBayId,
  persistedBayId,
  onBaySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [result] = useQuery<BayQueryData>({
    query: BAYS_IN_LOCATION_QUERY,
    variables: { locationId: selectedLocationId },
    pause: !selectedLocationId, // Don't run query if no location is selected
    requestPolicy: 'cache-and-network', // Always check for fresh data
  });

  const { data, fetching, error } = result;
  const bays = data?.node?.bays || [];
  const selectedBay = bays.find(bay => bay.id === selectedBayId);

  // Clear bay when facility or location changes  
  const prevFacilityId = useRef<string | null>(null);
  const prevLocationId = useRef<string | null>(null);
  
  useEffect(() => {
    // Clear bay if facility changed (facility change cascades down)
    if (prevFacilityId.current !== null && prevFacilityId.current !== selectedFacilityId) {
      onBaySelect(null);
    }
    prevFacilityId.current = selectedFacilityId;
  }, [selectedFacilityId, onBaySelect]);
  
  useEffect(() => {
    // Clear bay if location changed
    if (prevLocationId.current !== null && prevLocationId.current !== selectedLocationId) {
      onBaySelect(null);
    }
    prevLocationId.current = selectedLocationId;
  }, [selectedLocationId, onBaySelect]);

  // Restore persisted bay selection when bays are loaded
  useEffect(() => {
    if (bays.length > 0 && persistedBayId && !selectedBayId) {
      const persistedBay = bays.find(bay => bay.id === persistedBayId);
      if (persistedBay) {
        onBaySelect(persistedBay);
        console.log('Restored bay selection from persistence:', persistedBay);
      }
    }
  }, [bays, persistedBayId, selectedBayId, onBaySelect]);

  const handleBaySelect = (bay: Bay) => {
    onBaySelect(bay);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onBaySelect(null);
    setIsOpen(false);
  };

  if (!selectedLocationId) {
    return (
      <div className="bay-selector">
        <div className="bay-selector-button disabled">
          Select a location first
        </div>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="bay-selector">
        <div className="bay-selector-button loading">
          Loading bays...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bay-selector">
        <div className="bay-selector-button error">
          Error loading bays
        </div>
      </div>
    );
  }

  return (
    <div className="bay-selector">
      <button
        className={`bay-selector-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedBay ? selectedBay.name : 'Select Bay'}
        <svg 
          className={`bay-selector-arrow ${isOpen ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="currentColor"
        >
          <path d="M8 12L3 7L4 6L8 10L12 6L13 7L8 12Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="bay-dropdown">
          {selectedBay && (
            <div className="bay-item clear-selection" onClick={handleClearSelection}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
              Clear Selection
            </div>
          )}
          
          {bays.length === 0 ? (
            <div className="bay-item no-bays">
              No bays available
            </div>
          ) : (
            bays.map((bay) => (
              <div
                key={bay.id}
                className={`bay-item ${selectedBay?.id === bay.id ? 'selected' : ''}`}
                onClick={() => handleBaySelect(bay)}
              >
                <div className="bay-info">
                  <div className="bay-name">{bay.name}</div>
                </div>
                {selectedBay?.id === bay.id && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="checkmark">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                  </svg>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};