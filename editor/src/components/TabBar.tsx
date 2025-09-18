import React from 'react';

interface TabBarProps {
  activeTab: 'edit' | 'documentation';
  onTabChange: (tab: 'edit' | 'documentation') => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-bar">
      <div className="tab-container">
        <button 
          className={`tab ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => onTabChange('edit')}
        >
          Edit
        </button>
        <button 
          className={`tab ${activeTab === 'documentation' ? 'active' : ''}`}
          onClick={() => onTabChange('documentation')}
        >
          Documentation
        </button>
      </div>
    </div>
  );
};