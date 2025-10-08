export type EventItem = {
  id?: string;
  eventType: string;
  timestamp: string;
  data?: any;
  raw?: any;
  expanded?: boolean;
};

export interface WebhookInspectorProps {
  userPath: string;
  selectedDeviceId?: string | null;
  selectedBayId?: string | null;
  clearSignal?: number;
}

export interface SessionIds {
  customerSessionId?: string;
  activitySessionId?: string;
  deviceId?: string;
}
