import React from 'react';

interface DownloadButtonProps {
  isValid: boolean;
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ isValid, onClick }) => {
  return (
    <button 
      className="tree-btn download-btn" 
      disabled={!isValid}
      onClick={onClick}
      title={!isValid ? "Fix validation errors before downloading" : "Download script"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
      </svg>
      Download
    </button>
  );
};