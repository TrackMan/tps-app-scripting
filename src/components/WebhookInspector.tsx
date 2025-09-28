import React from 'react';
import './WebhookEventsPanel.css';
import './WebhookInspector.css';

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
  clearSignal?: number;
}

const getBayIdFromEvent = (e: EventItem) => {
  try {
    const raw = e.raw as any;
    const data = e.data as any;
    if (raw && raw.common && raw.common.Bay && (raw.common.Bay.Id || raw.common.Bay.id)) return raw.common.Bay.Id ?? raw.common.Bay.id;
    if (raw && raw.common && raw.common.BayId) return raw.common.BayId;
    if (raw && raw.data && raw.data.Bay && (raw.data.Bay.Id || raw.data.Bay.id)) return raw.data.Bay.Id ?? raw.data.Bay.id;
    if (raw && raw.data && (raw.data.BayId || raw.data.bayId)) return raw.data.BayId ?? raw.data.bayId;
    if (raw && raw.Bay && (raw.Bay.Id || raw.Bay.id)) return raw.Bay.Id ?? raw.Bay.id;
    if (data && data.Bay && (data.Bay.Id || data.Bay.id)) return data.Bay.Id ?? data.Bay.id;
    if (data && (data.BayId || data.bayId)) return data.BayId ?? data.bayId;
    if (data && data.common && data.common.Bay && (data.common.Bay.Id || data.common.Bay.id)) return data.common.Bay.Id ?? data.common.Bay.id;
    return null;
  } catch (err) {
    return null;
  }
};

const WebhookInspector: React.FC<Props> = ({ userPath, selectedBayDbId = null, selectedBayId = null, clearSignal }) => {
  const [allEvents, setAllEvents] = React.useState<EventItem[]>([]);
  const [connected, setConnected] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const listContainerRef = React.useRef<HTMLDivElement | null>(null);

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
      es.onopen = () => setConnected(true);
      es.onerror = () => {
        setConnected(false);
        if (es) es.close();
        reconnectTimer = window.setTimeout(() => connect(), 3000);
      };
      es.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          const newItem: EventItem = { id: data.id, eventType: data.eventType, timestamp: data.timestamp, data: data.data, raw: data.raw, expanded: false };
          setAllEvents(prev => [newItem, ...prev]);
          // If the new item matches the current bay filter (or there is no filter) select it and focus the list
          try {
            const bayId = getBayIdFromEvent(newItem);
            const matches = (!selectedBayDbId && !selectedBayId) || (bayId && (String(bayId) === String(selectedBayId) || String(bayId) === String(selectedBayDbId)));
              if (matches) {
                setSelectedIndex(0);
                // focus the list container so keyboard navigation continues from the newly added item
                setTimeout(() => listContainerRef.current?.focus(), 0);
              }
          } catch (e) {
            // ignore
          }
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

  const filtered = React.useMemo(() => {
    if (!selectedBayDbId && !selectedBayId) return allEvents;
    return allEvents.filter(e => {
      const bayId = getBayIdFromEvent(e);
      if (!bayId) return false;
      if (selectedBayId && String(bayId) === String(selectedBayId)) return true;
      if (selectedBayDbId && String(bayId) === String(selectedBayDbId)) return true;
      return false;
    });
  }, [allEvents, selectedBayDbId, selectedBayId]);

  // ensure selected item is visible
  React.useEffect(() => {
    if (selectedIndex === null) return;
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [selectedIndex, filtered]);

  // clear local events when requested
  React.useEffect(() => {
    if (typeof clearSignal === 'undefined') return;
    setAllEvents([]);
    setSelectedIndex(null);
  }, [clearSignal]);

  // global fallback: listen for 'webhook:clear' events
  React.useEffect(() => {
    const handler = (ev: any) => {
      try {
        if (!ev || !ev.detail) return;
        const detailPath = ev.detail.userPath;
        if (!detailPath) return;
        if (String(detailPath) === String(userPath)) {
          setAllEvents([]);
          setSelectedIndex(null);
        }
      } catch (err) { /* ignore */ }
    };
    window.addEventListener('webhook:clear', handler as EventListener);
    return () => window.removeEventListener('webhook:clear', handler as EventListener);
  }, [userPath]);

  const select = (idx: number) => {
    setSelectedIndex(idx);
  };

  const onListKeyDown = (ev: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      if (selectedIndex === null) setSelectedIndex(0);
      else setSelectedIndex(Math.min(filtered.length - 1, selectedIndex + 1));
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (selectedIndex === null) setSelectedIndex(filtered.length - 1);
      else setSelectedIndex(Math.max(0, selectedIndex - 1));
    }
  };

  const selectedEvent = selectedIndex === null ? null : filtered[selectedIndex];

  const getEventModelPayload = (e: EventItem) => {
    try {
      // Common places where the EventModel might appear
      const maybe = (e.data ?? e.raw) as any;
      if (!maybe) return e.data ?? e.raw ?? {};
      // If envelope where data contains EventModel
      if (maybe.EventModel) return maybe.EventModel;
      // Some payloads might have data: { EventModel: {...} }
      if (maybe.data && maybe.data.EventModel) return maybe.data.EventModel;
      // Some normalized records put typed payload under 'data' already
      if (e.data && (e.data.EventModel || e.data.eventModel)) return e.data.EventModel ?? e.data.eventModel;
      // Fallback to raw.data.EventModel
      if (e.raw && e.raw.data && (e.raw.data.EventModel || e.raw.data.eventModel)) return e.raw.data.EventModel ?? e.raw.data.eventModel;
      // Last resort: return the whole data/raw object
      return maybe;
    } catch (err) {
      return e.data ?? e.raw ?? {};
    }
  };

  return (
    <div className="webhook-inspector">
  <div ref={listContainerRef} className="webhook-inspector-list" tabIndex={0} onKeyDown={onListKeyDown}>
        <div className="webhook-events-header">
          <strong>Events</strong>
          <span className={`webhook-events-status ${connected ? 'live' : ''}`}>{connected ? 'live' : 'disconnected'}</span>
        </div>
        <ul className="webhook-events-ul" ref={listRef}>
          {filtered.length === 0 ? (
            <li className="no-events">No events yet.</li>
          ) : (
            filtered.map((e, idx) => (
              <li key={e.id || idx} className={`webhook-event-item ${selectedIndex === idx ? 'selected' : ''}`} onClick={() => select(idx)}>
                <div className="event-type">{e.eventType}</div>
                <div className="event-meta">{new Date(e.timestamp).toLocaleString()}</div>
                <div className="event-bay">{getBayIdFromEvent(e) ? `Bay: ${getBayIdFromEvent(e)}` : ''}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="webhook-inspector-preview">
        {selectedEvent ? (
          <div>
            <h4 className="preview-title">{selectedEvent.eventType}</h4>
            <div className="preview-time">{new Date(selectedEvent.timestamp).toLocaleString()}</div>
            {/* Version 1: render JSON fallback of event.data or raw */}
            <pre className="preview-json">{JSON.stringify(getEventModelPayload(selectedEvent), null, 2)}</pre>
          </div>
        ) : (
          <div className="preview-empty">Select an event to preview</div>
        )}
      </div>
    </div>
  );
};

export default WebhookInspector;
