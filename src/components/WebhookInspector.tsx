import React from 'react';
import './WebhookEventsPanel.css';
import './WebhookInspector.css';
import MeasurementTilesView from './MeasurementTilesView';
import CourseInfoBanner from './CourseInfoBanner';
import { ShotData } from './ShotTrajectoryOverlay';
import { useActivitySessionState } from '../hooks/useActivitySessionState';

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
        const r = await fetch(`/api/webhook/${encodeURIComponent(userPath)}/events`);
        if (!r.ok) throw new Error(await r.text());
        const j = await r.json();
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

  // Check if event should show measurement tiles
  const isMeasurementEvent = (e: EventItem) => {
    return e.eventType === 'TPS.Live.OnStrokeCompletedEvent' || 
           e.eventType === 'TPS.Simulator.ShotStarting' ||
           e.eventType === 'TPS.Simulator.ShotFinish' ||
           e.eventType.includes('StrokeCompleted') ||
           e.eventType.includes('ShotStarting') ||
           e.eventType.includes('ShotFinish');
  };

  // Extract measurement data from various event types
  const getMeasurementData = (e: EventItem, eventsList: EventItem[]) => {
    try {
      const payload = getEventModelPayload(e);
      
      // TPS.Live.OnStrokeCompletedEvent - has full Measurement object
      if (e.eventType === 'TPS.Live.OnStrokeCompletedEvent' || e.eventType.includes('StrokeCompleted')) {
        if (payload && payload.Measurement) {
          return {
            measurement: payload.Measurement,
            playerId: payload.PlayerId
          };
        }
      }
      
      // TPS.Simulator.ShotStarting - has limited fields
      if (e.eventType === 'TPS.Simulator.ShotStarting' || e.eventType.includes('ShotStarting')) {
        // Build a measurement object from available fields
        const measurement: any = {};
        if (payload.BallSpeed !== undefined) measurement.BallSpeed = payload.BallSpeed;
        if (payload.LaunchAngle !== undefined) measurement.LaunchAngle = payload.LaunchAngle;
        if (payload.LaunchDirection !== undefined) measurement.LaunchDirection = payload.LaunchDirection;
        
        return {
          measurement,
          playerId: payload.PlayerId
        };
      }
      
      // TPS.Simulator.ShotFinish - merge with previous OnStrokeCompletedEvent
      if (e.eventType === 'TPS.Simulator.ShotFinish' || e.eventType.includes('ShotFinish')) {
        // Find the most recent OnStrokeCompletedEvent before this event
        // NOTE: Newest events are at index 0, so we search FORWARD (increasing indices) to find older events
        const currentIndex = eventsList.findIndex(evt => evt === e);
        let strokeCompletedMeasurement: any = {};
        
        console.log('[ShotFinish] Current event index:', currentIndex);
        console.log('[ShotFinish] Events list length:', eventsList.length);
        
        // Search forward from current event (toward older events at higher indices)
        for (let i = currentIndex + 1; i < eventsList.length; i++) {
          const prevEvent = eventsList[i];
          console.log(`[ShotFinish] Checking event at index ${i}:`, prevEvent.eventType);
          
          if (prevEvent.eventType === 'TPS.Live.OnStrokeCompletedEvent' || 
              prevEvent.eventType.includes('StrokeCompleted')) {
            console.log('[ShotFinish] Found matching OnStrokeCompletedEvent at index:', i);
            const prevPayload = getEventModelPayload(prevEvent);
            console.log('[ShotFinish] Previous payload:', prevPayload);
            
            if (prevPayload && prevPayload.Measurement) {
              console.log('[ShotFinish] Found measurement with keys:', Object.keys(prevPayload.Measurement));
              strokeCompletedMeasurement = { ...prevPayload.Measurement };
              break;
            } else {
              console.log('[ShotFinish] No Measurement found in payload');
            }
          }
        }

        console.log('[ShotFinish] Final measurement before adding Actuals:', Object.keys(strokeCompletedMeasurement));
        
        // Add the "Actual" fields from ShotFinish
        if (payload.Carry !== undefined && payload.Carry !== null) {
          strokeCompletedMeasurement.CarryActual = payload.Carry;
        }
        if (payload.Total !== undefined && payload.Total !== null) {
          strokeCompletedMeasurement.TotalActual = payload.Total;
        }
        if (payload.Curve !== undefined && payload.Curve !== null) {
          strokeCompletedMeasurement.CurveActual = payload.Curve;
        }
        if (payload.Side !== undefined && payload.Side !== null) {
          strokeCompletedMeasurement.SideActual = payload.Side;
        }
        if (payload.SideTotal !== undefined && payload.SideTotal !== null) {
          strokeCompletedMeasurement.SideTotalActual = payload.SideTotal;
        }
        
        // Add position fields for trajectory visualization
        if (payload.StartingPosition) {
          strokeCompletedMeasurement.StartingPosition = payload.StartingPosition;
        }
        if (payload.FinishingPosition) {
          strokeCompletedMeasurement.FinishingPosition = payload.FinishingPosition;
        }
        
        console.log('[ShotFinish] Final merged measurement keys:', Object.keys(strokeCompletedMeasurement));
        
        return {
          measurement: strokeCompletedMeasurement,
          playerId: payload.PlayerId
        };
      }
      
      return null;
    } catch (err) {
      return null;
    }
  };

  /**
   * Find the most recent ChangePlayer event before the given event in the same ActivitySession.
   * This allows us to display hole/shot info for all events between ChangePlayer events.
   */
  const findRecentChangePlayerData = (event: EventItem, eventsList: EventItem[]) => {
    try {
      const { activitySessionId } = getSessionIds(event);
      if (!activitySessionId) return null;

      // First check if this event itself has the data
      const payload = getEventModelPayload(event);
      if (payload?.ActiveHole !== undefined && payload?.ShotNumber !== undefined) {
        return {
          hole: payload.ActiveHole,
          shot: payload.ShotNumber + 1, // Convert to 1-indexed
          playerName: payload.Name
        };
      }

      // Find current event index
      const currentIdx = eventsList.findIndex(e => e.id === event.id);
      if (currentIdx === -1) return null;

      // Search forward (to older events) for the most recent ChangePlayer in the same session
      for (let i = currentIdx + 1; i < eventsList.length; i++) {
        const prevEvent = eventsList[i];
        const { activitySessionId: prevSessionId } = getSessionIds(prevEvent);
        
        // Only look at events in the same ActivitySession
        if (prevSessionId !== activitySessionId) continue;
        
        if (prevEvent.eventType === 'TPS.Simulator.ChangePlayer') {
          const prevPayload = getEventModelPayload(prevEvent);
          if (prevPayload?.ActiveHole !== undefined && prevPayload?.ShotNumber !== undefined) {
            return {
              hole: prevPayload.ActiveHole,
              shot: prevPayload.ShotNumber + 1, // Convert to 1-indexed
              playerName: prevPayload.Name
            };
          }
        }
      }

      return null;
    } catch (err) {
      return null;
    }
  };

  /**
   * Find all ShotFinish events for the given hole in the same ActivitySession,
   * up to and including the current event (for progressive display).
   * Returns an array of shots with start/finish positions and shot numbers.
   */
  const findAllShotsForHole = (event: EventItem, eventsList: EventItem[], holeNumber: number) => {
    try {
      const { activitySessionId } = getSessionIds(event);
      if (!activitySessionId) return [];

      const shots: Array<{ startPosition: any; finishPosition: any; shotNumber?: number }> = [];
      
      // Find the index of the current event
      const currentIdx = eventsList.findIndex(e => e.id === event.id);
      if (currentIdx === -1) return [];
      
      // Search from the current event forward (toward older events at higher indices)
      // This way we only show shots that happened at or before the current event
      for (let i = currentIdx; i < eventsList.length; i++) {
        const evt = eventsList[i];
        const { activitySessionId: evtSessionId } = getSessionIds(evt);
        
        // Only look at events in the same ActivitySession
        if (evtSessionId !== activitySessionId) continue;
        
        // Check if this is a ShotFinish event
        if (evt.eventType === 'TPS.Simulator.ShotFinish') {
          const payload = getEventModelPayload(evt);
          
          // Check if it's for the correct hole
          const eventHole = payload?.ActiveHole;
          if (eventHole === holeNumber) {
            const startPos = payload?.StartingPosition;
            const finishPos = payload?.FinishingPosition;
            
            // Only include if we have both positions
            if (startPos && finishPos) {
              // Try to find the shot number from nearby ChangePlayer events
              const changePlayerData = findRecentChangePlayerData(evt, eventsList);
              shots.push({
                startPosition: startPos,
                finishPosition: finishPos,
                shotNumber: changePlayerData?.shot
              });
            }
          }
        }
      }
      
      // Sort by shot number ascending (if available)
      // Shots without numbers go to the end
      shots.sort((a, b) => {
        if (a.shotNumber !== undefined && b.shotNumber !== undefined) {
          return a.shotNumber - b.shotNumber;
        }
        if (a.shotNumber !== undefined) return -1;
        if (b.shotNumber !== undefined) return 1;
        return 0;
      });
      
      console.log(`[findAllShotsForHole] Found ${shots.length} shots for hole ${holeNumber}`);
      
      return shots;
    } catch (err) {
      console.error('[WebhookInspector] Error finding shots for hole:', err);
      return [];
    }
  };

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
            <div className="preview-header">
              <h4 className="preview-title">{selectedEvent.eventType}</h4>
              <div className="preview-time">{new Date(selectedEvent.timestamp).toLocaleString()}</div>
            </div>
            {/* Display course information if available for this activity session */}
            {(() => {
              const { activitySessionId } = getSessionIds(selectedEvent);
              if (activitySessionId) {
                const sessionData = getSessionData(activitySessionId);
                if (sessionData && (sessionData.courseInfo || sessionData.isLoadingCourse)) {
                  // Find the most recent ChangePlayer data for this event
                  const changePlayerData = findRecentChangePlayerData(selectedEvent, allEvents);
                  
                  // Find all shots for the current hole
                  const shots: ShotData[] = changePlayerData?.hole 
                    ? findAllShotsForHole(selectedEvent, allEvents, changePlayerData.hole)
                    : [];
                  
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
              if (isMeasurementEvent(selectedEvent)) {
                const measurementData = getMeasurementData(selectedEvent, allEvents);
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
