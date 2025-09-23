import React from 'react';

export interface SubTabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SubTabBar: React.FC<SubTabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tab-bar">
      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab${tab === activeTab ? ' active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
