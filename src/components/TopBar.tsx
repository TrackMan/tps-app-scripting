import React, { useState, useRef, useEffect } from 'react';
import { FacilitySelectorPortal } from './FacilitySelector';
import { BuildVersion } from './BuildVersion';
import { useAuth } from '../lib/AuthProvider';

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
  const { isAuthenticated, isLoading, logout, profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click for avatar menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleLogoutClick = () => {
    console.log('Logging out user');
    logout();
    setMenuOpen(false);
  };
  
  const handleFacilitySelect = (facility: Facility | null) => {
    onFacilitySelect(facility);

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
          <div className="top-bar-auth">
            {isLoading ? (
              <span className="auth-loading">🔄</span>
            ) : null}
          </div>
          <BuildVersion />
          {profile && (
            <>
              <div
                ref={avatarRef}
                className="top-bar-user-image top-bar-user-image-clickable topbar-avatar-wrapper"
                onClick={() => {
                  setMenuOpen((v) => !v);
                }}
              >
                {profile.picture && (
                  <img src={profile.picture} alt={profile.fullName || ''} />
                )}
              </div>
              {menuOpen && (
                <div className="top-bar-user-menu topbar-user-menu-absolute">
                  <div className="top-bar-user-menu-title">{profile.fullName || ''}</div>
                  <hr className="top-bar-user-menu-divider" />
                  <button
                    className="top-bar-user-menu-item top-bar-user-menu-link"
                    onMouseDown={handleLogoutClick}
                  >
                    <span className="top-bar-user-menu-row">
                      {/* Logout SVG */}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.404 1.985a1 1 0 0 1 1-1H8.9a1 1 0 0 1 1 1v3.143a.5.5 0 0 1-1 0V1.985H2.404v12.03H8.9v-3.003a.5.5 0 0 1 1 0v3.003a1 1 0 0 1-1 1H2.404a1 1 0 0 1-1-1V1.985Z" fill="#414141"/><path fillRule="evenodd" clipRule="evenodd" d="M11.721 5.533a.5.5 0 0 1 .707.024l1.967 2.102a.6.6 0 0 1-.007.827l-1.966 2.033a.5.5 0 0 1-.719-.695l1.213-1.254H5.897a.5.5 0 1 1 0-1h7.045l-1.244-1.33a.5.5 0 0 1 .023-.707Z" fill="#414141"/></svg>
                      Log Out
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};