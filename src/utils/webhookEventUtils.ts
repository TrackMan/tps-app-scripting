import { EventItem, SessionIds } from '../types/webhookTypes';

/**
 * Extract session IDs (CustomerSession, ActivitySession, Device) from an event.
 */
export function getSessionIds(e: EventItem): SessionIds {
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
    
    // Extract Device.Id
    const deviceId = getDeviceIdFromEvent(e);
    
    return { customerSessionId, activitySessionId, deviceId };
  } catch (err) {
    return {};
  }
}

/**
 * Extract Device.Id from various locations in the event structure.
 */
export function getDeviceIdFromEvent(e: EventItem): string | undefined {
  try {
    const raw = e.raw as any;
    const data = e.data as any;
    
    // Check for Device.Id in various locations
    if (raw?.data?.Device?.Id) return raw.data.Device.Id;
    if (raw?.Device?.Id) return raw.Device.Id;
    if (data?.Device?.Id) return data.Device.Id;
    
    return undefined;
  } catch (err) {
    return undefined;
  }
}

/**
 * Extract the EventModel payload from an event.
 * Handles various envelope structures.
 */
export function getEventModelPayload(e: EventItem): any {
  try {
    // Common places where the EventModel might appear
    const maybe = (e.data ?? e.raw) as any;
    if (!maybe) return e.data ?? e.raw ?? {};
    
    // If envelope where data contains EventModel
    if (maybe.EventModel) return maybe.EventModel;
    
    // Some payloads might have data: { EventModel: {...} }
    if (maybe.data?.EventModel) return maybe.data.EventModel;
    
    // Some normalized records put typed payload under 'data' already
    if (e.data?.EventModel || e.data?.eventModel) {
      return e.data.EventModel ?? e.data.eventModel;
    }
    
    // Fallback to raw.data.EventModel
    if (e.raw?.data?.EventModel || e.raw?.data?.eventModel) {
      return e.raw.data.EventModel ?? e.raw.data.eventModel;
    }
    
    // Last resort: return the whole data/raw object
    return maybe;
  } catch (err) {
    return e.data ?? e.raw ?? {};
  }
}
