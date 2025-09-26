import React from 'react';

type EventItem = {
  id?: string;
  eventType: string;
  timestamp: string;
};

interface Props {
  userPath: string;
}

export const WebhookEventsPanel: React.FC<Props> = ({ userPath }) => {
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [connected, setConnected] = React.useState(false);

  // Fetch initial events
  React.useEffect(() => {
    if (!userPath) return;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`/api/webhook/${encodeURIComponent(userPath)}/events`);
        if (!r.ok) throw new Error(await r.text());
        const j = await r.json();
        if (!cancelled && Array.isArray(j.events)) {
          // ensure newest-first
          setEvents(j.events.map((e: any) => ({ id: e.id, eventType: e.eventType, timestamp: e.timestamp })));
        }
      } catch (err) {
        console.warn('Failed to load events', err);
      }
    })();
    return () => { cancelled = true; };
  }, [userPath]);

  // SSE subscription
  React.useEffect(() => {
    if (!userPath) return;
    let es: EventSource | null = null;
    let reconnectTimer: number | null = null;

    const connect = () => {
      es = new EventSource(`/api/webhook/${encodeURIComponent(userPath)}/stream`);
      es.onopen = () => {
        setConnected(true);
      };
      es.onerror = () => {
        setConnected(false);
        // Try to reconnect after a short delay
        if (es) es.close();
        reconnectTimer = window.setTimeout(() => connect(), 3000);
      };
      es.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          // Prepend newest-first
          setEvents(prev => [{ id: data.id, eventType: data.eventType, timestamp: data.timestamp }, ...prev]);
        } catch (err) {
          console.warn('Invalid SSE payload', err);
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      if (es) es.close();
      setConnected(false);
    };
  }, [userPath]);

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <strong>Events</strong>
        <span style={{ color: connected ? 'green' : 'gray' }}>{connected ? 'live' : 'disconnected'}</span>
      </div>
      <div style={{ maxHeight: 360, overflow: 'auto', border: '1px solid #eee', padding: 8 }}>
        {events.length === 0 ? (
          <div>No events yet.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {events.map((e, idx) => (
              <li key={e.id || idx} style={{ padding: '6px 8px', borderBottom: '1px solid #f1f1f1' }}>
                <div style={{ fontSize: 12, color: '#666' }}>{new Date(e.timestamp).toLocaleString()}</div>
                <div style={{ fontWeight: 600 }}>{e.eventType}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WebhookEventsPanel;
