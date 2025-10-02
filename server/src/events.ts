// Strongly-typed event interfaces and lightweight runtime type-guards

// AppScripting.Status event
export interface AppScriptingStatusEvent {
  Id: string;
  Event: string;
}

// TPS.SessionInfo event
export interface Player {
  Id: string;
  Name: string;
  IsGuest: boolean;
  Picture?: string;
}

export enum ActivityType {
  Course = 'Course',
  TPS = 'TPS',
  Other = 'Other'
}

export enum ActivitySubType {
  VirtualGolf3 = 'VirtualGolf3',
  ShotAnalysis = 'ShotAnalysis',
  Other = 'Other'
}

export interface Activity {
  Type: ActivityType | string;
  SubType: ActivitySubType | string;
  Identifier: string;
  Properties?: {
    Resolution?: {
      Width: number;
      Height: number;
      Scale: number;
    };
    Course?: string;
    CourseVersion?: string;
    Client?: string;
    Version?: string;
    GraphicsQuality?: string;
    [key: string]: any; // Allow additional properties
  };
  Id: string;
  Timestamp: string;
}

export interface SessionInfoEvent {
  Id: string;
  Status: string;
  Timestamp: string;
  Players: Player[];
  Activity?: Activity;
  Language: string;
  IsLocked: boolean;
}

// TPS.StartActivity / TPS.EndActivity event
export interface ActivityEvent {
  Name: string;
  Description?: string;
  ImageUrl?: string;
  Kind: string;
}

// TPS.Live.OnStrokeConditionChanged event (empty model)
export interface StrokeConditionChangedEvent {
  // EventModel is empty for this event type
}

// Base event - most simulator events have these common fields
export interface BaseEvent {
  GameId: string;
  ActiveHole: number;
}

export interface ChangePlayerEvent extends BaseEvent {
  Name: string;
  Id: string;
  ShotNumber: number;
}

export interface GimmeReport {
  HoleId: number;
  PlayerId: string;
  PlayerName: string;
}

export interface GivenGimmeEvent extends BaseEvent {
  Gimme: GimmeReport;
}

export interface PickupReport {
  HoleId: number;
  PlayerId: string;
  PlayerName: string;
}

export interface PlayerPickupEvent extends BaseEvent {
  PickUp: PickupReport;
}

export interface MulliganReport {
  HoleId: number;
  PlayerId: string;
  PlayerName: string;
}

export interface GivenMulliganEvent extends BaseEvent {
  Mulligan: MulliganReport;
}

export interface Vector3 {
  X: number;
  Y: number;
  Z: number;
}

export interface ShotStartingEvent extends BaseEvent {
  PlayerId: string;
  StartingLie: string;
  StartingPosition: Vector3;
  StartingDistanceToPin?: number | null;
  BallSpeed: number;
  LaunchAngle: number;
  LaunchDirection: number;
}

export interface ShotFinishEvent extends BaseEvent {
  PlayerId: string;
  StartingLie?: string;
  StartingPosition?: Vector3;
  StartingDistanceToPin?: number | null;
  FinishingLie?: string;
  FinishingPosition?: Vector3;
  FinishingDistanceToPin?: number | null;
  Carry?: number | null;
  Total?: number | null;
  Curve?: number | null;
  Side?: number | null;
  SideTotal?: number | null;
  ClubSpeed?: number | null;
  ClubPath?: number | null;
  FaceAngle?: number | null;
  FaceToPath?: number | null;
  AttackAngle?: number | null;
  LaunchAngle?: number | null;
  BallSpeed?: number | null;
  SmashFactor?: number | null;
  ImpactHeight?: number | null;
  ImpactOffset?: number | null;
}

export type KnownEventPayload =
  | AppScriptingStatusEvent
  | SessionInfoEvent
  | ActivityEvent
  | StrokeConditionChangedEvent
  | ChangePlayerEvent
  | GivenGimmeEvent
  | PlayerPickupEvent
  | GivenMulliganEvent
  | ShotStartingEvent
  | ShotFinishEvent;

// Additional real-world event shapes
export interface ChangeClubEvent extends BaseEvent {
  ClubName: string;
}

export interface Shot {
  Idx: number;
  MeasurementId: string;
  Club: string;
  Launch?: {
    Lie?: string;
    Position?: any;
    AimPoint?: any;
    BallSpeed?: number;
    LaunchAngle?: number;
    LaunchDirection?: number;
    SpinRate?: number;
    SpinAxis?: number;
    Time?: string;
  };
  Final?: {
    Lie?: string;
    Position?: any;
    Result?: string;
    ShotsToAdd?: number;
    DropPosition?: any;
    Time?: string;
  };
  VgData?: any;
}

export interface RecordedHole {
  Id: string;
  Kind: string;
  ScorecardId: string;
  Hole: {
    Number: number;
    StrokeIndex: number;
    Par: number;
    Distance: number;
    Tee: string;
  };
  Players: Array<{
    Id: string;
    Name: string;
    Hcp: number;
    IsGhost: boolean;
    Gender: string;
  }>;
  LongestDriveResults?: any[];
  CoursePlayHoleResult?: any;
  Shots: Shot[];
  StartedAt: string;
  FinishedAt: string;
}

export interface HoleCompletedEvent extends BaseEvent {
  RecordedHole: RecordedHole;
}

export interface TeeInfo {
  Name: string;
  Slope: number;
  Rating: number;
  Par: number;
  Distance: number;
  Gender: string;
  Holes: Array<{
    HoleNumber: number;
    StrokeIndex: number;
    Par: number;
    Distance: number;
    Position: any;
  }>;
}

export interface ScorecardEvent {
  Scorecard: {
    GameId: string;
    Kind: string;
    Tees: TeeInfo[];
    Pins: any[];
    GameSettings: any;
    CourseSettings: any;
    Players: any[];
    Teams: any[];
  };
}

export interface TrajectorySegment {
  Kind: string;
  XFit: number[];
  YFit: number[];
  ZFit: number[];
  SpinRateFit?: number[];
  TimeInterval: number[];
}

export interface Measurement {
  Id: string;
  Time: string;
  Kind: string;
  TeePosition?: number[];
  PlayerDexterity?: string;
  DynamicLie?: number;
  ImpactOffset?: number;
  ImpactHeight?: number;
  AttackAngle?: number;
  LaunchDirection?: number;
  BallSpeed?: number;
  ClubPath?: number;
  ClubSpeed?: number;
  DynamicLoft?: number;
  FaceAngle?: number;
  FaceToPath?: number;
  LaunchAngle?: number;
  SmashFactor?: number;
  SpinAxis?: number;
  SpinLoft?: number;
  SpinRate?: number;
  SwingDirection?: number;
  SwingPlane?: number;
  SwingRadius?: number;
  DPlaneTilt?: number;
  LowPointDistance?: number;
  LowPointHeight?: number;
  LowPointSide?: number;
  MaxHeight?: number;
  Carry?: number;
  Total?: number;
  CarrySide?: number;
  TotalSide?: number;
  LandingAngle?: number;
  HangTime?: number;
  LastData?: number;
  Curve?: number;
  BallTrajectory?: TrajectorySegment[];
  ClubTrajectory?: TrajectorySegment[];
  TargetPosition?: number[];
  InvalidNoTarget?: string[];
  Simulated?: boolean;
  [key: string]: any; // Allow additional fields
}

export interface StrokeCompletedEvent {
  PlayerId: string;
  Measurement: Measurement;
}

export type KnownEventPayloadExtended = KnownEventPayload | ChangeClubEvent | HoleCompletedEvent | ScorecardEvent | StrokeCompletedEvent;

// Common metadata present on many events
export interface FacilityRef { Id?: string; Name?: string }
export interface LocationRef { Id?: string; Name?: string }
export interface BayRef { Id?: string; Name?: string }
export interface ClientInfo { Name?: string; Properties?: Record<string, any> }
export interface DeviceRef { Id?: string }
export interface RadarInfo { Properties?: { Model?: string; Serial?: string; Firmware?: string } }
export interface UserRef { Id?: string; Name?: string }
export interface SessionRef { Id?: string }

export interface CommonEventData {
  Facility?: FacilityRef;
  Location?: LocationRef;
  Bay?: BayRef;
  Client?: ClientInfo;
  Device?: DeviceRef;
  Radar?: RadarInfo;
  User?: UserRef;
  CustomerSession?: SessionRef;
  ActivitySession?: SessionRef;
}

// Lightweight type guards
export function isObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function hasString(o: any, k: string): boolean {
  return isObject(o) && typeof o[k] === 'string' && o[k].length > 0;
}
export function hasNumber(o: any, k: string): boolean {
  return isObject(o) && typeof o[k] === 'number' && !isNaN(o[k]);
}

export function isChangePlayer(o: any): o is ChangePlayerEvent {
  const m = getEventModel(o);
  return (
    isObject(m) &&
    hasString(m, 'GameId') &&
    (hasNumber(m, 'Hole') || hasNumber(m, 'ActiveHole')) &&
    hasString(m, 'Name') &&
    hasString(m, 'Id') &&
    hasNumber(m, 'ShotNumber')
  );
}

export function isGivenGimme(o: any): o is GivenGimmeEvent {
  const m = getEventModel(o);
  return (
    isObject(m) &&
    hasString(m, 'GameId') &&
    (hasNumber(m, 'Hole') || hasNumber(m, 'ActiveHole')) &&
    isObject(m.Gimme) &&
    hasNumber(m.Gimme, 'HoleId') &&
    hasString(m.Gimme, 'PlayerId') &&
    hasString(m.Gimme, 'PlayerName')
  );
}

export function isPlayerPickup(o: any): o is PlayerPickupEvent {
  const m = getEventModel(o);
  return (
    isObject(m) &&
    hasString(m, 'GameId') &&
    (hasNumber(m, 'Hole') || hasNumber(m, 'ActiveHole')) &&
    isObject(m.PickUp) &&
    hasNumber(m.PickUp, 'HoleId') &&
    hasString(m.PickUp, 'PlayerId') &&
    hasString(m.PickUp, 'PlayerName')
  );
}

export function isGivenMulligan(o: any): o is GivenMulliganEvent {
  const m = getEventModel(o);
  return (
    isObject(m) &&
    hasString(m, 'GameId') &&
    (hasNumber(m, 'Hole') || hasNumber(m, 'ActiveHole')) &&
    isObject(m.Mulligan) &&
    hasNumber(m.Mulligan, 'HoleId') &&
    hasString(m.Mulligan, 'PlayerId') &&
    hasString(m.Mulligan, 'PlayerName')
  );
}

export function isVector3(o: any): o is Vector3 {
  return isObject(o) && hasNumber(o, 'X') && hasNumber(o, 'Y') && hasNumber(o, 'Z');
}

export function isShotStarting(o: any): o is ShotStartingEvent {
  const m = getEventModel(o);
  // Real-world events may omit detailed telemetry; require minimal identifying fields
  return (
    isObject(m) &&
    hasString(m, 'GameId') &&
    (hasNumber(m, 'Hole') || hasNumber(m, 'ActiveHole')) &&
    hasString(m, 'PlayerId')
  );
}

export function isShotFinish(o: any): o is ShotFinishEvent {
  const m = getEventModel(o);
  // ShotFinish has additional fields like FinishingLie, Carry, Total, etc. that ShotStarting doesn't have
  return (
    isObject(m) &&
    hasString(m, 'GameId') &&
    (hasNumber(m, 'Hole') || hasNumber(m, 'ActiveHole')) &&
    hasString(m, 'PlayerId') &&
    // Check for at least one ShotFinish-specific field
    (hasString(m, 'FinishingLie') || hasNumber(m, 'Carry') || hasNumber(m, 'Total') || hasNumber(m, 'ClubSpeed'))
  );
}

// Helper: if event is an EventGrid envelope with data.EventModel, prefer that model for shape checks
export function getEventModel(o: any): any {
  if (!isObject(o)) return o;
  if (isObject(o.data) && isObject(o.data.EventModel)) return o.data.EventModel;
  // Some envelopes put the model directly under EventModel (without wrapping)
  if (isObject(o.EventModel)) return o.EventModel;
  return o;
}

// AppScripting.Status (envelope includes EventModel inside data)
export function isAppScriptingStatus(o: any): boolean {
  return isObject(o) && isObject(o.data) && isObject(o.data.EventModel) && (hasString(o.data.EventModel, 'Event') || hasString(o.data.EventModel, 'Id'));
}

// TPS.SessionInfo (contains EventModel with Players array)
export function isSessionInfo(o: any): boolean {
  return isObject(o) && isObject(o.data) && isObject(o.data.EventModel) && Array.isArray(o.data.EventModel.Players);
}

// TPS.StartActivity / TPS.EndActivity (EventModel with Kind/Name)
export function isActivityEvent(o: any): boolean {
  return isObject(o) && isObject(o.data) && isObject(o.data.EventModel) && (hasString(o.data.EventModel, 'Kind') || hasString(o.data.EventModel, 'Name'));
}

// TPS.Live.OnStrokeConditionChanged (may be an envelope with empty EventModel but still valid)
export function isStrokeConditionChanged(o: any): boolean {
  return isObject(o) && isObject(o.data) && Object.prototype.hasOwnProperty.call(o.data, 'Facility') && typeof o.eventType === 'string' && o.eventType.indexOf('OnStrokeConditionChanged') !== -1;
}

export function extractCommon(ev: any): CommonEventData | undefined {
  try {
    const src = ev && ev.data ? ev.data : ev;
    if (!isObject(src)) return undefined;
    const out: CommonEventData = {};
    if (isObject(src.Facility)) out.Facility = { Id: src.Facility.Id, Name: src.Facility.Name };
    if (isObject(src.Location)) out.Location = { Id: src.Location.Id, Name: src.Location.Name };
    if (isObject(src.Bay)) out.Bay = { Id: src.Bay.Id, Name: src.Bay.Name };
    if (isObject(src.Client)) out.Client = { Name: src.Client.Name, Properties: src.Client.Properties };
    if (isObject(src.Device)) out.Device = { Id: src.Device.Id };
    if (isObject(src.Radar)) out.Radar = { Properties: src.Radar.Properties };
    if (isObject(src.User)) out.User = { Id: src.User.Id, Name: src.User.Name };
    if (isObject(src.CustomerSession)) out.CustomerSession = { Id: src.CustomerSession.Id };
    if (isObject(src.ActivitySession)) out.ActivitySession = { Id: src.ActivitySession.Id };
    return out;
  } catch (err) {
    return undefined;
  }
}

export function classifyEventPayload(ev: any): { name?: string; typed?: KnownEventPayloadExtended | null; common?: CommonEventData } {
  try {
    // If this is an EventGrid-style envelope (array), try each element
    if (Array.isArray(ev)) {
      for (const item of ev) {
        const r = classifyEventPayload(item);
        if (r && r.typed) return r;
      }
      return {};
    }

    if (!isObject(ev)) return {};
    if (ev.eventType && typeof ev.eventType === 'string') {
      const et = ev.eventType;
      switch (et) {
        case 'TPS.Simulator.ChangePlayer':
          if (isChangePlayer(ev)) return { name: et, typed: getEventModel(ev), common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.GivenGimme':
          if (isGivenGimme(ev)) return { name: et, typed: getEventModel(ev), common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.PlayerPickup':
          if (isPlayerPickup(ev)) return { name: et, typed: getEventModel(ev), common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.GivenMulligan':
          if (isGivenMulligan(ev)) return { name: et, typed: getEventModel(ev), common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.ShotStarting':
          if (isShotStarting(ev)) return { name: et, typed: getEventModel(ev), common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.ShotFinish':
          if (isShotFinish(ev)) return { name: et, typed: getEventModel(ev), common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.ChangeClub':
          if (isObject(ev.data) && isObject(ev.data.EventModel) && hasString(ev.data.EventModel, 'ClubName')) return { name: et, typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.HoleCompleted':
          if (isObject(ev.data) && isObject(ev.data.EventModel) && isObject(ev.data.EventModel.RecordedHole)) return { name: et, typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'TPS.Simulator.Scorecard':
          if (isObject(ev.data) && isObject(ev.data.EventModel) && isObject(ev.data.EventModel.Scorecard)) return { name: et, typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'TPS.Live.OnStrokeCompletedEvent':
          if (isObject(ev.data) && isObject(ev.data.EventModel) && isObject(ev.data.EventModel.Measurement)) return { name: et, typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'AppScripting.Status':
          if (isAppScriptingStatus(ev) && isObject(ev.data) && isObject(ev.data.EventModel)) return { name: 'AppScripting.Status', typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'TPS.SessionInfo':
          if (isSessionInfo(ev) && isObject(ev.data) && isObject(ev.data.EventModel)) return { name: 'TPS.SessionInfo', typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'TPS.EndActivity':
        case 'TPS.StartActivity':
          if (isActivityEvent(ev) && isObject(ev.data) && isObject(ev.data.EventModel)) return { name: et, typed: ev.data.EventModel, common: extractCommon(ev) };
          break;
        case 'TPS.Live.OnStrokeConditionChanged':
          if (isStrokeConditionChanged(ev)) return { name: et, typed: {}, common: extractCommon(ev) };
          break;
      }
    }

    // Fallback: try to infer from body shape
    if (isChangePlayer(ev)) return { name: 'TPS.Simulator.ChangePlayer', typed: getEventModel(ev), common: extractCommon(ev) };
    if (isGivenGimme(ev)) return { name: 'TPS.Simulator.GivenGimme', typed: getEventModel(ev), common: extractCommon(ev) };
    if (isPlayerPickup(ev)) return { name: 'TPS.Simulator.PlayerPickup', typed: getEventModel(ev), common: extractCommon(ev) };
    if (isGivenMulligan(ev)) return { name: 'TPS.Simulator.GivenMulligan', typed: getEventModel(ev), common: extractCommon(ev) };
    if (isShotStarting(ev)) return { name: 'TPS.Simulator.ShotStarting', typed: getEventModel(ev), common: extractCommon(ev) };
    if (isShotFinish(ev)) return { name: 'TPS.Simulator.ShotFinish', typed: getEventModel(ev), common: extractCommon(ev) };
  } catch (err) {
    // ignore
  }
  return {};
}

export default {
  // Type guards for event models
  isChangePlayer,
  isGivenGimme,
  isPlayerPickup,
  isGivenMulligan,
  isShotStarting,
  isShotFinish,
  isAppScriptingStatus,
  isSessionInfo,
  isActivityEvent,
  isStrokeConditionChanged,
  // Helper functions
  getEventModel,
  extractCommon,
  classifyEventPayload,
};
