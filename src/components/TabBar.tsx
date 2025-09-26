import React from 'react';

import { useQuery } from 'urql';
import { GET_USER_PROPERTIES_QUERY, APP_SCRIPT_APPLICATION } from '../graphql/userProperties';
import WebhookView from './WebhookView';

type TabKey = 'edit' | 'documentation' | 'webhook';

interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const [result] = useQuery({
    query: GET_USER_PROPERTIES_QUERY,
    variables: { application: APP_SCRIPT_APPLICATION },
  });

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
        <button
          className={`tab ${activeTab === 'webhook' ? 'active' : ''}`}
          onClick={() => onTabChange('webhook')}
        >
          Webhook
        </button>
      </div>
    </div>
  );
};
export const TabBarContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  if (activeTab === 'webhook') return <WebhookView /> as any;
  return null as any;
};

export default TabBar;