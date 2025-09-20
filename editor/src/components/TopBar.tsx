import React, { useState } from 'react';
import { FacilitySelectorPortal } from './FacilitySelectorPortal';
import { BuildVersion } from './BuildVersion';

interface Facility {
  id: string;
  name: string;
  kind: string;
  developerAccess?: string | null;
  apiDeveloperAccess?: string | null;
}

interface TopBarProps {
  selectedFacility: Facility | null;
  selectedFacilityId: string | null;
  onFacilitySelect: (facility: Facility | null) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  selectedFacility, 
  selectedFacilityId,
  onFacilitySelect 
}) => {
  const handleFacilitySelect = (facility: Facility | null) => {
    onFacilitySelect(facility);
    console.log('Selected facility:', facility);
    // - Storing selection in localStorage
  };

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="top-bar-left">
          <div className="top-bar-logo">
            <svg width="14" height="14" viewBox="0 0 215 215">
              <g>
                <path d="M198.385 0C207.593 0 215 7.40689 215 16.6155V198.385C215 207.593 207.593 215 198.385 215H85.5796C83.9781 215 82.6769 213.599 82.8771 211.997C92.9865 125.517 139.029 33.9316 169.558 0.300279C169.758 0.100093 170.058 0 170.358 0H198.385Z" fill="#EC691A"></path>
                <path d="M16.6155 0H153.843C154.143 0 154.344 0.400372 154.043 0.600559C97.2905 48.2449 52.5489 145.535 33.9316 212.298C33.5312 213.899 32.0298 215 30.4283 215H16.6155C7.40689 215 0 207.593 0 198.385V16.6155C0 7.40689 7.40689 0 16.6155 0Z" fill="#EC691A"></path>
              </g>
            </svg>
          </div>
          <div className="top-bar-title">APP SCRIPT EDITOR</div>
          <div className="top-bar-facility-selector">
            <FacilitySelectorPortal
              selectedFacility={selectedFacility}
              selectedFacilityId={selectedFacilityId}
              onFacilitySelect={handleFacilitySelect}
            />
          </div>
        </div>
        <div className="top-bar-right">
          <BuildVersion />
        </div>
      </div>
    </div>
  );
};