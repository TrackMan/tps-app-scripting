import React from 'react';
import '../WebhookView/WebhookEventsPanel.css';
import './WebhookInspector.css';
import MeasurementTilesView from './MeasurementTilesView';
import CourseInfoBanner from './CourseInfoBanner';
import { ShotData } from './ShotTrajectoryOverlay';
import { useActivitySessionState } from '../../hooks/useActivitySessionState';
import { getEventDisplayName, getEventDescription, hasEventMetadata } from '../../utils/eventMetadata';
import { EventItem } from '../../types/webhookTypes';
import { getColorForId } from '../../utils/sessionColorUtils';
import { getSessionIds, getDeviceIdFromEvent, getEventModelPayload } from '../../utils/webhookEventUtils';
import { 
  isMeasurementEvent, 
  getMeasurementData, 
  findRecentChangePlayerData, 
  findAllShotsForHole 
} from '../../utils/measurementDataUtils';

interface Props {
  userPath: string;
  selectedDeviceId?: string | null;
  selectedBayId?: string | null;
  clearSignal?: number;
}

const WebhookInspector: React.FC<Props> = ({ userPath, selectedDeviceId = null, selectedBayId = null, clearSignal }) => {
  const [allEvents, setAllEvents] = React.useState<EventItem[]>([]);
  const [connected, setConnected] = React.useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [selectedEventTypes, setSelectedEventTypes] = React.useState<Set<string>>(new Set());
  const [showEventTypeDropdown, setShowEventTypeDropdown] = React.useState(false);
  const [newEventIds, setNewEventIds] = React.useState<Set<string>>(new Set());
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const listContainerRef = React.useRef<HTMLDivElement | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  
  // Color maps for session IDs
  const customerSessionColors = React.useRef(new Map<string, string>()).current;
  const activitySessionColors = React.useRef(new Map<string, string>()).current;

  // Activity session state management
  const { processSessionInfo, getSessionData, clearAllSessions } = useActivitySessionState();

  // Fetch initial events
  React.useEffect(() => {
    if (!userPath) return;
    let cancelled = false;
    setIsLoadingEvents(true);
    (async () => {
      try {
        // Note: We don't filter by bay/device on initial fetch because:
        // - selectedBayId is a UI-level identifier (base64 encoded bay name)
        // - Device.Id in events is the actual TrackMan device ID
        // - They don't match, so we fetch all events and filter client-side
        // TODO: Map selectedBayId to actual Device.Id list for server-side filtering
        
        const url = `/api/webhook/${encodeURIComponent(userPath)}/events`;
        console.log('[WebhookInspector] Fetching events:', url);
        
        const r = await fetch(url);
        if (!r.ok) throw new Error(await r.text());
        const j = await r.json();
        
        console.log('[WebhookInspector] Fetch response:', {
          count: j.count,
          source: j.source,
        });
        
        if (!cancelled && Array.isArray(j.events)) {
          const events = j.events.map((e: any) => ({ id: e.id, eventType: e.eventType, timestamp: e.timestamp, data: e.data, raw: e.raw, expanded: false }));
          setAllEvents(events);
          
          // Process any SessionInfo events that were already present
          console.log('[Initial Load] Processing', events.length, 'events for SessionInfo');
          events.forEach((event: EventItem) => {
            if (event.eventType === 'TPS.SessionInfo') {
              console.log('[Initial Load] Found SessionInfo event, processing...');
              processSessionInfo(event.raw || event);
            }
          });
        }
      } catch (err) {
        console.warn('Failed to load events', err);
      } finally {
        if (!cancelled) setIsLoadingEvents(false);
      }
    })();
    return () => { cancelled = true; };
  }, [userPath, processSessionInfo]);

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
          
          // Mark this event as new for the glow animation
          if (newItem.id) {
            setNewEventIds(prev => new Set(prev).add(newItem.id!));
            // Remove the "new" flag after 500ms
            setTimeout(() => {
              setNewEventIds(prev => {
                const next = new Set(prev);
                next.delete(newItem.id!);
                return next;
              });
            }, 500);
          }
          
          // Process SessionInfo events to extract activity/course information
          if (data.eventType === 'TPS.SessionInfo') {
            console.log('[SSE] Processing SessionInfo event');
            processSessionInfo(data.raw || data);
          }
          
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

  // Get unique event types for the filter dropdown
  const uniqueEventTypes = React.useMemo(() => {
    const types = new Set<string>();
    allEvents.forEach(e => types.add(e.eventType));
    return Array.from(types).sort();
  }, [allEvents]);

  // Check if an event should be visible based on filters
  const isEventVisible = React.useCallback((e: EventItem) => {
    // Filter by Device/Bay if applicable
    if (selectedDeviceId || selectedBayId) {
      const deviceId = getDeviceIdFromEvent(e);
      if (!deviceId) return false;
      if (selectedDeviceId && String(deviceId) !== String(selectedDeviceId) &&
          !(selectedBayId && String(deviceId) === String(selectedBayId))) {
        return false;
      }
    }
    
    // Filter by selected event types
    if (selectedEventTypes.size > 0 && !selectedEventTypes.has(e.eventType)) {
      return false;
    }
    
    return true;
  }, [selectedDeviceId, selectedBayId, selectedEventTypes]);

  // Get visible events for selection indexing
  const visibleEvents = React.useMemo(() => {
    return allEvents.filter(isEventVisible);
  }, [allEvents, isEventVisible]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowEventTypeDropdown(false);
      }
    };
    
    if (showEventTypeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showEventTypeDropdown]);

  // ensure selected item is visible
  React.useEffect(() => {
    if (selectedIndex === null) return;
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [selectedIndex, visibleEvents]);

  // clear local events when requested
  React.useEffect(() => {
    if (typeof clearSignal === 'undefined') return;
    setAllEvents([]);
    setSelectedIndex(null);
    clearAllSessions(); // Clear activity session state
  }, [clearSignal, clearAllSessions]);

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
          clearAllSessions(); // Clear activity session state
        }
      } catch (err) { /* ignore */ }
    };
    window.addEventListener('webhook:clear', handler as EventListener);
    return () => window.removeEventListener('webhook:clear', handler as EventListener);
  }, [userPath, clearAllSessions]);

  const select = (idx: number) => {
    setSelectedIndex(idx);
  };

  const toggleEventType = (eventType: string) => {
    setSelectedEventTypes(prev => {
      const next = new Set(prev);
      if (next.has(eventType)) {
        next.delete(eventType);
      } else {
        next.add(eventType);
      }
      return next;
    });
  };

  const selectAllEventTypes = () => {
    setSelectedEventTypes(new Set(uniqueEventTypes));
  };

  const clearAllEventTypes = () => {
    setSelectedEventTypes(new Set());
  };

  const onListKeyDown = (ev: React.KeyboardEvent) => {
    if (visibleEvents.length === 0) return;
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      if (selectedIndex === null) setSelectedIndex(0);
      else setSelectedIndex(Math.min(visibleEvents.length - 1, selectedIndex + 1));
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (selectedIndex === null) setSelectedIndex(visibleEvents.length - 1);
      else setSelectedIndex(Math.max(0, selectedIndex - 1));
    }
  };

  const selectedEvent = selectedIndex === null ? null : visibleEvents[selectedIndex];

  return (
    <div className="webhook-inspector">
      <div ref={listContainerRef} className="webhook-inspector-list" tabIndex={0} onKeyDown={onListKeyDown}>
        <div className="webhook-events-header">
          <strong>Events</strong>
          <span className={`webhook-events-status ${connected ? 'live' : ''}`}>
            {isLoadingEvents ? (
              <span className="loading-spinner">
                <span className="loading-spinner-icon"></span>
                <span className="loading-text">loading</span>
              </span>
            ) : (connected ? 'live' : 'disconnected')}
          </span>
          
          {/* Event Type Filter Dropdown */}
          <div className="event-type-filter" ref={dropdownRef}>
            <button 
              className="event-type-filter-button"
              onClick={() => setShowEventTypeDropdown(!showEventTypeDropdown)}
              title="Filter by event type"
            >
              <svg className="filter-icon" width="16" height="16" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4 L28 4 L18 16 L18 26 L14 28 L14 16 Z"/>
              </svg>
              {selectedEventTypes.size > 0 && (
                <span className="event-type-filter-badge">{selectedEventTypes.size}</span>
              )}
            </button>
            
            {showEventTypeDropdown && (
              <div className="event-type-dropdown">
                <div className="event-type-dropdown-header">
                  <strong>Filter Event Types</strong>
                  <div className="event-type-dropdown-actions">
                    <button onClick={selectAllEventTypes}>All</button>
                    <button onClick={clearAllEventTypes}>None</button>
                  </div>
                </div>
                <div className="event-type-dropdown-list">
                  {uniqueEventTypes.map(eventType => (
                    <label key={eventType} className="event-type-option">
                      <input
                        type="checkbox"
                        checked={selectedEventTypes.has(eventType)}
                        onChange={() => toggleEventType(eventType)}
                      />
                      <span className="event-type-label">{eventType}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="webhook-events-ul" ref={listRef}>
          {isLoadingEvents ? (
            <li className="loading-events-message">
              <div className="loading-events-spinner"></div>
              <div>Loading events...</div>
            </li>
          ) : visibleEvents.length === 0 ? (
            <li className="no-events">No events yet.</li>
          ) : (
            allEvents.map((e, allIdx) => {
              const isVisible = isEventVisible(e);
              if (!isVisible) return null; // Skip rendering hidden items
              
              // Find the visible index for this event
              const visibleIdx = visibleEvents.findIndex(ve => ve === e);
              
              const { customerSessionId, activitySessionId } = getSessionIds(e);
              const customerColor = getColorForId(customerSessionId, customerSessionColors);
              const activityColor = getColorForId(activitySessionId, activitySessionColors);
              
              const isNew = e.id && newEventIds.has(e.id);
              
              return (
                <li 
                  key={e.id || allIdx} 
                  className={`webhook-event-item ${selectedIndex === visibleIdx ? 'selected' : ''} ${isNew ? 'new-event' : ''}`} 
                  onClick={() => select(visibleIdx)}
                >
                  <div 
                    className={`event-type ${!hasEventMetadata(e.eventType) ? 'unknown-event' : ''}`}
                    title={getEventDescription(e.eventType) ? `${e.eventType}\n${getEventDescription(e.eventType)}` : e.eventType}
                  >
                    {getEventDisplayName(e.eventType)}
                  </div>
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
            <div className="preview-header">
              <h4 
                className="preview-title" 
                title={getEventDescription(selectedEvent.eventType) 
                  ? `${selectedEvent.eventType}\n${getEventDescription(selectedEvent.eventType)}` 
                  : selectedEvent.eventType}
              >
                {getEventDisplayName(selectedEvent.eventType)}
              </h4>
              <div className="preview-time">{new Date(selectedEvent.timestamp).toLocaleString()}</div>
            </div>
            {/* Display course information if available for this activity session */}
            {(() => {
              const { activitySessionId } = getSessionIds(selectedEvent);
              console.log('[WebhookInspector] Render check - activitySessionId:', activitySessionId);
              if (activitySessionId) {
                const sessionData = getSessionData(activitySessionId);
                console.log('[WebhookInspector] sessionData:', sessionData ? 'found' : 'not found', sessionData);
                if (sessionData && (sessionData.courseInfo || sessionData.isLoadingCourse)) {
                  // Find the most recent ChangePlayer data for this event
                  const changePlayerData = findRecentChangePlayerData(selectedEvent, allEvents);
                  console.log('[WebhookInspector] changePlayerData:', changePlayerData);
                  
                  // Find all shots for the current hole
                  const shots: ShotData[] = changePlayerData?.hole 
                    ? findAllShotsForHole(selectedEvent, allEvents, changePlayerData.hole)
                    : [];
                  console.log('[WebhookInspector] shots found:', shots.length);
                  
                  return (
                    <CourseInfoBanner 
                      sessionData={sessionData} 
                      isLoading={sessionData.isLoadingCourse}
                      eventHole={changePlayerData?.hole}
                      eventShot={changePlayerData?.shot}
                      eventPlayerName={changePlayerData?.playerName}
                      shots={shots}
                    />
                  );
                }
              }
              return null;
            })()}
            
            {/* Check if this is a measurement event - show tiles view instead of JSON */}
            {(() => {
              console.log('[WebhookInspector] Checking measurement event for:', selectedEvent.eventType);
              if (isMeasurementEvent(selectedEvent)) {
                console.log('[WebhookInspector] Is measurement event, getting data...');
                const measurement = getMeasurementData(selectedEvent, allEvents);
                console.log('[WebhookInspector] Measurement data:', measurement ? 'found' : 'not found', measurement);
                if (measurement) {
                  const payload = getEventModelPayload(selectedEvent);
                  console.log('[WebhookInspector] Rendering MeasurementTilesView');
                  return (
                    <MeasurementTilesView 
                      measurement={measurement}
                      playerId={payload?.PlayerId}
                    />
                  );
                }
              }
              // Fallback: render JSON for all other events
              console.log('[WebhookInspector] Fallback - rendering JSON');
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
