import React from 'react';
import './WebhookEventsPanel.css';

type EventItem = {
  id?: string;
  eventType: string;
  timestamp: string;
  data?: any;
  raw?: any;
  expanded?: boolean;
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
          setEvents(j.events.map((e: any) => ({ id: e.id, eventType: e.eventType, timestamp: e.timestamp, data: e.data, raw: e.raw })));
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
          // Prepend newest-first, include data/raw if present
          setEvents(prev => [{ id: data.id, eventType: data.eventType, timestamp: data.timestamp, data: data.data, raw: data.raw }, ...prev]);
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
    <div className="webhook-events">
      <div className="webhook-events-header">
        <strong>Events</strong>
        <span className={`webhook-events-status ${connected ? 'live' : ''}`}>{connected ? 'live' : 'disconnected'}</span>
      </div>
      <div className="webhook-events-list">
        {events.length === 0 ? (
          <div>No events yet.</div>
        ) : (
          <ul className="webhook-events-ul">
            {events.map((e, idx) => (
              <li key={e.id || idx} className="webhook-event-item">
                <div className="webhook-event-header">
                  <div>
                    <div className="webhook-event-meta">{new Date(e.timestamp).toLocaleString()}</div>
                    <div className="webhook-event-type">{e.eventType}</div>
                  </div>
                  <div>
                    <button onClick={() => {
                      setEvents(prev => prev.map((it, i) => i === idx ? { ...it, expanded: !it.expanded } : it));
                    }}>{e.expanded ? 'Hide' : 'Show'}</button>
                  </div>
                </div>
                {e.expanded && (
                  <pre className="webhook-event-pre">{JSON.stringify(e.raw || e.data || {}, null, 2)}</pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WebhookEventsPanel;
