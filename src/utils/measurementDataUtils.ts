import { EventItem } from '../types/webhookTypes';
import { getSessionIds, getEventModelPayload } from './webhookEventUtils';

/**
 * Check if an event contains measurement data.
 */
export function isMeasurementEvent(e: EventItem): boolean {
  return (
    e.eventType === 'TPS.Simulator.OnStrokeCompletedEvent' ||
    e.eventType === 'TPS.Simulator.ShotStarting' ||
    e.eventType === 'TPS.Simulator.ShotFinish'
  );
}

/**
 * Extract measurement data from an event.
 * For ShotFinish events, searches backward through event history to merge with
 * corresponding OnStrokeCompletedEvent data.
 * 
 * @param event - The event to extract measurement data from
 * @param eventsList - Full event list for searching (used by ShotFinish)
 * @returns Measurement data object or null if not available
 */
export function getMeasurementData(event: EventItem, eventsList: EventItem[]) {
  try {
    const payload = getEventModelPayload(event);
    if (!payload) return null;

    // For OnStrokeCompletedEvent: use Measurement directly
    if (event.eventType === 'TPS.Simulator.OnStrokeCompletedEvent') {
      console.log('[getMeasurementData] OnStrokeCompletedEvent measurement:', payload.Measurement);
      return payload.Measurement;
    }

    // For ShotStarting: use Measurement directly
    if (event.eventType === 'TPS.Simulator.ShotStarting') {
      console.log('[getMeasurementData] ShotStarting measurement:', payload.Measurement);
      return payload.Measurement;
    }

    // For ShotFinish: merge with previous OnStrokeCompletedEvent
    if (event.eventType === 'TPS.Simulator.ShotFinish') {
      console.log('[getMeasurementData] Processing ShotFinish...');
      
      const { deviceId: thisDeviceId } = getSessionIds(event);
      if (!thisDeviceId) {
        console.log('[getMeasurementData] No device ID found');
        return null;
      }

      // Find this event's index
      const currentIdx = eventsList.findIndex(e => e.id === event.id);
      if (currentIdx === -1) {
        console.log('[getMeasurementData] Could not find current event in list');
        return null;
      }

      console.log(`[getMeasurementData] Current event at index ${currentIdx}`);

      // Search forward (to older events at higher indices) for the most recent OnStrokeCompletedEvent
      // from the same device
      for (let i = currentIdx + 1; i < eventsList.length; i++) {
        const prevEvent = eventsList[i];
        
        if (prevEvent.eventType === 'TPS.Simulator.OnStrokeCompletedEvent') {
          const { deviceId: prevDeviceId } = getSessionIds(prevEvent);
          
          if (prevDeviceId === thisDeviceId) {
            console.log(`[getMeasurementData] Found matching OnStrokeCompletedEvent at index ${i}`);
            const prevPayload = getEventModelPayload(prevEvent);
            const measurement = prevPayload?.Measurement;
            
            if (measurement) {
              // Merge the Actual values from ShotFinish
              const merged = {
                ...measurement,
                CarryActual: payload.Actual?.Carry ?? measurement.CarryActual,
                TotalActual: payload.Actual?.Total ?? measurement.TotalActual,
                OfflineActual: payload.Actual?.Offline ?? measurement.OfflineActual,
                LaunchDirectionActual: payload.Actual?.LaunchDirection ?? measurement.LaunchDirectionActual,
                StartingPosition: payload.StartingPosition,
                FinishingPosition: payload.FinishingPosition
              };
              
              console.log('[getMeasurementData] Merged measurement:', merged);
              return merged;
            }
          }
        }
      }
      
      console.log('[getMeasurementData] No matching OnStrokeCompletedEvent found');
    }

    return null;
  } catch (err) {
    console.error('[getMeasurementData] Error:', err);
    return null;
  }
}

/**
 * Find recent ChangePlayer data to determine hole and shot number context.
 * Searches backward through event history in the same ActivitySession.
 * 
 * @param event - The event to find context for
 * @param eventsList - Full event list for searching
 * @returns Object with hole, shot, and playerName or null
 */
export function findRecentChangePlayerData(event: EventItem, eventsList: EventItem[]) {
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
}

/**
 * Find all ShotFinish events for the given hole in the same ActivitySession,
 * up to and including the current event (for progressive display).
 * Returns an array of shots with start/finish positions and shot numbers.
 * 
 * @param event - The current event (defines the time boundary)
 * @param eventsList - Full event list for searching
 * @param holeNumber - The hole number to filter by
 * @returns Array of shot objects with positions and shot numbers
 */
export function findAllShotsForHole(
  event: EventItem, 
  eventsList: EventItem[], 
  holeNumber: number
) {
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
    console.error('[findAllShotsForHole] Error:', err);
    return [];
  }
}
