import { ScriptData, Activity, Step } from '../types';

export interface Bay {
  id: string;
  dbId: number;
  name: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface SidebarProps {
  script: ScriptData;
  selectedRef: { kind: 'script' } | { kind: 'activity'; activityId: string } | { kind: 'step'; activityId: string; stepId: string } | null;
  selectedNode: Activity | Step | null;
  isValid: boolean;
  validationErrors: string[];
  selectedFacilityId: string | null;
  selectedLocationId: string | null;
  persistedLocationId: string | null;
  selectedBayId: string | null;
  persistedBayId: string | null;
  selectedBayObj: Bay | null;
  onLoadScript: () => void;
  onDownloadScript: () => void;
  onLocationSelect: (location: Location | null) => void;
  onBaySelect: (bay: Bay | null) => void;
  onCloneSelected: () => void;
  onShowActivityDialog: () => void;
  onShowStepDialog: () => void;
  onSelectScript: () => void;
  onSelectActivity: (activityId: string) => void;
  onSelectStep: (activityId: string, stepId: string) => void;
  onDeleteActivity: (activityId: string) => void;
  onDeleteStep: (activityId: string, stepId: string) => void;
  parentActivityForAdd: Activity | undefined;
}
