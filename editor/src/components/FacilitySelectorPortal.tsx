import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'urql';
import { FACILITIES_QUERY } from '../graphql/queries';
import { debugEnvironment } from '../lib/debug-env';
import './FacilitySelectorPortal.css';

interface Facility {
  id: string;
  name: string;
  kind: string;
  developerAccess?: string | null;
  apiDeveloperAccess?: string | null;
}

interface FacilitySelectorPortalProps {
  selectedFacility?: Facility | null;
  selectedFacilityId?: string | null;
  onFacilitySelect: (facility: Facility | null) => void;
}

type FacilityTab = 'All' | 'Indoor' | 'Range';

export const FacilitySelectorPortal: React.FC<FacilitySelectorPortalProps> = ({
  selectedFacility,
  selectedFacilityId,
  onFacilitySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FacilityTab>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [result] = useQuery({
    query: FACILITIES_QUERY,
  });

  const { data, fetching, error } = result;

  // Debug environment configuration (only on first render)
  useEffect(() => {
    debugEnvironment();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const facilities = data?.facilities?.items || [];

  // Restore facility object when facilities are loaded and we have a facility ID but no facility object
  useEffect(() => {
    if (facilities.length > 0 && selectedFacilityId && !selectedFacility) {
      const facilityToRestore = facilities.find((facility: Facility) => facility.id === selectedFacilityId);
      if (facilityToRestore) {
        onFacilitySelect(facilityToRestore);

      }
    }
  }, [facilities, selectedFacilityId, selectedFacility, onFacilitySelect]);

  // Helper function to check if user has developer access
  const hasDeveloperAccess = (facility: Facility): boolean => {
    const devAccess = facility.developerAccess;
    const apiDevAccess = facility.apiDeveloperAccess;
    
    const hasDevAccess = devAccess && devAccess.toLowerCase() === 'true';
    const hasApiDevAccess = apiDevAccess && apiDevAccess.toLowerCase() === 'true';
    
    return Boolean(hasDevAccess || hasApiDevAccess);
  };

  // Filter facilities by access first
  const facilitiesWithAccess = facilities.filter((facility: Facility) => hasDeveloperAccess(facility));

  // Group facilities by type
  const groupedFacilities = {
    All: facilitiesWithAccess,
    Indoor: facilitiesWithAccess.filter((f: Facility) => 
      f.kind?.includes('INDOOR') || 
      f.kind?.includes('SIMULATOR')
    ),
    Range: facilitiesWithAccess.filter((f: Facility) => 
      f.kind?.includes('RANGE') && 
      !f.kind?.includes('INDOOR')
    )
  };

  // Get facilities for current tab
  const currentFacilities = groupedFacilities[activeTab];

  const handleFacilityClick = (facility: Facility) => {
    if (selectedFacility?.id === facility.id) {
      // Deselect if clicking the same facility
      onFacilitySelect(null);
    } else {
      // Select new facility
      onFacilitySelect(facility);
    }
    // Close dropdown after selection
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getTabCount = (tab: FacilityTab) => {
    return groupedFacilities[tab].length;
  };

  return (
    <div className="facility-selector-portal" ref={dropdownRef}>
      <button
        className="facility-selector-button"
        onClick={toggleDropdown}
        disabled={fetching}
      >
        <span className="facility-selector-text">
          {selectedFacility ? selectedFacility.name : 'Select Facility'}
        </span>
        <svg 
          className={`facility-selector-arrow ${isOpen ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="currentColor"
        >
          <path d="M8 12L3 7L4 6L8 10L12 6L13 7L8 12Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="facility-selector-dropdown">
          {/* Tab Navigation */}
          <div className="facility-tabs">
            {(['All', 'Indoor', 'Range'] as FacilityTab[]).map((tab) => (
              <button
                key={tab}
                className={`facility-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className="facility-tab-count">({getTabCount(tab)})</span>
              </button>
            ))}
          </div>

          {/* Facility List */}
          <div className="facility-list-container">
            {error && (
              <div className="facility-error">
                Error loading facilities: {error.message}
              </div>
            )}
            
            {fetching && (
              <div className="facility-loading">
                Loading facilities...
              </div>
            )}

            {currentFacilities.length === 0 && !error && !fetching && (
              <div className="no-facilities">
                No {activeTab.toLowerCase()} facilities available with developer access
              </div>
            )}

            <div className="facility-list">
              {currentFacilities.map((facility: Facility) => (
                <div
                  key={facility.id}
                  className={`facility-item ${selectedFacility?.id === facility.id ? 'selected' : ''}`}
                  onClick={() => handleFacilityClick(facility)}
                >
                  <div className="facility-content">
                    <div className="facility-name">{facility.name}</div>
                  </div>
                  {selectedFacility?.id === facility.id && (
                    <div className="facility-checkmark">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.5 4.5L6 12L2.5 8.5L3.5 7.5L6 10L12.5 3.5L13.5 4.5Z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};