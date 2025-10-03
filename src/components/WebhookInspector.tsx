import React from 'react';
import './WebhookEventsPanel.css';
import './WebhookInspector.css';
import MeasurementTilesView from './MeasurementTilesView';

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
  selectedDeviceId?: string | null;
  selectedBayId?: string | null;
  clearSignal?: number;
}

// Color palette for session/activity indicators
const SESSION_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#84cc16', // lime
  '#6366f1', // indigo
];

const getSessionIds = (e: EventItem): { customerSessionId?: string; activitySessionId?: string } => {
  try {
    const raw = e.raw as any;
    const data = raw?.data || raw;
    
    // Extract CustomerSession.Id
    const customerSessionId = 
      data?.CustomerSession?.Id || 
      data?.common?.CustomerSession?.Id ||
      raw?.common?.CustomerSession?.Id;
    
    // Extract ActivitySession.Id
    const activitySessionId = 
      data?.ActivitySession?.Id || 
      data?.common?.ActivitySession?.Id ||
      raw?.common?.ActivitySession?.Id;
    
    return { customerSessionId, activitySessionId };
  } catch (err) {
    return {};
  }
};

const getColorForId = (id: string | undefined, colorMap: Map<string, string>): string | null => {
  if (!id) return null;
  
  if (!colorMap.has(id)) {
    // Assign a color based on the current size of the map
    const colorIndex = colorMap.size % SESSION_COLORS.length;
    colorMap.set(id, SESSION_COLORS[colorIndex]);
  }
  
  return colorMap.get(id) || null;
};

const getDeviceIdFromEvent = (e: EventItem) => {
  try {
    const raw = e.raw as any;
    const data = e.data as any;
    // Check for Device.Id in various locations
    if (raw && raw.data && raw.data.Device && raw.data.Device.Id) return raw.data.Device.Id;
    if (raw && raw.Device && raw.Device.Id) return raw.Device.Id;
    if (data && data.Device && data.Device.Id) return data.Device.Id;
    return null;
  } catch (err) {
    return null;
  }
};

const WebhookInspector: React.FC<Props> = ({ userPath, selectedDeviceId = null, selectedBayId = null, clearSignal }) => {
  const [allEvents, setAllEvents] = React.useState<EventItem[]>([]);
  const [connected, setConnected] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [showAllEvents, setShowAllEvents] = React.useState(false);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const listContainerRef = React.useRef<HTMLDivElement | null>(null);
  
  // Color maps for session IDs
  const customerSessionColors = React.useRef(new Map<string, string>()).current;
  const activitySessionColors = React.useRef(new Map<string, string>()).current;

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
      console.log(`[SSE] Connecting to /api/webhook/${userPath}/stream`);
      es = new EventSource(`/api/webhook/${encodeURIComponent(userPath)}/stream`);
      es.onopen = () => {
        console.log('[SSE] Connection opened, status: live');
        setConnected(true);
      };
      es.onerror = (err) => {
        console.error('[SSE] Connection error:', err, 'readyState:', es?.readyState);
        setConnected(false);
        if (es) es.close();
        reconnectTimer = window.setTimeout(() => connect(), 3000);
      };
      es.onmessage = (ev) => {
        console.log('[SSE] Message received:', ev.data.substring(0, 100) + '...');
        try {
          const data = JSON.parse(ev.data);
          console.log('[SSE] Parsed event:', data.eventType, 'id:', data.id);
          const newItem: EventItem = { id: data.id, eventType: data.eventType, timestamp: data.timestamp, data: data.data, raw: data.raw, expanded: false };
          setAllEvents(prev => {
            try {
              if (newItem.id) {
                const idx = prev.findIndex(p => p.id && p.id === newItem.id);
                if (idx >= 0) {
                  // merge fields so enriched SSE augments the minimal one
                  const merged = { ...prev[idx], ...newItem };
                  // move merged item to the top
                  const copy = prev.slice();
                  copy.splice(idx, 1);
                  return [merged, ...copy];
                }
              }
            } catch (err) {
              // fallback to naive prepend on any error
            }
            return [newItem, ...prev];
          });
          // If the new item matches the current device/bay filter (or there is no filter) select it and focus the list
          try {
            const deviceId = getDeviceIdFromEvent(newItem);
            const matches = (!selectedDeviceId && !selectedBayId) || 
                          (deviceId && String(deviceId) === String(selectedDeviceId)) ||
                          (selectedBayId && String(deviceId) === String(selectedBayId));
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
    // If "Show All Events" is enabled, bypass Device/Bay filtering
    if (showAllEvents) return allEvents;
    
    // If no Device/Bay is selected, show all events
    if (!selectedDeviceId && !selectedBayId) return allEvents;
    
    // Filter by selected Device ID (from bay's deviceId field)
    return allEvents.filter(e => {
      const deviceId = getDeviceIdFromEvent(e);
      if (!deviceId) return false;
      if (selectedDeviceId && String(deviceId) === String(selectedDeviceId)) return true;
      if (selectedBayId && String(deviceId) === String(selectedBayId)) return true;
      return false;
    });
  }, [allEvents, selectedDeviceId, selectedBayId, showAllEvents]);

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

  // Check if event is a StrokeCompletedEvent
  const isStrokeCompletedEvent = (e: EventItem) => {
    return e.eventType === 'TPS.Live.OnStrokeCompletedEvent' || 
           e.eventType.includes('StrokeCompleted');
  };

  // Extract measurement data from StrokeCompletedEvent
  const getMeasurementData = (e: EventItem) => {
    try {
      const payload = getEventModelPayload(e);
      if (payload && payload.Measurement) {
        return {
          measurement: payload.Measurement,
          playerId: payload.PlayerId
        };
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  return (
    <div className="webhook-inspector">
      <div ref={listContainerRef} className="webhook-inspector-list" tabIndex={0} onKeyDown={onListKeyDown}>
        <div className="webhook-events-header">
          <strong>Events</strong>
          <span className={`webhook-events-status ${connected ? 'live' : ''}`}>{connected ? 'live' : 'disconnected'}</span>
          {(selectedDeviceId || selectedBayId) && (
            <label style={{ marginLeft: 'auto', fontSize: '0.85em', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={showAllEvents} 
                onChange={(e) => setShowAllEvents(e.target.checked)}
              />
              Show All Events
            </label>
          )}
        </div>
        <ul className="webhook-events-ul" ref={listRef}>
          {filtered.length === 0 ? (
            <li className="no-events">No events yet.</li>
          ) : (
            filtered.map((e, idx) => {
              const { customerSessionId, activitySessionId } = getSessionIds(e);
              const customerColor = getColorForId(customerSessionId, customerSessionColors);
              const activityColor = getColorForId(activitySessionId, activitySessionColors);
              
              return (
                <li key={e.id || idx} className={`webhook-event-item ${selectedIndex === idx ? 'selected' : ''}`} onClick={() => select(idx)}>
                  <div className="event-type">{e.eventType}</div>
                  <div className="event-meta">{new Date(e.timestamp).toLocaleString()}</div>
                  <div className="event-session-indicators">
                    {customerColor && (
                      <div 
                        className="session-dot"
                        // eslint-disable-next-line react/forbid-dom-props
                        style={{ backgroundColor: customerColor }}
                        title={`Customer Session: ${customerSessionId}`}
                      />
                    )}
                    {activityColor && (
                      <div 
                        className="session-dot"
                        // eslint-disable-next-line react/forbid-dom-props
                        style={{ backgroundColor: activityColor }}
                        title={`Activity Session: ${activitySessionId}`}
                      />
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="webhook-inspector-preview">
        {selectedEvent ? (
          <div>
            <h4 className="preview-title">{selectedEvent.eventType}</h4>
            <div className="preview-time">{new Date(selectedEvent.timestamp).toLocaleString()}</div>
            
            {/* Check if this is a StrokeCompletedEvent - show tiles view instead of JSON */}
            {(() => {
              if (isStrokeCompletedEvent(selectedEvent)) {
                const measurementData = getMeasurementData(selectedEvent);
                if (measurementData && measurementData.measurement) {
                  return (
                    <MeasurementTilesView 
                      measurement={measurementData.measurement}
                      playerId={measurementData.playerId}
                    />
                  );
                }
              }
              // Fallback: render JSON for all other events
              return (
                <pre className="preview-json">{JSON.stringify(getEventModelPayload(selectedEvent), null, 2)}</pre>
              );
            })()}
          </div>
        ) : (
          <div className="preview-empty">Select an event to preview</div>
        )}
      </div>
    </div>
  );
};

export default WebhookInspector;
