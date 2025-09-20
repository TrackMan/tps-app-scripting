// Domain type definitions for script authoring - matches schema/1.0.0/app-scripting.schema.json

// ===== ENUMS =====

export type StartMode = 'Append' | 'Overwrite';
export type EndMode = 'Wait' | 'Exit';
export type ConditionType = '' | 'And' | 'Or';

// Club codes as defined in schema
export type ClubCode = 
  | 'None'
  | 'Drv'
  | '_2W' | '_3W' | '_4W' | '_5W' | '_6W' | '_7W' | '_8W' | '_9W'  // Woods
  | '_1H' | '_2H' | '_3H' | '_4H' | '_5H' | '_6H' | '_7H' | '_8H' | '_9H'  // Hybrids
  | '_1I' | '_2I' | '_3I' | '_4I' | '_5I' | '_6I' | '_7I' | '_8I' | '_9I'  // Irons
  | '_PW' | '_SW' | '_LW' | '_50W' | '_52W' | '_54W' | '_56W' | '_58W' | '_60W'  // Wedges
  | 'Putt';  // Putter

// Shot parameters for conditions and UI
export type ParameterName = 
  // Club metrics
  | 'ClubSpeed' | 'AttackAngle' | 'ClubPath' | 'DynamicLoft' | 'FaceAngle'
  | 'DynamicLie' | 'ImpactHeight' | 'SpinLoft' | 'FaceToPath' | 'SwingPlane'
  | 'SwingDirection' | 'LowPoint' | 'ImpactOffset'
  // Ball flight
  | 'Curve' | 'Height' | 'Carry' | 'Total' | 'Side' | 'SideTotal'
  | 'LandingAngle' | 'FromPin' | 'BallSpeed' | 'SmashFactor'
  | 'LaunchAngle' | 'LaunchDirection' | 'SpinRate' | 'SpinAxis'
  // Performance
  | 'StrokesGained';

// UI Frame names
export type UIFrameName = 
  | 'Player' | 'Markers' | 'Tiles' | 'ShotList' | 'GoToSetup' | 'Minimap'
  | 'BroadcastTiles' | 'ClubDelivery' | 'AllTiles' | 'LandingCamera'
  | 'StrokesGainedSummaryTile' | 'StrokesGainedShotResult' | 'TargetCarry';

// Player categories
export type PlayerCategory = 'Handicap' | 'PGA' | 'LPGA';
export type Gender = 'Male' | 'Female' | 'Unspecified';

// ===== CORE INTERFACES =====

export interface Message {
  header: string;
  description?: string;
  seconds: number;  // -1 means user must click to dismiss
}

export interface ParameterCondition {
  parameter: ParameterName;
  min?: number;  // inclusive, units: meters for distance, m/s for speed, degrees for angles
  max?: number;  // inclusive, units: meters for distance, m/s for speed, degrees for angles
}

// ===== SETUP TYPES =====

export interface RangeAnalysisScriptedSetup {
  nodeType: 'RangeAnalysisScriptedSetup';
  club?: ClubCode;  // defaults to 'Drv'
  distance: number;  // required, in meters
}

export interface PerformanceCenterTeeShotsScriptedSetup {
  nodeType: 'PerformanceCenterTeeShotsScriptedSetup';
  hole?: number;  // defaults to -1 (random)
  playerCategory?: PlayerCategory;  // defaults to 'Handicap'
  hcp?: number;  // required when playerCategory is 'Handicap'
  gender?: Gender;  // defaults to 'Unspecified'
  courseDistance?: number;  // defaults to 6900, range 1000-9000 meters
  club?: ClubCode;  // defaults to 'Drv'
}

export interface PerformanceCenterApproachScriptedSetup {
  nodeType: 'PerformanceCenterApproachScriptedSetup';
  hole?: number;  // defaults to -1 (random)
  pin?: number;  // defaults to -1 (random)
  playerCategory?: PlayerCategory;  // defaults to 'Handicap'
  hcp?: number;  // required when playerCategory is 'Handicap'
  gender?: Gender;  // defaults to 'Unspecified'
  minDistance?: number;  // defaults to 30 meters
  maxDistance?: number;  // defaults to 220 meters
  club?: ClubCode;  // defaults to 'Drv'
}

export type ScriptedSetup = 
  | RangeAnalysisScriptedSetup 
  | PerformanceCenterTeeShotsScriptedSetup 
  | PerformanceCenterApproachScriptedSetup;

// ===== CONDITION TYPES =====

export interface RangeAnalysisScriptedConditions {
  nodeType: 'RangeAnalysisScriptedConditions';
  shots?: number;  // defaults to 1
  conditionType?: ConditionType;  // defaults to 'And'
  conditions?: ParameterCondition[];
}

export interface PerformanceCenterScriptedConditions {
  nodeType: 'PerformanceCenterScriptedConditions';
  shots?: number;  // defaults to 1
  conditionType?: ConditionType;  // defaults to 'And'
  conditions?: ParameterCondition[];
}

export type ScriptedConditions = 
  | RangeAnalysisScriptedConditions 
  | PerformanceCenterScriptedConditions;

// ===== LOGIC TYPES =====

export interface RangeAnalysisScriptedLogic {
  nodeType: 'RangeAnalysisScriptedLogic';
  setup: RangeAnalysisScriptedSetup;
  successCondition?: RangeAnalysisScriptedConditions;
  failCondition?: RangeAnalysisScriptedConditions;
  canRetry?: boolean;  // defaults to false
  skipOnSuccess?: boolean;  // defaults to false
}

export interface PerformanceCenterScriptedLogic {
  nodeType: 'PerformanceCenterScriptedLogic';
  setup: PerformanceCenterTeeShotsScriptedSetup | PerformanceCenterApproachScriptedSetup;
  successCondition?: PerformanceCenterScriptedConditions;
  failCondition?: PerformanceCenterScriptedConditions;
  canRetry?: boolean;  // defaults to false
  skipOnSuccess?: boolean;  // defaults to false
}

export type ScriptedLogic = RangeAnalysisScriptedLogic | PerformanceCenterScriptedLogic;

// ===== UI TYPES =====

export interface UIFrameAction {
  addFrames?: UIFrameName[];  // defaults to []
  removeFrames?: UIFrameName[];  // defaults to []
  disableFrames?: UIFrameName[];  // defaults to []
}

export interface RangeAnalysisScriptedUI {
  nodeType: 'RangeAnalysisScriptedUI';
  targetAvailable?: boolean;  // defaults to true
  activeDataTiles?: ParameterName[];  // max 8 items, defaults to TPS settings
  shotListParameters?: ParameterName[];  // defaults to ['Total', 'Carry', 'BallSpeed']
  defaultShotListParameter?: ParameterName;  // defaults to 'Carry'
  beforeShot?: UIFrameAction;
  duringShot?: UIFrameAction;
  afterShot?: UIFrameAction;
}

export interface PerformanceCenterScriptedUI {
  nodeType: 'PerformanceCenterScriptedUI';
  targetAvailable?: boolean;  // defaults to true
  activeDataTiles?: ParameterName[];  // max 8 items, defaults to TPS settings
  shotListParameters?: ParameterName[];  // defaults to ['Total', 'Carry', 'BallSpeed']
  defaultShotListParameter?: ParameterName;  // defaults to 'Carry'
  beforeShot?: UIFrameAction;
  duringShot?: UIFrameAction;
  afterShot?: UIFrameAction;
}

export type ScriptedUI = RangeAnalysisScriptedUI | PerformanceCenterScriptedUI;

// ===== STEP TYPES =====

export interface RangeAnalysisScriptedStep {
  nodeType: 'RangeAnalysisScriptedStep';
  id?: string;  // optional unique identifier
  introMessage?: Message;
  successMessage?: Message;
  failMessage?: Message;
  greenTarget?: boolean;  // defaults to true
  targetWidthHCP?: number;  // optional, overrides formula, in meters
  targetWidthPro?: number;  // optional, overrides formula, in meters
  logic: RangeAnalysisScriptedLogic;
  ui?: RangeAnalysisScriptedUI;
}

export interface PerformanceCenterScriptedStep {
  nodeType: 'PerformanceCenterScriptedStep';
  id?: string;  // optional unique identifier
  introMessage?: Message;
  successMessage?: Message;
  failMessage?: Message;
  logic: PerformanceCenterScriptedLogic;
  ui?: PerformanceCenterScriptedUI;
}

export type ScriptedStep = RangeAnalysisScriptedStep | PerformanceCenterScriptedStep;

// ===== ACTIVITY TYPES =====

export interface RangeAnalysisScriptedActivity {
  nodeType: 'RangeAnalysisScriptedActivity';
  id?: string;  // optional unique identifier
  introMessage?: Message;
  endMessage?: Message;
  steps: RangeAnalysisScriptedStep[];
}

export interface PerformanceCenterScriptedActivity {
  nodeType: 'PerformanceCenterScriptedActivity';
  id?: string;  // optional unique identifier
  introMessage?: Message;
  endMessage?: Message;
  steps: PerformanceCenterScriptedStep[];
}

export type ScriptedActivity = RangeAnalysisScriptedActivity | PerformanceCenterScriptedActivity;

// ===== ROOT SCRIPT TYPE =====

export interface ScriptData {
  id?: string;  // optional, used for external event reporting
  startMode?: StartMode;  // defaults to 'Append'
  endMode?: EndMode;  // defaults to 'Wait'
  activities: ScriptedActivity[];
}

// ===== LEGACY COMPATIBILITY TYPES =====

// For backward compatibility with existing code
export type Activity = ScriptedActivity;
export type Step = ScriptedStep;
export type LogicNode = ScriptedLogic;
export type ConditionGroup = ScriptedConditions;

// ===== TYPE GUARDS =====

export function isRangeAnalysisActivity(activity: ScriptedActivity): activity is RangeAnalysisScriptedActivity {
  return activity.nodeType === 'RangeAnalysisScriptedActivity';
}

export function isPerformanceCenterActivity(activity: ScriptedActivity): activity is PerformanceCenterScriptedActivity {
  return activity.nodeType === 'PerformanceCenterScriptedActivity';
}

export function isRangeAnalysisStep(step: ScriptedStep): step is RangeAnalysisScriptedStep {
  return step.nodeType === 'RangeAnalysisScriptedStep';
}

export function isPerformanceCenterStep(step: ScriptedStep): step is PerformanceCenterScriptedStep {
  return step.nodeType === 'PerformanceCenterScriptedStep';
}

// Legacy type guards for backward compatibility
export function isActivity(node: any): node is Activity {
  return !!node && Array.isArray(node.steps);
}

export function isStep(node: any): node is Step {
  return !!node && !Array.isArray(node.steps) && !!node.logic;
}
