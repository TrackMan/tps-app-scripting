import React from 'react';
import { useQuery, useMutation } from 'urql';
import { GET_USER_PROPERTIES_QUERY, APP_SCRIPT_APPLICATION, SET_USER_PROPERTIES_MUTATION, SetUserPropertiesVariables, SetUserPropertiesData } from '../../graphql/userProperties';
import WebhookInspector from '../WebhookInspector';
import './WebhookView.css';

interface WebhookViewProps {
  selectedDeviceId?: string | null;
}

export const WebhookView: React.FC<WebhookViewProps> = ({ selectedDeviceId = null }) => {
  // selectedBayId will be passed from App via prop injection in App.tsx
  const selectedBayIdProp = (window as any)?._selectedBayIdForWebhook || null;
  const [result] = useQuery({
    query: GET_USER_PROPERTIES_QUERY,
    variables: { application: APP_SCRIPT_APPLICATION },
  });

  const webhookKey = 'WEBHOOK_PATH';
  const [localWebhook, setLocalWebhook] = React.useState<string | null>(null);
  const [clearSignal, setClearSignal] = React.useState(0);

  // Development override: allow forcing a webhook path via ?webhook=<id>
  // This is intentionally non-destructive and only used when no saved property exists.
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const override = params.get('webhook');
        if (override && !localWebhook) setLocalWebhook(override);
      }
    } catch (err) {
      // ignore in non-browser environments
    }
  }, []);

  let webhookPath: string | null = null;
  if (result.data && result.data.me && Array.isArray(result.data.me.properties)) {
    const prop = result.data.me.properties.find((p: any) => p.key === webhookKey);
    if (prop) webhookPath = prop.value;
  }

  const [_, setProperties] = useMutation<SetUserPropertiesData, SetUserPropertiesVariables>(SET_USER_PROPERTIES_MUTATION as any);

  const viteEnvBase = (import.meta as any)?.env?.VITE_BACKEND_BASE_URL;
  const windowOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Detect if running on localhost to use Vite proxy instead of direct backend URL
  // This ensures webhook requests go through the proxy to local server with Azure Storage
  const isLocalhost = windowOrigin.includes('localhost') || windowOrigin.includes('127.0.0.1');
  const normalizedBase = isLocalhost ? '' : String(viteEnvBase || windowOrigin || '').replace(/\/$/, '');
  
  const url = (localWebhook || webhookPath) ? `${normalizedBase}/api/webhook/${(localWebhook || webhookPath)}` : null;

  // Try to create a webhook path if missing
  React.useEffect(() => {
    const shouldCreate = !result.fetching && !result.error && !webhookPath && !localWebhook;
    if (!shouldCreate) return;

    const createWebhook = async () => {
      // Generate an id: prefer crypto.randomUUID, fall back to random base36
      const id = (typeof crypto !== 'undefined' && (crypto as any).randomUUID)
        ? (crypto as any).randomUUID()
        : Math.random().toString(36).slice(2, 10);

      try {
        const vars: SetUserPropertiesVariables = {
          application: APP_SCRIPT_APPLICATION,
          addProperties: [{ key: webhookKey, value: id }],
        };
        const res = await setProperties(vars);
        if (res.data && res.data.setUserProperties && Array.isArray(res.data.setUserProperties.properties)) {
          const prop = res.data.setUserProperties.properties.find((p: any) => p.key === webhookKey);
          if (prop && prop.value) {
            setLocalWebhook(prop.value);
          } else {
            // Mutation succeeded but missing property in response; fallback to our id
            setLocalWebhook(id);
          }
        } else {
          // Unexpected response shape; fallback to id
          setLocalWebhook(id);
        }
      } catch (err) {
        console.error('Failed to create webhook path', err);
      }
    };

    createWebhook();
  }, [result.fetching, result.error, webhookPath, localWebhook, setProperties]);

  return (
    <div className="webhook-view">
      <div className="webhook-topbar">
        <input readOnly value={url || ''} className="webhook-url-input" aria-label="Webhook URL" />
        <button onClick={() => { navigator.clipboard?.writeText(url || ''); }} className="webhook-copy-button">Copy</button>
        <button onClick={async () => {
          if (!url) return;
          try {
            const r = await fetch(`${url}/events`, { method: 'DELETE' });
            if (!r.ok) {
              console.warn('Failed to clear events', await r.text());
              return;
            }
            // notify inspector to clear its local state
            setClearSignal(s => s + 1);
            try {
              // global fallback for listeners that don't receive prop change
              const ev = new CustomEvent('webhook:clear', { detail: { userPath: (localWebhook || webhookPath) } });
              window.dispatchEvent(ev);
            } catch (err) {
              // ignore - older browsers may not support CustomEvent constructor
            }
          } catch (err) {
            console.warn('Failed to clear events', err);
          }
        }} className="webhook-clear-button">Clear</button>
      </div>

      <div className="webhook-inspector-wrap">
        {url && (
          <WebhookInspector userPath={(localWebhook || webhookPath) as string} selectedDeviceId={selectedDeviceId} selectedBayId={selectedBayIdProp} clearSignal={clearSignal} />
        )}
      </div>
    </div>
  );
};

export default WebhookView;
