import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'urql';
import { LOCATIONS_QUERY } from '../graphql/queries';

interface Location {
  id: string;
  name: string;
}

interface LocationQueryData {
  node: {
    locations: Location[];
  } | null;
}

interface LocationSelectorProps {
  selectedFacilityId: string | null;
  selectedLocationId: string | null;
  persistedLocationId: string | null;
  onLocationSelect: (location: Location | null) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedFacilityId,
  selectedLocationId,
  persistedLocationId,
  onLocationSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [result] = useQuery<LocationQueryData>({
    query: LOCATIONS_QUERY,
    variables: { facilityId: selectedFacilityId },
    pause: !selectedFacilityId, // Don't run query if no facility is selected
    requestPolicy: 'cache-and-network', // Always check for fresh data
  });

  const { data, fetching, error } = result;
  const locations = data?.node?.locations || [];
  const selectedLocation = locations.find(location => location.id === selectedLocationId);

  // Unified effect: handle facility change clearing and (conditional) restore/auto-select
  const prevFacilityId = useRef<string | null>(null);
  useEffect(() => {
    const previousFacilityId = prevFacilityId.current;
    const facilityChanged = previousFacilityId !== null && previousFacilityId !== selectedFacilityId;

    // If facility changed, clear current selection immediately
    if (facilityChanged) {
      if (selectedLocationId) {
        onLocationSelect(null);
      }
    }

    // Persist the new facility id for next render comparisons
    prevFacilityId.current = selectedFacilityId;

    // Don't attempt persisted restore on the same render as a facility change to avoid re-selecting stale location
    if (facilityChanged) {
      // Optionally still auto-select if the new facility has exactly one location
      if (locations.length === 1) {
        onLocationSelect(locations[0]);
      }
      return;
    }

    // If no locations loaded yet, nothing further to do
    if (locations.length === 0) return;

    // Restore persisted location (only if we currently have none selected)
    if (!selectedLocationId && persistedLocationId) {
      const persistedLocation = locations.find(loc => loc.id === persistedLocationId);
      if (persistedLocation) {
        onLocationSelect(persistedLocation);
        return;
      }
    }

    // Auto-select single location if no selection yet
    if (!selectedLocationId && locations.length === 1) {
      onLocationSelect(locations[0]);
    }
  }, [selectedFacilityId, locations, selectedLocationId, persistedLocationId, onLocationSelect]);

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onLocationSelect(null);
    setIsOpen(false);
  };

  // Don't show if no facility selected
  if (!selectedFacilityId) {
    return null;
  }

  // Don't show if there's only one location (auto-selected)
  if (locations.length <= 1) {
    return null;
  }

  if (fetching) {
    return (
      <div className="bay-selector">
        <div className="bay-selector-button loading">
          Loading locations...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bay-selector">
        <div className="bay-selector-button error">
          Error loading locations
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
        {selectedLocation ? selectedLocation.name : 'Select Location'}
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
          {selectedLocation && (
            <div className="bay-item clear-selection" onClick={handleClearSelection}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
              Clear Selection
            </div>
          )}
          
          {locations.length === 0 ? (
            <div className="bay-item no-bays">
              No locations available
            </div>
          ) : (
            locations.map((location) => (
              <div
                key={location.id}
                className={`bay-item ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationSelect(location)}
              >
                <div className="bay-info">
                  <div className="bay-name">{location.name}</div>
                </div>
                {selectedLocation?.id === location.id && (
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