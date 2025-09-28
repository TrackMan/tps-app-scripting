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
  selectedBayDbId?: number | null;
  selectedBayId?: string | null;
}

export const WebhookEventsPanel: React.FC<Props> = ({ userPath, selectedBayDbId = null, selectedBayId = null }) => {
  // Keep a full list of received events, and derive the filtered list
  const [allEvents, setAllEvents] = React.useState<EventItem[]>([]);
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
          // ensure newest-first and normalize expanded flag
          setAllEvents(j.events.map((e: any) => ({ id: e.id, eventType: e.eventType, timestamp: e.timestamp, data: e.data, raw: e.raw, expanded: false })));
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
          setAllEvents(prev => [{ id: data.id, eventType: data.eventType, timestamp: data.timestamp, data: data.data, raw: data.raw, expanded: false }, ...prev]);
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

  // Helper to extract Bay.Id (which in fixtures corresponds to bay.dbId)
  const getBayIdFromEvent = (e: EventItem) => {
    // Look for Bay id in multiple possible locations produced by different envelopes
    try {
      const raw = e.raw as any;
      const data = e.data as any;

      // 1) classifier-produced common metadata at top-level (normalize may attach common)
      if (raw && raw.common && raw.common.Bay && (raw.common.Bay.Id || raw.common.Bay.id)) return raw.common.Bay.Id ?? raw.common.Bay.id;
      if (raw && raw.common && raw.common.BayId) return raw.common.BayId;

      // 2) normalized payload: raw.data.Bay
      if (raw && raw.data && raw.data.Bay && (raw.data.Bay.Id || raw.data.Bay.id)) return raw.data.Bay.Id ?? raw.data.Bay.id;
      if (raw && raw.data && (raw.data.BayId || raw.data.bayId)) return raw.data.BayId ?? raw.data.bayId;

      // 3) direct top-level Bay (some fixtures might be structured differently)
      if (raw && raw.Bay && (raw.Bay.Id || raw.Bay.id)) return raw.Bay.Id ?? raw.Bay.id;

      // 4) the simplified data field that the frontend stores (data is normalize(data.data))
      if (data && data.Bay && (data.Bay.Id || data.Bay.id)) return data.Bay.Id ?? data.Bay.id;
      if (data && (data.BayId || data.bayId)) return data.BayId ?? data.bayId;

      // 5) fallback: check common inside data
      if (data && data.common && data.common.Bay && (data.common.Bay.Id || data.common.Bay.id)) return data.common.Bay.Id ?? data.common.Bay.id;

      return null;
    } catch (err) {
      return null;
    }
  };

  // Derive filtered events based on selectedBayDbId prop
  const filteredEvents = React.useMemo(() => {
    if (selectedBayDbId === null || selectedBayDbId === undefined) return allEvents;
    return allEvents.filter(e => {
      const bayId = getBayIdFromEvent(e);
      if (bayId === null || bayId === undefined) return false;
      try {
        return String(bayId) === String(selectedBayDbId);
      } catch (_) {
        return false;
      }
    });
  }, [allEvents, selectedBayDbId]);

  return (
    <div className="webhook-events">
      <div className="webhook-events-header">
        <strong>Events</strong>
        <span className={`webhook-events-status ${connected ? 'live' : ''}`}>{connected ? 'live' : 'disconnected'}</span>
      </div>
      <div className="webhook-events-list">
        {filteredEvents.length === 0 ? (
          <div>No events yet.</div>
        ) : (
          <ul className="webhook-events-ul">
            {filteredEvents.map((e, idx) => (
              <li key={e.id || idx} className="webhook-event-item">
                <div className="webhook-event-header">
                  <div>
                    <div className="webhook-event-meta">{new Date(e.timestamp).toLocaleString()}</div>
                    <div className="webhook-event-type">{e.eventType}</div>
                  </div>
                  <div>
                    <button onClick={() => {
                      // Toggle expanded state on the underlying allEvents array by id
                      setAllEvents(prev => prev.map(it => (it.id === e.id ? { ...it, expanded: !it.expanded } : it)));
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
