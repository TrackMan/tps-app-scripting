import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'urql';
import { GET_FACILITIES_WITH_ACCESS, TEST_QUERY } from '../graphql/queries';
import { debugEnvironment } from '../lib/debug-env';


interface Facility {
  id: string;
  name: string;
  kind: string;
  developerAccess?: string | null;
  apiDeveloperAccess?: string | null;
}

interface FacilityDropdownProps {
  selectedFacility?: Facility | null;
  onFacilitySelect: (facility: Facility) => void;
}

export const FacilityDropdown: React.FC<FacilityDropdownProps> = ({
  selectedFacility,
  onFacilitySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Test basic connection first
  const [testResult] = useQuery({
    query: TEST_QUERY,
  });

  const [result] = useQuery({
    query: GET_FACILITIES_WITH_ACCESS,
  });

  const { data, fetching, error } = result;
  
  // Debug environment configuration (only on first render)
  useEffect(() => {
    debugEnvironment();
  }, []);

  // Log detailed debugging info

  
  // Enhanced error logging
  if (error && import.meta.env.DEV) {
    console.error('Facilities Query Error:', error);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const facilities = data?.facilities?.items || [];
  
  // Helper function to check if user has developer access
  const hasDeveloperAccess = (facility: Facility): boolean => {
    const devAccess = facility.developerAccess;
    const apiDevAccess = facility.apiDeveloperAccess;
    
    // Check if either access field is "true" (case-insensitive)
    const hasDevAccess = devAccess && devAccess.toLowerCase() === 'true';
    const hasApiDevAccess = apiDevAccess && apiDevAccess.toLowerCase() === 'true';
    
    return Boolean(hasDevAccess || hasApiDevAccess);
  };
  
  // Filter facilities based on developer access and search term
  const facilitiesWithAccess = facilities.filter((facility: Facility) => hasDeveloperAccess(facility));
  const filteredFacilities = facilitiesWithAccess.filter((facility: Facility) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Log access information for debugging
  if (data?.facilities?.items && facilities.length > 0) {
    console.log('🔍 Facility Access Debug:');
    facilities.slice(0, 3).forEach((facility: Facility) => {
      console.log(`  ${facility.name}:`, {
        developerAccess: facility.developerAccess,
        apiDeveloperAccess: facility.apiDeveloperAccess,
        hasAccess: hasDeveloperAccess(facility)
      });
    });
    console.log(`📊 Total facilities: ${facilities.length}, With access: ${facilitiesWithAccess.length}, Filtered: ${filteredFacilities.length}`);
  }

  const handleFacilityClick = (facility: Facility) => {
    onFacilitySelect(facility);
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className="facility-dropdown" ref={dropdownRef}>
      <button
        className="facility-dropdown-button"
        onClick={toggleDropdown}
        disabled={fetching}
      >
        {fetching ? (
          <span>Loading...</span>
        ) : selectedFacility ? (
          <span>{selectedFacility.name}</span>
        ) : (
          <span>Search for Facility</span>
        )}
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="currentColor"
        >
          <path d="M6 9L1.5 4.5L2.5 3.5L6 7L9.5 3.5L10.5 4.5L6 9Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="facility-dropdown-menu">
          <div className="facility-search">
            <input
              type="text"
              placeholder="Search for Facility"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="facility-search-input"
              autoFocus
            />
          </div>
          
          <div className="facility-list">
            {error && (
              <div className="facility-error">
                <div className="error-header">⚠️ Unable to load facilities</div>
                <div className="error-message">{error.message}</div>
                {error.message.includes('not authorized') && (
                  <div className="error-help">
                    <p><strong>This may be due to:</strong></p>
                    <ul>
                      <li>Insufficient permissions for your account</li>
                      <li>Authentication session expired</li>
                      <li>Network connectivity issues</li>
                      <li>Environment configuration differences between local and cloud</li>
                    </ul>
                    <p><strong>Troubleshooting:</strong></p>
                    <ul>
                      <li>Try refreshing the page to restart authentication</li>
                      <li>Check if you're logged into TrackMan services</li>
                      <li>Contact support if the issue persists</li>
                    </ul>
                    <p><em>You can still use the editor to create and edit scripts without selecting a specific facility.</em></p>
                  </div>
                )}
                <details className="error-debug">
                  <summary>Debug Information</summary>
                  <div className="debug-info">
                    <p><strong>GraphQL Endpoint:</strong> {import.meta.env.VITE_BACKEND_BASE_URL || 'Not set'}/graphql</p>
                    <p><strong>Login Service:</strong> {import.meta.env.VITE_LOGIN_BASE_URL || 'Not set'}</p>
                    <p><strong>Environment:</strong> {import.meta.env.VITE_NODE_ENV || 'development'}</p>
                    <p><strong>Error Details:</strong> {JSON.stringify(error, null, 2)}</p>
                  </div>
                </details>
              </div>
            )}
            
            {filteredFacilities.length === 0 && !error && !fetching && (
              <div className="no-facilities">
                {searchTerm 
                  ? 'No facilities found matching your search' 
                  : facilitiesWithAccess.length === 0 
                    ? 'No facilities available with developer access'
                    : 'No facilities available'}
              </div>
            )}
            
            {filteredFacilities.map((facility: Facility) => (
              <button
                key={facility.id}
                className="facility-item"
                onClick={() => handleFacilityClick(facility)}
              >
                <div className="facility-name">{facility.name}</div>
                <div className="facility-details">
                  {facility.kind && <span className="facility-kind">{facility.kind}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};