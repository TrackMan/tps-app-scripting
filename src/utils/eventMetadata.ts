// Event metadata for webhook events
// Maps technical event names to human-friendly names and descriptions

export interface EventMetadata {
  displayName: string;
  description: string;
}

export const EVENT_METADATA: Record<string, EventMetadata> = {
  // Simulator Events
  'TPS.Simulator.ChangePlayer': {
    displayName: 'Change Player',
    description: 'Player has been switched or changed in the simulator session',
  },
  'TPS.Simulator.HoleCompleted': {
    displayName: 'Hole Completed',
    description: 'Player has finished playing the current hole',
  },
  'TPS.Simulator.ShotStarting': {
    displayName: 'Shot Starting',
    description: 'A shot is about to be taken',
  },
  'TPS.Simulator.ShotFinish': {
    displayName: 'Shot Finished',
    description: 'Shot has been completed with final trajectory data',
  },
  'TPS.Simulator.SessionStarted': {
    displayName: 'Session Started',
    description: 'New simulator session has been initiated',
  },
  'TPS.Simulator.SessionEnded': {
    displayName: 'Session Ended',
    description: 'Simulator session has been terminated',
  },
  
  // Live Events
  'TPS.Live.OnStrokeCompletedEvent': {
    displayName: 'Stroke Completed',
    description: 'Ball strike has been detected and measured',
  },
  'TPS.Live.OnStrokeConditionChanged': {
    displayName: 'Stroke Condition Changed',
    description: 'Shot condition or state has been modified',
  },
  'TPS.Live.OnBallLandedEvent': {
    displayName: 'Ball Landed',
    description: 'Ball has landed and final position recorded',
  },
  'TPS.Live.OnCameraImageReceivedEvent': {
    displayName: 'Camera Image Received',
    description: 'Image captured from camera system',
  },
  
  // Session Events
  'TPS.SessionInfo': {
    displayName: 'Session Info',
    description: 'Session information and configuration data',
  },
  'TPS.SessionStarted': {
    displayName: 'Session Started',
    description: 'New practice or play session has begun',
  },
  'TPS.SessionEnded': {
    displayName: 'Session Ended',
    description: 'Session has been completed or terminated',
  },
  
  // Device Events
  'TPS.Device.Connected': {
    displayName: 'Device Connected',
    description: 'Device has successfully connected to the system',
  },
  'TPS.Device.Disconnected': {
    displayName: 'Device Disconnected',
    description: 'Device has been disconnected from the system',
  },
  'TPS.Device.StatusUpdate': {
    displayName: 'Device Status',
    description: 'Device status information has been updated',
  },
  
  // Club Events
  'TPS.ClubRecognized': {
    displayName: 'Club Recognized',
    description: 'Golf club type has been identified',
  },
  'TPS.ClubChanged': {
    displayName: 'Club Changed',
    description: 'Player has switched to a different club',
  },
  
  // Course Events
  'TPS.CourseLoaded': {
    displayName: 'Course Loaded',
    description: 'Golf course data has been loaded into the system',
  },
  'TPS.HoleChanged': {
    displayName: 'Hole Changed',
    description: 'Player has moved to a different hole',
  },
  
  // Error Events
  'TPS.Error': {
    displayName: 'Error',
    description: 'An error has occurred in the system',
  },
  'TPS.Warning': {
    displayName: 'Warning',
    description: 'A warning condition has been detected',
  },
};

/**
 * Get friendly display name for an event type
 * Falls back to original name if not found in metadata
 */
export function getEventDisplayName(eventType: string): string {
  return EVENT_METADATA[eventType]?.displayName || eventType;
}

/**
 * Get description for an event type
 * Returns null if not found
 */
export function getEventDescription(eventType: string): string | null {
  return EVENT_METADATA[eventType]?.description || null;
}

/**
 * Check if an event has metadata
 */
export function hasEventMetadata(eventType: string): boolean {
  return eventType in EVENT_METADATA;
}
