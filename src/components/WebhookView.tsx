import React from 'react';
import { useQuery, useMutation } from 'urql';
import { GET_USER_PROPERTIES_QUERY, APP_SCRIPT_APPLICATION, SET_USER_PROPERTIES_MUTATION, SetUserPropertiesVariables, SetUserPropertiesData } from '../graphql/userProperties';
import WebhookEventsPanel from './WebhookEventsPanel';

export const WebhookView: React.FC = () => {
  const [result] = useQuery({
    query: GET_USER_PROPERTIES_QUERY,
    variables: { application: APP_SCRIPT_APPLICATION },
  });

  const webhookKey = 'WEBHOOK_PATH';
  const [localWebhook, setLocalWebhook] = React.useState<string | null>(null);

  let webhookPath: string | null = null;
  if (result.data && result.data.me && Array.isArray(result.data.me.properties)) {
    const prop = result.data.me.properties.find((p: any) => p.key === webhookKey);
    if (prop) webhookPath = prop.value;
  }

  const [_, setProperties] = useMutation<SetUserPropertiesData, SetUserPropertiesVariables>(SET_USER_PROPERTIES_MUTATION as any);

  const viteEnvBase = (import.meta as any)?.env?.VITE_BACKEND_BASE_URL;
  const windowOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const normalizedBase = String(viteEnvBase || windowOrigin || '').replace(/\/$/, '');
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
    <div style={{ padding: 24 }}>
      <h3>My Webhook URL</h3>
      {result.fetching && <p>Loading...</p>}
      {result.error && <p style={{ color: 'red' }}>Error loading properties</p>}
      {!result.fetching && !webhookPath && !localWebhook && <p>Creating webhook path...</p>}
      {url && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', maxWidth: 600 }}>
          <label htmlFor="webhook-url" className="visually-hidden">Webhook URL</label>
          <input id="webhook-url" readOnly value={url} style={{ flex: 1, padding: 8 }} />
          <button onClick={() => { navigator.clipboard?.writeText(url); }} style={{ padding: '8px 12px' }}>Copy</button>
        </div>
      )}

      {url && (
        <WebhookEventsPanel userPath={(localWebhook || webhookPath) as string} />
      )}
    </div>
  );
};

export default WebhookView;
