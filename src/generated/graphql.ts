import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Any: { input: any; output: any; }
  AnyWithJObject: { input: any; output: any; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  Decimal: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  IPv4: { input: any; output: any; }
  JSON: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
  Long: { input: any; output: any; }
  MacAddress: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
  NonNegativeFloat: { input: any; output: any; }
  NonNegativeInt: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  TimeSpan: { input: any; output: any; }
  URL: { input: any; output: any; }
  UUID: { input: any; output: any; }
  UnsignedLong: { input: any; output: any; }
  Upload: { input: File; output: File; }
  Url: { input: any; output: any; }
};

export type AcceptConsentError = DefaultError | MissingMandatoryFieldError;

export type AcceptConsentInput = {
  key: Scalars['String']['input'];
};

export type AcceptConsentPayload = {
  __typename?: 'AcceptConsentPayload';
  errors?: Maybe<Array<AcceptConsentError>>;
  userConsent?: Maybe<UserConsentItem>;
};

export type AcceptTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type AcceptTeamInput = {
  teamId: Scalars['ID']['input'];
};

export type AcceptTeamPayload = {
  __typename?: 'AcceptTeamPayload';
  errors?: Maybe<Array<AcceptTeamError>>;
  team?: Maybe<TeamInterface>;
};

export type ActiveConfigurationNotFoundError = BaseError & {
  __typename?: 'ActiveConfigurationNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  siteId?: Maybe<Scalars['String']['output']>;
};

/** The internal ActivityEvents for the RangeApp */
export type ActivityEvent = {
  __typename?: 'ActivityEvent';
  /** The events data as json. */
  eventData?: Maybe<Scalars['JSON']['output']>;
  /**
   * The events payload. This is of type Any so it's NOT strongly typed.
   * @deprecated Use eventData
   */
  payload?: Maybe<Scalars['AnyWithJObject']['output']>;
  /** The type of the payload */
  type?: Maybe<Scalars['String']['output']>;
};

export enum ActivityKind {
  Bowling = 'BOWLING',
  ClosestToThePin = 'CLOSEST_TO_THE_PIN',
  ClosestToThePinTournament = 'CLOSEST_TO_THE_PIN_TOURNAMENT',
  CombineTest = 'COMBINE_TEST',
  CoursePlay = 'COURSE_PLAY',
  CreatureCatch = 'CREATURE_CATCH',
  DynamicReport = 'DYNAMIC_REPORT',
  EventReport = 'EVENT_REPORT',
  LongestDriveTournament = 'LONGEST_DRIVE_TOURNAMENT',
  MagicPond = 'MAGIC_POND',
  MultiRoundTournament = 'MULTI_ROUND_TOURNAMENT',
  Note = 'NOTE',
  OnTheEdge = 'ON_THE_EDGE',
  OrderOfMeritTournament = 'ORDER_OF_MERIT_TOURNAMENT',
  Other = 'OTHER',
  PdfReport = 'PDF_REPORT',
  PerformanceCenter = 'PERFORMANCE_CENTER',
  PerformancePutting = 'PERFORMANCE_PUTTING',
  PuttPutt = 'PUTT_PUTT',
  RangeBullsEye = 'RANGE_BULLS_EYE',
  RangeCaptureTheFlag = 'RANGE_CAPTURE_THE_FLAG',
  RangeFindMyDistance = 'RANGE_FIND_MY_DISTANCE',
  RangeHitIt = 'RANGE_HIT_IT',
  RangePractice = 'RANGE_PRACTICE',
  ScrapYard = 'SCRAP_YARD',
  Screencast = 'SCREENCAST',
  Session = 'SESSION',
  ShotAnalysis = 'SHOT_ANALYSIS',
  Simulator = 'SIMULATOR',
  TargetPractice = 'TARGET_PRACTICE',
  Test = 'TEST',
  Tracy = 'TRACY',
  Video = 'VIDEO',
  VirtualGolfPlay = 'VIRTUAL_GOLF_PLAY',
  VirtualGolfPractice = 'VIRTUAL_GOLF_PRACTICE',
  VirtualRange = 'VIRTUAL_RANGE'
}

export type ActivityLocation = {
  __typename?: 'ActivityLocation';
  name?: Maybe<Scalars['String']['output']>;
};

/** Mutations on an Activity */
export type ActivityMutation = {
  __typename?: 'ActivityMutation';
  /** Mark the activity as hidden for the current user */
  hide: Scalars['Boolean']['output'];
  /** Un hide the activity for the current user */
  unHide: Scalars['Boolean']['output'];
};

export type ActivitySummary = {
  __typename?: 'ActivitySummary';
  /** Number of activities of this kind */
  activityCount?: Maybe<Scalars['Int']['output']>;
  /** The activity kind */
  kind?: Maybe<ActivityKind>;
  /** The last activity of this kind */
  lastActivityTime?: Maybe<Scalars['DateTime']['output']>;
  /** Number of players with this kind of activity */
  playerCount?: Maybe<Scalars['Int']['output']>;
};

/** A segment of a collection. */
export type ActivitySummaryTypeCollectionSegment = {
  __typename?: 'ActivitySummaryTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ActivitySummary>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type AddCoachToFacilityError = DefaultError | EntityNotFoundError;

export type AddCoachToFacilityInput = {
  email: Scalars['EmailAddress']['input'];
  facilityId: Scalars['ID']['input'];
};

export type AddCoachToFacilityPayload = {
  __typename?: 'AddCoachToFacilityPayload';
  coachProfile?: Maybe<CoachProfile>;
  errors?: Maybe<Array<AddCoachToFacilityError>>;
};

export type AddEquipmentBrandError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type AddEquipmentBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  facilityId: Scalars['ID']['input'];
  logoUrl?: InputMaybe<Scalars['URL']['input']>;
  name: Scalars['String']['input'];
  webSiteUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type AddEquipmentBrandPayload = {
  __typename?: 'AddEquipmentBrandPayload';
  errors?: Maybe<Array<AddEquipmentBrandError>>;
  result?: Maybe<EquipmentBrand>;
};

export type AddEquipmentSeriesError = DefaultError | DuplicateRecordError | EntityNotFoundError | MissingMandatoryFieldError;

export type AddEquipmentSeriesInput = {
  brandId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type AddEquipmentSeriesPayload = {
  __typename?: 'AddEquipmentSeriesPayload';
  equipmentSeries?: Maybe<EquipmentSeries>;
  errors?: Maybe<Array<AddEquipmentSeriesError>>;
};

export type AddFacilityConsentsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type AddFacilityConsentsInput = {
  consents: Array<FacilityPartnerConsentInput>;
  facilityId: Scalars['ID']['input'];
  partnerId: Scalars['ID']['input'];
};

export type AddFacilityConsentsPayload = {
  __typename?: 'AddFacilityConsentsPayload';
  errors?: Maybe<Array<AddFacilityConsentsError>>;
  partner?: Maybe<Partner>;
};

export type AddFacilityPartnerError = DefaultError | DuplicateRecordError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type AddFacilityPartnerInput = {
  facilityId: Scalars['ID']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['Url']['input']>;
  name: Scalars['String']['input'];
};

export type AddFacilityPartnerPayload = {
  __typename?: 'AddFacilityPartnerPayload';
  errors?: Maybe<Array<AddFacilityPartnerError>>;
  partner?: Maybe<Partner>;
};

export type AddMembershipError = DefaultError | EndDateLessThanStartDateError | EntityNotFoundError | MembershipForFacilityAlreadyExistsError | MissingMandatoryFieldError | TrackManAccountNotFoundError;

export type AddMembershipInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  endDate: Scalars['DateTime']['input'];
  facilityId: Scalars['NonEmptyString']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type AddMembershipPayload = {
  __typename?: 'AddMembershipPayload';
  errors?: Maybe<Array<AddMembershipError>>;
  membership?: Maybe<MembershipInfo>;
};

export type AddQueuedCommandError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type AddQueuedCommandInput = {
  bayIds: Array<Scalars['ID']['input']>;
  locationId: Scalars['ID']['input'];
};

export type AddQueuedCommandPayload = {
  __typename?: 'AddQueuedCommandPayload';
  errors?: Maybe<Array<AddQueuedCommandError>>;
  result?: Maybe<AppMutationResult>;
};

export type AddRangeBayError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type AddRangeBayInput = {
  annotations?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  availability?: InputMaybe<BayAvailability>;
  bayNumber?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isKioskOnly?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sectionId?: InputMaybe<Scalars['ID']['input']>;
  siteId: Scalars['ID']['input'];
  worldCoordinate: WorldCoord;
};

export type AddRangeBayPayload = {
  __typename?: 'AddRangeBayPayload';
  errors?: Maybe<Array<AddRangeBayError>>;
  rangeBay?: Maybe<RangeBay>;
};

export type AddRangeLaunchAreaError = ActiveConfigurationNotFoundError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type AddRangeLaunchAreaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  siteId: Scalars['ID']['input'];
  vertices: Array<LaunchAreaCoordinatesInput>;
};

export type AddRangeLaunchAreaPayload = {
  __typename?: 'AddRangeLaunchAreaPayload';
  errors?: Maybe<Array<AddRangeLaunchAreaError>>;
  launchArea?: Maybe<LaunchAreaType>;
};

export type AddRangeNetError = ActiveConfigurationNotFoundError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NumericValueOutOfRangeError | NumericValueShouldBePositiveOrZeroError | UnauthorizedError;

export type AddRangeNetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  poles: Array<NetPoleInput>;
  siteId: Scalars['ID']['input'];
};

export type AddRangeNetPayload = {
  __typename?: 'AddRangeNetPayload';
  errors?: Maybe<Array<AddRangeNetError>>;
  net?: Maybe<Net>;
};

export type AddRangeRadarError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type AddRangeRadarInput = {
  canConfirm?: Scalars['Boolean']['input'];
  isEnabled?: Scalars['Boolean']['input'];
  isOverhead?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  serialNumber?: InputMaybe<Scalars['Int']['input']>;
  siteId: Scalars['ID']['input'];
  worldCoordinate: WorldCoord;
};

export type AddRangeRadarPayload = {
  __typename?: 'AddRangeRadarPayload';
  errors?: Maybe<Array<AddRangeRadarError>>;
  radar?: Maybe<Radar>;
};

export type AddRangeSectionError = DefaultError | DuplicateRecordError | EntityNotFoundError | MissingMandatoryFieldError;

export type AddRangeSectionInput = {
  name: Scalars['String']['input'];
  siteId: Scalars['ID']['input'];
};

export type AddRangeSectionPayload = {
  __typename?: 'AddRangeSectionPayload';
  errors?: Maybe<Array<AddRangeSectionError>>;
  section?: Maybe<Section>;
};

export type AddRangeTargetError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type AddRangeTargetInput = {
  annotations?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: Scalars['Boolean']['input'];
  isHidden?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  siteId: Scalars['ID']['input'];
  targetType?: Type;
  worldCoordinate: WorldCoord;
};

export type AddRangeTargetPayload = {
  __typename?: 'AddRangeTargetPayload';
  errors?: Maybe<Array<AddRangeTargetError>>;
  rangeTarget?: Maybe<RangeTarget>;
};

export type AddScorecardInput = {
  players: Array<InputMaybe<ScorecardPlayerItemInput>>;
  scores: Array<InputMaybe<ScorecardScoreItemInput>>;
};

export type AddTeamMemberError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type AddTeamMemberInput = {
  memberId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type AddTeamMemberPayload = {
  __typename?: 'AddTeamMemberPayload';
  errors?: Maybe<Array<AddTeamMemberError>>;
  team?: Maybe<TeamInterface>;
};

export type AddTournamentConsentError = DefaultError | DuplicateRecordError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type AddTournamentConsentInput = {
  description: Scalars['NonEmptyString']['input'];
  facilityId: Scalars['ID']['input'];
  isMandatory?: Scalars['Boolean']['input'];
  name: Scalars['NonEmptyString']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  urlText?: InputMaybe<Scalars['String']['input']>;
};

export type AddTournamentConsentPayload = {
  __typename?: 'AddTournamentConsentPayload';
  errors?: Maybe<Array<AddTournamentConsentError>>;
  partner?: Maybe<Partner>;
};

export type AddTournamentPartnersError = DefaultError | EntityNotFoundError;

export type AddTournamentPartnersInput = {
  id: Scalars['ID']['input'];
  partnersKeys: Array<Scalars['String']['input']>;
};

export type AddTournamentPartnersPayload = {
  __typename?: 'AddTournamentPartnersPayload';
  errors?: Maybe<Array<AddTournamentPartnersError>>;
  tournament?: Maybe<Tournament>;
};

/** An address */
export type Address = {
  __typename?: 'Address';
  /** The city name of the address */
  city?: Maybe<Scalars['String']['output']>;
  /** The country code of the address (ISO 3166-1 alpha-2) */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  countryName?: Maybe<Scalars['String']['output']>;
  /** The state code of the address (ANSI standard INCITS 38:2009) */
  stateCode?: Maybe<Scalars['String']['output']>;
  /** The name of the street */
  street?: Maybe<Scalars['String']['output']>;
  /** The zip code of the address */
  zipCode?: Maybe<Scalars['String']['output']>;
};


/** An address */
export type AddressCountryNameArgs = {
  format?: InputMaybe<CountryNameFormat>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['NonEmptyString']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  stateCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['NonEmptyString']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

/** An admin person info */
export type AdminPersonInfo = Node & {
  __typename?: 'AdminPersonInfo';
  /** Account Id of the person */
  accountId?: Maybe<Scalars['String']['output']>;
  /** Activities of the person */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** DateOfBirth */
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** Email history */
  emailHistory?: Maybe<Array<Maybe<EmailHistory>>>;
  /** Get event logs */
  eventLogs?: Maybe<EventLogItemTypeCollectionSegment>;
  /** First name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Full name */
  fullName?: Maybe<Scalars['String']['output']>;
  /** Gender */
  gender?: Maybe<Gender>;
  /** Return all info about the players TrackMan handicap */
  hcp?: Maybe<Hcp>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Login providers */
  loginProviders?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Picture */
  picture?: Maybe<Scalars['String']['output']>;
  /** Player name */
  playerName?: Maybe<Scalars['String']['output']>;
  /** The scorecards for this person */
  scorecards?: Maybe<ScorecardTypeCollectionSegment>;
};


/** An admin person info */
export type AdminPersonInfoActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** An admin person info */
export type AdminPersonInfoEventLogsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** An admin person info */
export type AdminPersonInfoScorecardsArgs = {
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A segment of a collection. */
export type AdminPersonInfoTypeCollectionSegment = {
  __typename?: 'AdminPersonInfoTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<AdminPersonInfo>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Mutations for AdminTools */
export type AdminToolMutationType = {
  __typename?: 'AdminToolMutationType';
  /** Mutations on hcp records */
  hcp?: Maybe<HcpMutations>;
};

/** A collections of helper functions */
export type AdminTools = {
  __typename?: 'AdminTools';
  /** Convert a node id to a database id */
  getDbIdFromNodeId?: Maybe<Scalars['String']['output']>;
  /** Convert a tournament link or id to the new format */
  getNewTournamentLink?: Maybe<Scalars['String']['output']>;
  /** Convert a database id to a node id */
  getNodeIdFromDbId?: Maybe<Scalars['String']['output']>;
  /** Get the object type from a node id */
  getTypeNameFromNodeId?: Maybe<Scalars['String']['output']>;
  scorecardIdsFromDbId?: Maybe<Array<Scalars['ID']['output']>>;
};


/** A collections of helper functions */
export type AdminToolsGetDbIdFromNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** A collections of helper functions */
export type AdminToolsGetNewTournamentLinkArgs = {
  tournamentLink: Scalars['String']['input'];
};


/** A collections of helper functions */
export type AdminToolsGetNodeIdFromDbIdArgs = {
  dbId: Scalars['String']['input'];
  nodeType: Scalars['String']['input'];
};


/** A collections of helper functions */
export type AdminToolsGetTypeNameFromNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** A collections of helper functions */
export type AdminToolsScorecardIdsFromDbIdArgs = {
  scorecardDbId?: InputMaybe<Scalars['String']['input']>;
  scorecardDbIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AgePartnerConsent = ConsentInterfaceType & {
  __typename?: 'AgePartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** Minimum value is used for the Age consent */
  minimumValue?: Maybe<Scalars['Float']['output']>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type AggregatedClosestToPinLeaderboard = {
  __typename?: 'AggregatedClosestToPinLeaderboard';
  records?: Maybe<AggregatedClosestToPinLeaderboardRecordTypeCollectionSegment>;
};


export type AggregatedClosestToPinLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type AggregatedClosestToPinLeaderboardRecord = {
  __typename?: 'AggregatedClosestToPinLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** The holes played in the tournament */
  holes?: Maybe<Array<ClosestToPinLeaderboardHoleScoreWithoutPosType>>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  /** The total score */
  total?: Maybe<ClosestToPinLeaderboardRoundScoreType>;
};

/** A segment of a collection. */
export type AggregatedClosestToPinLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'AggregatedClosestToPinLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<AggregatedClosestToPinLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type AggregatedMeasurement = {
  __typename?: 'AggregatedMeasurement';
  averageAttackAngle?: Maybe<Scalars['Float']['output']>;
  averageBackswingTime?: Maybe<Scalars['Float']['output']>;
  averageBallSpeed?: Maybe<Scalars['Float']['output']>;
  averageBallSpeedDifference?: Maybe<Scalars['Float']['output']>;
  averageBounces?: Maybe<Scalars['Float']['output']>;
  averageBreak?: Maybe<Scalars['Float']['output']>;
  averageCarry?: Maybe<Scalars['Float']['output']>;
  averageCarryActual?: Maybe<Scalars['Float']['output']>;
  averageCarrySide?: Maybe<Scalars['Float']['output']>;
  averageCarrySideActual?: Maybe<Scalars['Float']['output']>;
  averageClubPath?: Maybe<Scalars['Float']['output']>;
  averageClubSpeed?: Maybe<Scalars['Float']['output']>;
  averageCurve?: Maybe<Scalars['Float']['output']>;
  averageCurveActual?: Maybe<Scalars['Float']['output']>;
  averageDPlaneTilt?: Maybe<Scalars['Float']['output']>;
  averageDynamicLie?: Maybe<Scalars['Float']['output']>;
  averageDynamicLoft?: Maybe<Scalars['Float']['output']>;
  averageEffectiveStimp?: Maybe<Scalars['Float']['output']>;
  averageElevation?: Maybe<Scalars['Float']['output']>;
  averageEntrySpeedDistance?: Maybe<Scalars['Float']['output']>;
  averageFaceAngle?: Maybe<Scalars['Float']['output']>;
  averageFaceToPath?: Maybe<Scalars['Float']['output']>;
  averageFlatStimp?: Maybe<Scalars['Float']['output']>;
  averageForwardswingTime?: Maybe<Scalars['Float']['output']>;
  averageGyroSpinAngle?: Maybe<Scalars['Float']['output']>;
  averageHangTime?: Maybe<Scalars['Float']['output']>;
  averageImpactHeight?: Maybe<Scalars['Float']['output']>;
  averageImpactOffset?: Maybe<Scalars['Float']['output']>;
  averageLandingAngle?: Maybe<Scalars['Float']['output']>;
  averageLandingAngleActual?: Maybe<Scalars['Float']['output']>;
  averageLandingHeight?: Maybe<Scalars['Float']['output']>;
  averageLastData?: Maybe<Scalars['Float']['output']>;
  averageLaunchAngle?: Maybe<Scalars['Float']['output']>;
  averageLaunchDirection?: Maybe<Scalars['Float']['output']>;
  averageLowPointDistance?: Maybe<Scalars['Float']['output']>;
  averageLowPointHeight?: Maybe<Scalars['Float']['output']>;
  averageLowPointSide?: Maybe<Scalars['Float']['output']>;
  averageMaxHeight?: Maybe<Scalars['Float']['output']>;
  averageRollDeceleration?: Maybe<Scalars['Float']['output']>;
  averageRollFactor?: Maybe<Scalars['Float']['output']>;
  averageRollPercentage?: Maybe<Scalars['Float']['output']>;
  averageRollSpeed?: Maybe<Scalars['Float']['output']>;
  averageSide?: Maybe<Scalars['Float']['output']>;
  averageSkidDistance?: Maybe<Scalars['Float']['output']>;
  averageSkidRatio?: Maybe<Scalars['Float']['output']>;
  averageSlopePercentageRise?: Maybe<Scalars['Float']['output']>;
  averageSlopePercentageSide?: Maybe<Scalars['Float']['output']>;
  averageSmashFactor?: Maybe<Scalars['Float']['output']>;
  averageSmashIndex?: Maybe<Scalars['Float']['output']>;
  averageSpeedDrop?: Maybe<Scalars['Float']['output']>;
  averageSpinAxis?: Maybe<Scalars['Float']['output']>;
  averageSpinAxisActual?: Maybe<Scalars['Float']['output']>;
  averageSpinIndex?: Maybe<Scalars['Float']['output']>;
  averageSpinLoft?: Maybe<Scalars['Float']['output']>;
  averageSpinRate?: Maybe<Scalars['Float']['output']>;
  averageSpinRateDifference?: Maybe<Scalars['Float']['output']>;
  averageStrokeLength?: Maybe<Scalars['Float']['output']>;
  averageSwingDirection?: Maybe<Scalars['Float']['output']>;
  averageSwingPlane?: Maybe<Scalars['Float']['output']>;
  averageSwingRadius?: Maybe<Scalars['Float']['output']>;
  averageTempo?: Maybe<Scalars['Float']['output']>;
  averageTotal?: Maybe<Scalars['Float']['output']>;
  averageTotalActual?: Maybe<Scalars['Float']['output']>;
  averageTotalBreak?: Maybe<Scalars['Float']['output']>;
  averageTotalSide?: Maybe<Scalars['Float']['output']>;
  averageTotalSideActual?: Maybe<Scalars['Float']['output']>;
  countAttackAngle?: Maybe<Scalars['Float']['output']>;
  countBackswingTime?: Maybe<Scalars['Float']['output']>;
  countBallSpeed?: Maybe<Scalars['Float']['output']>;
  countBallSpeedDifference?: Maybe<Scalars['Float']['output']>;
  countBounces?: Maybe<Scalars['Float']['output']>;
  countBreak?: Maybe<Scalars['Float']['output']>;
  countCarry?: Maybe<Scalars['Float']['output']>;
  countCarryActual?: Maybe<Scalars['Float']['output']>;
  countCarrySide?: Maybe<Scalars['Float']['output']>;
  countCarrySideActual?: Maybe<Scalars['Float']['output']>;
  countClubPath?: Maybe<Scalars['Float']['output']>;
  countClubSpeed?: Maybe<Scalars['Float']['output']>;
  countCurve?: Maybe<Scalars['Float']['output']>;
  countCurveActual?: Maybe<Scalars['Float']['output']>;
  countDPlaneTilt?: Maybe<Scalars['Float']['output']>;
  countDynamicLie?: Maybe<Scalars['Float']['output']>;
  countDynamicLoft?: Maybe<Scalars['Float']['output']>;
  countEffectiveStimp?: Maybe<Scalars['Float']['output']>;
  countElevation?: Maybe<Scalars['Float']['output']>;
  countEntrySpeedDistance?: Maybe<Scalars['Float']['output']>;
  countFaceAngle?: Maybe<Scalars['Float']['output']>;
  countFaceToPath?: Maybe<Scalars['Float']['output']>;
  countFlatStimp?: Maybe<Scalars['Float']['output']>;
  countForwardswingTime?: Maybe<Scalars['Float']['output']>;
  countGyroSpinAngle?: Maybe<Scalars['Float']['output']>;
  countHangTime?: Maybe<Scalars['Float']['output']>;
  countImpactHeight?: Maybe<Scalars['Float']['output']>;
  countImpactOffset?: Maybe<Scalars['Float']['output']>;
  countLandingAngle?: Maybe<Scalars['Float']['output']>;
  countLandingAngleActual?: Maybe<Scalars['Float']['output']>;
  countLandingHeight?: Maybe<Scalars['Float']['output']>;
  countLastData?: Maybe<Scalars['Float']['output']>;
  countLaunchAngle?: Maybe<Scalars['Float']['output']>;
  countLaunchDirection?: Maybe<Scalars['Float']['output']>;
  countLowPointDistance?: Maybe<Scalars['Float']['output']>;
  countLowPointHeight?: Maybe<Scalars['Float']['output']>;
  countLowPointSide?: Maybe<Scalars['Float']['output']>;
  countMaxHeight?: Maybe<Scalars['Float']['output']>;
  countRollDeceleration?: Maybe<Scalars['Float']['output']>;
  countRollFactor?: Maybe<Scalars['Float']['output']>;
  countRollPercentage?: Maybe<Scalars['Float']['output']>;
  countRollSpeed?: Maybe<Scalars['Float']['output']>;
  countSide?: Maybe<Scalars['Float']['output']>;
  countSkidDistance?: Maybe<Scalars['Float']['output']>;
  countSkidRatio?: Maybe<Scalars['Float']['output']>;
  countSlopePercentageRise?: Maybe<Scalars['Float']['output']>;
  countSlopePercentageSide?: Maybe<Scalars['Float']['output']>;
  countSmashFactor?: Maybe<Scalars['Float']['output']>;
  countSmashIndex?: Maybe<Scalars['Float']['output']>;
  countSpeedDrop?: Maybe<Scalars['Float']['output']>;
  countSpinAxis?: Maybe<Scalars['Float']['output']>;
  countSpinAxisActual?: Maybe<Scalars['Float']['output']>;
  countSpinIndex?: Maybe<Scalars['Float']['output']>;
  countSpinLoft?: Maybe<Scalars['Float']['output']>;
  countSpinRate?: Maybe<Scalars['Float']['output']>;
  countSpinRateDifference?: Maybe<Scalars['Float']['output']>;
  countStrokeLength?: Maybe<Scalars['Float']['output']>;
  countSwingDirection?: Maybe<Scalars['Float']['output']>;
  countSwingPlane?: Maybe<Scalars['Float']['output']>;
  countSwingRadius?: Maybe<Scalars['Float']['output']>;
  countTempo?: Maybe<Scalars['Float']['output']>;
  countTotal?: Maybe<Scalars['Float']['output']>;
  countTotalActual?: Maybe<Scalars['Float']['output']>;
  countTotalBreak?: Maybe<Scalars['Float']['output']>;
  countTotalSide?: Maybe<Scalars['Float']['output']>;
  countTotalSideActual?: Maybe<Scalars['Float']['output']>;
  maxAttackAngle?: Maybe<Scalars['Float']['output']>;
  maxBackswingTime?: Maybe<Scalars['Float']['output']>;
  maxBallSpeed?: Maybe<Scalars['Float']['output']>;
  maxBallSpeedDifference?: Maybe<Scalars['Float']['output']>;
  maxBounces?: Maybe<Scalars['Float']['output']>;
  maxBreak?: Maybe<Scalars['Float']['output']>;
  maxCarry?: Maybe<Scalars['Float']['output']>;
  maxCarryActual?: Maybe<Scalars['Float']['output']>;
  maxCarrySide?: Maybe<Scalars['Float']['output']>;
  maxCarrySideActual?: Maybe<Scalars['Float']['output']>;
  maxClubPath?: Maybe<Scalars['Float']['output']>;
  maxClubSpeed?: Maybe<Scalars['Float']['output']>;
  maxCurve?: Maybe<Scalars['Float']['output']>;
  maxCurveActual?: Maybe<Scalars['Float']['output']>;
  maxDPlaneTilt?: Maybe<Scalars['Float']['output']>;
  maxDynamicLie?: Maybe<Scalars['Float']['output']>;
  maxDynamicLoft?: Maybe<Scalars['Float']['output']>;
  maxEffectiveStimp?: Maybe<Scalars['Float']['output']>;
  maxElevation?: Maybe<Scalars['Float']['output']>;
  maxEntrySpeedDistance?: Maybe<Scalars['Float']['output']>;
  maxFaceAngle?: Maybe<Scalars['Float']['output']>;
  maxFaceToPath?: Maybe<Scalars['Float']['output']>;
  maxFlatStimp?: Maybe<Scalars['Float']['output']>;
  maxForwardswingTime?: Maybe<Scalars['Float']['output']>;
  maxGyroSpinAngle?: Maybe<Scalars['Float']['output']>;
  maxHangTime?: Maybe<Scalars['Float']['output']>;
  maxImpactHeight?: Maybe<Scalars['Float']['output']>;
  maxImpactOffset?: Maybe<Scalars['Float']['output']>;
  maxLandingAngle?: Maybe<Scalars['Float']['output']>;
  maxLandingAngleActual?: Maybe<Scalars['Float']['output']>;
  maxLandingHeight?: Maybe<Scalars['Float']['output']>;
  maxLastData?: Maybe<Scalars['Float']['output']>;
  maxLaunchAngle?: Maybe<Scalars['Float']['output']>;
  maxLaunchDirection?: Maybe<Scalars['Float']['output']>;
  maxLowPointDistance?: Maybe<Scalars['Float']['output']>;
  maxLowPointHeight?: Maybe<Scalars['Float']['output']>;
  maxLowPointSide?: Maybe<Scalars['Float']['output']>;
  maxMaxHeight?: Maybe<Scalars['Float']['output']>;
  maxRollDeceleration?: Maybe<Scalars['Float']['output']>;
  maxRollFactor?: Maybe<Scalars['Float']['output']>;
  maxRollPercentage?: Maybe<Scalars['Float']['output']>;
  maxRollSpeed?: Maybe<Scalars['Float']['output']>;
  maxSide?: Maybe<Scalars['Float']['output']>;
  maxSkidDistance?: Maybe<Scalars['Float']['output']>;
  maxSkidRatio?: Maybe<Scalars['Float']['output']>;
  maxSlopePercentageRise?: Maybe<Scalars['Float']['output']>;
  maxSlopePercentageSide?: Maybe<Scalars['Float']['output']>;
  maxSmashFactor?: Maybe<Scalars['Float']['output']>;
  maxSmashIndex?: Maybe<Scalars['Float']['output']>;
  maxSpeedDrop?: Maybe<Scalars['Float']['output']>;
  maxSpinAxis?: Maybe<Scalars['Float']['output']>;
  maxSpinAxisActual?: Maybe<Scalars['Float']['output']>;
  maxSpinIndex?: Maybe<Scalars['Float']['output']>;
  maxSpinLoft?: Maybe<Scalars['Float']['output']>;
  maxSpinRate?: Maybe<Scalars['Float']['output']>;
  maxSpinRateDifference?: Maybe<Scalars['Float']['output']>;
  maxStrokeLength?: Maybe<Scalars['Float']['output']>;
  maxSwingDirection?: Maybe<Scalars['Float']['output']>;
  maxSwingPlane?: Maybe<Scalars['Float']['output']>;
  maxSwingRadius?: Maybe<Scalars['Float']['output']>;
  maxTempo?: Maybe<Scalars['Float']['output']>;
  maxTotal?: Maybe<Scalars['Float']['output']>;
  maxTotalActual?: Maybe<Scalars['Float']['output']>;
  maxTotalBreak?: Maybe<Scalars['Float']['output']>;
  maxTotalSide?: Maybe<Scalars['Float']['output']>;
  maxTotalSideActual?: Maybe<Scalars['Float']['output']>;
  minAttackAngle?: Maybe<Scalars['Float']['output']>;
  minBackswingTime?: Maybe<Scalars['Float']['output']>;
  minBallSpeed?: Maybe<Scalars['Float']['output']>;
  minBallSpeedDifference?: Maybe<Scalars['Float']['output']>;
  minBounces?: Maybe<Scalars['Float']['output']>;
  minBreak?: Maybe<Scalars['Float']['output']>;
  minCarry?: Maybe<Scalars['Float']['output']>;
  minCarryActual?: Maybe<Scalars['Float']['output']>;
  minCarrySide?: Maybe<Scalars['Float']['output']>;
  minCarrySideActual?: Maybe<Scalars['Float']['output']>;
  minClubPath?: Maybe<Scalars['Float']['output']>;
  minClubSpeed?: Maybe<Scalars['Float']['output']>;
  minCurve?: Maybe<Scalars['Float']['output']>;
  minCurveActual?: Maybe<Scalars['Float']['output']>;
  minDPlaneTilt?: Maybe<Scalars['Float']['output']>;
  minDynamicLie?: Maybe<Scalars['Float']['output']>;
  minDynamicLoft?: Maybe<Scalars['Float']['output']>;
  minEffectiveStimp?: Maybe<Scalars['Float']['output']>;
  minElevation?: Maybe<Scalars['Float']['output']>;
  minEntrySpeedDistance?: Maybe<Scalars['Float']['output']>;
  minFaceAngle?: Maybe<Scalars['Float']['output']>;
  minFaceToPath?: Maybe<Scalars['Float']['output']>;
  minFlatStimp?: Maybe<Scalars['Float']['output']>;
  minForwardswingTime?: Maybe<Scalars['Float']['output']>;
  minGyroSpinAngle?: Maybe<Scalars['Float']['output']>;
  minHangTime?: Maybe<Scalars['Float']['output']>;
  minImpactHeight?: Maybe<Scalars['Float']['output']>;
  minImpactOffset?: Maybe<Scalars['Float']['output']>;
  minLandingAngle?: Maybe<Scalars['Float']['output']>;
  minLandingAngleActual?: Maybe<Scalars['Float']['output']>;
  minLandingHeight?: Maybe<Scalars['Float']['output']>;
  minLastData?: Maybe<Scalars['Float']['output']>;
  minLaunchAngle?: Maybe<Scalars['Float']['output']>;
  minLaunchDirection?: Maybe<Scalars['Float']['output']>;
  minLowPointDistance?: Maybe<Scalars['Float']['output']>;
  minLowPointHeight?: Maybe<Scalars['Float']['output']>;
  minLowPointSide?: Maybe<Scalars['Float']['output']>;
  minMaxHeight?: Maybe<Scalars['Float']['output']>;
  minRollDeceleration?: Maybe<Scalars['Float']['output']>;
  minRollFactor?: Maybe<Scalars['Float']['output']>;
  minRollPercentage?: Maybe<Scalars['Float']['output']>;
  minRollSpeed?: Maybe<Scalars['Float']['output']>;
  minSide?: Maybe<Scalars['Float']['output']>;
  minSkidDistance?: Maybe<Scalars['Float']['output']>;
  minSkidRatio?: Maybe<Scalars['Float']['output']>;
  minSlopePercentageRise?: Maybe<Scalars['Float']['output']>;
  minSlopePercentageSide?: Maybe<Scalars['Float']['output']>;
  minSmashFactor?: Maybe<Scalars['Float']['output']>;
  minSmashIndex?: Maybe<Scalars['Float']['output']>;
  minSpeedDrop?: Maybe<Scalars['Float']['output']>;
  minSpinAxis?: Maybe<Scalars['Float']['output']>;
  minSpinAxisActual?: Maybe<Scalars['Float']['output']>;
  minSpinIndex?: Maybe<Scalars['Float']['output']>;
  minSpinLoft?: Maybe<Scalars['Float']['output']>;
  minSpinRate?: Maybe<Scalars['Float']['output']>;
  minSpinRateDifference?: Maybe<Scalars['Float']['output']>;
  minStrokeLength?: Maybe<Scalars['Float']['output']>;
  minSwingDirection?: Maybe<Scalars['Float']['output']>;
  minSwingPlane?: Maybe<Scalars['Float']['output']>;
  minSwingRadius?: Maybe<Scalars['Float']['output']>;
  minTempo?: Maybe<Scalars['Float']['output']>;
  minTotal?: Maybe<Scalars['Float']['output']>;
  minTotalActual?: Maybe<Scalars['Float']['output']>;
  minTotalBreak?: Maybe<Scalars['Float']['output']>;
  minTotalSide?: Maybe<Scalars['Float']['output']>;
  minTotalSideActual?: Maybe<Scalars['Float']['output']>;
};

export type Album = KeyValuesInterfaceType & Node & TagsInterfaceTypeOfStringType & {
  __typename?: 'Album';
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The list of medias on this album */
  medias?: Maybe<Array<Media>>;
  /** The name of the album */
  name?: Maybe<Scalars['String']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
};


export type AlbumHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type AlbumHasTagArgs = {
  tag: Scalars['String']['input'];
};


export type AlbumKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type AlbumMediasArgs = {
  mediaKind?: InputMaybe<MediaKind>;
};

/** Mutations on an album */
export type AlbumMutation = {
  __typename?: 'AlbumMutation';
  /** Create an album in the media library */
  createAlbum?: Maybe<Album>;
  /** Delete the album */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Rename the album */
  rename?: Maybe<Album>;
};


/** Mutations on an album */
export type AlbumMutationCreateAlbumArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on an album */
export type AlbumMutationDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on an album */
export type AlbumMutationRenameArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

/** All equipment available */
export type AllEquipment = {
  __typename?: 'AllEquipment';
  /** Get all balls */
  balls?: Maybe<Array<Ball>>;
  /** Get all clubs */
  clubs?: Maybe<Array<Club>>;
  /** Get all retired balls */
  retiredBalls?: Maybe<Array<Ball>>;
  /** Get all retired clubs */
  retiredClubs?: Maybe<Array<Club>>;
};


/** All equipment available */
export type AllEquipmentClubsArgs = {
  clubIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  includeRetired?: InputMaybe<Scalars['Boolean']['input']>;
};


/** All equipment available */
export type AllEquipmentRetiredClubsArgs = {
  clubIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Allow profile to be shown or searched */
export enum AllowProfileSearch {
  /** Allow my profile to be shown or searched by anyone */
  Anyone = 'Anyone',
  /** Don't allow my profile to be shown or searched */
  Nobody = 'Nobody',
  /** Only allow my profile to be shown or searched by the players I have played with */
  PlayedWith = 'PlayedWith'
}

export type AlreadyMemberOfATeamError = BaseError & {
  __typename?: 'AlreadyMemberOfATeamError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ApiResources = {
  __typename?: 'ApiResources';
  displayName?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scopes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type AppMutationResult = {
  __typename?: 'AppMutationResult';
  isSuccess: Scalars['Boolean']['output'];
};

export type Application = {
  __typename?: 'Application';
  /** ClientId of the client */
  clientId?: Maybe<Scalars['String']['output']>;
  /** Client Secret of the client. It contains the value only when you create a client, in other times the value will be null. */
  clientSecret?: Maybe<Scalars['String']['output']>;
  /** Time when client was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Description of the client */
  description?: Maybe<Scalars['String']['output']>;
  /** Name of the client */
  name?: Maybe<Scalars['String']['output']>;
};

export enum ApplicationClients {
  ConsumerApp = 'CONSUMER_APP',
  IndoorSiteServer = 'INDOOR_SITE_SERVER',
  RangeApp = 'RANGE_APP',
  Tps = 'TPS',
  TrackmanPro = 'TRACKMAN_PRO'
}

export type ApplicationDataInterface = {
  activityLayout?: Maybe<ApplicationLayout>;
  applicationLayout?: Maybe<ApplicationLayout>;
  bay?: Maybe<BayInterface>;
  client?: Maybe<ApplicationClients>;
  /** The settings of each application */
  properties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** All downloadable releases */
  releases?: Maybe<ReleasesModel>;
  tournamentLayout?: Maybe<ApplicationLayout>;
};


export type ApplicationDataInterfaceActivityLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
};


export type ApplicationDataInterfacePropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ApplicationDataInterfaceReleasesArgs = {
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type ApplicationDataInterfaceTournamentLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApplicationDataMutationInterfaceType = {
  createBay?: Maybe<BayInterface>;
};


export type ApplicationDataMutationInterfaceTypeCreateBayArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type ApplicationLayout = {
  __typename?: 'ApplicationLayout';
  language?: Maybe<Scalars['String']['output']>;
  layoutResources?: Maybe<Array<Maybe<LayoutResource>>>;
  licenseResources?: Maybe<Array<Maybe<TrackManResource>>>;
  pages?: Maybe<Array<ApplicationLayoutPage>>;
};

export type ApplicationLayoutBaseItem = ApplicationLayoutGroupItemInterface & {
  __typename?: 'ApplicationLayoutBaseItem';
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutCourseItem = ApplicationLayoutGroupItemInterface & {
  __typename?: 'ApplicationLayoutCourseItem';
  course?: Maybe<Course>;
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutGroup = {
  __typename?: 'ApplicationLayoutGroup';
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<ApplicationLayoutGroupItemInterface>>;
  layout?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutGroupItemInterface = {
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutLeagueSeasonItem = ApplicationLayoutGroupItemInterface & {
  __typename?: 'ApplicationLayoutLeagueSeasonItem';
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  leagueSeason?: Maybe<LeagueSeason>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutPage = {
  __typename?: 'ApplicationLayoutPage';
  displayName?: Maybe<Scalars['String']['output']>;
  groups?: Maybe<Array<ApplicationLayoutGroup>>;
  identifier?: Maybe<Scalars['String']['output']>;
  layout?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutPlannedRoundItem = ApplicationLayoutGroupItemInterface & {
  __typename?: 'ApplicationLayoutPlannedRoundItem';
  activity?: Maybe<PlannedRound>;
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutSavedRoundItem = ApplicationLayoutGroupItemInterface & {
  __typename?: 'ApplicationLayoutSavedRoundItem';
  activity?: Maybe<SavedRound>;
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ApplicationLayoutTournamentItem = ApplicationLayoutGroupItemInterface & {
  __typename?: 'ApplicationLayoutTournamentItem';
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  tournament?: Maybe<Tournament>;
  type?: Maybe<Scalars['String']['output']>;
};

/** The settings is related to each application */
export type ApplicationProperty = {
  __typename?: 'ApplicationProperty';
  /** The application Id */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The settings of this application */
  settings?: Maybe<Array<ApplicationPropertySetting>>;
};

export enum ApplicationPropertyLevelsEnumType {
  Bay = 'BAY',
  Facility = 'FACILITY',
  Global = 'GLOBAL',
  Location = 'LOCATION',
  User = 'USER'
}

export type ApplicationPropertySetting = {
  __typename?: 'ApplicationPropertySetting';
  /** The key of the setting */
  key?: Maybe<Scalars['String']['output']>;
  /** The value of the setting */
  value?: Maybe<Scalars['String']['output']>;
};

export type ApplicationPropertySettingInput = {
  /** The key of the setting */
  key?: InputMaybe<Scalars['String']['input']>;
  /** The value of the setting */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type Ball = Node & {
  __typename?: 'Ball';
  id: Scalars['ID']['output'];
  /** The type of the ball */
  type?: Maybe<Scalars['String']['output']>;
};

export type BallPositionValidation = {
  __typename?: 'BallPositionValidation';
  /** Is the ball position data valid */
  isBallPositionDataValid?: Maybe<Scalars['Boolean']['output']>;
  /** Result of the validation */
  reason?: Maybe<Scalars['String']['output']>;
  /** What type of shot was it */
  shotResult?: Maybe<Scalars['String']['output']>;
};

/** All supported ball types */
export enum BallTypeEnum {
  Floater = 'FLOATER',
  Hard = 'HARD',
  LimitedDistanceHard = 'LIMITED_DISTANCE_HARD',
  LimitedDistanceSoft = 'LIMITED_DISTANCE_SOFT',
  Medium = 'MEDIUM',
  Premium = 'PREMIUM',
  PremiumHard = 'PREMIUM_HARD',
  PremiumSoft = 'PREMIUM_SOFT',
  Soft = 'SOFT'
}

export type BaseError = {
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type BaseRadarNotSetError = BaseError & {
  __typename?: 'BaseRadarNotSetError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** Activity information on the bay */
export type BayActivitiesInterface = {
  /** The activity currently being played in a bay */
  current?: Maybe<BayActivityInterface>;
};

/** Activity information for a Driving Range bay */
export type BayActivityInterface = {
  /** The ID of the activity */
  id: Scalars['ID']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The list of players currently occupying the bay */
  players: Array<Maybe<BayPlayerInterface>>;
  /** The start time of the activity */
  startTime: Scalars['DateTime']['output'];
  /** The activity type */
  type: Scalars['String']['output'];
};

/** Indicates the availability status of the bay */
export enum BayAvailability {
  BookingOnly = 'BOOKING_ONLY',
  Default = 'DEFAULT',
  FreeForAll = 'FREE_FOR_ALL',
  MembersOnly = 'MEMBERS_ONLY',
  NonPlayable = 'NON_PLAYABLE'
}

export type BayBookings = {
  __typename?: 'BayBookings';
  /** The list of bookings for a bay */
  list?: Maybe<BookingTypeCollectionSegment>;
  /** The next booking scheduled for a bay */
  next?: Maybe<Booking>;
};


export type BayBookingsListArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  todayOnly?: Scalars['Boolean']['input'];
};

export type BayConfiguration = {
  __typename?: 'BayConfiguration';
  bay?: Maybe<BayInterface>;
};

export type BayGraphicsInfo = {
  __typename?: 'BayGraphicsInfo';
  /** Date of the driver */
  driverDate?: Maybe<Scalars['String']['output']>;
  /** Version of the driver */
  driverVersion?: Maybe<Scalars['String']['output']>;
  /** Is it dedicated gpu or not */
  main?: Maybe<Scalars['Boolean']['output']>;
  /** Memory of the gpu */
  memory?: Maybe<Scalars['Long']['output']>;
  /** The gpu name */
  name?: Maybe<Scalars['String']['output']>;
};

export type BayIndoorActivities = BayActivitiesInterface & {
  __typename?: 'BayIndoorActivities';
  /** The activity currently being played in an indoor bay */
  current?: Maybe<SimulatorBayActivity>;
};

export type BayIndoorSession = BaySessionInterface & {
  __typename?: 'BayIndoorSession';
  /** The session duration */
  duration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The list of players currently occupying the bay */
  players: Array<Maybe<BayPlayer>>;
};

/** Properties available for all bay kinds */
export type BayInterface = {
  /** Activity information for this bay */
  activities: BayActivitiesInterface;
  applicationProperties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** Indicates the availability status of the bay */
  availability: BayAvailability;
  /** A numeric identifier for the bay */
  bayNumber?: Maybe<Scalars['Int']['output']>;
  /** Booking information for this bay */
  bookings: BayBookings;
  /** Database identifier of the bay */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The bay description */
  description?: Maybe<Scalars['String']['output']>;
  /** The facility that the bay is located in */
  facility?: Maybe<Facility>;
  /** The bay Id */
  id: Scalars['ID']['output'];
  /** Indicates whether the bay is currently part of one of the enabled bay setups */
  isEnabled: Scalars['Boolean']['output'];
  /** Indicates whether the bay is currently offline */
  isOffline: Scalars['Boolean']['output'];
  /** Indicate if the bay is an indoor simulator bay or a bay in a driving range */
  kind?: Maybe<BayKind>;
  /** The location the bay is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the bay */
  name?: Maybe<Scalars['String']['output']>;
};


/** Properties available for all bay kinds */
export type BayInterfaceApplicationPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};

/** Indicate if the bay is an indoor simulator bay or a bay in a driving range */
export enum BayKind {
  /** Bay in a driving range */
  RangeBay = 'RANGE_BAY',
  /** Indoor simulator bay */
  SimulatorBay = 'SIMULATOR_BAY'
}

export type BayNetIncidents = {
  __typename?: 'BayNetIncidents';
  /** The last safety border net incident for a bay */
  last?: Maybe<NetIncident>;
};

/** Information about a player on a bay */
export type BayPlayer = BayPlayerInterface & {
  __typename?: 'BayPlayer';
  /** The player's full name */
  fullName?: Maybe<Scalars['String']['output']>;
  /** The ID of the player */
  id: Scalars['ID']['output'];
  /** Indicates whether the player is a guest player */
  isGuestPlayer: Scalars['Boolean']['output'];
  /** The uri for the person profile picture */
  picture?: Maybe<Scalars['URL']['output']>;
  /** The player name */
  playerName?: Maybe<Scalars['String']['output']>;
  /** Profile information of the player */
  profile?: Maybe<PublicProfile>;
};

/** Information about a player on a bay */
export type BayPlayerInterface = {
  /** The player's full name */
  fullName?: Maybe<Scalars['String']['output']>;
  /** The ID of the player */
  id: Scalars['ID']['output'];
  /** Indicates whether the player is a guest player */
  isGuestPlayer: Scalars['Boolean']['output'];
  /** The uri for the person profile picture */
  picture?: Maybe<Scalars['URL']['output']>;
  /** The player name */
  playerName?: Maybe<Scalars['String']['output']>;
  /** The profile associated with the player */
  profile?: Maybe<PublicProfile>;
};

export type BayRangeActivities = BayActivitiesInterface & {
  __typename?: 'BayRangeActivities';
  /** The activity currently being played in a range bay */
  current?: Maybe<RangeBayActivity>;
};

export type BayRangeActivityNetIncidents = {
  __typename?: 'BayRangeActivityNetIncidents';
  /** The list of all net incidents for an activity */
  list?: Maybe<NetIncidentTypeCollectionSegment>;
};


export type BayRangeActivityNetIncidentsListArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type BayScreenInfo = {
  __typename?: 'BayScreenInfo';
  /** The device name */
  deviceName?: Maybe<Scalars['String']['output']>;
  /** Height of the screen */
  height?: Maybe<Scalars['Int']['output']>;
  /** Is it the primary screen or not */
  primary?: Maybe<Scalars['Boolean']['output']>;
  /** Width of the screen */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Session information for a Simulator bay */
export type BaySessionInterface = {
  /** The session duration */
  duration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The list of players currently occupying the bay */
  players: Array<Maybe<BayPlayerInterface>>;
};

export type BaySponsorInputTypeType = {
  /** The id for the bay */
  bayId: Scalars['NonEmptyString']['input'];
  /** The id for the sponsor */
  sponsorId: Scalars['NonEmptyString']['input'];
};

/** Get sponsor information for sponsor added to this hole */
export type BaySponsorType = {
  __typename?: 'BaySponsorType';
  /**
   * The bay cover by this sponsor.
   * @deprecated Use 'bays' from 'IndoorSponsorCampaign' type
   */
  bay?: Maybe<SimulatorBay>;
  /**
   * The sponsor selected for this bay.
   * @deprecated Use 'holeSponsorsV2' from 'IndoorSponsorCampaign' type
   */
  sponsor?: Maybe<Sponsor>;
};

export type BayStorageInfo = {
  __typename?: 'BayStorageInfo';
  /** The type of file system */
  fileSystem?: Maybe<Scalars['String']['output']>;
  /** Free space of the storage */
  freeSpace?: Maybe<Scalars['Long']['output']>;
  /** Model of the disk */
  model?: Maybe<Scalars['String']['output']>;
  /** Name of the disk */
  name?: Maybe<Scalars['String']['output']>;
  /** Size of the storage */
  size?: Maybe<Scalars['Long']['output']>;
};

export type BayStrokes = {
  __typename?: 'BayStrokes';
  /** The last stroke for a bay */
  last?: Maybe<StrokeV2>;
};

export enum BayTypes {
  All = 'ALL',
  IndoorSimulatorBays = 'INDOOR_SIMULATOR_BAYS',
  RangeBays = 'RANGE_BAYS'
}

/** Mutations on a Bays */
export type BaysMutation = {
  __typename?: 'BaysMutation';
  /** @deprecated Try using `endBaysSession` mutation */
  endSession?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Try to use `lockBays` mutation */
  lock?: Maybe<Scalars['Boolean']['output']>;
  restartTps?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Try using `sendMessageToBays` mutation */
  sendMessage?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Add Or Update application properties
   * @deprecated Try to use `setBaysApplicationProperties` instead
   */
  setApplicationProperties?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Try to use `unlockBays` mutation */
  unlock?: Maybe<Scalars['Boolean']['output']>;
};


/** Mutations on a Bays */
export type BaysMutationEndSessionArgs = {
  doNotEndSession?: InputMaybe<Scalars['Boolean']['input']>;
  lockScreen?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  scheduleTime?: InputMaybe<Scalars['DateTime']['input']>;
  secondsToEnd?: InputMaybe<Scalars['Int']['input']>;
  unlockCode?: InputMaybe<Scalars['String']['input']>;
  unlockUrl?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Bays */
export type BaysMutationLockArgs = {
  unlockCode?: InputMaybe<Scalars['String']['input']>;
  unlockUrl?: InputMaybe<Scalars['String']['input']>;
  useFacilityLockScreen?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Bays */
export type BaysMutationRestartTpsArgs = {
  refreshSettings?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Bays */
export type BaysMutationSendMessageArgs = {
  autoDismissDurationInSeconds?: InputMaybe<Scalars['Int']['input']>;
  message: Scalars['String']['input'];
};


/** Mutations on a Bays */
export type BaysMutationSetApplicationPropertiesArgs = {
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>>>;
  application: Scalars['String']['input'];
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Bays */
export type BaysMutationUnlockArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  unlockCode?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a booking */
export type Booking = Node & {
  __typename?: 'Booking';
  /** The bay of the booking */
  bay?: Maybe<BayInterface>;
  /** A correlation Id to track a user session across multiple bookings */
  correlationId?: Maybe<Scalars['String']['output']>;
  /** A UTC date of the end time of the booking */
  endDate: Scalars['DateTime']['output'];
  /** The optional Id of the booking as represented in an external booking provider */
  externalBookingId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** A UTC date of the start time of the booking */
  startDate: Scalars['DateTime']['output'];
  /** The booking user */
  user?: Maybe<BookingUser>;
  /**
   * An alias for the user that makes the booking
   * @deprecated Use user.alias field instead.
   */
  userAlias?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type BookingTypeCollectionSegment = {
  __typename?: 'BookingTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Booking>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Represents a booking user */
export type BookingUser = {
  __typename?: 'BookingUser';
  /** An alias for the user that makes the booking */
  alias?: Maybe<Scalars['String']['output']>;
};

export type BroadcastDeviceNotificationsError = DefaultError;

export type BroadcastDeviceNotificationsInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  continentCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  data?: InputMaybe<Scalars['Any']['input']>;
  emails?: InputMaybe<Array<Scalars['EmailAddress']['input']>>;
  lang?: InputMaybe<Scalars['String']['input']>;
  leagueIds?: InputMaybe<Array<Scalars['String']['input']>>;
  promotionUrl?: InputMaybe<Scalars['String']['input']>;
  regionCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  tournamentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BroadcastDeviceNotificationsPayload = {
  __typename?: 'BroadcastDeviceNotificationsPayload';
  errors?: Maybe<Array<BroadcastDeviceNotificationsError>>;
  result?: Maybe<BroadcastNotificationStatus>;
};

export type BroadcastNotificationDetails = {
  __typename?: 'BroadcastNotificationDetails';
  result?: Maybe<Array<KeyValuePairOfStringAndInt64>>;
  state?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
};

export type BroadcastNotificationStatus = Node & {
  __typename?: 'BroadcastNotificationStatus';
  id: Scalars['ID']['output'];
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  jobIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  state?: Maybe<Array<BroadcastNotificationDetails>>;
  successCount?: Maybe<Scalars['Int']['output']>;
};

export type BullsEyeLeaderboard = {
  __typename?: 'BullsEyeLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<BullsEyeLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<BullsEyeLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type BullsEyeLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type BullsEyeLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type BullsEyeLeaderboardRecord = {
  __typename?: 'BullsEyeLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** The holes played in the tournament */
  holes?: Maybe<Array<BullseyeLeaderboardRoundScoreType>>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  /** The total score */
  total?: Maybe<BullsEyeLeaderboardTotalScore>;
};

/** A segment of a collection. */
export type BullsEyeLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'BullsEyeLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BullsEyeLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BullsEyeLeaderboardTotalScore = {
  __typename?: 'BullsEyeLeaderboardTotalScore';
  /** Average distance to pin */
  averageDistanceToPin?: Maybe<Scalars['Decimal']['output']>;
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Decimal']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  /** Value1 for player */
  value1?: Maybe<Scalars['Decimal']['output']>;
  /** Value1 for player */
  value1Normalized?: Maybe<Scalars['Decimal']['output']>;
  /** Value2 for player */
  value2?: Maybe<Scalars['Decimal']['output']>;
  /** Value2 for player */
  value2Normalized?: Maybe<Scalars['Decimal']['output']>;
};

/** The tournament description */
export type BullsEyeTournament = KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'BullsEyeTournament';
  /**
   * Allow the participants to retry the tournament and improve the score.
   * @deprecated Use tournament.settings.attempts instead
   */
  allowMultipleTournamentAttempts?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The course for the tournament. */
  course?: Maybe<Course>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The difficulty of the tournament. */
  distance?: Maybe<TournamentDistanceType>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** The tee selected for female players in the tournament. */
  femaleTee?: Maybe<Scalars['String']['output']>;
  /** Game settings */
  gameSettings?: Maybe<BullsEyeTournamentGameSettings>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The holes selected for the tournament. */
  holes?: Maybe<Array<Maybe<TournamentHole>>>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<BullsEyeLeaderboard>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The tee selected for male players in the tournament. */
  maleTee?: Maybe<Scalars['String']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** The number of rounds in the tournament. */
  numberOfRounds?: Maybe<Scalars['PositiveInt']['output']>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** The selected game hole option identifier. */
  selectedGameHoleOptionIdentifier?: Maybe<Scalars['String']['output']>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** The number of shots per round in the tournament. */
  shotsPerRound?: Maybe<Scalars['Int']['output']>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The sync grace period that overrides the global grace period. */
  syncGracePeriodInMinutes?: Maybe<Scalars['Int']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The tee selected in the tournament */
  tee?: Maybe<Scalars['String']['output']>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type BullsEyeTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type BullsEyeTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type BullsEyeTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type BullsEyeTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type BullsEyeTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
};


/** The tournament description */
export type BullsEyeTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type BullsEyeTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type BullsEyeTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type BullsEyeTournamentGameSettings = {
  __typename?: 'BullsEyeTournamentGameSettings';
  /** The attempt that is shown on the leaderboard */
  attemptsOnLeaderboard?: Maybe<Scalars['String']['output']>;
  /** The attempts per round */
  attemptsPerRound?: Maybe<Scalars['Int']['output']>;
  /** The fairway firmness */
  fairwayFirmness?: Maybe<Firmness>;
  /** The gimme distance */
  gimmeDistance?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** The green firmness */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp for the round */
  greenStimp?: Maybe<Stimp>;
  /** The lighting on the course when the round is played */
  lighting?: Maybe<Lighting>;
  /** Mulligans */
  mulligans?: Maybe<Mulligans>;
  /** The pin difficulty */
  pinDifficulty?: Maybe<Pin>;
  /** The putting mode */
  puttingMode?: Maybe<PuttMode>;
  /** The wind mode */
  windSpeed?: Maybe<WindMode>;
};

/** Mutations on a Tournament */
export type BullsEyeTournamentMutation = MediaAssetsMutationInterface & PaymentMutationInterface & TournamentMutationInterface & {
  __typename?: 'BullsEyeTournamentMutation';
  /** Accept invitation */
  acceptInvitation?: Maybe<Invitation>;
  /** Add default image to the tournament */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** add a location to this tournament */
  addLocation?: Maybe<Tournament>;
  /** Add media assets to the tournament */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Add default requirements for participation to the tournament.Only use 'templateOwner' argument if assigning template from a specific user, otherwise leave blank to use the Trackman global template. */
  addParticipantRequirementsFromDefaultTemplate?: Maybe<Tournament>;
  /** Add a sponsor to the tournament */
  addSponsor?: Maybe<Tournament>;
  /**
   * Allow or disallow participants to improve the score on the leaderboard
   * @deprecated Use changeTournamentNumberOfAttempts instead
   */
  changeAllowMultipleTournamentAttempts?: Maybe<BullsEyeTournament>;
  /** Change the start- and/or end date of the tournament. Must be in UTC time. */
  changeDates?: Maybe<BullsEyeTournament>;
  /** Change the description of the tournament */
  changeDescription?: Maybe<Tournament>;
  /** Change the distance type of the tournament */
  changeDistanceType?: Maybe<BullsEyeTournament>;
  /**
   * Change the end date of the tournament
   * @deprecated Use changeDates instead
   */
  changeEndDate?: Maybe<BullsEyeTournament>;
  /** Change the units used when playing the tournament */
  changeGameUnit?: Maybe<Tournament>;
  /**
   * Change if tournament has end date
   * @deprecated Use changeDates instead
   */
  changeHasEndDate?: Maybe<BullsEyeTournament>;
  /** Allows to extend or reduce the grace period of the tournament leaderboard, to include or exclude records backed up after the tournament has ended, but which were played in the correct date range. */
  changeLeaderboardGracePeriod?: Maybe<BullsEyeTournament>;
  /** change the payment configuration of a location */
  changeLocationPaymentConfiguration?: Maybe<Tournament>;
  /** Change the logo of the tournament */
  changeLogo?: Maybe<Tournament>;
  /** Change the max participants of the location config of the tournament */
  changeMaxParticipants?: Maybe<Tournament>;
  /** Change the name of the tournament */
  changeName?: Maybe<Tournament>;
  /** Change the number of rounds of the tournament */
  changeNumberOfRounds?: Maybe<BullsEyeTournament>;
  /**
   * Change the number of shots per round of the tournament
   * @deprecated Use changeBullsEyeTournamentShotsPerRound instead
   */
  changeShotsPerRound?: Maybe<BullsEyeTournament>;
  /** change the end time of the sign up */
  changeSignUpEndTime?: Maybe<Tournament>;
  /** change the start time of the sign up */
  changeSignUpStartTime?: Maybe<Tournament>;
  /** deSelect all facility locations for this tournament */
  deSelectAllLocations?: Maybe<Tournament>;
  /** Decline invitation */
  declineInvitation?: Maybe<Invitation>;
  /** Delete the tournament */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Disable payment for the tournament. Please note that the existing payment configuration will be deleted. */
  disablePayment?: Maybe<Tournament>;
  /** Enable payment for the tournament. Payment needs to be configured for each location where the tournament is available. */
  enablePayment?: Maybe<Tournament>;
  /** Ends the tournament */
  endTournament?: Maybe<Tournament>;
  /** filter out the locations that are not configured for payment */
  filterOutLocationsNotConfiguredForPayment?: Maybe<Tournament>;
  /** Invite by emails */
  invite?: Maybe<Scalars['Boolean']['output']>;
  /** Join the tournament */
  join?: Maybe<Invitation>;
  /** Join a player to the tournament without the player having to accept an invitation */
  joinPlayer?: Maybe<Invitation>;
  /** Move a tournament and all it's round to a new starting date and time */
  moveStartTime?: Maybe<Tournament>;
  /** Publish the draft as published */
  publish?: Maybe<Tournament>;
  /** Resend invitation */
  reInvite?: Maybe<Invitation>;
  /** Remove all participant groups from the tournament */
  removeAllParticipantGroups?: Maybe<Tournament>;
  /** remove a location from this tournament */
  removeLocation?: Maybe<Tournament>;
  /** Remove media assets from the tournament */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove a participant group from the tournament */
  removeParticipantGroup?: Maybe<Tournament>;
  /** Remove requirements for participation from the tournament */
  removeParticipantRequirements?: Maybe<Tournament>;
  /** Remove a sponsor from the tournament */
  removeSponsor?: Maybe<Tournament>;
  /** Replace the sponsor from the tournament with another sponsor */
  replaceSponsor?: Maybe<Tournament>;
  /** Reset the MaxScoreMethod for all rounds in the order of merit tournament to Default. */
  resetMaxScoringMethodForAllRounds?: Maybe<Tournament>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** The round default mutations */
  roundDefaults?: Maybe<TournamentRoundDefaultsMutation>;
  /** select all facility locations for this tournament */
  selectAllLocations?: Maybe<Tournament>;
  /** Set the tournament availability */
  setAvailability?: Maybe<Tournament>;
  /** Set flag indicating that this is an indoor tournament */
  setIsIndoor?: Maybe<Tournament>;
  /** Set flag indicating that this is a range tournament */
  setIsRange?: Maybe<Tournament>;
  /** Method for updating the key values collections on the tournament */
  setKeyValues?: Maybe<Tournament>;
  /**
   * Add or remove which locations this tournament is available.
   * @deprecated No longer supported.
   */
  setLocations?: Maybe<Tournament>;
  /** Un-publish the published version */
  unPublish?: Maybe<Tournament>;
  /** Add or remove geo filters to the tournament */
  updateGeoFilters?: Maybe<Tournament>;
  /** Update group for participation in the tournament. Renaming an existing group will delete the old group and create a new one.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantGroup?: Maybe<Tournament>;
  /** Update requirements for participation to the tournament.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantRequirements?: Maybe<Tournament>;
  /** Add or remove tags to the tournament */
  updateTags?: Maybe<Tournament>;
  /** Withdraw invitation */
  withdrawInvitation?: Maybe<Invitation>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationAcceptInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationAddLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationAddParticipantRequirementsFromDefaultTemplateArgs = {
  templateOwner?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationAddSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeAllowMultipleTournamentAttemptsArgs = {
  allowMultipleTournamentAttempts: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeDatesArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeDistanceTypeArgs = {
  distanceType: TournamentDistanceType;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeEndDateArgs = {
  endDate: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeGameUnitArgs = {
  unit?: InputMaybe<GameUnit>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeHasEndDateArgs = {
  hasEndDate: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeLeaderboardGracePeriodArgs = {
  syncGracePeriodInMinutes: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeLocationPaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeLogoArgs = {
  logoUrl: Scalars['Url']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeMaxParticipantsArgs = {
  locationId: Scalars['ID']['input'];
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeNumberOfRoundsArgs = {
  numberOfRounds: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeShotsPerRoundArgs = {
  shotsPerRound: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationDeclineInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationInviteArgs = {
  emails: Array<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationJoinPlayerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationMoveStartTimeArgs = {
  newStartTime: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationReInviteArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationRemoveLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationRemoveParticipantGroupArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationRemoveSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationReplaceSponsorArgs = {
  newSponsorId: Scalars['String']['input'];
  oldSponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationSetAvailabilityArgs = {
  availability: TournamentAvailability;
  makeAvailableForAllBays?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationSetIsIndoorArgs = {
  isIndoor: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationSetIsRangeArgs = {
  isRange: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationSetLocationsArgs = {
  addLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  removeLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  selectAll?: InputMaybe<Scalars['Boolean']['input']>;
  setLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationUpdateGeoFiltersArgs = {
  addExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  addIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  field?: InputMaybe<GeoFilterFields>;
  removeExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationUpdateParticipantGroupArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  name: Scalars['String']['input'];
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationUpdateParticipantRequirementsArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationUpdateTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type BullsEyeTournamentMutationWithdrawInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type BullseyeLeaderboardRoundScoreType = {
  __typename?: 'BullseyeLeaderboardRoundScoreType';
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  holeNumber: Scalars['Int']['output'];
  leaderboardPlayerInfo?: Maybe<LeaderboardRecord>;
  leaderboardRoundScore?: Maybe<LeaderboardRoundScore>;
  orderOfMeritInfo?: Maybe<LeaderboardOrderOfMeritInfo>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  roundNumber?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  seasonActivityType?: Maybe<SeasonActivityEventType>;
  state: TournamentPlayerRoundState;
  tournamentKind?: Maybe<Scalars['String']['output']>;
  tournamentRound?: Maybe<TournamentRound>;
};

export type CalculateTeamHandicapInput = {
  players: Array<InputMaybe<CalculateTeamHandicapPlayerInput>>;
};

export type CalculateTeamHandicapPlayerInput = {
  hcp?: InputMaybe<Scalars['Float']['input']>;
  playerId: Scalars['ID']['input'];
};

export type Camera = {
  __typename?: 'Camera';
  fieldOfView: Scalars['Float']['output'];
  lookAt?: Maybe<Array<Scalars['Float']['output']>>;
  position?: Maybe<Array<Scalars['Float']['output']>>;
  roll: Scalars['Float']['output'];
  up?: Maybe<Array<Scalars['Float']['output']>>;
};

export type CameraConfiguration = {
  __typename?: 'CameraConfiguration';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  tiltPanRoll?: Maybe<Array<Scalars['Float']['output']>>;
  translation?: Maybe<Array<Scalars['Float']['output']>>;
};

export type CanNotChangePayPerEnableStatusAfterPublishError = BaseError & {
  __typename?: 'CanNotChangePayPerEnableStatusAfterPublishError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CanNotChangeThisWhenTournamentIsAlreadyPublishedError = BaseError & {
  __typename?: 'CanNotChangeThisWhenTournamentIsAlreadyPublishedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CanOnlyChangeBaySelectionForGuestTournamentError = BaseError & {
  __typename?: 'CanOnlyChangeBaySelectionForGuestTournamentError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CanOnlyEnablePayPerEntryForPaidTournamentError = BaseError & {
  __typename?: 'CanOnlyEnablePayPerEntryForPaidTournamentError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CancelBaysTimerError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type CancelBaysTimerInput = {
  bayIds: Array<Scalars['ID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type CancelBaysTimerPayload = {
  __typename?: 'CancelBaysTimerPayload';
  errors?: Maybe<Array<CancelBaysTimerError>>;
  result?: Maybe<AppMutationResult>;
};

export enum Category {
  All = 'ALL',
  Amateur = 'AMATEUR',
  Professional = 'PROFESSIONAL'
}

export type ChangeBaysLocationError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeBaysLocationInput = {
  bayIds: Array<Scalars['ID']['input']>;
  locationId: Scalars['ID']['input'];
};

export type ChangeBaysLocationPayload = {
  __typename?: 'ChangeBaysLocationPayload';
  errors?: Maybe<Array<ChangeBaysLocationError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeBullsEyeHoleOptionError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeBullsEyeHoleOptionInput = {
  id: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
};

export type ChangeBullsEyeHoleOptionPayload = {
  __typename?: 'ChangeBullsEyeHoleOptionPayload';
  bullsEyeTournament?: Maybe<BullsEyeTournament>;
  errors?: Maybe<Array<ChangeBullsEyeHoleOptionError>>;
};

export type ChangeBullsEyeTournamentCourseError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeBullsEyeTournamentCourseInput = {
  courseIdentifier: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type ChangeBullsEyeTournamentCoursePayload = {
  __typename?: 'ChangeBullsEyeTournamentCoursePayload';
  bullsEyeTournament?: Maybe<BullsEyeTournament>;
  errors?: Maybe<Array<ChangeBullsEyeTournamentCourseError>>;
};

export type ChangeBullsEyeTournamentHoleOptionsError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeBullsEyeTournamentHoleOptionsInput = {
  id: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
};

export type ChangeBullsEyeTournamentHoleOptionsPayload = {
  __typename?: 'ChangeBullsEyeTournamentHoleOptionsPayload';
  bullsEyeTournament?: Maybe<BullsEyeTournament>;
  errors?: Maybe<Array<ChangeBullsEyeTournamentHoleOptionsError>>;
};

export type ChangeBullsEyeTournamentShotsPerRoundError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeBullsEyeTournamentShotsPerRoundInput = {
  id: Scalars['ID']['input'];
  shotsPerRound: Scalars['Int']['input'];
};

export type ChangeBullsEyeTournamentShotsPerRoundPayload = {
  __typename?: 'ChangeBullsEyeTournamentShotsPerRoundPayload';
  bullsEyeTournament?: Maybe<BullsEyeTournament>;
  errors?: Maybe<Array<ChangeBullsEyeTournamentShotsPerRoundError>>;
};

export type ChangeRangeBayAvailabilityError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeRangeBayAvailabilityInput = {
  availability: BayAvailability;
  bayIds: Array<Scalars['ID']['input']>;
};

export type ChangeRangeBayAvailabilityPayload = {
  __typename?: 'ChangeRangeBayAvailabilityPayload';
  errors?: Maybe<Array<ChangeRangeBayAvailabilityError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeRangeBayKioskOnlyFlagError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeRangeBayKioskOnlyFlagInput = {
  bayIds: Array<Scalars['ID']['input']>;
  isKioskOnly: Scalars['Boolean']['input'];
};

export type ChangeRangeBayKioskOnlyFlagPayload = {
  __typename?: 'ChangeRangeBayKioskOnlyFlagPayload';
  errors?: Maybe<Array<ChangeRangeBayKioskOnlyFlagError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeRangeBayLabelsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeRangeBayLabelsInput = {
  bayIds: Array<Scalars['ID']['input']>;
  labelIdsToAdd: Array<Scalars['ID']['input']>;
  labelIdsToRemove: Array<Scalars['ID']['input']>;
};

export type ChangeRangeBayLabelsPayload = {
  __typename?: 'ChangeRangeBayLabelsPayload';
  errors?: Maybe<Array<ChangeRangeBayLabelsError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeRangeTargetsColorError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeRangeTargetsColorInput = {
  color: Scalars['String']['input'];
  targetIds: Array<Scalars['ID']['input']>;
};

export type ChangeRangeTargetsColorPayload = {
  __typename?: 'ChangeRangeTargetsColorPayload';
  errors?: Maybe<Array<ChangeRangeTargetsColorError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeRangeTargetsTypeError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeRangeTargetsTypeInput = {
  targetIds: Array<Scalars['ID']['input']>;
  type: Type;
};

export type ChangeRangeTargetsTypePayload = {
  __typename?: 'ChangeRangeTargetsTypePayload';
  errors?: Maybe<Array<ChangeRangeTargetsTypeError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeRangeTargetsVisibilityError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeRangeTargetsVisibilityInput = {
  isHidden: Scalars['Boolean']['input'];
  targetIds: Array<Scalars['ID']['input']>;
};

export type ChangeRangeTargetsVisibilityPayload = {
  __typename?: 'ChangeRangeTargetsVisibilityPayload';
  errors?: Maybe<Array<ChangeRangeTargetsVisibilityError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeSeasonActivityLeaderboardDefinitionInput = {
  /** the oom leaderboard parameters */
  oomLeaderboardParameters?: InputMaybe<LeaderboardParametersInput>;
};

export type ChangeSeasonBullsEyeActivityCourseError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonBullsEyeActivityCourseInput = {
  courseIdentifier: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type ChangeSeasonBullsEyeActivityCoursePayload = {
  __typename?: 'ChangeSeasonBullsEyeActivityCoursePayload';
  errors?: Maybe<Array<ChangeSeasonBullsEyeActivityCourseError>>;
  result?: Maybe<SeasonBullsEyeActivity>;
};

export type ChangeSeasonBullsEyeActivityHoleOptionsError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonBullsEyeActivityHoleOptionsInput = {
  id: Scalars['ID']['input'];
  identifier: Scalars['String']['input'];
};

export type ChangeSeasonBullsEyeActivityHoleOptionsPayload = {
  __typename?: 'ChangeSeasonBullsEyeActivityHoleOptionsPayload';
  errors?: Maybe<Array<ChangeSeasonBullsEyeActivityHoleOptionsError>>;
  result?: Maybe<SeasonBullsEyeActivity>;
};

export type ChangeSeasonBullsEyeActivityShotsPerRoundError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonBullsEyeActivityShotsPerRoundInput = {
  id: Scalars['ID']['input'];
  shotsPerRound: Scalars['Int']['input'];
};

export type ChangeSeasonBullsEyeActivityShotsPerRoundPayload = {
  __typename?: 'ChangeSeasonBullsEyeActivityShotsPerRoundPayload';
  errors?: Maybe<Array<ChangeSeasonBullsEyeActivityShotsPerRoundError>>;
  result?: Maybe<SeasonBullsEyeActivity>;
};

export type ChangeSeasonTournamentActivityFairwayFirmnessError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonTournamentActivityFairwayFirmnessInput = {
  fairwayFirmness?: InputMaybe<Firmness>;
  id: Scalars['ID']['input'];
};

export type ChangeSeasonTournamentActivityFairwayFirmnessPayload = {
  __typename?: 'ChangeSeasonTournamentActivityFairwayFirmnessPayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityFairwayFirmnessError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeSeasonTournamentActivityGreenFirmnessError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonTournamentActivityGreenFirmnessInput = {
  greenFirmness?: InputMaybe<Firmness>;
  id: Scalars['ID']['input'];
};

export type ChangeSeasonTournamentActivityGreenFirmnessPayload = {
  __typename?: 'ChangeSeasonTournamentActivityGreenFirmnessPayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityGreenFirmnessError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeSeasonTournamentActivityHcpKindError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonTournamentActivityHcpKindInput = {
  hcpKind: HcpKind;
  id: Scalars['ID']['input'];
};

export type ChangeSeasonTournamentActivityHcpKindPayload = {
  __typename?: 'ChangeSeasonTournamentActivityHcpKindPayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityHcpKindError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeSeasonTournamentActivityHolesError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NotSupportedError;

export type ChangeSeasonTournamentActivityHolesInput = {
  holesToPlay: HolesToPlay;
  id: Scalars['ID']['input'];
  specifiedHoles?: InputMaybe<Array<Scalars['PositiveInt']['input']>>;
};

export type ChangeSeasonTournamentActivityHolesPayload = {
  __typename?: 'ChangeSeasonTournamentActivityHolesPayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityHolesError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeSeasonTournamentActivityNumberOfAttemptsError = DefaultError | EntityNotFoundError;

export type ChangeSeasonTournamentActivityNumberOfAttemptsInput = {
  attempts: Scalars['PositiveInt']['input'];
  id: Scalars['ID']['input'];
};

export type ChangeSeasonTournamentActivityNumberOfAttemptsPayload = {
  __typename?: 'ChangeSeasonTournamentActivityNumberOfAttemptsPayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityNumberOfAttemptsError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeSeasonTournamentActivityTeeError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError | NotSupportedError;

export type ChangeSeasonTournamentActivityTeeInput = {
  id: Scalars['ID']['input'];
  tee: Scalars['String']['input'];
  teeCategory: TeeCategory;
};

export type ChangeSeasonTournamentActivityTeePayload = {
  __typename?: 'ChangeSeasonTournamentActivityTeePayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityTeeError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeSeasonTournamentActivityWindSpeedError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeSeasonTournamentActivityWindSpeedInput = {
  id: Scalars['ID']['input'];
  windSpeed?: InputMaybe<WindMode>;
};

export type ChangeSeasonTournamentActivityWindSpeedPayload = {
  __typename?: 'ChangeSeasonTournamentActivityWindSpeedPayload';
  errors?: Maybe<Array<ChangeSeasonTournamentActivityWindSpeedError>>;
  result?: Maybe<SeasonTournamentActivityInterface>;
};

export type ChangeTargetLabelsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type ChangeTargetLabelsInput = {
  labelIdsToAdd: Array<Scalars['ID']['input']>;
  labelIdsToRemove: Array<Scalars['ID']['input']>;
  targetIds: Array<Scalars['ID']['input']>;
};

export type ChangeTargetLabelsPayload = {
  __typename?: 'ChangeTargetLabelsPayload';
  errors?: Maybe<Array<ChangeTargetLabelsError>>;
  result?: Maybe<AppMutationResult>;
};

export type ChangeTeamColorError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type ChangeTeamColorInput = {
  color: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type ChangeTeamColorPayload = {
  __typename?: 'ChangeTeamColorPayload';
  errors?: Maybe<Array<ChangeTeamColorError>>;
  team?: Maybe<TeamInterface>;
};

export type ChangeTeamIconError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type ChangeTeamIconInput = {
  icon: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type ChangeTeamIconPayload = {
  __typename?: 'ChangeTeamIconPayload';
  errors?: Maybe<Array<ChangeTeamIconError>>;
  team?: Maybe<TeamInterface>;
};

export type ChangeTeamNameError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type ChangeTeamNameInput = {
  teamId: Scalars['ID']['input'];
  teamName: Scalars['String']['input'];
};

export type ChangeTeamNamePayload = {
  __typename?: 'ChangeTeamNamePayload';
  errors?: Maybe<Array<ChangeTeamNameError>>;
  team?: Maybe<TeamInterface>;
};

export type ChangeTournamentDateRangeError = DefaultError | EntityNotFoundError | InvalidStartDateAndEndDateTournamentError | MissingMandatoryFieldError;

export type ChangeTournamentDateRangeInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  /** If the tournament is a course tournament, a round Id is required, otherwise it can be null */
  roundId?: InputMaybe<Scalars['ID']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type ChangeTournamentDateRangePayload = {
  __typename?: 'ChangeTournamentDateRangePayload';
  errors?: Maybe<Array<ChangeTournamentDateRangeError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeTournamentFairwayFirmnessError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type ChangeTournamentFairwayFirmnessInput = {
  fairwayFirmness?: InputMaybe<Firmness>;
  id: Scalars['ID']['input'];
  /** If the tournament is a course tournament, a round Id is required, otherwise it can be null */
  roundId?: InputMaybe<Scalars['ID']['input']>;
};

export type ChangeTournamentFairwayFirmnessPayload = {
  __typename?: 'ChangeTournamentFairwayFirmnessPayload';
  errors?: Maybe<Array<ChangeTournamentFairwayFirmnessError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeTournamentGreenFirmnessError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type ChangeTournamentGreenFirmnessInput = {
  greenFirmness?: InputMaybe<Firmness>;
  id: Scalars['ID']['input'];
  /** If the tournament is a course tournament, a round Id is required, otherwise it can be null */
  roundId?: InputMaybe<Scalars['ID']['input']>;
};

export type ChangeTournamentGreenFirmnessPayload = {
  __typename?: 'ChangeTournamentGreenFirmnessPayload';
  errors?: Maybe<Array<ChangeTournamentGreenFirmnessError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeTournamentHcpKindError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type ChangeTournamentHcpKindInput = {
  hcpKind: HcpKind;
  id: Scalars['ID']['input'];
};

export type ChangeTournamentHcpKindPayload = {
  __typename?: 'ChangeTournamentHcpKindPayload';
  errors?: Maybe<Array<ChangeTournamentHcpKindError>>;
  result?: Maybe<Tournament>;
};

export type ChangeTournamentHolesError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NotSupportedError;

export type ChangeTournamentHolesInput = {
  holesToPlay: HolesToPlay;
  id: Scalars['ID']['input'];
  /** If the tournament is a course tournament, a round Id is required, otherwise it can be null */
  roundId?: InputMaybe<Scalars['ID']['input']>;
  specifiedHoles?: InputMaybe<Array<Scalars['PositiveInt']['input']>>;
};

export type ChangeTournamentHolesPayload = {
  __typename?: 'ChangeTournamentHolesPayload';
  errors?: Maybe<Array<ChangeTournamentHolesError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeTournamentNumberOfAttemptsError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type ChangeTournamentNumberOfAttemptsInput = {
  id: Scalars['ID']['input'];
  numberOfAttempts: Scalars['NonNegativeInt']['input'];
};

export type ChangeTournamentNumberOfAttemptsPayload = {
  __typename?: 'ChangeTournamentNumberOfAttemptsPayload';
  errors?: Maybe<Array<ChangeTournamentNumberOfAttemptsError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeTournamentTeeError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError | NotSupportedError;

export type ChangeTournamentTeeInput = {
  id: Scalars['ID']['input'];
  /** If the tournament is a course tournament, a round Id is required, otherwise it can be null */
  roundId?: InputMaybe<Scalars['ID']['input']>;
  tee: Scalars['String']['input'];
  teeCategory: TeeCategory;
};

export type ChangeTournamentTeePayload = {
  __typename?: 'ChangeTournamentTeePayload';
  errors?: Maybe<Array<ChangeTournamentTeeError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeTournamentWindSpeedError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type ChangeTournamentWindSpeedInput = {
  id: Scalars['ID']['input'];
  /** If the tournament is a course tournament, a round Id is required, otherwise it can be null */
  roundId?: InputMaybe<Scalars['ID']['input']>;
  windSpeed?: InputMaybe<WindMode>;
};

export type ChangeTournamentWindSpeedPayload = {
  __typename?: 'ChangeTournamentWindSpeedPayload';
  errors?: Maybe<Array<ChangeTournamentWindSpeedError>>;
  tournament?: Maybe<Tournament>;
};

export type ChangeUserBirthDateError = DefaultError | InvalidBirthDateError;

export type ChangeUserBirthDateInput = {
  dateOfBirth: Scalars['Date']['input'];
};

export type ChangeUserBirthDatePayload = {
  __typename?: 'ChangeUserBirthDatePayload';
  errors?: Maybe<Array<ChangeUserBirthDateError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserCategoryError = DefaultError;

export type ChangeUserCategoryInput = {
  category: PlayerCategory;
};

export type ChangeUserCategoryPayload = {
  __typename?: 'ChangeUserCategoryPayload';
  errors?: Maybe<Array<ChangeUserCategoryError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserEmailError = DefaultError | MissingMandatoryFieldError;

export type ChangeUserEmailInput = {
  email: Scalars['EmailAddress']['input'];
};

export type ChangeUserEmailPayload = {
  __typename?: 'ChangeUserEmailPayload';
  errors?: Maybe<Array<ChangeUserEmailError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserFirstNameError = DefaultError;

export type ChangeUserFirstNameInput = {
  firstName: Scalars['NonEmptyString']['input'];
};

export type ChangeUserFirstNamePayload = {
  __typename?: 'ChangeUserFirstNamePayload';
  errors?: Maybe<Array<ChangeUserFirstNameError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserGenderError = DefaultError;

export type ChangeUserGenderInput = {
  gender: Gender;
};

export type ChangeUserGenderPayload = {
  __typename?: 'ChangeUserGenderPayload';
  errors?: Maybe<Array<ChangeUserGenderError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserLastNameError = DefaultError;

export type ChangeUserLastNameInput = {
  lastName: Scalars['NonEmptyString']['input'];
};

export type ChangeUserLastNamePayload = {
  __typename?: 'ChangeUserLastNamePayload';
  errors?: Maybe<Array<ChangeUserLastNameError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserNationalityError = DefaultError;

export type ChangeUserNationalityInput = {
  nationalityCode: Scalars['NonEmptyString']['input'];
};

export type ChangeUserNationalityPayload = {
  __typename?: 'ChangeUserNationalityPayload';
  errors?: Maybe<Array<ChangeUserNationalityError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserOutdoorHandicapError = DefaultError;

export type ChangeUserOutdoorHandicapInput = {
  handicap: Scalars['Float']['input'];
};

export type ChangeUserOutdoorHandicapPayload = {
  __typename?: 'ChangeUserOutdoorHandicapPayload';
  errors?: Maybe<Array<ChangeUserOutdoorHandicapError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserPasswordError = DefaultError | MissingMandatoryFieldError;

export type ChangeUserPasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ChangeUserPasswordPayload = {
  __typename?: 'ChangeUserPasswordPayload';
  errors?: Maybe<Array<ChangeUserPasswordError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserPlayerNameError = DefaultError | DuplicatePlayerNameError | MissingMandatoryFieldError;

export type ChangeUserPlayerNameInput = {
  playerName: Scalars['NonEmptyString']['input'];
};

export type ChangeUserPlayerNamePayload = {
  __typename?: 'ChangeUserPlayerNamePayload';
  errors?: Maybe<Array<ChangeUserPlayerNameError>>;
  profile?: Maybe<Profile>;
};

export type ChangeUserSearchabilityError = DefaultError;

export type ChangeUserSearchabilityInput = {
  level: AllowProfileSearch;
};

export type ChangeUserSearchabilityPayload = {
  __typename?: 'ChangeUserSearchabilityPayload';
  errors?: Maybe<Array<ChangeUserSearchabilityError>>;
  profile?: Maybe<Profile>;
};

export type ClaimSearchCriteria = {
  type?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CleanupMembershipsResult = {
  __typename?: 'CleanupMembershipsResult';
  recordsRemoved: Scalars['UnsignedLong']['output'];
};

export type CleanupOldMembershipsError = DefaultError;

export type CleanupOldMembershipsPayload = {
  __typename?: 'CleanupOldMembershipsPayload';
  errors?: Maybe<Array<CleanupOldMembershipsError>>;
  result?: Maybe<CleanupMembershipsResult>;
};

export type ClearFindMyDistanceShotsError = DefaultError | MissingMandatoryFieldError;

export type ClearFindMyDistanceShotsPayload = {
  __typename?: 'ClearFindMyDistanceShotsPayload';
  errors?: Maybe<Array<ClearFindMyDistanceShotsError>>;
  result?: Maybe<Array<Maybe<Club>>>;
};

export type Client = {
  __typename?: 'Client';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  name?: Maybe<Scalars['String']['output']>;
  operatingSystem?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type ClientSessionNetIncident = {
  __typename?: 'ClientSessionNetIncident';
  totalCount: Scalars['Int']['output'];
};

export type ClientSessionStroke = {
  __typename?: 'ClientSessionStroke';
  totalCount: Scalars['Int']['output'];
};

/** Client type */
export type ClientType = {
  __typename?: 'ClientType';
  /** Name of the client type */
  name?: Maybe<Scalars['ID']['output']>;
  /** Version of the client type */
  version?: Maybe<Scalars['String']['output']>;
};

export type ClosestToPin = {
  __typename?: 'ClosestToPin';
  records?: Maybe<RoundLeaderboardClosestToPinRecordTypeCollectionSegment>;
  selectedPlayers?: Maybe<Array<RoundLeaderboardClosestToPinRecordType>>;
};


export type ClosestToPinRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type ClosestToPinSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type ClosestToPinGameSettings = {
  __typename?: 'ClosestToPinGameSettings';
  /** The attempt that is shown on the leaderboard */
  attemptsOnLeaderboard?: Maybe<Scalars['String']['output']>;
  /** The attempts per round */
  attemptsPerRound?: Maybe<Scalars['Int']['output']>;
  /** The fairway firmness */
  fairwayFirmness?: Maybe<Firmness>;
  /** The gimme distance */
  gimmeDistance?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** The green firmness */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp for the round */
  greenStimp?: Maybe<Stimp>;
  /** The lighting on the course when the round is played */
  lighting?: Maybe<Lighting>;
  /** Mulligans */
  mulligans?: Maybe<Mulligans>;
  /** The pin difficulty */
  pinDifficulty?: Maybe<Pin>;
  /** The putting mode */
  puttingMode?: Maybe<PuttMode>;
  /** The wind mode */
  windSpeed?: Maybe<WindMode>;
};

export type ClosestToPinLeaderboard = {
  __typename?: 'ClosestToPinLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<ClosestToPinLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<ClosestToPinLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type ClosestToPinLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type ClosestToPinLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type ClosestToPinLeaderboardHoleScoreWithoutPosType = {
  __typename?: 'ClosestToPinLeaderboardHoleScoreWithoutPosType';
  /** The total distance for the shot */
  distance?: Maybe<Scalars['Float']['output']>;
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  distanceToPinWithPenalty?: Maybe<Scalars['Float']['output']>;
  /** The hole */
  hole?: Maybe<ScorecardHole>;
  /** The hole played for this result */
  holeNumber: Scalars['Int']['output'];
  /** The finishing lie for the shot */
  lie?: Maybe<Scalars['String']['output']>;
  /** The penalty for the shot (if any) */
  penalty?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
};

export type ClosestToPinLeaderboardRecord = {
  __typename?: 'ClosestToPinLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** The average score */
  average?: Maybe<ClosestToPinLeaderboardTotalScore>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** The holes played in the tournament */
  holes?: Maybe<Array<ClosestToPinLeaderboardRoundScoreType>>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  score?: Maybe<ClosestToPinLeaderboardRoundScoreType>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  /** The total score */
  total?: Maybe<ClosestToPinLeaderboardTotalScore>;
};

/** A segment of a collection. */
export type ClosestToPinLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'ClosestToPinLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ClosestToPinLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ClosestToPinLeaderboardRoundScoreType = {
  __typename?: 'ClosestToPinLeaderboardRoundScoreType';
  /** The total distance for the shot */
  distance?: Maybe<Scalars['Float']['output']>;
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  distanceToPinWithPenalty?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  /** The hole */
  hole?: Maybe<ScorecardHole>;
  /** The hole played for this result */
  holeNumber: Scalars['Int']['output'];
  /** The finishing lie for the shot */
  lie?: Maybe<Scalars['String']['output']>;
  /** The penalty for the shot (if any) */
  penalty?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
};

export type ClosestToPinLeaderboardTotalScore = {
  __typename?: 'ClosestToPinLeaderboardTotalScore';
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  distanceToPinWithPenalty?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
};

/** The tournament description */
export type ClosestToPinTournament = KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'ClosestToPinTournament';
  /**
   * Allow the participants to retry the tournament and improve the score.
   * @deprecated Use tournament.settings.attempts instead
   */
  allowMultipleTournamentAttempts?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** The number of attempts on each hole in the tournament. */
  attempts?: Maybe<Scalars['PositiveInt']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The holes available for the tournament */
  availableHoles?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The course used for the tournament */
  course?: Maybe<Course>;
  /** Course Instance Id, for Range */
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** The tee selected for female players in the tournament. */
  femaleTee?: Maybe<Scalars['String']['output']>;
  /** Game settings */
  gameSettings?: Maybe<ClosestToPinGameSettings>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The holes selected for the tournament. */
  holes?: Maybe<Array<Maybe<TournamentHole>>>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<ClosestToPinLeaderboard>;
  links?: Maybe<Array<LinkKeyValue>>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The tee selected for male players in the tournament. */
  maleTee?: Maybe<Scalars['String']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** Tell what score is used to generate the leaderboard for the tournament. */
  scoreOptions?: Maybe<ScoreOptions>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The default tee selected in the tournament */
  tee?: Maybe<Scalars['String']['output']>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type ClosestToPinTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type ClosestToPinTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type ClosestToPinTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type ClosestToPinTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type ClosestToPinTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
};


/** The tournament description */
export type ClosestToPinTournamentLinksArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  includeDescriptionFile?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  serialNo?: InputMaybe<Scalars['String']['input']>;
};


/** The tournament description */
export type ClosestToPinTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type ClosestToPinTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type ClosestToPinTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** The activity is created when a Simulator Closest To The Pin game have been played */
export type ClosestToThePinActivity = Node & PlayerActivity & {
  __typename?: 'ClosestToThePinActivity';
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type Club = Node & {
  __typename?: 'Club';
  /** The manufacture of the club */
  brand?: Maybe<EquipmentBrand>;
  /** The club head of the club */
  clubHead?: Maybe<ClubHead>;
  /** The database id of the club */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The display name of the club */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The 'Find My Distance' information for this club */
  findMyDistance?: Maybe<FindMyDistance>;
  id: Scalars['ID']['output'];
  /** Is the club retired */
  isRetired?: Maybe<Scalars['Boolean']['output']>;
};


export type ClubFindMyDistanceArgs = {
  latlon?: InputMaybe<LatLonInputType>;
  weatherConditions?: InputMaybe<WeatherConditionsInputType>;
};

export type ClubConfiguration = {
  __typename?: 'ClubConfiguration';
  ballCompression: Scalars['Float']['output'];
  bulge: Scalars['Float']['output'];
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  hoselOffset?: Maybe<Array<Scalars['Float']['output']>>;
  roll: Scalars['Float']['output'];
  staticLie: Scalars['Float']['output'];
  staticLoft: Scalars['Float']['output'];
};

export type ClubData = {
  __typename?: 'ClubData';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  hoselPoint?: Maybe<HoselPoint>;
  kind?: Maybe<Scalars['String']['output']>;
  lie: Scalars['Float']['output'];
  loft: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum ClubEnum {
  Driver = 'DRIVER',
  Hybrid1 = 'HYBRID1',
  Hybrid2 = 'HYBRID2',
  Hybrid3 = 'HYBRID3',
  Hybrid4 = 'HYBRID4',
  Hybrid5 = 'HYBRID5',
  Hybrid6 = 'HYBRID6',
  Hybrid7 = 'HYBRID7',
  Hybrid8 = 'HYBRID8',
  Hybrid9 = 'HYBRID9',
  Iron1 = 'IRON1',
  Iron2 = 'IRON2',
  Iron3 = 'IRON3',
  Iron4 = 'IRON4',
  Iron5 = 'IRON5',
  Iron6 = 'IRON6',
  Iron7 = 'IRON7',
  Iron8 = 'IRON8',
  Iron9 = 'IRON9',
  LobWedge = 'LOB_WEDGE',
  PitchingWedge = 'PITCHING_WEDGE',
  Putter = 'PUTTER',
  SandWedge = 'SAND_WEDGE',
  Unknown = 'UNKNOWN',
  Wedge50 = 'WEDGE50',
  Wedge52 = 'WEDGE52',
  Wedge54 = 'WEDGE54',
  Wedge56 = 'WEDGE56',
  Wedge58 = 'WEDGE58',
  Wedge60 = 'WEDGE60',
  Wood2 = 'WOOD2',
  Wood3 = 'WOOD3',
  Wood4 = 'WOOD4',
  Wood5 = 'WOOD5',
  Wood6 = 'WOOD6',
  Wood7 = 'WOOD7',
  Wood8 = 'WOOD8',
  Wood9 = 'WOOD9'
}

export type ClubHead = {
  __typename?: 'ClubHead';
  /** The kind of the club head */
  clubHeadKind?: Maybe<ClubHeadKindEnum>;
  /** The type of the club head */
  clubHeadType?: Maybe<ClubEnum>;
  /**
   * The kind of the club head
   * @deprecated Use clubHeadKind
   */
  kind?: Maybe<Scalars['String']['output']>;
  /**
   * The type of the club head
   * @deprecated Use clubHeadType
   */
  type?: Maybe<Scalars['String']['output']>;
};

/** All supported club head kinds */
export enum ClubHeadKindEnum {
  Hybrid = 'HYBRID',
  Iron = 'IRON',
  Putter = 'PUTTER',
  Wedge = 'WEDGE',
  Wood = 'WOOD'
}

export type ClubHeadTypeNotSupportedError = BaseError & {
  __typename?: 'ClubHeadTypeNotSupportedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ClubIdMissingError = BaseError & {
  __typename?: 'ClubIdMissingError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ClubStatistic = {
  __typename?: 'ClubStatistic';
  /** The avg carry distance for the club based on the Map My Bag shots */
  carry?: Maybe<Scalars['Float']['output']>;
  /** The std deviation on carry distance for the club based on the Map My Bag shots */
  standardDeviationCarry?: Maybe<Scalars['Float']['output']>;
  /** The std deviation on total distance for the club based on the Map My Bag shots */
  standardDeviationTotal?: Maybe<Scalars['Float']['output']>;
  /** The avg total distance for the club based on the Map My Bag shots */
  total?: Maybe<Scalars['Float']['output']>;
};

export type CoachDataSharingPartnerConsent = ConsentInterfaceType & {
  __typename?: 'CoachDataSharingPartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type CoachProfile = Node & {
  __typename?: 'CoachProfile';
  bio?: Maybe<Scalars['String']['output']>;
  bookingUrl?: Maybe<Scalars['URL']['output']>;
  /** The email of the coach */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locations?: Maybe<Array<LocationInterfaceType>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** The URL to the profile picture */
  profilePictureUrl?: Maybe<Scalars['URL']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  webSiteUrl?: Maybe<Scalars['URL']['output']>;
};


export type CoachProfileEmailArgs = {
  combineWithPlayerEmail?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CoachProfileProfilePictureUrlArgs = {
  combineWithPlayerPicture?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CoachStudent = Node & {
  __typename?: 'CoachStudent';
  /** Activities connected to a person */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** When the coach was last visited */
  lastVisitTime?: Maybe<Scalars['DateTime']['output']>;
  /** Information available for this player */
  player?: Maybe<PersonInfo>;
  /** Number of days the coach has visited */
  visitCount?: Maybe<Scalars['Int']['output']>;
};


export type CoachStudentActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A segment of a collection. */
export type CoachStudentTypeCollectionSegment = {
  __typename?: 'CoachStudentTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<CoachStudent>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type CombineLeaderboard = {
  __typename?: 'CombineLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<CombineLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type CombineLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CombineLeaderboardRecord = {
  __typename?: 'CombineLeaderboardRecord';
  activity?: Maybe<CombineTestActivity>;
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  /** The total score */
  score?: Maybe<Scalars['Float']['output']>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
};

/** A segment of a collection. */
export type CombineLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'CombineLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<CombineLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CombineTestActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'CombineTestActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  bestDeci: Scalars['Int']['output'];
  /** The best target of the Combine Test */
  bestTarget?: Maybe<Scalars['String']['output']>;
  dynamicReportPath?: Maybe<Scalars['URL']['output']>;
  /**
   * 
   *                         The estimated Hcp based on the Combine Test Score. 
   *                         Note: positive numbers should be displayed as is, negative numbers should be displayed as +, so: -4 should be displayed as '+4' and 7 should be displayed as '7'.
   *                         -5 should be displayed as '+5 or below' and 36 should be displayed as '36 or above'
   */
  estimatedHcp?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  longestDrive: Scalars['Float']['output'];
  maxClubSpeed: Scalars['Float']['output'];
  numberOfStrokesAboveBestDeci: Scalars['Int']['output'];
  /** The player that created the activity */
  player?: Maybe<Profile>;
  score: Scalars['Float']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Combine test result */
  testResult?: Maybe<TestResult>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** The unit of the Combine Test */
  unit?: Maybe<Scalars['String']['output']>;
};


export type CombineTestActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CombineTestActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
};

/** The mode for the combine test */
export enum CombineTestMode {
  All = 'ALL',
  Indoor = 'INDOOR',
  Outdoor = 'OUTDOOR'
}

/** The target for the combine test */
export enum CombineTestTarget {
  Drive = 'DRIVE',
  Total = 'TOTAL',
  Yard60 = 'YARD60',
  Yard70 = 'YARD70',
  Yard80 = 'YARD80',
  Yard90 = 'YARD90',
  Yard100 = 'YARD100',
  Yard120 = 'YARD120',
  Yard140 = 'YARD140',
  Yard160 = 'YARD160',
  Yard180 = 'YARD180'
}

/** Compass */
export enum Compass {
  E = 'E',
  N = 'N',
  Ne = 'NE',
  Nw = 'NW',
  S = 'S',
  Se = 'SE',
  Sw = 'SW',
  W = 'W'
}

export type ConcurrencyViolationError = BaseError & {
  __typename?: 'ConcurrencyViolationError';
  code?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ConfigurationNotModifiableError = BaseError & {
  __typename?: 'ConfigurationNotModifiableError';
  code?: Maybe<Scalars['String']['output']>;
  configurationId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ConnectionNotFoundError = BaseError & {
  __typename?: 'ConnectionNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ConsentInterfaceType = {
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. This consent will show up to a user until one is accepted */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated Try to use kind
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The kind of the partner's consent (Enum Value) */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalizedIterfaceType>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

/** ConsentKind */
export enum ConsentKind {
  Age = 'AGE',
  CoachDataSharing = 'COACH_DATA_SHARING',
  Marketing = 'MARKETING',
  PrivacyPolicy = 'PRIVACY_POLICY',
  SwingDataProcessing = 'SWING_DATA_PROCESSING',
  TermsAndConditions = 'TERMS_AND_CONDITIONS',
  Waiver = 'WAIVER'
}

export type CoordinatesType = {
  __typename?: 'CoordinatesType';
  /** X,Y,Z position based on the site coordinate system */
  sitePoint?: Maybe<Point3D>;
  /** The location based on the world latitude and longitude */
  worldPoint?: Maybe<LatLonAlt>;
};

export enum CountryNameFormat {
  EnglishName = 'ENGLISH_NAME',
  NativeName = 'NATIVE_NAME'
}

/** Metadata for a virtual Golf Course */
export type Course = Node & {
  __typename?: 'Course';
  /** The course available from this date */
  availableFromDate?: Maybe<Scalars['DateTime']['output']>;
  /** The course available until this date */
  availableUntilDate?: Maybe<Scalars['DateTime']['output']>;
  /** Unique name of the course */
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  /** The ID of the course instance, if applicable */
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  /** The name of the course */
  courseLocation?: Maybe<Scalars['String']['output']>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The default tee for male and females */
  defaultTees?: Maybe<DefaultTees>;
  /** Short description of the Golf course */
  description?: Maybe<Scalars['String']['output']>;
  /** the description file for the course */
  descriptionFileJson?: Maybe<Scalars['AnyWithJObject']['output']>;
  /** The difficulty of the course from 1 to 5 where 1 is easy */
  difficulty?: Maybe<Scalars['Int']['output']>;
  /** The name of Golf course */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The course environment */
  environment?: Maybe<Environment>;
  /** The defined game option for the course. Right now only works for bullseye courses */
  gameOption?: Maybe<CourseGameOption>;
  /** The holes on the course */
  holes?: Maybe<Array<CourseHole>>;
  id: Scalars['ID']['output'];
  /** Course image. The default is the Splash image, but with the argument kind you can get others */
  image?: Maybe<MediaResource>;
  /** List all kinds of course images */
  images?: Maybe<Array<Maybe<MediaResource>>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The number of holes */
  numbersOfHoles?: Maybe<Scalars['Int']['output']>;
  /** Performance properties for the course binary version, such as VRAM usage. */
  performance?: Maybe<CoursePerformance>;
  resource?: Maybe<MetadataResource>;
  /** Get the scorecard template for current course based on either gender and handicap, or the player id */
  scorecardTemplate?: Maybe<ScorecardTemplate>;
  /** Can the course be selected in the Tournament editor */
  selectable: Scalars['Boolean']['output'];
  /** Course tags */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The default tee on the course */
  tee?: Maybe<CourseTee>;
  /** The tees on the course */
  tees?: Maybe<Array<Maybe<CourseTee>>>;
  /** The version */
  version?: Maybe<Scalars['String']['output']>;
  /** Course video. The default is the Promotion video, but with the argument kind you can get others */
  video?: Maybe<MediaResource>;
  /** List all kinds of course videos */
  videos?: Maybe<Array<Maybe<MediaResource>>>;
  /** The GPS position of the course */
  worldLocation?: Maybe<LatLon>;
};


/** Metadata for a virtual Golf Course */
export type CourseHolesArgs = {
  forEditor?: InputMaybe<Scalars['Boolean']['input']>;
  gender?: InputMaybe<Gender>;
  holeNumbers?: InputMaybe<Array<Scalars['Int']['input']>>;
  holeTypes?: InputMaybe<HolesToPlay>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Metadata for a virtual Golf Course */
export type CourseImageArgs = {
  kind?: InputMaybe<ImageKinds>;
};


/** Metadata for a virtual Golf Course */
export type CourseResourceArgs = {
  platform?: InputMaybe<MetadataResourcePlatform>;
};


/** Metadata for a virtual Golf Course */
export type CourseScorecardTemplateArgs = {
  gender?: InputMaybe<Gender>;
  handicap?: InputMaybe<Scalars['Float']['input']>;
  playerId?: InputMaybe<Scalars['ID']['input']>;
  tee: Scalars['String']['input'];
};


/** Metadata for a virtual Golf Course */
export type CourseTeeArgs = {
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Metadata for a virtual Golf Course */
export type CourseVideoArgs = {
  kind?: InputMaybe<ImageKinds>;
};

/** The context in which the course is used */
export enum CourseContextKinds {
  Facility = 'FACILITY',
  Global = 'GLOBAL'
}

export type CourseGameHoleOption = {
  __typename?: 'CourseGameHoleOption';
  /** The name of the hole option. */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The list of holes for the hole option. */
  holes?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /** The identifier of the hole option. */
  identifier?: Maybe<Scalars['String']['output']>;
  pins?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CourseGameOption = {
  __typename?: 'CourseGameOption';
  /** The number of attempts per hole for the game option. */
  attempts?: Maybe<Scalars['Int']['output']>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  /** The fairway firmness for the game option. */
  fairwayFirmness?: Maybe<Firmness>;
  /** The green firmness for the game option. */
  greenFirmness?: Maybe<Firmness>;
  /** The list of hole options for the game option. */
  holeOptions?: Maybe<Array<Maybe<CourseGameHoleOption>>>;
  /** The tee for the game option. */
  tee?: Maybe<Scalars['String']['output']>;
  /** The wind mode for the game option. */
  wind?: Maybe<WindMode>;
};

export type CourseHole = {
  __typename?: 'CourseHole';
  /** All aim point positions */
  aimPoints?: Maybe<Array<TaggedPosition>>;
  /** All camera positions */
  cameras?: Maybe<Array<TaggedPosition>>;
  /** The description of the hole */
  description?: Maybe<Scalars['String']['output']>;
  /** The number of the hole */
  holeNumber: Scalars['Int']['output'];
  /** Course image. The default is the Splash image, but with the argument kind you can get others */
  image?: Maybe<MediaResource>;
  /** List all kinds of hole images */
  images?: Maybe<Array<MediaResource>>;
  /** The name of the hole */
  name?: Maybe<Scalars['String']['output']>;
  /** A pin */
  pin?: Maybe<HolePin>;
  /** All pin positions */
  pins?: Maybe<Array<HolePin>>;
  /** The default tee on the course */
  tee?: Maybe<HoleTee>;
  /** The default tee on the course */
  tees?: Maybe<Array<HoleTee>>;
  /** Hole video. The default is the Promotion video, but with the argument kind you can get others */
  video?: Maybe<MediaResource>;
  /** List all kinds of hole videos */
  videos?: Maybe<Array<MediaResource>>;
};


export type CourseHoleImageArgs = {
  kind?: InputMaybe<ImageKinds>;
};


export type CourseHolePinArgs = {
  pinDifficulty?: InputMaybe<HolePinDifficulty>;
};


export type CourseHolePinsArgs = {
  pinDifficulty?: InputMaybe<Array<InputMaybe<HolePinDifficulty>>>;
};


export type CourseHoleTeeArgs = {
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type CourseHoleVideoArgs = {
  kind?: InputMaybe<ImageKinds>;
};

export type CourseInfo = {
  __typename?: 'CourseInfo';
  courseId?: Maybe<Scalars['String']['output']>;
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  courseSettings?: Maybe<CourseSettings>;
  dataVersion?: Maybe<Scalars['String']['output']>;
  fairwaySettings?: Maybe<FairwaySettings>;
  greenSettings?: Maybe<GreenSettings>;
  modelVersion?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  windSettings?: Maybe<WindSettings>;
};

export type CourseLock = {
  __typename?: 'CourseLock';
  /** End Time */
  endTime?: Maybe<Scalars['DateTime']['output']>;
  /** Lock Id */
  lockId?: Maybe<Scalars['String']['output']>;
  /** Lock Type */
  lockType?: Maybe<Scalars['String']['output']>;
  /** Round Id */
  roundId?: Maybe<Scalars['String']['output']>;
  /** Round Number */
  roundNumber?: Maybe<Scalars['String']['output']>;
  /** Start Time */
  startTime?: Maybe<Scalars['DateTime']['output']>;
  /** Tournament Id */
  tournamentId?: Maybe<Scalars['String']['output']>;
  /** Tournament Name */
  tournamentName?: Maybe<Scalars['String']['output']>;
};

export type CoursePerformance = {
  __typename?: 'CoursePerformance';
  /** The course identifier */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The version of the course */
  modelVersion?: Maybe<Scalars['String']['output']>;
  /** The platform the course is running on */
  platform?: Maybe<Scalars['String']['output']>;
  /** The amount of VRAM required by this course version */
  vRamUsage?: Maybe<Scalars['Int']['output']>;
};

export type CoursePerformanceProperties = {
  __typename?: 'CoursePerformanceProperties';
  calculateVramUsageEstimate: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  defaultTextureResolution?: Maybe<Scalars['String']['output']>;
  getCourseVramUsageInMegabytesForRange: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  ramSizeAverageInGigabytes: Scalars['Float']['output'];
  ramSizeMaxInGigabytes: Scalars['Float']['output'];
  resourceId?: Maybe<Scalars['String']['output']>;
  resourceIdentifier?: Maybe<Scalars['String']['output']>;
  resourcePlatform?: Maybe<Scalars['String']['output']>;
  resourceVersion?: Maybe<Scalars['String']['output']>;
  vramUsageAverageTexture05InMegabytes: Scalars['Int']['output'];
  vramUsageAverageTexture025InMegabytes: Scalars['Int']['output'];
  vramUsageAverageTexture1InMegabytes: Scalars['Int']['output'];
  vramUsageLoadTexture05InMegabytes: Scalars['Int']['output'];
  vramUsageLoadTexture025InMegabytes: Scalars['Int']['output'];
  vramUsageLoadTexture1InMegabytes: Scalars['Int']['output'];
  vramUsageMaxTexture05InMegabytes: Scalars['Int']['output'];
  vramUsageMaxTexture025InMegabytes: Scalars['Int']['output'];
  vramUsageMaxTexture1InMegabytes: Scalars['Int']['output'];
};


export type CoursePerformancePropertiesCalculateVramUsageEstimateArgs = {
  max: Scalars['Int']['input'];
  med: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};

/** The activity is created when a Simulator Course have been played */
export type CoursePlayActivity = Node & PlayerActivity & {
  __typename?: 'CoursePlayActivity';
  /** The course that the round was played on */
  course?: Maybe<Course>;
  /** The game settings */
  gameSettings?: Maybe<GameSettings>;
  /** The game type used when playing the round */
  gameType?: Maybe<Scalars['String']['output']>;
  /** The gross score of the currently played holes */
  grossScore?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** This round is in a tournament in a season */
  isInSeason?: Maybe<Scalars['Boolean']['output']>;
  /** This round is in a tournament */
  isInTournament?: Maybe<Scalars['Boolean']['output']>;
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** Match play score */
  matchScore?: Maybe<Scalars['Int']['output']>;
  /** The net score of the currently played holes */
  netScore?: Maybe<Scalars['Int']['output']>;
  /** The number of net strokes up or down compared to par on currently played holes */
  netToPar?: Maybe<Scalars['Int']['output']>;
  /** The number of holes to play */
  numberOfHolesToPlay: Scalars['Int']['output'];
  /** The player that created the activity */
  player?: Maybe<Profile>;
  /** The scorecard for the played round */
  scorecard?: Maybe<Scorecard>;
  /** Skins play score */
  skinsScore?: Maybe<Scalars['Int']['output']>;
  /** The stableford points of the completed round */
  stablefordPoints?: Maybe<Scalars['Int']['output']>;
  /** The stableford up or down compared to par on currently played holes */
  stablefordToPar?: Maybe<Scalars['Int']['output']>;
  /** The state of the players round */
  state?: Maybe<CoursePlayStateEnum>;
  /** Played until this hole number */
  thruHole: Scalars['Int']['output'];
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** The number of gross strokes up or down compared to par on currently played holes */
  toPar?: Maybe<Scalars['Int']['output']>;
  /** This round is a in a tournament */
  tournament?: Maybe<Tournament>;
  /** Tournament in a season */
  tournamentActivity?: Maybe<SeasonTournamentActivityInterface>;
};

export type CoursePlayLeaderboardRecord = {
  __typename?: 'CoursePlayLeaderboardRecord';
  averageDistanceToPin?: Maybe<Scalars['Float']['output']>;
  continentCode?: Maybe<Scalars['String']['output']>;
  continentName?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  player?: Maybe<PersonInfo>;
  regionCode?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  tags?: Maybe<Array<Maybe<LeaderboardRecordTag>>>;
  time?: Maybe<Scalars['DateTime']['output']>;
  totalDistanceAllShots?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value1Normalized?: Maybe<Scalars['Float']['output']>;
  value1Normalized2?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value2Normalized?: Maybe<Scalars['Float']['output']>;
  value2Normalized2?: Maybe<Scalars['Float']['output']>;
  values?: Maybe<Array<KeyValuePairOfStringAndDouble>>;
};

export enum CoursePlayStateEnum {
  Completed = 'COMPLETED',
  DidNotFinish = 'DID_NOT_FINISH',
  InProgress = 'IN_PROGRESS',
  Saved = 'SAVED',
  Unknown = 'UNKNOWN'
}

export type CourseSettings = {
  __typename?: 'CourseSettings';
  lighting?: Maybe<Scalars['String']['output']>;
  wind?: Maybe<Scalars['String']['output']>;
  windDirection?: Maybe<Scalars['String']['output']>;
};

export type CourseSettingsListInputType = {
  /** The list of courses that´s gonna be deployed to the render station when this configuration is applied */
  courseList?: InputMaybe<Array<InputMaybe<CourseWithSettingsBaseInputType>>>;
  /** The id of the future configuration */
  futureConfigurationId?: InputMaybe<Scalars['String']['input']>;
  /** The id of the configuration collection */
  id?: InputMaybe<Scalars['String']['input']>;
};

export type CourseTee = {
  __typename?: 'CourseTee';
  /** The length of the course when playing from this tee */
  courseDistance: Scalars['Float']['output'];
  /** Course Rating is an evaluation of the difficulty of a golf course for scratch golfers. */
  courseRating: Scalars['Float']['output'];
  /** The gender this tee is intended for. */
  gender?: Maybe<Gender>;
  groupId?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  /** The name of the tee */
  name?: Maybe<Scalars['String']['output']>;
  /** The course par when playing from this tee */
  par: Scalars['Int']['output'];
  /** An indication of the relative difficulty of a golf course for players who are not scratch players compared to players who are scratch players. The lowest Slope Rating is 55 and the highest is 155 */
  slope: Scalars['Int']['output'];
};

export type CourseTournament = {
  /** The aggregated leaderboard for in-round closest to the pin games */
  aggregatedClosestToPinLeaderboard?: Maybe<AggregatedClosestToPinLeaderboard>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in the facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Closest To Pin game */
  closestToPinEmbeddedGameLeaderboard?: Maybe<ClosestToPin>;
  /** Database identifier */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The duration (time length) of the tournament */
  duration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The leaderboard for the in-round game */
  embeddedGameLeaderboard?: Maybe<EmbeddedGameLeaderboardUnion>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /**
   * The game summary leaderboard for birdie streak, GIR streak etc.
   * @deprecated Use otherLeaderboards instead. This field will be removed in the future.
   */
  gameSummaryLeaderboard?: Maybe<GameSummaryLeaderboardRecordTypeCollectionSegment>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Tournament has overlapping rounds */
  hasOverlappingRounds?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The tournament id */
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values added */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<Leaderboard>;
  /** The locations where this tournament can be played */
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Longest Drive game */
  longestDriveEmbeddedGameLeaderboard?: Maybe<LongestDrive>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** Number of rounds */
  numberOfRounds?: Maybe<Scalars['PositiveInt']['output']>;
  oomPointsDistributionTable?: Maybe<DistributionTable>;
  /** Optional leaderboard scoring formats */
  optionalScoringFormats?: Maybe<Array<Maybe<GameTypes>>>;
  /** Other side-bed leaderboards like birdie streak, GIR streak etc. */
  otherLeaderboards?: Maybe<OtherLeaderboards>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  /** The participation groups for this tournament */
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The participation requirements for this tournament */
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /** The list of products this tournament is a part of */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** A tournament round */
  round?: Maybe<TournamentRound>;
  /** The leaderboard for the round */
  roundLeaderboard?: Maybe<RoundLeaderboard>;
  /** The tournament rounds */
  rounds?: Maybe<Array<TournamentRound>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The state of this tournament */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info abut the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


export type CourseTournamentAggregatedClosestToPinLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


export type CourseTournamentClosestToPinEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


export type CourseTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


export type CourseTournamentEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


export type CourseTournamentGameSummaryLeaderboardArgs = {
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  kind?: InputMaybe<GameSummaryKinds>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CourseTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type CourseTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


export type CourseTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type CourseTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  scoringFormat?: InputMaybe<GameTypes>;
};


export type CourseTournamentLongestDriveEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


export type CourseTournamentOtherLeaderboardsArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  kind: OtherLeaderboardsKind;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
};


export type CourseTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type CourseTournamentRoundArgs = {
  roundId?: InputMaybe<Scalars['ID']['input']>;
  roundNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type CourseTournamentRoundLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


export type CourseTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


export type CourseTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** Mutations on a Tournament */
export type CourseTournamentMutation = MediaAssetsMutationInterface & PaymentMutationInterface & TournamentMutationInterface & {
  __typename?: 'CourseTournamentMutation';
  /** Accept invitation */
  acceptInvitation?: Maybe<Invitation>;
  /** Add default image to the tournament */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** add a location to this tournament */
  addLocation?: Maybe<Tournament>;
  /** Add media assets to the tournament */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Add default requirements for participation to the tournament.Only use 'templateOwner' argument if assigning template from a specific user, otherwise leave blank to use the Trackman global template. */
  addParticipantRequirementsFromDefaultTemplate?: Maybe<Tournament>;
  /** Add a round to a multi round tournament */
  addRound?: Maybe<TournamentRound>;
  /** Add a sponsor to the tournament */
  addSponsor?: Maybe<Tournament>;
  /**
   * Change the attempts per round of the tournament
   * @deprecated Use changeTournamentNumberOfAttempts instead
   */
  changeAttemptsPerRound?: Maybe<Tournament>;
  /** Change the description of the tournament */
  changeDescription?: Maybe<Tournament>;
  /** Change the game format for the TEAM tournament. Available formats are: Scramble, Better ball, Alternate shot (Foursome) and Greensomes */
  changeGameFormat?: Maybe<Tournament>;
  /** Change the game type of the tournament */
  changeGameType?: Maybe<Tournament>;
  /** Change the units used when playing the tournament */
  changeGameUnit?: Maybe<Tournament>;
  /** Change the handicap settings for the tournament */
  changeHcpSettings?: Maybe<Tournament>;
  /** Change the number of bottom rounds of the tournament to ignore */
  changeIgnoreBottomRounds?: Maybe<Tournament>;
  /** change the payment configuration of a location */
  changeLocationPaymentConfiguration?: Maybe<Tournament>;
  /** Change the logo of the tournament */
  changeLogo?: Maybe<Tournament>;
  /** Change the max participants of the location config of the tournament */
  changeMaxParticipants?: Maybe<Tournament>;
  /** Change the mulligan settings of the tournament */
  changeMulliganSettings?: Maybe<Tournament>;
  /** Change the name of the tournament */
  changeName?: Maybe<Tournament>;
  /** Add or remove optional scoring formats (STROKE, STROKE_NET or STABLEFORD) */
  changeOptionalScoringFormats?: Maybe<Tournament>;
  /** change the end time of the sign up */
  changeSignUpEndTime?: Maybe<Tournament>;
  /** change the start time of the sign up */
  changeSignUpStartTime?: Maybe<Tournament>;
  /** Change the number of players allowed in a team for team tournaments. Currently only 2 or 4 player teams are allowed - depending on the game format */
  changeTeamSize?: Maybe<Tournament>;
  /** deSelect all facility locations for this tournament */
  deSelectAllLocations?: Maybe<Tournament>;
  /** Decline invitation */
  declineInvitation?: Maybe<Invitation>;
  /** Delete the tournament */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Disable payment for the tournament. Please note that the existing payment configuration will be deleted. */
  disablePayment?: Maybe<Tournament>;
  /** Enable payment for the tournament. Payment needs to be configured for each location where the tournament is available. */
  enablePayment?: Maybe<Tournament>;
  /** Ends the tournament */
  endTournament?: Maybe<Tournament>;
  /** filter out the locations that are not configured for payment */
  filterOutLocationsNotConfiguredForPayment?: Maybe<Tournament>;
  /** Invite by emails */
  invite?: Maybe<Scalars['Boolean']['output']>;
  /** Join the tournament */
  join?: Maybe<Invitation>;
  /** Join a player to the tournament without the player having to accept an invitation */
  joinPlayer?: Maybe<Invitation>;
  /** Move a tournament and all it's round to a new starting date and time */
  moveStartTime?: Maybe<Tournament>;
  /** Publish the draft as published */
  publish?: Maybe<Tournament>;
  /** Resend invitation */
  reInvite?: Maybe<Invitation>;
  /** Remove all participant groups from the tournament */
  removeAllParticipantGroups?: Maybe<Tournament>;
  /** remove a location from this tournament */
  removeLocation?: Maybe<Tournament>;
  /** Remove media assets from the tournament */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove a participant group from the tournament */
  removeParticipantGroup?: Maybe<Tournament>;
  /** Remove requirements for participation from the tournament */
  removeParticipantRequirements?: Maybe<Tournament>;
  /** Remove a sponsor from the tournament */
  removeSponsor?: Maybe<Tournament>;
  /** Replace the sponsor from the tournament with another sponsor */
  replaceSponsor?: Maybe<Tournament>;
  /** Reset the MaxScoreMethod for all rounds in the order of merit tournament to Default. */
  resetMaxScoringMethodForAllRounds?: Maybe<Tournament>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Get a round-mutation by round Id */
  roundById?: Maybe<TournamentRoundMutation>;
  /** Get a round-mutation by round number */
  roundByNo?: Maybe<TournamentRoundMutation>;
  /** The round default mutations */
  roundDefaults?: Maybe<TournamentRoundDefaultsMutation>;
  /** select all facility locations for this tournament */
  selectAllLocations?: Maybe<Tournament>;
  /** Set if you are allow to play ahead in the tournament */
  setAllowPlayAhead?: Maybe<Tournament>;
  /** Set the tournament availability */
  setAvailability?: Maybe<Tournament>;
  /** Set flag indicating that this is an indoor tournament */
  setIsIndoor?: Maybe<Tournament>;
  /** Set flag indicating that this is a range tournament */
  setIsRange?: Maybe<Tournament>;
  /** Method for updating the key values collections on the tournament */
  setKeyValues?: Maybe<Tournament>;
  /**
   * Add or remove which locations this tournament is available.
   * @deprecated No longer supported.
   */
  setLocations?: Maybe<Tournament>;
  /** Un-publish the published version */
  unPublish?: Maybe<Tournament>;
  /** Add or remove geo filters to the tournament */
  updateGeoFilters?: Maybe<Tournament>;
  /** Update group for participation in the tournament. Renaming an existing group will delete the old group and create a new one.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantGroup?: Maybe<Tournament>;
  /** Update requirements for participation to the tournament.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantRequirements?: Maybe<Tournament>;
  /** Add or remove tags to the tournament */
  updateTags?: Maybe<Tournament>;
  /** Withdraw invitation */
  withdrawInvitation?: Maybe<Invitation>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationAcceptInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationAddLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationAddParticipantRequirementsFromDefaultTemplateArgs = {
  templateOwner?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationAddSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeAttemptsPerRoundArgs = {
  attemptsPerRound: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeGameFormatArgs = {
  gameFormat: GameFormats;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeGameTypeArgs = {
  gameType: GameTypes;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeGameUnitArgs = {
  unit?: InputMaybe<GameUnit>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeHcpSettingsArgs = {
  hcpType?: InputMaybe<HcpKind>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeIgnoreBottomRoundsArgs = {
  ignoreBottomRounds: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeLocationPaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeLogoArgs = {
  logoUrl: Scalars['Url']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeMaxParticipantsArgs = {
  locationId: Scalars['ID']['input'];
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeMulliganSettingsArgs = {
  mulliganSettings: Mulligans;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeOptionalScoringFormatsArgs = {
  addScoringFormats?: InputMaybe<Array<InputMaybe<GameTypes>>>;
  removeScoringFormats?: InputMaybe<Array<InputMaybe<GameTypes>>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationChangeTeamSizeArgs = {
  teamSize: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationDeclineInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationInviteArgs = {
  emails: Array<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationJoinPlayerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationMoveStartTimeArgs = {
  newStartTime: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationReInviteArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationRemoveLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationRemoveParticipantGroupArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationRemoveSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationReplaceSponsorArgs = {
  newSponsorId: Scalars['String']['input'];
  oldSponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationRoundByIdArgs = {
  roundId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationRoundByNoArgs = {
  roundNumber: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationSetAllowPlayAheadArgs = {
  allowPlayAhead: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationSetAvailabilityArgs = {
  availability: TournamentAvailability;
  makeAvailableForAllBays?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationSetIsIndoorArgs = {
  isIndoor: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationSetIsRangeArgs = {
  isRange: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CourseTournamentMutationSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationSetLocationsArgs = {
  addLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  removeLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  selectAll?: InputMaybe<Scalars['Boolean']['input']>;
  setLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationUpdateGeoFiltersArgs = {
  addExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  addIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  field?: InputMaybe<GeoFilterFields>;
  removeExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationUpdateParticipantGroupArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  name: Scalars['String']['input'];
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationUpdateParticipantRequirementsArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationUpdateTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type CourseTournamentMutationWithdrawInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** A segment of a collection. */
export type CourseTypeCollectionSegment = {
  __typename?: 'CourseTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Course>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CourseWithSettings = CourseWithSettingsInterface & {
  __typename?: 'CourseWithSettings';
  /** The metadata for this course */
  course?: Maybe<Course>;
  /** The identifier for this course */
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseInfo?: Maybe<CoursePerformanceProperties>;
  /** The instance id for this course */
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  courseLocks?: Maybe<Array<Maybe<CourseLock>>>;
  /** The version of this course binary */
  courseVersion?: Maybe<Scalars['String']['output']>;
  /** The fairway firmness for this course instance */
  fairwayFirmness?: Maybe<Firmness>;
  /** The green firmness for this course instance */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp rating for this course instance */
  greenStimp?: Maybe<Stimp>;
  /** Is this course deployed */
  isDeployed?: Maybe<Scalars['Boolean']['output']>;
  /** The kind of the configuration this course belongs to */
  kind?: Maybe<CoursesConfigurationKinds>;
  /** The lighting for this course instance */
  lighting?: Maybe<Lighting>;
  /** The metadata version for the course data ie. scorecard data. */
  metadataVersion?: Maybe<Scalars['String']['output']>;
  /** The pin difficulty for this course instance */
  pinTag?: Maybe<Pin>;
};

export type CourseWithSettingsBaseInputType = {
  /** The identifier for this course */
  courseIdentifier: Scalars['NonEmptyString']['input'];
  /** The instance id for this course */
  courseInstanceId?: InputMaybe<Scalars['String']['input']>;
  /** The fairway firmness for this course instance */
  fairwayFirmness?: InputMaybe<Firmness>;
  /** The green firmness for this course instance */
  greenFirmness?: InputMaybe<Firmness>;
  /** The green stimp rating for this course instance */
  greenStimp?: InputMaybe<Stimp>;
  /** The lighting for this course instance */
  lighting?: InputMaybe<Lighting>;
  /** The metadata version for the course data ie. scorecard data. */
  metadataVersion: Scalars['NonEmptyString']['input'];
  /** The pin difficulty for this course instance */
  pinTag?: InputMaybe<Pin>;
};

export type CourseWithSettingsDeployed = CourseWithSettingsInterface & {
  __typename?: 'CourseWithSettingsDeployed';
  /** The metadata for this course */
  course?: Maybe<Course>;
  /** The identifier for this course */
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseInfo?: Maybe<CoursePerformanceProperties>;
  /** The instance id for this course */
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  courseLocks?: Maybe<Array<Maybe<CourseLock>>>;
  /** The version of this course binary */
  courseVersion?: Maybe<Scalars['String']['output']>;
  /** The fairway firmness for this course instance */
  fairwayFirmness?: Maybe<Firmness>;
  /** The green firmness for this course instance */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp rating for this course instance */
  greenStimp?: Maybe<Stimp>;
  /** The lighting for this course instance */
  lighting?: Maybe<Lighting>;
  /** The metadata version for the course data ie. scorecard data. */
  metadataVersion?: Maybe<Scalars['String']['output']>;
  /** The pin difficulty for this course instance */
  pinTag?: Maybe<Pin>;
};

export type CourseWithSettingsInterface = {
  /** The identifier for this course */
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  /** The instance id for this course */
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  /** The fairway firmness for this course instance */
  fairwayFirmness?: Maybe<Firmness>;
  /** The green firmness for this course instance */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp rating for this course instance */
  greenStimp?: Maybe<Stimp>;
  /** The lighting for this course instance */
  lighting?: Maybe<Lighting>;
  /** The metadata version for the course data ie. scorecard data. */
  metadataVersion?: Maybe<Scalars['String']['output']>;
  /** The pin difficulty for this course instance */
  pinTag?: Maybe<Pin>;
};

export enum CoursesConfigurationKinds {
  Facility = 'FACILITY',
  TrackMan = 'TRACK_MAN'
}

export type CoursesConfigurations = {
  __typename?: 'CoursesConfigurations';
  /** The configuration currently deployed */
  currentConfiguration?: Maybe<DesiredCoursesConfiguration>;
  /** The configuration that will be deployed when the next service window is active. */
  futureConfiguration: DesiredCoursesConfiguration;
};


export type CoursesConfigurationsFutureConfigurationArgs = {
  useCurrentIfFutureConfigurationHasNoCourses?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateClubError = ClubHeadTypeNotSupportedError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UniqActiveClubsRuleError;

export type CreateClubInput = {
  /** Brand of the club */
  brandId?: InputMaybe<Scalars['ID']['input']>;
  /** Club head */
  clubHead: ClubEnum;
  /** Name of the club */
  displayName: Scalars['String']['input'];
  /** Is the Club retired or not */
  isRetired: Scalars['Boolean']['input'];
};

export type CreateClubPayload = {
  __typename?: 'CreateClubPayload';
  errors?: Maybe<Array<CreateClubError>>;
  result?: Maybe<Club>;
};

export type CreateClubsError = ClubHeadTypeNotSupportedError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UniqActiveClubsRuleError;

export type CreateClubsInput = {
  clubs: Array<CreateClubInput>;
};

export type CreateClubsPayload = {
  __typename?: 'CreateClubsPayload';
  errors?: Maybe<Array<CreateClubsError>>;
  result?: Maybe<Array<Maybe<Club>>>;
};

export type CreateLeagueInput = {
  /** The name of the league */
  name: Scalars['String']['input'];
  /** The inputs needed for creating the first season of the league */
  season: CreateLeagueSeasonInput;
};

export type CreateLeagueSeasonInput = {
  /** The format of the League season */
  format: LeagueSeasonFormat;
  /** Indicates if this season is individual season or a team season */
  isTeamLeagueSeason: Scalars['Boolean']['input'];
  /** The name of the league season */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateLeagueTeamsInput = {
  /** The active members of the team */
  memberIds: Array<Scalars['String']['input']>;
  /** The name of the team */
  teamName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOAuthClientApplicationInput = {
  allowedScopes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOAuthClientApplicationPayload = {
  __typename?: 'CreateOAuthClientApplicationPayload';
  application?: Maybe<Application>;
};

export type CreateSeasonActivityInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  type: SeasonActivityEventType;
};

export type CreateSeasonEventInput = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateServiceAccountError = CreateUserFailedError | DefaultError | MissingMandatoryFieldError;

export type CreateServiceAccountInput = {
  facilityId?: InputMaybe<Scalars['String']['input']>;
  facilityKey?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateServiceAccountPayload = {
  __typename?: 'CreateServiceAccountPayload';
  errors?: Maybe<Array<CreateServiceAccountError>>;
  serviceAccount?: Maybe<ServiceAccount>;
};

export type CreateTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type CreateTeamInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  teamName: Scalars['String']['input'];
};

export type CreateTeamPayload = {
  __typename?: 'CreateTeamPayload';
  errors?: Maybe<Array<CreateTeamError>>;
  team?: Maybe<TeamInterface>;
};

export type CreateTeamsError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type CreateTeamsInput = {
  eventId?: InputMaybe<Scalars['ID']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  teams: Array<CreateLeagueTeamsInput>;
};

export type CreateTeamsPayload = {
  __typename?: 'CreateTeamsPayload';
  errors?: Maybe<Array<CreateTeamsError>>;
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateTournamentError = DefaultError | EntityNotFoundError | NotSupportedError | UnauthorizedError;

export type CreateTournamentInput = {
  facilityId: Scalars['ID']['input'];
  isGlobalTournament?: InputMaybe<Scalars['Boolean']['input']>;
  isGuest?: InputMaybe<Scalars['Boolean']['input']>;
  isRange?: InputMaybe<Scalars['Boolean']['input']>;
  isTeamTournament?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['NonEmptyString']['input'];
  tournamentType: TournamentTypes;
};

export type CreateTournamentPayload = {
  __typename?: 'CreateTournamentPayload';
  errors?: Maybe<Array<CreateTournamentError>>;
  tournament?: Maybe<Tournament>;
};

export type CreateUserFailedError = BaseError & {
  __typename?: 'CreateUserFailedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum CriteriaGender {
  All = 'ALL',
  Female = 'FEMALE',
  Male = 'MALE'
}

/** Mutations on a Tournament */
export type CtpTournamentMutation = MediaAssetsMutationInterface & PaymentMutationInterface & TournamentMutationInterface & {
  __typename?: 'CtpTournamentMutation';
  /** Accept invitation */
  acceptInvitation?: Maybe<Invitation>;
  /** Add default image to the tournament */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** add a location to this tournament */
  addLocation?: Maybe<Tournament>;
  /** Add media assets to the tournament */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Add default requirements for participation to the tournament.Only use 'templateOwner' argument if assigning template from a specific user, otherwise leave blank to use the Trackman global template. */
  addParticipantRequirementsFromDefaultTemplate?: Maybe<Tournament>;
  /** Add a sponsor to the tournament */
  addSponsor?: Maybe<Tournament>;
  /**
   * Allow or Disallow participants to improve the score on the leaderboard
   * @deprecated Use changeTournamentNumberOfAttempts instead
   */
  changeAllowMultipleTournamentAttempts?: Maybe<ClosestToPinTournament>;
  /** Change the attempts per round of the tournament */
  changeAttemptsPerHole?: Maybe<ClosestToPinTournament>;
  /** Change the course for the tournament */
  changeCourse?: Maybe<ClosestToPinTournament>;
  /** Change the start- and/or end date of the tournament. Must be in UTC time. */
  changeDates?: Maybe<ClosestToPinTournament>;
  /** Change the description of the tournament */
  changeDescription?: Maybe<Tournament>;
  /**
   * Change the end date of the tournament
   * @deprecated Use changeDates instead
   */
  changeEndDate?: Maybe<ClosestToPinTournament>;
  /** Change the holes played in the tournament */
  changeFemaleTee?: Maybe<ClosestToPinTournament>;
  /** Change the units used when playing the tournament */
  changeGameUnit?: Maybe<Tournament>;
  /** Change the firmness of the green for the tournament */
  changeGreenFirmness?: Maybe<ClosestToPinTournament>;
  /** Change the green stimp for the tournament */
  changeGreenStimp?: Maybe<ClosestToPinTournament>;
  /**
   * Change if the tournament has an end date
   * @deprecated Use changeDates instead
   */
  changeHasEndDate?: Maybe<ClosestToPinTournament>;
  /** Change the holes played in the tournament */
  changeHoles?: Maybe<ClosestToPinTournament>;
  /** Change the course for the tournament */
  changeLighting?: Maybe<ClosestToPinTournament>;
  /** change the payment configuration of a location */
  changeLocationPaymentConfiguration?: Maybe<Tournament>;
  /** Change the logo of the tournament */
  changeLogo?: Maybe<Tournament>;
  /** Change the holes played in the tournament */
  changeMaleTee?: Maybe<ClosestToPinTournament>;
  /** Change the max participants of the location config of the tournament */
  changeMaxParticipants?: Maybe<Tournament>;
  /** Change the name of the tournament */
  changeName?: Maybe<Tournament>;
  /** Change the units used when playing the tournament */
  changePinDifficulty?: Maybe<ClosestToPinTournament>;
  /** change the end time of the sign up */
  changeSignUpEndTime?: Maybe<Tournament>;
  /** change the start time of the sign up */
  changeSignUpStartTime?: Maybe<Tournament>;
  /** Change the wind for the tournament */
  changeWind?: Maybe<ClosestToPinTournament>;
  /** deSelect all facility locations for this tournament */
  deSelectAllLocations?: Maybe<Tournament>;
  /** Decline invitation */
  declineInvitation?: Maybe<Invitation>;
  /** Delete the tournament */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Disable payment for the tournament. Please note that the existing payment configuration will be deleted. */
  disablePayment?: Maybe<Tournament>;
  /** Enable payment for the tournament. Payment needs to be configured for each location where the tournament is available. */
  enablePayment?: Maybe<Tournament>;
  /** Ends the tournament */
  endTournament?: Maybe<Tournament>;
  /** filter out the locations that are not configured for payment */
  filterOutLocationsNotConfiguredForPayment?: Maybe<Tournament>;
  /** Invite by emails */
  invite?: Maybe<Scalars['Boolean']['output']>;
  /** Join the tournament */
  join?: Maybe<Invitation>;
  /** Join a player to the tournament without the player having to accept an invitation */
  joinPlayer?: Maybe<Invitation>;
  /** Move a tournament and all it's round to a new starting date and time */
  moveStartTime?: Maybe<Tournament>;
  /** Publish the draft as published */
  publish?: Maybe<Tournament>;
  /** Resend invitation */
  reInvite?: Maybe<Invitation>;
  /** Remove all participant groups from the tournament */
  removeAllParticipantGroups?: Maybe<Tournament>;
  /** remove a location from this tournament */
  removeLocation?: Maybe<Tournament>;
  /** Remove media assets from the tournament */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove a participant group from the tournament */
  removeParticipantGroup?: Maybe<Tournament>;
  /** Remove requirements for participation from the tournament */
  removeParticipantRequirements?: Maybe<Tournament>;
  /** Remove a sponsor from the tournament */
  removeSponsor?: Maybe<Tournament>;
  /** Replace the sponsor from the tournament with another sponsor */
  replaceSponsor?: Maybe<Tournament>;
  /** Reset the MaxScoreMethod for all rounds in the order of merit tournament to Default. */
  resetMaxScoringMethodForAllRounds?: Maybe<Tournament>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** The round default mutations */
  roundDefaults?: Maybe<TournamentRoundDefaultsMutation>;
  /** select all facility locations for this tournament */
  selectAllLocations?: Maybe<Tournament>;
  /** Set the tournament availability */
  setAvailability?: Maybe<Tournament>;
  /** Set flag indicating that this is an indoor tournament */
  setIsIndoor?: Maybe<Tournament>;
  /** Set flag indicating that this is a range tournament */
  setIsRange?: Maybe<Tournament>;
  /** Method for updating the key values collections on the tournament */
  setKeyValues?: Maybe<Tournament>;
  /**
   * Add or remove which locations this tournament is available.
   * @deprecated No longer supported.
   */
  setLocations?: Maybe<Tournament>;
  /** Un-publish the published version */
  unPublish?: Maybe<Tournament>;
  /** Add or remove geo filters to the tournament */
  updateGeoFilters?: Maybe<Tournament>;
  /** Update group for participation in the tournament. Renaming an existing group will delete the old group and create a new one.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantGroup?: Maybe<Tournament>;
  /** Update requirements for participation to the tournament.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantRequirements?: Maybe<Tournament>;
  /** Add or remove tags to the tournament */
  updateTags?: Maybe<Tournament>;
  /** Withdraw invitation */
  withdrawInvitation?: Maybe<Invitation>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationAcceptInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationAddLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationAddParticipantRequirementsFromDefaultTemplateArgs = {
  templateOwner?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationAddSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeAllowMultipleTournamentAttemptsArgs = {
  allowMultipleTournamentAttempts: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeAttemptsPerHoleArgs = {
  attemptsPerHole: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeCourseArgs = {
  course: Scalars['String']['input'];
  courseInstanceId?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeDatesArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeEndDateArgs = {
  endDate: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeFemaleTeeArgs = {
  femaleTee: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeGameUnitArgs = {
  unit?: InputMaybe<GameUnit>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeGreenFirmnessArgs = {
  greenFirmness: Firmness;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeGreenStimpArgs = {
  greenStimp: Stimp;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeHasEndDateArgs = {
  hasEndDate: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeHolesArgs = {
  holes: Array<InputMaybe<Scalars['Int']['input']>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeLightingArgs = {
  lighting: Lighting;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeLocationPaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeLogoArgs = {
  logoUrl: Scalars['Url']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeMaleTeeArgs = {
  maleTee: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeMaxParticipantsArgs = {
  locationId: Scalars['ID']['input'];
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangePinDifficultyArgs = {
  pinDifficulty: Pin;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationChangeWindArgs = {
  wind: WindMode;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationDeclineInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationInviteArgs = {
  emails: Array<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationJoinPlayerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationMoveStartTimeArgs = {
  newStartTime: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationReInviteArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationRemoveLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationRemoveParticipantGroupArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationRemoveSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationReplaceSponsorArgs = {
  newSponsorId: Scalars['String']['input'];
  oldSponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationSetAvailabilityArgs = {
  availability: TournamentAvailability;
  makeAvailableForAllBays?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationSetIsIndoorArgs = {
  isIndoor: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationSetIsRangeArgs = {
  isRange: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type CtpTournamentMutationSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationSetLocationsArgs = {
  addLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  removeLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  selectAll?: InputMaybe<Scalars['Boolean']['input']>;
  setLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationUpdateGeoFiltersArgs = {
  addExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  addIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  field?: InputMaybe<GeoFilterFields>;
  removeExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationUpdateParticipantGroupArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  name: Scalars['String']['input'];
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationUpdateParticipantRequirementsArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationUpdateTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type CtpTournamentMutationWithdrawInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type DeclineTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type DeclineTeamInput = {
  teamId: Scalars['ID']['input'];
};

export type DeclineTeamPayload = {
  __typename?: 'DeclineTeamPayload';
  errors?: Maybe<Array<DeclineTeamError>>;
  team?: Maybe<TeamInterface>;
};

export type DecreaseNumericUserPropertyValueError = ConcurrencyViolationError | DefaultError | InvalidDataTypeError | MissingMandatoryFieldError;

export type DecreaseNumericUserPropertyValueInput = {
  application: Scalars['String']['input'];
  propertyKey: Scalars['String']['input'];
  value: Scalars['Float']['input'];
};

export type DecreaseNumericUserPropertyValuePayload = {
  __typename?: 'DecreaseNumericUserPropertyValuePayload';
  errors?: Maybe<Array<DecreaseNumericUserPropertyValueError>>;
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
};

export type DefaultError = BaseError & {
  __typename?: 'DefaultError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type DefaultRoundSettings = {
  __typename?: 'DefaultRoundSettings';
  /** The attempt that is shown on the leaderboard */
  attemptsOnLeaderboard?: Maybe<Scalars['String']['output']>;
  /** The attempts per round */
  attemptsPerRound?: Maybe<Scalars['Int']['output']>;
  defaultRoundTime?: Maybe<Scalars['TimeSpan']['output']>;
  /** The fairway firmness */
  fairwayFirmness?: Maybe<Firmness>;
  /** The gimme distance */
  gimmeDistance?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** The green firmness */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp for the round */
  greenStimp?: Maybe<Stimp>;
  /** The lighting on the course when the round is played */
  lighting?: Maybe<Lighting>;
  /** Mulligans */
  mulligans?: Maybe<Mulligans>;
  /** The pin difficulty */
  pinDifficulty?: Maybe<Pin>;
  /** The putting mode */
  puttingMode?: Maybe<PuttMode>;
  /** The wind mode */
  windSpeed?: Maybe<WindMode>;
};

export type DefaultTees = {
  __typename?: 'DefaultTees';
  course?: Maybe<Scalars['String']['output']>;
  female?: Maybe<Scalars['String']['output']>;
  male?: Maybe<Scalars['String']['output']>;
};

export type DeleteClubsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type DeleteClubsInput = {
  clubIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type DeleteClubsPayload = {
  __typename?: 'DeleteClubsPayload';
  errors?: Maybe<Array<DeleteClubsError>>;
  result?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteTeamsError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type DeleteTeamsInput = {
  eventId?: InputMaybe<Scalars['ID']['input']>;
  memberId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
};

export type DeleteTeamsPayload = {
  __typename?: 'DeleteTeamsPayload';
  errors?: Maybe<Array<DeleteTeamsError>>;
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteUserProfileDataError = DefaultError;

export type DeleteUserProfileDataInput = {
  sendEmail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeleteUserProfileDataPayload = {
  __typename?: 'DeleteUserProfileDataPayload';
  errors?: Maybe<Array<DeleteUserProfileDataError>>;
  profile?: Maybe<Profile>;
};

export type DeselectAllBaysForAllTournamentLocationsError = CanOnlyChangeBaySelectionForGuestTournamentError | DefaultError | EntityNotFoundError;

export type DeselectAllBaysForAllTournamentLocationsInput = {
  id: Scalars['ID']['input'];
};

export type DeselectAllBaysForAllTournamentLocationsPayload = {
  __typename?: 'DeselectAllBaysForAllTournamentLocationsPayload';
  errors?: Maybe<Array<DeselectAllBaysForAllTournamentLocationsError>>;
  tournament?: Maybe<Tournament>;
};

export type DeselectAllBaysForTournamentLocationsError = CanOnlyChangeBaySelectionForGuestTournamentError | DefaultError | EntityNotFoundError;

export type DeselectAllBaysForTournamentLocationsInput = {
  id: Scalars['ID']['input'];
  locationIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type DeselectAllBaysForTournamentLocationsPayload = {
  __typename?: 'DeselectAllBaysForTournamentLocationsPayload';
  errors?: Maybe<Array<DeselectAllBaysForTournamentLocationsError>>;
  tournament?: Maybe<Tournament>;
};

export type DeselectBaysForTournamentError = CanOnlyChangeBaySelectionForGuestTournamentError | DefaultError | EntityNotFoundError;

export type DeselectBaysForTournamentInput = {
  bayIds: Array<InputMaybe<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
};

export type DeselectBaysForTournamentPayload = {
  __typename?: 'DeselectBaysForTournamentPayload';
  errors?: Maybe<Array<DeselectBaysForTournamentError>>;
  tournament?: Maybe<Tournament>;
};

export type DesiredCoursesConfiguration = {
  __typename?: 'DesiredCoursesConfiguration';
  /** The courses added to this configuration */
  coursesAndSettings?: Maybe<Array<CourseWithSettings>>;
  /** VRAM used display value for facility and TrackMan configurations */
  facilityAndTmConfigurationsVramUsedDisplay?: Maybe<Scalars['String']['output']>;
  /** VRAM used in MB for facility and TrackMan configurations */
  facilityAndTmConfigurationsVramUsedInMegabytes?: Maybe<Scalars['Int']['output']>;
  /** VRAM left display value for facility configurations */
  facilityConfigurationVramAvailableDisplay?: Maybe<Scalars['String']['output']>;
  /** VRAM left in MB for facility configurations */
  facilityConfigurationVramAvailableInMegabytes?: Maybe<Scalars['Int']['output']>;
  /** Facility configuration VRam capacity display value */
  facilityConfigurationVramCapacityDisplay?: Maybe<Scalars['String']['output']>;
  /** Facility configuration VRam capacity In MB */
  facilityConfigurationVramCapacityInMegabytes?: Maybe<Scalars['Int']['output']>;
  /** Facility configuration VRam used display value */
  facilityConfigurationVramUsedDisplay?: Maybe<Scalars['String']['output']>;
  /** Facility configuration VRam used in MB */
  facilityConfigurationVramUsedInMegabytes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  /** Server VRAM capacity display value */
  serverVramCapacityDisplay?: Maybe<Scalars['String']['output']>;
  /** Server VRAM capacity In MB */
  serverVramCapacityInMegabytes?: Maybe<Scalars['Int']['output']>;
  /** Facility configuration VRam capacity display value */
  trackManConfigurationVramCapacityDisplay?: Maybe<Scalars['String']['output']>;
  /** Facility configuration VRam capacity in MB */
  trackManConfigurationVramCapacityInMegabytes?: Maybe<Scalars['Int']['output']>;
};

export type DeveloperTools = {
  __typename?: 'DeveloperTools';
  facilityModel?: Maybe<Facility>;
  /** Get all webhooks for the facility */
  webHooks?: Maybe<WebHooksCollectionSegment>;
};


export type DeveloperToolsWebHooksArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type DeveloperToolsMutationType = {
  __typename?: 'DeveloperToolsMutationType';
  /** Create a new WebHook */
  createWebHook?: Maybe<WebHook>;
  webHook?: Maybe<WebHookMutationData>;
};


export type DeveloperToolsMutationTypeCreateWebHookArgs = {
  bayIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  endpointUrl: Scalars['String']['input'];
  eventTypes?: InputMaybe<Array<InputMaybe<WebHookEventName>>>;
  headers?: InputMaybe<Array<KeyValueInput>>;
  locationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type DeveloperToolsMutationTypeWebHookArgs = {
  id: Scalars['ID']['input'];
};

export type Device = {
  __typename?: 'Device';
  appName?: Maybe<Scalars['String']['output']>;
  appVersion?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deviceId?: Maybe<Scalars['String']['output']>;
  fcmToken?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipAddess?: Maybe<Scalars['IPv4']['output']>;
  ipLocation?: Maybe<GeoLocation>;
  isRegistered: Scalars['Boolean']['output'];
  language?: Maybe<Scalars['String']['output']>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<DevicePlatformEnum>;
  tokenId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Profile>;
};

export enum DevicePlatformEnum {
  Android = 'ANDROID',
  Ios = 'IOS'
}

export type DeviceValidation = {
  __typename?: 'DeviceValidation';
  /** Error code for why State is not valid */
  Reason?: Maybe<Scalars['String']['output']>;
  /** Returns Valid if TPS can connect to all devices */
  State?: Maybe<Scalars['String']['output']>;
};

export type DisablePuttPuttTournamentTieBreakerError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type DisablePuttPuttTournamentTieBreakerInput = {
  id: Scalars['ID']['input'];
};

export type DisablePuttPuttTournamentTieBreakerPayload = {
  __typename?: 'DisablePuttPuttTournamentTieBreakerPayload';
  errors?: Maybe<Array<DisablePuttPuttTournamentTieBreakerError>>;
  tournament?: Maybe<Tournament>;
};

export type DisableRangeBaysError = DefaultError | UnauthorizedError;

export type DisableRangeBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
};

export type DisableRangeBaysPayload = {
  __typename?: 'DisableRangeBaysPayload';
  errors?: Maybe<Array<DisableRangeBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export type DisableRangeLaunchAreasError = DefaultError | UnauthorizedError;

export type DisableRangeLaunchAreasInput = {
  launchAreaIds: Array<Scalars['ID']['input']>;
};

export type DisableRangeLaunchAreasPayload = {
  __typename?: 'DisableRangeLaunchAreasPayload';
  errors?: Maybe<Array<DisableRangeLaunchAreasError>>;
  result?: Maybe<AppMutationResult>;
};

export type DisableRangeNetsError = DefaultError | UnauthorizedError;

export type DisableRangeNetsInput = {
  netIds: Array<Scalars['ID']['input']>;
};

export type DisableRangeNetsPayload = {
  __typename?: 'DisableRangeNetsPayload';
  errors?: Maybe<Array<DisableRangeNetsError>>;
  result?: Maybe<AppMutationResult>;
};

export type DisableRangeRadarsError = DefaultError | UnauthorizedError;

export type DisableRangeRadarsInput = {
  radarIds: Array<Scalars['ID']['input']>;
};

export type DisableRangeRadarsPayload = {
  __typename?: 'DisableRangeRadarsPayload';
  errors?: Maybe<Array<DisableRangeRadarsError>>;
  result?: Maybe<AppMutationResult>;
};

export type DisableRangeTargetsError = DefaultError | UnauthorizedError;

export type DisableRangeTargetsInput = {
  targetIds: Array<Scalars['ID']['input']>;
};

export type DisableRangeTargetsPayload = {
  __typename?: 'DisableRangeTargetsPayload';
  errors?: Maybe<Array<DisableRangeTargetsError>>;
  result?: Maybe<AppMutationResult>;
};

export type DisableSeasonPuttPuttActivityAllowTieBreakerError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type DisableSeasonPuttPuttActivityAllowTieBreakerInput = {
  id: Scalars['ID']['input'];
};

export type DisableSeasonPuttPuttActivityAllowTieBreakerPayload = {
  __typename?: 'DisableSeasonPuttPuttActivityAllowTieBreakerPayload';
  errors?: Maybe<Array<DisableSeasonPuttPuttActivityAllowTieBreakerError>>;
  result?: Maybe<SeasonPuttPuttActivity>;
};

export type DisableSeasonShuffleBullsEyeActivityAllowPuttingModeError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type DisableSeasonShuffleBullsEyeActivityAllowPuttingModeInput = {
  id: Scalars['ID']['input'];
};

export type DisableSeasonShuffleBullsEyeActivityAllowPuttingModePayload = {
  __typename?: 'DisableSeasonShuffleBullsEyeActivityAllowPuttingModePayload';
  errors?: Maybe<Array<DisableSeasonShuffleBullsEyeActivityAllowPuttingModeError>>;
  result?: Maybe<SeasonShuffleBullsEyeActivity>;
};

export type DisableShuffleBullsEyeTournamentAllowPuttingModeError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type DisableShuffleBullsEyeTournamentAllowPuttingModeInput = {
  id: Scalars['ID']['input'];
};

export type DisableShuffleBullsEyeTournamentAllowPuttingModePayload = {
  __typename?: 'DisableShuffleBullsEyeTournamentAllowPuttingModePayload';
  errors?: Maybe<Array<DisableShuffleBullsEyeTournamentAllowPuttingModeError>>;
  result?: Maybe<ShuffleBullsEyeTournament>;
};

export type DisableTournamentPartnerConsentsFeatureError = DefaultError | EntityNotFoundError;

export type DisableTournamentPartnerConsentsFeatureInput = {
  id: Scalars['ID']['input'];
};

export type DisableTournamentPartnerConsentsFeaturePayload = {
  __typename?: 'DisableTournamentPartnerConsentsFeaturePayload';
  errors?: Maybe<Array<DisableTournamentPartnerConsentsFeatureError>>;
  tournament?: Maybe<Tournament>;
};

export type DisableTournamentPayPerEntryError = CanNotChangePayPerEnableStatusAfterPublishError | CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type DisableTournamentPayPerEntryInput = {
  id: Scalars['ID']['input'];
};

export type DisableTournamentPayPerEntryPayload = {
  __typename?: 'DisableTournamentPayPerEntryPayload';
  errors?: Maybe<Array<DisableTournamentPayPerEntryError>>;
  tournament?: Maybe<Tournament>;
};

export type DiscardRangeConfigurationDraftsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type DiscardRangeConfigurationDraftsInput = {
  configurationId: Scalars['ID']['input'];
};

export type DiscardRangeConfigurationDraftsPayload = {
  __typename?: 'DiscardRangeConfigurationDraftsPayload';
  errors?: Maybe<Array<DiscardRangeConfigurationDraftsError>>;
  result?: Maybe<AppMutationResult>;
};

export type DispersionCircle = {
  __typename?: 'DispersionCircle';
  /** The angle of the dispersion circle */
  angle?: Maybe<Scalars['Float']['output']>;
  /** The X coordinate of the center of the dispersion circle */
  centerX?: Maybe<Scalars['Float']['output']>;
  /** The Y coordinate of the center of the dispersion circle */
  centerY?: Maybe<Scalars['Float']['output']>;
  /** The maximum axis of the dispersion circle */
  maxAxis?: Maybe<Scalars['Float']['output']>;
  /** The minimum axis of the dispersion circle */
  minAxis?: Maybe<Scalars['Float']['output']>;
};

/** The data source for the dispersion circle */
export enum DispersionKind {
  Automatic = 'AUTOMATIC',
  Carry = 'CARRY',
  Total = 'TOTAL'
}

export type DisqualifyTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type DisqualifyTeamInput = {
  teamId: Scalars['ID']['input'];
};

export type DisqualifyTeamMemberError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type DisqualifyTeamMemberInput = {
  memberId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type DisqualifyTeamMemberPayload = {
  __typename?: 'DisqualifyTeamMemberPayload';
  errors?: Maybe<Array<DisqualifyTeamMemberError>>;
  team?: Maybe<TeamInterface>;
};

export type DisqualifyTeamPayload = {
  __typename?: 'DisqualifyTeamPayload';
  errors?: Maybe<Array<DisqualifyTeamError>>;
  team?: Maybe<TeamInterface>;
};

export type DistributionTable = {
  __typename?: 'DistributionTable';
  /** Order of merit point distribution pr. round */
  rounds?: Maybe<Array<Maybe<PointDistribution>>>;
};

export type Domain = Node & {
  __typename?: 'Domain';
  domain?: Maybe<DomainInfo>;
  id: Scalars['ID']['output'];
  roleCount?: Maybe<Scalars['Int']['output']>;
  roles?: Maybe<Array<Role>>;
  serviceAccounts?: Maybe<ServiceAccountPayloadTypeCollectionSegment>;
  users?: Maybe<UserRolesTypeCollectionSegment>;
};


export type DomainServiceAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type DomainUsersArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  includeServiceAccounts?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type DomainInfo = {
  __typename?: 'DomainInfo';
  displayName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type DomainUserAdminMutation = {
  __typename?: 'DomainUserAdminMutation';
  createUserRoles?: Maybe<UserRoles>;
  domainName?: Maybe<Scalars['String']['output']>;
  modifyUserRoles?: Maybe<UserRoles>;
};


export type DomainUserAdminMutationCreateUserRolesArgs = {
  email: Scalars['String']['input'];
  roleIds: Array<Scalars['ID']['input']>;
};


export type DomainUserAdminMutationModifyUserRolesArgs = {
  roleIds: Array<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};

/** A segment of a collection. */
export type DomainUserAdminTypeCollectionSegment = {
  __typename?: 'DomainUserAdminTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Domain>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type DrivingRangeConfiguration = {
  __typename?: 'DrivingRangeConfiguration';
  /** Is it possible to use the TrackMan mobile phone application */
  appUsed: Scalars['Boolean']['output'];
  /** All available virtual golf courses for this facility */
  courses?: Maybe<Array<Maybe<Course>>>;
  /** Available configurations for this range */
  coursesConfigurations?: Maybe<CoursesConfigurations>;
  /** The list of courses incl. settings currently running on the server. */
  deployedCourses?: Maybe<Array<Maybe<CourseWithSettingsDeployed>>>;
  /** The list of favorite course identifiers for this facility. */
  favoriteCourses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


export type DrivingRangeConfigurationDeployedCoursesArgs = {
  locationId?: InputMaybe<Scalars['String']['input']>;
};

/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutations = {
  __typename?: 'DrivingRangeConfigurationCourseInstanceMutations';
  /** Change all settings for this course instance */
  changeAll?: Maybe<DrivingRangeConfiguration>;
  /** Change the fairway firmness for this course instance */
  changeFairwayFirmness?: Maybe<DrivingRangeConfiguration>;
  /** Change the green firmness for this course instance */
  changeGreenFirmness?: Maybe<DrivingRangeConfiguration>;
  /** Change the green stimp for this course instance */
  changeGreenStimp?: Maybe<DrivingRangeConfiguration>;
  /** Change the lighting for this course instance */
  changeLighting?: Maybe<DrivingRangeConfiguration>;
  /** Change the pin difficulty for this course instance */
  changePinDifficulty?: Maybe<DrivingRangeConfiguration>;
  courseInstanceId?: Maybe<Scalars['String']['output']>;
};


/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutationsChangeAllArgs = {
  fairwayFirmness: Firmness;
  greenFirmness: Firmness;
  lighting: Lighting;
  pinDifficulty: Pin;
  stimp: Stimp;
};


/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutationsChangeFairwayFirmnessArgs = {
  fairwayFirmness: Firmness;
};


/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutationsChangeGreenFirmnessArgs = {
  greenFirmness: Firmness;
};


/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutationsChangeGreenStimpArgs = {
  stimp: Stimp;
};


/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutationsChangeLightingArgs = {
  lighting: Lighting;
};


/** Mutations available for a range course instance */
export type DrivingRangeConfigurationCourseInstanceMutationsChangePinDifficultyArgs = {
  pinDifficulty: Pin;
};

/** Mutations available for a future configuration */
export type DrivingRangeConfigurationFutureConfigurationMutationType = {
  __typename?: 'DrivingRangeConfigurationFutureConfigurationMutationType';
  /** Delete the future configuration */
  deleteFutureConfiguration?: Maybe<DrivingRangeConfiguration>;
  futureConfigurationId?: Maybe<Scalars['String']['output']>;
  /** Update the future configuration to one supplied */
  updateFutureConfiguration?: Maybe<DrivingRangeConfiguration>;
};


/** Mutations available for a future configuration */
export type DrivingRangeConfigurationFutureConfigurationMutationTypeUpdateFutureConfigurationArgs = {
  courseConfiguration: CourseSettingsListInputType;
};

/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutations = {
  __typename?: 'DrivingRangeConfigurationMutations';
  /** Add a course to the favorite courses for the facility */
  addCourseToFavorites?: Maybe<DrivingRangeConfiguration>;
  /** Add a course to the future configuration */
  addCourseToFutureConfiguration?: Maybe<DrivingRangeConfiguration>;
  /** Mutations available for updating a course instance */
  courseInstanceById?: Maybe<DrivingRangeConfigurationCourseInstanceMutations>;
  /** Create a new future configuration for this facilities driving ranges */
  createFutureConfiguration?: Maybe<DrivingRangeConfiguration>;
  /** Get available mutations for updating a specific future configuration */
  futureConfigurationById?: Maybe<DrivingRangeConfigurationFutureConfigurationMutationType>;
  /** Remove a course from the favorite courses for the facility */
  removeCourseFromFavorites?: Maybe<DrivingRangeConfiguration>;
  /** Remove a course from the future configuration */
  removeCourseFromFutureConfiguration?: Maybe<DrivingRangeConfiguration>;
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsAddCourseToFavoritesArgs = {
  courseIdentifier: Scalars['String']['input'];
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsAddCourseToFutureConfigurationArgs = {
  courseIdentifier: Scalars['String']['input'];
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsCourseInstanceByIdArgs = {
  instanceId: Scalars['String']['input'];
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsCreateFutureConfigurationArgs = {
  courseConfiguration: CourseSettingsListInputType;
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsFutureConfigurationByIdArgs = {
  futureConfigurationId: Scalars['String']['input'];
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsRemoveCourseFromFavoritesArgs = {
  courseIdentifier: Scalars['String']['input'];
};


/** Mutations available for a range configuration */
export type DrivingRangeConfigurationMutationsRemoveCourseFromFutureConfigurationArgs = {
  instanceId: Scalars['String']['input'];
};

export type DrivingRangeMetadataBay = {
  __typename?: 'DrivingRangeMetadataBay';
  angle?: Maybe<Scalars['String']['output']>;
  aspect?: Maybe<Scalars['String']['output']>;
  bayId?: Maybe<Scalars['String']['output']>;
  bayName?: Maybe<Scalars['String']['output']>;
  camera?: Maybe<Camera>;
  distanceString?: Maybe<Scalars['String']['output']>;
  hitAreaId?: Maybe<Scalars['String']['output']>;
  hitAreaName?: Maybe<Scalars['String']['output']>;
  image?: Maybe<DrivingRangeMetadataImage>;
  name?: Maybe<Scalars['String']['output']>;
  resolution?: Maybe<Scalars['String']['output']>;
  siteLocation?: Maybe<Array<Scalars['Float']['output']>>;
  tags?: Maybe<Array<KeyValue>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DrivingRangeMetadataImage = {
  __typename?: 'DrivingRangeMetadataImage';
  height: Scalars['Int']['output'];
  path?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  width: Scalars['Int']['output'];
};

export type DrivingRangeMetadataViewType = {
  __typename?: 'DrivingRangeMetadataViewType';
  angle?: Maybe<Scalars['String']['output']>;
  aspect?: Maybe<Scalars['String']['output']>;
  bayId?: Maybe<Scalars['String']['output']>;
  bayName?: Maybe<Scalars['String']['output']>;
  camera?: Maybe<Camera>;
  distanceString?: Maybe<Scalars['String']['output']>;
  hitAreaId?: Maybe<Scalars['String']['output']>;
  hitAreaName?: Maybe<Scalars['String']['output']>;
  image?: Maybe<DrivingRangeMetadataImage>;
  name?: Maybe<Scalars['String']['output']>;
  resolution?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<KeyValue>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DrivingRangesMetadata = {
  __typename?: 'DrivingRangesMetadata';
  coordinates?: Maybe<UtmModel3DCoordinate>;
  courseId?: Maybe<Scalars['String']['output']>;
  courseName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  heights?: Maybe<Array<Maybe<HeightPoint>>>;
  hitAreas?: Maybe<Array<Maybe<HitArea>>>;
  id?: Maybe<Scalars['String']['output']>;
  landing?: Maybe<Array<DrivingRangeMetadataBay>>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  launch?: Maybe<Array<DrivingRangeMetadataBay>>;
  side?: Maybe<Array<DrivingRangeMetadataViewType>>;
  siteId?: Maybe<Scalars['String']['output']>;
  siteKey?: Maybe<Scalars['String']['output']>;
  splash?: Maybe<DrivingRangeMetadataViewType>;
  top?: Maybe<Array<DrivingRangeMetadataViewType>>;
};


export type DrivingRangesMetadataLandingArgs = {
  angle?: InputMaybe<Scalars['String']['input']>;
  aspect?: InputMaybe<Scalars['String']['input']>;
  bayName?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type DrivingRangesMetadataLaunchArgs = {
  angle?: InputMaybe<Scalars['String']['input']>;
  aspect?: InputMaybe<Scalars['String']['input']>;
  bayName?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type DrivingRangesMetadataSideArgs = {
  angle?: InputMaybe<Scalars['String']['input']>;
  aspect?: InputMaybe<Scalars['String']['input']>;
  bayName?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type DrivingRangesMetadataTopArgs = {
  angle?: InputMaybe<Scalars['String']['input']>;
  aspect?: InputMaybe<Scalars['String']['input']>;
  distanceString?: InputMaybe<Scalars['String']['input']>;
  nearestDistance?: InputMaybe<Scalars['Float']['input']>;
  resolution?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type DuplicateInfoScreenError = DefaultError | EntityNotFoundError;

export type DuplicateInfoScreenInput = {
  existingId: Scalars['ID']['input'];
};

export type DuplicateInfoScreenPayload = {
  __typename?: 'DuplicateInfoScreenPayload';
  errors?: Maybe<Array<DuplicateInfoScreenError>>;
  infoScreen?: Maybe<InfoScreen>;
};

export type DuplicatePlayerNameError = BaseError & {
  __typename?: 'DuplicatePlayerNameError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type DuplicateRecordError = BaseError & {
  __typename?: 'DuplicateRecordError';
  code?: Maybe<Scalars['String']['output']>;
  entityName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum DurationKind {
  Day = 'Day',
  Month = 'Month',
  Unknown = 'Unknown',
  Week = 'Week'
}

export type DynamicReportActivity = Node & PlayerActivity & {
  __typename?: 'DynamicReportActivity';
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  mailId?: Maybe<Scalars['String']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  reportId?: Maybe<Scalars['String']['output']>;
  reportLink?: Maybe<Scalars['URL']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** Returns all received emails */
export type EmailHistory = {
  __typename?: 'EmailHistory';
  /** Receiver of the email */
  receiverEmail?: Maybe<Scalars['String']['output']>;
  /** Sender of the email */
  senderEmail?: Maybe<Scalars['String']['output']>;
  /** State of the email */
  state?: Maybe<Scalars['String']['output']>;
  /** Subject of the email */
  subject?: Maybe<Scalars['String']['output']>;
  /** Time when the email was received */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type EmbeddedGameLeaderboardUnion = ClosestToPin | LongestDrive;

/** The embedded game */
export enum EmbeddedGameType {
  ClosestToPin = 'CLOSEST_TO_PIN',
  LongestDrive = 'LONGEST_DRIVE',
  None = 'NONE'
}

export type EnableIntegrationResponse = {
  __typename?: 'EnableIntegrationResponse';
  created: Scalars['Boolean']['output'];
};

export type EnablePuttPuttTournamentTieBreakerError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type EnablePuttPuttTournamentTieBreakerInput = {
  id: Scalars['ID']['input'];
};

export type EnablePuttPuttTournamentTieBreakerPayload = {
  __typename?: 'EnablePuttPuttTournamentTieBreakerPayload';
  errors?: Maybe<Array<EnablePuttPuttTournamentTieBreakerError>>;
  tournament?: Maybe<Tournament>;
};

export type EnableRangeBaysError = DefaultError | EntityNotFoundError | UnauthorizedError;

export type EnableRangeBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
};

export type EnableRangeBaysPayload = {
  __typename?: 'EnableRangeBaysPayload';
  errors?: Maybe<Array<EnableRangeBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export type EnableRangeLaunchAreasError = DefaultError | UnauthorizedError;

export type EnableRangeLaunchAreasInput = {
  launchAreaIds: Array<Scalars['ID']['input']>;
};

export type EnableRangeLaunchAreasPayload = {
  __typename?: 'EnableRangeLaunchAreasPayload';
  errors?: Maybe<Array<EnableRangeLaunchAreasError>>;
  result?: Maybe<AppMutationResult>;
};

export type EnableRangeNetsError = DefaultError | UnauthorizedError;

export type EnableRangeNetsInput = {
  netIds: Array<Scalars['ID']['input']>;
};

export type EnableRangeNetsPayload = {
  __typename?: 'EnableRangeNetsPayload';
  errors?: Maybe<Array<EnableRangeNetsError>>;
  result?: Maybe<AppMutationResult>;
};

export type EnableRangeRadarsError = DefaultError | UnauthorizedError;

export type EnableRangeRadarsInput = {
  radarIds: Array<Scalars['ID']['input']>;
};

export type EnableRangeRadarsPayload = {
  __typename?: 'EnableRangeRadarsPayload';
  errors?: Maybe<Array<EnableRangeRadarsError>>;
  result?: Maybe<AppMutationResult>;
};

export type EnableRangeTargetsError = DefaultError | UnauthorizedError;

export type EnableRangeTargetsInput = {
  targetIds: Array<Scalars['ID']['input']>;
};

export type EnableRangeTargetsPayload = {
  __typename?: 'EnableRangeTargetsPayload';
  errors?: Maybe<Array<EnableRangeTargetsError>>;
  result?: Maybe<AppMutationResult>;
};

export type EnableSeasonPuttPuttActivityAllowTieBreakerError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type EnableSeasonPuttPuttActivityAllowTieBreakerInput = {
  id: Scalars['ID']['input'];
};

export type EnableSeasonPuttPuttActivityAllowTieBreakerPayload = {
  __typename?: 'EnableSeasonPuttPuttActivityAllowTieBreakerPayload';
  errors?: Maybe<Array<EnableSeasonPuttPuttActivityAllowTieBreakerError>>;
  result?: Maybe<SeasonPuttPuttActivity>;
};

export type EnableSeasonShuffleBullsEyeActivityAllowPuttingModeError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type EnableSeasonShuffleBullsEyeActivityAllowPuttingModeInput = {
  id: Scalars['ID']['input'];
};

export type EnableSeasonShuffleBullsEyeActivityAllowPuttingModePayload = {
  __typename?: 'EnableSeasonShuffleBullsEyeActivityAllowPuttingModePayload';
  errors?: Maybe<Array<EnableSeasonShuffleBullsEyeActivityAllowPuttingModeError>>;
  result?: Maybe<SeasonShuffleBullsEyeActivity>;
};

export type EnableShuffleBullsEyeTournamentAllowPuttingModeError = CanNotChangeThisWhenTournamentIsAlreadyPublishedError | DefaultError | EntityNotFoundError;

export type EnableShuffleBullsEyeTournamentAllowPuttingModeInput = {
  id: Scalars['ID']['input'];
};

export type EnableShuffleBullsEyeTournamentAllowPuttingModePayload = {
  __typename?: 'EnableShuffleBullsEyeTournamentAllowPuttingModePayload';
  errors?: Maybe<Array<EnableShuffleBullsEyeTournamentAllowPuttingModeError>>;
  result?: Maybe<ShuffleBullsEyeTournament>;
};

export type EnableTournamentPartnerConsentsFeatureError = DefaultError | EntityNotFoundError;

export type EnableTournamentPartnerConsentsFeatureInput = {
  id: Scalars['ID']['input'];
};

export type EnableTournamentPartnerConsentsFeaturePayload = {
  __typename?: 'EnableTournamentPartnerConsentsFeaturePayload';
  errors?: Maybe<Array<EnableTournamentPartnerConsentsFeatureError>>;
  tournament?: Maybe<Tournament>;
};

export type EnableTournamentPayPerEntryError = CanNotChangePayPerEnableStatusAfterPublishError | CanNotChangeThisWhenTournamentIsAlreadyPublishedError | CanOnlyEnablePayPerEntryForPaidTournamentError | DefaultError | EntityNotFoundError;

export type EnableTournamentPayPerEntryInput = {
  id: Scalars['ID']['input'];
};

export type EnableTournamentPayPerEntryPayload = {
  __typename?: 'EnableTournamentPayPerEntryPayload';
  errors?: Maybe<Array<EnableTournamentPayPerEntryError>>;
  tournament?: Maybe<Tournament>;
};

export type EndBaysSessionError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type EndBaysSessionInput = {
  bayIds: Array<Scalars['ID']['input']>;
  doNotEndSession?: InputMaybe<Scalars['Boolean']['input']>;
  lockScreen?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  scheduleTime?: InputMaybe<Scalars['DateTime']['input']>;
  secondsToEnd?: InputMaybe<Scalars['Int']['input']>;
  unlockCode?: InputMaybe<Scalars['String']['input']>;
  unlockUrl?: InputMaybe<Scalars['String']['input']>;
};

export type EndBaysSessionPayload = {
  __typename?: 'EndBaysSessionPayload';
  errors?: Maybe<Array<EndBaysSessionError>>;
  result?: Maybe<AppMutationResult>;
};

export type EndDateLessThanStartDateError = BaseError & {
  __typename?: 'EndDateLessThanStartDateError';
  code?: Maybe<Scalars['String']['output']>;
  endDateFieldName?: Maybe<Scalars['String']['output']>;
  endDateFieldValue: Scalars['DateTime']['output'];
  message?: Maybe<Scalars['String']['output']>;
  startDateFieldName?: Maybe<Scalars['String']['output']>;
  startDateFieldValue: Scalars['DateTime']['output'];
};

export enum EntityModificationStatusType {
  Added = 'ADDED',
  Deleted = 'DELETED',
  Modified = 'MODIFIED',
  Unchanged = 'UNCHANGED'
}

export type EntityNotFoundError = BaseError & {
  __typename?: 'EntityNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type EntityNotModifiableError = BaseError & {
  __typename?: 'EntityNotModifiableError';
  code?: Maybe<Scalars['String']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type EntityVersionInfo = {
  /** Indicates whether a draft version has been marked for delete on the next publish */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** Indicates whether this is a published or draft version of an entity */
  state: PublishState;
  /** The version of the entity */
  version: Scalars['String']['output'];
};

/** The course environment */
export type Environment = {
  __typename?: 'Environment';
  lighting: Lighting;
  /** The wind options */
  wind?: Maybe<Compass>;
};

export type Eqm = {
  __typename?: 'Eqm';
  /** Retrieve all equipment brands for the facility. */
  brands?: Maybe<EquipmentBrandTypeCollectionSegment>;
  facilityModel?: Maybe<Facility>;
};


export type EqmBrandsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type EquipmentBrand = Node & {
  __typename?: 'EquipmentBrand';
  /** The description of the brand. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The url to the brands logo. */
  logoUrl?: Maybe<Scalars['URL']['output']>;
  /** The name of the brand. */
  name?: Maybe<Scalars['String']['output']>;
  /** The url to the brands website. */
  webSiteUrl?: Maybe<Scalars['URL']['output']>;
};

/** A segment of a collection. */
export type EquipmentBrandTypeCollectionSegment = {
  __typename?: 'EquipmentBrandTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<EquipmentBrand>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Root container for equipment-related data */
export type EquipmentRootQuery = {
  __typename?: 'EquipmentRootQuery';
  /** Returns all known brands for user equipment */
  brands?: Maybe<EquipmentBrandTypeCollectionSegment>;
};


/** Root container for equipment-related data */
export type EquipmentRootQueryBrandsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type EquipmentSeries = Node & {
  __typename?: 'EquipmentSeries';
  id: Scalars['ID']['output'];
  /** The name of the equipment series. */
  name?: Maybe<Scalars['String']['output']>;
};

/** Returns an event log */
export type EventLog = {
  __typename?: 'EventLog';
  /** Event that happened */
  event?: Maybe<Scalars['String']['output']>;
  /** All event data */
  eventData?: Maybe<Scalars['JSON']['output']>;
  /** Details of the event */
  eventDetails?: Maybe<Scalars['String']['output']>;
  /** Id of the event */
  id?: Maybe<Scalars['String']['output']>;
  /** Players on the event */
  players?: Maybe<Array<Maybe<EventLogPerson>>>;
  /**
   * Recipients of the event
   * @deprecated Use players instead
   */
  recipients?: Maybe<Array<Maybe<EventLogRecipient>>>;
  /** Time when the event was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** User/coach on the event */
  user?: Maybe<EventLogPerson>;
};

/** A segment of a collection. */
export type EventLogItemTypeCollectionSegment = {
  __typename?: 'EventLogItemTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<EventLog>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Person on an event */
export type EventLogPerson = {
  __typename?: 'EventLogPerson';
  /** Email of the person */
  email?: Maybe<Scalars['String']['output']>;
  /** Id of the person */
  id?: Maybe<Scalars['String']['output']>;
  /** Name of the person */
  name?: Maybe<Scalars['String']['output']>;
};

/** Return recipient of an event */
export type EventLogRecipient = {
  __typename?: 'EventLogRecipient';
  /** Email of the recipient */
  email?: Maybe<Scalars['String']['output']>;
  /** Id of the recipient */
  id?: Maybe<Scalars['String']['output']>;
  /** Name of the recipient */
  name?: Maybe<Scalars['String']['output']>;
};

export type EventReportActivity = Node & PlayerActivity & {
  __typename?: 'EventReportActivity';
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  mailId?: Maybe<Scalars['String']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  reportPath?: Maybe<Scalars['URL']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type ExecuteQueuedCommandsError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type ExecuteQueuedCommandsInput = {
  bayIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ExecuteQueuedCommandsPayload = {
  __typename?: 'ExecuteQueuedCommandsPayload';
  errors?: Maybe<Array<ExecuteQueuedCommandsError>>;
  result?: Maybe<AppMutationResult>;
};

export type ExpiredLicense = {
  __typename?: 'ExpiredLicense';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  invalidMeasurements?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** The description of the facility */
export type Facility = KeyValuesInterfaceType & MediasInterface & Node & TagsInterfaceTypeOfLocationTagsType & {
  __typename?: 'Facility';
  Facility?: Maybe<Facility>;
  /** The address of the facility */
  address?: Maybe<Address>;
  /** The list of albums */
  albums?: Maybe<Array<Album>>;
  applicationProperties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** Return all bays in the facility */
  bays?: Maybe<Array<BayInterface>>;
  /** Search persons that have visited this facility */
  coaches?: Maybe<FacilityCoachTypeCollectionSegment>;
  coachesOnLocator?: Maybe<Array<CoachProfile>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  developerTools: DeveloperTools;
  /** The distance to the facility from the search point 'near' */
  distance?: Maybe<Scalars['Float']['output']>;
  drivingRangeConfiguration?: Maybe<DrivingRangeConfiguration>;
  /** The primary email to the facility */
  email?: Maybe<Scalars['String']['output']>;
  /** The phone number of the shop on the facility */
  emergencyPhoneNumber?: Maybe<Scalars['String']['output']>;
  eqm: Eqm;
  /** The unique key of the facility */
  facilityKey?: Maybe<Scalars['NonEmptyString']['output']>;
  /** Indicates if the location has a coach */
  hasCoach: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  infoScreens?: Maybe<InfoScreenTypeCollectionSegment>;
  /** The integration details of the facilities */
  integrations?: Maybe<Array<FacilityIntegrationResponse>>;
  /** Is this location also a facility */
  isDefaultLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Is this the default world location */
  isDefaultWorldLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate that a facility is deleted */
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the location has a premium portal subscription */
  isPremiumPortal?: Maybe<Scalars['Boolean']['output']>;
  /** Facility Key Account Priority */
  keyAccountPriority?: Maybe<FacilityKeyAccountPriority>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The facility kind */
  kind?: Maybe<FacilityKind>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** List of the leagues of this facility */
  leagues?: Maybe<LeagueTypeCollectionSegment>;
  /** Return all locations */
  locations?: Maybe<Array<LocationInterfaceType>>;
  /**
   * The url of the facilities logo image
   * @deprecated Use url
   */
  logoUrl?: Maybe<Scalars['URL']['output']>;
  /** The list of media assets */
  medias?: Maybe<Array<Media>>;
  /** The membership facility */
  membership?: Maybe<Membership>;
  /** A list of memberships for this facility */
  memberships?: Maybe<FacilityMembershipsCollectionSegment>;
  /** The name of the facility */
  name?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The net incidents of the facilities */
  netIncidents?: Maybe<NetIncidentTypeCollectionSegment>;
  /** The facility node kind */
  nodeKind?: Maybe<FacilityNodeKind>;
  /** Opening hours for the facility, including maintenance hours */
  openingHours?: Maybe<OpeningHours>;
  /** The template of partner with a supported consents */
  partnerTemplate: Partner;
  /**
   * The partners added for this facility
   * @deprecated Try to use partnersList with pagination instead
   */
  partners?: Maybe<Array<Partner>>;
  /** The list of partners added for this facility in pagination */
  partnersList?: Maybe<FacilityPartnersCollectionSegment>;
  permissions?: Maybe<Array<PermissionInfo>>;
  /** The primary phone number to the facility */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** Range-related entities available for this location */
  range: RangeLocationType;
  /** The scorecards for rounds played at this facility. Unless specified, FromDate is the last 30 days. */
  scorecards?: Maybe<ScorecardTypeCollectionSegment>;
  /** The phone number of the shop on the facility */
  shopPhoneNumber?: Maybe<Scalars['String']['output']>;
  /**
   * The sponsors campaigns added for this facility
   * @deprecated Please use 'sponsorCampaignsV2' instead
   */
  sponsorCampaigns?: Maybe<SponsorCampaignTypeCollectionSegment>;
  /** The sponsors campaigns added for this facility */
  sponsorCampaignsV2?: Maybe<SponsorCampaignTypeV2CollectionSegment>;
  /**
   * The url of the facilities sponsor logo image
   * @deprecated Use url
   */
  sponsorLogoUrl?: Maybe<Scalars['URL']['output']>;
  /** The sponsors added for this facility */
  sponsors?: Maybe<SponsorTypeCollectionSegment>;
  /** The list of tags */
  tags?: Maybe<Array<LocationUrlTags>>;
  /** The time zone where the facility is located */
  timezone?: Maybe<Scalars['String']['output']>;
  /** Return all tournaments */
  tournaments: FacilityTournaments;
  /** The url of the facilities logo image */
  url?: Maybe<Scalars['URL']['output']>;
  userAdmin?: Maybe<Domain>;
  /** Search persons that have visited this facility */
  visitors?: Maybe<FacilityVisitorTypeCollectionSegment>;
  /** The GPS position of the facility */
  worldLocation?: Maybe<LatLon>;
};


/** The description of the facility */
export type FacilityApplicationPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


/** The description of the facility */
export type FacilityBaysArgs = {
  types?: InputMaybe<BayTypes>;
};


/** The description of the facility */
export type FacilityCoachesArgs = {
  locationId?: InputMaybe<Array<Scalars['ID']['input']>>;
  orderBy?: InputMaybe<Array<VisitorOrderBy>>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The description of the facility */
export type FacilityHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The description of the facility */
export type FacilityHasTagArgs = {
  tag: LocationUrlTags;
};


/** The description of the facility */
export type FacilityInfoScreensArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityIntegrationsArgs = {
  providerKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The description of the facility */
export type FacilityKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The description of the facility */
export type FacilityLeaguesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityMediasArgs = {
  mediaKind?: InputMaybe<MediaKind>;
};


/** The description of the facility */
export type FacilityMembershipsArgs = {
  filter?: InputMaybe<SearchMembershipsInput>;
  order?: InputMaybe<Array<MembershipSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityNetIncidentsArgs = {
  byIncident?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  periodFrom?: InputMaybe<Scalars['DateTime']['input']>;
  periodTo?: InputMaybe<Scalars['DateTime']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityPartnersArgs = {
  kinds?: InputMaybe<Array<PartnerKind>>;
};


/** The description of the facility */
export type FacilityPartnersListArgs = {
  filter?: InputMaybe<FacilityPartnerFilter>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityScorecardsArgs = {
  courseIdentifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  playerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  playerNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
  tournamentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tournamentRoundIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** The description of the facility */
export type FacilitySponsorCampaignsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilitySponsorCampaignsV2Args = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilitySponsorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type FacilityUrlArgs = {
  kind: LocationUrlKinds;
};


/** The description of the facility */
export type FacilityVisitorsArgs = {
  locationId?: InputMaybe<Array<Scalars['ID']['input']>>;
  orderBy?: InputMaybe<Array<VisitorOrderBy>>;
  partner?: InputMaybe<Scalars['ID']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A coach connected to a facility */
export type FacilityCoach = Node & {
  __typename?: 'FacilityCoach';
  /** The coach profile */
  coachProfile?: Maybe<CoachProfile>;
  id: Scalars['ID']['output'];
  /** Information available for this person */
  person?: Maybe<PersonInfo>;
  /** Students connected to a coach */
  students?: Maybe<FacilityCoachStudents>;
};

/** A coach connected to a facility */
export type FacilityCoachStudents = {
  __typename?: 'FacilityCoachStudents';
  /** Get activities for this coach's students where the he/she is the coach */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** Search students for this coach */
  search?: Maybe<CoachStudentTypeCollectionSegment>;
};


/** A coach connected to a facility */
export type FacilityCoachStudentsActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** A coach connected to a facility */
export type FacilityCoachStudentsSearchArgs = {
  orderBy?: InputMaybe<Array<VisitorOrderBy>>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A segment of a collection. */
export type FacilityCoachTypeCollectionSegment = {
  __typename?: 'FacilityCoachTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<FacilityCoach>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilityIntegrationResponse = {
  isEnabled: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  providerKey?: Maybe<Scalars['String']['output']>;
};

export type FacilityIntegrationsMutations = {
  __typename?: 'FacilityIntegrationsMutations';
  /** remove the integration of the facility */
  disable: Scalars['Boolean']['output'];
  /** integrate a facility to the provider */
  enable: EnableIntegrationResponse;
};


export type FacilityIntegrationsMutationsDisableArgs = {
  facilityId: Scalars['ID']['input'];
  providerKey: Scalars['String']['input'];
};


export type FacilityIntegrationsMutationsEnableArgs = {
  facilityId: Scalars['ID']['input'];
  providerKey: Scalars['String']['input'];
};

/** Priority level of the facility */
export enum FacilityKeyAccountPriority {
  None = 'NONE',
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO'
}

/** The different kinds available for a facility */
export enum FacilityKind {
  IndoorSimulator = 'INDOOR_SIMULATOR',
  IndoorSimulatorAndRange = 'INDOOR_SIMULATOR_AND_RANGE',
  NothingAssigned = 'NOTHING_ASSIGNED',
  Range = 'RANGE',
  Unknown = 'UNKNOWN'
}

/** A segment of a collection. */
export type FacilityLabelsCollectionSegment = {
  __typename?: 'FacilityLabelsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LabelType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilityMembershipMutation = {
  __typename?: 'FacilityMembershipMutation';
  changeAccess?: Maybe<Facility>;
};


export type FacilityMembershipMutationChangeAccessArgs = {
  access?: InputMaybe<MembershipAccess>;
};

/** A segment of a collection. */
export type FacilityMembershipsCollectionSegment = {
  __typename?: 'FacilityMembershipsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<MembershipInfo>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Mutations on a Facility */
export type FacilityMutation = {
  __typename?: 'FacilityMutation';
  /** Mutations on an album */
  album?: Maybe<AlbumMutation>;
  /** Mutations on a bays */
  bays?: Maybe<BaysMutation>;
  /** @deprecated Try to use `changeBaysLocation` instead */
  changeBayLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Change the name of the facility */
  changeName?: Maybe<Facility>;
  /** Change the url for an existing one */
  changeUrl?: Maybe<Facility>;
  /** Change if the driving range app is used on this facility´s range installations */
  changeUseDrivingRangeApp?: Maybe<Facility>;
  /**
   * Create a new indoor bay sponsor campaign
   * @deprecated Please use 'createIndoorSponsorCampaign' instead
   */
  createIndoorBaySponsorCampaign?: Maybe<IndoorBaySponsorCampaign>;
  /** Create a new indoor sponsor campaign */
  createIndoorSponsorCampaign?: Maybe<IndoorSponsorCampaign>;
  /** Create a new info screen */
  createInfoScreen?: Maybe<InfoScreen>;
  /** Create a league in this facility */
  createLeague?: Maybe<League>;
  /** Create a location */
  createLocation?: Maybe<LocationInterfaceType>;
  /**
   * Create a new partner
   * @deprecated Try to use `addFacilityPartner` mutation instead
   */
  createPartner?: Maybe<Partner>;
  /**
   * Create a new range bay sponsor campaign
   * @deprecated Please use 'createRangeSponsorCampaign' instead
   */
  createRangeBaySponsorCampaign?: Maybe<IndoorBaySponsorCampaign>;
  /** Create a new configuration for a location */
  createRangeConfiguration?: Maybe<Facility>;
  /** Create a new range sponsor campaign */
  createRangeSponsorCampaign?: Maybe<RangeSponsorCampaign>;
  /** Create a new sponsor */
  createSponsor?: Maybe<Sponsor>;
  /**
   * Create a new sponsor campaign
   * @deprecated Use the new mutations for for creating typed sponsor campaigns
   */
  createSponsorCampaign?: Maybe<SponsorCampaign>;
  /** Delete the facility */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Soft delete of the partners
   * @deprecated Try to use `removeFacilityPartner` mutation instead
   */
  deletePartners?: Maybe<Scalars['Boolean']['output']>;
  /** Delete the url */
  deleteUrl?: Maybe<Facility>;
  developerTools?: Maybe<DeveloperToolsMutationType>;
  /** Mutations available for the range configuration */
  drivingRangeConfiguration?: Maybe<DrivingRangeConfigurationMutations>;
  /** Mutations on a media */
  media?: Maybe<MediaMutation>;
  /** Mutations for facility membership */
  membership?: Maybe<FacilityMembershipMutation>;
  /** Mutations on a partner */
  partnerById?: Maybe<PartnerMutations>;
  /** Rotate facility courses without waiting for maintenance hours */
  rotateFacilityCourses: Scalars['Boolean']['output'];
  /** Get a scorecard mutation by scorecard Id */
  scorecard?: Maybe<ScorecardMutations>;
  /** Add Or Update application properties */
  setApplicationProperties?: Maybe<LocationInterfaceType>;
  /** Method for updating the key value collections on the facility */
  setKeyValues?: Maybe<Facility>;
  /** Method for updating the tags collections on the facility */
  setTags?: Maybe<Facility>;
  /** Update all properties in one go */
  update?: Maybe<Facility>;
  /** Mutations for user role administration */
  userAdmin?: Maybe<DomainUserAdminMutation>;
};


/** Mutations on a Facility */
export type FacilityMutationBaysArgs = {
  bayIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Facility */
export type FacilityMutationChangeBayLocationArgs = {
  bayIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationChangeNameArgs = {
  name: Scalars['NonEmptyString']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationChangeUrlArgs = {
  url: UrlInput;
};


/** Mutations on a Facility */
export type FacilityMutationChangeUseDrivingRangeAppArgs = {
  appUsed?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Facility */
export type FacilityMutationCreateIndoorBaySponsorCampaignArgs = {
  sponsorCampaign: IndoorBaySponsorCampaignInputType;
};


/** Mutations on a Facility */
export type FacilityMutationCreateIndoorSponsorCampaignArgs = {
  sponsorCampaign: IndoorSponsorCampaignInputType;
};


/** Mutations on a Facility */
export type FacilityMutationCreateInfoScreenArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationCreateLeagueArgs = {
  league: CreateLeagueInput;
};


/** Mutations on a Facility */
export type FacilityMutationCreateLocationArgs = {
  address: AddressInput;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  emergencyPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  shopPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<LocationUrlTags>>>;
  urls?: InputMaybe<Array<InputMaybe<UrlInput>>>;
  worldLocation?: InputMaybe<LatLonInputType>;
};


/** Mutations on a Facility */
export type FacilityMutationCreatePartnerArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['Url']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationCreateRangeBaySponsorCampaignArgs = {
  sponsorCampaign: RangeBaySponsorCampaignInputType;
};


/** Mutations on a Facility */
export type FacilityMutationCreateRangeSponsorCampaignArgs = {
  sponsorCampaign: RangeSponsorCampaignInputType;
};


/** Mutations on a Facility */
export type FacilityMutationCreateSponsorArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  logoUrl: Scalars['Url']['input'];
  name: Scalars['String']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationCreateSponsorCampaignArgs = {
  sponsorCampaign: SponsorCampaignInputType;
};


/** Mutations on a Facility */
export type FacilityMutationDeletePartnersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Facility */
export type FacilityMutationDeleteUrlArgs = {
  kind: LocationUrlKinds;
};


/** Mutations on a Facility */
export type FacilityMutationPartnerByIdArgs = {
  partnerId: Scalars['ID']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationScorecardArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on a Facility */
export type FacilityMutationSetApplicationPropertiesArgs = {
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>>>;
  application: Scalars['String']['input'];
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Facility */
export type FacilityMutationSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Facility */
export type FacilityMutationSetTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<LocationUrlTags>>>;
  removeTags?: InputMaybe<Array<InputMaybe<LocationUrlTags>>>;
};


/** Mutations on a Facility */
export type FacilityMutationUpdateArgs = {
  address?: InputMaybe<AddressInput>;
  appUsed?: InputMaybe<Scalars['Boolean']['input']>;
  defaultWorldLocation?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  emergencyPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openingHours?: InputMaybe<OpeningHoursInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  shopPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<InputMaybe<UrlInput>>>;
  worldLocation?: InputMaybe<LatLonInputType>;
};

/** The different node kinds of a facility */
export enum FacilityNodeKind {
  Facility = 'FACILITY',
  Location = 'LOCATION',
  Organization = 'ORGANIZATION'
}

export type FacilityPartnerConsentInput = {
  /** The description of the consent */
  description: Scalars['NonEmptyString']['input'];
  /** The info url of the consent */
  infoUrl?: InputMaybe<Scalars['URL']['input']>;
  /** Mark the consent as mandatory */
  isMandatory?: Scalars['Boolean']['input'];
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Scalars['Boolean']['input'];
  /** Default value of the consent */
  isSelectedByDefault?: Scalars['Boolean']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  /** The kind of the consent */
  kind: ConsentKind;
  /** The localization */
  localization?: InputMaybe<Array<PartnerConsentLocalizedInput>>;
  /** Minimum value is used for the Age consent */
  minimumValue?: InputMaybe<Scalars['Float']['input']>;
  /** The title of the consent */
  title: Scalars['NonEmptyString']['input'];
  /** The version of the consent */
  version?: InputMaybe<Scalars['String']['input']>;
};

export type FacilityPartnerFilter = {
  kinds?: InputMaybe<Array<PartnerKind>>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};

/** A segment of a collection. */
export type FacilityPartnersCollectionSegment = {
  __typename?: 'FacilityPartnersCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Partner>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum FacilitySortBy {
  KeyAccountPriority = 'KEY_ACCOUNT_PRIORITY',
  Name = 'NAME'
}

export type FacilityTournaments = {
  __typename?: 'FacilityTournaments';
  /** VG courses to be shown in the Tournaments editor */
  availableCourses?: Maybe<Array<Course>>;
  /** The tournament id */
  id?: Maybe<Scalars['ID']['output']>;
  /** Tournaments available for this facility. Various filters available */
  list?: Maybe<FacilityTournamentsTypeCollectionSegment>;
};


export type FacilityTournamentsAvailableCoursesArgs = {
  courseContext?: InputMaybe<CourseContextKinds>;
  includeNonSelectableCourses?: InputMaybe<Scalars['Boolean']['input']>;
  product?: InputMaybe<TrackmanProductKinds>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type FacilityTournamentsListArgs = {
  isEvent?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isFeaturedPaid?: InputMaybe<Scalars['Boolean']['input']>;
  isIndoor?: InputMaybe<Scalars['Boolean']['input']>;
  isRange?: InputMaybe<Scalars['Boolean']['input']>;
  isTeamTournament?: InputMaybe<Scalars['Boolean']['input']>;
  list?: InputMaybe<TournamentListKinds>;
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  tournamentKinds?: InputMaybe<Array<TournamentTypes>>;
  withPendingInvitation?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A segment of a collection. */
export type FacilityTournamentsTypeCollectionSegment = {
  __typename?: 'FacilityTournamentsTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Tournament>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type FacilityTypeCollectionSegment = {
  __typename?: 'FacilityTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Facility>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilityUserConsentItem = {
  __typename?: 'FacilityUserConsentItem';
  consents?: Maybe<Array<UserConsentItem>>;
  facilityName?: Maybe<Scalars['String']['output']>;
};

export type FacilityVisitor = Node & {
  __typename?: 'FacilityVisitor';
  /** Activities connected to a person */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** Consents for the facility */
  consents?: Maybe<Array<Maybe<FacilityVisitorConsent>>>;
  /**
   * Return all info abut the players TrackMan handicap
   * @deprecated Use person.hcp
   */
  hcp?: Maybe<Hcp>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** When the location was last visited */
  lastVisited?: Maybe<Scalars['DateTime']['output']>;
  /** Information available for this person */
  person?: Maybe<PersonInfo>;
  /** The scorecards for rounds played at this facility. */
  scorecards?: Maybe<ScorecardTypeCollectionSegment>;
  /** Number of days the location was visited */
  visitedDays?: Maybe<Scalars['Int']['output']>;
};


export type FacilityVisitorActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


export type FacilityVisitorConsentsArgs = {
  kinds?: InputMaybe<Array<InputMaybe<PartnerKind>>>;
  types?: InputMaybe<Array<InputMaybe<ConsentKind>>>;
};


export type FacilityVisitorScorecardsArgs = {
  courseIdentifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  searchTournamentsText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
  tournamentIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tournamentRoundIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FacilityVisitorConsent = {
  __typename?: 'FacilityVisitorConsent';
  /** Consent accepted or not */
  accepted: Scalars['Boolean']['output'];
  /** The Description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * The kind of the consent
   * @deprecated Try to use the enum field `KindValue`
   */
  kind: Scalars['String']['output'];
  /** The kind of the consent */
  kindValue: ConsentKind;
  /** The partner kind of the consent */
  partnerKind?: Maybe<PartnerKind>;
  /** The Title of the consent */
  title?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type FacilityVisitorTypeCollectionSegment = {
  __typename?: 'FacilityVisitorTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<FacilityVisitor>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FairwaySettings = {
  __typename?: 'FairwaySettings';
  firmness?: Maybe<Scalars['String']['output']>;
};

export type FindMyDistance = {
  __typename?: 'FindMyDistance';
  /** Club statistics based on the Map My Bag shots */
  clubStats?: Maybe<ClubStatistic>;
  /** The dispersion circle of the clubs Map My Bag shots */
  dispersionCircle?: Maybe<DispersionCircle>;
  /** The number of shots saved for this club */
  numberOfShots?: Maybe<Scalars['Int']['output']>;
  /** The shots used for Map My Bag */
  shots?: Maybe<Array<Maybe<FindMyDistanceShot>>>;
};


export type FindMyDistanceDispersionCircleArgs = {
  dispersionKind?: InputMaybe<DispersionKind>;
  margin?: Scalars['Int']['input'];
};

export type FindMyDistanceParameters = {
  __typename?: 'FindMyDistanceParameters';
  /** The ball speed of the shot */
  ballSpeed: Scalars['Float']['output'];
  /** The ball type used for the shot */
  ballType?: Maybe<BallTypeEnum>;
  /** The club speed for the shot */
  clubSpeed?: Maybe<Scalars['Float']['output']>;
  /** The launch angle of the shot */
  launchAngle: Scalars['Float']['output'];
  /** The launch direction of the shot */
  launchDirection: Scalars['Float']['output'];
  /** The spin axis of the shot */
  spinAxis?: Maybe<Scalars['Float']['output']>;
  /** The spin loft of the shot */
  spinLoft?: Maybe<Scalars['Float']['output']>;
  /** The spin rate of the shot */
  spinRate?: Maybe<Scalars['Float']['output']>;
};

export type FindMyDistanceShot = {
  __typename?: 'FindMyDistanceShot';
  /** The data and time the shot was recorded */
  createdAt: Scalars['DateTime']['output'];
  /** The launch parameters of the shot */
  launchParameters?: Maybe<FindMyDistanceParameters>;
  /** The measurement data for the shot. Please not that this is a limited measurement generated by the launch parameters. Because of that, all club related data points are not available. */
  measurement: ShotMeasurement;
  /** The measurement id of the shot */
  measurementId: Scalars['String']['output'];
};

export type FindMyDistanceShotInput = {
  /** The date and time the shot was recorded */
  createdAt: Scalars['DateTime']['input'];
  /** The launch parameters of the shot */
  launchParameters?: InputMaybe<LaunchParametersInputType>;
  /** The measurement Id of the shot */
  measurementId: Scalars['String']['input'];
};

export enum Firmness {
  Count = 'COUNT',
  Hard = 'HARD',
  None = 'NONE',
  Normal = 'NORMAL',
  Soft = 'SOFT'
}

/** Friend in a friendship */
export type Friend = {
  __typename?: 'Friend';
  /** Information about this person */
  person?: Maybe<PersonInfo>;
  /** Friendship status for friend */
  status: FriendshipStatus;
  /** Teams for this person */
  teams?: Maybe<FriendTeamsCollectionCollectionSegment>;
};


/** Friend in a friendship */
export type FriendTeamsArgs = {
  eventId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type FriendTeamsCollectionCollectionSegment = {
  __typename?: 'FriendTeamsCollectionCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TeamInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A friendship */
export type Friendship = Node & {
  __typename?: 'Friendship';
  /** The time the friendship was created */
  createdAt: Scalars['DateTime']['output'];
  /** The friends in the friendship */
  friends: Array<Friend>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /**
   * The friendship kind
   * @deprecated No longer used
   */
  kind: FriendshipKind;
  /** The friendship status */
  status: FriendshipStatus;
};

/** The friendship kind */
export enum FriendshipKind {
  /** Friendship with only one friend */
  Individual = 'individual',
  /** Friendship with one or more friends */
  Team = 'team'
}

/** Mutations on friendship */
export type FriendshipMutation = {
  __typename?: 'FriendshipMutation';
  /** Accept friendship */
  accept?: Maybe<Friendship>;
  /** Cancel friendship */
  cancel?: Maybe<Friendship>;
  /** Decline friendship */
  decline?: Maybe<Friendship>;
  /** Withdraw friendship */
  withdraw?: Maybe<Friendship>;
};

/** The friendship status */
export enum FriendshipStatus {
  /** The friendship is accepted */
  Accepted = 'accepted',
  /** The friendship is cancelled */
  Cancelled = 'cancelled',
  /** The friendship is declined */
  Declined = 'declined',
  /** No friendship */
  None = 'none',
  /** The friendship request has been received */
  Received = 'received',
  /** The friendship request has been sent */
  Sent = 'sent',
  /** The friendship is withdrawn */
  Withdrawn = 'withdrawn'
}

export type Friendships = {
  __typename?: 'Friendships';
  /** All accepted friend requests */
  accepted?: Maybe<Array<Maybe<Friendship>>>;
  /** All friend requests */
  all?: Maybe<Array<Maybe<Friendship>>>;
  /** All cancelled by me */
  cancelled?: Maybe<Array<Maybe<Friendship>>>;
  /** All declined by friend */
  declined?: Maybe<Array<Maybe<Friendship>>>;
  /** All received friend request */
  received?: Maybe<Array<Maybe<Friendship>>>;
  /** Search persons */
  searchPerson?: Maybe<SearchPersonInfoTypeCollectionSegment>;
  /** All sent friend request */
  sent?: Maybe<Array<Maybe<Friendship>>>;
  /** All withdrawn by me */
  withdrawn?: Maybe<Array<Maybe<Friendship>>>;
};


export type FriendshipsAcceptedArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type FriendshipsAllArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type FriendshipsCancelledArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type FriendshipsDeclinedArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type FriendshipsReceivedArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type FriendshipsSearchPersonArgs = {
  fullSearch: Scalars['String']['input'];
  maxRadius?: InputMaybe<Scalars['Float']['input']>;
  near?: InputMaybe<LatLonInputType>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type FriendshipsSentArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type FriendshipsWithdrawnArgs = {
  personIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Mutations on friendships */
export type FriendshipsMutation = {
  __typename?: 'FriendshipsMutation';
  /** Add a friend */
  addFriend?: Maybe<Friendship>;
};


/** Mutations on friendships */
export type FriendshipsMutationAddFriendArgs = {
  friendId: Scalars['ID']['input'];
};

export enum GameFormats {
  Alternate = 'ALTERNATE',
  Better = 'BETTER',
  Greensomes = 'GREENSOMES',
  Individual = 'INDIVIDUAL',
  Scramble = 'SCRAMBLE'
}

/** Information on the game */
export type GameSettings = {
  __typename?: 'GameSettings';
  gameBall?: Maybe<Scalars['String']['output']>;
  gamePlay?: Maybe<Scalars['String']['output']>;
  /** The scoring method for the game */
  gameScore?: Maybe<Scalars['String']['output']>;
  handicapped: Scalars['Boolean']['output'];
  holes: Scalars['Int']['output'];
  mulligans?: Maybe<Scalars['String']['output']>;
  pins?: Maybe<Scalars['String']['output']>;
  /** The putting settings */
  puttingSettings?: Maybe<PuttingSettings>;
  selectedHoles?: Maybe<Array<Scalars['Int']['output']>>;
  teamSize: Scalars['Int']['output'];
  units?: Maybe<Scalars['String']['output']>;
};

export enum GameSummaryKinds {
  Birdies = 'BIRDIES',
  BirdieStreak = 'BIRDIE_STREAK',
  GreensInRegulation = 'GREENS_IN_REGULATION'
}

export type GameSummaryLeaderboardRecord = {
  __typename?: 'GameSummaryLeaderboardRecord';
  /** The number of albatrosses made in this round */
  albatrosses?: Maybe<Scalars['Int']['output']>;
  /** The number of birdies or better in a row */
  birdieStreak?: Maybe<Scalars['Int']['output']>;
  /** The number of birdies made in this round */
  birdies?: Maybe<Scalars['Int']['output']>;
  continentCode?: Maybe<Scalars['String']['output']>;
  continentName?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseName?: Maybe<Scalars['String']['output']>;
  /** The number of eagles or better in a row */
  eagleStreak?: Maybe<Scalars['Int']['output']>;
  /** The number of eagles made in this round */
  eagles?: Maybe<Scalars['Int']['output']>;
  /** The number of greens in regulation in a row */
  greenInRegulationStreak?: Maybe<Scalars['Int']['output']>;
  /** The number of green in regulation made in this round */
  greenInRegulations?: Maybe<Scalars['Int']['output']>;
  /** The number of pars made in this round */
  pars?: Maybe<Scalars['Int']['output']>;
  player?: Maybe<PersonInfo>;
  /** Position on the leaderboard */
  pos?: Maybe<Scalars['Int']['output']>;
  /** Position label */
  posLabel?: Maybe<Scalars['Int']['output']>;
  regionCode?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
  /** The score for the leaderboard */
  score?: Maybe<Scalars['Int']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type GameSummaryLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'GameSummaryLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<GameSummaryLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type GameTournamentProgress = TournamentProgressInterface & {
  __typename?: 'GameTournamentProgress';
  autoJoin?: Maybe<Scalars['Boolean']['output']>;
  isTeamProgress?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<PersonInfo>;
  participantGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  playAsGuest?: Maybe<Scalars['Boolean']['output']>;
  playerStatus?: Maybe<Scalars['String']['output']>;
};

export enum GameTypes {
  Match = 'MATCH',
  Stableford = 'STABLEFORD',
  Stroke = 'STROKE',
  StrokeNet = 'STROKE_NET'
}

/** Unit for the game */
export enum GameUnit {
  Feet = 'FEET',
  Meters = 'METERS'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export enum GeoFilterFields {
  Continent = 'CONTINENT',
  Country = 'COUNTRY',
  Region = 'REGION'
}

export type GeoLocation = {
  __typename?: 'GeoLocation';
  cityName?: Maybe<Scalars['String']['output']>;
  continentCode?: Maybe<Scalars['String']['output']>;
  continentName?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  ipAddess?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  regionCode?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
};

/** Global leaderboards */
export type GlobalLeaderboards = {
  __typename?: 'GlobalLeaderboards';
  /** Combine Test Leaderboard */
  combineTestLeaderboard?: Maybe<CombineLeaderboard>;
  /** All completed 18 hole courses */
  coursePlayLeaderboard?: Maybe<Array<CoursePlayLeaderboardRecord>>;
  /** All hole in ones */
  holeInOneLeaderboard?: Maybe<Array<HoleInOneLeaderboardRecord>>;
};


/** Global leaderboards */
export type GlobalLeaderboardsCombineTestLeaderboardArgs = {
  ageFrom?: InputMaybe<Scalars['Int']['input']>;
  ageTo?: InputMaybe<Scalars['Int']['input']>;
  combineTestMode?: InputMaybe<CombineTestMode>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  target?: InputMaybe<CombineTestTarget>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Global leaderboards */
export type GlobalLeaderboardsCoursePlayLeaderboardArgs = {
  countryCode?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  courseIdentifier?: InputMaybe<Scalars['String']['input']>;
  facilityIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Global leaderboards */
export type GlobalLeaderboardsHoleInOneLeaderboardArgs = {
  countryCode?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  facilityIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GreenSettings = {
  __typename?: 'GreenSettings';
  firmness?: Maybe<Scalars['String']['output']>;
  quality?: Maybe<Scalars['String']['output']>;
  stimpMeter: Scalars['Float']['output'];
};

export type Group = {
  __typename?: 'Group';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  id: Scalars['UUID']['output'];
  kind?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GroupType = {
  __typename?: 'GroupType';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  id?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Object having the TrackMan handicap data */
export type Hcp = {
  __typename?: 'Hcp';
  /** The current TrackMan handicap */
  currentHcp?: Maybe<Scalars['Decimal']['output']>;
  /** The current TrackMan handicap record */
  currentRecord?: Maybe<HcpRecord>;
  /**
   * The TrackMan handicap records
   * @deprecated Use playerHistory for paging
   */
  history?: Maybe<Array<HcpRecord>>;
  /** The TrackMan handicap records */
  playerHistory?: Maybe<HcpHistoryCollectionSegment>;
};


/** Object having the TrackMan handicap data */
export type HcpHistoryArgs = {
  onlyInAvg?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Object having the TrackMan handicap data */
export type HcpPlayerHistoryArgs = {
  onlyInAvg?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum HcpCap {
  HardCap = 'HARD_CAP',
  None = 'NONE',
  SoftCap = 'SOFT_CAP'
}

/** A segment of a collection. */
export type HcpHistoryCollectionSegment = {
  __typename?: 'HcpHistoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HcpRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum HcpKind {
  AskForHcp = 'ASK_FOR_HCP',
  TrackmanIndoor = 'TRACKMAN_INDOOR'
}

export type HcpMutations = {
  __typename?: 'HcpMutations';
  /** Updates the hcp for the given players */
  updatePlayersHcp?: Maybe<UpdatePlayerHcpCommandResult>;
};


export type HcpMutationsUpdatePlayersHcpArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']['input']>;
  excludeScorecardIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  playerDbIds: Array<InputMaybe<Scalars['String']['input']>>;
  sendNotification?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HcpRecord = {
  __typename?: 'HcpRecord';
  /** Adjusted GrossScore */
  adjustedGrossScore: Scalars['Float']['output'];
  /** Adjustment */
  adjustment: Scalars['Float']['output'];
  /** The list of scorecards the latest adjustment is based on */
  adjustmentBasedOn?: Maybe<Array<HcpRecord>>;
  /** The list of all the scorecards the current hcp index is based on */
  avgBasedOn?: Maybe<Array<HcpRecord>>;
  /** The time this record was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** New Hcp */
  hcpNew: Scalars['Float']['output'];
  /** Old Hcp */
  hcpOld?: Maybe<Scalars['Float']['output']>;
  /** The db id of this record */
  id?: Maybe<Scalars['String']['output']>;
  isInAvg?: Maybe<Scalars['Boolean']['output']>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** ScoreDifferential */
  scoreDifferential: Scalars['Float']['output'];
  /** The scorecard this record is based on */
  scorecard?: Maybe<Scorecard>;
  /** TeeInfo */
  teeInfo?: Maybe<TeeInfoWithoutHoles>;
};

export type HeightPoint = {
  __typename?: 'HeightPoint';
  height: Scalars['Float']['output'];
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type HitArea = {
  __typename?: 'HitArea';
  camera?: Maybe<Camera>;
  image?: Maybe<DrivingRangeMetadataImage>;
  name?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<KeyValue>>;
  type?: Maybe<Scalars['String']['output']>;
  vertices?: Maybe<Array<Maybe<Array<Scalars['Float']['output']>>>>;
};

export type HoleInOneLeaderboardRecord = {
  __typename?: 'HoleInOneLeaderboardRecord';
  averageDistanceToPin?: Maybe<Scalars['Float']['output']>;
  continentCode?: Maybe<Scalars['String']['output']>;
  continentName?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  holeDistance?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedBy?: Maybe<Scalars['String']['output']>;
  player?: Maybe<PersonInfo>;
  regionCode?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  tags?: Maybe<Array<Maybe<LeaderboardRecordTag>>>;
  time?: Maybe<Scalars['DateTime']['output']>;
  totalDistanceAllShots?: Maybe<Scalars['Float']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value1Normalized?: Maybe<Scalars['Float']['output']>;
  value1Normalized2?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value2Normalized?: Maybe<Scalars['Float']['output']>;
  value2Normalized2?: Maybe<Scalars['Float']['output']>;
  values?: Maybe<Array<KeyValuePairOfStringAndDouble>>;
};

export type HoleInfo = {
  __typename?: 'HoleInfo';
  /** The length of the hole from the tee */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The hole number */
  holeNumber: Scalars['Int']['output'];
  /** The par of the hole from the tee */
  par?: Maybe<Scalars['Int']['output']>;
  /** The stroke index of the hole from the tee */
  strokeIndex?: Maybe<Scalars['Int']['output']>;
};

export type HolePin = {
  __typename?: 'HolePin';
  difficulty?: Maybe<HolePinDifficulty>;
  /** The position the tee */
  position?: Maybe<Position>;
  region?: Maybe<Scalars['String']['output']>;
  worldLocation?: Maybe<LatLon>;
};

export enum HolePinDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type HoleSponsorInputType = {
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  sponsorId?: InputMaybe<Scalars['ID']['input']>;
};

/** Get sponsor information for sponsor added to this hole */
export type HoleSponsorType = {
  __typename?: 'HoleSponsorType';
  /** Hole number of the course */
  holeNumber?: Maybe<Scalars['Int']['output']>;
  /** Sponsor information */
  sponsor?: Maybe<Sponsor>;
};

/** Get sponsor information for sponsor added to this hole */
export type HoleSponsorTypeV2 = {
  __typename?: 'HoleSponsorTypeV2';
  /** Hole number of the course */
  holeNumber?: Maybe<Scalars['Int']['output']>;
  /** Sponsor information */
  sponsor?: Maybe<Sponsor>;
};

export type HoleTee = {
  __typename?: 'HoleTee';
  distance: Scalars['Float']['output'];
  groupId?: Maybe<Scalars['String']['output']>;
  par: Scalars['Int']['output'];
  /** Physical Tee Tag Id */
  physicalTeeTagId?: Maybe<Scalars['String']['output']>;
  /** The position the tee */
  position?: Maybe<Position>;
  strokeIndex: Scalars['Int']['output'];
  worldLocation?: Maybe<LatLon>;
};

export type HoleTemplate = {
  __typename?: 'HoleTemplate';
  distance?: Maybe<Scalars['Float']['output']>;
  hcpStroke?: Maybe<Scalars['Int']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<ImageResource>;
  images?: Maybe<Array<Maybe<MediaResource>>>;
  par?: Maybe<Scalars['Int']['output']>;
  strokeIndex?: Maybe<Scalars['Int']['output']>;
  teeName?: Maybe<Scalars['String']['output']>;
};


export type HoleTemplateImageArgs = {
  kind?: InputMaybe<Scalars['String']['input']>;
};

/** Holes selector type */
export enum HolesToPlay {
  /** All holes */
  AllHoles = 'ALL_HOLES',
  /** The last 9 holes */
  BackNine = 'BACK_NINE',
  /** The first 9 holes */
  FrontNine = 'FRONT_NINE',
  /** All par 3 holes */
  Par3Holes = 'PAR3_HOLES',
  /** All par 4 holes */
  Par4Holes = 'PAR4_HOLES',
  /** All par 5 holes */
  Par5Holes = 'PAR5_HOLES',
  /** The specified holes */
  Specific = 'SPECIFIC'
}

export type HoselPoint = {
  __typename?: 'HoselPoint';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  horizontal: Scalars['Float']['output'];
  vertical: Scalars['Float']['output'];
};

export type HostnameOrMacAddressInvalidFormatError = BaseError & {
  __typename?: 'HostnameOrMacAddressInvalidFormatError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type IdValue = {
  __typename?: 'IdValue';
  /** Change the persons email */
  changeEmail?: Maybe<AdminPersonInfo>;
  /** Generate temporary password for this person */
  generateTempPassword?: Maybe<Scalars['String']['output']>;
  /** Merge another person to this person */
  merge?: Maybe<Scalars['Boolean']['output']>;
  /** Schedule GDPR data deletion */
  scheduleGdprDeletion?: Maybe<Scalars['String']['output']>;
  /** Schedule GDPR data extraction and receive it by email */
  scheduleGdprExtraction?: Maybe<Scalars['Boolean']['output']>;
  typeName?: Maybe<Scalars['String']['output']>;
  /** Update all the profile properties in one go */
  update?: Maybe<AdminPersonInfo>;
};


export type IdValueChangeEmailArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type IdValueMergeArgs = {
  fromPersonId?: InputMaybe<Scalars['String']['input']>;
};


export type IdValueScheduleGdprExtractionArgs = {
  receiverEmail?: InputMaybe<Scalars['String']['input']>;
};


export type IdValueUpdateArgs = {
  category?: InputMaybe<PlayerCategory>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  dexterity?: InputMaybe<PlayerDexterity>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  handicap?: InputMaybe<Scalars['Float']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nationalityCode?: InputMaybe<Scalars['String']['input']>;
  playerName?: InputMaybe<Scalars['String']['input']>;
};

export enum ImageKinds {
  Flag = 'FLAG',
  Promotion = 'PROMOTION',
  Splash = 'SPLASH',
  SplashEvening = 'SPLASH_EVENING',
  SplashEveningWebp = 'SPLASH_EVENING_WEBP',
  SplashWebp = 'SPLASH_WEBP',
  Thumbnail = 'THUMBNAIL',
  ThumbnailEvening = 'THUMBNAIL_EVENING',
  ThumbnailEveningPortrait = 'THUMBNAIL_EVENING_PORTRAIT',
  ThumbnailLargeCard = 'THUMBNAIL_LARGE_CARD',
  ThumbnailPortrait = 'THUMBNAIL_PORTRAIT',
  ThumbnailSmallCard = 'THUMBNAIL_SMALL_CARD',
  ThumbnailWithText = 'THUMBNAIL_WITH_TEXT',
  TopView = 'TOP_VIEW'
}

export type ImageResource = {
  __typename?: 'ImageResource';
  cdnUri?: Maybe<Scalars['Url']['output']>;
  height: Scalars['Int']['output'];
  kind?: Maybe<Scalars['String']['output']>;
  metaCdnUri?: Maybe<Scalars['Url']['output']>;
  metaUri?: Maybe<Scalars['Url']['output']>;
  sha256?: Maybe<Scalars['String']['output']>;
  size: Scalars['Float']['output'];
  uri?: Maybe<Scalars['Url']['output']>;
  width: Scalars['Int']['output'];
};

export type ImpactLocation = {
  __typename?: 'ImpactLocation';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  dynamicLie: Scalars['Float']['output'];
  impactHeight: Scalars['Float']['output'];
  impactOffset: Scalars['Float']['output'];
};

export type IncreaseNumericUserPropertyValueError = ConcurrencyViolationError | DefaultError | InvalidDataTypeError | MissingMandatoryFieldError;

export type IncreaseNumericUserPropertyValueInput = {
  application: Scalars['String']['input'];
  propertyKey: Scalars['String']['input'];
  value: Scalars['Float']['input'];
};

export type IncreaseNumericUserPropertyValuePayload = {
  __typename?: 'IncreaseNumericUserPropertyValuePayload';
  errors?: Maybe<Array<IncreaseNumericUserPropertyValueError>>;
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
};

export type IndoorBaySponsorCampaign = Node & SponsorCampaignV2 & {
  __typename?: 'IndoorBaySponsorCampaign';
  active?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Use 'bays' from 'IndoorSponsorCampaign' type */
  baySponsors?: Maybe<Array<Maybe<BaySponsorType>>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  id: Scalars['ID']['output'];
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /**
   * The locations covered by this campaign
   * @deprecated Use 'locations' from 'IndoorSponsorCampaign' type
   */
  locations?: Maybe<Array<Maybe<LocationInterfaceType>>>;
  startDate: Scalars['DateTime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SponsorCampaignKinds>;
};

export type IndoorBaySponsorCampaignInputType = {
  /** Is the sponsor campaign active */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** The locations where this campaign applies */
  baySponsors?: InputMaybe<Array<InputMaybe<BaySponsorInputTypeType>>>;
  /** The locations where this campaign applies */
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  /** The title for the campaign */
  title: Scalars['String']['input'];
};

/** Mutations on a sponsor campaign */
export type IndoorBaySponsorCampaignMutation = SponsorCampaignMutationInterfaceType & {
  __typename?: 'IndoorBaySponsorCampaignMutation';
  /** Delete sponsor campaign */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Update active state for this sponsor campaign */
  setActive?: Maybe<SponsorCampaignV2>;
  /** Update title for this sponsor campaign */
  setTitle?: Maybe<SponsorCampaignV2>;
  /**
   * Change the name of the location
   * @deprecated Use 'update' from 'IndoorSponsorCampaignMutation' type
   */
  update?: Maybe<IndoorBaySponsorCampaign>;
};


/** Mutations on a sponsor campaign */
export type IndoorBaySponsorCampaignMutationSetActiveArgs = {
  active?: Scalars['Boolean']['input'];
};


/** Mutations on a sponsor campaign */
export type IndoorBaySponsorCampaignMutationSetTitleArgs = {
  title?: InputMaybe<Scalars['NonEmptyString']['input']>;
};


/** Mutations on a sponsor campaign */
export type IndoorBaySponsorCampaignMutationUpdateArgs = {
  sponsorCampaign: IndoorBaySponsorCampaignInputType;
};

/** Indoor site server */
export type IndoorSiteServer = Node & {
  __typename?: 'IndoorSiteServer';
  dbId?: Maybe<Scalars['String']['output']>;
  /** List of disks in this server */
  disks?: Maybe<Array<Maybe<IndoorSiteServerDisk>>>;
  /** Folders information for this indoor site server */
  folders?: Maybe<Array<Maybe<IndoorSiteServerFolder>>>;
  /** Host name of indoor site server */
  hostName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Mac address of indoor site server */
  macAddress: Scalars['String']['output'];
  /** Serial number of indoor site server */
  serialNumber: Scalars['String']['output'];
  /** Provisioning process status of indoor site server */
  status: IndoorSiteServerStatus;
  /** Current state of running indoor site server */
  upState?: Maybe<UpState>;
};

export type IndoorSiteServerApplicationData = ApplicationDataInterface & {
  __typename?: 'IndoorSiteServerApplicationData';
  /** It always returns null because the indoor site server does not have the required data. */
  activityLayout?: Maybe<ApplicationLayout>;
  /** It always returns null because the indoor site server does not have the required data. */
  applicationLayout?: Maybe<ApplicationLayout>;
  /** It always returns null because the indoor site server does not have the required data. */
  bay?: Maybe<RangeBay>;
  client?: Maybe<ApplicationClients>;
  /** Return course metadata */
  courses?: Maybe<CourseTypeCollectionSegment>;
  /** Get indoor site server location id */
  locationId?: Maybe<Scalars['String']['output']>;
  /** It always returns null because the indoor site server does not have the required data. */
  properties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** It always returns null because the indoor site server does not have the required data. */
  releases?: Maybe<ReleasesModel>;
  /** Get indoor site server status */
  status?: Maybe<IndoorSiteServerStatus>;
  /** It always returns null because the indoor site server does not have the required data. */
  tournamentLayout?: Maybe<ApplicationLayout>;
  /** List of latest resources that have to precache for TPS */
  vgUpdates?: Maybe<TrackManResourceTypeCollectionSegment>;
};


export type IndoorSiteServerApplicationDataActivityLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
};


export type IndoorSiteServerApplicationDataCoursesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type IndoorSiteServerApplicationDataPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


export type IndoorSiteServerApplicationDataReleasesArgs = {
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type IndoorSiteServerApplicationDataTournamentLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type IndoorSiteServerApplicationDataVgUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type IndoorSiteServerDisk = {
  __typename?: 'IndoorSiteServerDisk';
  /** Free space of this disk */
  freeSpace?: Maybe<Scalars['Long']['output']>;
  /** Size of this disk */
  size?: Maybe<Scalars['Long']['output']>;
};

export type IndoorSiteServerFolder = {
  __typename?: 'IndoorSiteServerFolder';
  /** Name of this folder */
  name?: Maybe<Scalars['String']['output']>;
  /** Size of this folder */
  size?: Maybe<Scalars['Long']['output']>;
};

export enum IndoorSiteServerStatus {
  Active = 'ACTIVE',
  Detected = 'DETECTED',
  Provisioning = 'PROVISIONING'
}

export type IndoorSponsorCampaign = Node & SponsorCampaignV2 & {
  __typename?: 'IndoorSponsorCampaign';
  active?: Maybe<Scalars['Boolean']['output']>;
  /** Is all bays covered by this campaign */
  allBays?: Maybe<Scalars['Boolean']['output']>;
  /** Is all courses covered by this campaign */
  allCourses?: Maybe<Scalars['Boolean']['output']>;
  /** Is all locations covered by this campaign */
  allLocations?: Maybe<Scalars['Boolean']['output']>;
  /** The bays covered by this campaign */
  bays?: Maybe<Array<Maybe<SimulatorBay>>>;
  /** The courses covered by this campaign */
  courses?: Maybe<Array<Maybe<Course>>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /**
   * The sponsor shown on the given hole
   * @deprecated Use 'holeSponsorsV2'
   */
  holeSponsors?: Maybe<Array<Maybe<HoleSponsorTypeV2>>>;
  /** The sponsor shown on the given hole */
  holeSponsorsV2: Array<Maybe<HoleSponsorTypeV2>>;
  id: Scalars['ID']['output'];
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The locations covered by this campaign */
  locations?: Maybe<Array<Maybe<LocationInterfaceType>>>;
  startDate: Scalars['DateTime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SponsorCampaignKinds>;
};

export type IndoorSponsorCampaignInputType = {
  /** Is the sponsor campaign active */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** The bays where this campaign applies */
  bays?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The course identifiers this campaign covers - if null or empty, all courses will covered */
  courses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The end date for the campaign */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The sponsors covering the holes */
  holeSponsors: Array<HoleSponsorInputType>;
  /** The locations where this campaign applies */
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  /** The start date for the campaign */
  startDate: Scalars['DateTime']['input'];
  /** The title for the campaign */
  title: Scalars['String']['input'];
};

/** Mutations on a sponsor campaign */
export type IndoorSponsorCampaignMutation = SponsorCampaignMutationInterfaceType & {
  __typename?: 'IndoorSponsorCampaignMutation';
  /** Delete sponsor campaign */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Update active state for this sponsor campaign */
  setActive?: Maybe<SponsorCampaignV2>;
  /** Update title for this sponsor campaign */
  setTitle?: Maybe<SponsorCampaignV2>;
  /** Change the name of the location */
  update?: Maybe<IndoorSponsorCampaign>;
};


/** Mutations on a sponsor campaign */
export type IndoorSponsorCampaignMutationSetActiveArgs = {
  active?: Scalars['Boolean']['input'];
};


/** Mutations on a sponsor campaign */
export type IndoorSponsorCampaignMutationSetTitleArgs = {
  title?: InputMaybe<Scalars['NonEmptyString']['input']>;
};


/** Mutations on a sponsor campaign */
export type IndoorSponsorCampaignMutationUpdateArgs = {
  sponsorCampaign: IndoorSponsorCampaignInputType;
};

export type InfoScreen = KeyValuesInterfaceType & Node & {
  __typename?: 'InfoScreen';
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Array<InfoScreenPage>>;
};


export type InfoScreenHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type InfoScreenKeyValueArgs = {
  key: Scalars['String']['input'];
};

/** Mutations on a InfoScreen */
export type InfoScreenId = {
  __typename?: 'InfoScreenId';
  /** Add new page to the InfoScreen */
  addPage?: Maybe<InfoScreenPage>;
  /** change the name of the InfoScreen */
  changeName?: Maybe<InfoScreen>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Method for updating the key value collections on the facility */
  setKeyValues?: Maybe<InfoScreen>;
};


/** Mutations on a InfoScreen */
export type InfoScreenIdAddPageArgs = {
  displayDuration?: InputMaybe<Scalars['String']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  layout?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a InfoScreen */
export type InfoScreenIdChangeNameArgs = {
  newName: Scalars['String']['input'];
};


/** Mutations on a InfoScreen */
export type InfoScreenIdSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type InfoScreenPage = KeyValuesInterfaceType & Node & {
  __typename?: 'InfoScreenPage';
  displayDuration?: Maybe<Scalars['String']['output']>;
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<InfoScreenPageItem>>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  layout?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};


export type InfoScreenPageHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type InfoScreenPageKeyValueArgs = {
  key: Scalars['String']['input'];
};

/** Mutations on a InfoScreen type */
export type InfoScreenPageId = {
  __typename?: 'InfoScreenPageId';
  /** Add new item to the InfoScreen page */
  addItem?: Maybe<InfoScreenPageItem>;
  /** change the display duration of infoScreen Page */
  changeDisplayDuration?: Maybe<InfoScreenPage>;
  /** change the layout of infoScreen Page */
  changeLayout?: Maybe<InfoScreenPage>;
  /** change the name of the InfoScreen page */
  changeName?: Maybe<InfoScreenPage>;
  /** Delete the page */
  deletePage?: Maybe<Scalars['Boolean']['output']>;
  /** Method for updating the key value collections on the page */
  setKeyValues?: Maybe<InfoScreenPage>;
};


/** Mutations on a InfoScreen type */
export type InfoScreenPageIdAddItemArgs = {
  index?: InputMaybe<Scalars['Int']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a InfoScreen type */
export type InfoScreenPageIdChangeDisplayDurationArgs = {
  displayDuration: Scalars['String']['input'];
};


/** Mutations on a InfoScreen type */
export type InfoScreenPageIdChangeLayoutArgs = {
  layout: Scalars['String']['input'];
};


/** Mutations on a InfoScreen type */
export type InfoScreenPageIdChangeNameArgs = {
  newName: Scalars['String']['input'];
};


/** Mutations on a InfoScreen type */
export type InfoScreenPageIdSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type InfoScreenPageItem = KeyValuesInterfaceType & Node & {
  __typename?: 'InfoScreenPageItem';
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  kind?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
};


export type InfoScreenPageItemHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type InfoScreenPageItemKeyValueArgs = {
  key: Scalars['String']['input'];
};

/** Mutations on a InfoScreen page */
export type InfoScreenPageItemId = {
  __typename?: 'InfoScreenPageItemId';
  /** Change the kind of the InfoScreen page item */
  changeKind?: Maybe<InfoScreen>;
  /** Change the position of the InfoScreen page item */
  changePosition?: Maybe<InfoScreen>;
  /** Delete InfoScreen page item */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Method for updating the key value collections on the page */
  setKeyValues?: Maybe<InfoScreenPageItem>;
};


/** Mutations on a InfoScreen page */
export type InfoScreenPageItemIdChangeKindArgs = {
  kind: Scalars['String']['input'];
};


/** Mutations on a InfoScreen page */
export type InfoScreenPageItemIdChangePositionArgs = {
  position: Scalars['String']['input'];
};


/** Mutations on a InfoScreen page */
export type InfoScreenPageItemIdSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A segment of a collection. */
export type InfoScreenTypeCollectionSegment = {
  __typename?: 'InfoScreenTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<InfoScreen>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type InvalidBirthDateError = BaseError & {
  __typename?: 'InvalidBirthDateError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  minimumAge: Scalars['Int']['output'];
};

export type InvalidDataTypeError = BaseError & {
  __typename?: 'InvalidDataTypeError';
  code?: Maybe<Scalars['String']['output']>;
  expectedType?: Maybe<Scalars['String']['output']>;
  fieldName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type InvalidPhoneNumberError = BaseError & {
  __typename?: 'InvalidPhoneNumberError';
  code?: Maybe<Scalars['String']['output']>;
  fieldName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type InvalidPhoneVerificationCodeError = BaseError & {
  __typename?: 'InvalidPhoneVerificationCodeError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type InvalidStartDateAndEndDateTournamentError = BaseError & {
  __typename?: 'InvalidStartDateAndEndDateTournamentError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type InvalidStringValueLengthError = BaseError & {
  __typename?: 'InvalidStringValueLengthError';
  code?: Maybe<Scalars['String']['output']>;
  fieldName?: Maybe<Scalars['String']['output']>;
  maxLength: Scalars['Long']['output'];
  message?: Maybe<Scalars['String']['output']>;
  minLength: Scalars['Long']['output'];
};

export type Invitation = Node & {
  __typename?: 'Invitation';
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** The email address this invitations was sent to. */
  invitationEmail?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the invitation is paid */
  isPaid?: Maybe<Scalars['Boolean']['output']>;
  /** Is the invitation sent to a Trackman email */
  isTrackmanUser?: Maybe<Scalars['Boolean']['output']>;
  /** The number of attempts user has played in the corresponding event. Right now it only supports tournaments */
  numberOfUsedAttempts?: Maybe<Scalars['Int']['output']>;
  /** The group(s) in the tournament the person belongs to. */
  participantGroups?: Maybe<PlayerGroups>;
  /** Payment information */
  payment?: Maybe<PaymentInformation>;
  /** Information about the person */
  person?: Maybe<InvitationPerson>;
  /** The number of attempts left for the user to play in the corresponding event. Right now it only supports tournaments */
  remainingNumberOfAttempts?: Maybe<Scalars['Int']['output']>;
  /** The reply date and time */
  replyAt?: Maybe<Scalars['DateTime']['output']>;
  /** The status for this invitation */
  status?: Maybe<InvitationStatus>;
  /** The total number of tickets for this invitation */
  totalNumberOfTickets?: Maybe<Scalars['Int']['output']>;
  /** The tournament for this invitation */
  tournament?: Maybe<Tournament>;
};

/** Invitation person in an invitation */
export type InvitationPerson = {
  __typename?: 'InvitationPerson';
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player fullname */
  fullName?: Maybe<Scalars['String']['output']>;
  /** Handicap */
  handicap?: Maybe<Scalars['String']['output']>;
  /** TrackMan Indoor Hcp */
  hcp?: Maybe<HcpRecord>;
  /**
   * Player name
   * @deprecated Use playerName instead
   */
  nickName?: Maybe<Scalars['String']['output']>;
  /** Picture */
  picture?: Maybe<Scalars['String']['output']>;
  /** Player name */
  playerName?: Maybe<Scalars['String']['output']>;
};

/** The invitation status */
export enum InvitationStatus {
  /** The invitation is accepted */
  Accepted = 'accepted',
  /** The invitation is waiting for activation */
  Awaiting = 'awaiting',
  /** The invitation is declined */
  Declined = 'declined',
  /** The invitation is pending */
  Pending = 'pending',
  /** The invitation is withdrawn */
  Withdrawn = 'withdrawn'
}

/** A segment of a collection. */
export type InvitationTypeCollectionSegment = {
  __typename?: 'InvitationTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Invitation>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** An overview of all player invitations for a tournament */
export type Invitations = {
  __typename?: 'Invitations';
  /** All accepted invitations */
  accepted?: Maybe<InvitationTypeCollectionSegment>;
  /**
   * Number of accepted invitations
   * @deprecated use accepted.total
   */
  acceptedCount: Scalars['Int']['output'];
  /** All invitations */
  allInvitations?: Maybe<InvitationTypeCollectionSegment>;
  /**
   * Number of all invitations
   * @deprecated use allInvitations.total
   */
  allInvitationsCount: Scalars['Int']['output'];
  /** All declined invitations */
  declined?: Maybe<InvitationTypeCollectionSegment>;
  /**
   * Number of declined invitations
   * @deprecated use declined.total
   */
  declinedCount: Scalars['Int']['output'];
  demographics?: Maybe<InvitationsDemographics>;
  /** All pending invitations */
  pending?: Maybe<InvitationTypeCollectionSegment>;
  /**
   * Number of pending invitations
   * @deprecated use pending.total
   */
  pendingCount: Scalars['Int']['output'];
  /** All withdrawn invitations */
  withdrawn?: Maybe<InvitationTypeCollectionSegment>;
  /**
   * Number of withdrawn invitations
   * @deprecated use withdrawn.total
   */
  withdrawnCount: Scalars['Int']['output'];
};


/** An overview of all player invitations for a tournament */
export type InvitationsAcceptedArgs = {
  partner?: InputMaybe<Scalars['String']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** An overview of all player invitations for a tournament */
export type InvitationsAllInvitationsArgs = {
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** An overview of all player invitations for a tournament */
export type InvitationsDeclinedArgs = {
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** An overview of all player invitations for a tournament */
export type InvitationsPendingArgs = {
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** An overview of all player invitations for a tournament */
export type InvitationsWithdrawnArgs = {
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type InvitationsDemographics = {
  __typename?: 'InvitationsDemographics';
  /** Return the player with the lowest, average and highest age. Only includes players with an age. */
  ages?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  /** Return which genders are represented in the accepted invitations. Only includes players with a gender */
  genders?: Maybe<Array<Gender>>;
  /** Return the player with the lowest, average and highest handicap. Only includes players with a handicap. */
  handicaps?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  /** Return which nationalities (country code) that are represented in the accepted invitations. Only includes players with a nationality */
  nationalities?: Maybe<Array<Scalars['String']['output']>>;
  /** Return which player categories are represented in the accepted invitations. Only includes players with a player category */
  playerCategories?: Maybe<Array<PlayerCategory>>;
};

export type KeyValue = {
  __typename?: 'KeyValue';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type KeyValueInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type KeyValuePairOfStringAndDouble = {
  __typename?: 'KeyValuePairOfStringAndDouble';
  key: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type KeyValuePairOfStringAndDouble__ = {
  __typename?: 'KeyValuePairOfStringAndDouble__';
  key: Scalars['String']['output'];
  value: Array<Scalars['Float']['output']>;
};

export type KeyValuePairOfStringAndInt64 = {
  __typename?: 'KeyValuePairOfStringAndInt64';
  key: Scalars['String']['output'];
  value: Scalars['Long']['output'];
};

export type KeyValuePairOfStringAndLeaderboardRoundScore = {
  __typename?: 'KeyValuePairOfStringAndLeaderboardRoundScore';
  key: Scalars['String']['output'];
  value: LeaderboardRoundScore;
};

export type KeyValuePairOfStringAndObject = {
  __typename?: 'KeyValuePairOfStringAndObject';
  key: Scalars['String']['output'];
};

export type KeyValuesInterfaceType = {
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values added */
  keyValues?: Maybe<Array<KeyValue>>;
};


export type KeyValuesInterfaceTypeHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type KeyValuesInterfaceTypeKeyValueArgs = {
  key: Scalars['String']['input'];
};

export type LabelFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Sort options for searching labels */
export type LabelSortInput = {
  name?: InputMaybe<SortEnumType>;
};

/** A label that can be associated to an entity */
export type LabelType = Node & {
  __typename?: 'LabelType';
  /** The color of the label */
  color?: Maybe<Scalars['String']['output']>;
  /** The description of the label */
  description?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** The name of the label */
  name?: Maybe<Scalars['String']['output']>;
};

/** A world location */
export type LatLon = {
  __typename?: 'LatLon';
  /** The altitude of the location (if present) */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Url to a google map with a in at the location */
  googleMapUrl?: Maybe<Scalars['URL']['output']>;
  /** The latitude of the location */
  latitude: Scalars['Float']['output'];
  /** The longitude of the location */
  longitude: Scalars['Float']['output'];
  /** Universal Transverse Mercator (UTM) coordinate system. Uses the WGS 84 Datum by default. */
  utm?: Maybe<Utm>;
};

export type LatLonAlt = {
  __typename?: 'LatLonAlt';
  /** The altitude of the location */
  alt?: Maybe<Scalars['Float']['output']>;
  bearingTo: Scalars['Float']['output'];
  crossTrackDistanceTo: Scalars['Float']['output'];
  crossingParallels?: Maybe<TupleOfDoubleAndDouble>;
  destinationPoint?: Maybe<LatLon>;
  distanceTo: Scalars['Float']['output'];
  finalBearingTo: Scalars['Float']['output'];
  intersection?: Maybe<LatLon>;
  /** The latitude of the location */
  lat?: Maybe<Scalars['Float']['output']>;
  /** The longitude of the location */
  lon?: Maybe<Scalars['Float']['output']>;
  maxLatitude: Scalars['Float']['output'];
  midpointTo?: Maybe<LatLon>;
};


export type LatLonAltBearingToArgs = {
  point?: InputMaybe<LatLonInputType>;
};


export type LatLonAltCrossTrackDistanceToArgs = {
  pathEnd?: InputMaybe<LatLonInputType>;
  pathStart?: InputMaybe<LatLonInputType>;
  radius?: Scalars['Float']['input'];
};


export type LatLonAltCrossingParallelsArgs = {
  latitude: Scalars['Float']['input'];
  point1?: InputMaybe<LatLonInputType>;
  point2?: InputMaybe<LatLonInputType>;
};


export type LatLonAltDestinationPointArgs = {
  bearing: Scalars['Float']['input'];
  distance: Scalars['Float']['input'];
  radius?: Scalars['Float']['input'];
};


export type LatLonAltDistanceToArgs = {
  point?: InputMaybe<LatLonInputType>;
  radius?: Scalars['Float']['input'];
};


export type LatLonAltFinalBearingToArgs = {
  point?: InputMaybe<LatLonInputType>;
};


export type LatLonAltIntersectionArgs = {
  brng1: Scalars['Float']['input'];
  brng2: Scalars['Float']['input'];
  p1?: InputMaybe<LatLonInputType>;
  p2?: InputMaybe<LatLonInputType>;
};


export type LatLonAltMaxLatitudeArgs = {
  bearing: Scalars['Float']['input'];
};


export type LatLonAltMidpointToArgs = {
  point?: InputMaybe<LatLonInputType>;
};

export type LatLonInputType = {
  /** The latitude of the location */
  lat: Scalars['Float']['input'];
  /** The longitude of the location */
  lon: Scalars['Float']['input'];
};

export type LaunchAreaCoordinatesInput = {
  worldPoint?: InputMaybe<WorldCoord>;
};

export type LaunchAreaFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify whether to returned enabled, disabled or all launch areas regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the launch area. If unspecified, only published launch areas will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Sort options for searching range launch area */
export type LaunchAreaSortInput = {
  name?: InputMaybe<SortEnumType>;
  version?: InputMaybe<SortEnumType>;
};

/** A Launch Area on a driving range */
export type LaunchAreaType = Node & {
  __typename?: 'LaunchAreaType';
  dbId?: Maybe<Scalars['String']['output']>;
  /** Description of the launch area */
  description?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicate whether this data is enabled or not */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate whether this data is valid or not */
  isValid?: Maybe<Scalars['Boolean']['output']>;
  /** The location the launch area is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the launch area */
  name?: Maybe<Scalars['String']['output']>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
  /** Returns version information about the draft and published version of the launch area */
  versionInfo: LaunchAreaVersionInfoType;
  /** The vertices of the launch area */
  vertices?: Maybe<Array<Maybe<CoordinatesType>>>;
};

export type LaunchAreaVersionFilter = {
  /** Specify whether to return enabled, disabled or all launch areas regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the launch area. If unspecified, only published launch areas will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Version information for a Driving Range launch area */
export type LaunchAreaVersionInfoType = EntityVersionInfo & {
  __typename?: 'LaunchAreaVersionInfoType';
  /** Returns the current draft version of the Launch Area if one exists */
  draftVersion?: Maybe<LaunchAreaType>;
  /** Indicates whether a draft version has been marked for delete on the next publish */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** The timestamp of this version's publication date */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Returns the latest published version of the Launch Area if one exists */
  publishedVersion?: Maybe<LaunchAreaType>;
  /** Indicates whether this is a published or draft version of an entity */
  state: PublishState;
  /** The version of the entity */
  version: Scalars['String']['output'];
  /** The other versions of the launch area */
  versions?: Maybe<LaunchAreaVersionsCollectionSegment>;
};


/** Version information for a Driving Range launch area */
export type LaunchAreaVersionInfoTypeVersionsArgs = {
  filter?: InputMaybe<LaunchAreaVersionFilter>;
  order?: InputMaybe<Array<LaunchAreaSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type LaunchAreaVersionsCollectionSegment = {
  __typename?: 'LaunchAreaVersionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LaunchAreaType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type LaunchParametersInputType = {
  /** The ball speed in m/s measured for the shot */
  ballSpeed: Scalars['Float']['input'];
  /** The type of ball used for the shot */
  ballType?: InputMaybe<BallTypeEnum>;
  /** The club speed in m/s measured for the shot */
  clubSpeed?: InputMaybe<Scalars['Float']['input']>;
  /** The launch angle measured in degrees for the shot */
  launchAngle: Scalars['Float']['input'];
  /** The launch direction measured in degrees for the shot */
  launchDirection: Scalars['Float']['input'];
  /** The spin axis measured for the shot */
  spinAxis?: InputMaybe<Scalars['Float']['input']>;
  /** The spin loft measured in degrees for the shot */
  spinLoft?: InputMaybe<Scalars['Float']['input']>;
  /** The spin rate measured in rpm for the shot */
  spinRate?: InputMaybe<Scalars['Float']['input']>;
};

export type LayoutResource = {
  __typename?: 'LayoutResource';
  displayName?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  subType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Leaderboard = {
  __typename?: 'Leaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<LeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type LeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type LeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export enum LeaderboardAlgorithm {
  Custom = 'CUSTOM',
  Logarithmic = 'LOGARITHMIC',
  ScoreValue = 'SCORE_VALUE'
}

/** Filter players by score */
export enum LeaderboardHasScore {
  /** Filter players by Albatross */
  Albatross = 'ALBATROSS',
  /** Filter players by Birdie */
  Birdie = 'BIRDIE',
  /** Filter players by Eagle */
  Eagle = 'EAGLE',
  /** Filter players by 'Hole in One' */
  HoleInOne = 'HOLE_IN_ONE',
  /** Filter players by Par */
  Par = 'PAR'
}

/** Order by options for leaderboard */
export enum LeaderboardOrderBy {
  /** Order by player name */
  PlayerName = 'PLAYER_NAME',
  /** Order by position */
  Pos = 'POS',
  /** Order by time */
  Time = 'TIME'
}

export type LeaderboardOrderOfMeritInfo = {
  __typename?: 'LeaderboardOrderOfMeritInfo';
  newPos?: Maybe<Scalars['Int']['output']>;
  previousPos?: Maybe<Scalars['Int']['output']>;
};

export type LeaderboardParameters = {
  __typename?: 'LeaderboardParameters';
  /** Algorithm to calculate the order of merit score */
  algorithm: LeaderboardAlgorithm;
  /** User defined max score */
  maxScore?: Maybe<Scalars['Int']['output']>;
  /** Method to get max score */
  maxScoreMethod: OrderOfMeritMaxScoreMethod;
  /** The number of players */
  numberOfPlayers?: Maybe<Scalars['Int']['output']>;
  /** Modify max score by this percentage */
  percentageModifier?: Maybe<Scalars['Int']['output']>;
  /** The list of scores */
  scores?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type LeaderboardParametersInput = {
  /** Algorithm to calculate the order of merit score */
  algorithm?: LeaderboardAlgorithm;
  /** User defined max score */
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  /** Method to get max score */
  maxScoreMethod?: OrderOfMeritMaxScoreMethod;
  /** The number of players */
  numberOfPlayers?: InputMaybe<Scalars['Int']['input']>;
  /** Modify max score by this percentage */
  percentageModifier?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** The list of scores */
  scores?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type LeaderboardPlayer = {
  __typename?: 'LeaderboardPlayer';
  bayId?: Maybe<Scalars['String']['output']>;
  colorArgb?: Maybe<Scalars['Int']['output']>;
  colorHex?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isAnonymous: Scalars['Boolean']['output'];
  isBayHost: Scalars['Boolean']['output'];
  isGuestPlayer: Scalars['Boolean']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
};

export type LeaderboardPlayerInfo = {
  __typename?: 'LeaderboardPlayerInfo';
  /** The color for the team */
  color?: Maybe<Scalars['String']['output']>;
  /** The icon for the team */
  icon?: Maybe<Scalars['String']['output']>;
  /** Indicates if this is a team */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  members?: Maybe<Array<TeamMemberLeaderboardRecord>>;
  /** The name of the team */
  name?: Maybe<Scalars['String']['output']>;
};

export type LeaderboardRecord = {
  __typename?: 'LeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** Latest round played */
  latestRound?: Maybe<LeaderboardRoundScoreType>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  /** The list of scores for the rounds for this player */
  rounds?: Maybe<Array<LeaderboardRoundScoreType>>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** Player team id */
  teamId?: Maybe<Scalars['ID']['output']>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  /** The total score for this record */
  total?: Maybe<LeaderboardTotalScore>;
};

export type LeaderboardRecordTag = {
  __typename?: 'LeaderboardRecordTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type LeaderboardRecordTypeCollectionSegment = {
  __typename?: 'LeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type LeaderboardRoundClosestToPinScoreType = {
  __typename?: 'LeaderboardRoundClosestToPinScoreType';
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  finalPosition?: Maybe<Position>;
  /** The hole */
  hole?: Maybe<ScorecardHole>;
  holeNumber: Scalars['Int']['output'];
  leaderboardPlayerInfo?: Maybe<LeaderboardRecord>;
  leaderboardRoundScore?: Maybe<LeaderboardRoundScore>;
  orderOfMeritInfo?: Maybe<LeaderboardOrderOfMeritInfo>;
  points?: Maybe<Scalars['Int']['output']>;
  /** Player position on the leaderboard */
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  roundNumber?: Maybe<Scalars['Int']['output']>;
  seasonActivityType?: Maybe<SeasonActivityEventType>;
  state: TournamentPlayerRoundState;
  tournamentKind?: Maybe<Scalars['String']['output']>;
  tournamentRound?: Maybe<TournamentRound>;
};

export type LeaderboardRoundLongestDriveScoreType = {
  __typename?: 'LeaderboardRoundLongestDriveScoreType';
  driveDistance?: Maybe<Scalars['Float']['output']>;
  finalPosition?: Maybe<Position>;
  /** The hole */
  hole?: Maybe<ScorecardHole>;
  holeNumber: Scalars['Int']['output'];
  leaderboardPlayerInfo?: Maybe<LeaderboardRecord>;
  leaderboardRoundScore?: Maybe<LeaderboardRoundScore>;
  orderOfMeritInfo?: Maybe<LeaderboardOrderOfMeritInfo>;
  points?: Maybe<Scalars['Int']['output']>;
  /** Player position on the leaderboard */
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  roundNumber?: Maybe<Scalars['Int']['output']>;
  /** Score for player */
  score?: Maybe<Scalars['Decimal']['output']>;
  /** Normalized score for player */
  scoreNormalized?: Maybe<Scalars['Decimal']['output']>;
  seasonActivityType?: Maybe<SeasonActivityEventType>;
  state: TournamentPlayerRoundState;
  /** Total distance of all shots */
  totalDistanceAllShots?: Maybe<Scalars['Decimal']['output']>;
  tournamentKind?: Maybe<Scalars['String']['output']>;
  tournamentRound?: Maybe<TournamentRound>;
};

export type LeaderboardRoundScore = {
  __typename?: 'LeaderboardRoundScore';
  averageDistanceToPin?: Maybe<Scalars['Float']['output']>;
  distance?: Maybe<Scalars['Float']['output']>;
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  distanceToPinWithPenalty?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  isCountingScore: Scalars['Boolean']['output'];
  leaderboardRecords?: Maybe<Array<Maybe<HoleInOneLeaderboardRecord>>>;
  lie?: Maybe<Scalars['String']['output']>;
  penalty?: Maybe<Scalars['Float']['output']>;
  playerName?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  roundId?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  shotNumber?: Maybe<Scalars['Int']['output']>;
  sortPos?: Maybe<Scalars['Int']['output']>;
  state: TournamentPlayerRoundState;
  teamNumber?: Maybe<Scalars['String']['output']>;
  thru?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
  values?: Maybe<Array<KeyValuePairOfStringAndDouble>>;
};

/** Number of holes played on last played round */
export type LeaderboardRoundScoreType = {
  __typename?: 'LeaderboardRoundScoreType';
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  isCountingScore?: Maybe<Scalars['Boolean']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  /** Player position on the leaderboard */
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  previousOomPos?: Maybe<Scalars['Int']['output']>;
  projectedOomPos?: Maybe<Scalars['Int']['output']>;
  /** Last played round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  /** Round state */
  roundState?: Maybe<TournamentRoundState>;
  score?: Maybe<Scalars['Float']['output']>;
  scorecard?: Maybe<Scorecard>;
  scorecardDbId?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  thru?: Maybe<Scalars['Int']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
};

/** Number of holes played on last played round */
export type LeaderboardTotalScore = {
  __typename?: 'LeaderboardTotalScore';
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  /** Player position on the leaderboard */
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  /** Last played round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  thru?: Maybe<Scalars['Int']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
};

export type League = Node & {
  __typename?: 'League';
  /** The time of creation of the league */
  createdAt: Scalars['DateTime']['output'];
  /** the current season of the league */
  currentSeason?: Maybe<LeagueSeason>;
  /** The database id of the league */
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the league */
  name: Scalars['String']['output'];
  /** Indicates the next season start date of the league */
  nextSeasonStartDate?: Maybe<Scalars['DateTime']['output']>;
  /** List of the seasons of the league */
  seasons?: Maybe<LeagueSeasonTypeCollectionSegment>;
  /** Indicates if the league is live, completed or has not started yet */
  state?: Maybe<LeagueState>;
  /** The total number of seasons of this league */
  totalNumberOfSeasons?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The version info of the league */
  versionInfo?: Maybe<VersionInfoBaseHelperOfLeague>;
};


export type LeagueSeasonsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  state: LeagueSeasonState;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type LeagueEventLeaderboard = {
  __typename?: 'LeagueEventLeaderboard';
  records?: Maybe<LeagueEventLeaderboardRecordTypeCollectionSegment>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueEventLeaderboardRecord>>;
};


export type LeagueEventLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type LeagueEventLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Number of holes played on last played round */
export type LeagueEventLeaderboardActivityScore = {
  __typename?: 'LeagueEventLeaderboardActivityScore';
  activityId?: Maybe<Scalars['String']['output']>;
  /** Activity state */
  activityState?: Maybe<TournamentRoundState>;
  activityType?: Maybe<SeasonActivityEventType>;
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  /** Last played round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  scorecard?: Maybe<Scorecard>;
  scorecardDbId?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  thru?: Maybe<Scalars['Int']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
};

export type LeagueEventLeaderboardRecord = {
  __typename?: 'LeagueEventLeaderboardRecord';
  /** List of scores for the activities for this player */
  activities?: Maybe<Array<LeagueEventLeaderboardActivityScore>>;
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  hasScore?: Maybe<Array<LeaderboardHasScore>>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  isLive: Scalars['Boolean']['output'];
  kind: PersonConnectionKind;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  locationId?: Maybe<Scalars['String']['output']>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use Playername instead */
  nickname?: Maybe<Scalars['String']['output']>;
  numberOfTickets: Scalars['Int']['output'];
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  scores?: Maybe<Array<KeyValuePairOfStringAndLeaderboardRoundScore>>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** Player Team for Season */
  teamId?: Maybe<Scalars['ID']['output']>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  time?: Maybe<Scalars['String']['output']>;
  /** The total score */
  total?: Maybe<LeagueEventLeaderboardScore>;
};

/** A segment of a collection. */
export type LeagueEventLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'LeagueEventLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LeagueEventLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Number of holes played on last played round */
export type LeagueEventLeaderboardScore = {
  __typename?: 'LeagueEventLeaderboardScore';
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  /** Last played round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  thru?: Maybe<Scalars['Int']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
};

/** Mutations on a Facility League */
export type LeagueMutation = {
  __typename?: 'LeagueMutation';
  /** Change the name of a league */
  changeName?: Maybe<League>;
  /** Create a season */
  createSeason?: Maybe<LeagueSeason>;
  /** Delete a league */
  delete?: Maybe<Scalars['Boolean']['output']>;
};


/** Mutations on a Facility League */
export type LeagueMutationChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Facility League */
export type LeagueMutationCreateSeasonArgs = {
  season: CreateLeagueSeasonInput;
};


/** Mutations on a Facility League */
export type LeagueMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LeagueSeason = MediaAssetsInterface & Node & {
  __typename?: 'LeagueSeason';
  /** The creation date of the league season */
  createdAt: Scalars['DateTime']['output'];
  /** The database id of the league season */
  dbId: Scalars['String']['output'];
  /** The description of the league season */
  description?: Maybe<Scalars['String']['output']>;
  /** Season is editable until this time */
  editableUntil?: Maybe<Scalars['DateTime']['output']>;
  /** The end time of the season based on the events */
  endTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of events of the league season */
  events?: Maybe<Array<Maybe<SeasonEvent>>>;
  /** The format of the league season */
  format: LeagueSeasonFormat;
  /** The measurement unit of the league season */
  gameUnit?: Maybe<GameUnit>;
  id: Scalars['ID']['output'];
  /** Indicates if all the locations are available for this season */
  isAllLocationsSelected?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether season is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if season is public or not */
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the season is publishable or not */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if this season is individual season or a team season */
  isTeamLeagueSeason?: Maybe<Scalars['Boolean']['output']>;
  /** The url to join the season */
  joinUrl?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the season */
  leaderboard?: Maybe<LeagueSeasonLeaderboard>;
  /** The name of league of the season */
  leagueName?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The configuration for each one of the locations available for this season */
  locationsConfigurations?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The maximum team size of the league season */
  maxTeamSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The minimum team size of the league season */
  minTeamSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The name of the league season */
  name?: Maybe<Scalars['String']['output']>;
  /** The number of activities for the season */
  numberOfActivities: Scalars['NonNegativeInt']['output'];
  /** The number of events int the season */
  numberOfEvents?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** Sign up end time for this season. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this season. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The start time of the season based on the events */
  startTime?: Maybe<Scalars['DateTime']['output']>;
  /** The state of the event based on the events */
  state?: Maybe<LeagueSeasonState>;
  /** Lists with all the teams in the season */
  teams?: Maybe<LeagueTeamTypeCollectionSegment>;
  /** Number of teams that are ready to play the season */
  teamsReadyToPlay: Scalars['Int']['output'];
  /** The version info of the league season */
  versionInfo?: Maybe<VersionInfoBaseHelperOfLeagueSeason>;
};


export type LeagueSeasonEventsArgs = {
  eventId?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<SeasonEventStatus>;
};


export type LeagueSeasonLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type LeagueSeasonTeamsArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  playerIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** The different formats of a league season */
export enum LeagueSeasonFormat {
  OrderOfMerit = 'ORDER_OF_MERIT',
  ToPar = 'TO_PAR'
}

export type LeagueSeasonLeaderboard = {
  __typename?: 'LeagueSeasonLeaderboard';
  records?: Maybe<LeagueSeasonLeaderboardRecordTypeCollectionSegment>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
};


export type LeagueSeasonLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type LeagueSeasonLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Number of holes played on last played round */
export type LeagueSeasonLeaderboardEventScore = {
  __typename?: 'LeagueSeasonLeaderboardEventScore';
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  /** Event state */
  eventState?: Maybe<TournamentRoundState>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  /** Last played round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  thru?: Maybe<Scalars['Int']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
};

export type LeagueSeasonLeaderboardRecord = {
  __typename?: 'LeagueSeasonLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** List of scores for the events for this player */
  events?: Maybe<Array<LeagueSeasonLeaderboardEventScore>>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  hasScore?: Maybe<Array<LeaderboardHasScore>>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  isLive: Scalars['Boolean']['output'];
  kind: PersonConnectionKind;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  locationId?: Maybe<Scalars['String']['output']>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use Playername instead */
  nickname?: Maybe<Scalars['String']['output']>;
  numberOfTickets: Scalars['Int']['output'];
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  scores?: Maybe<Array<KeyValuePairOfStringAndLeaderboardRoundScore>>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** Player Team for Season */
  teamId?: Maybe<Scalars['ID']['output']>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  time?: Maybe<Scalars['String']['output']>;
  /** The total score */
  total?: Maybe<LeagueSeasonLeaderboardScore>;
};

/** A segment of a collection. */
export type LeagueSeasonLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'LeagueSeasonLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LeagueSeasonLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Number of holes played on last played round */
export type LeagueSeasonLeaderboardScore = {
  __typename?: 'LeagueSeasonLeaderboardScore';
  /** Distance to pin */
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  /** Last played round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
  thru?: Maybe<Scalars['Int']['output']>;
  toPar?: Maybe<Scalars['Int']['output']>;
};

/** Mutations on a League Season */
export type LeagueSeasonMutation = MediaAssetsMutationInterface & {
  __typename?: 'LeagueSeasonMutation';
  /** Add default image to the media assets */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** Add media assets to the media assets */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Update the description of the league season */
  changeDescription?: Maybe<LeagueSeason>;
  /** Update the measurement unit of the league season */
  changeGameUnit?: Maybe<LeagueSeason>;
  /** Update the max team size of the league season */
  changeMaxTeamSize?: Maybe<LeagueSeason>;
  /** Update the min team size of the league season */
  changeMinTeamSize?: Maybe<LeagueSeason>;
  /** Update the name of the league season */
  changeName?: Maybe<LeagueSeason>;
  /** Change the sign up end time */
  changeSignUpEndTime?: Maybe<LeagueSeason>;
  /** Change the sign up start time */
  changeSignUpStartTime?: Maybe<LeagueSeason>;
  /** Create season event */
  createEvent?: Maybe<SeasonEvent>;
  /** Create multiple season events */
  createMultipleEvents?: Maybe<Array<Maybe<SeasonEvent>>>;
  /** DeSelect all locations of the facility for this season. It will not affect the locations with payment configuration */
  deSelectAllLocations?: Maybe<LeagueSeason>;
  /** Delete the league season */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Disable payment for this season */
  disablePayment?: Maybe<LeagueSeason>;
  /** Enable payment for this season */
  enablePayment?: Maybe<LeagueSeason>;
  /** The mutations on an event inside the league season */
  event?: Maybe<SeasonEventMutation>;
  /** The mutations on location configs of the season */
  location?: Maybe<SeasonLocationMutation>;
  /** Publish the the league season */
  publish?: Maybe<Scalars['Boolean']['output']>;
  /** Remove media assets from the media assets */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Select All locations of the facility for this season */
  selectAllLocations?: Maybe<LeagueSeason>;
  setMaxParticipantsForAllLocationsToLimited?: Maybe<LeagueSeason>;
  /** Set all location max participants to unlimited */
  setMaxParticipantsForAllLocationsToUnlimited?: Maybe<LeagueSeason>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeDescriptionArgs = {
  description: Scalars['String']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeGameUnitArgs = {
  gameUnit: GameUnit;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeMaxTeamSizeArgs = {
  maxTeamSize?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeMinTeamSizeArgs = {
  minTeamSize: Scalars['NonNegativeInt']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationCreateEventArgs = {
  event: CreateSeasonEventInput;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationCreateMultipleEventsArgs = {
  events: Array<InputMaybe<CreateSeasonEventInput>>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationEventArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationLocationArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on a League Season */
export type LeagueSeasonMutationRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a League Season */
export type LeagueSeasonMutationSetMaxParticipantsForAllLocationsToLimitedArgs = {
  defaultValue?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

/** The different states of league season */
export enum LeagueSeasonState {
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Live = 'LIVE',
  Published = 'PUBLISHED',
  Upcoming = 'UPCOMING'
}

/** A segment of a collection. */
export type LeagueSeasonTypeCollectionSegment = {
  __typename?: 'LeagueSeasonTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LeagueSeason>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** The different states of league */
export enum LeagueState {
  Live = 'LIVE',
  NoActiveSeason = 'NO_ACTIVE_SEASON'
}

/** A League Team */
export type LeagueTeam = Node & TeamInterface & {
  __typename?: 'LeagueTeam';
  /** The color for the team */
  color?: Maybe<Scalars['String']['output']>;
  /** The time the team was created */
  createdAt: Scalars['DateTime']['output'];
  /** The icon for the team */
  icon?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicates whether the team has paid */
  isPaid?: Maybe<Scalars['Boolean']['output']>;
  /** The registered location for the team */
  location?: Maybe<Location>;
  /** The maximum team size */
  maxSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  members: Array<LeagueTeamMember>;
  /** The minimum team size */
  minSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** name of the team */
  name: Scalars['String']['output'];
  /** Payment information */
  payment?: Maybe<PaymentInformation>;
  /** The team status */
  status: TeamStatus;
  /** The team status code */
  statusCode: TeamStatusCode;
};

/** Member in a team for a league */
export type LeagueTeamMember = TeamMemberInterface & {
  __typename?: 'LeagueTeamMember';
  /** Information about this person */
  person?: Maybe<PersonInfo>;
  /** The member status */
  status: TeamMemberStatus;
};

/** A segment of a collection. */
export type LeagueTeamTypeCollectionSegment = {
  __typename?: 'LeagueTeamTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TeamInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type LeagueTypeCollectionSegment = {
  __typename?: 'LeagueTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<League>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type LeaveTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type LeaveTeamInput = {
  teamId: Scalars['ID']['input'];
};

export type LeaveTeamPayload = {
  __typename?: 'LeaveTeamPayload';
  errors?: Maybe<Array<LeaveTeamError>>;
  team?: Maybe<TeamInterface>;
};

export enum Lighting {
  Afternoon = 'AFTERNOON',
  Evening = 'EVENING',
  None = 'NONE'
}

/** A link */
export type Link = {
  __typename?: 'Link';
  /** description of the link */
  description?: Maybe<Scalars['String']['output']>;
  /** href */
  href?: Maybe<Scalars['String']['output']>;
  /** The link is templated */
  templated: Scalars['Boolean']['output'];
};

/** Link key value */
export type LinkKeyValue = {
  __typename?: 'LinkKeyValue';
  /** Key */
  key?: Maybe<Scalars['String']['output']>;
  /** Link */
  value?: Maybe<Link>;
};

/** The description of the facility */
export type Location = KeyValuesInterfaceType & LocationInterfaceType & Node & TagsInterfaceTypeOfLocationTagsType & {
  __typename?: 'Location';
  /** The facility that owns this location */
  Facility?: Maybe<Facility>;
  /** The address of the facility */
  address?: Maybe<Address>;
  applicationProperties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** Bays available for this location */
  bays?: Maybe<Array<BayInterface>>;
  /** Coaches is currently NOT available for this location */
  coaches?: Maybe<FacilityCoachTypeCollectionSegment>;
  coachesOnLocator?: Maybe<Array<CoachProfile>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The distance to the facility from the search point 'near' */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The primary email to the facility */
  email?: Maybe<Scalars['String']['output']>;
  /** The phone number of the shop on the facility */
  emergencyPhoneNumber?: Maybe<Scalars['String']['output']>;
  /** Indicates if the location has a coach */
  hasCoach: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The indoor site servers that belong to this location */
  indoorSiteServers?: Maybe<Array<Maybe<IndoorSiteServer>>>;
  /** Indicates if the location can be used for payment */
  isConfiguredForPayment?: Maybe<Scalars['Boolean']['output']>;
  /** Is this location also a facility */
  isDefaultLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Is this the default world location */
  isDefaultWorldLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate that a facility is deleted */
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the location has a premium portal subscription */
  isPremiumPortal?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The facility kind */
  kind?: Maybe<FacilityKind>;
  /** A list of facility labels */
  labels?: Maybe<FacilityLabelsCollectionSegment>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The name of the facility */
  name?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The Opening Hours of the location */
  openingHours?: Maybe<OpeningHours>;
  /**
   * Returns a list of all flags
   * @deprecated Use paymentFlags
   */
  paidEventFlags?: Maybe<Array<Maybe<PaidEventFlag>>>;
  /** Returns a list of all tickets for an event and it's status. User must have FacilityManager role. */
  paidEventTicketStatus?: Maybe<Array<Maybe<PaidTickets>>>;
  /** Returns paid events. If the list is empty, all available events will be returned. If the list list has one or more event ids, only those will be returned. */
  paidEvents?: Maybe<Array<Maybe<PaidEvents>>>;
  /** The flags available for this location */
  paymentFlags?: Maybe<Array<Maybe<PaidEventFlag>>>;
  /** The primary phone number to the facility */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** Range-related entities available for this location */
  range?: Maybe<RangeLocationType>;
  /** The phone number of the shop on the facility */
  shopPhoneNumber?: Maybe<Scalars['String']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<LocationUrlTags>>;
  /** The time zone where the facility is located */
  timezone?: Maybe<Scalars['String']['output']>;
  /** The url of the facilities logo image */
  url?: Maybe<Scalars['URL']['output']>;
  /** The GPS position of the facility */
  worldLocation?: Maybe<LatLon>;
};


/** The description of the facility */
export type LocationApplicationPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


/** The description of the facility */
export type LocationBaysArgs = {
  types?: InputMaybe<BayTypes>;
};


/** The description of the facility */
export type LocationCoachesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type LocationDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The description of the facility */
export type LocationHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The description of the facility */
export type LocationHasTagArgs = {
  tag: LocationUrlTags;
};


/** The description of the facility */
export type LocationIndoorSiteServersArgs = {
  statues?: InputMaybe<Array<InputMaybe<IndoorSiteServerStatus>>>;
};


/** The description of the facility */
export type LocationKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The description of the facility */
export type LocationLabelsArgs = {
  filter?: InputMaybe<LabelFilter>;
  order?: InputMaybe<Array<LabelSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** The description of the facility */
export type LocationPaidEventTicketStatusArgs = {
  tournamentIds: Scalars['String']['input'];
};


/** The description of the facility */
export type LocationPaidEventsArgs = {
  eventIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tournamentIds: Array<InputMaybe<Scalars['String']['input']>>;
};


/** The description of the facility */
export type LocationPaymentFlagsArgs = {
  type?: InputMaybe<Scalars['String']['input']>;
};


/** The description of the facility */
export type LocationUrlArgs = {
  kind: LocationUrlKinds;
};

export type LocationConfiguration = {
  __typename?: 'LocationConfiguration';
  /** The ids of applied flags for this location on this model */
  appliedFlags?: Maybe<Array<Maybe<Scalars['NonNegativeInt']['output']>>>;
  /** The Bay configurations for the selected location */
  baysConfiguration?: Maybe<Array<Maybe<BayConfiguration>>>;
  /** The fee alongside the currency */
  displayFee?: Maybe<Scalars['String']['output']>;
  /** The fee amount for this location on this model */
  fee?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** Indicates if all the bays of this location is selected or not */
  isAllBaysSelected?: Maybe<Scalars['Boolean']['output']>;
  /** The location connected to this configuration */
  location?: Maybe<LocationInterfaceType>;
  /** The maximum number of participants allowed in this location for this model */
  maxParticipants?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The number of participants that have joined for this location */
  numberOfParticipants?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The link to the payment site */
  paymentUrl?: Maybe<Scalars['URL']['output']>;
  /** The number of remaining spots for this location */
  remainingSpots?: Maybe<Scalars['NonNegativeInt']['output']>;
};

/** The description of the location */
export type LocationInterfaceType = {
  Facility?: Maybe<Facility>;
  /** The address of the location */
  address?: Maybe<Address>;
  applicationProperties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** Bays available for this location */
  bays?: Maybe<Array<BayInterface>>;
  coachesOnLocator?: Maybe<Array<CoachProfile>>;
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The distance to the facility from the search point 'near' */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The primary email to the location */
  email?: Maybe<Scalars['String']['output']>;
  /** The emergency phone number of the location */
  emergencyPhoneNumber?: Maybe<Scalars['String']['output']>;
  /** Indicates if the location has a coach */
  hasCoach: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The location id */
  id: Scalars['ID']['output'];
  /** Indicates if the location can be used for payment */
  isConfiguredForPayment?: Maybe<Scalars['Boolean']['output']>;
  /** The default location */
  isDefaultLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Is this the default world location */
  isDefaultWorldLocation?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate that a facility is deleted */
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the location has a premium portal subscription */
  isPremiumPortal?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values added */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The location kind */
  kind?: Maybe<FacilityKind>;
  /** When have the facility last been updated */
  lastUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the location */
  name?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The flags available for this location */
  paymentFlags?: Maybe<Array<Maybe<PaidEventFlag>>>;
  /** The primary phone number to the location */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** Range-related entities available for this location */
  range?: Maybe<RangeLocationType>;
  /** The phone number of the shop on the location */
  shopPhoneNumber?: Maybe<Scalars['String']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<LocationUrlTags>>;
  /** The time zone where the location is located */
  timezone?: Maybe<Scalars['String']['output']>;
  /** The url of the facilities logo image */
  url?: Maybe<Scalars['URL']['output']>;
  /** The GPS position of the location */
  worldLocation?: Maybe<LatLon>;
};


/** The description of the location */
export type LocationInterfaceTypeApplicationPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


/** The description of the location */
export type LocationInterfaceTypeBaysArgs = {
  types?: InputMaybe<BayTypes>;
};


/** The description of the location */
export type LocationInterfaceTypeDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The description of the location */
export type LocationInterfaceTypeHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The description of the location */
export type LocationInterfaceTypeHasTagArgs = {
  tag: LocationUrlTags;
};


/** The description of the location */
export type LocationInterfaceTypeKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The description of the location */
export type LocationInterfaceTypePaymentFlagsArgs = {
  type?: InputMaybe<Scalars['String']['input']>;
};


/** The description of the location */
export type LocationInterfaceTypeUrlArgs = {
  kind: LocationUrlKinds;
};

/** A segment of a collection. */
export type LocationInterfaceTypeCollectionSegment = {
  __typename?: 'LocationInterfaceTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LocationInterfaceType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Mutations on a Facility Location */
export type LocationMutation = {
  __typename?: 'LocationMutation';
  /** Change the address of the location */
  changeAddress?: Maybe<LocationInterfaceType>;
  /** Change the name of the location */
  changeName?: Maybe<LocationInterfaceType>;
  /** Change the url for an exists one */
  changeUrl?: Maybe<LocationInterfaceType>;
  /** Delete the location */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Delete the url */
  deleteUrl?: Maybe<LocationInterfaceType>;
  /** Enable premium portal feature for the location. */
  enablePremiumPortal?: Maybe<Scalars['Boolean']['output']>;
  /** Range-related entities mutations available for this location */
  range?: Maybe<RangeLocationMutationType>;
  /** Add Or Update application properties */
  setApplicationProperties?: Maybe<LocationInterfaceType>;
  /** Method for updating the key values collections on the location */
  setKeyValues?: Maybe<LocationInterfaceType>;
  /** Method for updating the tags collections on the location */
  setTags?: Maybe<LocationInterfaceType>;
  /** Update all properties for this location in one go */
  update?: Maybe<LocationInterfaceType>;
};


/** Mutations on a Facility Location */
export type LocationMutationChangeAddressArgs = {
  address: AddressInput;
};


/** Mutations on a Facility Location */
export type LocationMutationChangeNameArgs = {
  name: Scalars['NonEmptyString']['input'];
};


/** Mutations on a Facility Location */
export type LocationMutationChangeUrlArgs = {
  url: UrlInput;
};


/** Mutations on a Facility Location */
export type LocationMutationDeleteUrlArgs = {
  kind: LocationUrlKinds;
};


/** Mutations on a Facility Location */
export type LocationMutationEnablePremiumPortalArgs = {
  enablePortalPremium: Scalars['Boolean']['input'];
};


/** Mutations on a Facility Location */
export type LocationMutationSetApplicationPropertiesArgs = {
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>>>;
  application: Scalars['String']['input'];
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Facility Location */
export type LocationMutationSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Facility Location */
export type LocationMutationSetTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<LocationUrlTags>>>;
  removeTags?: InputMaybe<Array<InputMaybe<LocationUrlTags>>>;
};


/** Mutations on a Facility Location */
export type LocationMutationUpdateArgs = {
  address?: InputMaybe<AddressInput>;
  defaultWorldLocation?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  emergencyPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openingHours?: InputMaybe<OpeningHoursInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  shopPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<InputMaybe<UrlInput>>>;
  worldLocation?: InputMaybe<LatLonInputType>;
};

export enum LocationUrlKinds {
  BackgroundImage = 'BACKGROUND_IMAGE',
  Booking = 'BOOKING',
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  LockTemplate = 'LOCK_TEMPLATE',
  Logo = 'LOGO',
  SponsorLogo = 'SPONSOR_LOGO',
  Twitter = 'TWITTER',
  WebSite = 'WEB_SITE'
}

export enum LocationUrlTags {
  HasCoachingLessons = 'HAS_COACHING_LESSONS',
  HasDrinks = 'HAS_DRINKS',
  HasEighteenHoleCourse = 'HAS_EIGHTEEN_HOLE_COURSE',
  HasEquipmentRental = 'HAS_EQUIPMENT_RENTAL',
  HasEquipmentSales = 'HAS_EQUIPMENT_SALES',
  HasFitnessCenter = 'HAS_FITNESS_CENTER',
  HasFood = 'HAS_FOOD',
  HasNineHoleCourse = 'HAS_NINE_HOLE_COURSE',
  HasParking = 'HAS_PARKING',
  HasPrivateSimRooms = 'HAS_PRIVATE_SIM_ROOMS',
  HasShortGameArea = 'HAS_SHORT_GAME_AREA',
  HasTournaments = 'HAS_TOURNAMENTS',
  HasTvBroadcasting = 'HAS_TV_BROADCASTING',
  HasVipBays = 'HAS_VIP_BAYS',
  HasVirtualGolf = 'HAS_VIRTUAL_GOLF',
  HasWarmUpNet = 'HAS_WARM_UP_NET',
  Hidden = 'HIDDEN',
  IsEntertainment = 'IS_ENTERTAINMENT',
  IsEquipmentManufacturer = 'IS_EQUIPMENT_MANUFACTURER',
  IsFitter = 'IS_FITTER',
  IsGolfSim = 'IS_GOLF_SIM',
  IsVisibleOnLocator = 'IS_VISIBLE_ON_LOCATOR',
  PremiumPortal = 'PREMIUM_PORTAL'
}

export type LockBaysError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type LockBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
  unlockCode?: InputMaybe<Scalars['String']['input']>;
  unlockUrl?: InputMaybe<Scalars['String']['input']>;
  useFacilityLockScreen?: Scalars['Boolean']['input'];
};

export type LockBaysPayload = {
  __typename?: 'LockBaysPayload';
  errors?: Maybe<Array<LockBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export type LongestDrive = {
  __typename?: 'LongestDrive';
  records?: Maybe<RoundLeaderboardLongestDriveRecordTypeCollectionSegment>;
  selectedPlayers?: Maybe<Array<RoundLeaderboardLongestDriveRecordType>>;
};


export type LongestDriveRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type LongestDriveSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type LongestDriveGameSettings = {
  __typename?: 'LongestDriveGameSettings';
  /** The attempt that is shown on the leaderboard */
  attemptsOnLeaderboard?: Maybe<Scalars['String']['output']>;
  /** The attempts per round */
  attemptsPerRound?: Maybe<Scalars['Int']['output']>;
  /** The fairway firmness */
  fairwayFirmness?: Maybe<Firmness>;
  /** The gimme distance */
  gimmeDistance?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** The green firmness */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp for the round */
  greenStimp?: Maybe<Stimp>;
  /** The lighting on the course when the round is played */
  lighting?: Maybe<Lighting>;
  /** Mulligans */
  mulligans?: Maybe<Mulligans>;
  /** The pin difficulty */
  pinDifficulty?: Maybe<Pin>;
  /** The putting mode */
  puttingMode?: Maybe<PuttMode>;
  /** The wind mode */
  windSpeed?: Maybe<WindMode>;
};

export type LongestDriveLeaderboard = {
  __typename?: 'LongestDriveLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<LongestDriveLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LongestDriveLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type LongestDriveLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type LongestDriveLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type LongestDriveLeaderboardRecord = {
  __typename?: 'LongestDriveLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  score?: Maybe<LeaderboardRoundLongestDriveScoreType>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
};

/** A segment of a collection. */
export type LongestDriveLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'LongestDriveLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LongestDriveLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** The tournament description */
export type LongestDriveTournament = KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'LongestDriveTournament';
  /**
   * Allow the participants to retry the tournament and improve the score.
   * @deprecated Use tournament.settings.attempts instead
   */
  allowMultipleTournamentAttempts?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** The number of attempts on each hole in the tournament. */
  attempts?: Maybe<Scalars['PositiveInt']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The course Identifier */
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  /** The course name */
  courseName?: Maybe<Scalars['String']['output']>;
  /** The course version */
  courseVersion?: Maybe<Scalars['String']['output']>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The difficulty of the tournament. */
  difficulty?: Maybe<LongestDriveTournamentDifficulty>;
  /** The distance type set in the tournament. */
  distance?: Maybe<TournamentDistanceType>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** The fairway firmness in the tournament. */
  fairwayFirmness?: Maybe<Firmness>;
  /** The fairway width in the tournament. */
  fairwayWidth?: Maybe<Scalars['Int']['output']>;
  /** Game settings */
  gameSettings?: Maybe<LongestDriveGameSettings>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The holes */
  holes?: Maybe<Array<Maybe<TournamentHole>>>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<LongestDriveLeaderboard>;
  links?: Maybe<Array<LinkKeyValue>>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** The number of rounds in the tournament. */
  numberOfRounds?: Maybe<Scalars['PositiveInt']['output']>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** The number of shots per round in the tournament. */
  shotsPerRound?: Maybe<Scalars['Int']['output']>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The sync grace period that overrides the global grace period. */
  syncGracePeriodInMinutes?: Maybe<Scalars['Int']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The tee */
  tee?: Maybe<Scalars['String']['output']>;
  /** The time limit in the tournament. */
  timeLimit?: Maybe<Scalars['TimeSpan']['output']>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type LongestDriveTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type LongestDriveTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type LongestDriveTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type LongestDriveTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type LongestDriveTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** The tournament description */
export type LongestDriveTournamentLinksArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  includeDescriptionFile?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  serialNo?: InputMaybe<Scalars['String']['input']>;
};


/** The tournament description */
export type LongestDriveTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type LongestDriveTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type LongestDriveTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** Mutations on a Tournament */
export type LongestDriveTournamentMutation = MediaAssetsMutationInterface & PaymentMutationInterface & TournamentMutationInterface & {
  __typename?: 'LongestDriveTournamentMutation';
  /** Accept invitation */
  acceptInvitation?: Maybe<Invitation>;
  /** Add default image to the tournament */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** add a location to this tournament */
  addLocation?: Maybe<Tournament>;
  /** Add media assets to the tournament */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Add default requirements for participation to the tournament.Only use 'templateOwner' argument if assigning template from a specific user, otherwise leave blank to use the Trackman global template. */
  addParticipantRequirementsFromDefaultTemplate?: Maybe<Tournament>;
  /** Add a sponsor to the tournament */
  addSponsor?: Maybe<Tournament>;
  /**
   * Allow or disallow participants to improve the score on the leaderboard
   * @deprecated Use changeTournamentNumberOfAttempts instead
   */
  changeAllowMultipleTournamentAttempts?: Maybe<LongestDriveTournament>;
  /** Turn on or off the conversion to use normalized values */
  changeConversion?: Maybe<LongestDriveTournament>;
  /** Change the start- and/or end date of the tournament. Must be in UTC time. */
  changeDates?: Maybe<LongestDriveTournament>;
  /** Change the description of the tournament */
  changeDescription?: Maybe<Tournament>;
  /** Change the difficulty of the tournament */
  changeDifficulty?: Maybe<LongestDriveTournament>;
  /** Change the distance type of the tournament */
  changeDistanceType?: Maybe<LongestDriveTournament>;
  /**
   * Change the end date of the tournament
   * @deprecated Use changeDates instead
   */
  changeEndDate?: Maybe<LongestDriveTournament>;
  /** Change the firmness of the fairway for the tournament */
  changeFairwayFirmness?: Maybe<LongestDriveTournament>;
  /** Change the width of the fairway for the tournament */
  changeFairwayWidth?: Maybe<LongestDriveTournament>;
  /** Change the units used when playing the tournament */
  changeGameUnit?: Maybe<Tournament>;
  /**
   * Change if the tournament has an end date
   * @deprecated Use changeDates instead
   */
  changeHasEndDate?: Maybe<LongestDriveTournament>;
  /** Allows to extend or reduce the grace period of the tournament leaderboard, to include or exclude records backed up after the tournament has ended, but which were played in the correct date range. */
  changeLeaderboardGracePeriod?: Maybe<LongestDriveTournament>;
  /** change the payment configuration of a location */
  changeLocationPaymentConfiguration?: Maybe<Tournament>;
  /** Change the logo of the tournament */
  changeLogo?: Maybe<Tournament>;
  /** Change the max participants of the location config of the tournament */
  changeMaxParticipants?: Maybe<Tournament>;
  /** Change the name of the tournament */
  changeName?: Maybe<Tournament>;
  /** Change the number of rounds of the tournament */
  changeNumberOfRounds?: Maybe<LongestDriveTournament>;
  /** Change the number of shots per round of the tournament */
  changeShotsPerRound?: Maybe<LongestDriveTournament>;
  /** change the end time of the sign up */
  changeSignUpEndTime?: Maybe<Tournament>;
  /** change the start time of the sign up */
  changeSignUpStartTime?: Maybe<Tournament>;
  /** Change the time limit of the tournament */
  changeTimeLimit?: Maybe<LongestDriveTournament>;
  /** deSelect all facility locations for this tournament */
  deSelectAllLocations?: Maybe<Tournament>;
  /** Decline invitation */
  declineInvitation?: Maybe<Invitation>;
  /** Delete the tournament */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Disable payment for the tournament. Please note that the existing payment configuration will be deleted. */
  disablePayment?: Maybe<Tournament>;
  /** Enable payment for the tournament. Payment needs to be configured for each location where the tournament is available. */
  enablePayment?: Maybe<Tournament>;
  /** Ends the tournament */
  endTournament?: Maybe<Tournament>;
  /** filter out the locations that are not configured for payment */
  filterOutLocationsNotConfiguredForPayment?: Maybe<Tournament>;
  /** Invite by emails */
  invite?: Maybe<Scalars['Boolean']['output']>;
  /** Join the tournament */
  join?: Maybe<Invitation>;
  /** Join a player to the tournament without the player having to accept an invitation */
  joinPlayer?: Maybe<Invitation>;
  /** Move a tournament and all it's round to a new starting date and time */
  moveStartTime?: Maybe<Tournament>;
  /** Publish the draft as published */
  publish?: Maybe<Tournament>;
  /** Resend invitation */
  reInvite?: Maybe<Invitation>;
  /** Remove all participant groups from the tournament */
  removeAllParticipantGroups?: Maybe<Tournament>;
  /** remove a location from this tournament */
  removeLocation?: Maybe<Tournament>;
  /** Remove media assets from the tournament */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove a participant group from the tournament */
  removeParticipantGroup?: Maybe<Tournament>;
  /** Remove requirements for participation from the tournament */
  removeParticipantRequirements?: Maybe<Tournament>;
  /** Remove a sponsor from the tournament */
  removeSponsor?: Maybe<Tournament>;
  /** Replace the sponsor from the tournament with another sponsor */
  replaceSponsor?: Maybe<Tournament>;
  /** Reset the MaxScoreMethod for all rounds in the order of merit tournament to Default. */
  resetMaxScoringMethodForAllRounds?: Maybe<Tournament>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** The round default mutations */
  roundDefaults?: Maybe<TournamentRoundDefaultsMutation>;
  /** select all facility locations for this tournament */
  selectAllLocations?: Maybe<Tournament>;
  /** Set the tournament availability */
  setAvailability?: Maybe<Tournament>;
  /** Set flag indicating that this is an indoor tournament */
  setIsIndoor?: Maybe<Tournament>;
  /** Set flag indicating that this is a range tournament */
  setIsRange?: Maybe<Tournament>;
  /** Method for updating the key values collections on the tournament */
  setKeyValues?: Maybe<Tournament>;
  /**
   * Add or remove which locations this tournament is available.
   * @deprecated No longer supported.
   */
  setLocations?: Maybe<Tournament>;
  /** Un-publish the published version */
  unPublish?: Maybe<Tournament>;
  /** Add or remove geo filters to the tournament */
  updateGeoFilters?: Maybe<Tournament>;
  /** Update group for participation in the tournament. Renaming an existing group will delete the old group and create a new one.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantGroup?: Maybe<Tournament>;
  /** Update requirements for participation to the tournament.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantRequirements?: Maybe<Tournament>;
  /** Add or remove tags to the tournament */
  updateTags?: Maybe<Tournament>;
  /** Withdraw invitation */
  withdrawInvitation?: Maybe<Invitation>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationAcceptInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationAddLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationAddParticipantRequirementsFromDefaultTemplateArgs = {
  templateOwner?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationAddSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeAllowMultipleTournamentAttemptsArgs = {
  allowMultipleTournamentAttempts: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeConversionArgs = {
  converted: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeDatesArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeDifficultyArgs = {
  difficulty: LongestDriveTournamentDifficulty;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeDistanceTypeArgs = {
  distanceType: TournamentDistanceType;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeEndDateArgs = {
  endDate: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeFairwayFirmnessArgs = {
  fairwayFirmness: Firmness;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeFairwayWidthArgs = {
  fairwayWidth: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeGameUnitArgs = {
  unit?: InputMaybe<GameUnit>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeHasEndDateArgs = {
  hasEndDate: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeLeaderboardGracePeriodArgs = {
  syncGracePeriodInMinutes: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeLocationPaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeLogoArgs = {
  logoUrl: Scalars['Url']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeMaxParticipantsArgs = {
  locationId: Scalars['ID']['input'];
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeNumberOfRoundsArgs = {
  numberOfRounds: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeShotsPerRoundArgs = {
  shotsPerRound: Scalars['Int']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationChangeTimeLimitArgs = {
  timeLimit: Scalars['TimeSpan']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationDeclineInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationInviteArgs = {
  emails: Array<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationJoinPlayerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationMoveStartTimeArgs = {
  newStartTime: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationReInviteArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationRemoveLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationRemoveParticipantGroupArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationRemoveSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationReplaceSponsorArgs = {
  newSponsorId: Scalars['String']['input'];
  oldSponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationSetAvailabilityArgs = {
  availability: TournamentAvailability;
  makeAvailableForAllBays?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationSetIsIndoorArgs = {
  isIndoor: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationSetIsRangeArgs = {
  isRange: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationSetLocationsArgs = {
  addLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  removeLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  selectAll?: InputMaybe<Scalars['Boolean']['input']>;
  setLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationUpdateGeoFiltersArgs = {
  addExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  addIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  field?: InputMaybe<GeoFilterFields>;
  removeExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationUpdateParticipantGroupArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  name: Scalars['String']['input'];
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationUpdateParticipantRequirementsArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationUpdateTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type LongestDriveTournamentMutationWithdrawInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Maintenance hours for the facility */
export type MaintenanceHours = {
  __typename?: 'MaintenanceHours';
  /** End time for the Maintenance hours - ISO 8601 duration format */
  endTime?: Maybe<Scalars['TimeSpan']['output']>;
  /** Start time for the Maintenance hours - ISO 8601 duration format */
  startTime?: Maybe<Scalars['TimeSpan']['output']>;
};

export type MaintenanceHoursInput = {
  endTime?: InputMaybe<Scalars['TimeSpan']['input']>;
  startTime?: InputMaybe<Scalars['TimeSpan']['input']>;
};

export type MarketingPartnerConsent = ConsentInterfaceType & {
  __typename?: 'MarketingPartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

/** Return all personal data on a profile */
export type Me = {
  __typename?: 'Me';
  /** Activities connected to a person */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** Summary for activities */
  activitySummary?: Maybe<ActivitySummaryTypeCollectionSegment>;
  /** Tournaments that´s available for this player. Paged result of tournaments */
  availableTournaments?: Maybe<TournamentInterfaceTypeCollectionSegment>;
  coachProfile?: Maybe<CoachProfile>;
  consents?: Maybe<UserConsentsResponse>;
  /** Information about equipment connected to a person */
  equipment?: Maybe<AllEquipment>;
  /** My friendships */
  friends?: Maybe<Friendships>;
  /** Return all info abut the players TrackMan handicap */
  hcp?: Maybe<Hcp>;
  /** List of my leagues */
  leagues?: Maybe<LeagueTypeCollectionSegment>;
  /** Return all permissions that is not bound to a facility or location. You have to combine this list with your facility permissions. */
  permissions?: Maybe<Array<PermissionInfo>>;
  /** Paged result for planned rounds */
  plannedRounds?: Maybe<PlannedRoundTypeCollectionSegment>;
  /** List the rounds you've played with someone. */
  playedWith?: Maybe<Array<Maybe<PlayedWith>>>;
  profile?: Maybe<Profile>;
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
  /** List all your scorecards. You can filter and sort the list */
  scorecards?: Maybe<Array<Maybe<Scorecard>>>;
  /** Information about students for a coach */
  students?: Maybe<Students>;
  /** Paged result for tournaments */
  tournaments?: Maybe<TournamentInterfaceTypeCollectionSegment>;
};


/** Return all personal data on a profile */
export type MeActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Return all personal data on a profile */
export type MeActivitySummaryArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Return all personal data on a profile */
export type MeAvailableTournamentsArgs = {
  list?: InputMaybe<TournamentListKinds>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  take?: InputMaybe<Scalars['Int']['input']>;
  tournamentKinds?: InputMaybe<Array<TournamentTypes>>;
};


/** Return all personal data on a profile */
export type MeLeaguesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type MePermissionsArgs = {
  domains?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  noDomains?: InputMaybe<Scalars['Boolean']['input']>;
  permissionPattern?: InputMaybe<Scalars['String']['input']>;
};


/** Return all personal data on a profile */
export type MePlannedRoundsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type MePlayedWithArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type MePropertiesArgs = {
  application: Scalars['String']['input'];
  bayId?: InputMaybe<Scalars['String']['input']>;
  facilityId?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


/** Return all personal data on a profile */
export type MeScorecardsArgs = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  numberOfHolesToPlay?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type MeTournamentsArgs = {
  isEvent?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isFeaturedPaid?: InputMaybe<Scalars['Boolean']['input']>;
  isIndoor?: InputMaybe<Scalars['Boolean']['input']>;
  isRange?: InputMaybe<Scalars['Boolean']['input']>;
  isTeamTournament?: InputMaybe<Scalars['Boolean']['input']>;
  list?: InputMaybe<TournamentListKinds>;
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  tournamentKinds?: InputMaybe<Array<TournamentTypes>>;
  withPendingInvitation?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Mutations on Me */
export type MeMutation = {
  __typename?: 'MeMutation';
  /** Create a planned round */
  createPlannedRound?: Maybe<PlannedRoundPayload>;
  /** Delete a planned round */
  deletePlannedRound?: Maybe<Scalars['Boolean']['output']>;
  /** Friend mutations */
  friend?: Maybe<FriendshipMutation>;
  /** Friends mutations */
  friends?: Maybe<FriendshipsMutation>;
  /** Profile mutations */
  profile?: Maybe<ProfileMutation>;
  /**
   * Add or update the application properties for the user
   * @deprecated Try to use the `setUserProperties` mutation
   */
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
  /**
   * Purchase mutations
   * @deprecated Do not use. Product service is deprecated.
   */
  purchases?: Maybe<PurchaseMutations>;
  /** Update a planned round */
  updatePlannedRound?: Maybe<PlannedRoundPayload>;
};


/** Mutations on Me */
export type MeMutationCreatePlannedRoundArgs = {
  input: PlannedRoundInput;
};


/** Mutations on Me */
export type MeMutationDeletePlannedRoundArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on Me */
export type MeMutationFriendArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on Me */
export type MeMutationPropertiesArgs = {
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>>>;
  application: Scalars['String']['input'];
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on Me */
export type MeMutationUpdatePlannedRoundArgs = {
  id: Scalars['ID']['input'];
  input: PlannedRoundInput;
};

export type Measurement = {
  __typename?: 'Measurement';
  attackAngle?: Maybe<Scalars['Float']['output']>;
  backswingTime?: Maybe<Scalars['Float']['output']>;
  ballSpeed?: Maybe<Scalars['Float']['output']>;
  ballSpeedDifference?: Maybe<Scalars['Float']['output']>;
  ballTrajectory?: Maybe<Array<Maybe<Trajectory>>>;
  bounces?: Maybe<Scalars['Float']['output']>;
  break?: Maybe<Scalars['Float']['output']>;
  carry?: Maybe<Scalars['Float']['output']>;
  carryActual?: Maybe<Scalars['Float']['output']>;
  carrySide?: Maybe<Scalars['Float']['output']>;
  carrySideActual?: Maybe<Scalars['Float']['output']>;
  clubPath?: Maybe<Scalars['Float']['output']>;
  clubSpeed?: Maybe<Scalars['Float']['output']>;
  clubTrajectory?: Maybe<Array<Maybe<Trajectory>>>;
  curve?: Maybe<Scalars['Float']['output']>;
  curveActual?: Maybe<Scalars['Float']['output']>;
  dPlaneTilt?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  detectedClubCategory?: Maybe<Scalars['String']['output']>;
  dynamicLie?: Maybe<Scalars['Float']['output']>;
  dynamicLoft?: Maybe<Scalars['Float']['output']>;
  effectiveStimp?: Maybe<Scalars['Float']['output']>;
  elevation?: Maybe<Scalars['Float']['output']>;
  entrySpeedDistance?: Maybe<Scalars['Float']['output']>;
  faceAngle?: Maybe<Scalars['Float']['output']>;
  faceToPath?: Maybe<Scalars['Float']['output']>;
  flatStimp?: Maybe<Scalars['Float']['output']>;
  forwardswingTime?: Maybe<Scalars['Float']['output']>;
  gyroSpinAngle?: Maybe<Scalars['Float']['output']>;
  hangTime?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  impactHeight?: Maybe<Scalars['Float']['output']>;
  impactOffset?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  landingAngle?: Maybe<Scalars['Float']['output']>;
  landingAngleActual?: Maybe<Scalars['Float']['output']>;
  landingHeight?: Maybe<Scalars['Float']['output']>;
  lastData?: Maybe<Scalars['Float']['output']>;
  launchAngle?: Maybe<Scalars['Float']['output']>;
  launchDirection?: Maybe<Scalars['Float']['output']>;
  lowPointDistance?: Maybe<Scalars['Float']['output']>;
  lowPointHeight?: Maybe<Scalars['Float']['output']>;
  lowPointSide?: Maybe<Scalars['Float']['output']>;
  maxHeight?: Maybe<Scalars['Float']['output']>;
  playerDexterity?: Maybe<Scalars['String']['output']>;
  reducedAccuracy?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  rollDeceleration?: Maybe<Scalars['Float']['output']>;
  rollPercentage?: Maybe<Scalars['Float']['output']>;
  rollSpeed?: Maybe<Scalars['Float']['output']>;
  side?: Maybe<Scalars['Float']['output']>;
  skidDistance?: Maybe<Scalars['Float']['output']>;
  slopePercentageRise?: Maybe<Scalars['Float']['output']>;
  slopePercentageSide?: Maybe<Scalars['Float']['output']>;
  smashFactor?: Maybe<Scalars['Float']['output']>;
  smashIndex?: Maybe<Scalars['Float']['output']>;
  speedDrop?: Maybe<Scalars['Float']['output']>;
  spinAxis?: Maybe<Scalars['Float']['output']>;
  spinAxisActual?: Maybe<Scalars['Float']['output']>;
  spinIndex?: Maybe<Scalars['Float']['output']>;
  spinLoft?: Maybe<Scalars['Float']['output']>;
  spinRate?: Maybe<Scalars['Float']['output']>;
  spinRateDifference?: Maybe<Scalars['Float']['output']>;
  strokeLength?: Maybe<Scalars['Float']['output']>;
  swingDirection?: Maybe<Scalars['Float']['output']>;
  swingPlane?: Maybe<Scalars['Float']['output']>;
  swingRadius?: Maybe<Scalars['Float']['output']>;
  targetPosition?: Maybe<Array<Scalars['Float']['output']>>;
  teePosition?: Maybe<Array<Scalars['Float']['output']>>;
  tempo?: Maybe<Scalars['Float']['output']>;
  time: Scalars['DateTime']['output'];
  total?: Maybe<Scalars['Float']['output']>;
  totalActual?: Maybe<Scalars['Float']['output']>;
  totalBreak?: Maybe<Scalars['Float']['output']>;
  totalSide?: Maybe<Scalars['Float']['output']>;
  totalSideActual?: Maybe<Scalars['Float']['output']>;
};

export type MeasurementDetailImpactLocation = {
  __typename?: 'MeasurementDetailImpactLocation';
  cameraConfiguration?: Maybe<CameraConfiguration>;
  clubConfiguration?: Maybe<ClubConfiguration>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  measurements?: Maybe<Measurements>;
};

export type MeasurementDetails = {
  __typename?: 'MeasurementDetails';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  expiredLicense?: Maybe<ExpiredLicense>;
  impactLocation?: Maybe<MeasurementDetailImpactLocation>;
  outsideTeeAreaForClubData?: Maybe<OutsideTeeArea>;
  outsideTeeAreaForPutting?: Maybe<OutsideTeeArea>;
  trackerNoise?: Maybe<TrackerNoiseNotification>;
  videoIssues?: Maybe<VideoIssuesPayload>;
};

export type Measurements = {
  __typename?: 'Measurements';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  dexterity?: Maybe<Scalars['String']['output']>;
  dynamicLie: Scalars['Float']['output'];
  dynamicLoft: Scalars['Float']['output'];
  faceAngle: Scalars['Float']['output'];
  hoselAngle: Scalars['Float']['output'];
  hoselPoint?: Maybe<Array<Scalars['Float']['output']>>;
  impactHeight: Scalars['Float']['output'];
  impactOffset: Scalars['Float']['output'];
};

export type Media = KeyValuesInterfaceType & Node & TagsInterfaceTypeOfStringType & {
  __typename?: 'Media';
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  kind?: Maybe<MediaKind>;
  /** The name of the media */
  name?: Maybe<Scalars['String']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The url for the media */
  url?: Maybe<Scalars['URL']['output']>;
};


export type MediaHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


export type MediaHasTagArgs = {
  tag: Scalars['String']['input'];
};


export type MediaKeyValueArgs = {
  key: Scalars['String']['input'];
};

export type MediaAsset = {
  __typename?: 'MediaAsset';
  /** MediaAsset is using a default asset */
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  /** MediaAsset kind */
  kind?: Maybe<MediaAssetKind>;
  /** The url for the media */
  url?: Maybe<Scalars['URL']['output']>;
};

export enum MediaAssetKind {
  /** League 'Invitation' Image for GolfApp */
  LeagueGolfappInvitationImage = 'LEAGUE_GOLFAPP_INVITATION_IMAGE',
  /** League 'LeaguePreview' Image for GolfApp */
  LeagueGolfappLeaguepreviewImage = 'LEAGUE_GOLFAPP_LEAGUEPREVIEW_IMAGE',
  /** League 'MyActivities' Image for GolfApp */
  LeagueGolfappMyactivitiesImage = 'LEAGUE_GOLFAPP_MYACTIVITIES_IMAGE',
  /** League 'MyLeagues' Image for GolfApp */
  LeagueGolfappMyleaguesImage = 'LEAGUE_GOLFAPP_MYLEAGUES_IMAGE',
  /** League 'Activity' Image for Portal */
  LeaguePortalActivityImage = 'LEAGUE_PORTAL_ACTIVITY_IMAGE',
  /** League 'Events' Image for Portal */
  LeaguePortalEventsImage = 'LEAGUE_PORTAL_EVENTS_IMAGE',
  /** League 'MyActivities' Image for Portal */
  LeaguePortalMyactivitiesImage = 'LEAGUE_PORTAL_MYACTIVITIES_IMAGE',
  /** League 'MyLeagues' Image for Portal */
  LeaguePortalMyleaguesImage = 'LEAGUE_PORTAL_MYLEAGUES_IMAGE',
  /** League 'LauncherShort' Image for Tps */
  LeagueTpsLaunchershortImage = 'LEAGUE_TPS_LAUNCHERSHORT_IMAGE',
  /** League 'LauncherTall' Image for Tps */
  LeagueTpsLaunchertallImage = 'LEAGUE_TPS_LAUNCHERTALL_IMAGE',
  /** League 'SplashScreen' Image for Tps */
  LeagueTpsSplashscreenImage = 'LEAGUE_TPS_SPLASHSCREEN_IMAGE',
  /** Sponsor 'SponsorLogo' Image for Portal */
  SponsorPortalSponsorlogoImage = 'SPONSOR_PORTAL_SPONSORLOGO_IMAGE',
  /** Tournament 'MyActivities' Image for GolfApp */
  TournamentGolfappMyactivitiesImage = 'TOURNAMENT_GOLFAPP_MYACTIVITIES_IMAGE',
  /** Tournament 'MyTournaments' Image for GolfApp */
  TournamentGolfappMytournamentsImage = 'TOURNAMENT_GOLFAPP_MYTOURNAMENTS_IMAGE',
  /** Tournament 'RangeTournament' Image for GolfApp */
  TournamentGolfappRangetournamentImage = 'TOURNAMENT_GOLFAPP_RANGETOURNAMENT_IMAGE',
  /** Tournament 'TournamentFeatured' Image for GolfApp */
  TournamentGolfappTournamentfeaturedImage = 'TOURNAMENT_GOLFAPP_TOURNAMENTFEATURED_IMAGE',
  /** Tournament 'TournamentPreview' Image for GolfApp */
  TournamentGolfappTournamentpreviewImage = 'TOURNAMENT_GOLFAPP_TOURNAMENTPREVIEW_IMAGE',
  /** Tournament 'LauncherShort' Image for Kiosk */
  TournamentKioskLaunchershortImage = 'TOURNAMENT_KIOSK_LAUNCHERSHORT_IMAGE',
  /** Tournament 'LauncherTall' Image for Kiosk */
  TournamentKioskLaunchertallImage = 'TOURNAMENT_KIOSK_LAUNCHERTALL_IMAGE',
  /** Tournament 'Overview' Image for Kiosk */
  TournamentKioskOverviewImage = 'TOURNAMENT_KIOSK_OVERVIEW_IMAGE',
  /** Tournament 'ScreenSaverRange' Image for Kiosk */
  TournamentKioskScreensaverrangeImage = 'TOURNAMENT_KIOSK_SCREENSAVERRANGE_IMAGE',
  /** Tournament 'ScreenSaver' Image for Kiosk */
  TournamentKioskScreensaverImage = 'TOURNAMENT_KIOSK_SCREENSAVER_IMAGE',
  /** Tournament 'MyActivities' Image for Portal */
  TournamentPortalMyactivitiesImage = 'TOURNAMENT_PORTAL_MYACTIVITIES_IMAGE',
  /** Tournament 'MyTournaments' Image for Portal */
  TournamentPortalMytournamentsImage = 'TOURNAMENT_PORTAL_MYTOURNAMENTS_IMAGE',
  /** Tournament 'LauncherShort' Image for Tps */
  TournamentTpsLaunchershortImage = 'TOURNAMENT_TPS_LAUNCHERSHORT_IMAGE',
  /** Tournament 'LauncherTall' Image for Tps */
  TournamentTpsLaunchertallImage = 'TOURNAMENT_TPS_LAUNCHERTALL_IMAGE',
  /** Tournament 'Promotion' Video for Tps */
  TournamentTpsPromotionVideo = 'TOURNAMENT_TPS_PROMOTION_VIDEO',
  /** Tournament 'SplashScreen' Image for Tps */
  TournamentTpsSplashscreenImage = 'TOURNAMENT_TPS_SPLASHSCREEN_IMAGE'
}

/** Interface to list media assets */
export type MediaAssetsInterface = {
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
};

/** Interface for mutation on media assets */
export type MediaAssetsMutationInterface = {
  /** Add default image to the media assets */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** Add media assets to the media assets */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove media assets from the media assets */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
};


/** Interface for mutation on media assets */
export type MediaAssetsMutationInterfaceAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Interface for mutation on media assets */
export type MediaAssetsMutationInterfaceAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Interface for mutation on media assets */
export type MediaAssetsMutationInterfaceRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};

export enum MediaKind {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

/** Mutations on a media */
export type MediaMutation = {
  __typename?: 'MediaMutation';
  /** Delete the media */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Duplicate the media */
  duplicate?: Maybe<Media>;
  /** Move media to album */
  moveToAlbum?: Maybe<Media>;
  /** Remove media from album */
  removeFromAlbum?: Maybe<Media>;
  /** Rename the media */
  rename?: Maybe<Media>;
  /** Upload a media to the media library */
  uploadMedia?: Maybe<Media>;
};


/** Mutations on a media */
export type MediaMutationDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on a media */
export type MediaMutationDuplicateArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on a media */
export type MediaMutationMoveToAlbumArgs = {
  album: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


/** Mutations on a media */
export type MediaMutationRemoveFromAlbumArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations on a media */
export type MediaMutationRenameArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


/** Mutations on a media */
export type MediaMutationUploadMediaArgs = {
  album?: InputMaybe<Scalars['ID']['input']>;
  file: Scalars['Upload']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type MediaResource = {
  __typename?: 'MediaResource';
  /** Get the pixel position based on real life coordinates */
  getPixelPosition?: Maybe<UnityTransformationMetadataPixelPosition>;
  height: Scalars['Int']['output'];
  kind?: Maybe<ImageKinds>;
  /** The url for the metadata */
  metaDataUrl?: Maybe<Scalars['URL']['output']>;
  sha256?: Maybe<Scalars['String']['output']>;
  size: Scalars['Float']['output'];
  /** The url for the image */
  url?: Maybe<Scalars['URL']['output']>;
  width: Scalars['Int']['output'];
};


export type MediaResourceGetPixelPositionArgs = {
  latLonCoordinate?: InputMaybe<LatLonInputType>;
  unityCoordinate?: InputMaybe<UnityPositionInput>;
  utmCoordinate?: InputMaybe<SimpleUtmInput>;
};

/** Interface to list albums and medias */
export type MediasInterface = {
  /** The list of albums */
  albums?: Maybe<Array<Album>>;
  /** The list of medias */
  medias?: Maybe<Array<Media>>;
};


/** Interface to list albums and medias */
export type MediasInterfaceMediasArgs = {
  mediaKind?: InputMaybe<MediaKind>;
};

/** Member in a team for a Tournament */
export type Member = {
  __typename?: 'Member';
  /**
   * Information about this person
   * @deprecated Use TournamentTeamMember
   */
  person?: Maybe<PersonInfo>;
};

export type MemberDisqualifiedError = BaseError & {
  __typename?: 'MemberDisqualifiedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MemberNotFoundError = BaseError & {
  __typename?: 'MemberNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MemberRemovedError = BaseError & {
  __typename?: 'MemberRemovedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Membership = {
  __typename?: 'Membership';
  /** Access restrictions for this facility */
  access?: Maybe<MembershipAccess>;
};

export enum MembershipAccess {
  AccessForAll = 'ACCESS_FOR_ALL',
  AccessForMembersOnly = 'ACCESS_FOR_MEMBERS_ONLY',
  AccessToVirtualGolfForMembersOnly = 'ACCESS_TO_VIRTUAL_GOLF_FOR_MEMBERS_ONLY'
}

export type MembershipForFacilityAlreadyExistsError = BaseError & {
  __typename?: 'MembershipForFacilityAlreadyExistsError';
  code?: Maybe<Scalars['String']['output']>;
  facilityId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type MembershipInfo = Node & {
  __typename?: 'MembershipInfo';
  createdAt: Scalars['DateTime']['output'];
  dbId: Scalars['NonEmptyString']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['EmailAddress']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdatedAt: Scalars['DateTime']['output'];
  startDate: Scalars['DateTime']['output'];
  user?: Maybe<MembershipUser>;
};

export type MembershipSortInput = {
  displayName?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  lastUpdatedAt?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
};

export type MembershipUser = {
  __typename?: 'MembershipUser';
  id: Scalars['NonEmptyString']['output'];
};

export type MetadataResource = {
  __typename?: 'MetadataResource';
  cdnUrl?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<MetadataResourcePlatform>;
  sceneName?: Maybe<Scalars['String']['output']>;
  sha256?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export enum MetadataResourcePlatform {
  Linux = 'LINUX',
  Windows = 'WINDOWS'
}

export type MissingMandatoryFieldError = BaseError & {
  __typename?: 'MissingMandatoryFieldError';
  code?: Maybe<Scalars['String']['output']>;
  fieldName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum MkDownTypes {
  Html = 'HTML',
  Mkdown = 'MKDOWN',
  PlainText = 'PLAIN_TEXT'
}

export type MrtTournamentProgress = TournamentProgressInterface & {
  __typename?: 'MrtTournamentProgress';
  isTeamProgress?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<PersonInfo>;
  participantGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The rounds of the tournament that have been completed by the participant. */
  rounds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  roundsProgress?: Maybe<Array<Maybe<RoundProgress>>>;
};

export enum Mulligans {
  Always = 'ALWAYS',
  FirstTee = 'FIRST_TEE',
  No = 'NO'
}

/** The tournament description */
export type MultiRoundTournament = CourseTournament & KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'MultiRoundTournament';
  /** The aggregated leaderboard for in-round closest to the pin games */
  aggregatedClosestToPinLeaderboard?: Maybe<AggregatedClosestToPinLeaderboard>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Closest To Pin game */
  closestToPinEmbeddedGameLeaderboard?: Maybe<ClosestToPin>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The duration (time length) of the tournament */
  duration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The leaderboard for the in-round game */
  embeddedGameLeaderboard?: Maybe<EmbeddedGameLeaderboardUnion>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /**
   * The game summary leaderboard for birdie streak, GIR streak etc.
   * @deprecated Use otherLeaderboards instead. This field will be removed in the future.
   */
  gameSummaryLeaderboard?: Maybe<GameSummaryLeaderboardRecordTypeCollectionSegment>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Tournament has overlapping rounds */
  hasOverlappingRounds?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<Leaderboard>;
  links?: Maybe<Array<LinkKeyValue>>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Longest Drive game */
  longestDriveEmbeddedGameLeaderboard?: Maybe<LongestDrive>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** Number of rounds */
  numberOfRounds?: Maybe<Scalars['PositiveInt']['output']>;
  oomPointsDistributionTable?: Maybe<DistributionTable>;
  /** Optional leaderboard scoring formats */
  optionalScoringFormats?: Maybe<Array<Maybe<GameTypes>>>;
  /** Other side-bed leaderboards like birdie streak, GIR streak etc. */
  otherLeaderboards?: Maybe<OtherLeaderboards>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** A tournament round */
  round?: Maybe<TournamentRound>;
  /** The leaderboard for the round */
  roundLeaderboard?: Maybe<RoundLeaderboard>;
  /** The tournament rounds */
  rounds?: Maybe<Array<TournamentRound>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type MultiRoundTournamentAggregatedClosestToPinLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type MultiRoundTournamentClosestToPinEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type MultiRoundTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type MultiRoundTournamentEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type MultiRoundTournamentGameSummaryLeaderboardArgs = {
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  kind?: InputMaybe<GameSummaryKinds>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};


/** The tournament description */
export type MultiRoundTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type MultiRoundTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type MultiRoundTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type MultiRoundTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type MultiRoundTournamentLongestDriveEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type MultiRoundTournamentOomPointsDistributionTableArgs = {
  numberOfParticipants?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The tournament description */
export type MultiRoundTournamentOtherLeaderboardsArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  kind: OtherLeaderboardsKind;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
};


/** The tournament description */
export type MultiRoundTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type MultiRoundTournamentRoundArgs = {
  roundId?: InputMaybe<Scalars['ID']['input']>;
  roundNumber?: InputMaybe<Scalars['Int']['input']>;
};


/** The tournament description */
export type MultiRoundTournamentRoundLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type MultiRoundTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type MultiRoundTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** GraphQL api that expose all TrackMan Golf data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Accepting a consent (TrackMan/Partner/Facility consent) */
  acceptConsent: AcceptConsentPayload;
  /** Accept to be part of the team */
  acceptTeam: AcceptTeamPayload;
  /** Mutations on a Activity */
  activity?: Maybe<ActivityMutation>;
  addCoachToFacility: AddCoachToFacilityPayload;
  /** Add a new equipment brand to a facility */
  addEquipmentBrand: AddEquipmentBrandPayload;
  /** Add a new equipment series to a brand */
  addEquipmentSeries: AddEquipmentSeriesPayload;
  /** Add consents to the partner */
  addFacilityConsents: AddFacilityConsentsPayload;
  /** Create a new partner for a facility */
  addFacilityPartner: AddFacilityPartnerPayload;
  /** Add membership to a facility */
  addMembership: AddMembershipPayload;
  /** Add command for the given bay */
  addQueuedCommand: AddQueuedCommandPayload;
  /** Add a range bay */
  addRangeBay: AddRangeBayPayload;
  /** Add a launchArea */
  addRangeLaunchArea: AddRangeLaunchAreaPayload;
  /** Add a net on a range */
  addRangeNet: AddRangeNetPayload;
  /** Add a radar */
  addRangeRadar: AddRangeRadarPayload;
  /** Add a range section */
  addRangeSection: AddRangeSectionPayload;
  /** Add a range target */
  addRangeTarget: AddRangeTargetPayload;
  /** Request a person to be part of the team */
  addTeamMember: AddTeamMemberPayload;
  /** Create a new consent and partner for a tournament */
  addTournamentConsent: AddTournamentConsentPayload;
  /** Add tournament partners */
  addTournamentPartners: AddTournamentPartnersPayload;
  /** Mutations on a Person */
  adminPerson?: Maybe<IdValue>;
  /** Mutations for admin tools */
  adminTools?: Maybe<AdminToolMutationType>;
  /** Mutations available for out different applications eg. TPS or Range applications. */
  applicationData?: Maybe<ApplicationDataMutationInterfaceType>;
  /** Broadcast a notification to a set of devices */
  broadcastDeviceNotifications: BroadcastDeviceNotificationsPayload;
  cancelBaysTimer: CancelBaysTimerPayload;
  changeBaysLocation: ChangeBaysLocationPayload;
  /** @deprecated please use changeBullsEyeTournamentHoleOptions */
  changeBullsEyeHoleOption: ChangeBullsEyeHoleOptionPayload;
  changeBullsEyeTournamentCourse: ChangeBullsEyeTournamentCoursePayload;
  changeBullsEyeTournamentHoleOptions: ChangeBullsEyeTournamentHoleOptionsPayload;
  /** Change the number of shots per round of the tournament */
  changeBullsEyeTournamentShotsPerRound: ChangeBullsEyeTournamentShotsPerRoundPayload;
  /** Update the availability of a list of bays */
  changeRangeBayAvailability: ChangeRangeBayAvailabilityPayload;
  /** Update the kiosk only status of a list of bays */
  changeRangeBayKioskOnlyFlag: ChangeRangeBayKioskOnlyFlagPayload;
  /** Update the labels of a list of bays */
  changeRangeBayLabels: ChangeRangeBayLabelsPayload;
  /** Update the color of a list of range targets */
  changeRangeTargetsColor: ChangeRangeTargetsColorPayload;
  /** Update the target type of a list of range targets */
  changeRangeTargetsType: ChangeRangeTargetsTypePayload;
  /** Show or hide targets */
  changeRangeTargetsVisibility: ChangeRangeTargetsVisibilityPayload;
  /** Change course for bullseye season activity */
  changeSeasonBullsEyeActivityCourse: ChangeSeasonBullsEyeActivityCoursePayload;
  /** Change hole option for bullseye season activity */
  changeSeasonBullsEyeActivityHoleOptions: ChangeSeasonBullsEyeActivityHoleOptionsPayload;
  /** Change the number of shots per round for bullseye season activity */
  changeSeasonBullsEyeActivityShotsPerRound: ChangeSeasonBullsEyeActivityShotsPerRoundPayload;
  /** Change the season tournament activity fairway firmness */
  changeSeasonTournamentActivityFairwayFirmness: ChangeSeasonTournamentActivityFairwayFirmnessPayload;
  /** Change the season tournament activity green firmness */
  changeSeasonTournamentActivityGreenFirmness: ChangeSeasonTournamentActivityGreenFirmnessPayload;
  /** Change the season tournament activity hcp kind */
  changeSeasonTournamentActivityHcpKind: ChangeSeasonTournamentActivityHcpKindPayload;
  /** Change the holes selection for a season activity */
  changeSeasonTournamentActivityHoles: ChangeSeasonTournamentActivityHolesPayload;
  /** Change the number of attempts for a season activity */
  changeSeasonTournamentActivityNumberOfAttempts: ChangeSeasonTournamentActivityNumberOfAttemptsPayload;
  /** Change the tee for a season activity */
  changeSeasonTournamentActivityTee: ChangeSeasonTournamentActivityTeePayload;
  /** Change the season tournament activity wind speed */
  changeSeasonTournamentActivityWindSpeed: ChangeSeasonTournamentActivityWindSpeedPayload;
  /** Update the labels of a list of targets */
  changeTargetLabels: ChangeTargetLabelsPayload;
  /** Change a team color */
  changeTeamColor: ChangeTeamColorPayload;
  /** Change a team icon */
  changeTeamIcon: ChangeTeamIconPayload;
  /** Change a team name */
  changeTeamName: ChangeTeamNamePayload;
  /** Change the date range for a tournament or a tournament round (depends on the type of the tournament) */
  changeTournamentDateRange: ChangeTournamentDateRangePayload;
  /** Change the fairway firmness for a tournament or a tournament round (depends on the type of the tournament) */
  changeTournamentFairwayFirmness: ChangeTournamentFairwayFirmnessPayload;
  /** Change the green firmness for a tournament or a tournament round (depends on the type of the tournament) */
  changeTournamentGreenFirmness: ChangeTournamentGreenFirmnessPayload;
  /** change tournament hcp kind */
  changeTournamentHcpKind: ChangeTournamentHcpKindPayload;
  /** Change the holes selection for a tournament */
  changeTournamentHoles: ChangeTournamentHolesPayload;
  /** Change the number of attempts user get per entry */
  changeTournamentNumberOfAttempts: ChangeTournamentNumberOfAttemptsPayload;
  /** Change the tee for a tournament */
  changeTournamentTee: ChangeTournamentTeePayload;
  /** Change the wind for a tournament or a tournament round (depends on the type of the tournament) */
  changeTournamentWindSpeed: ChangeTournamentWindSpeedPayload;
  /** Change my date of birth */
  changeUserBirthDate: ChangeUserBirthDatePayload;
  /** Change my player category */
  changeUserCategory: ChangeUserCategoryPayload;
  /** Change my email */
  changeUserEmail: ChangeUserEmailPayload;
  /** Change my first name */
  changeUserFirstName: ChangeUserFirstNamePayload;
  /** Change my gender */
  changeUserGender: ChangeUserGenderPayload;
  /** Change my last name */
  changeUserLastName: ChangeUserLastNamePayload;
  /** Change my nationality code */
  changeUserNationality: ChangeUserNationalityPayload;
  /** Change my official handicap */
  changeUserOutdoorHandicap: ChangeUserOutdoorHandicapPayload;
  /** Change my password */
  changeUserPassword: ChangeUserPasswordPayload;
  /** Change my player name */
  changeUserPlayerName: ChangeUserPlayerNamePayload;
  /** Allow my profile to be seen or searched by either anyone, the players I have played with, or no one */
  changeUserSearchability: ChangeUserSearchabilityPayload;
  /** remove expired memberships */
  cleanupOldMemberships: CleanupOldMembershipsPayload;
  /** Remove all find-my-distance shots from all the equipment own by the calling user, including retired equipment. */
  clearFindMyDistanceShots: ClearFindMyDistanceShotsPayload;
  /** Create a new club */
  createClub: CreateClubPayload;
  /** Create new clubs */
  createClubs: CreateClubsPayload;
  /** Create a new Facility */
  createFacility?: Maybe<Facility>;
  createOAuthClientApplication: CreateOAuthClientApplicationPayload;
  createServiceAccount: CreateServiceAccountPayload;
  /** Create a team */
  createTeam: CreateTeamPayload;
  /** Create teams */
  createTeams: CreateTeamsPayload;
  /** Create a new tournament */
  createTournament: CreateTournamentPayload;
  /** Decline to be part of the team */
  declineTeam: DeclineTeamPayload;
  /** Decreasing the numeric value of a single setting in an application property for the current user */
  decreaseNumericUserPropertyValue: DecreaseNumericUserPropertyValuePayload;
  /** Delete a list of clubs */
  deleteClubs: DeleteClubsPayload;
  /** Delete teams */
  deleteTeams: DeleteTeamsPayload;
  /** Delete a profile and all its data for a user. The deleted data cannot be restored. */
  deleteUserProfileData: DeleteUserProfileDataPayload;
  /** Deselect all the bays of all the selected locations for tournament */
  deselectAllBaysForAllTournamentLocations: DeselectAllBaysForAllTournamentLocationsPayload;
  /** Deselect all the bays of selected location for tournament */
  deselectAllBaysForTournamentLocations: DeselectAllBaysForTournamentLocationsPayload;
  /** Deselect bays for tournament */
  deselectBaysForTournament: DeselectBaysForTournamentPayload;
  /** disable tie breaker for putt putt tournament */
  disablePuttPuttTournamentTieBreaker: DisablePuttPuttTournamentTieBreakerPayload;
  /** Disable a list of bays */
  disableRangeBays: DisableRangeBaysPayload;
  /** Disable a list of launchAreas */
  disableRangeLaunchAreas: DisableRangeLaunchAreasPayload;
  /** Disable a list of nets */
  disableRangeNets: DisableRangeNetsPayload;
  /** Disable radars */
  disableRangeRadars: DisableRangeRadarsPayload;
  /** Disable a list of range targets */
  disableRangeTargets: DisableRangeTargetsPayload;
  /** Disable tie breaker for putt putt season activity */
  disableSeasonPuttPuttActivityAllowTieBreaker: DisableSeasonPuttPuttActivityAllowTieBreakerPayload;
  /** Disable allow putting mode for shuffle bullseye season activity */
  disableSeasonShuffleBullsEyeActivityAllowPuttingMode: DisableSeasonShuffleBullsEyeActivityAllowPuttingModePayload;
  /** Disable allow putting mode for shuffle bullseye tournament */
  disableShuffleBullsEyeTournamentAllowPuttingMode: DisableShuffleBullsEyeTournamentAllowPuttingModePayload;
  /** Disable tournament partner consents feature */
  disableTournamentPartnerConsentsFeature: DisableTournamentPartnerConsentsFeaturePayload;
  /** Disable pay per entry for tournament */
  disableTournamentPayPerEntry: DisableTournamentPayPerEntryPayload;
  /** Deleting all unpublished changes for a range site configuration */
  discardRangeConfigurationDrafts: DiscardRangeConfigurationDraftsPayload;
  /** Disqualify a team from the season */
  disqualifyTeam: DisqualifyTeamPayload;
  /** Disqualify a team member from the season */
  disqualifyTeamMember: DisqualifyTeamMemberPayload;
  /** Mutations on a Domain */
  domain?: Maybe<DomainUserAdminMutation>;
  /** Duplicate an existing info screen */
  duplicateInfoScreen: DuplicateInfoScreenPayload;
  /** enable tie breaker for putt putt tournament */
  enablePuttPuttTournamentTieBreaker: EnablePuttPuttTournamentTieBreakerPayload;
  /** Enable a list of bays */
  enableRangeBays: EnableRangeBaysPayload;
  /** Enable a list of launchAreas */
  enableRangeLaunchAreas: EnableRangeLaunchAreasPayload;
  /** Enable a list of nets */
  enableRangeNets: EnableRangeNetsPayload;
  /** Enable a list of range radars */
  enableRangeRadars: EnableRangeRadarsPayload;
  /** enable a list of range targets */
  enableRangeTargets: EnableRangeTargetsPayload;
  /** Enable tie breaker for putt putt season activity */
  enableSeasonPuttPuttActivityAllowTieBreaker: EnableSeasonPuttPuttActivityAllowTieBreakerPayload;
  /** Enable allow putting mode for shuffle bullseye season activity */
  enableSeasonShuffleBullsEyeActivityAllowPuttingMode: EnableSeasonShuffleBullsEyeActivityAllowPuttingModePayload;
  /** Enable allow putting mode for shuffle bullseye tournament */
  enableShuffleBullsEyeTournamentAllowPuttingMode: EnableShuffleBullsEyeTournamentAllowPuttingModePayload;
  /** Enable tournament partner consents feature */
  enableTournamentPartnerConsentsFeature: EnableTournamentPartnerConsentsFeaturePayload;
  /** Enable pay per entry for tournament */
  enableTournamentPayPerEntry: EnableTournamentPayPerEntryPayload;
  endBaysSession: EndBaysSessionPayload;
  /** Run all queued commands for the given bays. If no bayIds are provided, it will run diagnostics for all bays in the queue. */
  executeQueuedCommands: ExecuteQueuedCommandsPayload;
  /** Mutations on a Facility */
  facility?: Maybe<FacilityMutation>;
  /** Mark the scorecard activity as hidden */
  hideScorecardActivity: Scalars['Boolean']['output'];
  /** Increasing the numeric value of a single setting in an application property for the current user */
  increaseNumericUserPropertyValue: IncreaseNumericUserPropertyValuePayload;
  /** Mutations on a InfoScreen */
  infoScreen?: Maybe<InfoScreenId>;
  /** Mutations on a InfoScreen Page */
  infoScreenPage?: Maybe<InfoScreenPageId>;
  /** Mutations on a InfoScreen Page Item */
  infoScreenPageItem?: Maybe<InfoScreenPageItemId>;
  /** Third-Party providers integration mutations */
  integrations?: Maybe<FacilityIntegrationsMutations>;
  /** Mutations on a Facility league */
  league?: Maybe<LeagueMutation>;
  /** Mutations on a league season */
  leagueSeason?: Maybe<LeagueSeasonMutation>;
  /** Leave the team */
  leaveTeam: LeaveTeamPayload;
  /** Mutations on a Facility Location */
  location?: Maybe<LocationMutation>;
  lockBays: LockBaysPayload;
  /** Mutations on a Me */
  me?: Maybe<MeMutation>;
  /**
   * Notification mutations
   * @deprecated Use root mutations instead
   */
  notifications?: Maybe<NotificationMutations>;
  /**
   * Mutations on a partner
   * @deprecated No longer supported.
   */
  partner?: Maybe<PartnerMutations>;
  /** Mutations for payments */
  payment?: Maybe<PaymentMutationsType>;
  provisionIndoorSiteServer: ProvisionIndoorSiteServerPayload;
  /** Publishing range site configuration */
  publishRangeConfiguration: PublishRangeConfigurationPayload;
  /** Re-join a team to the season again */
  reJoinTeam: ReJoinTeamPayload;
  /** Re-join a team member to the season again */
  reJoinTeamMember: ReJoinTeamMemberPayload;
  /** Register a device for receiving notifications */
  registerDeviceNotification: RegisterDeviceNotificationPayload;
  registerIndoorSiteServer: RegisterIndoorSiteServerPayload;
  removeCoachFromFacility: RemoveCoachFromFacilityPayload;
  /** Remove consents from a facility partner */
  removeFacilityConsents: RemoveFacilityConsentsPayload;
  /** Remove existing partner */
  removeFacilityPartner: RemoveFacilityPartnerPayload;
  /** remove a list of shots from the shot list for a specific club */
  removeFindMyDistanceShot: RemoveFindMyDistanceShotPayload;
  /** remove a membership */
  removeMembership: RemoveMembershipPayload;
  removeOAuthClientApplication: RemoveOAuthClientApplicationPayload;
  /** Remove consents localizations from a facility partner consent */
  removePartnerConsentLocalizations: RemovePartnerConsentLocalizationsPayload;
  /** Remove the queued command for the given bay(s) */
  removeQueuedCommand: RemoveQueuedCommandPayload;
  /** Delete a list of range bays */
  removeRangeBays: RemoveRangeBaysPayload;
  /** Remove a list of launchAreas */
  removeRangeLaunchAreas: RemoveRangeLaunchAreasPayload;
  /** Remove a net from a range */
  removeRangeNets: RemoveRangeNetsPayload;
  /** Delete a list of radars */
  removeRangeRadar: RemoveRangeRadarPayload;
  /** Delete a list of range sections */
  removeRangeSections: RemoveRangeSectionsPayload;
  /** Delete a list of range targets */
  removeRangeTargets: RemoveRangeTargetsPayload;
  /** Remove the team */
  removeTeam: RemoveTeamPayload;
  /** Remove a person from the team */
  removeTeamMember: RemoveTeamMemberPayload;
  /** Remove tournament partners */
  removeTournamentPartners: RemoveTournamentPartnersPayload;
  resetOAuthClientApplicationSecret: ResetOAuthClientApplicationSecretPayload;
  /** Delete a draft version of bays and return to the previous published version */
  revertRangeBays: RevertRangeBaysPayload;
  /** Reverting range site configuration to any previously published one */
  revertRangeConfiguration: RevertRangeConfigurationPayload;
  /** Delete a draft version of launchAreas and return to the previous published version */
  revertRangeLaunchAreas: RevertRangeLaunchAreasPayload;
  /** Delete a draft version of net and return to the previous published version */
  revertRangeNets: RevertRangeNetsPayload;
  /** Delete a draft version of radars and return to the previous published version */
  revertRangeRadars: RevertRangeRadarsPayload;
  /** Delete a draft version of a range target and return to the previous published version */
  revertRangeTargets: RevertRangeTargetsPayload;
  /** Revoking a consent (TrackMan/Partner/Facility consent) */
  revokeConsent: RevokeConsentPayload;
  /** Mutations on a league season activity */
  seasonActivity?: Maybe<SeasonBaseActivityMutationInterface>;
  /** Select all the bays of all the selected locations for tournament */
  selectAllBaysForAllTournamentLocations: SelectAllBaysForAllTournamentLocationsPayload;
  /** Select all the bays of selected locations for tournament */
  selectAllBaysForTournamentLocations: SelectAllBaysForTournamentLocationsPayload;
  /** Select bays for tournament */
  selectBaysForTournament: SelectBaysForTournamentPayload;
  /** Send an app script to one or more bays. */
  sendAppScriptToBay: SendAppScriptToBayPayload;
  /** Publish a notification to user token */
  sendMeNotification: SendMeNotificationPayload;
  sendMessageToBays: SendMessageToBaysPayload;
  /** Send an email to confirm my email */
  sendUserEmailConfirmation: SendUserEmailConfirmationPayload;
  /** send phone number confirmation code to the user's phone number */
  sendUserPhoneNumberConfirmation: SendUserPhoneNumberConfirmationPayload;
  /** Add Or Update application properties for bays */
  setBaysApplicationProperties: SetBaysApplicationPropertiesPayload;
  /** Update the safety border notifications settings */
  setNetNotificationConfiguration: SetNetNotificationConfigurationPayload;
  /** Setting the numeric value of a single setting to the maximum of the current value and the given value in an application property for the current user */
  setNumericUserPropertyMaxValue: SetNumericUserPropertyMaxValuePayload;
  /** Setting the numeric value of a single setting to the minimum of the current value and the given value in an application property for the current user */
  setNumericUserPropertyMinValue: SetNumericUserPropertyMinValuePayload;
  /** Set origin point */
  setOriginPoint: SetOriginPointPayload;
  /** Set reference point */
  setReferencePoint: SetReferencePointPayload;
  /** Add or update the application properties for the user */
  setUserProperties: SetUserPropertiesPayload;
  /** Allow friends to see played rounds. default true */
  shareUserPlayedRounds: ShareUserPlayedRoundsPayload;
  /** Allow show user's email */
  showUserEmail: ShowUserEmailPayload;
  /** Allow show fullname for friends */
  showUserFullNameForFriends: ShowUserFullNameForFriendsPayload;
  /** Allow show fullname for tournaments */
  showUserFullNameForTournaments: ShowUserFullNameForTournamentsPayload;
  /** Allow show picture. default true */
  showUserPicture: ShowUserPicturePayload;
  /** Mutations on a sponsor */
  sponsor?: Maybe<SponsorMutations>;
  /** Mutations on a sponsor campaign */
  sponsorCampaign?: Maybe<SponsorCampaignMutations>;
  /** Mutations on a sponsor campaign */
  sponsorCampaignV2?: Maybe<SponsorCampaignMutationInterfaceType>;
  /** Swap an active club with an retired one. The two clubs then changes state. */
  swapClubs: SwapClubsPayload;
  /** Mutations on a Tournament */
  tournament?: Maybe<TournamentMutationInterface>;
  /** Un-register a device from receiving notifications */
  unRegisterDeviceNotification: UnRegisterDeviceNotificationPayload;
  unlockBays: UnlockBaysPayload;
  /** update an existing club */
  updateClub: UpdateClubPayload;
  updateCoachProfile: UpdateCoachProfilePayload;
  /** Update the list of shot used for the 'find my distance' feature */
  updateFindMyDistanceShots: UpdateFindMyDistanceShotsPayload;
  /** Update the key account priority for a Facility */
  updateKeyAccountPriority: UpdateKeyAccountPriorityPayload;
  /** It updates a label */
  updateLabel: UpdateLabelPayload;
  /** Change the location PIN code */
  updateLocationPinCode: UpdateLocationPinCodePayload;
  /** Update a membership */
  updateMembership: UpdateMembershipPayload;
  updateOAuthClientApplication: UpdateOAuthClientApplicationPayload;
  /** Enable or disable Camera status of a radar */
  updateRadarCameraStatus: UpdateRadarCameraStatusPayload;
  /** Enable or disable GpsRtk status of a radar */
  updateRadarGpsRtkStatus: UpdateRadarGpsRtkStatusPayload;
  /** update a range bay */
  updateRangeBay: UpdateRangeBayPayload;
  /** update a launchArea */
  updateRangeLaunchArea: UpdateRangeLaunchAreaPayload;
  /** Update a net on a range */
  updateRangeNet: UpdateRangeNetPayload;
  /** update a radar */
  updateRangeRadar: UpdateRangeRadarPayload;
  /** update a range section */
  updateRangeSection: UpdateRangeSectionPayload;
  /** update a range target */
  updateRangeTarget: UpdateRangeTargetPayload;
  /** update and verify user's phone number */
  updateUserPhoneNumber: UpdateUserPhoneNumberPayload;
  /** Update all the profile properties in one go */
  updateUserProfile: UpdateUserProfilePayload;
  uploadLogsFromBays: UploadLogsFromBaysPayload;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAcceptConsentArgs = {
  input: AcceptConsentInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAcceptTeamArgs = {
  input: AcceptTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationActivityArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddCoachToFacilityArgs = {
  input: AddCoachToFacilityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddEquipmentBrandArgs = {
  input: AddEquipmentBrandInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddEquipmentSeriesArgs = {
  input: AddEquipmentSeriesInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddFacilityConsentsArgs = {
  input: AddFacilityConsentsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddFacilityPartnerArgs = {
  input: AddFacilityPartnerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddMembershipArgs = {
  input: AddMembershipInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddQueuedCommandArgs = {
  input: AddQueuedCommandInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddRangeBayArgs = {
  input: AddRangeBayInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddRangeLaunchAreaArgs = {
  input: AddRangeLaunchAreaInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddRangeNetArgs = {
  input: AddRangeNetInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddRangeRadarArgs = {
  input: AddRangeRadarInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddRangeSectionArgs = {
  input: AddRangeSectionInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddRangeTargetArgs = {
  input: AddRangeTargetInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddTeamMemberArgs = {
  input: AddTeamMemberInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddTournamentConsentArgs = {
  input: AddTournamentConsentInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAddTournamentPartnersArgs = {
  input: AddTournamentPartnersInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationAdminPersonArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationApplicationDataArgs = {
  bayId?: InputMaybe<Scalars['String']['input']>;
  client: ApplicationClients;
  clientVersion?: InputMaybe<Scalars['String']['input']>;
  deviceId?: InputMaybe<Scalars['String']['input']>;
  facilityId?: InputMaybe<Scalars['String']['input']>;
  hardwareType?: InputMaybe<Scalars['String']['input']>;
  language?: Scalars['String']['input'];
  layoutKind?: InputMaybe<Scalars['String']['input']>;
  layoutVersion?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  serialNo?: InputMaybe<Scalars['String']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationBroadcastDeviceNotificationsArgs = {
  input: BroadcastDeviceNotificationsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCancelBaysTimerArgs = {
  input: CancelBaysTimerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeBaysLocationArgs = {
  input: ChangeBaysLocationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeBullsEyeHoleOptionArgs = {
  input: ChangeBullsEyeHoleOptionInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeBullsEyeTournamentCourseArgs = {
  input: ChangeBullsEyeTournamentCourseInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeBullsEyeTournamentHoleOptionsArgs = {
  input: ChangeBullsEyeTournamentHoleOptionsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeBullsEyeTournamentShotsPerRoundArgs = {
  input: ChangeBullsEyeTournamentShotsPerRoundInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeRangeBayAvailabilityArgs = {
  input: ChangeRangeBayAvailabilityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeRangeBayKioskOnlyFlagArgs = {
  input: ChangeRangeBayKioskOnlyFlagInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeRangeBayLabelsArgs = {
  input: ChangeRangeBayLabelsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeRangeTargetsColorArgs = {
  input: ChangeRangeTargetsColorInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeRangeTargetsTypeArgs = {
  input: ChangeRangeTargetsTypeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeRangeTargetsVisibilityArgs = {
  input: ChangeRangeTargetsVisibilityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonBullsEyeActivityCourseArgs = {
  input: ChangeSeasonBullsEyeActivityCourseInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonBullsEyeActivityHoleOptionsArgs = {
  input: ChangeSeasonBullsEyeActivityHoleOptionsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonBullsEyeActivityShotsPerRoundArgs = {
  input: ChangeSeasonBullsEyeActivityShotsPerRoundInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityFairwayFirmnessArgs = {
  input: ChangeSeasonTournamentActivityFairwayFirmnessInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityGreenFirmnessArgs = {
  input: ChangeSeasonTournamentActivityGreenFirmnessInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityHcpKindArgs = {
  input: ChangeSeasonTournamentActivityHcpKindInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityHolesArgs = {
  input: ChangeSeasonTournamentActivityHolesInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityNumberOfAttemptsArgs = {
  input: ChangeSeasonTournamentActivityNumberOfAttemptsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityTeeArgs = {
  input: ChangeSeasonTournamentActivityTeeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeSeasonTournamentActivityWindSpeedArgs = {
  input: ChangeSeasonTournamentActivityWindSpeedInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTargetLabelsArgs = {
  input: ChangeTargetLabelsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTeamColorArgs = {
  input: ChangeTeamColorInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTeamIconArgs = {
  input: ChangeTeamIconInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTeamNameArgs = {
  input: ChangeTeamNameInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentDateRangeArgs = {
  input: ChangeTournamentDateRangeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentFairwayFirmnessArgs = {
  input: ChangeTournamentFairwayFirmnessInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentGreenFirmnessArgs = {
  input: ChangeTournamentGreenFirmnessInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentHcpKindArgs = {
  input: ChangeTournamentHcpKindInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentHolesArgs = {
  input: ChangeTournamentHolesInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentNumberOfAttemptsArgs = {
  input: ChangeTournamentNumberOfAttemptsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentTeeArgs = {
  input: ChangeTournamentTeeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeTournamentWindSpeedArgs = {
  input: ChangeTournamentWindSpeedInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserBirthDateArgs = {
  input: ChangeUserBirthDateInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserCategoryArgs = {
  input: ChangeUserCategoryInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserEmailArgs = {
  input: ChangeUserEmailInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserFirstNameArgs = {
  input: ChangeUserFirstNameInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserGenderArgs = {
  input: ChangeUserGenderInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserLastNameArgs = {
  input: ChangeUserLastNameInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserNationalityArgs = {
  input: ChangeUserNationalityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserOutdoorHandicapArgs = {
  input: ChangeUserOutdoorHandicapInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserPasswordArgs = {
  input: ChangeUserPasswordInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserPlayerNameArgs = {
  input: ChangeUserPlayerNameInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationChangeUserSearchabilityArgs = {
  input: ChangeUserSearchabilityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateClubArgs = {
  input: CreateClubInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateClubsArgs = {
  input: CreateClubsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateFacilityArgs = {
  address: AddressInput;
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  emergencyPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  shopPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<LocationUrlTags>>>;
  urls?: InputMaybe<Array<InputMaybe<UrlInput>>>;
  worldLocation?: InputMaybe<LatLonInputType>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateOAuthClientApplicationArgs = {
  input?: InputMaybe<CreateOAuthClientApplicationInput>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateServiceAccountArgs = {
  input?: InputMaybe<CreateServiceAccountInput>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateTeamsArgs = {
  input: CreateTeamsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationCreateTournamentArgs = {
  input: CreateTournamentInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeclineTeamArgs = {
  input: DeclineTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDecreaseNumericUserPropertyValueArgs = {
  input: DecreaseNumericUserPropertyValueInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeleteClubsArgs = {
  input: DeleteClubsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeleteTeamsArgs = {
  input: DeleteTeamsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeleteUserProfileDataArgs = {
  input: DeleteUserProfileDataInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeselectAllBaysForAllTournamentLocationsArgs = {
  input: DeselectAllBaysForAllTournamentLocationsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeselectAllBaysForTournamentLocationsArgs = {
  input: DeselectAllBaysForTournamentLocationsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDeselectBaysForTournamentArgs = {
  input: DeselectBaysForTournamentInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisablePuttPuttTournamentTieBreakerArgs = {
  input: DisablePuttPuttTournamentTieBreakerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableRangeBaysArgs = {
  input: DisableRangeBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableRangeLaunchAreasArgs = {
  input: DisableRangeLaunchAreasInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableRangeNetsArgs = {
  input: DisableRangeNetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableRangeRadarsArgs = {
  input: DisableRangeRadarsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableRangeTargetsArgs = {
  input: DisableRangeTargetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableSeasonPuttPuttActivityAllowTieBreakerArgs = {
  input: DisableSeasonPuttPuttActivityAllowTieBreakerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableSeasonShuffleBullsEyeActivityAllowPuttingModeArgs = {
  input: DisableSeasonShuffleBullsEyeActivityAllowPuttingModeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableShuffleBullsEyeTournamentAllowPuttingModeArgs = {
  input: DisableShuffleBullsEyeTournamentAllowPuttingModeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableTournamentPartnerConsentsFeatureArgs = {
  input: DisableTournamentPartnerConsentsFeatureInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisableTournamentPayPerEntryArgs = {
  input: DisableTournamentPayPerEntryInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDiscardRangeConfigurationDraftsArgs = {
  input: DiscardRangeConfigurationDraftsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisqualifyTeamArgs = {
  input: DisqualifyTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDisqualifyTeamMemberArgs = {
  input: DisqualifyTeamMemberInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDomainArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationDuplicateInfoScreenArgs = {
  input: DuplicateInfoScreenInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnablePuttPuttTournamentTieBreakerArgs = {
  input: EnablePuttPuttTournamentTieBreakerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableRangeBaysArgs = {
  input: EnableRangeBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableRangeLaunchAreasArgs = {
  input: EnableRangeLaunchAreasInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableRangeNetsArgs = {
  input: EnableRangeNetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableRangeRadarsArgs = {
  input: EnableRangeRadarsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableRangeTargetsArgs = {
  input: EnableRangeTargetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableSeasonPuttPuttActivityAllowTieBreakerArgs = {
  input: EnableSeasonPuttPuttActivityAllowTieBreakerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableSeasonShuffleBullsEyeActivityAllowPuttingModeArgs = {
  input: EnableSeasonShuffleBullsEyeActivityAllowPuttingModeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableShuffleBullsEyeTournamentAllowPuttingModeArgs = {
  input: EnableShuffleBullsEyeTournamentAllowPuttingModeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableTournamentPartnerConsentsFeatureArgs = {
  input: EnableTournamentPartnerConsentsFeatureInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEnableTournamentPayPerEntryArgs = {
  input: EnableTournamentPayPerEntryInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationEndBaysSessionArgs = {
  input: EndBaysSessionInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationExecuteQueuedCommandsArgs = {
  input: ExecuteQueuedCommandsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationFacilityArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationHideScorecardActivityArgs = {
  playerIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scorecardId: Scalars['String']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationIncreaseNumericUserPropertyValueArgs = {
  input: IncreaseNumericUserPropertyValueInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationInfoScreenArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationInfoScreenPageArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationInfoScreenPageItemArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationLeagueArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationLeagueSeasonArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationLeaveTeamArgs = {
  input: LeaveTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationLocationArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationLockBaysArgs = {
  input: LockBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationPartnerArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationProvisionIndoorSiteServerArgs = {
  input: ProvisionIndoorSiteServerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationPublishRangeConfigurationArgs = {
  input: PublishRangeConfigurationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationReJoinTeamArgs = {
  input: ReJoinTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationReJoinTeamMemberArgs = {
  input: ReJoinTeamMemberInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRegisterDeviceNotificationArgs = {
  input: RegisterDeviceNotificationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRegisterIndoorSiteServerArgs = {
  input: RegisterIndoorSiteServerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveCoachFromFacilityArgs = {
  input: RemoveCoachFromFacilityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveFacilityConsentsArgs = {
  input: RemoveFacilityConsentsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveFacilityPartnerArgs = {
  input: RemoveFacilityPartnerInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveFindMyDistanceShotArgs = {
  input: RemoveFindMyDistanceShotInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveMembershipArgs = {
  input: RemoveMembershipInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveOAuthClientApplicationArgs = {
  input?: InputMaybe<RemoveOAuthClientApplicationInput>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemovePartnerConsentLocalizationsArgs = {
  input: RemovePartnerConsentLocalizationsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveQueuedCommandArgs = {
  input: RemoveQueuedCommandInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveRangeBaysArgs = {
  input: RemoveRangeBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveRangeLaunchAreasArgs = {
  input: RemoveRangeLaunchAreasInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveRangeNetsArgs = {
  input: RemoveRangeNetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveRangeRadarArgs = {
  input: RemoveRangeRadarInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveRangeSectionsArgs = {
  input: RemoveRangeSectionsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveRangeTargetsArgs = {
  input: RemoveRangeTargetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveTeamArgs = {
  input: RemoveTeamInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveTeamMemberArgs = {
  input: RemoveTeamMemberInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRemoveTournamentPartnersArgs = {
  input: RemoveTournamentPartnersInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationResetOAuthClientApplicationSecretArgs = {
  input?: InputMaybe<ResetOAuthClientApplicationSecretInput>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevertRangeBaysArgs = {
  input: RevertRangeBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevertRangeConfigurationArgs = {
  input: RevertRangeConfigurationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevertRangeLaunchAreasArgs = {
  input: RevertRangeLaunchAreasInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevertRangeNetsArgs = {
  input: RevertRangeNetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevertRangeRadarsArgs = {
  input: RevertRangeRadarsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevertRangeTargetsArgs = {
  input: RevertRangeTargetsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationRevokeConsentArgs = {
  input: RevokeConsentInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSeasonActivityArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSelectAllBaysForAllTournamentLocationsArgs = {
  input: SelectAllBaysForAllTournamentLocationsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSelectAllBaysForTournamentLocationsArgs = {
  input: SelectAllBaysForTournamentLocationsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSelectBaysForTournamentArgs = {
  input: SelectBaysForTournamentInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSendAppScriptToBayArgs = {
  input: SendAppScriptToBayInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSendMeNotificationArgs = {
  input: SendMeNotificationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSendMessageToBaysArgs = {
  input: SendMessageToBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSendUserPhoneNumberConfirmationArgs = {
  input: SendUserPhoneNumberConfirmationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetBaysApplicationPropertiesArgs = {
  input: SetBaysApplicationPropertiesInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetNetNotificationConfigurationArgs = {
  input: SetNetNotificationConfigurationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetNumericUserPropertyMaxValueArgs = {
  input: SetNumericUserPropertyMaxValueInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetNumericUserPropertyMinValueArgs = {
  input: SetNumericUserPropertyMinValueInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetOriginPointArgs = {
  input: SetOriginPointInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetReferencePointArgs = {
  input: SetReferencePointInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSetUserPropertiesArgs = {
  input: SetUserPropertiesInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationShareUserPlayedRoundsArgs = {
  input: ShareUserPlayedRoundsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationShowUserEmailArgs = {
  input: ShowUserEmailInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationShowUserFullNameForFriendsArgs = {
  input: ShowUserFullNameForFriendsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationShowUserFullNameForTournamentsArgs = {
  input: ShowUserFullNameForTournamentsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationShowUserPictureArgs = {
  input: ShowUserPictureInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSponsorArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSponsorCampaignArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSponsorCampaignV2Args = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationSwapClubsArgs = {
  input: SwapClubsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationTournamentArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUnRegisterDeviceNotificationArgs = {
  input: UnRegisterDeviceNotificationInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUnlockBaysArgs = {
  input: UnlockBaysInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateClubArgs = {
  input: UpdateClubInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateCoachProfileArgs = {
  input: UpdateCoachProfileInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateFindMyDistanceShotsArgs = {
  input: UpdateFindMyDistanceShotsInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateKeyAccountPriorityArgs = {
  input: UpdateKeyAccountPriorityInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateLabelArgs = {
  input: UpdateLabelInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateLocationPinCodeArgs = {
  input: UpdateLocationPinCodeInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateMembershipArgs = {
  input: UpdateMembershipInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateOAuthClientApplicationArgs = {
  input?: InputMaybe<UpdateOAuthClientApplicationInput>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRadarCameraStatusArgs = {
  input: UpdateRadarCameraStatusInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRadarGpsRtkStatusArgs = {
  input: UpdateRadarGpsRtkStatusInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRangeBayArgs = {
  input: UpdateRangeBayInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRangeLaunchAreaArgs = {
  input: UpdateRangeLaunchAreaInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRangeNetArgs = {
  input: UpdateRangeNetInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRangeRadarArgs = {
  input: UpdateRangeRadarInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRangeSectionArgs = {
  input: UpdateRangeSectionInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateRangeTargetArgs = {
  input: UpdateRangeTargetInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateUserPhoneNumberArgs = {
  input: UpdateUserPhoneNumberInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


/** GraphQL api that expose all TrackMan Golf data */
export type MutationUploadLogsFromBaysArgs = {
  input: UploadLogsFromBaysInput;
};

export type Net = Node & {
  __typename?: 'Net';
  dbId?: Maybe<Scalars['String']['output']>;
  /** Description of the net */
  description?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicate whether this data is enabled or not */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate whether this data is valid or not */
  isValid?: Maybe<Scalars['Boolean']['output']>;
  /** The location the net is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the net */
  name?: Maybe<Scalars['String']['output']>;
  /** The poles of the net */
  poles?: Maybe<Array<Maybe<NetPole>>>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
  /** Returns version information about the draft and published version of the net */
  versionInfo: NetVersionInfoType;
};

/** Indicate type of alert */
export enum NetAlertType {
  Block = 'BLOCK',
  None = 'NONE',
  PleaseBeCareful = 'PLEASE_BE_CAREFUL',
  StaffHasBeenNotified = 'STAFF_HAS_BEEN_NOTIFIED'
}

export type NetConfigurationInvalidError = BaseError & {
  __typename?: 'NetConfigurationInvalidError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type NetFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify whether to returned enabled, disabled or all launch areas regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the launch area. If unspecified, only published launch areas will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by Site Id */
  siteId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Represents a safety border net incident */
export type NetIncident = Node & {
  __typename?: 'NetIncident';
  /** Activity Id of the net incident */
  activityId?: Maybe<Scalars['String']['output']>;
  /** The bay information of the net incident */
  bay?: Maybe<NetIncidentBay>;
  /** The duration from the ball was struck till it crossed the border */
  crossingTime?: Maybe<Scalars['Float']['output']>;
  /** The X point that the ball cross the border */
  crossingX?: Maybe<Scalars['Float']['output']>;
  /** The Z point that the ball cross the border */
  crossingZ?: Maybe<Scalars['Float']['output']>;
  /** Database identifier of the net incident */
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The location where the ball landed */
  landingLocation?: Maybe<SiteLocationModel>;
  /** The location the net incident originated from */
  location?: Maybe<LocationInterfaceType>;
  /** Details of the border */
  net?: Maybe<Net>;
  /** The height of the ball at the crossing point */
  netHeightAtCrossing?: Maybe<Scalars['Float']['output']>;
  /** Number of related net incidents */
  numberOfIncidents?: Maybe<Scalars['Int']['output']>;
  /** The id of the related net incidents */
  otherNetIncidentIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The related net incidents */
  otherNetIncidents?: Maybe<Array<Maybe<NetIncident>>>;
  /** The player who shoots the ball out of the border */
  player?: Maybe<TrackerMessagePlayer>;
  /** One of the poles where the ball crossed the safety border */
  pole1?: Maybe<NetPole>;
  /** One of the poles where the ball crossed the safety border */
  pole2?: Maybe<NetPole>;
  /** Id of the session in which the net incident took place */
  sessionId?: Maybe<Scalars['String']['output']>;
  /** The site the net incident originated from */
  site: RangeSite;
  /** The ID of the site the net incident originated from */
  siteId: Scalars['ID']['output'];
  /** The height of the stroke at the crossing point */
  strokeHeightAtCrossing?: Maybe<Scalars['Float']['output']>;
  /** Id of the stroke in which the net incident took place */
  strokeId?: Maybe<Scalars['String']['output']>;
  /** The location of the tee */
  teeLocation?: Maybe<SiteLocationModel>;
  /** Time the net incident */
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** The information of the bay in net incident */
export type NetIncidentBay = {
  __typename?: 'NetIncidentBay';
  /** The Id of the bay */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The location of the bay */
  location?: Maybe<SiteLocationModel>;
  /** The name of the bay */
  name?: Maybe<Scalars['String']['output']>;
  /** The type of the bay */
  type?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type NetIncidentTypeCollectionSegment = {
  __typename?: 'NetIncidentTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<NetIncident>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type NetNotificationConfiguration = {
  __typename?: 'NetNotificationConfiguration';
  dbId?: Maybe<Scalars['String']['output']>;
  rules?: Maybe<Array<Maybe<NetNotificationRule>>>;
};

export type NetNotificationConfigurationInput = {
  /** The rules of the configuration */
  rules: Array<InputMaybe<StaffNotifications>>;
};

export type NetNotificationDefaultMessages = {
  __typename?: 'NetNotificationDefaultMessages';
  alertType: NetAlertType;
  message?: Maybe<Scalars['String']['output']>;
};

export type NetNotificationRule = {
  __typename?: 'NetNotificationRule';
  appNotification: NetAlertType;
  appNotificationMessage?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  kioskAppNotification?: Maybe<NetAlertType>;
  kioskAppNotificationMessage?: Maybe<Scalars['String']['output']>;
  staffNotifications?: Maybe<Array<Maybe<StaffNotification>>>;
  triggerBall?: Maybe<Scalars['Int']['output']>;
};

export type NetNotificationType = {
  __typename?: 'NetNotificationType';
  configurations?: Maybe<NetNotificationConfiguration>;
  defaultMessages?: Maybe<Array<Maybe<NetNotificationDefaultMessages>>>;
  pinCode?: Maybe<Scalars['String']['output']>;
};

export type NetPole = {
  __typename?: 'NetPole';
  /** The height of the net pole */
  height?: Maybe<Scalars['Float']['output']>;
  /** Indicate whether this data is valid or not */
  isValid?: Maybe<Scalars['Boolean']['output']>;
  /** X,Y,Z position based on the site coordinate system */
  sitePoint?: Maybe<Array<Maybe<Point3D>>>;
  /** The location based on the world latitude and longitude */
  worldPoint?: Maybe<LatLonAlt>;
};

export type NetPoleInput = {
  height: Scalars['Float']['input'];
  worldPoint: WorldCoord;
};

/** Sort options for searching range nets */
export type NetSortInput = {
  name?: InputMaybe<SortEnumType>;
  version?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type NetTypeCollectionSegment = {
  __typename?: 'NetTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Net>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type NetVersionFilter = {
  /** Specify whether to returned enabled, disabled or all launch areas regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the launch area. If unspecified, only published launch areas will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Version information for a Driving Range net */
export type NetVersionInfoType = EntityVersionInfo & {
  __typename?: 'NetVersionInfoType';
  /** Returns the current draft version of the Net if one exists */
  draftVersion?: Maybe<Net>;
  /** Indicates whether a draft version has been marked for delete on the next publish */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** The timestamp of this version's publication date */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Returns the latest published version of the Net if one exists */
  publishedVersion?: Maybe<Net>;
  /** Indicates whether this is a published or draft version of an entity */
  state: PublishState;
  /** The version of the entity */
  version: Scalars['String']['output'];
  /** The other versions of the net */
  versions?: Maybe<NetTypeCollectionSegment>;
};


/** Version information for a Driving Range net */
export type NetVersionInfoTypeVersionsArgs = {
  filter?: InputMaybe<NetVersionFilter>;
  order?: InputMaybe<Array<NetSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type NoRemainingSlotsError = BaseError & {
  __typename?: 'NoRemainingSlotsError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type NoSignupError = BaseError & {
  __typename?: 'NoSignupError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type NoTeamChangeError = BaseError & {
  __typename?: 'NoTeamChangeError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
};

export type NotSupportedError = BaseError & {
  __typename?: 'NotSupportedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type NoteActivity = Node & PlayerActivity & {
  __typename?: 'NoteActivity';
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  note?: Maybe<Scalars['String']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type NothingToPublishError = BaseError & {
  __typename?: 'NothingToPublishError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type NotificationMutations = {
  __typename?: 'NotificationMutations';
  /**
   * Broadcast a notification to a set of devices
   * @deprecated Use `broadcastDeviceNotifications` instead
   */
  broadcastNotification?: Maybe<BroadcastNotificationStatus>;
  /**
   * Register a device for receiving notifications
   * @deprecated Use `registerDeviceNotification` instead
   */
  register?: Maybe<Device>;
  /**
   * Publish a notification to a set of devices
   * @deprecated Use `sendMeNotification` instead
   */
  sendNotification?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Un-register a device from receiving notifications
   * @deprecated Use `unRegisterDeviceNotification` instead
   */
  unRegister?: Maybe<Device>;
};


export type NotificationMutationsBroadcastNotificationArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  continentCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  data?: InputMaybe<Scalars['Any']['input']>;
  emails?: InputMaybe<Array<Scalars['EmailAddress']['input']>>;
  lang?: InputMaybe<Scalars['String']['input']>;
  leagueIds?: InputMaybe<Array<Scalars['String']['input']>>;
  promotionUrl?: InputMaybe<Scalars['String']['input']>;
  regionCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  tournamentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type NotificationMutationsRegisterArgs = {
  appName: Scalars['String']['input'];
  appVersion: Scalars['String']['input'];
  deviceId: Scalars['String']['input'];
  language: Scalars['String']['input'];
  platform: DevicePlatformEnum;
  tokenId: Scalars['String']['input'];
};


export type NotificationMutationsSendNotificationArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['Any']['input']>;
  messageKey?: InputMaybe<Scalars['String']['input']>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type NotificationMutationsUnRegisterArgs = {
  deviceId: Scalars['String']['input'];
};

export type NumericValueOutOfRangeError = BaseError & {
  __typename?: 'NumericValueOutOfRangeError';
  code?: Maybe<Scalars['String']['output']>;
  fieldName?: Maybe<Scalars['String']['output']>;
  maxValue: Scalars['Float']['output'];
  message?: Maybe<Scalars['String']['output']>;
  minValue: Scalars['Float']['output'];
  value: Scalars['Float']['output'];
};

export type NumericValueShouldBePositiveOrZeroError = BaseError & {
  __typename?: 'NumericValueShouldBePositiveOrZeroError';
  code?: Maybe<Scalars['String']['output']>;
  fieldName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  value: Scalars['Float']['output'];
};

/** Opening hours for the facility */
export type OpeningHours = {
  __typename?: 'OpeningHours';
  /** Information about the maintenance hours for the facility */
  maintenanceHours?: Maybe<MaintenanceHours>;
};

export type OpeningHoursInput = {
  maintenanceHours?: InputMaybe<MaintenanceHoursInput>;
};

export type OrderOfMeritLeaderboardScore = {
  __typename?: 'OrderOfMeritLeaderboardScore';
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  score: Scalars['Float']['output'];
};

/** Method used to distribute order of merit points */
export enum OrderOfMeritMaxScoreMethod {
  /** Max score is selected by the tournament admin/manager */
  Custom = 'CUSTOM',
  /** Max points is based on the number of players */
  Default = 'DEFAULT',
  /** Add a percentage to the max score calculated from the number of players */
  Percentage = 'PERCENTAGE'
}

export type OrderOfMeritScoring = {
  __typename?: 'OrderOfMeritScoring';
  /** Method used to distribute points. The default methods is based on the number of players entering the tournament */
  ScoreMethod?: Maybe<OrderOfMeritMaxScoreMethod>;
  /** The max. number of points a player can get in this round. The number will be calculated after the first round ends. */
  maxScore?: Maybe<Scalars['Int']['output']>;
  /** A value of 10 will increase the max points a player can get by 10% compared to the default max score. */
  percentageModifier?: Maybe<Scalars['Int']['output']>;
};

/** The tournament description */
export type OrderOfMeritTournament = CourseTournament & KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'OrderOfMeritTournament';
  /** The aggregated leaderboard for in-round closest to the pin games */
  aggregatedClosestToPinLeaderboard?: Maybe<AggregatedClosestToPinLeaderboard>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Closest To Pin game */
  closestToPinEmbeddedGameLeaderboard?: Maybe<ClosestToPin>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The duration (time length) of the tournament */
  duration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The leaderboard for the in-round game */
  embeddedGameLeaderboard?: Maybe<EmbeddedGameLeaderboardUnion>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /**
   * The game summary leaderboard for birdie streak, GIR streak etc.
   * @deprecated Use otherLeaderboards instead. This field will be removed in the future.
   */
  gameSummaryLeaderboard?: Maybe<GameSummaryLeaderboardRecordTypeCollectionSegment>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Tournament has overlapping rounds */
  hasOverlappingRounds?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<Leaderboard>;
  links?: Maybe<Array<LinkKeyValue>>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Longest Drive game */
  longestDriveEmbeddedGameLeaderboard?: Maybe<LongestDrive>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** Number of rounds */
  numberOfRounds?: Maybe<Scalars['PositiveInt']['output']>;
  oomPointsDistributionTable?: Maybe<DistributionTable>;
  /** Optional leaderboard scoring formats */
  optionalScoringFormats?: Maybe<Array<Maybe<GameTypes>>>;
  /** Other side-bed leaderboards like birdie streak, GIR streak etc. */
  otherLeaderboards?: Maybe<OtherLeaderboards>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** A tournament round */
  round?: Maybe<TournamentRound>;
  /** The leaderboard for the round */
  roundLeaderboard?: Maybe<RoundLeaderboard>;
  /** The tournament rounds */
  rounds?: Maybe<Array<TournamentRound>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type OrderOfMeritTournamentAggregatedClosestToPinLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentClosestToPinEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentGameSummaryLeaderboardArgs = {
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  kind?: InputMaybe<GameSummaryKinds>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};


/** The tournament description */
export type OrderOfMeritTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type OrderOfMeritTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type OrderOfMeritTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type OrderOfMeritTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentLongestDriveEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentOomPointsDistributionTableArgs = {
  numberOfParticipants?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The tournament description */
export type OrderOfMeritTournamentOtherLeaderboardsArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  kind: OtherLeaderboardsKind;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
};


/** The tournament description */
export type OrderOfMeritTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type OrderOfMeritTournamentRoundArgs = {
  roundId?: InputMaybe<Scalars['ID']['input']>;
  roundNumber?: InputMaybe<Scalars['Int']['input']>;
};


/** The tournament description */
export type OrderOfMeritTournamentRoundLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type OrderOfMeritTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type OrderOfMeritTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type OtherLeaderboards = {
  __typename?: 'OtherLeaderboards';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  records?: Maybe<OtherLeaderboardsRecordTypeCollectionSegment>;
  roundId?: Maybe<Scalars['String']['output']>;
  scoringFormat?: Maybe<GameTypes>;
  summaryKind?: Maybe<GameSummaryKinds>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type OtherLeaderboardsRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum OtherLeaderboardsKind {
  Birdies = 'BIRDIES',
  BirdieStreak = 'BIRDIE_STREAK',
  GreensInRegulation = 'GREENS_IN_REGULATION'
}

export type OtherLeaderboardsRecord = {
  __typename?: 'OtherLeaderboardsRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  /** The result */
  result?: Maybe<OtherLeaderboardsTotalScore>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
};

/** A segment of a collection. */
export type OtherLeaderboardsRecordTypeCollectionSegment = {
  __typename?: 'OtherLeaderboardsRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<OtherLeaderboardsRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type OtherLeaderboardsTotalScore = {
  __typename?: 'OtherLeaderboardsTotalScore';
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  scorecard?: Maybe<Scorecard>;
  scorecardDbId?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['ID']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
};

export type OutsideTeeArea = {
  __typename?: 'OutsideTeeArea';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  optimalTeeArea?: Maybe<Array<Maybe<Array<Scalars['Float']['output']>>>>;
};

export type PaidEventFlag = {
  __typename?: 'PaidEventFlag';
  /** Flag description */
  description?: Maybe<Scalars['String']['output']>;
  /** The id of the flag */
  id?: Maybe<Scalars['Int']['output']>;
  /** The name of the flag */
  name?: Maybe<Scalars['String']['output']>;
  /** The type of the flag */
  type?: Maybe<Scalars['String']['output']>;
};

export type ParticipantGroup = {
  __typename?: 'ParticipantGroup';
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The criteria for being part of the participant group */
  criteria?: Maybe<Array<Maybe<ParticipationCriteria>>>;
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The description of the participant group */
  description?: Maybe<Scalars['String']['output']>;
  /** The graphql id of the participant group */
  id?: Maybe<Scalars['String']['output']>;
  /** The name of the participant group */
  name?: Maybe<Scalars['String']['output']>;
  /** Validation information for the current player wrt. the criteria for this group */
  playerMeetAllCriteria?: Maybe<Scalars['Boolean']['output']>;
};

export type ParticipationCriteria = {
  /** The name of the criteria */
  name?: Maybe<Scalars['String']['output']>;
  /** The validation message when given value is tested against the criteria */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

export type Partner = {
  __typename?: 'Partner';
  /** The consent list of the partner */
  consents?: Maybe<Array<ConsentInterfaceType>>;
  /** The id of the partner */
  dbId?: Maybe<Scalars['ID']['output']>;
  /** The id of the partner */
  id?: Maybe<Scalars['ID']['output']>;
  /** The url of the partner info */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** The unique key of the partner */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  kind?: Maybe<PartnerKind>;
  /** The url of the partner logo */
  logoUrl?: Maybe<Scalars['URL']['output']>;
  /** The name of the partner */
  name?: Maybe<Scalars['NonEmptyString']['output']>;
};

export type PartnerConsent = ConsentInterfaceType & {
  __typename?: 'PartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type PartnerConsentDeleteInput = {
  /** The kind of the consent */
  kind?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** The version of the consent */
  version?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerConsentDeleteLocalizationInput = {
  /** The country code */
  cultureCode?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** The kind of the consent */
  kind?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** The version of the consent */
  version?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerConsentInput = {
  /** The description of the consent */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The info url of the consent */
  infoUrl?: InputMaybe<Scalars['URL']['input']>;
  /** Mark the consent as mandatory */
  isMandatory?: InputMaybe<Scalars['Boolean']['input']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: InputMaybe<Scalars['Boolean']['input']>;
  /** Default value of the consent */
  isSelectedByDefault?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  /** The kind of the consent */
  kind?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** The localization */
  localization?: InputMaybe<Array<PartnerConsentLocalizedInput>>;
  /** Minimum value is used for the Age consent */
  minimumValue?: InputMaybe<Scalars['Float']['input']>;
  /** The title of the consent */
  title?: InputMaybe<Scalars['String']['input']>;
  /** The version of the consent */
  version?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerConsentLocalized = PartnerConsentLocalizedIterfaceType & {
  __typename?: 'PartnerConsentLocalized';
  /** The country code */
  cultureCode?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The key of the partner's consent */
  infoUrl?: Maybe<Scalars['String']['output']>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
};

export type PartnerConsentLocalizedInput = {
  /** The country code */
  cultureCode?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** The description of the consent */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The key of the partner's consent */
  infoUrl?: InputMaybe<Scalars['String']['input']>;
  /** The title of the consent */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerConsentLocalizedIterfaceType = {
  /** The country code */
  cultureCode?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The key of the partner's consent */
  infoUrl?: Maybe<Scalars['String']['output']>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
};

export enum PartnerKind {
  Facility = 'FACILITY',
  Tournament = 'TOURNAMENT'
}

/** Mutations on a partner */
export type PartnerMutations = {
  __typename?: 'PartnerMutations';
  /**
   * Add consents to the partner
   * @deprecated Try to use `addFacilityConsents` mutation instead
   */
  addConsents?: Maybe<Partner>;
  /**
   * Delete existing partner
   * @deprecated Try to use `removeFacilityPartner` mutation instead
   */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Add consents to the partner
   * @deprecated Try to use `removePartnerConsentLocalizations` mutation instead
   */
  deleteConsentLocalizations?: Maybe<Partner>;
  /**
   * Add consents to the partner
   * @deprecated Try to use `removeFacilityConsents` mutation instead
   */
  deleteConsents?: Maybe<Partner>;
};


/** Mutations on a partner */
export type PartnerMutationsAddConsentsArgs = {
  consents?: InputMaybe<Array<InputMaybe<PartnerConsentInput>>>;
};


/** Mutations on a partner */
export type PartnerMutationsDeleteConsentLocalizationsArgs = {
  consents?: InputMaybe<Array<InputMaybe<PartnerConsentDeleteLocalizationInput>>>;
};


/** Mutations on a partner */
export type PartnerMutationsDeleteConsentsArgs = {
  consents?: InputMaybe<Array<InputMaybe<PartnerConsentDeleteInput>>>;
};

export type PaymentInformation = {
  __typename?: 'PaymentInformation';
  /** The location for the payment */
  location?: Maybe<Location>;
};

/** Mutations on a Payments */
export type PaymentMutationInterface = {
  /** change the payment configuration of a location */
  changeLocationPaymentConfiguration?: Maybe<Tournament>;
  /** Change the max participants of the location config */
  changeMaxParticipants?: Maybe<Tournament>;
  /** change the end time of the sign up */
  changeSignUpEndTime?: Maybe<Tournament>;
  /** change the start time of the sign up */
  changeSignUpStartTime?: Maybe<Tournament>;
  /** Disable payment. Please note that the existing payment configuration will be deleted. */
  disablePayment?: Maybe<Tournament>;
  /** Enable payment. Payment needs to be configured for each location where the tournament is available. */
  enablePayment?: Maybe<Tournament>;
};


/** Mutations on a Payments */
export type PaymentMutationInterfaceChangeLocationPaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Payments */
export type PaymentMutationInterfaceChangeMaxParticipantsArgs = {
  locationId: Scalars['ID']['input'];
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a Payments */
export type PaymentMutationInterfaceChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Payments */
export type PaymentMutationInterfaceChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PaymentMutationsType = {
  __typename?: 'PaymentMutationsType';
  paymentReceived?: Maybe<Scalars['Boolean']['output']>;
};


export type PaymentMutationsTypePaymentReceivedArgs = {
  metaData: Array<InputMaybe<KeyValueInput>>;
  numberOfTickets?: InputMaybe<Scalars['Int']['input']>;
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  userEmail?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type PdfReportActivity = Node & PlayerActivity & {
  __typename?: 'PdfReportActivity';
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  mailId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  reportId?: Maybe<Scalars['String']['output']>;
  reportKind?: Maybe<Scalars['String']['output']>;
  reportPath?: Maybe<Scalars['URL']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type PendingConfigurationDraftError = BaseError & {
  __typename?: 'PendingConfigurationDraftError';
  activeConfigurationId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PerformanceCenterActivity = Node & PlayerActivity & {
  __typename?: 'PerformanceCenterActivity';
  /** Average number of strokes gained */
  averageStrokesGained?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  /** Performance Center report */
  report?: Maybe<PerformanceCenterQuickPlayReport>;
  /** Report id */
  reportId?: Maybe<Scalars['String']['output']>;
  /** Total number of strokes */
  strokeCount?: Maybe<Scalars['Int']['output']>;
  /** Number of targets */
  targetCount?: Maybe<Scalars['Int']['output']>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** Performance Center report type */
  type?: Maybe<Scalars['String']['output']>;
};

export enum PerformanceCenterLies {
  Bushes = 'BUSHES',
  CompactedSand = 'COMPACTED_SAND',
  Concrete = 'CONCRETE',
  Deeprough = 'DEEPROUGH',
  Earth = 'EARTH',
  Fairway = 'FAIRWAY',
  Fringe = 'FRINGE',
  Green = 'GREEN',
  HoleCup = 'HOLE_CUP',
  HoleLip = 'HOLE_LIP',
  Leaves = 'LEAVES',
  Mulch = 'MULCH',
  Pin = 'PIN',
  Pinestraw = 'PINESTRAW',
  Rock = 'ROCK',
  Rough = 'ROUGH',
  Sand = 'SAND',
  Scrub = 'SCRUB',
  Semirough = 'SEMIROUGH',
  Tee = 'TEE',
  Tree = 'TREE',
  Water = 'WATER',
  Wood = 'WOOD'
}

export type PerformanceCenterQuickPlayReport = {
  __typename?: 'PerformanceCenterQuickPlayReport';
  client?: Maybe<ClientType>;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  groups?: Maybe<Array<Maybe<GroupType>>>;
  /** Report Id */
  id?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  lastUpdatedAt: Scalars['DateTime']['output'];
  player?: Maybe<PlayerType>;
  /** Result summary */
  result?: Maybe<QuickPlayResult>;
  /** Targets */
  targets?: Maybe<Array<QuickPlayTarget>>;
  time: Scalars['DateTime']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserType>;
};

export type PerformancePuttingSessionActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'PerformancePuttingSessionActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  sessionId?: Maybe<Scalars['String']['output']>;
  strokeCount: Scalars['Int']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type PerformancePuttingSessionActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PerformancePuttingSessionActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  maxTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  maxTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
};

export type PermissionInfo = {
  __typename?: 'PermissionInfo';
  domain?: Maybe<Scalars['String']['output']>;
  permission?: Maybe<Scalars['String']['output']>;
};

/** Individual player or team */
export enum PersonConnectionKind {
  /** Individual player */
  Individual = 'INDIVIDUAL',
  /** Team player */
  Team = 'TEAM'
}

export type PersonInfo = Node & {
  __typename?: 'PersonInfo';
  /** Account Id of the person */
  accountId?: Maybe<Scalars['String']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** DateOfBirth */
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** First name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Full name */
  fullName?: Maybe<Scalars['String']['output']>;
  /** Gender */
  gender?: Maybe<Gender>;
  /** Return all info about the players TrackMan handicap */
  hcp?: Maybe<Hcp>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Last known location */
  lastLocation?: Maybe<LatLon>;
  /** Last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Picture */
  picture?: Maybe<Scalars['String']['output']>;
  /** Information about this player */
  playerData?: Maybe<PlayerData>;
  /** Player name */
  playerName?: Maybe<Scalars['String']['output']>;
};

export type Persons = {
  __typename?: 'Persons';
  /** Search persons in Person Search service */
  adminSearch?: Maybe<AdminPersonInfoTypeCollectionSegment>;
  /** Search persons */
  advanceSearch?: Maybe<ProfileTypeCollectionSegment>;
  /** Find the person with the corresponding email */
  searchByEmail?: Maybe<Array<Maybe<PersonInfo>>>;
};


export type PersonsAdminSearchArgs = {
  onlyActiveAccounts: Scalars['Boolean']['input'];
  orderBy?: InputMaybe<Array<VisitorOrderBy>>;
  searchBy: Array<SearchByEnum>;
  searchText: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonsAdvanceSearchArgs = {
  byClaimSearchCriterias?: InputMaybe<Array<ClaimSearchCriteria>>;
  byEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  byFirstNames?: InputMaybe<Array<Scalars['String']['input']>>;
  byFullNames?: InputMaybe<Array<Scalars['String']['input']>>;
  byLastNames?: InputMaybe<Array<Scalars['String']['input']>>;
  byPhoneNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  byPlayerNames?: InputMaybe<Array<Scalars['String']['input']>>;
  caseSensitiveMatch?: InputMaybe<Scalars['Boolean']['input']>;
  fullMatch?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonsSearchByEmailArgs = {
  emails: Array<InputMaybe<Scalars['String']['input']>>;
};

export type PhoneNumberIsAlreadyVerifiedError = BaseError & {
  __typename?: 'PhoneNumberIsAlreadyVerifiedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PhoneVerificationCodeAlreadySentError = BaseError & {
  __typename?: 'PhoneVerificationCodeAlreadySentError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  nextAttemptAt: Scalars['DateTime']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export enum Pin {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type PlannedRound = Node & {
  __typename?: 'PlannedRound';
  /** The course */
  course?: Maybe<Course>;
  /** The course identifier of the planned round */
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The default female tee of the planned round */
  defaultFemaleTee?: Maybe<Scalars['String']['output']>;
  /** The default male tee of the planned round */
  defaultMaleTee?: Maybe<Scalars['String']['output']>;
  /** The default tee of the planned round */
  defaultTee?: Maybe<Scalars['String']['output']>;
  /** The description of the planned round */
  description?: Maybe<Scalars['String']['output']>;
  /** The fairway firmness of the planned round */
  fairwayFirmness?: Maybe<Firmness>;
  /** The game type of the planned round */
  gameTypes?: Maybe<GameTypes>;
  /** The gimme distance of the planned round */
  gimmeDistance?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** The green firmness of the planned round */
  greenFirmness?: Maybe<Firmness>;
  /** The green speed firmness of the planned round */
  greenStimp?: Maybe<Stimp>;
  /** The holes to play of the planned round */
  holesToPlay?: Maybe<HolesToPlay>;
  id: Scalars['ID']['output'];
  /** The last time the resource was updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  mulligans?: Maybe<Mulligans>;
  /** The name of the planned round */
  name?: Maybe<Scalars['String']['output']>;
  /** The pin difficulty of the planned round */
  pin?: Maybe<Pin>;
  /** The putting mode of the planned round */
  puttingMode?: Maybe<PuttMode>;
  /** The wind speed of the planned round */
  windSpeed?: Maybe<WindMode>;
};

export type PlannedRoundInput = {
  /** The course identifier of the planned round */
  courseIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** The default female tee of the planned round */
  defaultFemaleTee?: InputMaybe<Scalars['String']['input']>;
  /** The default male tee of the planned round */
  defaultMaleTee?: InputMaybe<Scalars['String']['input']>;
  /** The default tee of the planned round */
  defaultTee?: InputMaybe<Scalars['String']['input']>;
  /** The description of the planned round */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The fairway firmness of the planned round */
  fairwayFirmness?: InputMaybe<Firmness>;
  /** The game type of the planned round */
  gameTypes?: InputMaybe<GameTypes>;
  /** The gimme distance of the planned round */
  gimmeDistance?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  /** The green firmness of the planned round */
  greenFirmness?: InputMaybe<Firmness>;
  /** The green speed firmness of the planned round */
  greenStimp?: InputMaybe<Stimp>;
  /** The holes to play of the planned round */
  holesToPlay?: InputMaybe<HolesToPlay>;
  mulligans?: InputMaybe<Mulligans>;
  /** The name of the planned round */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The pin difficulty of the planned round */
  pin?: InputMaybe<Pin>;
  /** The putting mode of the planned round */
  puttingMode?: InputMaybe<PuttMode>;
  /** The wind speed of the planned round */
  windSpeed?: InputMaybe<WindMode>;
};

export type PlannedRoundPayload = {
  __typename?: 'PlannedRoundPayload';
  plannedRound?: Maybe<PlannedRound>;
};

/** A segment of a collection. */
export type PlannedRoundTypeCollectionSegment = {
  __typename?: 'PlannedRoundTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PlannedRound>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Played round */
export type PlayedWith = {
  __typename?: 'PlayedWith';
  /** Course played for the last round */
  course?: Maybe<Course>;
  /** Is this person your friend */
  friend?: Maybe<Friendship>;
  /** Player who played the round */
  person?: Maybe<PersonInfo>;
  /** Scorecard for last played round */
  scorecard?: Maybe<Scorecard>;
  /** When was the last round played */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type Player = {
  __typename?: 'Player';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type PlayerActivity = {
  /** The activity id */
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  /** The date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type PlayerActivityInterfaceTypeCollectionSegment = {
  __typename?: 'PlayerActivityInterfaceTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PlayerActivity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PlayerActivitySummary = {
  __typename?: 'PlayerActivitySummary';
  /** Number of activities of this kind */
  activityCount?: Maybe<Scalars['Int']['output']>;
  /** The kinds of activities for this player */
  activityKinds?: Maybe<Array<Maybe<ActivityKind>>>;
  /** The last activity of this kind */
  lastActivityTime?: Maybe<Scalars['DateTime']['output']>;
  /** Information about this player */
  player?: Maybe<PersonInfo>;
};

/** A segment of a collection. */
export type PlayerActivitySummaryTypeCollectionSegment = {
  __typename?: 'PlayerActivitySummaryTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PlayerActivitySummary>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum PlayerCategory {
  Amateur = 'AMATEUR',
  Professional = 'PROFESSIONAL',
  Unknown = 'UNKNOWN'
}

export type PlayerCategoryType = {
  __typename?: 'PlayerCategoryType';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Return all personal data on a profile */
export type PlayerData = {
  __typename?: 'PlayerData';
  /** Activities connected to a person */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** Summary for activities */
  activitySummary?: Maybe<ActivitySummaryTypeCollectionSegment>;
  /** Tournaments that´s available for this player. Paged result of tournaments */
  availableTournaments?: Maybe<TournamentInterfaceTypeCollectionSegment>;
  /** Information about equipment connected to a person */
  equipment?: Maybe<AllEquipment>;
  /** My friendships */
  friends?: Maybe<Friendships>;
  /** Return all info abut the players TrackMan handicap */
  hcp?: Maybe<Hcp>;
  /** List of my leagues */
  leagues?: Maybe<LeagueTypeCollectionSegment>;
  /** Return all permissions that is not bound to a facility or location. You have to combine this list with your facility permissions. */
  permissions?: Maybe<Array<PermissionInfo>>;
  /** Paged result for planned rounds */
  plannedRounds?: Maybe<PlannedRoundTypeCollectionSegment>;
  /** List the rounds you've played with someone. */
  playedWith?: Maybe<Array<Maybe<PlayedWith>>>;
  /** List all your scorecards. You can filter and sort the list */
  scorecards?: Maybe<Array<Maybe<Scorecard>>>;
  /** Information about students for a coach */
  students?: Maybe<Students>;
  /** Paged result for tournaments */
  tournaments?: Maybe<TournamentInterfaceTypeCollectionSegment>;
};


/** Return all personal data on a profile */
export type PlayerDataActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataActivitySummaryArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataAvailableTournamentsArgs = {
  list?: InputMaybe<TournamentListKinds>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  take?: InputMaybe<Scalars['Int']['input']>;
  tournamentKinds?: InputMaybe<Array<TournamentTypes>>;
};


/** Return all personal data on a profile */
export type PlayerDataLeaguesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataPermissionsArgs = {
  domains?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  noDomains?: InputMaybe<Scalars['Boolean']['input']>;
  permissionPattern?: InputMaybe<Scalars['String']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataPlannedRoundsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataPlayedWithArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataScorecardsArgs = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  numberOfHolesToPlay?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Return all personal data on a profile */
export type PlayerDataTournamentsArgs = {
  isEvent?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isFeaturedPaid?: InputMaybe<Scalars['Boolean']['input']>;
  isIndoor?: InputMaybe<Scalars['Boolean']['input']>;
  isRange?: InputMaybe<Scalars['Boolean']['input']>;
  isTeamTournament?: InputMaybe<Scalars['Boolean']['input']>;
  list?: InputMaybe<TournamentListKinds>;
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  tournamentKinds?: InputMaybe<Array<TournamentTypes>>;
  withPendingInvitation?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PlayerDexterity {
  LeftHanded = 'LEFT_HANDED',
  RightHanded = 'RIGHT_HANDED',
  Unknown = 'UNKNOWN'
}

export type PlayerGroups = {
  __typename?: 'PlayerGroups';
  /** The group(s) in the tournament that the player belongs to */
  groupIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The graphql id of the player */
  playerId?: Maybe<Scalars['String']['output']>;
  /** true = assigned when the player joined the tournamentfalse = assigned when the player played the first hole in the tournament */
  preliminary?: Maybe<Scalars['Boolean']['output']>;
};

export type PlayerHcpUpdate = {
  __typename?: 'PlayerHcpUpdate';
  /** Exceptional score adjustment */
  exceptionalScoreAdjustment?: Maybe<Scalars['Float']['output']>;
  /** Hcp Cap */
  hcpCap?: Maybe<HcpCap>;
  /** New Hcp */
  hcpNew?: Maybe<Scalars['Float']['output']>;
  /** Old Hcp */
  hcpOld?: Maybe<Scalars['Float']['output']>;
  /** Messages for the current hcp update */
  messages?: Maybe<Scalars['String']['output']>;
  /** DbId of the player */
  playerId?: Maybe<Scalars['String']['output']>;
  /** The date the scorecard was created */
  scorecardCreated?: Maybe<Scalars['DateTime']['output']>;
  /** DbId of the scorecard */
  scorecardId?: Maybe<Scalars['String']['output']>;
};

/** Information about the player */
export type PlayerInfo = {
  __typename?: 'PlayerInfo';
  /** The player course hcp obtained from the course slope and rating */
  courseHcp?: Maybe<Scalars['Float']['output']>;
  /** Database identifier of the player */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The gender of the player */
  gender?: Maybe<Scalars['String']['output']>;
  /** The player hcp index used */
  hcp?: Maybe<Scalars['Float']['output']>;
  /** The id of the player */
  id?: Maybe<Scalars['ID']['output']>;
  /** Was the player add to this round as a ghost player */
  isGhost?: Maybe<Scalars['Boolean']['output']>;
  /** Did the player sign in */
  isGuest?: Maybe<Scalars['Boolean']['output']>;
  /** Is this a team */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The display name for the player */
  name?: Maybe<Scalars['String']['output']>;
  /** The url for the players profile image */
  picture?: Maybe<Scalars['URL']['output']>;
  /** The tee played from */
  tee?: Maybe<Scalars['String']['output']>;
};

export type PlayerType = {
  __typename?: 'PlayerType';
  birthday?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  dexterity?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcp?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<PlayerCategoryType>;
};

export type Point3D = {
  __typename?: 'Point3D';
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

export type PointDistribution = {
  __typename?: 'PointDistribution';
  /** Round name */
  name?: Maybe<Scalars['String']['output']>;
  /** A list of position and projected points for that position */
  points?: Maybe<Array<Maybe<PointInfo>>>;
  /** RoundId */
  roundId?: Maybe<Scalars['ID']['output']>;
};

export type PointInfo = {
  __typename?: 'PointInfo';
  /** Points for that position on the leaderboard */
  points?: Maybe<Scalars['Float']['output']>;
  /** Position on the leaderboard */
  position?: Maybe<Scalars['Int']['output']>;
};

export type Position = {
  __typename?: 'Position';
  imageTransformation?: Maybe<UnityTransformationMetadataPixelPosition>;
  imageTransformationKinds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  worldLocation?: Maybe<LatLon>;
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
  z: Scalars['Float']['output'];
};


export type PositionImageTransformationArgs = {
  forVideos?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
};


export type PositionImageTransformationKindsArgs = {
  forVideos?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PrivacyPolicyPartnerConsent = ConsentInterfaceType & {
  __typename?: 'PrivacyPolicyPartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type Profile = Node & {
  __typename?: 'Profile';
  /** The date of birth for the person */
  birthDate?: Maybe<Scalars['Date']['output']>;
  /** The category of the person */
  category?: Maybe<PlayerCategory>;
  /**
   * The date of birth for the person
   * @deprecated Use birthDate
   */
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /** The dexterity of the person */
  dexterity?: Maybe<PlayerDexterity>;
  /** The email address for the person */
  email?: Maybe<Scalars['String']['output']>;
  /** Email was confirmed by the user */
  emailConfirmed?: Maybe<Scalars['Boolean']['output']>;
  /** The first name of the person */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The full name of the person */
  fullName?: Maybe<Scalars['String']['output']>;
  /** The gender of the person */
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  /** The last name of the person */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The nationality of the person */
  nationality?: Maybe<Scalars['String']['output']>;
  /** The nationality of the person in ISO 3166-1 alpha-2 */
  nationalityCode?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use playerName */
  nickName?: Maybe<Scalars['String']['output']>;
  /** This is NOT your TrackMan handicap but your official outdoor handicap index */
  outdoorHandicap?: Maybe<Scalars['Float']['output']>;
  /** The phone number of the person */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** The uri for this persons profile picture */
  picture?: Maybe<Scalars['URL']['output']>;
  /** Various info about equiptment, handicap,  tournaments, etc connected to the person */
  playerData?: Maybe<PlayerData>;
  /** The alias of the person */
  playerName?: Maybe<Scalars['String']['output']>;
  /** Allow show and search by anyone. default true */
  searchAnyone?: Maybe<Scalars['Boolean']['output']>;
  /** Allow show and search by nobody */
  searchNobody?: Maybe<Scalars['Boolean']['output']>;
  /** Allow show and search by played with */
  searchPlayed?: Maybe<Scalars['Boolean']['output']>;
  /** Allow played rounds to be visible to friends. default true */
  sharePlayedRounds?: Maybe<Scalars['Boolean']['output']>;
  /** Allow show and search by email */
  showEmail?: Maybe<Scalars['Boolean']['output']>;
  /** Allow show and search by fullname for friends */
  showFullNameForFriends?: Maybe<Scalars['Boolean']['output']>;
  /** Allow show fullname for tournaments */
  showFullNameForTournaments?: Maybe<Scalars['Boolean']['output']>;
  /** Allow show picture. default true */
  showPicture?: Maybe<Scalars['Boolean']['output']>;
};

/** Mutations on my Profile */
export type ProfileMutation = {
  __typename?: 'ProfileMutation';
  /**
   * Allow my profile to be seen or searched by either anyone, the players I have played with, or no one
   * @deprecated Try to use the `changeUserSearchability` mutation
   */
  allowSearch?: Maybe<Profile>;
  /**
   * Change my player category
   * @deprecated Try to use the `changeUserCategory` mutation
   */
  changeCategory?: Maybe<Profile>;
  /**
   * Change my date of birth
   * @deprecated Try to use the `changeUserBirthDate` mutation
   */
  changeDateOfBirth?: Maybe<Profile>;
  /**
   * Change my email
   * @deprecated Try to use the `changeUserEmail` mutation
   */
  changeEmail?: Maybe<Profile>;
  /**
   * Change my first name
   * @deprecated Try to use the `changeUserFirstName` mutation
   */
  changeFirstName?: Maybe<Profile>;
  /**
   * Change my gender
   * @deprecated Try to use the `changeUserGender` mutation
   */
  changeGender?: Maybe<Profile>;
  /**
   * Change my last name
   * @deprecated Try to use the `changeUserLastName` mutation
   */
  changeLastName?: Maybe<Profile>;
  /**
   * Change my nationality code
   * @deprecated Try to use the `changeUserNationality` mutation
   */
  changeNationalityCode?: Maybe<Profile>;
  /**
   * Change my official handicap
   * @deprecated Try to use the `changeUserOutdoorHandicap` mutation
   */
  changeOutdoorHandicap?: Maybe<Profile>;
  /**
   * Change my password
   * @deprecated Try to use the `changeUserPassword` mutation
   */
  changePassword?: Maybe<Profile>;
  /**
   * Change my player name
   * @deprecated Try to use the `changeUserPlayerName` mutation
   */
  changePlayerName?: Maybe<Profile>;
  /**
   * Delete a profile and all its data. The deleted data cannot be restored.
   * @deprecated Try to use the `deleteUserProfileData` mutation
   */
  deleteAllProfileData?: Maybe<Profile>;
  /**
   * Send an email to confirm my email
   * @deprecated Try to use the `sendUserEmailConfirmation` mutation
   */
  sendEmailConfirmation?: Maybe<Profile>;
  /**
   * Allow friends to see played rounds. default true
   * @deprecated Try to use the `shareUserPlayedRounds` mutation
   */
  sharePlayedRounds?: Maybe<Profile>;
  /**
   * Allow show email
   * @deprecated Try to use the `showUserEmail` mutation
   */
  showEmail?: Maybe<Profile>;
  /**
   * Allow show fullname for friends
   * @deprecated Try to use the `showUserFullNameForFriends` mutation
   */
  showFullNameForFriends?: Maybe<Profile>;
  /**
   * Allow show fullname for tournaments
   * @deprecated Try to use the `showUserFullNameForTournaments` mutation
   */
  showFullNameForTournaments?: Maybe<Profile>;
  /**
   * Allow show picture. default true
   * @deprecated Try to use the `showUserPicture` mutation
   */
  showPicture?: Maybe<Profile>;
  /**
   * Update all the profile properties in one go
   * @deprecated Try to use the `updateUserProfile` mutation
   */
  update?: Maybe<Profile>;
};


/** Mutations on my Profile */
export type ProfileMutationAllowSearchArgs = {
  for: AllowProfileSearch;
};


/** Mutations on my Profile */
export type ProfileMutationChangeCategoryArgs = {
  category: PlayerCategory;
};


/** Mutations on my Profile */
export type ProfileMutationChangeDateOfBirthArgs = {
  dateOfBirth: Scalars['Date']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangeEmailArgs = {
  email: Scalars['EmailAddress']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangeFirstNameArgs = {
  firstName: Scalars['NonEmptyString']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangeGenderArgs = {
  gender: Gender;
};


/** Mutations on my Profile */
export type ProfileMutationChangeLastNameArgs = {
  lastName: Scalars['NonEmptyString']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangeNationalityCodeArgs = {
  nationalityCode: Scalars['NonEmptyString']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangeOutdoorHandicapArgs = {
  handicap: Scalars['Int']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationChangePlayerNameArgs = {
  playerName: Scalars['NonEmptyString']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationDeleteAllProfileDataArgs = {
  sendEmail?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on my Profile */
export type ProfileMutationSharePlayedRoundsArgs = {
  share: Scalars['Boolean']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationShowEmailArgs = {
  show: Scalars['Boolean']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationShowFullNameForFriendsArgs = {
  show: Scalars['Boolean']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationShowFullNameForTournamentsArgs = {
  show: Scalars['Boolean']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationShowPictureArgs = {
  show: Scalars['Boolean']['input'];
};


/** Mutations on my Profile */
export type ProfileMutationUpdateArgs = {
  category?: InputMaybe<PlayerCategory>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  dexterity?: InputMaybe<PlayerDexterity>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  handicap?: InputMaybe<Scalars['Float']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nationalityCode?: InputMaybe<Scalars['String']['input']>;
  playerName?: InputMaybe<Scalars['String']['input']>;
};

/** A segment of a collection. */
export type ProfileTypeCollectionSegment = {
  __typename?: 'ProfileTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Profile>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type ProvisionIndoorSiteServerError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | SiteServerAlreadyProvisionedError | SiteServerNotDetectedOnLocationError;

export type ProvisionIndoorSiteServerInput = {
  deviceId: Scalars['ID']['input'];
  locationId: Scalars['ID']['input'];
};

export type ProvisionIndoorSiteServerPayload = {
  __typename?: 'ProvisionIndoorSiteServerPayload';
  errors?: Maybe<Array<ProvisionIndoorSiteServerError>>;
  result?: Maybe<IndoorSiteServer>;
};

/** Information about a player profile */
export type PublicProfile = {
  __typename?: 'PublicProfile';
  /** The player's full name */
  fullName?: Maybe<Scalars['String']['output']>;
  /** The uri for the person profile picture */
  picture?: Maybe<Scalars['URL']['output']>;
};

export type PublishRangeConfigurationError = BaseRadarNotSetError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | NothingToPublishError | UnauthorizedError;

export type PublishRangeConfigurationInput = {
  bays?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  launchAreas?: InputMaybe<Array<Scalars['String']['input']>>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  nets?: InputMaybe<Array<Scalars['String']['input']>>;
  originWorldCoordinate?: InputMaybe<WorldCoord>;
  radars?: InputMaybe<Array<Scalars['String']['input']>>;
  referenceWorldCoordinate?: InputMaybe<WorldCoord>;
  siteId?: InputMaybe<Scalars['ID']['input']>;
  targets?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PublishRangeConfigurationPayload = {
  __typename?: 'PublishRangeConfigurationPayload';
  configuration?: Maybe<RangeConfigurationType>;
  errors?: Maybe<Array<PublishRangeConfigurationError>>;
};

export enum PublishState {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum PublishStateFilterType {
  Both = 'BOTH',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type PurchaseInputType = {
  /** The order-id from the app store */
  OrderId?: InputMaybe<Scalars['String']['input']>;
  /** ?? */
  OriginalJson?: InputMaybe<Scalars['String']['input']>;
  /** App store product identifier */
  ProductIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** The validation token from the app store for the purchase */
  PurchaseToken?: InputMaybe<Scalars['String']['input']>;
  /** ?? */
  ReceiptUrl?: InputMaybe<Scalars['String']['input']>;
  /** The app store where the product was purchased */
  Source?: InputMaybe<Scalars['String']['input']>;
  /** The date and time for purchase */
  TransactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Mutations available for purchases */
export type PurchaseMutations = {
  __typename?: 'PurchaseMutations';
  /** Save the purchase and have the backend process the purchase */
  savePurchase?: Maybe<PurchaseResponseType>;
};


/** Mutations available for purchases */
export type PurchaseMutationsSavePurchaseArgs = {
  Purchase: PurchaseInputType;
};

export type PurchaseResponseType = {
  __typename?: 'PurchaseResponseType';
  /** The internal id for the purchase */
  purchaseId?: Maybe<Scalars['String']['output']>;
  /** The internal status for the purchase */
  status?: Maybe<Scalars['String']['output']>;
};

export enum PuttMode {
  Aimed = 'AIMED',
  Auto = 'AUTO',
  AutoFixed = 'AUTO_FIXED',
  AutoHandicap = 'AUTO_HANDICAP',
  AutoTwo = 'AUTO_TWO',
  Manual = 'MANUAL',
  ManualInput = 'MANUAL_INPUT'
}

/** The tournament description */
export type PuttPuttTournament = CourseTournament & KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'PuttPuttTournament';
  /** The aggregated leaderboard for in-round closest to the pin games */
  aggregatedClosestToPinLeaderboard?: Maybe<AggregatedClosestToPinLeaderboard>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Closest To Pin game */
  closestToPinEmbeddedGameLeaderboard?: Maybe<ClosestToPin>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The duration (time length) of the tournament */
  duration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The leaderboard for the in-round game */
  embeddedGameLeaderboard?: Maybe<EmbeddedGameLeaderboardUnion>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /**
   * The game summary leaderboard for birdie streak, GIR streak etc.
   * @deprecated Use otherLeaderboards instead. This field will be removed in the future.
   */
  gameSummaryLeaderboard?: Maybe<GameSummaryLeaderboardRecordTypeCollectionSegment>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Tournament has overlapping rounds */
  hasOverlappingRounds?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if we are going to have tie breaker */
  isTieBreakerEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<Leaderboard>;
  links?: Maybe<Array<LinkKeyValue>>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The leaderboard for the in-round Longest Drive game */
  longestDriveEmbeddedGameLeaderboard?: Maybe<LongestDrive>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** Number of rounds */
  numberOfRounds?: Maybe<Scalars['PositiveInt']['output']>;
  oomPointsDistributionTable?: Maybe<DistributionTable>;
  /** Optional leaderboard scoring formats */
  optionalScoringFormats?: Maybe<Array<Maybe<GameTypes>>>;
  /** Other side-bed leaderboards like birdie streak, GIR streak etc. */
  otherLeaderboards?: Maybe<OtherLeaderboards>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** A tournament round */
  round?: Maybe<TournamentRound>;
  /** The leaderboard for the round */
  roundLeaderboard?: Maybe<RoundLeaderboard>;
  /** The tournament rounds */
  rounds?: Maybe<Array<TournamentRound>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type PuttPuttTournamentAggregatedClosestToPinLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type PuttPuttTournamentClosestToPinEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type PuttPuttTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type PuttPuttTournamentEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type PuttPuttTournamentGameSummaryLeaderboardArgs = {
  fromUtc?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<Gender>;
  kind?: InputMaybe<GameSummaryKinds>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toUtc?: InputMaybe<Scalars['DateTime']['input']>;
};


/** The tournament description */
export type PuttPuttTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type PuttPuttTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type PuttPuttTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type PuttPuttTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type PuttPuttTournamentLongestDriveEmbeddedGameLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber: Scalars['Int']['input'];
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type PuttPuttTournamentOomPointsDistributionTableArgs = {
  numberOfParticipants?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The tournament description */
export type PuttPuttTournamentOtherLeaderboardsArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  kind: OtherLeaderboardsKind;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId?: InputMaybe<Scalars['ID']['input']>;
};


/** The tournament description */
export type PuttPuttTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type PuttPuttTournamentRoundArgs = {
  roundId?: InputMaybe<Scalars['ID']['input']>;
  roundNumber?: InputMaybe<Scalars['Int']['input']>;
};


/** The tournament description */
export type PuttPuttTournamentRoundLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  participantGroupId?: InputMaybe<Scalars['String']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundId: Scalars['ID']['input'];
  scoringFormat?: InputMaybe<GameTypes>;
};


/** The tournament description */
export type PuttPuttTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type PuttPuttTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** Putting options for the game */
export enum PuttingOptions {
  AutoByHandicap = 'AUTO_BY_HANDICAP',
  AutoFixed = 'AUTO_FIXED',
  AutoTourPro = 'AUTO_TOUR_PRO',
  AutoTwoPutt = 'AUTO_TWO_PUTT',
  Manual = 'MANUAL',
  ManualAimed = 'MANUAL_AIMED',
  ManualInput = 'MANUAL_INPUT'
}

/** Putting for the game */
export type PuttingSettings = {
  __typename?: 'PuttingSettings';
  autoGimmie: Scalars['Boolean']['output'];
  fixedPutt: Scalars['Boolean']['output'];
  gimmieDistance: Scalars['Float']['output'];
  isAimed: Scalars['Boolean']['output'];
  isAuto: Scalars['Boolean']['output'];
  isAutoHandicap: Scalars['Boolean']['output'];
  isManual: Scalars['Boolean']['output'];
  isManualInput: Scalars['Boolean']['output'];
  /** The putting options */
  puttingMode?: Maybe<PuttingOptions>;
  twoPutt: Scalars['Boolean']['output'];
};

/** GraphQL api that expose all TrackMan Golf data */
export type Query = {
  __typename?: 'Query';
  adminTools?: Maybe<AdminTools>;
  /** Return application config base on client */
  applicationData?: Maybe<ApplicationDataInterface>;
  /** Return course metadata */
  courses?: Maybe<CourseTypeCollectionSegment>;
  /** Return all domains that the current user/token have access to */
  domains?: Maybe<DomainUserAdminTypeCollectionSegment>;
  /** Equipment related data */
  equipment?: Maybe<EquipmentRootQuery>;
  /** Return all facilities that the current user/token have access to */
  facilities?: Maybe<FacilityTypeCollectionSegment>;
  /**
   * Retrieve the invitations based on arguments
   * @deprecated Use tournament.participants
   */
  invitations?: Maybe<Array<Maybe<Invitation>>>;
  leaderboards?: Maybe<GlobalLeaderboards>;
  /** Return all locations that the current user/token have access to */
  locations?: Maybe<LocationInterfaceTypeCollectionSegment>;
  /** Return all personal data on a profile */
  me?: Maybe<Me>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  /** Person information */
  persons?: Maybe<Persons>;
  publicTools?: Maybe<PublicTools>;
  /** Range related data */
  range?: Maybe<RangeRootQueryType>;
  /** Return system info */
  systemInfo?: Maybe<SystemInfo>;
  /**
   * Retrieve the tournaments based on arguments
   * @deprecated Use PublicTools.getTournamentsByDbId
   */
  tournaments?: Maybe<Array<Maybe<Tournament>>>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryApplicationDataArgs = {
  bayId?: InputMaybe<Scalars['String']['input']>;
  client: ApplicationClients;
  clientVersion?: InputMaybe<Scalars['String']['input']>;
  deviceId?: InputMaybe<Scalars['String']['input']>;
  facilityId?: InputMaybe<Scalars['String']['input']>;
  hardwareType?: InputMaybe<Scalars['String']['input']>;
  language?: Scalars['String']['input'];
  layoutKind?: InputMaybe<Scalars['String']['input']>;
  layoutVersion?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  serialNo?: InputMaybe<Scalars['String']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryCoursesArgs = {
  courseIdentifiers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  updatedSince?: InputMaybe<Scalars['DateTime']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryDomainsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryFacilitiesArgs = {
  includeDeleted?: Scalars['Boolean']['input'];
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<FacilitySortBy>;
  sortDirection?: InputMaybe<SortDirection>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryInvitationsArgs = {
  invitationDbIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryLocationsArgs = {
  countryCode?: InputMaybe<Array<Scalars['String']['input']>>;
  includeDeletedLocations?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleOnLocator?: InputMaybe<Scalars['Boolean']['input']>;
  maxRadius?: InputMaybe<Scalars['Float']['input']>;
  near?: InputMaybe<LatLonInputType>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stateCode?: InputMaybe<Array<Scalars['String']['input']>>;
  take?: InputMaybe<Scalars['Int']['input']>;
  updatedSince?: InputMaybe<Scalars['DateTime']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


/** GraphQL api that expose all TrackMan Golf data */
export type QueryTournamentsArgs = {
  tournamentDbIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Commands queued in order to get diagnostic data from a bay when it's offline */
export type QueuedCommand = {
  __typename?: 'QueuedCommand';
  /** The command type of the queued command */
  command?: Maybe<Scalars['String']['output']>;
  /** When was the command queued */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The id of the queued command */
  id?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The status of the queued command */
  status?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type QueuedCommandsCollectionSegment = {
  __typename?: 'QueuedCommandsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<QueuedCommand>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type QuickPlayResult = {
  __typename?: 'QuickPlayResult';
  /** Average strokes gained */
  averageStrokesGained?: Maybe<Scalars['Float']['output']>;
  /** Total number of strokes */
  strokeCount?: Maybe<Scalars['Int']['output']>;
};

export type QuickPlayStroke = {
  __typename?: 'QuickPlayStroke';
  /** Distance to target */
  distanceToTarget?: Maybe<Scalars['Float']['output']>;
  /** Final lie for this stroke */
  finalLie?: Maybe<PerformanceCenterLies>;
  /** Distance from pin */
  fromPin?: Maybe<Scalars['Float']['output']>;
  /** Length distance from pin */
  fromPinLength?: Maybe<Scalars['Float']['output']>;
  /** Side distance from pin */
  fromPinSide?: Maybe<Scalars['Float']['output']>;
  /** Measurement id */
  measurementId?: Maybe<Scalars['String']['output']>;
  /** Score for this stroke */
  score?: Maybe<Scalars['Float']['output']>;
  /** Stroke sequence number */
  strokeNumber?: Maybe<Scalars['Int']['output']>;
  /** Strokes gained for this stroke */
  strokesGained?: Maybe<Scalars['Float']['output']>;
};

export type QuickPlayTarget = {
  __typename?: 'QuickPlayTarget';
  /** Target definition */
  definition?: Maybe<QuickPlayTargetDefinition>;
  /** Strokes */
  strokes?: Maybe<Array<QuickPlayStroke>>;
};

export type QuickPlayTargetDefinition = {
  __typename?: 'QuickPlayTargetDefinition';
  /** Distance to target */
  distance?: Maybe<Scalars['Float']['output']>;
  /** Minimum distance to target */
  distanceFrom?: Maybe<Scalars['Float']['output']>;
  /** Maximum distance to target */
  distanceTo?: Maybe<Scalars['Float']['output']>;
  /** Green layout */
  greenLayout?: Maybe<Scalars['Int']['output']>;
  /** Target type */
  type?: Maybe<QuickPlayTargetType>;
  /** Unit system */
  unitSystem?: Maybe<UnitSystem>;
};

export enum QuickPlayTargetType {
  Fixed = 'FIXED',
  Interval = 'INTERVAL'
}

/** A radar on a driving range */
export type Radar = Node & {
  __typename?: 'Radar';
  /** It indicates the direction of the radar */
  bearing?: Maybe<Scalars['Float']['output']>;
  /** Information about the radar camera */
  camera?: Maybe<RadarCamera>;
  /** Can confirm */
  canConfirm?: Maybe<Scalars['Boolean']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /** Information about GpsRtk */
  gpsRtk?: Maybe<RadarGpsRtk>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicate whether the Radar is enabled or not */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Is the radar overhead */
  isOverhead: Scalars['Boolean']['output'];
  /** The location the radar is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the Radar */
  name?: Maybe<Scalars['String']['output']>;
  /** It indicates the orientation of the radar. It returns a value only if the logical id of the entity is present in the radars available in the active configuration. */
  orientation?: Maybe<Scalars['Float']['output']>;
  /** Serial number of the Radar */
  serialNumber?: Maybe<Scalars['String']['output']>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
  /** The status of the radar */
  status?: Maybe<RadarStatus>;
  /** It indicates if the Radar is hidden */
  uri?: Maybe<Scalars['String']['output']>;
  /** Returns version information about the draft and published version of the radar */
  versionInfo?: Maybe<RadarVersionInfoType>;
  /** World coordinates of the Radar */
  worldPoint?: Maybe<LatLonAlt>;
};


/** A radar on a driving range */
export type RadarCameraArgs = {
  liveData?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A radar on a driving range */
export type RadarGpsRtkArgs = {
  liveData?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A radar on a driving range */
export type RadarStatusArgs = {
  liveData?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RadarCamera = {
  __typename?: 'RadarCamera';
  /** It indicates if the camera is enabled */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
};

export type RadarFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<VersionIdInput>>>;
  /** Specify whether to returned enabled, disabled or all radars regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the radar. If unspecified, only published radars will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type RadarGpsRtk = {
  __typename?: 'RadarGpsRtk';
  /** It indicates if the GpsRtk is enabled */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** Sort options for searching radars */
export type RadarSortInput = {
  name?: InputMaybe<SortEnumType>;
  version?: InputMaybe<SortEnumType>;
};

export type RadarStatus = {
  __typename?: 'RadarStatus';
  /** It indicates roll */
  roll?: Maybe<Scalars['Float']['output']>;
  /** It indicates tilt */
  tilt?: Maybe<Scalars['Float']['output']>;
};

export type RadarVersionFilter = {
  /** Specify whether to return enabled, disabled or all targets regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the target. If unspecified, only published targets will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Version information for a Driving Range radar */
export type RadarVersionInfoType = EntityVersionInfo & {
  __typename?: 'RadarVersionInfoType';
  /** Returns the current draft version of the Radar if one exists */
  draftVersion?: Maybe<Radar>;
  /** Indicates whether a draft version has been marked for delete on the next publish */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** The timestamp of this version's publication date */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Returns the latest published version of the Radar if one exists */
  publishedVersion?: Maybe<Radar>;
  /** Indicates whether this is a published or draft version of an entity */
  state: PublishState;
  /** The version of the entity */
  version: Scalars['String']['output'];
  /** The other versions of the Radar */
  versions?: Maybe<RadarVersionsCollectionSegment>;
};


/** Version information for a Driving Range radar */
export type RadarVersionInfoTypeVersionsArgs = {
  filter?: InputMaybe<RadarVersionFilter>;
  order?: InputMaybe<Array<RadarSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type RadarVersionsCollectionSegment = {
  __typename?: 'RadarVersionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Radar>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RangeActivityInterface = {
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The activity id */
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** The date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type RangeApplicationData = ApplicationDataInterface & {
  __typename?: 'RangeApplicationData';
  activityLayout?: Maybe<ApplicationLayout>;
  applicationLayout?: Maybe<ApplicationLayout>;
  /** The bay connected to this device */
  bay?: Maybe<RangeBay>;
  client?: Maybe<ApplicationClients>;
  properties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** All downloadable releases */
  releases?: Maybe<ReleasesModel>;
  tournamentLayout?: Maybe<ApplicationLayout>;
};


export type RangeApplicationDataActivityLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
};


export type RangeApplicationDataPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


export type RangeApplicationDataReleasesArgs = {
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type RangeApplicationDataTournamentLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RangeApplicationDataMutations = ApplicationDataMutationInterfaceType & {
  __typename?: 'RangeApplicationDataMutations';
  /** Creates a range bay on the facility with the supplied deviceId */
  createBay?: Maybe<RangeBay>;
};


export type RangeApplicationDataMutationsCreateBayArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

/** A bay on a driving range */
export type RangeBay = BayInterface & Node & {
  __typename?: 'RangeBay';
  /** Returns an active campaign, if any. If multiple are found, it returns the latest one. */
  activeCampaign?: Maybe<SponsorCampaignV2>;
  /** Activity information for this bay */
  activities: BayRangeActivities;
  annotations?: Maybe<Array<KeyValue>>;
  applicationProperties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** Indicates the availability status of the bay */
  availability: BayAvailability;
  /** The numeric bay identifier */
  bayNumber?: Maybe<Scalars['Int']['output']>;
  /** Booking information for this bay */
  bookings: BayBookings;
  dbId?: Maybe<Scalars['String']['output']>;
  /** The bay description */
  description?: Maybe<Scalars['String']['output']>;
  /** The facility that the bay is located in */
  facility?: Maybe<Facility>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicates whether the bay is a dynamic bay */
  isDynamic: Scalars['Boolean']['output'];
  /** Indicates whether the bay is currently part of one of the enabled bay setups */
  isEnabled: Scalars['Boolean']['output'];
  /** Indicates whether the bay is only available in kiosk screens */
  isKioskOnly: Scalars['Boolean']['output'];
  /** Information about the bay if it is locked */
  isLocked: Scalars['Boolean']['output'];
  /** It indicates whether the bay is occupied or not */
  isOccupied?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the bay is currently offline */
  isOffline: Scalars['Boolean']['output'];
  /** Indicate if the bay is an indoor simulator bay or a bay in a driving range */
  kind?: Maybe<BayKind>;
  labels?: Maybe<Array<Maybe<LabelType>>>;
  /** The location the bay is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the bay */
  name?: Maybe<Scalars['String']['output']>;
  /** Safety border net incident information for this bay */
  netIncidents: BayNetIncidents;
  /** The section of the bay */
  section?: Maybe<Section>;
  session?: Maybe<RangeClientSession>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
  /** Strokes information for this bay */
  strokes: BayStrokes;
  /** Returns version information about the draft and published version of the bay */
  versionInfo: RangeBayVersionInfo;
  /** World coordinates of the bay */
  worldPoint?: Maybe<LatLonAlt>;
};


/** A bay on a driving range */
export type RangeBayActiveCampaignArgs = {
  courseIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** A bay on a driving range */
export type RangeBayApplicationPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};

/** Activity information for a Driving Range bay */
export type RangeBayActivity = BayActivityInterface & Node & {
  __typename?: 'RangeBayActivity';
  id: Scalars['ID']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** Safety border net incident information for this activity */
  netIncidents?: Maybe<BayRangeActivityNetIncidents>;
  /** The list of players currently occupying the bay */
  players: Array<Maybe<BayPlayer>>;
  /** The start time of the activity */
  startTime: Scalars['DateTime']['output'];
  /** The list of strokes currently in the ongoing activity */
  strokes: StrokeList;
  /** The activity type */
  type: Scalars['String']['output'];
};

/** Sort options for searching range bays */
export type RangeBaySortInput = {
  bayNumber?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type RangeBaySponsorCampaign = Node & SponsorCampaignV2 & {
  __typename?: 'RangeBaySponsorCampaign';
  active?: Maybe<Scalars['Boolean']['output']>;
  baySponsors?: Maybe<Array<Maybe<RangeBaySponsorType>>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  id: Scalars['ID']['output'];
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  startDate: Scalars['DateTime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SponsorCampaignKinds>;
};

export type RangeBaySponsorCampaignInputType = {
  /** Is the sponsor campaign active */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** The bays where this campaign applies */
  baySponsors?: InputMaybe<Array<InputMaybe<BaySponsorInputTypeType>>>;
  /** The title for the campaign */
  title: Scalars['String']['input'];
};

/** Mutations on a sponsor campaign */
export type RangeBaySponsorCampaignMutation = SponsorCampaignMutationInterfaceType & {
  __typename?: 'RangeBaySponsorCampaignMutation';
  /** Delete sponsor campaign */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Update active state for this sponsor campaign */
  setActive?: Maybe<SponsorCampaignV2>;
  /** Update title for this sponsor campaign */
  setTitle?: Maybe<SponsorCampaignV2>;
  /** Change the campaign */
  update?: Maybe<RangeBaySponsorCampaign>;
};


/** Mutations on a sponsor campaign */
export type RangeBaySponsorCampaignMutationSetActiveArgs = {
  active?: Scalars['Boolean']['input'];
};


/** Mutations on a sponsor campaign */
export type RangeBaySponsorCampaignMutationSetTitleArgs = {
  title?: InputMaybe<Scalars['NonEmptyString']['input']>;
};


/** Mutations on a sponsor campaign */
export type RangeBaySponsorCampaignMutationUpdateArgs = {
  sponsorCampaign: RangeBaySponsorCampaignInputType;
};

/** Get sponsor information for sponsor added to this bay */
export type RangeBaySponsorType = {
  __typename?: 'RangeBaySponsorType';
  /** The sponsor selected for this bay. */
  sponsor?: Maybe<Sponsor>;
};

export type RangeBayVersionFilter = {
  /** Specify whether to return enabled, disabled or all bays regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the bay. If unspecified, only published bays will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Version information for a Driving Range bay */
export type RangeBayVersionInfo = EntityVersionInfo & {
  __typename?: 'RangeBayVersionInfo';
  /** Returns the current draft version of the Bay if one exists */
  draftVersion?: Maybe<RangeBay>;
  /** Indicates whether a draft version has been marked for delete on the next publish */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** The timestamp of this version's publication date */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Returns the latest published version of the Bay if one exists */
  publishedVersion?: Maybe<RangeBay>;
  /** Indicates whether this is a published or draft version of an entity */
  state: PublishState;
  /** The version of the entity */
  version: Scalars['String']['output'];
  /** The other versions of the bay */
  versions?: Maybe<RangeBayVersionsCollectionSegment>;
};


/** Version information for a Driving Range bay */
export type RangeBayVersionInfoVersionsArgs = {
  filter?: InputMaybe<RangeBayVersionFilter>;
  order?: InputMaybe<Array<RangeBaySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type RangeBayVersionsCollectionSegment = {
  __typename?: 'RangeBayVersionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeBay>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RangeBaysFilter = {
  /** Filter by one or more bay availability statuses */
  availabilities?: InputMaybe<Array<BayAvailability>>;
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify whether to returned enabled, disabled or all bays regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the bay. If unspecified, only published bays will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
};

export type RangeBullsEyeActivity = Node & PlayerActivity & RangeActivityInterface & RangeGameActivityInterface & {
  __typename?: 'RangeBullsEyeActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The game ended tie */
  didEndInTie?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** Game leader-board */
  leaderboard?: Maybe<Array<RangeLeaderboardRecord>>;
  location?: Maybe<ActivityLocation>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** You was placed on this position. Note that it's a string so Tie is marked as T6 */
  youPlaced?: Maybe<Scalars['String']['output']>;
  /** You won the game */
  youWon?: Maybe<Scalars['Boolean']['output']>;
};

export type RangeCaptureTheFlagActivity = Node & PlayerActivity & RangeActivityInterface & RangeGameActivityInterface & {
  __typename?: 'RangeCaptureTheFlagActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The game ended tie */
  didEndInTie?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** Game leader-board */
  leaderboard?: Maybe<Array<RangeLeaderboardRecord>>;
  location?: Maybe<ActivityLocation>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** You was placed on this position. Note that it's a string so Tie is marked as T6 */
  youPlaced?: Maybe<Scalars['String']['output']>;
  /** You won the game */
  youWon?: Maybe<Scalars['Boolean']['output']>;
};

export type RangeClientSession = {
  __typename?: 'RangeClientSession';
  bayId: Scalars['String']['output'];
  netIncidents?: Maybe<ClientSessionNetIncident>;
  /** The list of players in the current session */
  players: Array<Maybe<BayPlayer>>;
  startTime: Scalars['DateTime']['output'];
  strokes?: Maybe<ClientSessionStroke>;
};

export type RangeConfigurationBay = {
  __typename?: 'RangeConfigurationBay';
  bay?: Maybe<RangeBay>;
  dbId: Scalars['String']['output'];
  modificationStatus?: Maybe<EntityModificationStatusType>;
};

/** A segment of a collection. */
export type RangeConfigurationBaysCollectionSegment = {
  __typename?: 'RangeConfigurationBaysCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeBay>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RangeConfigurationBySiteFilter = {
  /** Filter by Site Id */
  siteId: Scalars['ID']['input'];
};

export type RangeConfigurationFilterInput = {
  /** Specify whether to returned activated, deactivated or all configuration regardless of status */
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type RangeConfigurationLaunchArea = {
  __typename?: 'RangeConfigurationLaunchArea';
  dbId: Scalars['String']['output'];
  launchArea?: Maybe<LaunchAreaType>;
  modificationStatus?: Maybe<EntityModificationStatusType>;
};

/** A segment of a collection. */
export type RangeConfigurationLaunchAreasCollectionSegment = {
  __typename?: 'RangeConfigurationLaunchAreasCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LaunchAreaType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RangeConfigurationNet = {
  __typename?: 'RangeConfigurationNet';
  dbId: Scalars['String']['output'];
  modificationStatus?: Maybe<EntityModificationStatusType>;
  net?: Maybe<Net>;
};

/** A segment of a collection. */
export type RangeConfigurationNetsCollectionSegment = {
  __typename?: 'RangeConfigurationNetsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Net>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RangeConfigurationRadar = {
  __typename?: 'RangeConfigurationRadar';
  dbId: Scalars['String']['output'];
  modificationStatus?: Maybe<EntityModificationStatusType>;
  radar?: Maybe<Radar>;
};

/** A segment of a collection. */
export type RangeConfigurationRadarsCollectionSegment = {
  __typename?: 'RangeConfigurationRadarsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Radar>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Sort options for searching configurations */
export type RangeConfigurationSortType = {
  publishedAt?: InputMaybe<SortEnumType>;
};

export type RangeConfigurationTarget = {
  __typename?: 'RangeConfigurationTarget';
  dbId: Scalars['String']['output'];
  modificationStatus?: Maybe<EntityModificationStatusType>;
  target?: Maybe<RangeTarget>;
};

/** A segment of a collection. */
export type RangeConfigurationTargetsCollectionSegment = {
  __typename?: 'RangeConfigurationTargetsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeTarget>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RangeConfigurationType = Node & {
  __typename?: 'RangeConfigurationType';
  /** A list of range bays in this configuration */
  bays?: Maybe<RangeConfigurationBaysCollectionSegment>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Profile>;
  dbId: Scalars['String']['output'];
  historyLog?: Maybe<RangeEntityModificationHistoryType>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicates whether this configuration is deleted or not */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** Indicate whether this configuration is published now or not */
  isPublished: Scalars['Boolean']['output'];
  lastUpdatedAt: Scalars['DateTime']['output'];
  lastUpdatedBy?: Maybe<Profile>;
  /** A list of range launch areas */
  launchAreas?: Maybe<RangeConfigurationLaunchAreasCollectionSegment>;
  /** The location the entity belongs to */
  location?: Maybe<LocationInterfaceType>;
  name?: Maybe<Scalars['String']['output']>;
  /** A list of range safety borders */
  nets?: Maybe<RangeConfigurationNetsCollectionSegment>;
  originWorldPoint?: Maybe<LatLonAlt>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedBy?: Maybe<Profile>;
  /** A list of range radars */
  radars?: Maybe<RangeConfigurationRadarsCollectionSegment>;
  referenceWorldPoint?: Maybe<LatLon>;
  releaseNotes?: Maybe<Scalars['String']['output']>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
  /** A list of range targets */
  targets?: Maybe<RangeConfigurationTargetsCollectionSegment>;
};


export type RangeConfigurationTypeBaysArgs = {
  order?: InputMaybe<Array<RangeBaySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RangeConfigurationTypeLaunchAreasArgs = {
  order?: InputMaybe<Array<LaunchAreaSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RangeConfigurationTypeNetsArgs = {
  order?: InputMaybe<Array<NetSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RangeConfigurationTypeRadarsArgs = {
  order?: InputMaybe<Array<RadarSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RangeConfigurationTypeTargetsArgs = {
  order?: InputMaybe<Array<TargetSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type RangeEntityModificationHistoryType = {
  __typename?: 'RangeEntityModificationHistoryType';
  bays?: Maybe<Array<Maybe<RangeConfigurationBay>>>;
  launchAreas?: Maybe<Array<Maybe<RangeConfigurationLaunchArea>>>;
  /** The list of areas that has changed in this configuration */
  modifiedEntities?: Maybe<Array<Maybe<RangeEntityTypesEnumType>>>;
  nets?: Maybe<Array<Maybe<RangeConfigurationNet>>>;
  radars?: Maybe<Array<Maybe<RangeConfigurationRadar>>>;
  targets?: Maybe<Array<Maybe<RangeConfigurationTarget>>>;
};


export type RangeEntityModificationHistoryTypeBaysArgs = {
  statuses?: InputMaybe<Array<InputMaybe<EntityModificationStatusType>>>;
};


export type RangeEntityModificationHistoryTypeLaunchAreasArgs = {
  statuses?: InputMaybe<Array<InputMaybe<EntityModificationStatusType>>>;
};


export type RangeEntityModificationHistoryTypeNetsArgs = {
  statuses?: InputMaybe<Array<InputMaybe<EntityModificationStatusType>>>;
};


export type RangeEntityModificationHistoryTypeRadarsArgs = {
  statuses?: InputMaybe<Array<InputMaybe<EntityModificationStatusType>>>;
};


export type RangeEntityModificationHistoryTypeTargetsArgs = {
  statuses?: InputMaybe<Array<InputMaybe<EntityModificationStatusType>>>;
};

export enum RangeEntityTypesEnumType {
  Bay = 'BAY',
  LaunchArea = 'LAUNCH_AREA',
  Net = 'NET',
  Radar = 'RADAR',
  Target = 'TARGET'
}

export type RangeFindMyDistanceActivity = Node & PlayerActivity & RangeActivityInterface & {
  __typename?: 'RangeFindMyDistanceActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The clubs that was used in the session */
  clubs?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  location?: Maybe<ActivityLocation>;
  /** The number of strokes that was hit in the session */
  numberOfStrokes?: Maybe<Scalars['Int']['output']>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  strokesDistancesPerClub?: Maybe<Array<KeyValuePairOfStringAndDouble__>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type RangeGameActivityInterface = {
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The game ended tie */
  didEndInTie?: Maybe<Scalars['Boolean']['output']>;
  /** The activity id */
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** Game leaderboard */
  leaderboard?: Maybe<Array<RangeLeaderboardRecord>>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** The date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** You was placed on this position. Note that it's a string so Tie is marked as T6 */
  youPlaced?: Maybe<Scalars['String']['output']>;
  /** You won the game */
  youWon?: Maybe<Scalars['Boolean']['output']>;
};

export type RangeHitItActivity = Node & PlayerActivity & RangeActivityInterface & RangeGameActivityInterface & {
  __typename?: 'RangeHitItActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The game ended tie */
  didEndInTie?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** Game leader-board */
  leaderboard?: Maybe<Array<RangeLeaderboardRecord>>;
  location?: Maybe<ActivityLocation>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** You was placed on this position. Note that it's a string so Tie is marked as T6 */
  youPlaced?: Maybe<Scalars['String']['output']>;
  /** You won the game */
  youWon?: Maybe<Scalars['Boolean']['output']>;
};

export type RangeLeaderboardRecord = {
  __typename?: 'RangeLeaderboardRecord';
  bayWinner?: Maybe<Scalars['Boolean']['output']>;
  numberOfRounds?: Maybe<Scalars['Int']['output']>;
  numberOfStrokes?: Maybe<Scalars['Int']['output']>;
  numberOfStrokesPerRound?: Maybe<Scalars['Int']['output']>;
  player?: Maybe<LeaderboardPlayer>;
  position?: Maybe<Scalars['String']['output']>;
  sortOrder?: Maybe<Scalars['Int']['output']>;
  value1?: Maybe<Scalars['Float']['output']>;
  value1PerNumberOfRounds?: Maybe<Scalars['Float']['output']>;
  value1PerNumberOfStrokes?: Maybe<Scalars['Float']['output']>;
  value2?: Maybe<Scalars['Float']['output']>;
  value2PerNumberOfRounds?: Maybe<Scalars['Float']['output']>;
  value2PerNumberOfStrokes?: Maybe<Scalars['Float']['output']>;
  winner?: Maybe<Scalars['Boolean']['output']>;
};

/** A segment of a collection. */
export type RangeLocationBaysCollectionSegment = {
  __typename?: 'RangeLocationBaysCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeBay>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RangeLocationConfigurationsCollectionSegment = {
  __typename?: 'RangeLocationConfigurationsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeConfigurationType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RangeLocationLaunchAreasCollectionSegment = {
  __typename?: 'RangeLocationLaunchAreasCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LaunchAreaType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Container for mutations of range-related entities */
export type RangeLocationMutationType = {
  __typename?: 'RangeLocationMutationType';
  netConfiguration?: Maybe<SafetyBorderConfigurationMutations>;
};

/** A segment of a collection. */
export type RangeLocationNetsCollectionSegment = {
  __typename?: 'RangeLocationNetsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Net>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RangeLocationRadarsCollectionSegment = {
  __typename?: 'RangeLocationRadarsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Radar>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RangeLocationSectionsCollectionSegment = {
  __typename?: 'RangeLocationSectionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Section>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RangeLocationSitesCollectionSegment = {
  __typename?: 'RangeLocationSitesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeSite>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type RangeLocationTargetsCollectionSegment = {
  __typename?: 'RangeLocationTargetsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeTarget>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Container for range-related entities */
export type RangeLocationType = {
  __typename?: 'RangeLocationType';
  /** Current active configuration */
  activeConfiguration?: Maybe<RangeConfigurationType>;
  /** A list of range bays */
  bays?: Maybe<RangeLocationBaysCollectionSegment>;
  /** A list of range configurations */
  configurations?: Maybe<RangeLocationConfigurationsCollectionSegment>;
  /** A list of range launch areas */
  launchAreas?: Maybe<RangeLocationLaunchAreasCollectionSegment>;
  /** The safety border notifications settings */
  netNotifications?: Maybe<NetNotificationType>;
  /** A list of range safety borders */
  nets?: Maybe<RangeLocationNetsCollectionSegment>;
  /** A list of range radars */
  radars?: Maybe<RangeLocationRadarsCollectionSegment>;
  /** A list of range sections */
  sections?: Maybe<RangeLocationSectionsCollectionSegment>;
  /** A list of range sites */
  sites?: Maybe<RangeLocationSitesCollectionSegment>;
  /** A list of range targets */
  targets?: Maybe<RangeLocationTargetsCollectionSegment>;
};


/** Container for range-related entities */
export type RangeLocationTypeActiveConfigurationArgs = {
  filter?: InputMaybe<RangeConfigurationBySiteFilter>;
};


/** Container for range-related entities */
export type RangeLocationTypeBaysArgs = {
  filter?: InputMaybe<RangeBaysFilter>;
  order?: InputMaybe<Array<RangeBaySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeConfigurationsArgs = {
  filter?: InputMaybe<RangeConfigurationFilterInput>;
  order?: InputMaybe<Array<RangeConfigurationSortType>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeLaunchAreasArgs = {
  filter?: InputMaybe<LaunchAreaFilter>;
  order?: InputMaybe<Array<LaunchAreaSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeNetsArgs = {
  filter?: InputMaybe<NetFilter>;
  order?: InputMaybe<Array<NetSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeRadarsArgs = {
  filter?: InputMaybe<RadarFilter>;
  order?: InputMaybe<Array<RadarSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeSectionsArgs = {
  filter?: InputMaybe<SectionFilter>;
  order?: InputMaybe<Array<SectionSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeSitesArgs = {
  filter?: InputMaybe<RangeSiteFilter>;
  order?: InputMaybe<Array<RangeSiteSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** Container for range-related entities */
export type RangeLocationTypeTargetsArgs = {
  filter?: InputMaybe<RangeTargetFilter>;
  order?: InputMaybe<Array<TargetSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum RangeMeasurementTypes {
  Measurement = 'MEASUREMENT',
  ProBallMeasurement = 'PRO_BALL_MEASUREMENT',
  ProBallSiteMeasurement = 'PRO_BALL_SITE_MEASUREMENT',
  SiteMeasurement = 'SITE_MEASUREMENT'
}

export type RangePracticeActivity = Node & PlayerActivity & RangeActivityInterface & {
  __typename?: 'RangePracticeActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  /** The clubs that was used in the session */
  clubs?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  location?: Maybe<ActivityLocation>;
  /** The number of strokes that was hit in the session */
  numberOfStrokes?: Maybe<Scalars['Int']['output']>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  /** The targets that was used in the session */
  usedTargets?: Maybe<Array<Maybe<Target>>>;
};

/** Root container for range-related data */
export type RangeRootQueryType = {
  __typename?: 'RangeRootQueryType';
  /** A single bay by id and option version */
  bayById?: Maybe<RangeBay>;
  /** A single configuration by id */
  configurationById?: Maybe<RangeConfigurationType>;
  /** A single launch area by id and option version */
  launchAreaById?: Maybe<LaunchAreaType>;
  /** A single safety border by id and option version */
  netById?: Maybe<Net>;
  /** A single radar by id and option version */
  radarById?: Maybe<Radar>;
  /** A single section by id and option version */
  sectionById?: Maybe<Section>;
  /** A single target by id and option version */
  targetById?: Maybe<RangeTarget>;
};


/** Root container for range-related data */
export type RangeRootQueryTypeBayByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Root container for range-related data */
export type RangeRootQueryTypeConfigurationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Root container for range-related data */
export type RangeRootQueryTypeLaunchAreaByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Root container for range-related data */
export type RangeRootQueryTypeNetByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Root container for range-related data */
export type RangeRootQueryTypeRadarByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Root container for range-related data */
export type RangeRootQueryTypeSectionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Root container for range-related data */
export type RangeRootQueryTypeTargetByIdArgs = {
  id: Scalars['ID']['input'];
};

export type RangeRoverPosition = {
  __typename?: 'RangeRoverPosition';
  /** The altitude of the rover position. */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Indicates the level of GPS Fix accuracy */
  fixType?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the rover has a valid fix */
  isFixValid: Scalars['Boolean']['output'];
  /** The latitude of the rover position. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude of the rover position. */
  longitude?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

/** Represents a Driving Range site installation */
export type RangeSite = Node & {
  __typename?: 'RangeSite';
  dbId: Scalars['String']['output'];
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** The location the entity belongs to */
  location?: Maybe<LocationInterfaceType>;
  name: Scalars['String']['output'];
  /** The rover position for the site */
  roverPosition?: Maybe<RangeRoverPosition>;
};

export type RangeSiteFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Sort options for searching sites */
export type RangeSiteSortInput = {
  name?: InputMaybe<SortEnumType>;
};

export type RangeSponsorCampaign = Node & SponsorCampaignV2 & {
  __typename?: 'RangeSponsorCampaign';
  active?: Maybe<Scalars['Boolean']['output']>;
  /** It indicates if all bays are covered by this campaign */
  allBays?: Maybe<Scalars['Boolean']['output']>;
  /** Is all courses covered by this campaign */
  allCourses?: Maybe<Scalars['Boolean']['output']>;
  /** It indicates if all locations are covered by this campaign */
  allLocations?: Maybe<Scalars['Boolean']['output']>;
  /** The bays covered by this campaign */
  bays?: Maybe<Array<Maybe<RangeBay>>>;
  /** The courses covered by this campaign */
  courses?: Maybe<Array<Maybe<Course>>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /**
   * The sponsor shown on the given hole
   * @deprecated Use 'holeSponsorsV2'
   */
  holeSponsors?: Maybe<Array<Maybe<HoleSponsorTypeV2>>>;
  /** The sponsor shown on the given hole */
  holeSponsorsV2: Array<Maybe<HoleSponsorTypeV2>>;
  id: Scalars['ID']['output'];
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The locations covered by this campaign */
  locations?: Maybe<Array<Maybe<LocationInterfaceType>>>;
  startDate: Scalars['DateTime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SponsorCampaignKinds>;
};

export type RangeSponsorCampaignInputType = {
  /** Is the sponsor campaign active */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** The bays where this campaign applies */
  bays?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The course identifiers this campaign covers - if null or empty, all courses will covered */
  courses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The end date for the campaign */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The sponsors covering the holes */
  holeSponsors: Array<InputMaybe<HoleSponsorInputType>>;
  /** It determines if the campaign needs to be shown on dynamic bays */
  includeDynamicBays?: InputMaybe<Scalars['Boolean']['input']>;
  /** The locations where this campaign applies */
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  /** The start date for the campaign */
  startDate: Scalars['DateTime']['input'];
  /** The title for the campaign */
  title: Scalars['String']['input'];
};

/** Mutations on a sponsor campaign */
export type RangeSponsorCampaignMutation = SponsorCampaignMutationInterfaceType & {
  __typename?: 'RangeSponsorCampaignMutation';
  /** Delete sponsor campaign */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Update active state for this sponsor campaign */
  setActive?: Maybe<SponsorCampaignV2>;
  /** Update title for this sponsor campaign */
  setTitle?: Maybe<SponsorCampaignV2>;
  /** Update the range sponsor campaign */
  update?: Maybe<RangeSponsorCampaign>;
};


/** Mutations on a sponsor campaign */
export type RangeSponsorCampaignMutationSetActiveArgs = {
  active?: Scalars['Boolean']['input'];
};


/** Mutations on a sponsor campaign */
export type RangeSponsorCampaignMutationSetTitleArgs = {
  title?: InputMaybe<Scalars['NonEmptyString']['input']>;
};


/** Mutations on a sponsor campaign */
export type RangeSponsorCampaignMutationUpdateArgs = {
  sponsorCampaign: RangeSponsorCampaignInputType;
};

export type RangeStroke = {
  __typename?: 'RangeStroke';
  /** The name of the bay */
  bayName?: Maybe<Scalars['String']['output']>;
  /** The bay position (center of bay) in Site Coordinates */
  bayPosition?: Maybe<Array<Scalars['Float']['output']>>;
  /** The bay type */
  bayType?: Maybe<Scalars['String']['output']>;
  club?: Maybe<Scalars['String']['output']>;
  /** Database Id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** Indicate that the player have deleted the stroke */
  isDeleted: Scalars['Boolean']['output'];
  /** The shot was from a Dynamic Bay */
  isDynamicBay?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate that the shot was not a real shot but a simulated shot */
  isSimulated: Scalars['Boolean']['output'];
  /** The measurement of the stroke. Use the measurementType argument to choose the right measurement. Default measurement is SiteMeasurement */
  measurement?: Maybe<RangeStrokeMeasurement>;
  /** The player */
  player?: Maybe<TrackerMessagePlayer>;
  /** The id of the target (Only if target have been selected) */
  targetId?: Maybe<Scalars['String']['output']>;
  /** The position of the target in Site Coordinates (Only if target have been selected) */
  targetPosition?: Maybe<Array<Scalars['Float']['output']>>;
  /** The Site Coordinates of where the ball was hit from */
  teePosition?: Maybe<Array<Scalars['Float']['output']>>;
  /** Time when the stroke was hit */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type RangeStrokeMeasurementArgs = {
  measurementType?: InputMaybe<RangeMeasurementTypes>;
};

export type RangeStrokeMeasurement = {
  __typename?: 'RangeStrokeMeasurement';
  ballSpeed?: Maybe<Scalars['Float']['output']>;
  ballSpin?: Maybe<Scalars['Float']['output']>;
  ballSpinEffective?: Maybe<Scalars['Float']['output']>;
  ballTrajectory?: Maybe<Array<Maybe<StrokeTrajectory>>>;
  ballVelocity?: Maybe<Array<Scalars['Float']['output']>>;
  /** The length of the shot until the ball hit the ground first time. It was if the shot was hit on a flat environment */
  carry?: Maybe<Scalars['Float']['output']>;
  /** The length of the shot until the ball hit the ground first time. It estimated to where it would land in the real environment */
  carryActual?: Maybe<Scalars['Float']['output']>;
  /** The side distance where the ball hit the ground compared with a selected target line.  It was if the shot was hit on a flat environment. Note: This value do not give any sense in SideMeasurement and if a target is not selected */
  carrySide?: Maybe<Scalars['Float']['output']>;
  /** The side distance where the ball hit the ground compared with a selected target line. It estimated to where it would land in the real environment. Note: This value do not give any sense in SideMeasurement and if a target is not selected */
  carrySideActual?: Maybe<Scalars['Float']['output']>;
  clone?: Maybe<RangeStrokeMeasurement>;
  curve?: Maybe<Scalars['Float']['output']>;
  curveActual?: Maybe<Scalars['Float']['output']>;
  curveTotal?: Maybe<Scalars['Float']['output']>;
  curveTotalActual?: Maybe<Scalars['Float']['output']>;
  distanceFromPin?: Maybe<Scalars['Float']['output']>;
  distanceFromPinActual?: Maybe<Scalars['Float']['output']>;
  distanceFromPinTotal?: Maybe<Scalars['Float']['output']>;
  distanceFromPinTotalActual?: Maybe<Scalars['Float']['output']>;
  isValidMeasurement: Scalars['Boolean']['output'];
  kind?: Maybe<Scalars['String']['output']>;
  landingAngle?: Maybe<Scalars['Float']['output']>;
  landingPossitionCarry?: Maybe<Array<Scalars['Float']['output']>>;
  landingPossitionCarryActual?: Maybe<Array<Scalars['Float']['output']>>;
  landingPossitionTotal?: Maybe<Array<Scalars['Float']['output']>>;
  lastData?: Maybe<Scalars['Float']['output']>;
  launchAngle?: Maybe<Scalars['Float']['output']>;
  launchDirection?: Maybe<Scalars['Float']['output']>;
  maxHeight?: Maybe<Scalars['Float']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  reducedAccuracy?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  spinAxis?: Maybe<Scalars['Float']['output']>;
  targetDistance?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['DateTime']['output']>;
  /** The total length of the shot including bounce and role. It was if the shot was hit on a flat environment and landed on fairway */
  total?: Maybe<Scalars['Float']['output']>;
  totalActual?: Maybe<Scalars['Float']['output']>;
  totalSide?: Maybe<Scalars['Float']['output']>;
  totalSideActual?: Maybe<Scalars['Float']['output']>;
  windVelocity?: Maybe<Array<Scalars['Float']['output']>>;
};

/** A target on a driving range */
export type RangeTarget = Node & {
  __typename?: 'RangeTarget';
  annotations?: Maybe<Array<KeyValue>>;
  /** The color of the target */
  color?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /** Description of the target */
  description?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicate whether the target is enabled or not */
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** It indicates if the target is hidden */
  isHidden?: Maybe<Scalars['Boolean']['output']>;
  labels?: Maybe<Array<Maybe<LabelType>>>;
  /** The location the target is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the target */
  name?: Maybe<Scalars['String']['output']>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
  /** The type of the target */
  type?: Maybe<Type>;
  /** Returns version information about the draft and published version of the target */
  versionInfo?: Maybe<TargetVersionInfoType>;
  /** World coordinates of the target */
  worldPoint?: Maybe<LatLonAlt>;
};

export type RangeTargetFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify whether to returned enabled, disabled or all targets regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the target. If unspecified, only published targets will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type RangeVirtualGolfPlayActivity = Node & PlayerActivity & RangeActivityInterface & {
  __typename?: 'RangeVirtualGolfPlayActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  location?: Maybe<ActivityLocation>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type RangeVirtualGolfPracticeActivity = Node & PlayerActivity & RangeActivityInterface & {
  __typename?: 'RangeVirtualGolfPracticeActivity';
  activityEvents?: Maybe<Array<ActivityEvent>>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  location?: Maybe<ActivityLocation>;
  /** OldPlayerId is used when a temp player have been merged on the server but you still would like to use the old Id in the leaderboard */
  oldPlayerId?: Maybe<Scalars['UUID']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  siteAssetInfo?: Maybe<Array<SiteAssetInfo>>;
  siteMetadata?: Maybe<DrivingRangesMetadata>;
  /** Strokes */
  strokes?: Maybe<Array<RangeStroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type ReJoinTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type ReJoinTeamInput = {
  teamId: Scalars['ID']['input'];
};

export type ReJoinTeamMemberError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type ReJoinTeamMemberInput = {
  memberId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type ReJoinTeamMemberPayload = {
  __typename?: 'ReJoinTeamMemberPayload';
  errors?: Maybe<Array<ReJoinTeamMemberError>>;
  team?: Maybe<TeamInterface>;
};

export type ReJoinTeamPayload = {
  __typename?: 'ReJoinTeamPayload';
  errors?: Maybe<Array<ReJoinTeamError>>;
  team?: Maybe<TeamInterface>;
};

export type ReceiversNotFoundError = BaseError & {
  __typename?: 'ReceiversNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type RecordedHoleVideo = {
  __typename?: 'RecordedHoleVideo';
  finalTimeInSeconds?: Maybe<Scalars['Float']['output']>;
  isHidden?: Maybe<Scalars['Boolean']['output']>;
  launchTimeInSeconds?: Maybe<Scalars['Float']['output']>;
  videoKind?: Maybe<RecordedHoleVideoKind>;
  videoUrl?: Maybe<Scalars['URL']['output']>;
};

/** The kind of video */
export enum RecordedHoleVideoKind {
  CombinedVideo = 'COMBINED_VIDEO',
  MobileVideo = 'MOBILE_VIDEO',
  ScreenRecording = 'SCREEN_RECORDING'
}

export type RegisterDeviceNotificationError = DefaultError;

export type RegisterDeviceNotificationInput = {
  appName: Scalars['String']['input'];
  appVersion: Scalars['String']['input'];
  deviceId: Scalars['String']['input'];
  fcmToken: Scalars['String']['input'];
  language: Scalars['String']['input'];
  platform: DevicePlatformEnum;
  tokenId: Scalars['String']['input'];
};

export type RegisterDeviceNotificationPayload = {
  __typename?: 'RegisterDeviceNotificationPayload';
  errors?: Maybe<Array<RegisterDeviceNotificationError>>;
  result?: Maybe<Device>;
};

export type RegisterIndoorSiteServerError = DefaultError | EntityNotFoundError | HostnameOrMacAddressInvalidFormatError | MissingMandatoryFieldError | UnauthorizedError;

export type RegisterIndoorSiteServerInput = {
  deviceId: Scalars['UUID']['input'];
  facilityId: Scalars['String']['input'];
  hostName: Scalars['String']['input'];
  macAddress?: InputMaybe<Scalars['MacAddress']['input']>;
  serialNumber: Scalars['String']['input'];
  tpsDeviceId: Scalars['String']['input'];
};

export type RegisterIndoorSiteServerPayload = {
  __typename?: 'RegisterIndoorSiteServerPayload';
  errors?: Maybe<Array<RegisterIndoorSiteServerError>>;
  result?: Maybe<IndoorSiteServer>;
};

export type ReleaseComponent = {
  __typename?: 'ReleaseComponent';
  components?: Maybe<Array<Maybe<ReleaseComponent>>>;
  identifier?: Maybe<Scalars['String']['output']>;
  isPrerelease?: Maybe<Scalars['Boolean']['output']>;
  mountPoint?: Maybe<Scalars['String']['output']>;
  resource?: Maybe<ReleaseResource>;
  version?: Maybe<Scalars['String']['output']>;
};

export type ReleaseResource = {
  __typename?: 'ReleaseResource';
  identifier?: Maybe<Scalars['String']['output']>;
  size: Scalars['Long']['output'];
  url?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type ReleasesModel = {
  __typename?: 'ReleasesModel';
  /** All release components and there dependent sub components */
  components?: Maybe<Array<ReleaseComponent>>;
  resources?: Maybe<Array<Maybe<ReleaseResource>>>;
};

export type RemoveCoachFromFacilityError = DefaultError | EntityNotFoundError;

export type RemoveCoachFromFacilityInput = {
  coachId: Scalars['ID']['input'];
  facilityId: Scalars['ID']['input'];
};

export type RemoveCoachFromFacilityPayload = {
  __typename?: 'RemoveCoachFromFacilityPayload';
  coachProfile?: Maybe<CoachProfile>;
  errors?: Maybe<Array<RemoveCoachFromFacilityError>>;
};

export type RemoveFacilityConsentsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveFacilityConsentsInput = {
  consents: Array<RemoveFacilityPartnerConsentInput>;
  facilityId: Scalars['ID']['input'];
  partnerId: Scalars['ID']['input'];
};

export type RemoveFacilityConsentsPayload = {
  __typename?: 'RemoveFacilityConsentsPayload';
  errors?: Maybe<Array<RemoveFacilityConsentsError>>;
  partner?: Maybe<Partner>;
};

export type RemoveFacilityPartnerConsentInput = {
  kind: ConsentKind;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type RemoveFacilityPartnerError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveFacilityPartnerInput = {
  facilityId: Scalars['ID']['input'];
  ids: Array<Scalars['ID']['input']>;
};

export type RemoveFacilityPartnerPayload = {
  __typename?: 'RemoveFacilityPartnerPayload';
  errors?: Maybe<Array<RemoveFacilityPartnerError>>;
  result?: Maybe<AppMutationResult>;
};

export type RemoveFindMyDistanceShotError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError;

export type RemoveFindMyDistanceShotInput = {
  clubId: Scalars['ID']['input'];
  measurementIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type RemoveFindMyDistanceShotPayload = {
  __typename?: 'RemoveFindMyDistanceShotPayload';
  errors?: Maybe<Array<RemoveFindMyDistanceShotError>>;
  result?: Maybe<Club>;
};

export type RemoveMembershipError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveMembershipInput = {
  id: Scalars['NonEmptyString']['input'];
};

export type RemoveMembershipPayload = {
  __typename?: 'RemoveMembershipPayload';
  errors?: Maybe<Array<RemoveMembershipError>>;
  result?: Maybe<AppMutationResult>;
};

export type RemoveOAuthClientApplicationInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type RemoveOAuthClientApplicationPayload = {
  __typename?: 'RemoveOAuthClientApplicationPayload';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RemovePartnerConsentLocalizationInput = {
  /** The country code */
  cultureCode: Scalars['NonEmptyString']['input'];
  kind: ConsentKind;
  /** The version of the consent */
  version?: InputMaybe<Scalars['String']['input']>;
};

export type RemovePartnerConsentLocalizationsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RemovePartnerConsentLocalizationsInput = {
  consents: Array<RemovePartnerConsentLocalizationInput>;
  facilityId: Scalars['ID']['input'];
  partnerId: Scalars['ID']['input'];
};

export type RemovePartnerConsentLocalizationsPayload = {
  __typename?: 'RemovePartnerConsentLocalizationsPayload';
  errors?: Maybe<Array<RemovePartnerConsentLocalizationsError>>;
  partner?: Maybe<Partner>;
};

export type RemoveQueuedCommandError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type RemoveQueuedCommandInput = {
  bayIds: Array<Scalars['ID']['input']>;
};

export type RemoveQueuedCommandPayload = {
  __typename?: 'RemoveQueuedCommandPayload';
  errors?: Maybe<Array<RemoveQueuedCommandError>>;
  result?: Maybe<AppMutationResult>;
};

export type RemoveRangeBaysError = DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveRangeBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
};

export type RemoveRangeBaysPayload = {
  __typename?: 'RemoveRangeBaysPayload';
  bays?: Maybe<Array<Maybe<RangeBay>>>;
  errors?: Maybe<Array<RemoveRangeBaysError>>;
};

export type RemoveRangeLaunchAreasError = DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveRangeLaunchAreasInput = {
  launchAreaIds: Array<Scalars['ID']['input']>;
};

export type RemoveRangeLaunchAreasPayload = {
  __typename?: 'RemoveRangeLaunchAreasPayload';
  errors?: Maybe<Array<RemoveRangeLaunchAreasError>>;
  launchAreas?: Maybe<Array<Maybe<LaunchAreaType>>>;
};

export type RemoveRangeNetsError = DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveRangeNetsInput = {
  netIds: Array<Scalars['ID']['input']>;
};

export type RemoveRangeNetsPayload = {
  __typename?: 'RemoveRangeNetsPayload';
  errors?: Maybe<Array<RemoveRangeNetsError>>;
  nets?: Maybe<Array<Maybe<Net>>>;
};

export type RemoveRangeRadarError = DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveRangeRadarInput = {
  radarIds: Array<Scalars['ID']['input']>;
};

export type RemoveRangeRadarPayload = {
  __typename?: 'RemoveRangeRadarPayload';
  errors?: Maybe<Array<RemoveRangeRadarError>>;
  radars?: Maybe<Array<Maybe<Radar>>>;
};

export type RemoveRangeSectionsError = DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError;

export type RemoveRangeSectionsInput = {
  sectionIds: Array<Scalars['ID']['input']>;
};

export type RemoveRangeSectionsPayload = {
  __typename?: 'RemoveRangeSectionsPayload';
  errors?: Maybe<Array<RemoveRangeSectionsError>>;
  result?: Maybe<AppMutationResult>;
};

export type RemoveRangeTargetsError = DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type RemoveRangeTargetsInput = {
  targetIds: Array<Scalars['ID']['input']>;
};

export type RemoveRangeTargetsPayload = {
  __typename?: 'RemoveRangeTargetsPayload';
  errors?: Maybe<Array<RemoveRangeTargetsError>>;
  targets?: Maybe<Array<Maybe<RangeTarget>>>;
};

export type RemoveTeamError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type RemoveTeamInput = {
  teamId: Scalars['ID']['input'];
};

export type RemoveTeamMemberError = AlreadyMemberOfATeamError | DefaultError | MemberDisqualifiedError | MemberNotFoundError | MemberRemovedError | NoRemainingSlotsError | NoSignupError | NoTeamChangeError | TeamCompleteError | TeamDisqualifiedError | TeamEventNotSupportedError | TeamInvalidLocationError | TeamNameAlreadyUsedError | TeamNotFoundError | TeamRemovedError | TeamTypeNotSupportedError;

export type RemoveTeamMemberInput = {
  memberId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type RemoveTeamMemberPayload = {
  __typename?: 'RemoveTeamMemberPayload';
  errors?: Maybe<Array<RemoveTeamMemberError>>;
  team?: Maybe<TeamInterface>;
};

export type RemoveTeamPayload = {
  __typename?: 'RemoveTeamPayload';
  errors?: Maybe<Array<RemoveTeamError>>;
  team?: Maybe<TeamInterface>;
};

export type RemoveTournamentPartnersError = DefaultError | EntityNotFoundError;

export type RemoveTournamentPartnersInput = {
  id: Scalars['ID']['input'];
  partnersKeys: Array<Scalars['String']['input']>;
};

export type RemoveTournamentPartnersPayload = {
  __typename?: 'RemoveTournamentPartnersPayload';
  errors?: Maybe<Array<RemoveTournamentPartnersError>>;
  tournament?: Maybe<Tournament>;
};

export type ResetOAuthClientApplicationSecretInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ResetOAuthClientApplicationSecretPayload = {
  __typename?: 'ResetOAuthClientApplicationSecretPayload';
  application?: Maybe<Application>;
};

export type RevertRangeBaysError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RevertRangeBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
};

export type RevertRangeBaysPayload = {
  __typename?: 'RevertRangeBaysPayload';
  errors?: Maybe<Array<RevertRangeBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export type RevertRangeConfigurationError = ActiveConfigurationNotFoundError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | PendingConfigurationDraftError | RevertToSameConfigurationError | UnauthorizedError;

export type RevertRangeConfigurationInput = {
  snapshotConfigurationId: Scalars['ID']['input'];
};

export type RevertRangeConfigurationPayload = {
  __typename?: 'RevertRangeConfigurationPayload';
  errors?: Maybe<Array<RevertRangeConfigurationError>>;
  result?: Maybe<AppMutationResult>;
};

export type RevertRangeLaunchAreasError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RevertRangeLaunchAreasInput = {
  launchAreaIds: Array<Scalars['ID']['input']>;
};

export type RevertRangeLaunchAreasPayload = {
  __typename?: 'RevertRangeLaunchAreasPayload';
  errors?: Maybe<Array<RevertRangeLaunchAreasError>>;
  result?: Maybe<AppMutationResult>;
};

export type RevertRangeNetsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RevertRangeNetsInput = {
  netIds: Array<Scalars['ID']['input']>;
};

export type RevertRangeNetsPayload = {
  __typename?: 'RevertRangeNetsPayload';
  errors?: Maybe<Array<RevertRangeNetsError>>;
  result?: Maybe<AppMutationResult>;
};

export type RevertRangeRadarsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RevertRangeRadarsInput = {
  radarIds: Array<Scalars['ID']['input']>;
};

export type RevertRangeRadarsPayload = {
  __typename?: 'RevertRangeRadarsPayload';
  errors?: Maybe<Array<RevertRangeRadarsError>>;
  result?: Maybe<AppMutationResult>;
};

export type RevertRangeTargetsError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type RevertRangeTargetsInput = {
  targetIds: Array<Scalars['ID']['input']>;
};

export type RevertRangeTargetsPayload = {
  __typename?: 'RevertRangeTargetsPayload';
  errors?: Maybe<Array<RevertRangeTargetsError>>;
  result?: Maybe<AppMutationResult>;
};

export type RevertToSameConfigurationError = BaseError & {
  __typename?: 'RevertToSameConfigurationError';
  activeConfigurationId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type RevokeConsentError = DefaultError | MissingMandatoryFieldError;

export type RevokeConsentInput = {
  key: Scalars['String']['input'];
};

export type RevokeConsentPayload = {
  __typename?: 'RevokeConsentPayload';
  errors?: Maybe<Array<RevokeConsentError>>;
  userConsent?: Maybe<UserConsentItem>;
};

export type Role = {
  __typename?: 'Role';
  /** The display name of the RoleType */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The RoleType Id */
  id?: Maybe<Scalars['ID']['output']>;
  /** The name of the RoleType */
  name?: Maybe<Scalars['String']['output']>;
  /** The users of the RoleType */
  users?: Maybe<UserRolesTypeCollectionSegment>;
};


export type RoleUsersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type RoundGameSettings = {
  __typename?: 'RoundGameSettings';
  /** The attempt that is shown on the leaderboard */
  attemptsOnLeaderboard?: Maybe<Scalars['String']['output']>;
  /** The attempts per round */
  attemptsPerRound?: Maybe<Scalars['Int']['output']>;
  /** The fairway firmness */
  fairwayFirmness?: Maybe<Firmness>;
  /** The gimme distance */
  gimmeDistance?: Maybe<Scalars['NonNegativeFloat']['output']>;
  /** The green firmness */
  greenFirmness?: Maybe<Firmness>;
  /** The green stimp for the round */
  greenStimp?: Maybe<Stimp>;
  /** The lighting on the course when the round is played */
  lighting?: Maybe<Lighting>;
  /** Mulligans */
  mulligans?: Maybe<Mulligans>;
  /** The pin difficulty */
  pinDifficulty?: Maybe<Pin>;
  /** The putting mode */
  puttingMode?: Maybe<PuttMode>;
  /** The wind mode */
  windSpeed?: Maybe<WindMode>;
};

export type RoundLeaderboard = {
  __typename?: 'RoundLeaderboard';
  /** The embedded game */
  embeddedGameType?: Maybe<EmbeddedGameType>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  hole?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  records?: Maybe<RoundLeaderboardRecordTypeCollectionSegment>;
  roundId?: Maybe<Scalars['String']['output']>;
  scoringFormat?: Maybe<GameTypes>;
  selectedPlayers?: Maybe<Array<RoundLeaderboardRecord>>;
};


export type RoundLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  hasScore?: InputMaybe<Array<InputMaybe<LeaderboardHasScore>>>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type RoundLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type RoundLeaderboardClosestToPinRecordType = {
  __typename?: 'RoundLeaderboardClosestToPinRecordType';
  age?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hasScore?: Maybe<Array<LeaderboardHasScore>>;
  hcp?: Maybe<Scalars['Float']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isLive: Scalars['Boolean']['output'];
  kind: PersonConnectionKind;
  locationId?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  newOrderOfMeritLeaderboardScore?: Maybe<OrderOfMeritLeaderboardScore>;
  /** @deprecated Use Playername instead */
  nickname?: Maybe<Scalars['String']['output']>;
  numberOfTickets: Scalars['Int']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  playername?: Maybe<Scalars['String']['output']>;
  previousOrderOfMeritLeaderboardScore?: Maybe<OrderOfMeritLeaderboardScore>;
  score?: Maybe<LeaderboardRoundClosestToPinScoreType>;
  status: InvitationStatus;
  time?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type RoundLeaderboardClosestToPinRecordTypeCollectionSegment = {
  __typename?: 'RoundLeaderboardClosestToPinRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RoundLeaderboardClosestToPinRecordType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoundLeaderboardLongestDriveRecordType = {
  __typename?: 'RoundLeaderboardLongestDriveRecordType';
  age?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hasScore?: Maybe<Array<LeaderboardHasScore>>;
  hcp?: Maybe<Scalars['Float']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isLive: Scalars['Boolean']['output'];
  kind: PersonConnectionKind;
  locationId?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  newOrderOfMeritLeaderboardScore?: Maybe<OrderOfMeritLeaderboardScore>;
  /** @deprecated Use Playername instead */
  nickname?: Maybe<Scalars['String']['output']>;
  numberOfTickets: Scalars['Int']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  playername?: Maybe<Scalars['String']['output']>;
  previousOrderOfMeritLeaderboardScore?: Maybe<OrderOfMeritLeaderboardScore>;
  score?: Maybe<LeaderboardRoundLongestDriveScoreType>;
  status: InvitationStatus;
  time?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type RoundLeaderboardLongestDriveRecordTypeCollectionSegment = {
  __typename?: 'RoundLeaderboardLongestDriveRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RoundLeaderboardLongestDriveRecordType>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoundLeaderboardRecord = {
  __typename?: 'RoundLeaderboardRecord';
  age?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hasScore?: Maybe<Array<LeaderboardHasScore>>;
  hcp?: Maybe<Scalars['Float']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isLive: Scalars['Boolean']['output'];
  kind: PersonConnectionKind;
  locationId?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  newOrderOfMeritLeaderboardScore?: Maybe<OrderOfMeritLeaderboardScore>;
  /** @deprecated Use Playername instead */
  nickname?: Maybe<Scalars['String']['output']>;
  numberOfTickets: Scalars['Int']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  playerId?: Maybe<Scalars['ID']['output']>;
  playername?: Maybe<Scalars['String']['output']>;
  previousOrderOfMeritLeaderboardScore?: Maybe<OrderOfMeritLeaderboardScore>;
  score?: Maybe<LeaderboardRoundScoreType>;
  status: InvitationStatus;
  /** Player team id */
  teamId?: Maybe<Scalars['ID']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type RoundLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'RoundLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RoundLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Information about the player for a round */
export type RoundPlayerInfo = {
  __typename?: 'RoundPlayerInfo';
  /** The player course hcp obtained from the course slope and rating */
  courseHcp?: Maybe<Scalars['Float']['output']>;
  /** DateOfBirth */
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** First name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The gender of the player */
  gender?: Maybe<Scalars['String']['output']>;
  /** The player hcp index used */
  hcp?: Maybe<Scalars['Float']['output']>;
  /** Was the player added to this round as a ghost player */
  isGhost?: Maybe<Scalars['Boolean']['output']>;
  /** Did the player sign in */
  isGuest?: Maybe<Scalars['Boolean']['output']>;
  /** Are the players scores counting in a tournament */
  isTournamentScore?: Maybe<Scalars['Boolean']['output']>;
  /** Last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player name */
  nickname?: Maybe<Scalars['String']['output']>;
  /** The url for the players profile image */
  picture?: Maybe<Scalars['URL']['output']>;
  /** Outdoor hcp */
  playerHcp?: Maybe<Scalars['Decimal']['output']>;
  /** Full name */
  playerName?: Maybe<Scalars['String']['output']>;
  /** The tee played from */
  tee?: Maybe<Scalars['String']['output']>;
};

export type RoundProgress = {
  __typename?: 'RoundProgress';
  autoJoin?: Maybe<Scalars['Boolean']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  lastHoleFinishedAt?: Maybe<Scalars['DateTime']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  playAsGuest?: Maybe<Scalars['Boolean']['output']>;
  playerStatus?: Maybe<Scalars['String']['output']>;
  roundId?: Maybe<Scalars['ID']['output']>;
  verboseInfo?: Maybe<Scalars['String']['output']>;
};

/** Tournament round settings */
export type RoundSettings = {
  __typename?: 'RoundSettings';
  /** Default Tee */
  defaultTee?: Maybe<TournamentTee>;
  /** Default female Tee */
  femaleTee?: Maybe<TournamentTee>;
  /** Game settings */
  gameSettings?: Maybe<RoundGameSettings>;
  /** List of holes */
  holes?: Maybe<Array<Maybe<TournamentHole>>>;
  /** Holes to play */
  holesToPlay?: Maybe<HolesToPlay>;
  /** Default male Tee */
  maleTee?: Maybe<TournamentTee>;
};

export type SafetyBorderConfigurationMutations = {
  __typename?: 'SafetyBorderConfigurationMutations';
  /**
   * Update the safety border notifications settings
   * @deprecated Try to use `setNetNotificationConfiguration` instead
   */
  setNetConfiguration?: Maybe<NetNotificationConfiguration>;
  /**
   * Change the location PIN code
   * @deprecated Use `updateLocationPinCode` instead
   */
  setPinCode?: Maybe<Scalars['Boolean']['output']>;
};


export type SafetyBorderConfigurationMutationsSetNetConfigurationArgs = {
  configuration: NetNotificationConfigurationInput;
};


export type SafetyBorderConfigurationMutationsSetPinCodeArgs = {
  pinCode: Scalars['String']['input'];
};

/** Unfinished rounds */
export type SavedRound = {
  __typename?: 'SavedRound';
  /** Course played */
  course?: Maybe<CourseInfo>;
  /** List all kinds of course images */
  images?: Maybe<Array<Maybe<MediaResource>>>;
  /** This round is in a tournament in a season */
  isInSeason?: Maybe<Scalars['Boolean']['output']>;
  /** This round is in a tournament */
  isInTournament?: Maybe<Scalars['Boolean']['output']>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** Colors of the players that have played */
  playerColors?: Maybe<Array<KeyValue>>;
  /** Player that have played the round */
  playerId?: Maybe<Scalars['String']['output']>;
  /** Players that started the round */
  players?: Maybe<Array<Maybe<RoundPlayerInfo>>>;
  /** Save game version */
  saveGameVersion?: Maybe<Scalars['String']['output']>;
  /** Scores */
  scorecardId?: Maybe<Scalars['String']['output']>;
  /** Screen recording */
  screenRecordingDetails?: Maybe<ScreenRecordingDetails>;
  /** Game settings */
  settings?: Maybe<GameSettings>;
  /** Team size */
  teamSize: Scalars['Int']['output'];
  /** Thru */
  thru: Scalars['Int']['output'];
  /** When was the round played */
  time: Scalars['DateTime']['output'];
  /** Tournament */
  tournament?: Maybe<Tournament>;
  /** Tournament activity in a season */
  tournamentActivity?: Maybe<SeasonTournamentActivityInterface>;
  /** Tournament details */
  tournamentDetails?: Maybe<TournamentDetails>;
  /** List all kinds of course videos */
  videos?: Maybe<Array<Maybe<MediaResource>>>;
};

/** Method used to distribute scores */
export enum ScoreOptions {
  Closest = 'CLOSEST',
  Total = 'TOTAL'
}

/** All scorecard data for a round of golf */
export type Scorecard = Node & {
  __typename?: 'Scorecard';
  /** The bay the round was played in */
  bay?: Maybe<BayInterface>;
  bayKind?: Maybe<BayKind>;
  /** The course that the round was played on */
  course?: Maybe<Course>;
  courseHcp?: Maybe<Scalars['Float']['output']>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** Get event logs for this scorecard */
  eventLogs?: Maybe<EventLogItemTypeCollectionSegment>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  fairwayFirmness?: Maybe<Scalars['String']['output']>;
  /** The finish time of the last played hole */
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The game settings */
  gameSettings?: Maybe<GameSettings>;
  greenFirmness?: Maybe<Scalars['String']['output']>;
  greenStimp?: Maybe<Scalars['Float']['output']>;
  /** The gross score of the currently played holes */
  grossScore?: Maybe<Scalars['Int']['output']>;
  /** Has one or more shot videos */
  hasVideos?: Maybe<Scalars['Boolean']['output']>;
  /** The holes on the round. You can ask for one hole, an array of specific holes or an array of hole types */
  holes?: Maybe<Array<Maybe<ScorecardHole>>>;
  id: Scalars['ID']['output'];
  /** Total score for hole 10 to 18 */
  inScore?: Maybe<Scalars['Int']['output']>;
  /** The round completed */
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  /** Can the scorecard be edited */
  isEditable?: Maybe<Scalars['Boolean']['output']>;
  /** The scorecard has been edited */
  isEdited?: Maybe<Scalars['Boolean']['output']>;
  /** Is this a scorecard for a team */
  isTeamScorecard?: Maybe<Scalars['Boolean']['output']>;
  /** If the scorecard is a valid part of a tournament */
  isTournamentScore?: Maybe<Scalars['Boolean']['output']>;
  /** The scorecard kind */
  kind?: Maybe<Scalars['String']['output']>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** If the scorecard is a part of a league then return the league */
  league?: Maybe<League>;
  /** If the scorecard is a part of a league then return the league season */
  leagueSeason?: Maybe<LeagueSeason>;
  /** Total number of mulligans */
  mulligans?: Maybe<Scalars['Int']['output']>;
  /** The net score of the currently played holes */
  netScore?: Maybe<Scalars['Int']['output']>;
  /** The number of net strokes up or down compared to par on currently played holes */
  netToPar?: Maybe<Scalars['Int']['output']>;
  /** Played until this hole number */
  numberOfHolesPlayed?: Maybe<Scalars['Int']['output']>;
  /** The number of holes to play */
  numberOfHolesToPlay?: Maybe<Scalars['Int']['output']>;
  /**
   * The other players that played this round together scorecards
   * @deprecated Use PlayersScorecards
   */
  otherPlayersScorecards?: Maybe<Array<Maybe<Scorecard>>>;
  /** Total score for hole 1 to 9 */
  outScore?: Maybe<Scalars['Int']['output']>;
  /** The par of the course */
  par?: Maybe<Scalars['Int']['output']>;
  /** The participants information */
  participants?: Maybe<Array<Maybe<PlayerInfo>>>;
  /** The player information */
  player?: Maybe<PlayerInfo>;
  /** List of Player Scorecard with scoring format */
  playersScorecards?: Maybe<Array<Maybe<Scorecard>>>;
  /** The stableford points of the completed round */
  stablefordPoints?: Maybe<Scalars['Int']['output']>;
  /** The stableford up or down compared to par on currently played holes */
  stablefordToPar?: Maybe<Scalars['Int']['output']>;
  /** The start time of the first played hole */
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Aggregated across played holes */
  stat?: Maybe<ScorecardStat>;
  /** Players of the team */
  teamMembers?: Maybe<Array<Maybe<PlayerInfo>>>;
  /** The teams. Return null if single player teams */
  teams?: Maybe<Array<Maybe<TeamPlayerInfo>>>;
  teeName?: Maybe<Scalars['String']['output']>;
  /** The list of tees for the selected holes */
  tees?: Maybe<Array<Maybe<TeeInfo>>>;
  /** Played until this hole number */
  thruHole?: Maybe<Scalars['Int']['output']>;
  /** The number of gross strokes up or down compared to par on currently played holes */
  toPar?: Maybe<Scalars['Int']['output']>;
  /** The total distance for all holes */
  totalDistance?: Maybe<Scalars['Float']['output']>;
  /** Total Hcp strokes for all selected holes */
  totalHcpStrokes?: Maybe<Scalars['Int']['output']>;
  /** If the scorecard is a part of a tournament then return the tournament */
  tournament?: Maybe<Tournament>;
  /** The status message of the scorecard in the tournament */
  tournamentStatusMessage?: Maybe<Scalars['String']['output']>;
  /** The version of the scorecard data. Currently version 2 and 3 is supported */
  version?: Maybe<Scalars['String']['output']>;
  windMode?: Maybe<WindMode>;
  /**
   * Scorecard with another scoring format
   * @deprecated Use playersScorecards
   */
  withScoringFormat?: Maybe<Scorecard>;
};


/** All scorecard data for a round of golf */
export type ScorecardEventLogsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** All scorecard data for a round of golf */
export type ScorecardFinishedAtArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardGrossScoreArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardHolesArgs = {
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  holeNumbers?: InputMaybe<Array<Scalars['Int']['input']>>;
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardInScoreArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardIsCompletedArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardMulligansArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardNetScoreArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardNetToParArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardNumberOfHolesPlayedArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardOtherPlayersScorecardsArgs = {
  includeCurrentPlayer?: InputMaybe<Scalars['Boolean']['input']>;
};


/** All scorecard data for a round of golf */
export type ScorecardOutScoreArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardPlayersScorecardsArgs = {
  includeCurrentPlayer?: InputMaybe<Scalars['Boolean']['input']>;
  includeOtherPlayers?: InputMaybe<Scalars['Boolean']['input']>;
  scoringFormat?: InputMaybe<GameTypes>;
};


/** All scorecard data for a round of golf */
export type ScorecardStablefordPointsArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardStablefordToParArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardStartedAtArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardThruHoleArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardToParArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardTotalDistanceArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardTotalHcpStrokesArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** All scorecard data for a round of golf */
export type ScorecardWithScoringFormatArgs = {
  scoringFormat: GameTypes;
};

export type ScorecardHole = Node & {
  __typename?: 'ScorecardHole';
  /** Indicate if one or more parts of the data on the ball position is invalid */
  ballPositionValidationData?: Maybe<Array<Maybe<BallPositionValidation>>>;
  /** The length of the hole from the played tee on the scorecard */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The time the hole was finished */
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Got a Gimme */
  gimmeWasGiven?: Maybe<Scalars['Boolean']['output']>;
  /** Green in Regulation: A green is considered hit in regulation if any part of the ball is touching the putting surface while the number of strokes taken is at least two fewer than par */
  greenInRegulation?: Maybe<Scalars['Boolean']['output']>;
  /** Gross score */
  grossScore?: Maybe<Scalars['Int']['output']>;
  /** Has one or more shot video */
  hasVideos?: Maybe<Scalars['Boolean']['output']>;
  /** Hcp strokes */
  hcpStrokes?: Maybe<Scalars['Int']['output']>;
  /** The hole number */
  holeNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** Hole image. The default is the TopView image, but with the argument kind you can get others */
  image?: Maybe<MediaResource>;
  /** List all kinds of hole images */
  images?: Maybe<Array<Maybe<MediaResource>>>;
  /** The hole has been edited */
  isEdited?: Maybe<Scalars['Boolean']['output']>;
  /** Indicate if the hole is played */
  isPlayed: Scalars['Boolean']['output'];
  /** Has the shot videos been hidden by an admin due to inappropriate content */
  isShotVideosHidden?: Maybe<Scalars['Boolean']['output']>;
  /** Match score */
  matchScore?: Maybe<Scalars['Int']['output']>;
  /** Number of Mulligans that was taking */
  mulligans?: Maybe<Scalars['Int']['output']>;
  /** Net Green in Regulation */
  netGreenInRegulation?: Maybe<Scalars['Int']['output']>;
  /** Net score */
  netScore?: Maybe<Scalars['Int']['output']>;
  /** The par of the hole from the played tee on the scorecard */
  par?: Maybe<Scalars['Int']['output']>;
  pinPosition?: Maybe<Position>;
  player?: Maybe<PlayerInfo>;
  /** Putts */
  putts?: Maybe<Scalars['Int']['output']>;
  /** All the shots */
  shots?: Maybe<Array<Maybe<ScorecardShot>>>;
  /** Skins score */
  skinsScore?: Maybe<Scalars['Int']['output']>;
  /** Stableford point */
  stablefordPoint?: Maybe<Scalars['Int']['output']>;
  /** The stroke index of the hole from the played tee on the scorecard */
  strokeIndex?: Maybe<Scalars['Int']['output']>;
  /** The tee that the hole was played from */
  teeName?: Maybe<Scalars['String']['output']>;
  /** List all kinds of hole videos */
  videos?: Maybe<Array<Maybe<MediaResource>>>;
};


export type ScorecardHoleImageArgs = {
  kind?: InputMaybe<Scalars['String']['input']>;
};


export type ScorecardHoleShotsArgs = {
  shotNumbers?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ScorecardMutations = {
  __typename?: 'ScorecardMutations';
  /** Set the hide flag to true for all the videos for the given holes */
  hideVideos?: Maybe<Scalars['Boolean']['output']>;
  /** Remove this scorecard from a tournament */
  removeFromTournament?: Maybe<Scalars['Boolean']['output']>;
  /** Set the hide flag to false for all the videos for the given holes */
  unhideVideos?: Maybe<Scalars['Boolean']['output']>;
  /** Update all properties for this scorecard in one go */
  updateScorecard?: Maybe<Scalars['Boolean']['output']>;
};


export type ScorecardMutationsHideVideosArgs = {
  holes: Array<InputMaybe<Scalars['Int']['input']>>;
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type ScorecardMutationsUnhideVideosArgs = {
  holes: Array<InputMaybe<Scalars['Int']['input']>>;
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type ScorecardMutationsUpdateScorecardArgs = {
  scorecard: UpdatedScorecard;
};

export type ScorecardPlayerItemInput = {
  hcp?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
};

export type ScorecardScoreItemInput = {
  hole: Scalars['PositiveInt']['input'];
  score: Scalars['PositiveInt']['input'];
};

/** Data for a shot on a Scorecard */
export type ScorecardShot = Node & {
  __typename?: 'ScorecardShot';
  /** The position of the point that the shot was aimed at */
  aimPoint?: Maybe<Position>;
  /** The club that was used */
  club?: Maybe<Scalars['String']['output']>;
  /** The position of the ball after a drop */
  dropPosition?: Maybe<Position>;
  /** The lie of the final ball position */
  finalLie?: Maybe<Scalars['String']['output']>;
  /** The final ball position after the shot */
  finalPosition?: Maybe<Position>;
  /** The time the ball was laying still */
  finalTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** The lie the ball was launched from */
  launchLie?: Maybe<Scalars['String']['output']>;
  /** The position the ball was launched from */
  launchPosition?: Maybe<Position>;
  /** The time the ball was launched */
  launchTime?: Maybe<Scalars['DateTime']['output']>;
  measurement?: Maybe<ShotMeasurement>;
  /** The time the ball was flying/rolling */
  movingTimeInSeconds?: Maybe<Scalars['TimeSpan']['output']>;
  /** The shot number. Note: penalty shots is added */
  shotNumber?: Maybe<Scalars['Int']['output']>;
  /** The shot result */
  shotResult?: Maybe<Scalars['String']['output']>;
  /** The number of shots added (penalty shots) */
  shotsToAdd?: Maybe<Scalars['Int']['output']>;
  /** The Total ball flight and roll */
  total?: Maybe<Scalars['Float']['output']>;
  /** The shot videos */
  videos?: Maybe<Array<RecordedHoleVideo>>;
};


/** Data for a shot on a Scorecard */
export type ScorecardShotMeasurementArgs = {
  shotMeasurementKind?: InputMaybe<ShotMeasurementKind>;
};


/** Data for a shot on a Scorecard */
export type ScorecardShotVideosArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<RecordedHoleVideoKind>>;
};

/** Aggregated across played holes */
export type ScorecardStat = {
  __typename?: 'ScorecardStat';
  /** The number of albatrosses */
  albatrosses?: Maybe<Scalars['Int']['output']>;
  /**
   * The average number of putts
   * @deprecated Use averagePuttsPerHoleDecimal
   */
  averagePuttsPerHole?: Maybe<Scalars['Int']['output']>;
  /** The average number of putts */
  averagePuttsPerHoleDecimal?: Maybe<Scalars['Decimal']['output']>;
  /** The number of birdies */
  birdies?: Maybe<Scalars['Int']['output']>;
  /** The number of bogeys */
  bogeys?: Maybe<Scalars['Int']['output']>;
  /** The number of double bogeys */
  doubleBogeys?: Maybe<Scalars['Int']['output']>;
  /** The average of all drives */
  driveAverage?: Maybe<Scalars['Float']['output']>;
  /** The total number of drives */
  driveCount?: Maybe<Scalars['Int']['output']>;
  /** The longest drive */
  driveMax?: Maybe<Scalars['Float']['output']>;
  /** The sum of all drives */
  driveTotal?: Maybe<Scalars['Float']['output']>;
  /** The number of eagles */
  eagles?: Maybe<Scalars['Int']['output']>;
  /** The number of eagles or better */
  eaglesOrBetter?: Maybe<Scalars['Int']['output']>;
  /** The number of drives that hit fairway */
  fairwayHitFairway?: Maybe<Scalars['Int']['output']>;
  /** The number of drives that hit left of the fairway */
  fairwayHitLeft?: Maybe<Scalars['Int']['output']>;
  /** The number of drives that hit right of the fairway */
  fairwayHitRight?: Maybe<Scalars['Int']['output']>;
  /** The number of times the player hit green in regulation */
  greenInRegulation?: Maybe<Scalars['Int']['output']>;
  /** The highest ball speed */
  highestBallSpeed?: Maybe<Scalars['Float']['output']>;
  /** The number of putts */
  numberOfPutts?: Maybe<Scalars['Int']['output']>;
  /** The number of pars */
  pars?: Maybe<Scalars['Int']['output']>;
  /** The number of scrambles. A scramble is when a player misses the green in regulation but still makes par or better */
  scrambles?: Maybe<Scalars['Int']['output']>;
  /** The number of triple bogeys or worse */
  tripleBogeysOrWorse?: Maybe<Scalars['Int']['output']>;
};


/** Aggregated across played holes */
export type ScorecardStatDriveAverageArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatDriveCountArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatDriveMaxArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatDriveTotalArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatFairwayHitFairwayArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatFairwayHitLeftArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatFairwayHitRightArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatGreenInRegulationArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};


/** Aggregated across played holes */
export type ScorecardStatHighestBallSpeedArgs = {
  holeTypes?: InputMaybe<HolesToPlay>;
};

export type ScorecardTemplate = {
  __typename?: 'ScorecardTemplate';
  courseHcp?: Maybe<Scalars['Int']['output']>;
  holes?: Maybe<Array<Maybe<HoleTemplate>>>;
  par?: Maybe<Scalars['Int']['output']>;
  teeName?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalHcpStrokes?: Maybe<Scalars['Int']['output']>;
};

/** A segment of a collection. */
export type ScorecardTypeCollectionSegment = {
  __typename?: 'ScorecardTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Scorecard>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ScreenRecordingDetails = {
  __typename?: 'ScreenRecordingDetails';
  enabled: Scalars['Boolean']['output'];
};

export type ScreencastActivity = Node & PlayerActivity & {
  __typename?: 'ScreencastActivity';
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  subject?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  videoUrl?: Maybe<Scalars['URL']['output']>;
};

/** Search fields */
export enum SearchByEnum {
  /** Search by account id */
  AccountId = 'accountId',
  /** Search by email */
  Email = 'email',
  /** Search by full name */
  FullName = 'fullName',
  /** Search by person id */
  Id = 'id',
  /** Search by player name */
  PlayerName = 'playerName'
}

export type SearchMembershipsInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['NonEmptyString']['input']>>;
  ignoreExpired?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['String']['input']>;
  modifiedSince?: InputMaybe<Scalars['DateTime']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};

export type SearchPersonInfo = {
  __typename?: 'SearchPersonInfo';
  /** friend */
  friend?: Maybe<Friendship>;
  /** Information available for this person */
  person?: Maybe<PersonInfo>;
  /** Teams for this person */
  teams?: Maybe<SearchPersonInfoTeamCollectionCollectionSegment>;
};


export type SearchPersonInfoTeamsArgs = {
  eventId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type SearchPersonInfoTeamCollectionCollectionSegment = {
  __typename?: 'SearchPersonInfoTeamCollectionCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TeamInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type SearchPersonInfoTypeCollectionSegment = {
  __typename?: 'SearchPersonInfoTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<SearchPersonInfo>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

/** The different kinds of a league season activity */
export enum SeasonActivityEventType {
  BullsEyeTournamentActivity = 'BULLS_EYE_TOURNAMENT_ACTIVITY',
  ClosestToPinTournamentActivity = 'CLOSEST_TO_PIN_TOURNAMENT_ACTIVITY',
  CoursePlayTournamentActivity = 'COURSE_PLAY_TOURNAMENT_ACTIVITY',
  LongestDriveTournamentActivity = 'LONGEST_DRIVE_TOURNAMENT_ACTIVITY',
  PuttPuttTournamentActivity = 'PUTT_PUTT_TOURNAMENT_ACTIVITY',
  ShuffleBullsEyeTournamentActivity = 'SHUFFLE_BULLS_EYE_TOURNAMENT_ACTIVITY'
}

export type SeasonBaseActivityInterface = {
  /** Database identifier */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The activity id */
  id: Scalars['ID']['output'];
  /** leaderboard definitions of the activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  /** The activity version info */
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};

export type SeasonBaseActivityMutationInterface = {
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name of the activity */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
};


export type SeasonBaseActivityMutationInterfaceChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


export type SeasonBaseActivityMutationInterfaceChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type SeasonBaseActivityMutationInterfaceDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeasonBullsEyeActivity = Node & SeasonBaseActivityInterface & SeasonTournamentActivityInterface & {
  __typename?: 'SeasonBullsEyeActivity';
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** leaderboard for the activity */
  leaderboard?: Maybe<SeasonBullsEyeActivityLeaderboard>;
  /** leaderboard definitions of a season activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonBullsEyeActivityLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type SeasonBullsEyeActivityParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonBullsEyeActivityLeaderboard = {
  __typename?: 'SeasonBullsEyeActivityLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<BullsEyeLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonBullsEyeActivityLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonBullsEyeActivityLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Mutations on a league season bullseye activity */
export type SeasonBullsEyeActivityMutation = SeasonBaseActivityMutationInterface & SeasonTournamentActivityMutationsInterface & {
  __typename?: 'SeasonBullsEyeActivityMutation';
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


/** Mutations on a league season bullseye activity */
export type SeasonBullsEyeActivityMutationChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


/** Mutations on a league season bullseye activity */
export type SeasonBullsEyeActivityMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season bullseye activity */
export type SeasonBullsEyeActivityMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season bullseye activity */
export type SeasonBullsEyeActivityMutationRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


/** Mutations on a league season bullseye activity */
export type SeasonBullsEyeActivityMutationSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

export type SeasonClosestToPinActivity = Node & SeasonBaseActivityInterface & SeasonTournamentActivityInterface & {
  __typename?: 'SeasonClosestToPinActivity';
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** leaderboard for the activity */
  leaderboard?: Maybe<SeasonClosestToPinActivityLeaderboard>;
  /** leaderboard definitions of a season activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonClosestToPinActivityLeaderboardArgs = {
  holeNumber?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type SeasonClosestToPinActivityParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonClosestToPinActivityLeaderboard = {
  __typename?: 'SeasonClosestToPinActivityLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<ClosestToPinLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonClosestToPinActivityLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonClosestToPinActivityLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutation = SeasonBaseActivityMutationInterface & SeasonTournamentActivityMutationsInterface & {
  __typename?: 'SeasonClosestToPinActivityMutation';
  /** Change allow multiple attempts */
  changeAllowMultipleAttempts?: Maybe<SeasonBaseActivityInterface>;
  /** Change the number of attempts for this activity */
  changeAttempts?: Maybe<SeasonBaseActivityInterface>;
  /** Change the course */
  changeCourse?: Maybe<SeasonBaseActivityInterface>;
  /** change the female tee */
  changeFemaleTee?: Maybe<SeasonBaseActivityInterface>;
  /** change the green firmness */
  changeGreen?: Maybe<SeasonBaseActivityInterface>;
  /** change the green stimp */
  changeGreenStimp?: Maybe<SeasonBaseActivityInterface>;
  /** change the selected holes */
  changeHoles?: Maybe<SeasonBaseActivityInterface>;
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the lighting */
  changeLighting?: Maybe<SeasonBaseActivityInterface>;
  /** change the male tee */
  changeMaleTee?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** change the pin difficulty */
  changePinDifficulty?: Maybe<SeasonBaseActivityInterface>;
  /** change the wind course */
  changeWind?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeAllowMultipleAttemptsArgs = {
  allowMultipleAttempts?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeAttemptsArgs = {
  attempts: Scalars['Int']['input'];
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeCourseArgs = {
  course: Scalars['String']['input'];
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeFemaleTeeArgs = {
  femaleTee: Scalars['String']['input'];
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeGreenArgs = {
  green: Firmness;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeGreenStimpArgs = {
  stimp: Stimp;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeHolesArgs = {
  holes?: InputMaybe<Array<InputMaybe<Scalars['NonNegativeInt']['input']>>>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeLightingArgs = {
  lighting: Lighting;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeMaleTeeArgs = {
  maleTee: Scalars['String']['input'];
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangePinDifficultyArgs = {
  pinDifficulty?: InputMaybe<Pin>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationChangeWindArgs = {
  wind: WindMode;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


/** Mutations on a league season closest to pin activity */
export type SeasonClosestToPinActivityMutationSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

export type SeasonCourseActivity = Node & SeasonBaseActivityInterface & SeasonTournamentActivityInterface & {
  __typename?: 'SeasonCourseActivity';
  /** Progress query call for adding a scorecard manually */
  addScorecardProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** leaderboard for the activity */
  leaderboard?: Maybe<SeasonCourseActivityLeaderboard>;
  /** leaderboard definitions of a season activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  oomPointsDistributionTable?: Maybe<DistributionTable>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonCourseActivityAddScorecardProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type SeasonCourseActivityLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type SeasonCourseActivityOomPointsDistributionTableArgs = {
  numberOfParticipants?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonCourseActivityParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonCourseActivityLeaderboard = {
  __typename?: 'SeasonCourseActivityLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<LeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonCourseActivityLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonCourseActivityLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutation = SeasonBaseActivityMutationInterface & SeasonTournamentActivityMutationsInterface & {
  __typename?: 'SeasonCourseActivityMutation';
  /** Create a new scorecard */
  addScorecard?: Maybe<Array<Maybe<Scorecard>>>;
  /**
   * change the number of attempts
   * @deprecated Use changeSeasonTournamentActivityNumberOfAttempts mutation
   */
  changeAttempts?: Maybe<SeasonBaseActivityInterface>;
  /** Change the course */
  changeCourse?: Maybe<SeasonBaseActivityInterface>;
  /** change the fairway firmness */
  changeFairway?: Maybe<SeasonBaseActivityInterface>;
  /**
   * change the female tee
   * @deprecated Use changeSeasonTournamentActivityTee mutation
   */
  changeFemaleTee?: Maybe<SeasonBaseActivityInterface>;
  /** change the game format */
  changeGameFormat?: Maybe<SeasonBaseActivityInterface>;
  /** change the game type */
  changeGameType?: Maybe<SeasonBaseActivityInterface>;
  /** change the gimme distance */
  changeGimmeDistance?: Maybe<SeasonBaseActivityInterface>;
  /** change the green firmness */
  changeGreen?: Maybe<SeasonBaseActivityInterface>;
  /** change the green stimp */
  changeGreenStimp?: Maybe<SeasonBaseActivityInterface>;
  /**
   * change the holes to play
   * @deprecated Use changeSeasonTournamentActivityHoles mutation
   */
  changeHolesToPlay?: Maybe<SeasonBaseActivityInterface>;
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the lighting */
  changeLighting?: Maybe<SeasonBaseActivityInterface>;
  /**
   * change the male tee
   * @deprecated Use changeSeasonTournamentActivityTee mutation
   */
  changeMaleTee?: Maybe<SeasonBaseActivityInterface>;
  /** change the mulligans settings */
  changeMulligansSettings?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** change the pin difficulty */
  changePinDifficulty?: Maybe<SeasonBaseActivityInterface>;
  /** change the putting mode */
  changePuttingMode?: Maybe<SeasonBaseActivityInterface>;
  /** change the team size */
  changeTeamSize?: Maybe<SeasonBaseActivityInterface>;
  /** change the wind course wind */
  changeWind?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationAddScorecardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  scorecard: Array<InputMaybe<AddScorecardInput>>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeAttemptsArgs = {
  attempts: Scalars['NonNegativeInt']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeCourseArgs = {
  course: Scalars['String']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeFairwayArgs = {
  fairway: Firmness;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeFemaleTeeArgs = {
  femaleTee: Scalars['String']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeGameFormatArgs = {
  gameFormat: GameFormats;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeGameTypeArgs = {
  gameType: GameTypes;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeGimmeDistanceArgs = {
  gimmeDistance: Scalars['Float']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeGreenArgs = {
  green: Firmness;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeGreenStimpArgs = {
  stimp: Stimp;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeHolesToPlayArgs = {
  holesToPlay: HolesToPlay;
  specifiedHoles?: InputMaybe<Array<InputMaybe<Scalars['NonNegativeInt']['input']>>>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeLightingArgs = {
  lighting: Lighting;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeMaleTeeArgs = {
  maleTee: Scalars['String']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeMulligansSettingsArgs = {
  mulligans: Mulligans;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangePinDifficultyArgs = {
  pinDifficulty?: InputMaybe<Pin>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangePuttingModeArgs = {
  puttingMode: PuttMode;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeTeamSizeArgs = {
  teamSize: Scalars['Int']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationChangeWindArgs = {
  wind: WindMode;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


/** Mutations on a league season event order of merit activity */
export type SeasonCourseActivityMutationSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

export type SeasonEvent = MediaAssetsInterface & Node & {
  __typename?: 'SeasonEvent';
  /** the activities of the league season event */
  activities: Array<Maybe<SeasonBaseActivityInterface>>;
  /** Database identifier */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The end time of the league season event */
  endTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The leaderboard for the event */
  leaderboard?: Maybe<LeagueEventLeaderboard>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the league season event */
  name?: Maybe<Scalars['String']['output']>;
  /** The start time of the league season event */
  startTime: Scalars['DateTime']['output'];
  /** State of the event */
  state?: Maybe<SeasonEventStatus>;
};


export type SeasonEventLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Mutations on a league season event */
export type SeasonEventMutation = {
  __typename?: 'SeasonEventMutation';
  /** Update the end time of the league season event */
  changeEndTime?: Maybe<SeasonEvent>;
  /** Update the name of the league season event */
  changeName?: Maybe<SeasonEvent>;
  /** Update the start time of the league season event */
  changeStartTime?: Maybe<SeasonEvent>;
  /** Create an activity for the league season event */
  createActivity?: Maybe<SeasonBaseActivityInterface>;
  /** Delete the league season event */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** End the event immediately */
  endEvent?: Maybe<SeasonEvent>;
};


/** Mutations on a league season event */
export type SeasonEventMutationChangeEndTimeArgs = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a league season event */
export type SeasonEventMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season event */
export type SeasonEventMutationChangeStartTimeArgs = {
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a league season event */
export type SeasonEventMutationCreateActivityArgs = {
  activity?: InputMaybe<CreateSeasonActivityInput>;
};


/** Mutations on a league season event */
export type SeasonEventMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};

/** the enum indicating the state of the season event */
export enum SeasonEventStatus {
  Finished = 'FINISHED',
  Live = 'LIVE',
  Upcoming = 'UPCOMING'
}

export type SeasonLeaderboardDefinition = {
  __typename?: 'SeasonLeaderboardDefinition';
  /** The leaderboard parameters of a oom activity */
  oomParameters?: Maybe<LeaderboardParameters>;
};

/** Mutations on a league season location */
export type SeasonLocationMutation = {
  __typename?: 'SeasonLocationMutation';
  /** Add a location to a season */
  add?: Maybe<LeagueSeason>;
  /** Change the max participants of the location config of the league season */
  changeMaxParticipants?: Maybe<LeagueSeason>;
  /** Change the payment configuration for this location on this season */
  changePaymentConfiguration?: Maybe<LeagueSeason>;
  /** Delete the location restriction of the league season */
  remove?: Maybe<LeagueSeason>;
};


/** Mutations on a league season location */
export type SeasonLocationMutationChangeMaxParticipantsArgs = {
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a league season location */
export type SeasonLocationMutationChangePaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['NonNegativeInt']['input']>>>;
};

export type SeasonLongestDriveActivity = Node & SeasonBaseActivityInterface & SeasonTournamentActivityInterface & {
  __typename?: 'SeasonLongestDriveActivity';
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** leaderboard for the activity */
  leaderboard?: Maybe<SeasonLongestDriveActivityLeaderboard>;
  /** leaderboard definitions of a season activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonLongestDriveActivityLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type SeasonLongestDriveActivityParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonLongestDriveActivityLeaderboard = {
  __typename?: 'SeasonLongestDriveActivityLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<LongestDriveLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonLongestDriveActivityLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonLongestDriveActivityLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutation = SeasonBaseActivityMutationInterface & SeasonTournamentActivityMutationsInterface & {
  __typename?: 'SeasonLongestDriveActivityMutation';
  /** Change if the activity's tournament allow multiple attempts */
  changeAllowMultipleAttempts?: Maybe<SeasonBaseActivityInterface>;
  /** Change the difficulty */
  changeDifficulty?: Maybe<SeasonBaseActivityInterface>;
  /** Change the firmness of the fairway */
  changeFairwayFirmness?: Maybe<SeasonBaseActivityInterface>;
  /** Change the fairway width */
  changeFairwayWidth?: Maybe<SeasonBaseActivityInterface>;
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** Change the number of shots */
  changeShotsPerRound?: Maybe<SeasonBaseActivityInterface>;
  /** Change the time limit */
  changeTimeLimit?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeAllowMultipleAttemptsArgs = {
  allowMultipleAttempts?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeDifficultyArgs = {
  difficulty: LongestDriveTournamentDifficulty;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeFairwayFirmnessArgs = {
  fairwayFirmness: Firmness;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeFairwayWidthArgs = {
  fairwayWidth: Scalars['Int']['input'];
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeShotsPerRoundArgs = {
  shots: Scalars['Int']['input'];
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationChangeTimeLimitArgs = {
  timeLimit: Scalars['TimeSpan']['input'];
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


/** Mutations on a league season longest drive activity */
export type SeasonLongestDriveActivityMutationSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

export type SeasonPuttPuttActivity = Node & SeasonBaseActivityInterface & SeasonTournamentActivityInterface & {
  __typename?: 'SeasonPuttPuttActivity';
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** leaderboard for the activity */
  leaderboard?: Maybe<SeasonPuttPuttActivityLeaderboard>;
  /** leaderboard definitions of a season activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonPuttPuttActivityLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type SeasonPuttPuttActivityParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonPuttPuttActivityLeaderboard = {
  __typename?: 'SeasonPuttPuttActivityLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<LeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonPuttPuttActivityLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonPuttPuttActivityLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Mutations on a league season putt putt activity */
export type SeasonPuttPuttActivityMutation = SeasonBaseActivityMutationInterface & SeasonTournamentActivityMutationsInterface & {
  __typename?: 'SeasonPuttPuttActivityMutation';
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


/** Mutations on a league season putt putt activity */
export type SeasonPuttPuttActivityMutationChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


/** Mutations on a league season putt putt activity */
export type SeasonPuttPuttActivityMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season putt putt activity */
export type SeasonPuttPuttActivityMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season putt putt activity */
export type SeasonPuttPuttActivityMutationRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


/** Mutations on a league season putt putt activity */
export type SeasonPuttPuttActivityMutationSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

export type SeasonShuffleBullsEyeActivity = Node & SeasonBaseActivityInterface & SeasonTournamentActivityInterface & {
  __typename?: 'SeasonShuffleBullsEyeActivity';
  dbId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** leaderboard for the activity */
  leaderboard?: Maybe<SeasonShuffleBullsEyeActivityLeaderboard>;
  /** leaderboard definitions of a season activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonShuffleBullsEyeActivityLeaderboardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type SeasonShuffleBullsEyeActivityParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonShuffleBullsEyeActivityLeaderboard = {
  __typename?: 'SeasonShuffleBullsEyeActivityLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<ShuffleBullsEyeLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<LeagueSeasonLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonShuffleBullsEyeActivityLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonShuffleBullsEyeActivityLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** Mutations on a league season shuffle bullseye activity */
export type SeasonShuffleBullsEyeActivityMutation = SeasonBaseActivityMutationInterface & SeasonTournamentActivityMutationsInterface & {
  __typename?: 'SeasonShuffleBullsEyeActivityMutation';
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


/** Mutations on a league season shuffle bullseye activity */
export type SeasonShuffleBullsEyeActivityMutationChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


/** Mutations on a league season shuffle bullseye activity */
export type SeasonShuffleBullsEyeActivityMutationChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a league season shuffle bullseye activity */
export type SeasonShuffleBullsEyeActivityMutationDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a league season shuffle bullseye activity */
export type SeasonShuffleBullsEyeActivityMutationRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


/** Mutations on a league season shuffle bullseye activity */
export type SeasonShuffleBullsEyeActivityMutationSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

export type SeasonTournamentActivityInterface = {
  /** Database identifier */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The activity id */
  id: Scalars['ID']['output'];
  /** leaderboard definitions of the activity */
  leaderboardDefinitions?: Maybe<Array<Maybe<SeasonLeaderboardDefinition>>>;
  /** The name */
  name?: Maybe<Scalars['String']['output']>;
  /** Participant progress in the season tournament activity */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The underlying tournament for the activity */
  tournament?: Maybe<Tournament>;
  /** The activity type */
  type?: Maybe<SeasonActivityEventType>;
  /** The activity version info */
  versionInfo?: Maybe<VersionInfoBaseHelperOfSeasonActivity>;
};


export type SeasonTournamentActivityInterfaceParticipantProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['String']['input']>>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeasonTournamentActivityMutationsInterface = {
  /** Change the leaderboard definitions of a season activity */
  changeLeaderboardDefinitions?: Maybe<SeasonBaseActivityInterface>;
  /** Change the name of the activity */
  changeName?: Maybe<SeasonBaseActivityInterface>;
  /** Delete league season activity */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove a sponsor */
  removeSponsor?: Maybe<SeasonBaseActivityInterface>;
  /** Set a sponsor */
  setSponsor?: Maybe<SeasonBaseActivityInterface>;
};


export type SeasonTournamentActivityMutationsInterfaceChangeLeaderboardDefinitionsArgs = {
  leaderboardDefinitions?: InputMaybe<Array<InputMaybe<ChangeSeasonActivityLeaderboardDefinitionInput>>>;
};


export type SeasonTournamentActivityMutationsInterfaceChangeNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type SeasonTournamentActivityMutationsInterfaceDeleteArgs = {
  deleteFromDatabase?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeasonTournamentActivityMutationsInterfaceRemoveSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};


export type SeasonTournamentActivityMutationsInterfaceSetSponsorArgs = {
  sponsorId: Scalars['ID']['input'];
};

/** A section on a driving range */
export type Section = Node & {
  __typename?: 'Section';
  dbId?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** The location the bay is located in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the section */
  name?: Maybe<Scalars['String']['output']>;
  /** The site the entity belongs to */
  site: RangeSite;
  /** The ID of the site the entity belongs to */
  siteId: Scalars['ID']['output'];
};

export type SectionFilter = {
  /** Filter by one or more Ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Sort options for searching sections */
export type SectionSortInput = {
  name?: InputMaybe<SortEnumType>;
};

export type SelectAllBaysForAllTournamentLocationsError = CanOnlyChangeBaySelectionForGuestTournamentError | DefaultError | EntityNotFoundError;

export type SelectAllBaysForAllTournamentLocationsInput = {
  id: Scalars['ID']['input'];
};

export type SelectAllBaysForAllTournamentLocationsPayload = {
  __typename?: 'SelectAllBaysForAllTournamentLocationsPayload';
  errors?: Maybe<Array<SelectAllBaysForAllTournamentLocationsError>>;
  tournament?: Maybe<Tournament>;
};

export type SelectAllBaysForTournamentLocationsError = CanOnlyChangeBaySelectionForGuestTournamentError | DefaultError | EntityNotFoundError;

export type SelectAllBaysForTournamentLocationsInput = {
  id: Scalars['ID']['input'];
  locationIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type SelectAllBaysForTournamentLocationsPayload = {
  __typename?: 'SelectAllBaysForTournamentLocationsPayload';
  errors?: Maybe<Array<SelectAllBaysForTournamentLocationsError>>;
  tournament?: Maybe<Tournament>;
};

export type SelectBaysForTournamentError = CanOnlyChangeBaySelectionForGuestTournamentError | DefaultError | EntityNotFoundError;

export type SelectBaysForTournamentInput = {
  bayIds: Array<InputMaybe<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
};

export type SelectBaysForTournamentPayload = {
  __typename?: 'SelectBaysForTournamentPayload';
  errors?: Maybe<Array<SelectBaysForTournamentError>>;
  tournament?: Maybe<Tournament>;
};

export type SendAppScriptToBayInput = {
  /** The ids of the bays to sent the app script */
  bayIds: Array<InputMaybe<Scalars['ID']['input']>>;
  /** Name of the script - can be excluded. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the app script - can be excluded if a url is supplied. */
  script?: InputMaybe<Scalars['String']['input']>;
  /** A url to a file containing the app script - can be excluded if a script is supplied */
  scriptUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type SendAppScriptToBayPayload = {
  __typename?: 'SendAppScriptToBayPayload';
  result?: Maybe<Scalars['Boolean']['output']>;
};

export type SendMeNotificationError = DefaultError;

export type SendMeNotificationInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['Any']['input']>;
  messageKey?: InputMaybe<Scalars['String']['input']>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SendMeNotificationPayload = {
  __typename?: 'SendMeNotificationPayload';
  boolean?: Maybe<Scalars['Boolean']['output']>;
  errors?: Maybe<Array<SendMeNotificationError>>;
};

export type SendMessageToBaysError = ConnectionNotFoundError | DefaultError | MissingMandatoryFieldError | ReceiversNotFoundError;

export type SendMessageToBaysInput = {
  autoDismissDurationInSeconds?: Scalars['Int']['input'];
  bayIds: Array<Scalars['ID']['input']>;
  message: Scalars['String']['input'];
};

export type SendMessageToBaysPayload = {
  __typename?: 'SendMessageToBaysPayload';
  errors?: Maybe<Array<SendMessageToBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export type SendUserEmailConfirmationError = DefaultError;

export type SendUserEmailConfirmationPayload = {
  __typename?: 'SendUserEmailConfirmationPayload';
  errors?: Maybe<Array<SendUserEmailConfirmationError>>;
  profile?: Maybe<Profile>;
};

export type SendUserPhoneNumberConfirmationError = DefaultError | InvalidPhoneNumberError | InvalidPhoneVerificationCodeError | MissingMandatoryFieldError | PhoneNumberIsAlreadyVerifiedError | PhoneVerificationCodeAlreadySentError | UnauthorizedError | UserIsLockedOutError;

export type SendUserPhoneNumberConfirmationInput = {
  phoneNumber: Scalars['NonEmptyString']['input'];
};

export type SendUserPhoneNumberConfirmationPayload = {
  __typename?: 'SendUserPhoneNumberConfirmationPayload';
  errors?: Maybe<Array<SendUserPhoneNumberConfirmationError>>;
  result?: Maybe<AppMutationResult>;
};

export type ServiceAccount = {
  __typename?: 'ServiceAccount';
  /** List of applications */
  applications?: Maybe<Array<Maybe<Application>>>;
  /** Email of the account */
  email?: Maybe<Scalars['String']['output']>;
  /** Id of the account */
  id?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type ServiceAccountPayloadTypeCollectionSegment = {
  __typename?: 'ServiceAccountPayloadTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ServiceAccount>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type SessionActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'SessionActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  sessionId?: Maybe<Scalars['String']['output']>;
  strokeCount: Scalars['Int']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type SessionActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SessionActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  maxTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  maxTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
};

export type SessionActivityInterface = {
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  /** The activity id */
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  strokes?: Maybe<Array<Stroke>>;
  /** The date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type SessionActivityInterfaceAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SessionActivityInterfaceStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
};

export type SetBaysApplicationPropertiesError = DefaultError | DuplicateRecordError | MissingMandatoryFieldError | UnauthorizedError;

export type SetBaysApplicationPropertiesInput = {
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>>>;
  application: Scalars['String']['input'];
  bayIds: Array<Scalars['ID']['input']>;
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SetBaysApplicationPropertiesPayload = {
  __typename?: 'SetBaysApplicationPropertiesPayload';
  errors?: Maybe<Array<SetBaysApplicationPropertiesError>>;
  result?: Maybe<AppMutationResult>;
};

export type SetNetNotificationConfigurationError = DefaultError | NetConfigurationInvalidError | UnauthorizedError;

export type SetNetNotificationConfigurationInput = {
  locationId: Scalars['ID']['input'];
  rules: Array<StaffNotifications>;
};

export type SetNetNotificationConfigurationPayload = {
  __typename?: 'SetNetNotificationConfigurationPayload';
  configuration?: Maybe<NetNotificationConfiguration>;
  errors?: Maybe<Array<SetNetNotificationConfigurationError>>;
};

export type SetNumericUserPropertyMaxValueError = ConcurrencyViolationError | DefaultError | InvalidDataTypeError | MissingMandatoryFieldError;

export type SetNumericUserPropertyMaxValueInput = {
  application: Scalars['String']['input'];
  propertyKey: Scalars['String']['input'];
  value: Scalars['Float']['input'];
};

export type SetNumericUserPropertyMaxValuePayload = {
  __typename?: 'SetNumericUserPropertyMaxValuePayload';
  errors?: Maybe<Array<SetNumericUserPropertyMaxValueError>>;
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
};

export type SetNumericUserPropertyMinValueError = ConcurrencyViolationError | DefaultError | InvalidDataTypeError | MissingMandatoryFieldError;

export type SetNumericUserPropertyMinValueInput = {
  application: Scalars['String']['input'];
  propertyKey: Scalars['String']['input'];
  value: Scalars['Float']['input'];
};

export type SetNumericUserPropertyMinValuePayload = {
  __typename?: 'SetNumericUserPropertyMinValuePayload';
  errors?: Maybe<Array<SetNumericUserPropertyMinValueError>>;
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
};

export type SetOriginPointError = ConfigurationNotModifiableError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type SetOriginPointInput = {
  siteId: Scalars['ID']['input'];
  worldCoordinate: WorldCoord;
};

export type SetOriginPointPayload = {
  __typename?: 'SetOriginPointPayload';
  errors?: Maybe<Array<SetOriginPointError>>;
  result?: Maybe<AppMutationResult>;
};

export type SetReferencePointError = ConfigurationNotModifiableError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type SetReferencePointInput = {
  siteId: Scalars['ID']['input'];
  worldCoordinate: WorldCoord;
};

export type SetReferencePointPayload = {
  __typename?: 'SetReferencePointPayload';
  errors?: Maybe<Array<SetReferencePointError>>;
  result?: Maybe<AppMutationResult>;
};

export type SetUserPropertiesError = DefaultError | DuplicateRecordError | MissingMandatoryFieldError | UnauthorizedError;

export type SetUserPropertiesInput = {
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>>>;
  application: Scalars['String']['input'];
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SetUserPropertiesPayload = {
  __typename?: 'SetUserPropertiesPayload';
  errors?: Maybe<Array<SetUserPropertiesError>>;
  properties?: Maybe<Array<Maybe<ApplicationPropertySetting>>>;
};

export type ShareUserPlayedRoundsError = DefaultError;

export type ShareUserPlayedRoundsInput = {
  share: Scalars['Boolean']['input'];
};

export type ShareUserPlayedRoundsPayload = {
  __typename?: 'ShareUserPlayedRoundsPayload';
  errors?: Maybe<Array<ShareUserPlayedRoundsError>>;
  profile?: Maybe<Profile>;
};

export type ShotAnalysisSessionActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'ShotAnalysisSessionActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  reportLink?: Maybe<Scalars['URL']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  strokeCount: Scalars['Int']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type ShotAnalysisSessionActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ShotAnalysisSessionActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  maxTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  maxTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
};

export type ShotMeasurement = {
  __typename?: 'ShotMeasurement';
  /** The angle of attack of the club */
  attackAngle?: Maybe<Scalars['Float']['output']>;
  /** The time taken to complete the backswing */
  backswingTime?: Maybe<Scalars['Float']['output']>;
  /** The speed of the ball when it was hit */
  ballSpeed?: Maybe<Scalars['Float']['output']>;
  /** The number of bounces the ball took */
  bounces?: Maybe<Scalars['Float']['output']>;
  /** The break of the green */
  break?: Maybe<Scalars['Float']['output']>;
  /** The distance the ball was carried in the air before it hit the ground */
  carry?: Maybe<Scalars['Float']['output']>;
  /** The actual carry distance */
  carryActual?: Maybe<Scalars['Float']['output']>;
  /** The side distance of the carry relative to the target line */
  carrySide?: Maybe<Scalars['Float']['output']>;
  /** The actual side distance */
  carrySideActual?: Maybe<Scalars['Float']['output']>;
  /** The path of the club */
  clubPath?: Maybe<Scalars['Float']['output']>;
  /** The speed of the club */
  clubSpeed?: Maybe<Scalars['Float']['output']>;
  /** The curve of the shot */
  curve?: Maybe<Scalars['Float']['output']>;
  /** The actual curve of the shot */
  curveActual?: Maybe<Scalars['Float']['output']>;
  /** The tilt of the D plane */
  dPlaneTilt?: Maybe<Scalars['Float']['output']>;
  /** The distance from the ball carry landing position to the pin */
  distanceFromPin?: Maybe<Scalars['Float']['output']>;
  /** The distance from the ball total landing position to the pin */
  distanceFromPinTotal?: Maybe<Scalars['Float']['output']>;
  /** The lie of the club at impact */
  dynamicLie?: Maybe<Scalars['Float']['output']>;
  /** The dynamic loft of the club */
  dynamicLoft?: Maybe<Scalars['Float']['output']>;
  /** The effective stimp of the green */
  effectiveStimp?: Maybe<Scalars['Float']['output']>;
  /** The elevation of the shot */
  elevation?: Maybe<Scalars['Float']['output']>;
  /** The distance the ball traveled at entry speed */
  entrySpeedDistance?: Maybe<Scalars['Float']['output']>;
  /** The angle of the club face */
  faceAngle?: Maybe<Scalars['Float']['output']>;
  /** The angle between the club face and the club path */
  faceToPath?: Maybe<Scalars['Float']['output']>;
  /** The flat stimp of the green */
  flatStimp?: Maybe<Scalars['Float']['output']>;
  /** The time taken to complete the forward swing */
  forwardswingTime?: Maybe<Scalars['Float']['output']>;
  /** The gyro spin angle of the shot */
  gyroSpinAngle?: Maybe<Scalars['Float']['output']>;
  /** The hang time of the shot */
  hangTime?: Maybe<Scalars['Float']['output']>;
  /** The height of the impact point above the ground */
  impactHeight?: Maybe<Scalars['Float']['output']>;
  /** The offset of the impact point from the center of the club face */
  impactOffset?: Maybe<Scalars['Float']['output']>;
  /** The angle of the landing */
  landingAngle?: Maybe<Scalars['Float']['output']>;
  /** The actual landing angle */
  landingAngleActual?: Maybe<Scalars['Float']['output']>;
  /** The height of the landing */
  landingHeight?: Maybe<Scalars['Float']['output']>;
  /** The last data point recorded for the ball's flight */
  lastData?: Maybe<Scalars['Float']['output']>;
  /** The angle at which the ball was launched */
  launchAngle?: Maybe<Scalars['Float']['output']>;
  /** The direction in which the ball was launched */
  launchDirection?: Maybe<Scalars['Float']['output']>;
  /** The distance to the low point of the swing */
  lowPointDistance?: Maybe<Scalars['Float']['output']>;
  /** The height of the low point of the swing */
  lowPointHeight?: Maybe<Scalars['Float']['output']>;
  /** The side distance to the low point of the swing */
  lowPointSide?: Maybe<Scalars['Float']['output']>;
  /** The maximum height reached by the ball */
  maxHeight?: Maybe<Scalars['Float']['output']>;
  /** The deceleration of the ball after impact */
  rollDeceleration?: Maybe<Scalars['Float']['output']>;
  /** The percentage of the ball's distance that was roll */
  rollPercentage?: Maybe<Scalars['Float']['output']>;
  /** The speed of the ball after impact */
  rollSpeed?: Maybe<Scalars['Float']['output']>;
  /** The side distance */
  side?: Maybe<Scalars['Float']['output']>;
  /** The distance the ball skidded after impact */
  skidDistance?: Maybe<Scalars['Float']['output']>;
  /** The rise slope percentage */
  slopePercentageRise?: Maybe<Scalars['Float']['output']>;
  /** The side slope percentage */
  slopePercentageSide?: Maybe<Scalars['Float']['output']>;
  /** The smash factor of the shot */
  smashFactor?: Maybe<Scalars['Float']['output']>;
  /** The drop in speed after impact */
  speedDrop?: Maybe<Scalars['Float']['output']>;
  /** The axis on which the ball is spinning */
  spinAxis?: Maybe<Scalars['Float']['output']>;
  /** The actual spin axis */
  spinAxisActual?: Maybe<Scalars['Float']['output']>;
  /** The spin loft of the shot */
  spinLoft?: Maybe<Scalars['Float']['output']>;
  /** The rate of spin on the ball */
  spinRate?: Maybe<Scalars['Float']['output']>;
  /** The length of the stroke */
  strokeLength?: Maybe<Scalars['Float']['output']>;
  /** The direction of the swing */
  swingDirection?: Maybe<Scalars['Float']['output']>;
  /** The plane of the swing */
  swingPlane?: Maybe<Scalars['Float']['output']>;
  /** The radius of the swing */
  swingRadius?: Maybe<Scalars['Float']['output']>;
  /** Distance from the bay to the selected target */
  targetDistance?: Maybe<Scalars['Float']['output']>;
  /** The tempo of the swing */
  tempo?: Maybe<Scalars['Float']['output']>;
  /** The total distance the ball traveled */
  total?: Maybe<Scalars['Float']['output']>;
  /** The actual total distance */
  totalActual?: Maybe<Scalars['Float']['output']>;
  /** The total break of the green */
  totalBreak?: Maybe<Scalars['Float']['output']>;
  /** The total side distance */
  totalSide?: Maybe<Scalars['Float']['output']>;
  /** The actual total side distance */
  totalSideActual?: Maybe<Scalars['Float']['output']>;
};

/** The kind of shot measurement */
export enum ShotMeasurementKind {
  Measurement = 'MEASUREMENT',
  NormalizedMeasurement = 'NORMALIZED_MEASUREMENT',
  ProBallMeasurement = 'PRO_BALL_MEASUREMENT'
}

export type ShowUserEmailError = DefaultError;

export type ShowUserEmailInput = {
  show: Scalars['Boolean']['input'];
};

export type ShowUserEmailPayload = {
  __typename?: 'ShowUserEmailPayload';
  errors?: Maybe<Array<ShowUserEmailError>>;
  profile?: Maybe<Profile>;
};

export type ShowUserFullNameForFriendsError = DefaultError;

export type ShowUserFullNameForFriendsInput = {
  show: Scalars['Boolean']['input'];
};

export type ShowUserFullNameForFriendsPayload = {
  __typename?: 'ShowUserFullNameForFriendsPayload';
  errors?: Maybe<Array<ShowUserFullNameForFriendsError>>;
  profile?: Maybe<Profile>;
};

export type ShowUserFullNameForTournamentsError = DefaultError;

export type ShowUserFullNameForTournamentsInput = {
  show: Scalars['Boolean']['input'];
};

export type ShowUserFullNameForTournamentsPayload = {
  __typename?: 'ShowUserFullNameForTournamentsPayload';
  errors?: Maybe<Array<ShowUserFullNameForTournamentsError>>;
  profile?: Maybe<Profile>;
};

export type ShowUserPictureError = DefaultError;

export type ShowUserPictureInput = {
  show: Scalars['Boolean']['input'];
};

export type ShowUserPicturePayload = {
  __typename?: 'ShowUserPicturePayload';
  errors?: Maybe<Array<ShowUserPictureError>>;
  profile?: Maybe<Profile>;
};

export type ShuffleBullsEyeLeaderboard = {
  __typename?: 'ShuffleBullsEyeLeaderboard';
  ageFrom?: Maybe<Scalars['Int']['output']>;
  ageTo?: Maybe<Scalars['Int']['output']>;
  combineTestMode?: Maybe<CombineTestMode>;
  countryCode?: Maybe<Scalars['String']['output']>;
  fromUtc?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcpFrom?: Maybe<Scalars['Float']['output']>;
  hcpTo?: Maybe<Scalars['Float']['output']>;
  holeNumber?: Maybe<Scalars['Int']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  participantGroupId?: Maybe<Scalars['String']['output']>;
  playerCategory?: Maybe<Scalars['String']['output']>;
  queryTime?: Maybe<Scalars['DateTime']['output']>;
  /** The list of results for this leaderboard */
  records?: Maybe<ShuffleBullsEyeLeaderboardRecordTypeCollectionSegment>;
  scoringFormat?: Maybe<GameTypes>;
  /** A list of player/team ids that´s always displayed on the leaderboard */
  selectedPlayers?: Maybe<Array<ShuffleBullsEyeLeaderboardRecord>>;
  target?: Maybe<CombineTestTarget>;
  toUtc?: Maybe<Scalars['DateTime']['output']>;
};


export type ShuffleBullsEyeLeaderboardRecordsArgs = {
  gender?: InputMaybe<Gender>;
  nationality?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<LeaderboardOrderBy>;
  playNow?: InputMaybe<Scalars['Boolean']['input']>;
  playerCategory?: InputMaybe<PlayerCategory>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type ShuffleBullsEyeLeaderboardSelectedPlayersArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type ShuffleBullsEyeLeaderboardRecord = {
  __typename?: 'ShuffleBullsEyeLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** The holes played in the tournament */
  holes?: Maybe<Array<ShuffleBullsEyeLeaderboardRoundScore>>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  scorecardId?: Maybe<Scalars['String']['output']>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
  /** The total score */
  total?: Maybe<ShuffleBullsEyeLeaderboardTotalScore>;
};

/** A segment of a collection. */
export type ShuffleBullsEyeLeaderboardRecordTypeCollectionSegment = {
  __typename?: 'ShuffleBullsEyeLeaderboardRecordTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ShuffleBullsEyeLeaderboardRecord>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ShuffleBullsEyeLeaderboardRoundScore = {
  __typename?: 'ShuffleBullsEyeLeaderboardRoundScore';
  averageDistanceToPin?: Maybe<Scalars['Float']['output']>;
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  holeNumber: Scalars['Int']['output'];
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state: TournamentPlayerRoundState;
};

export type ShuffleBullsEyeLeaderboardTotalScore = {
  __typename?: 'ShuffleBullsEyeLeaderboardTotalScore';
  averageDistanceToPin?: Maybe<Scalars['Float']['output']>;
  distanceToPin?: Maybe<Scalars['Float']['output']>;
  filterPos?: Maybe<Scalars['Int']['output']>;
  filterPosLabel?: Maybe<Scalars['String']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  posLabel?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<TournamentPlayerRoundState>;
};

/** The tournament description */
export type ShuffleBullsEyeTournament = KeyValuesInterfaceType & MediaAssetsInterface & Node & TagsInterfaceTypeOfStringType & Tournament & {
  __typename?: 'ShuffleBullsEyeTournament';
  /** Indicates if putting mode is enabled or not */
  allowPuttingMode?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in tha facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The tournament is available on the listed facilities */
  availableOn?: Maybe<Array<Facility>>;
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** The course for the tournament. */
  course?: Maybe<Course>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** The tee selected for female players in the tournament. */
  femaleTee?: Maybe<Scalars['String']['output']>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The holes selected for the tournament. */
  holes?: Maybe<Array<Maybe<TournamentHole>>>;
  /** Holes to play */
  holesToPlay?: Maybe<HolesToPlay>;
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The leaderboard for this tournament */
  leaderboard?: Maybe<ShuffleBullsEyeLeaderboard>;
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The tee selected for male players in the tournament. */
  maleTee?: Maybe<Scalars['String']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  /** Participant progress in the tournament */
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /**
   * The list of products this tournament is a part of
   * @deprecated Do not use. Product service is deprecated.
   */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament. */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The default tee selected in the tournament */
  tee?: Maybe<Scalars['String']['output']>;
  /** The state of the tournament. The three states are not started, started and completed */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info about the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type ShuffleBullsEyeTournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type ShuffleBullsEyeTournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type ShuffleBullsEyeTournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type ShuffleBullsEyeTournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type ShuffleBullsEyeTournamentLeaderboardArgs = {
  gender?: InputMaybe<Gender>;
  hcpFrom?: InputMaybe<Scalars['Float']['input']>;
  hcpTo?: InputMaybe<Scalars['Float']['input']>;
  holeNumber?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
};


/** The tournament description */
export type ShuffleBullsEyeTournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type ShuffleBullsEyeTournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type ShuffleBullsEyeTournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SimpleUtmInput = {
  easting: Scalars['Float']['input'];
  gridZone?: InputMaybe<Scalars['String']['input']>;
  northing: Scalars['Float']['input'];
};

/** An indoor simulator bay */
export type SimulatorBay = BayInterface & Node & {
  __typename?: 'SimulatorBay';
  /** Activity information for this bay */
  activities: BayIndoorActivities;
  applicationProperties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** Indicates the availability status of the bay */
  availability: BayAvailability;
  /** A numeric identifier for the bay */
  bayNumber?: Maybe<Scalars['Int']['output']>;
  /** The list of bookings for this bay */
  bookings: BayBookings;
  dbId?: Maybe<Scalars['String']['output']>;
  /** The bay description */
  description?: Maybe<Scalars['String']['output']>;
  /** The Device Id of TPS in the bay */
  deviceId?: Maybe<Scalars['String']['output']>;
  /** Information about display screen for this bay */
  display?: Maybe<Array<Maybe<BayScreenInfo>>>;
  /** The facility that the bay is located in */
  facility?: Maybe<Facility>;
  /** Information about graphics for this bay */
  graphics?: Maybe<Array<Maybe<BayGraphicsInfo>>>;
  id: Scalars['ID']['output'];
  /** Indicates whether the bay is currently part of one of the enabled bay setups */
  isEnabled: Scalars['Boolean']['output'];
  /** Information about the bay if it is locked */
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether the bay is currently occupied */
  isOccupied: Scalars['Boolean']['output'];
  /** Indicates whether the bay is currently offline */
  isOffline: Scalars['Boolean']['output'];
  /** The list of json properties */
  jsonProperties?: Maybe<Array<KeyValue>>;
  /** Indicate if the bay is an indoor simulator bay or a bay in a driving range */
  kind?: Maybe<BayKind>;
  /** The location the bay is in */
  location?: Maybe<LocationInterfaceType>;
  /** The name of the bay */
  name?: Maybe<Scalars['String']['output']>;
  /** Queued commands for this bay */
  queuedCommands?: Maybe<QueuedCommandsCollectionSegment>;
  /** The serial number of the radar in the bay */
  serialNumber?: Maybe<Scalars['String']['output']>;
  /** The current session for this bay */
  session?: Maybe<BayIndoorSession>;
  /** The software version for this bay */
  softwareVersion?: Maybe<Scalars['String']['output']>;
  /** Storage information for this bay */
  storage?: Maybe<Array<Maybe<BayStorageInfo>>>;
  /** Strokes information for this bay */
  strokes: BayStrokes;
  /** Uploaded support files for this bay */
  supportFiles?: Maybe<SupportFilesCollectionSegment>;
};


/** An indoor simulator bay */
export type SimulatorBayApplicationPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


/** An indoor simulator bay */
export type SimulatorBayQueuedCommandsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


/** An indoor simulator bay */
export type SimulatorBaySupportFilesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** The activity played in a range bay */
export type SimulatorBayActivity = BayActivityInterface & Node & {
  __typename?: 'SimulatorBayActivity';
  id: Scalars['ID']['output'];
  /** The activity kind */
  kind?: Maybe<ActivityKind>;
  /** The list of players currently occupying the bay */
  players: Array<Maybe<BayPlayer>>;
  /** The start time of the activity */
  startTime: Scalars['DateTime']['output'];
  /** The list of strokes currently in the ongoing activity */
  strokes: StrokeList;
  /** The activity type */
  type: Scalars['String']['output'];
};

export type SimulatorSessionActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'SimulatorSessionActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  sessionId?: Maybe<Scalars['String']['output']>;
  strokeCount: Scalars['Int']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type SimulatorSessionActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SimulatorSessionActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  maxTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  maxTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
};

export type SiteAssetInfo = {
  __typename?: 'SiteAssetInfo';
  /** The content type of the filet */
  contentType?: Maybe<Scalars['String']['output']>;
  /** The name of the file */
  fileName?: Maybe<Scalars['String']['output']>;
  /** The MD5 hash */
  md5?: Maybe<Scalars['String']['output']>;
  /** The id of the site */
  siteId?: Maybe<Scalars['String']['output']>;
  /** The type of file */
  type?: Maybe<Scalars['String']['output']>;
  /** The time the file was uploaded */
  uploadDateTime?: Maybe<Scalars['DateTime']['output']>;
  /** The uri of the file */
  uri?: Maybe<Scalars['String']['output']>;
};

export type SiteLocationModel = {
  __typename?: 'SiteLocationModel';
  /** X,Y,Z position based on the site coordinate system */
  sitePoint?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  /** The location based on the world latitude and longitude */
  worldPoint?: Maybe<LatLonAlt>;
};

export type SiteServerAlreadyProvisionedError = BaseError & {
  __typename?: 'SiteServerAlreadyProvisionedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type SiteServerNotDetectedOnLocationError = BaseError & {
  __typename?: 'SiteServerNotDetectedOnLocationError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** Sort direction */
export enum SortDirection {
  /** Ascending */
  Asc = 'asc',
  /** Descending */
  Desc = 'desc'
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** The sponsor model */
export type Sponsor = MediaAssetsInterface & Node & {
  __typename?: 'Sponsor';
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The description of the sponsor */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The url for the sponsor website */
  link?: Maybe<Scalars['URL']['output']>;
  /** The url for the sponsor logo */
  logoUri?: Maybe<Scalars['URL']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the sponsor */
  name?: Maybe<Scalars['String']['output']>;
};

/** A sponsor campaign created by a facility */
export type SponsorCampaign = Node & {
  __typename?: 'SponsorCampaign';
  /** Is the sponsor campaign active */
  active?: Maybe<Scalars['Boolean']['output']>;
  /** Is all courses covered by this campaign */
  allCourses?: Maybe<Scalars['Boolean']['output']>;
  /** The courses covered by this campaign */
  courses?: Maybe<Array<Maybe<Course>>>;
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** The sponsor shown on the given hole */
  holeSponsors?: Maybe<Array<Maybe<HoleSponsorType>>>;
  id: Scalars['ID']['output'];
  /** The kind of the sponsor campaign - indoor or range */
  kind?: Maybe<SponsorCampaignKinds>;
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  /** The title of the sponsor campaign */
  title?: Maybe<Scalars['String']['output']>;
};

export type SponsorCampaignInputType = {
  /** Is the sponsor campaign active */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** The course identifiers this campaign covers - if null or empty, all courses will covered */
  courses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The sponsors covering the holes */
  holeSponsors: Array<InputMaybe<HoleSponsorInputType>>;
  /** The kind for the campaign - indoor or range */
  kind: SponsorCampaignKinds;
  /** The title for the campaign */
  title: Scalars['String']['input'];
};

export enum SponsorCampaignKinds {
  Indoor = 'INDOOR',
  /** @deprecated Please use 'Indoor' instead */
  IndoorBay = 'INDOOR_BAY',
  Range = 'RANGE',
  /** @deprecated Please use 'Range' instead */
  RangeBay = 'RANGE_BAY'
}

export type SponsorCampaignMutationInterfaceType = {
  /** Delete sponsor campaign */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Update active state for this sponsor campaign */
  setActive?: Maybe<SponsorCampaignV2>;
  /** Update title for this sponsor campaign */
  setTitle?: Maybe<SponsorCampaignV2>;
};


export type SponsorCampaignMutationInterfaceTypeSetActiveArgs = {
  active?: Scalars['Boolean']['input'];
};


export type SponsorCampaignMutationInterfaceTypeSetTitleArgs = {
  title?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

/** Mutations on a Facility Location */
export type SponsorCampaignMutations = {
  __typename?: 'SponsorCampaignMutations';
  /** Delete sponsor campaign */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Update active state for this sponsor campaign */
  setActive?: Maybe<SponsorCampaign>;
  /** Change the name of the location */
  update?: Maybe<SponsorCampaign>;
};


/** Mutations on a Facility Location */
export type SponsorCampaignMutationsSetActiveArgs = {
  active?: Scalars['Boolean']['input'];
};


/** Mutations on a Facility Location */
export type SponsorCampaignMutationsUpdateArgs = {
  sponsorCampaign: SponsorCampaignInputType;
};

/** A segment of a collection. */
export type SponsorCampaignTypeCollectionSegment = {
  __typename?: 'SponsorCampaignTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<SponsorCampaign>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type SponsorCampaignTypeV2CollectionSegment = {
  __typename?: 'SponsorCampaignTypeV2CollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<SponsorCampaignV2>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type SponsorCampaignV2 = {
  /** Is the campaign active */
  active?: Maybe<Scalars['Boolean']['output']>;
  /** Database identifier */
  dbId?: Maybe<Scalars['String']['output']>;
  /** The sponsor campaign id */
  id: Scalars['ID']['output'];
  /** The title of the sponsor campaign */
  title?: Maybe<Scalars['String']['output']>;
  /** The sponsor campaign type */
  type?: Maybe<SponsorCampaignKinds>;
};

/** Mutations on a Sponsor */
export type SponsorMutations = MediaAssetsMutationInterface & {
  __typename?: 'SponsorMutations';
  /** Add default image to the sponsor */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** Add media assets to the sponsor */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Delete existing sponsor */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Remove media assets from the sponsor */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Update existing sponsor */
  update?: Maybe<Sponsor>;
};


/** Mutations on a Sponsor */
export type SponsorMutationsAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Sponsor */
export type SponsorMutationsAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Sponsor */
export type SponsorMutationsRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a Sponsor */
export type SponsorMutationsUpdateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['Url']['input']>;
  logoUrl: Scalars['Url']['input'];
  name: Scalars['String']['input'];
};

/** A segment of a collection. */
export type SponsorTypeCollectionSegment = {
  __typename?: 'SponsorTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Sponsor>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type StaffNotification = {
  __typename?: 'StaffNotification';
  email?: Maybe<Scalars['EmailAddress']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export enum Stimp {
  Count = 'COUNT',
  Length6 = 'LENGTH6',
  Length7 = 'LENGTH7',
  Length8 = 'LENGTH8',
  Length9 = 'LENGTH9',
  Length10 = 'LENGTH10',
  Length11 = 'LENGTH11',
  Length12 = 'LENGTH12',
  None = 'NONE'
}

export type Stroke = {
  __typename?: 'Stroke';
  ball?: Maybe<Scalars['String']['output']>;
  club?: Maybe<Scalars['String']['output']>;
  clubData?: Maybe<ClubData>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  impactLocation?: Maybe<ImpactLocation>;
  measurement?: Maybe<Measurement>;
  measurementDetails?: Maybe<MeasurementDetails>;
  normalizedMeasurement?: Maybe<Measurement>;
  tags?: Maybe<Array<Maybe<StrokeTag>>>;
  target?: Maybe<StrokeTargetInterface>;
  targetDistance?: Maybe<Scalars['Float']['output']>;
  time: Scalars['DateTime']['output'];
};

export type StrokeCircleTarget = StrokeTargetInterface & {
  __typename?: 'StrokeCircleTarget';
  /** Target Diameter */
  diameter: Scalars['Float']['output'];
  /** Target Distance */
  distance: Scalars['Float']['output'];
  /** Target handicap */
  hcp: Scalars['Float']['output'];
  /** Target Radius */
  radius: Scalars['Float']['output'];
  /** Target Tour Diameter */
  tourDiameter: Scalars['Float']['output'];
  /** Target Tour Radius */
  tourRadius: Scalars['Float']['output'];
  /** Target type */
  type?: Maybe<Scalars['String']['output']>;
};

export type StrokeCombineTarget = StrokeTargetInterface & {
  __typename?: 'StrokeCombineTarget';
  bucket: Scalars['Int']['output'];
  meterDistance: Scalars['Float']['output'];
  type?: Maybe<Scalars['String']['output']>;
  yardDistance: Scalars['Float']['output'];
};

export type StrokeDriveTarget = StrokeTargetInterface & {
  __typename?: 'StrokeDriveTarget';
  level: Scalars['Int']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type StrokeFixedDistanceTarget = StrokeTargetInterface & {
  __typename?: 'StrokeFixedDistanceTarget';
  distance: Scalars['Float']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type StrokeList = {
  __typename?: 'StrokeList';
  /** The list of all net incidents for an activity */
  list?: Maybe<StrokeV2TypeCollectionSegment>;
};


export type StrokeListListArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type StrokeRectangleTarget = StrokeTargetInterface & {
  __typename?: 'StrokeRectangleTarget';
  distance: Scalars['Float']['output'];
  length: Scalars['Float']['output'];
  type?: Maybe<Scalars['String']['output']>;
  width: Scalars['Float']['output'];
};

export type StrokeTag = {
  __typename?: 'StrokeTag';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  group?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type StrokeTargetInterface = {
  type?: Maybe<Scalars['String']['output']>;
};

export type StrokeTrajectory = {
  __typename?: 'StrokeTrajectory';
  clone?: Maybe<StrokeTrajectory>;
  kind?: Maybe<Scalars['String']['output']>;
  measuredTimeInterval?: Maybe<Array<Scalars['Float']['output']>>;
  spinRateEffectiveFit?: Maybe<Array<Scalars['Float']['output']>>;
  spinRateFit?: Maybe<Array<Scalars['Float']['output']>>;
  timeInterval?: Maybe<Array<Scalars['Float']['output']>>;
  timeIntervalActual?: Maybe<Array<Scalars['Float']['output']>>;
  trackingPercentage?: Maybe<Scalars['Float']['output']>;
  validTimeInterval?: Maybe<Array<Scalars['Float']['output']>>;
  xFit?: Maybe<Array<Scalars['Float']['output']>>;
  yFit?: Maybe<Array<Scalars['Float']['output']>>;
  zFit?: Maybe<Array<Scalars['Float']['output']>>;
};

export type StrokeV2 = StrokeV2Interface & {
  __typename?: 'StrokeV2';
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** Stroke information */
export type StrokeV2Interface = {
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type StrokeV2TypeCollectionSegment = {
  __typename?: 'StrokeV2TypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<StrokeV2>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** Students for a coach */
export type Students = {
  __typename?: 'Students';
  /** Student Activities */
  activities?: Maybe<PlayerActivityInterfaceTypeCollectionSegment>;
  /** Summary for student activities */
  activitySummary?: Maybe<ActivitySummaryTypeCollectionSegment>;
  /** Students with activities */
  list?: Maybe<PlayerActivitySummaryTypeCollectionSegment>;
  /** Search students for this coach */
  search?: Maybe<CoachStudentTypeCollectionSegment>;
};


/** Students for a coach */
export type StudentsActivitiesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  kinds?: InputMaybe<Array<ActivityKind>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Students for a coach */
export type StudentsActivitySummaryArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Students for a coach */
export type StudentsListArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Students for a coach */
export type StudentsSearchArgs = {
  orderBy?: InputMaybe<Array<VisitorOrderBy>>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
  timeTo?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Support file */
export type SupportFile = {
  __typename?: 'SupportFile';
  /** Client of the support file */
  client?: Maybe<ClientType>;
  /** Url to the support file */
  fileUrl?: Maybe<Scalars['URL']['output']>;
  /** Message of the support file */
  message?: Maybe<Scalars['String']['output']>;
  /** Time of the support file */
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type SupportFilesCollectionSegment = {
  __typename?: 'SupportFilesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<SupportFile>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type SwapClubsError = ClubIdMissingError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UniqActiveClubsRuleError;

export type SwapClubsInput = {
  activeClubId: Scalars['ID']['input'];
  retiredClubId: Scalars['ID']['input'];
};

export type SwapClubsPayload = {
  __typename?: 'SwapClubsPayload';
  errors?: Maybe<Array<SwapClubsError>>;
  result?: Maybe<Array<Maybe<Club>>>;
};

export type SwingDataProcessingPartnerConsent = ConsentInterfaceType & {
  __typename?: 'SwingDataProcessingPartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  version?: Maybe<SystemInfoVersion>;
};

export type SystemInfoVersion = {
  __typename?: 'SystemInfoVersion';
  androidAppsVersion?: Maybe<Scalars['String']['output']>;
  cloudApiVersion?: Maybe<Scalars['String']['output']>;
  iOsAppsVersion?: Maybe<Scalars['String']['output']>;
  iPadAppsVersion?: Maybe<Scalars['String']['output']>;
};

export type TaggedPosition = {
  __typename?: 'TaggedPosition';
  /** The position the tee */
  position?: Maybe<Position>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  worldLocation?: Maybe<LatLon>;
};

export type TagsInterfaceTypeOfLocationTagsType = {
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<LocationUrlTags>>;
};


export type TagsInterfaceTypeOfLocationTagsTypeHasTagArgs = {
  tag: LocationUrlTags;
};

export type TagsInterfaceTypeOfStringType = {
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
};


export type TagsInterfaceTypeOfStringTypeHasTagArgs = {
  tag: Scalars['String']['input'];
};

export type Target = {
  __typename?: 'Target';
  id: Scalars['UUID']['output'];
  siteLocation?: Maybe<Array<Scalars['Float']['output']>>;
};

/** Sort options for searching targets */
export type TargetSortInput = {
  name?: InputMaybe<SortEnumType>;
  version?: InputMaybe<SortEnumType>;
};

export type TargetStatistics = {
  __typename?: 'TargetStatistics';
  avgDistanceFromPin?: Maybe<Scalars['Float']['output']>;
  avgScore?: Maybe<Scalars['Float']['output']>;
  avgTotal?: Maybe<Scalars['Float']['output']>;
  avgTotalSide?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
};

export type TargetStroke = {
  __typename?: 'TargetStroke';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  distanceFromPin?: Maybe<Scalars['Float']['output']>;
  lengthToTarget?: Maybe<Scalars['Float']['output']>;
  measurementId?: Maybe<Scalars['UUID']['output']>;
  /** Score for this target */
  score?: Maybe<Scalars['Float']['output']>;
  /** Stroke data */
  stroke?: Maybe<Stroke>;
  total?: Maybe<Scalars['Float']['output']>;
  totalLength?: Maybe<Scalars['Float']['output']>;
  totalSide?: Maybe<Scalars['Float']['output']>;
};

export type TargetVersionFilter = {
  /** Specify whether to return enabled, disabled or all targets regardless of status */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the draft or published state of the target. If unspecified, only published targets will be returned by default. */
  publishState?: InputMaybe<PublishStateFilterType>;
  /** Filter by one or more Tags */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Version information for a Driving Range target */
export type TargetVersionInfoType = EntityVersionInfo & {
  __typename?: 'TargetVersionInfoType';
  /** Returns the current draft version of the target if one exists */
  draftVersion?: Maybe<RangeTarget>;
  /** Indicates whether a draft version has been marked for delete on the next publish */
  isMarkedForDelete: Scalars['Boolean']['output'];
  /** The timestamp of this version's publication date */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Returns the latest published version of the Target if one exists */
  publishedVersion?: Maybe<RangeTarget>;
  /** Indicates whether this is a published or draft version of an entity */
  state: PublishState;
  /** The version of the entity */
  version: Scalars['String']['output'];
  /** The other versions of the target */
  versions?: Maybe<TargetVersionsCollectionSegment>;
};


/** Version information for a Driving Range target */
export type TargetVersionInfoTypeVersionsArgs = {
  filter?: InputMaybe<TargetVersionFilter>;
  order?: InputMaybe<Array<TargetSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type TargetVersionsCollectionSegment = {
  __typename?: 'TargetVersionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RangeTarget>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A Tournament Team */
export type Team = Node & {
  __typename?: 'Team';
  /**
   * The time the team was created
   * @deprecated Use TournamentTeam
   */
  createdAt: Scalars['DateTime']['output'];
  /**
   * The global object identification
   * @deprecated Use TournamentTeam
   */
  id: Scalars['ID']['output'];
  /**
   * The members in the team
   * @deprecated Use TournamentTeam
   */
  members: Array<Member>;
  /**
   * name of the team
   * @deprecated Use TournamentTeam
   */
  name?: Maybe<Scalars['String']['output']>;
};

export type TeamCompleteError = BaseError & {
  __typename?: 'TeamCompleteError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type TeamDisqualifiedError = BaseError & {
  __typename?: 'TeamDisqualifiedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type TeamEventNotSupportedError = BaseError & {
  __typename?: 'TeamEventNotSupportedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type TeamInterface = {
  /** The color for the team */
  color?: Maybe<Scalars['String']['output']>;
  /** The time the team was created */
  createdAt: Scalars['DateTime']['output'];
  /** The icon for the team */
  icon?: Maybe<Scalars['String']['output']>;
  /** The team id */
  id: Scalars['ID']['output'];
  /** Indicates whether the team has paid */
  isPaid?: Maybe<Scalars['Boolean']['output']>;
  /** The registered location for the team */
  location?: Maybe<Location>;
  /** The maximum team size */
  maxSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The members in the team */
  members: Array<TeamMemberInterface>;
  /** The minimum team size */
  minSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** The name of the team */
  name: Scalars['String']['output'];
  /** Payment information */
  payment?: Maybe<PaymentInformation>;
  /** The team status */
  status: TeamStatus;
  /** The team status code */
  statusCode: TeamStatusCode;
};

export type TeamInvalidLocationError = BaseError & {
  __typename?: 'TeamInvalidLocationError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** Member in a team */
export type TeamMemberInterface = {
  /** Information about this person */
  person?: Maybe<PersonInfo>;
  /** The member status */
  status: TeamMemberStatus;
};

export type TeamMemberLeaderboardRecord = {
  __typename?: 'TeamMemberLeaderboardRecord';
  /** Player age */
  age?: Maybe<Scalars['Int']['output']>;
  /** Professional or amateur */
  category?: Maybe<PlayerCategory>;
  /** Team color */
  color?: Maybe<Scalars['String']['output']>;
  /** Player email */
  email?: Maybe<Scalars['String']['output']>;
  /** Player gender */
  gender?: Maybe<Scalars['String']['output']>;
  /** Player handicap */
  hcp?: Maybe<Scalars['Decimal']['output']>;
  /** Team icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** Player id */
  id?: Maybe<Scalars['String']['output']>;
  /** The location in which the attempt was played at */
  location?: Maybe<LocationInterfaceType>;
  /** Player nationality */
  nationality?: Maybe<Scalars['String']['output']>;
  /** Player picture */
  picture?: Maybe<Scalars['String']['output']>;
  playerDbId?: Maybe<Scalars['String']['output']>;
  /** Player graphQL id */
  playerId?: Maybe<Scalars['ID']['output']>;
  /** Individual player or team */
  playerKind?: Maybe<PersonConnectionKind>;
  /** Name of player or team */
  playername?: Maybe<Scalars['String']['output']>;
  /** Invitation status */
  status?: Maybe<InvitationStatus>;
  /** If this is a team, the team information */
  teamInfo?: Maybe<LeaderboardPlayerInfo>;
};

/** The team member status */
export enum TeamMemberStatus {
  /** The team request is accepted */
  Accepted = 'accepted',
  /** The team member has declined */
  Declined = 'declined',
  /** The team member is disqualified */
  Disqualified = 'disqualified',
  /** The team request is pending */
  Pending = 'pending',
  /** The team member status is unknown */
  Unknown = 'unknown'
}

export type TeamNameAlreadyUsedError = BaseError & {
  __typename?: 'TeamNameAlreadyUsedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type TeamNotFoundError = BaseError & {
  __typename?: 'TeamNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type TeamPlayerInfo = {
  __typename?: 'TeamPlayerInfo';
  birthday?: Maybe<Scalars['DateTime']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  courseHcp?: Maybe<Scalars['Float']['output']>;
  courseHcpCalculated?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hcp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isGhost?: Maybe<Scalars['Boolean']['output']>;
  isGuest?: Maybe<Scalars['Boolean']['output']>;
  isInitialized?: Maybe<Scalars['Boolean']['output']>;
  isTournamentScore?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  numberOfRounds?: Maybe<Scalars['Int']['output']>;
  players?: Maybe<Array<Maybe<PlayerInfo>>>;
  progressMessageId?: Maybe<Scalars['String']['output']>;
  teamNumber?: Maybe<Scalars['String']['output']>;
  tee?: Maybe<Scalars['String']['output']>;
};

export type TeamRemovedError = BaseError & {
  __typename?: 'TeamRemovedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** The team status */
export enum TeamStatus {
  /** The team has been disqualified */
  Disqualified = 'disqualified',
  /** The team is not ready to play */
  NotReady = 'notReady',
  /** The team is ready to play */
  Ready = 'ready',
  /** The team has been removed */
  Removed = 'removed',
  /** The team status is unknown */
  Unknown = 'unknown'
}

/** The team status */
export enum TeamStatusCode {
  /** The team has been disqualified */
  Disqualified = 'disqualified',
  /** The team is missing a member */
  MissingMember = 'missingMember',
  /** The team has not paid */
  MissingPayment = 'missingPayment',
  /** The team is not ready to play */
  NotReady = 'notReady',
  /** The team is ready to play */
  Ready = 'ready',
  /** The team has been removed */
  Removed = 'removed',
  /** The team status code is unknown */
  Unknown = 'unknown'
}

export type TeamTournamentProgress = TournamentProgressInterface & {
  __typename?: 'TeamTournamentProgress';
  isTeamProgress?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<PersonInfo>;
  participantGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  playerProgress?: Maybe<Array<Maybe<MrtTournamentProgress>>>;
  rounds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  roundsProgress?: Maybe<Array<Maybe<RoundProgress>>>;
};

/** A segment of a collection. */
export type TeamTypeCollectionSegment = {
  __typename?: 'TeamTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Team>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TeamTypeNotSupportedError = BaseError & {
  __typename?: 'TeamTypeNotSupportedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** An overview of all teams for a tournament */
export type Teams = {
  __typename?: 'Teams';
  /** All teams that have joined the tournament */
  accepted?: Maybe<TeamTypeCollectionSegment>;
};


/** An overview of all teams for a tournament */
export type TeamsAcceptedArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum TeeCategory {
  Default = 'DEFAULT',
  Female = 'FEMALE',
  Male = 'MALE'
}

export type TeeInfo = {
  __typename?: 'TeeInfo';
  /** The total length of the tee */
  distance?: Maybe<Scalars['Float']['output']>;
  /** The gender of the tee */
  gender?: Maybe<Scalars['String']['output']>;
  /** The holes on the round */
  holes?: Maybe<Array<Maybe<HoleInfo>>>;
  /** The name of the tee */
  name?: Maybe<Scalars['String']['output']>;
  /** The par of the tee */
  par?: Maybe<Scalars['Int']['output']>;
  /** The rating of the tee */
  rating?: Maybe<Scalars['Float']['output']>;
  /** The slope of the tee */
  slope?: Maybe<Scalars['Float']['output']>;
};

export type TeeInfoWithoutHoles = {
  __typename?: 'TeeInfoWithoutHoles';
  distance: Scalars['Float']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  par: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  slope: Scalars['Float']['output'];
};

export type TeeSettings = {
  __typename?: 'TeeSettings';
  name?: Maybe<Scalars['String']['output']>;
};

export type TermsAndConditionsPartnerConsent = ConsentInterfaceType & {
  __typename?: 'TermsAndConditionsPartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type TestActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'TestActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  avgScore: Scalars['Float']['output'];
  dynamicReportPath?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  name?: Maybe<Scalars['String']['output']>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  strokes?: Maybe<Array<Stroke>>;
  /** Test result */
  testResult?: Maybe<TestResult>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type TestActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TestActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
};

export type TestResult = {
  __typename?: 'TestResult';
  client?: Maybe<Client>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  /** Test definition and settings */
  definition?: Maybe<TestResultDefinition>;
  /** Statistics about the driving results */
  drivingStatistics?: Maybe<TestResultDrivingStatistics>;
  /** Estimated handicap */
  estimatedHcp?: Maybe<Scalars['Decimal']['output']>;
  groups?: Maybe<Array<Maybe<Group>>>;
  id: Scalars['UUID']['output'];
  player?: Maybe<Player>;
  /** Link to the test report */
  reportPath?: Maybe<Scalars['String']['output']>;
  /** Overall statistics about the test result */
  statistics?: Maybe<TestResultStatistics>;
  /** Targets */
  targets?: Maybe<Array<TestResultTarget>>;
  time: Scalars['DateTime']['output'];
  updated?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type TestResultDefinition = {
  __typename?: 'TestResultDefinition';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  /** Indication if this test was performed in yards */
  inYards?: Maybe<Scalars['Boolean']['output']>;
  /** Indication if this test was performed indoor */
  indoorTest?: Maybe<Scalars['Boolean']['output']>;
  isNormalized: Scalars['Boolean']['output'];
  /** Location where the test was performed */
  location?: Maybe<Scalars['String']['output']>;
  /** Test definition name */
  name?: Maybe<Scalars['String']['output']>;
  /** Notes about the test */
  notes?: Maybe<Scalars['String']['output']>;
  /** Temperature in celcius when the test was performed */
  temperature?: Maybe<Scalars['Float']['output']>;
  /** Test definition string */
  testDefinition?: Maybe<Scalars['String']['output']>;
  /** Wind conditions when the test was performed */
  wind?: Maybe<Scalars['String']['output']>;
};

export type TestResultDrivingStatistics = {
  __typename?: 'TestResultDrivingStatistics';
  avgAttackAngle?: Maybe<Scalars['Float']['output']>;
  /** Average ball speed */
  avgBallSpeed?: Maybe<Scalars['Float']['output']>;
  /** Average club speed */
  avgClubSpeed?: Maybe<Scalars['Float']['output']>;
  /** Average launch angle */
  avgLaunchAngle?: Maybe<Scalars['Float']['output']>;
  /** Average spin rate */
  avgSpinRate?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  /** Maximum ball speed */
  maxBallSpeed?: Maybe<Scalars['Float']['output']>;
  /** Maximum club speed */
  maxClubSpeed?: Maybe<Scalars['Float']['output']>;
};

export type TestResultStatistics = {
  __typename?: 'TestResultStatistics';
  /** Average score */
  avgScore?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  /** Number of strokes deleted while performing the test */
  numberOfDeletedStrokes?: Maybe<Scalars['Int']['output']>;
};

export type TestResultTarget = {
  __typename?: 'TestResultTarget';
  /** Consistency (standard deviation) */
  consistency?: Maybe<Scalars['Decimal']['output']>;
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  /** Target definition */
  definition?: Maybe<Scalars['String']['output']>;
  /** Target distance */
  distance?: Maybe<Scalars['Decimal']['output']>;
  /** Target distance 2 */
  distance2?: Maybe<Scalars['Decimal']['output']>;
  /** Score */
  score?: Maybe<Scalars['Decimal']['output']>;
  /** Statistics about this target */
  statistics?: Maybe<TargetStatistics>;
  /** Strokes for this target */
  strokes?: Maybe<Array<Maybe<TargetStroke>>>;
  /** Target type */
  type?: Maybe<Scalars['String']['output']>;
  /** Distance units */
  unit?: Maybe<Scalars['String']['output']>;
};

/** The tournament description */
export type Tournament = {
  /** A flag indicating whether any of the rounds in an order of merit tournament has non default max scoring. */
  anyRoundHasNonDefaultMaxScoringMethod?: Maybe<Scalars['Boolean']['output']>;
  /** Where the tournament is available */
  availability?: Maybe<TournamentAvailability>;
  /** If true the tournament can get played everywhere if the participant is invited. If false it can only get played in the facility that have created it */
  availableEverywhere: Scalars['Boolean']['output'];
  /** The background image for the tournament */
  backgroundImage?: Maybe<Scalars['URL']['output']>;
  /** Database identifier */
  dbId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** The end date and time for the tournament */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** Geo location filters for this tournament */
  geoFilters?: Maybe<TournamentGeoFilterType>;
  /** Check if there is an end date for the tournament */
  hasEndDate: Scalars['Boolean']['output'];
  /** Has any key value been added */
  hasKeyValue?: Maybe<Scalars['Boolean']['output']>;
  /** Has any tags */
  hasTag?: Maybe<Scalars['Boolean']['output']>;
  /** The tournament id */
  id: Scalars['ID']['output'];
  /** My invitation for this tournament */
  invitation?: Maybe<Invitation>;
  /** Indicates if user has selected all bays for all locations */
  isAllBaysSelectedForAllLocations?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Indicates if the tournament is an event
   * @deprecated Use isGuestTournament instead
   */
  isEvent?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that the tournament is featured in our applications */
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament is a guest tournament (Social event) */
  isGuestTournament?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is an indoor tournament */
  isIndoor?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the tournament partner consents feature is enabled or not */
  isPartnerConsentsEnable?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether allow pay per entry */
  isPayPerEntryEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates whether tournament is free or paid */
  isPaymentEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Verify that the tournament is ready to get published */
  isPublishable?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a range tournament */
  isRange?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating that this is a team tournament */
  isTeam?: Maybe<Scalars['Boolean']['output']>;
  /** The list of key values added */
  keyValue?: Maybe<Scalars['String']['output']>;
  /** The list of key values added */
  keyValues?: Maybe<Array<KeyValue>>;
  /** The locations where this tournament can be played */
  locations?: Maybe<TournamentLocations>;
  /** the payment configuration for each one of the locations available for this tournament */
  locationsConfiguration?: Maybe<Array<Maybe<LocationConfiguration>>>;
  /** The logo for the tournament */
  logo?: Maybe<Scalars['URL']['output']>;
  /** The list of media assets */
  mediaAssets?: Maybe<Array<MediaAsset>>;
  /** The name of the tournament */
  name?: Maybe<Scalars['String']['output']>;
  /** override advertisement */
  overrideAdvertisement?: Maybe<Scalars['Boolean']['output']>;
  /** The participation groups for this tournament */
  participantGroups?: Maybe<Array<Maybe<ParticipantGroup>>>;
  participantProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The participation requirements for this tournament */
  participantRequirements?: Maybe<ParticipantGroup>;
  /** Lists with all the participants */
  participants?: Maybe<Invitations>;
  /** The url where the user have to use for accepting the partner consents */
  partnerConsentsRedirctUrl?: Maybe<Scalars['URL']['output']>;
  /** The partner that are enabled for this tournament */
  partners?: Maybe<Array<Maybe<Partner>>>;
  /** The list of products this tournament is a part of */
  products?: Maybe<Array<Maybe<UserHasPaid>>>;
  /** The tournament settings */
  settings?: Maybe<TournamentSettings>;
  /** Sign up end time for this tournament. Can be null */
  signUpEndTime?: Maybe<Scalars['DateTime']['output']>;
  /** Sign up start time for this tournament. Can be null */
  signUpStartTime?: Maybe<Scalars['DateTime']['output']>;
  /** The sponsors for this tournament */
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  /** The start date and time for the tournament */
  startDate: Scalars['DateTime']['output'];
  /** The list of tags */
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** Team handicap in the tournament */
  teamHandicap?: Maybe<Scalars['Int']['output']>;
  /** The settings that applies for all teams participating in this tournament */
  teamSettings?: Maybe<TournamentTeamSettingsType>;
  /**
   * Lists with all the teams in the tournament
   * @deprecated Use tournamentTeams
   */
  teams?: Maybe<Teams>;
  /** The state of this tournament */
  tournamentState?: Maybe<TournamentState>;
  /** Lists with all the teams in the tournament */
  tournamentTeams?: Maybe<TournamentTeamTypeCollectionSegment>;
  /** The tournament type */
  type?: Maybe<TournamentTypes>;
  /** The unit system used when playing the tournament. */
  unit?: Maybe<GameUnit>;
  /** Get version info abut the draft and the published version of the tournament */
  versionInfo?: Maybe<TournamentVersionInfo>;
};


/** The tournament description */
export type TournamentDescriptionArgs = {
  as?: InputMaybe<MkDownTypes>;
};


/** The tournament description */
export type TournamentHasKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type TournamentHasTagArgs = {
  tag: Scalars['String']['input'];
};


/** The tournament description */
export type TournamentKeyValueArgs = {
  key: Scalars['String']['input'];
};


/** The tournament description */
export type TournamentParticipantProgressArgs = {
  participantIds: Array<Array<Scalars['String']['input']>>;
  queryTime?: InputMaybe<Scalars['DateTime']['input']>;
  roundIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** The tournament description */
export type TournamentTeamHandicapArgs = {
  team?: InputMaybe<CalculateTeamHandicapInput>;
};


/** The tournament description */
export type TournamentTournamentTeamsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum TournamentAvailability {
  Global = 'GLOBAL',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type TournamentClosestToPinEmbeddedGame = {
  __typename?: 'TournamentClosestToPinEmbeddedGame';
  availableHoles?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseVersion?: Maybe<Scalars['String']['output']>;
  femaleTee?: Maybe<TeeSettings>;
  holes?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  maleTee?: Maybe<TeeSettings>;
  selectedHoles: HolesToPlay;
};

/** Mutations on a Closest To Pin Embedded games */
export type TournamentClosestToPinEmbeddedGameMutation = {
  __typename?: 'TournamentClosestToPinEmbeddedGameMutation';
  /** Apply new list of holes */
  changeHoles?: Maybe<TournamentClosestToPinEmbeddedGame>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseVersion?: Maybe<Scalars['String']['output']>;
  femaleTee?: Maybe<TeeSettings>;
  holes?: Maybe<Array<Scalars['Int']['output']>>;
  maleTee?: Maybe<TeeSettings>;
  selectedHoles: HolesToPlay;
};


/** Mutations on a Closest To Pin Embedded games */
export type TournamentClosestToPinEmbeddedGameMutationChangeHolesArgs = {
  holesToPlay?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type TournamentDetails = {
  __typename?: 'TournamentDetails';
  attemptsPerRound: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  isTeamTournament: Scalars['Boolean']['output'];
  isTournamentActivity: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nodeId?: Maybe<Scalars['String']['output']>;
  overrideAdvertisement: Scalars['Boolean']['output'];
  roundEnd?: Maybe<Scalars['DateTime']['output']>;
  roundId?: Maybe<Scalars['String']['output']>;
  roundNumber: Scalars['Int']['output'];
  roundStart: Scalars['DateTime']['output'];
  state?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  teamSize: Scalars['Int']['output'];
  type?: Maybe<Scalars['String']['output']>;
  videoRecordingRequired: Scalars['Boolean']['output'];
};

export type TournamentEmbeddedGame = {
  __typename?: 'TournamentEmbeddedGame';
  closestToPin?: Maybe<TournamentClosestToPinEmbeddedGame>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseVersion?: Maybe<Scalars['String']['output']>;
  femaleTee?: Maybe<TeeSettings>;
  holes: HolesToPlay;
  longestDrive?: Maybe<TournamentLongestDriveEmbeddedGame>;
  maleTee?: Maybe<TeeSettings>;
};

/** Mutations on a Tournament's Embedded games */
export type TournamentEmbeddedGameMutation = {
  __typename?: 'TournamentEmbeddedGameMutation';
  /** Get Closest To Pin Game */
  closestToPin?: Maybe<TournamentClosestToPinEmbeddedGameMutation>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseVersion?: Maybe<Scalars['String']['output']>;
  femaleTee?: Maybe<TeeSettings>;
  holes: HolesToPlay;
  /** Get Longest Drive Game */
  longestDrive?: Maybe<TournamentLongestDriveEmbeddedGameMutation>;
  maleTee?: Maybe<TeeSettings>;
};

export type TournamentGeoFilterIncludedExcludedType = {
  __typename?: 'TournamentGeoFilterIncludedExcludedType';
  /** Continent codes included or excluded in the geo filter */
  continents?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Country codes included or excluded in the geo filter */
  countries?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Region codes included or excluded in the geo filter */
  regions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type TournamentGeoFilterType = {
  __typename?: 'TournamentGeoFilterType';
  /** Values excluded from the filter */
  excluded?: Maybe<TournamentGeoFilterIncludedExcludedType>;
  /** Values included in the filter */
  included?: Maybe<TournamentGeoFilterIncludedExcludedType>;
};

export type TournamentHole = {
  __typename?: 'TournamentHole';
  holeNumber?: Maybe<Scalars['Int']['output']>;
  pinId?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type TournamentInterfaceTypeCollectionSegment = {
  __typename?: 'TournamentInterfaceTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Tournament>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** The different list kinds available */
export enum TournamentListKinds {
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  History = 'HISTORY',
  Live = 'LIVE',
  LiveAndUpcoming = 'LIVE_AND_UPCOMING',
  Scheduled = 'SCHEDULED'
}

export type TournamentLocations = {
  __typename?: 'TournamentLocations';
  /** Is this tournament available in all locations connected to the facility that created the tournament */
  allLocationsIsSelected?: Maybe<Scalars['Boolean']['output']>;
  /** The locations where this tournament is available */
  list?: Maybe<Array<LocationInterfaceType>>;
};

export type TournamentLongestDriveEmbeddedGame = {
  __typename?: 'TournamentLongestDriveEmbeddedGame';
  /** Holes that can be selected for the embedded game */
  availableHoles?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseVersion?: Maybe<Scalars['String']['output']>;
  /** Holes that has been selected for the embedded game */
  holes?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  selectedHoles: HolesToPlay;
};

/** Mutations on a Longest Drive Embedded games */
export type TournamentLongestDriveEmbeddedGameMutation = {
  __typename?: 'TournamentLongestDriveEmbeddedGameMutation';
  /** Apply new list of holes */
  changeHoles?: Maybe<TournamentLongestDriveEmbeddedGame>;
  courseIdentifier?: Maybe<Scalars['String']['output']>;
  courseVersion?: Maybe<Scalars['String']['output']>;
  holes?: Maybe<Array<Scalars['Int']['output']>>;
  selectedHoles: HolesToPlay;
};


/** Mutations on a Longest Drive Embedded games */
export type TournamentLongestDriveEmbeddedGameMutationChangeHolesArgs = {
  holesToPlay?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

/** Mutations on a Tournament */
export type TournamentMutationInterface = {
  /** Accept invitation */
  acceptInvitation?: Maybe<Invitation>;
  /** Add default image to the media assets */
  addDefaultImage?: Maybe<MediaAssetsInterface>;
  /** add a location to this tournament */
  addLocation?: Maybe<Tournament>;
  /** Add media assets to the media assets */
  addMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Add default requirements for participation to the tournament.Only use 'templateOwner' argument if assigning template from a specific user, otherwise leave blank to use the Trackman global template. */
  addParticipantRequirementsFromDefaultTemplate?: Maybe<Tournament>;
  /** Add a sponsor to the tournament */
  addSponsor?: Maybe<Tournament>;
  /** Change the description of the tournament */
  changeDescription?: Maybe<Tournament>;
  /** Change the units used when playing the tournament */
  changeGameUnit?: Maybe<Tournament>;
  /** change the payment configuration of a location */
  changeLocationPaymentConfiguration?: Maybe<Tournament>;
  /** Change the logo of the tournament */
  changeLogo?: Maybe<Tournament>;
  /** Change the max participants of the location config */
  changeMaxParticipants?: Maybe<Tournament>;
  /** Change the name of the tournament */
  changeName?: Maybe<Tournament>;
  /** change the end time of the sign up */
  changeSignUpEndTime?: Maybe<Tournament>;
  /** change the start time of the sign up */
  changeSignUpStartTime?: Maybe<Tournament>;
  /** deSelect all facility locations for this tournament */
  deSelectAllLocations?: Maybe<Tournament>;
  /** Decline invitation */
  declineInvitation?: Maybe<Invitation>;
  /** Delete the tournament */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Disable payment. Please note that the existing payment configuration will be deleted. */
  disablePayment?: Maybe<Tournament>;
  /** Enable payment. Payment needs to be configured for each location where the tournament is available. */
  enablePayment?: Maybe<Tournament>;
  /** filter out the locations that are not configured for payment */
  filterOutLocationsNotConfiguredForPayment?: Maybe<Tournament>;
  /** Invite by emails */
  invite?: Maybe<Scalars['Boolean']['output']>;
  /** Join the tournament */
  join?: Maybe<Invitation>;
  /** Join a player to the tournament without the player having to accept an invitation */
  joinPlayer?: Maybe<Invitation>;
  /** Move a tournament and all it's round to a new starting date and time */
  moveStartTime?: Maybe<Tournament>;
  /** Publish the draft as published */
  publish?: Maybe<Tournament>;
  /** Resend invitation */
  reInvite?: Maybe<Invitation>;
  /** Remove all participant groups from the tournament */
  removeAllParticipantGroups?: Maybe<Tournament>;
  /** remove a location from this tournament */
  removeLocation?: Maybe<Tournament>;
  /** Remove media assets from the media assets */
  removeMediaAssets?: Maybe<MediaAssetsInterface>;
  /** Remove a participant group from the tournament */
  removeParticipantGroup?: Maybe<Tournament>;
  /** Remove requirements for participation from the tournament */
  removeParticipantRequirements?: Maybe<Tournament>;
  /** Remove a sponsor from the tournament */
  removeSponsor?: Maybe<Tournament>;
  /** Replace a sponsor already added to the tournament */
  replaceSponsor?: Maybe<Tournament>;
  /** Remove all media assets, and fallback to default media assets */
  resetMediaAssets?: Maybe<MediaAssetsInterface>;
  /** The round default mutations */
  roundDefaults?: Maybe<TournamentRoundDefaultsMutation>;
  /** select all facility locations for this tournament */
  selectAllLocations?: Maybe<Tournament>;
  /** Set the tournament availability */
  setAvailability?: Maybe<Tournament>;
  /** Set flag indicating that this is an indoor tournament */
  setIsIndoor?: Maybe<Tournament>;
  /** Set flag indicating that this is a range tournament */
  setIsRange?: Maybe<Tournament>;
  /** Method for updating the key values collections on the tournament */
  setKeyValues?: Maybe<Tournament>;
  /**
   * Add or remove which locations this tournament is available.
   * @deprecated No longer supported.
   */
  setLocations?: Maybe<Tournament>;
  /** Un-publish the published version */
  unPublish?: Maybe<Tournament>;
  /** Add or remove geo filters to the tournament */
  updateGeoFilters?: Maybe<Tournament>;
  /** Update group for participation in the tournament. Renaming an existing group will delete the old group and create a new one.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantGroup?: Maybe<Tournament>;
  /** Update requirements for participation to the tournament.Not passing a value for a criteria will remove it, ie. even if you do not change an existing criteriait must still be provided in order to keep it. */
  updateParticipantRequirements?: Maybe<Tournament>;
  /** Add or remove tags to the tournament */
  updateTags?: Maybe<Tournament>;
  /** Withdraw invitation */
  withdrawInvitation?: Maybe<Invitation>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceAcceptInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceAddDefaultImageArgs = {
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceAddLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceAddMediaAssetsArgs = {
  mediaAssetKind: Array<InputMaybe<MediaAssetKind>>;
  mediaId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceAddParticipantRequirementsFromDefaultTemplateArgs = {
  templateOwner?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceAddSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeGameUnitArgs = {
  unit?: InputMaybe<GameUnit>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeLocationPaymentConfigurationArgs = {
  fee?: InputMaybe<Scalars['NonNegativeFloat']['input']>;
  flags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeLogoArgs = {
  logoUrl: Scalars['Url']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeMaxParticipantsArgs = {
  locationId: Scalars['ID']['input'];
  maxParticipants?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeNameArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeSignUpEndTimeArgs = {
  signUpEndTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceChangeSignUpStartTimeArgs = {
  signUpStartTime?: InputMaybe<Scalars['DateTime']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceDeclineInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceInviteArgs = {
  emails: Array<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceJoinPlayerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceMoveStartTimeArgs = {
  newStartTime: Scalars['DateTime']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceReInviteArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceRemoveLocationArgs = {
  locationId: Scalars['ID']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceRemoveMediaAssetsArgs = {
  mediaAssetKind: Array<MediaAssetKind>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceRemoveParticipantGroupArgs = {
  name: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceRemoveSponsorArgs = {
  sponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceReplaceSponsorArgs = {
  newSponsorId: Scalars['String']['input'];
  oldSponsorId: Scalars['String']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceSetAvailabilityArgs = {
  availability: TournamentAvailability;
  makeAvailableForAllBays?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceSetIsIndoorArgs = {
  isIndoor: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceSetIsRangeArgs = {
  isRange: Scalars['Boolean']['input'];
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceSetKeyValuesArgs = {
  addKeyValues?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  removeKeyValues?: InputMaybe<Array<Scalars['String']['input']>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceSetLocationsArgs = {
  addLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  removeLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
  selectAll?: InputMaybe<Scalars['Boolean']['input']>;
  setLocations?: InputMaybe<Array<InputMaybe<Scalars['NonEmptyString']['input']>>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceUpdateGeoFiltersArgs = {
  addExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  addIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  field?: InputMaybe<GeoFilterFields>;
  removeExcludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeIncludedValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceUpdateParticipantGroupArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  name: Scalars['String']['input'];
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceUpdateParticipantRequirementsArgs = {
  age?: InputMaybe<AgeInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderInput>;
  handicapRange?: InputMaybe<HandicapRangeInput>;
  trackmanHandicap?: InputMaybe<TrackmanHandicapInput>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceUpdateTagsArgs = {
  addTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  removeTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Mutations on a Tournament */
export type TournamentMutationInterfaceWithdrawInvitationArgs = {
  invitationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum TournamentPlayerRoundState {
  DidNotFinish = 'DID_NOT_FINISH',
  NotPlayed = 'NOT_PLAYED',
  NoShow = 'NO_SHOW',
  Played = 'PLAYED',
  Started = 'STARTED'
}

export type TournamentProgressInterface = {
  isTeamProgress?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<PersonInfo>;
  participantGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type TournamentRound = Node & {
  __typename?: 'TournamentRound';
  /** the progress query call for adding a scorecard manually */
  addScorecardProgress?: Maybe<Array<Maybe<TournamentProgressInterface>>>;
  /** The course that the round was played on */
  course?: Maybe<Course>;
  /** Course Instance Id for the round */
  courseInstanceId?: Maybe<Scalars['String']['output']>;
  dbId?: Maybe<Scalars['String']['output']>;
  /**
   * The duration count
   * @deprecated No longer used
   */
  duration?: Maybe<Scalars['PositiveInt']['output']>;
  /**
   * The duration kind (Day, Week, Month).
   * @deprecated No longer used
   */
  durationKind?: Maybe<DurationKind>;
  /** Embedded game */
  embeddedGame?: Maybe<TournamentEmbeddedGame>;
  /** The end date and time */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isPublished?: Maybe<Scalars['Boolean']['output']>;
  links?: Maybe<Array<LinkKeyValue>>;
  /** Number of holes */
  numberOfHoles?: Maybe<Scalars['PositiveInt']['output']>;
  /** Number of holes */
  orderOfMeritScoring?: Maybe<OrderOfMeritScoring>;
  /** The round duration */
  roundDuration?: Maybe<Scalars['TimeSpan']['output']>;
  /** The round number */
  roundNumber?: Maybe<Scalars['Int']['output']>;
  /** Round state */
  roundState?: Maybe<TournamentRoundState>;
  /** The round settings */
  settings?: Maybe<RoundSettings>;
  /** The start date and time */
  startDate?: Maybe<Scalars['DateTime']['output']>;
};


export type TournamentRoundAddScorecardProgressArgs = {
  participantIds: Array<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type TournamentRoundLinksArgs = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  includeDescriptionFile?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  serialNo?: InputMaybe<Scalars['String']['input']>;
};

export type TournamentRoundDefaultsMutation = {
  __typename?: 'TournamentRoundDefaultsMutation';
  changeDefaultRoundTime?: Maybe<DefaultRoundSettings>;
};


export type TournamentRoundDefaultsMutationChangeDefaultRoundTimeArgs = {
  adjustRounds?: InputMaybe<Scalars['Boolean']['input']>;
  defaultRoundTime: Scalars['TimeSpan']['input'];
};

export type TournamentRoundMutation = {
  __typename?: 'TournamentRoundMutation';
  /** Create a new scorecard */
  addScorecard?: Maybe<Array<Maybe<Scorecard>>>;
  /** Apply this round settings to all rounds */
  applyRoundSettingsToAllRounds?: Maybe<TournamentRound>;
  /** Change the end course of the round */
  changeCourse?: Maybe<TournamentRound>;
  /**
   * Change the duration round
   * @deprecated Use changeRoundDates instead
   */
  changeDuration?: Maybe<Tournament>;
  /**
   * Change the end date of the round
   * @deprecated Use changeRoundDates instead
   */
  changeEndDate?: Maybe<TournamentRound>;
  /**
   * Change the end time of the round
   * @deprecated Use changeRoundDates instead
   */
  changeEndTime?: Maybe<TournamentRound>;
  /** Change the fairway firmness of the round */
  changeFairwayFirmness?: Maybe<TournamentRound>;
  /** Change the female tee of the round */
  changeFemaleTee?: Maybe<TournamentRound>;
  /** Change the gimme distance of the round */
  changeGimmeDistance?: Maybe<TournamentRound>;
  /** Change the green firmness of the round */
  changeGreenFirmness?: Maybe<TournamentRound>;
  /** Change the green stimp of the round */
  changeGreenStimp?: Maybe<TournamentRound>;
  /** Change the holes to play of the round */
  changeHolesToPlay?: Maybe<TournamentRound>;
  /** Change the lighting of the course when played for this round */
  changeLighting?: Maybe<TournamentRound>;
  /** Change the male tee of the round */
  changeMaleTee?: Maybe<TournamentRound>;
  /** Change the way the max score is determined. */
  changeMaxScoreMethod?: Maybe<TournamentRound>;
  /** Change the pin difficulty of the round */
  changePinDifficulty?: Maybe<TournamentRound>;
  /** Change the putting mode of the round */
  changePuttingMode?: Maybe<TournamentRound>;
  /** Change the start- and/or end date of the round. Must be in UTC time. */
  changeRoundDates?: Maybe<TournamentRound>;
  /**
   * Change the start date of the round
   * @deprecated Use changeRoundDates instead
   */
  changeStartDate?: Maybe<TournamentRound>;
  /** Change the wind speed of the round */
  changeWindSpeed?: Maybe<TournamentRound>;
  /** Delete the round */
  delete?: Maybe<Scalars['Boolean']['output']>;
  /** Embedded games */
  embeddedGame?: Maybe<TournamentEmbeddedGameMutation>;
  /** End the round */
  endRound?: Maybe<TournamentRound>;
};


export type TournamentRoundMutationAddScorecardArgs = {
  locationId?: InputMaybe<Scalars['ID']['input']>;
  scorecard: Array<InputMaybe<AddScorecardInput>>;
};


export type TournamentRoundMutationChangeCourseArgs = {
  courseIdentifier: Scalars['String']['input'];
  courseInstanceId?: InputMaybe<Scalars['String']['input']>;
};


export type TournamentRoundMutationChangeDurationArgs = {
  duration?: InputMaybe<Scalars['PositiveInt']['input']>;
  durationType: DurationKind;
};


export type TournamentRoundMutationChangeEndDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type TournamentRoundMutationChangeEndTimeArgs = {
  time: Scalars['LocalTime']['input'];
};


export type TournamentRoundMutationChangeFairwayFirmnessArgs = {
  fairwayFirmness: Firmness;
};


export type TournamentRoundMutationChangeFemaleTeeArgs = {
  teeName: Scalars['String']['input'];
};


export type TournamentRoundMutationChangeGimmeDistanceArgs = {
  GimmeDistance: Scalars['NonNegativeFloat']['input'];
};


export type TournamentRoundMutationChangeGreenFirmnessArgs = {
  greenFirmness: Firmness;
};


export type TournamentRoundMutationChangeGreenStimpArgs = {
  greenStimp: Stimp;
};


export type TournamentRoundMutationChangeHolesToPlayArgs = {
  holesToPlay: HolesToPlay;
  specifiedHoles?: InputMaybe<Array<Scalars['PositiveInt']['input']>>;
};


export type TournamentRoundMutationChangeLightingArgs = {
  lighting: Lighting;
};


export type TournamentRoundMutationChangeMaleTeeArgs = {
  teeName: Scalars['String']['input'];
};


export type TournamentRoundMutationChangeMaxScoreMethodArgs = {
  maxScore?: InputMaybe<Scalars['Int']['input']>;
  maxScoreMethod?: OrderOfMeritMaxScoreMethod;
  percentageModifier?: InputMaybe<Scalars['Int']['input']>;
};


export type TournamentRoundMutationChangePinDifficultyArgs = {
  pinDifficulty: Pin;
};


export type TournamentRoundMutationChangePuttingModeArgs = {
  puttingMode: PuttMode;
};


export type TournamentRoundMutationChangeRoundDatesArgs = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type TournamentRoundMutationChangeStartDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type TournamentRoundMutationChangeWindSpeedArgs = {
  wind: WindMode;
};

export enum TournamentRoundState {
  Completed = 'COMPLETED',
  NotStarted = 'NOT_STARTED',
  Started = 'STARTED',
  Unknown = 'UNKNOWN'
}

export enum TournamentScoreOptions {
  OrderOfMerit = 'ORDER_OF_MERIT',
  Stableford = 'STABLEFORD',
  Stroke = 'STROKE'
}

export type TournamentSettings = {
  __typename?: 'TournamentSettings';
  /** Allow mulligans when playing */
  allowMulligans?: Maybe<Mulligans>;
  /** Allow to play rounds ahead in the tournament */
  allowPlayAhead?: Maybe<Scalars['Boolean']['output']>;
  /** The number of attempts pr round that counts on the leaderboard */
  attempts?: Maybe<Scalars['PositiveInt']['output']>;
  /** The default round game settings used for adding a new round */
  defaultRoundGameSettings?: Maybe<DefaultRoundSettings>;
  /** The format of the team tournament */
  gameFormat?: Maybe<GameFormats>;
  /** The tournament game type */
  gameType?: Maybe<GameTypes>;
  /** The tournament handicap kind */
  hcpKind?: Maybe<HcpKind>;
  /** The number of bottom scoring rounds that are not counted on the leaderboard */
  ignoreBottomRounds?: Maybe<Scalars['Int']['output']>;
  /** the score options of the tournament */
  scoreOptions?: Maybe<TournamentScoreOptions>;
};

/** State of the tournament */
export enum TournamentState {
  Completed = 'COMPLETED',
  IsActive = 'IS_ACTIVE',
  NotStarted = 'NOT_STARTED'
}

/** A Tournament Team */
export type TournamentTeam = Node & TeamInterface & {
  __typename?: 'TournamentTeam';
  /** The color for the team */
  color?: Maybe<Scalars['String']['output']>;
  /** The time the team was created */
  createdAt: Scalars['DateTime']['output'];
  /** The icon for the team */
  icon?: Maybe<Scalars['String']['output']>;
  /** The global object identification */
  id: Scalars['ID']['output'];
  /** Indicates whether the team has paid */
  isPaid?: Maybe<Scalars['Boolean']['output']>;
  /** The registered location for the team */
  location?: Maybe<Location>;
  /** The maximum team size */
  maxSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  members: Array<TournamentTeamMember>;
  /** The minimum team size */
  minSize?: Maybe<Scalars['NonNegativeInt']['output']>;
  /** name of the team */
  name: Scalars['String']['output'];
  /** Payment information */
  payment?: Maybe<PaymentInformation>;
  /** The team status */
  status: TeamStatus;
  /** The team status code */
  statusCode: TeamStatusCode;
};

/** Member in a team for a Tournament */
export type TournamentTeamMember = TeamMemberInterface & {
  __typename?: 'TournamentTeamMember';
  /** Information about this person */
  person?: Maybe<PersonInfo>;
  /** The member status */
  status: TeamMemberStatus;
};

export type TournamentTeamSettingsType = {
  __typename?: 'TournamentTeamSettingsType';
  /** The number of players allowed on each team */
  size?: Maybe<Scalars['Int']['output']>;
};

/** A segment of a collection. */
export type TournamentTeamTypeCollectionSegment = {
  __typename?: 'TournamentTeamTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TeamInterface>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TournamentTee = {
  __typename?: 'TournamentTee';
  courseDistance: Scalars['Float']['output'];
  courseRating: Scalars['Float']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  groupId?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  par: Scalars['Int']['output'];
  slope: Scalars['Int']['output'];
};

export enum TournamentTypes {
  BullsEye = 'BULLS_EYE',
  ClosestToPin = 'CLOSEST_TO_PIN',
  CourseTournament = 'COURSE_TOURNAMENT',
  LongestDrive = 'LONGEST_DRIVE',
  OrderOfMerit = 'ORDER_OF_MERIT',
  PuttPutt = 'PUTT_PUTT',
  ShuffleBullsEye = 'SHUFFLE_BULLS_EYE'
}

export type TournamentVersionInfo = {
  __typename?: 'TournamentVersionInfo';
  /** The current version number of the tournaments draft state */
  draftVersion?: Maybe<Tournament>;
  /** The version number of the current published version of the tournament */
  publishedVersion?: Maybe<Tournament>;
  /** The state of the tournament */
  state: VersionInfoState;
  /** The version number of the tournament */
  version: Scalars['String']['output'];
};

export type TpsApplicationData = ApplicationDataInterface & {
  __typename?: 'TpsApplicationData';
  activityLayout?: Maybe<ApplicationLayout>;
  applicationLayout?: Maybe<ApplicationLayout>;
  /** The bay connected to this device */
  bay?: Maybe<SimulatorBay>;
  client?: Maybe<ApplicationClients>;
  /** Is TPS allowed to connect to the devices having the supplied serial numbers */
  deviceValidation?: Maybe<DeviceValidation>;
  /** The ISS that allowed to connect by TPS */
  indoorSiteServer?: Maybe<IndoorSiteServer>;
  properties?: Maybe<Array<Maybe<ApplicationProperty>>>;
  /** All releases available for download */
  releases?: Maybe<ReleasesModel>;
  tournamentLayout?: Maybe<ApplicationLayout>;
};


export type TpsApplicationDataActivityLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  timeFrom?: InputMaybe<Scalars['DateTime']['input']>;
};


export type TpsApplicationDataDeviceValidationArgs = {
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type TpsApplicationDataPropertiesArgs = {
  appIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  specifiedLevel?: InputMaybe<ApplicationPropertyLevelsEnumType>;
};


export type TpsApplicationDataReleasesArgs = {
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type TpsApplicationDataTournamentLayoutArgs = {
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TpsApplicationDataMutations = ApplicationDataMutationInterfaceType & {
  __typename?: 'TpsApplicationDataMutations';
  /** Creates a simulator bay on the facility with the supplied deviceId and serial number */
  createBay?: Maybe<SimulatorBay>;
};


export type TpsApplicationDataMutationsCreateBayArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type TrackManAccountNotFoundError = BaseError & {
  __typename?: 'TrackManAccountNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

/** Trackman resource types */
export type TrackManResource = {
  __typename?: 'TrackManResource';
  /** The resource id */
  id?: Maybe<Scalars['String']['output']>;
  /** The resource identifier */
  identifier?: Maybe<Scalars['String']['output']>;
  /** Platform of resource */
  platform?: Maybe<Scalars['String']['output']>;
  /** Scene name of resource */
  sceneName?: Maybe<Scalars['String']['output']>;
  /** sha256 of resource */
  sha256?: Maybe<Scalars['String']['output']>;
  /** Size of resource in bytes */
  size: Scalars['Int']['output'];
  /** Title of resource */
  title?: Maybe<Scalars['String']['output']>;
  /** Type of resource */
  type?: Maybe<Scalars['String']['output']>;
  /** Url to download resource */
  url?: Maybe<Scalars['String']['output']>;
  /** Version of resource */
  version?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type TrackManResourceTypeCollectionSegment = {
  __typename?: 'TrackManResourceTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TrackManResource>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TrackerMessagePlayer = {
  __typename?: 'TrackerMessagePlayer';
  /** The id of the player */
  id?: Maybe<Scalars['String']['output']>;
  /** Indicate whether the player is a temporary player or not */
  isTempAccount?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the player */
  name?: Maybe<Scalars['String']['output']>;
};

export type TrackerNoiseNotification = {
  __typename?: 'TrackerNoiseNotification';
  acceptableLevelExceeded: Scalars['Boolean']['output'];
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  maxAge: Scalars['Float']['output'];
  measuredLevel?: Maybe<Array<Scalars['Float']['output']>>;
  noisyChannels?: Maybe<Array<Scalars['Int']['output']>>;
};

/** The different product kinds available */
export enum TrackmanProductKinds {
  Indoor = 'INDOOR',
  Range = 'RANGE'
}

export type TracySessionActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'TracySessionActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  sessionId?: Maybe<Scalars['String']['output']>;
  strokeCount: Scalars['Int']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type TracySessionActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TracySessionActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  maxTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  maxTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
};

export type Trajectory = {
  __typename?: 'Trajectory';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  kind?: Maybe<Scalars['String']['output']>;
  measuredTimeInterval?: Maybe<Array<Scalars['Float']['output']>>;
  spinRateFit?: Maybe<Array<Scalars['Float']['output']>>;
  timeInterval?: Maybe<Array<Scalars['Float']['output']>>;
  validTimeInterval?: Maybe<Array<Scalars['Float']['output']>>;
  xFit?: Maybe<Array<Scalars['Float']['output']>>;
  yFit?: Maybe<Array<Scalars['Float']['output']>>;
  zFit?: Maybe<Array<Scalars['Float']['output']>>;
};

export type TupleOfDoubleAndDouble = {
  __typename?: 'TupleOfDoubleAndDouble';
  item1: Scalars['Float']['output'];
  item2: Scalars['Float']['output'];
};

/** It indicates the type of target */
export enum Type {
  /** All target */
  All = 'ALL',
  /** Directional only target */
  DirectionalOnly = 'DIRECTIONAL_ONLY',
  /** Game only target */
  GameOnly = 'GAME_ONLY'
}

/** Universal Transverse Mercator (UTM) coordinate system. Uses the WGS 84 Datum by default. */
export type Utm = {
  __typename?: 'UTM';
  asString?: Maybe<Scalars['String']['output']>;
  /** UTM Easting */
  easting?: Maybe<Scalars['Float']['output']>;
  /** UTM Latitude Band Grid Zone Designation */
  latZone?: Maybe<Scalars['String']['output']>;
  /** UTM Longitude Band Grid Zone Designation */
  longZone?: Maybe<Scalars['Int']['output']>;
  /** UTM Northing */
  northing?: Maybe<Scalars['Float']['output']>;
};

export type UnRegisterDeviceNotificationError = DefaultError;

export type UnRegisterDeviceNotificationInput = {
  deviceId: Scalars['String']['input'];
};

export type UnRegisterDeviceNotificationPayload = {
  __typename?: 'UnRegisterDeviceNotificationPayload';
  device?: Maybe<Device>;
  errors?: Maybe<Array<UnRegisterDeviceNotificationError>>;
};

export type UnauthorizedError = BaseError & {
  __typename?: 'UnauthorizedError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  resourceId?: Maybe<Scalars['String']['output']>;
  resourceName?: Maybe<Scalars['String']['output']>;
};

export type UniqActiveClubsRuleError = BaseError & {
  __typename?: 'UniqActiveClubsRuleError';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum UnitSystem {
  Imperial = 'IMPERIAL',
  Metric = 'METRIC'
}

export type UnityPositionInput = {
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
  z: Scalars['Float']['input'];
};

export type UnityTransformationMetadataPixelPosition = {
  __typename?: 'UnityTransformationMetadataPixelPosition';
  x: Scalars['Int']['output'];
  xPct: Scalars['Float']['output'];
  y: Scalars['Int']['output'];
  yPct: Scalars['Float']['output'];
};

export type UnlockBaysError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type UnlockBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  unlockCode?: InputMaybe<Scalars['String']['input']>;
};

export type UnlockBaysPayload = {
  __typename?: 'UnlockBaysPayload';
  errors?: Maybe<Array<UnlockBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export enum UpState {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type UpdateClubError = ClubHeadTypeNotSupportedError | DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UniqActiveClubsRuleError;

export type UpdateClubInput = {
  brandId?: InputMaybe<Scalars['ID']['input']>;
  clubId: Scalars['ID']['input'];
  displayName?: InputMaybe<Scalars['String']['input']>;
  isRetired?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateClubPayload = {
  __typename?: 'UpdateClubPayload';
  errors?: Maybe<Array<UpdateClubError>>;
  result?: Maybe<Club>;
};

export type UpdateCoachProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  bookingUrl?: InputMaybe<Scalars['URL']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePictureUrl?: InputMaybe<Scalars['URL']['input']>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  webSiteUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type UpdateCoachProfilePayload = {
  __typename?: 'UpdateCoachProfilePayload';
  coachProfile?: Maybe<CoachProfile>;
};

export type UpdateFindMyDistanceShotsError = DefaultError | MissingMandatoryFieldError;

export type UpdateFindMyDistanceShotsInput = {
  clubId: Scalars['ID']['input'];
  findMyDistanceShots?: InputMaybe<Array<InputMaybe<FindMyDistanceShotInput>>>;
};

export type UpdateFindMyDistanceShotsPayload = {
  __typename?: 'UpdateFindMyDistanceShotsPayload';
  errors?: Maybe<Array<UpdateFindMyDistanceShotsError>>;
  result?: Maybe<Club>;
};

export type UpdateKeyAccountPriorityError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type UpdateKeyAccountPriorityInput = {
  id: Scalars['ID']['input'];
  priority?: FacilityKeyAccountPriority;
};

export type UpdateKeyAccountPriorityPayload = {
  __typename?: 'UpdateKeyAccountPriorityPayload';
  errors?: Maybe<Array<UpdateKeyAccountPriorityError>>;
  facility?: Maybe<Facility>;
};

export type UpdateLabelError = DefaultError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type UpdateLabelInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateLabelPayload = {
  __typename?: 'UpdateLabelPayload';
  errors?: Maybe<Array<UpdateLabelError>>;
  labelType?: Maybe<LabelType>;
};

export type UpdateLocationPinCodeError = DefaultError | EntityNotFoundError | UnauthorizedError;

export type UpdateLocationPinCodeInput = {
  locationId: Scalars['String']['input'];
  pinCode: Scalars['String']['input'];
};

export type UpdateLocationPinCodePayload = {
  __typename?: 'UpdateLocationPinCodePayload';
  appMutationResult?: Maybe<AppMutationResult>;
  errors?: Maybe<Array<UpdateLocationPinCodeError>>;
};

export type UpdateMembershipError = DefaultError | EndDateLessThanStartDateError | EntityNotFoundError | MissingMandatoryFieldError | UnauthorizedError;

export type UpdateMembershipInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['NonEmptyString']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateMembershipPayload = {
  __typename?: 'UpdateMembershipPayload';
  errors?: Maybe<Array<UpdateMembershipError>>;
  membership?: Maybe<MembershipInfo>;
};

export type UpdateOAuthClientApplicationInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOAuthClientApplicationPayload = {
  __typename?: 'UpdateOAuthClientApplicationPayload';
  application?: Maybe<Application>;
};

export type UpdatePlayerHcpCommandResult = {
  __typename?: 'UpdatePlayerHcpCommandResult';
  /** The list of all the scorecards the current hcp index is based on */
  failed?: Maybe<Array<PlayerHcpUpdate>>;
  /** The list of all the scorecards the current hcp index is based on */
  succeeded?: Maybe<Array<PlayerHcpUpdate>>;
};

export type UpdateRadarCameraStatusError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type UpdateRadarCameraStatusInput = {
  id: Scalars['ID']['input'];
  isEnabled: Scalars['Boolean']['input'];
};

export type UpdateRadarCameraStatusPayload = {
  __typename?: 'UpdateRadarCameraStatusPayload';
  appMutationResult?: Maybe<AppMutationResult>;
  errors?: Maybe<Array<UpdateRadarCameraStatusError>>;
};

export type UpdateRadarGpsRtkStatusError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | UnauthorizedError;

export type UpdateRadarGpsRtkStatusInput = {
  id: Scalars['ID']['input'];
  isEnabled: Scalars['Boolean']['input'];
};

export type UpdateRadarGpsRtkStatusPayload = {
  __typename?: 'UpdateRadarGpsRtkStatusPayload';
  appMutationResult?: Maybe<AppMutationResult>;
  errors?: Maybe<Array<UpdateRadarGpsRtkStatusError>>;
};

export type UpdateRangeBayError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type UpdateRangeBayInput = {
  annotations?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  availability?: InputMaybe<BayAvailability>;
  bayNumber?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isKioskOnly?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sectionId?: InputMaybe<Scalars['ID']['input']>;
  worldCoordinate?: InputMaybe<WorldCoord>;
};

export type UpdateRangeBayPayload = {
  __typename?: 'UpdateRangeBayPayload';
  errors?: Maybe<Array<UpdateRangeBayError>>;
  rangeBay?: Maybe<RangeBay>;
};

export type UpdateRangeLaunchAreaError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type UpdateRangeLaunchAreaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  vertices: Array<LaunchAreaCoordinatesInput>;
};

export type UpdateRangeLaunchAreaPayload = {
  __typename?: 'UpdateRangeLaunchAreaPayload';
  errors?: Maybe<Array<UpdateRangeLaunchAreaError>>;
  launchArea?: Maybe<LaunchAreaType>;
};

export type UpdateRangeNetError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | NumericValueOutOfRangeError | NumericValueShouldBePositiveOrZeroError | UnauthorizedError;

export type UpdateRangeNetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  poles: Array<NetPoleInput>;
};

export type UpdateRangeNetPayload = {
  __typename?: 'UpdateRangeNetPayload';
  errors?: Maybe<Array<UpdateRangeNetError>>;
  net?: Maybe<Net>;
};

export type UpdateRangeRadarError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type UpdateRangeRadarInput = {
  canConfirm?: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  isEnabled?: Scalars['Boolean']['input'];
  isOverhead?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  serialNumber?: InputMaybe<Scalars['Int']['input']>;
  uri: Scalars['String']['input'];
  worldCoordinate: WorldCoord;
};

export type UpdateRangeRadarPayload = {
  __typename?: 'UpdateRangeRadarPayload';
  errors?: Maybe<Array<UpdateRangeRadarError>>;
  radar?: Maybe<Radar>;
};

export type UpdateRangeSectionError = DefaultError | DuplicateRecordError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError;

export type UpdateRangeSectionInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateRangeSectionPayload = {
  __typename?: 'UpdateRangeSectionPayload';
  errors?: Maybe<Array<UpdateRangeSectionError>>;
  section?: Maybe<Section>;
};

export type UpdateRangeTargetError = ConcurrencyViolationError | DefaultError | EntityNotFoundError | EntityNotModifiableError | MissingMandatoryFieldError | NumericValueOutOfRangeError | UnauthorizedError;

export type UpdateRangeTargetInput = {
  annotations?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isEnabled?: Scalars['Boolean']['input'];
  isHidden?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  targetType?: Type;
  worldCoordinate: WorldCoord;
};

export type UpdateRangeTargetPayload = {
  __typename?: 'UpdateRangeTargetPayload';
  errors?: Maybe<Array<UpdateRangeTargetError>>;
  rangeTarget?: Maybe<RangeTarget>;
};

export type UpdateUserPhoneNumberError = DefaultError | InvalidPhoneNumberError | InvalidPhoneVerificationCodeError | InvalidStringValueLengthError | MissingMandatoryFieldError | UnauthorizedError | UserIsLockedOutError;

export type UpdateUserPhoneNumberInput = {
  code: Scalars['NonEmptyString']['input'];
  phoneNumber: Scalars['NonEmptyString']['input'];
};

export type UpdateUserPhoneNumberPayload = {
  __typename?: 'UpdateUserPhoneNumberPayload';
  errors?: Maybe<Array<UpdateUserPhoneNumberError>>;
  profile?: Maybe<Profile>;
};

export type UpdateUserProfileError = DefaultError | DuplicatePlayerNameError | InvalidBirthDateError;

export type UpdateUserProfileInput = {
  category?: InputMaybe<PlayerCategory>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  dexterity?: InputMaybe<PlayerDexterity>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  handicap?: InputMaybe<Scalars['Float']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  nationalityCode?: InputMaybe<Scalars['String']['input']>;
  playerName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfilePayload = {
  __typename?: 'UpdateUserProfilePayload';
  errors?: Maybe<Array<UpdateUserProfileError>>;
  profile?: Maybe<Profile>;
};

export type UpdatedPlayerInput = {
  /** Player id (not team id) */
  id: Scalars['String']['input'];
};

export type UpdatedScorecard = {
  records?: InputMaybe<Array<InputMaybe<UpdatedScorecardRecordInput>>>;
};

export type UpdatedScorecardHoleInput = {
  /** Hole number */
  holeNumber: Scalars['Int']['input'];
  /** Gross score */
  score: Scalars['Int']['input'];
};

export type UpdatedScorecardRecordInput = {
  /** Updated holes */
  holes?: InputMaybe<Array<InputMaybe<UpdatedScorecardHoleInput>>>;
  /** List of players on the scorecard */
  players?: InputMaybe<Array<InputMaybe<UpdatedPlayerInput>>>;
};

export type UploadLogsFromBaysError = ConnectionNotFoundError | DefaultError | ReceiversNotFoundError;

export type UploadLogsFromBaysInput = {
  bayIds: Array<Scalars['ID']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UploadLogsFromBaysPayload = {
  __typename?: 'UploadLogsFromBaysPayload';
  errors?: Maybe<Array<UploadLogsFromBaysError>>;
  result?: Maybe<AppMutationResult>;
};

export type UrlInput = {
  /** The kind for the url - logo, sponsorLogo, ...  */
  kind: LocationUrlKinds;
  /** The uri for the resource */
  uri: Scalars['Url']['input'];
};

export type User = {
  __typename?: 'User';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type UserConsentItem = {
  __typename?: 'UserConsentItem';
  approvedVersion?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  isApproved: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  kind: ConsentKind;
  partnerKind?: Maybe<PartnerKind>;
  title?: Maybe<Scalars['String']['output']>;
};

export type UserConsentsResponse = {
  __typename?: 'UserConsentsResponse';
  facilityConsents?: Maybe<Array<FacilityUserConsentItem>>;
  trackManConsents?: Maybe<Array<UserConsentItem>>;
};

export type UserIsLockedOutError = BaseError & {
  __typename?: 'UserIsLockedOutError';
  code?: Maybe<Scalars['String']['output']>;
  lockoutEndDate: Scalars['DateTime']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type UserRoles = {
  __typename?: 'UserRoles';
  /** Email of the UserRoles */
  email?: Maybe<Scalars['String']['output']>;
  /** Id of the UserRoles */
  id?: Maybe<Scalars['ID']['output']>;
  /** Name of the UserRoles */
  name?: Maybe<Scalars['String']['output']>;
  /** Profile of the UserRoles */
  profile?: Maybe<Profile>;
  /** Number of Roles */
  roleCount?: Maybe<Scalars['Int']['output']>;
  /** The Roles */
  roles?: Maybe<Array<Role>>;
};

/** A segment of a collection. */
export type UserRolesTypeCollectionSegment = {
  __typename?: 'UserRolesTypeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<UserRoles>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserType = {
  __typename?: 'UserType';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UtmModel3DCoordinate = {
  __typename?: 'UtmModel3DCoordinate';
  modelOrigin?: Maybe<Array<Scalars['Float']['output']>>;
  siteOrigin?: Maybe<Array<Scalars['Float']['output']>>;
  siteReference?: Maybe<Array<Scalars['Float']['output']>>;
  transform?: Maybe<Array<Scalars['Float']['output']>>;
};

export type VersionIdInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type VersionInfoBaseHelperOfLeague = {
  __typename?: 'VersionInfoBaseHelperOfLeague';
  /** The draft version of the model */
  draftVersion?: Maybe<League>;
  /** The published version of the model */
  publishedVersion?: Maybe<League>;
  /** The published state */
  state: VersionInfoState;
  /** The current version number */
  version: Scalars['String']['output'];
};

export type VersionInfoBaseHelperOfLeagueSeason = {
  __typename?: 'VersionInfoBaseHelperOfLeagueSeason';
  /** The draft version of the model */
  draftVersion?: Maybe<LeagueSeason>;
  /** The published version of the model */
  publishedVersion?: Maybe<LeagueSeason>;
  /** The published state */
  state: VersionInfoState;
  /** The current version number */
  version: Scalars['String']['output'];
};

export type VersionInfoBaseHelperOfSeasonActivity = {
  __typename?: 'VersionInfoBaseHelperOfSeasonActivity';
  /** The draft version of the model */
  draftVersion?: Maybe<SeasonBaseActivityInterface>;
  /** The published version of the model */
  publishedVersion?: Maybe<SeasonBaseActivityInterface>;
  /** The published state */
  state: VersionInfoState;
  /** The current version number */
  version: Scalars['String']['output'];
};

export enum VersionInfoState {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type VideoActivityType = Node & PlayerActivity & {
  __typename?: 'VideoActivityType';
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  measurementId: Scalars['UUID']['output'];
  /** The player that created the activity */
  player?: Maybe<Profile>;
  sessionId: Scalars['UUID']['output'];
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
  videoId: Scalars['UUID']['output'];
  videoUrl?: Maybe<Scalars['URL']['output']>;
};

export type VideoIssue = {
  __typename?: 'VideoIssue';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
};

export type VideoIssues = {
  __typename?: 'VideoIssues';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  videoFlickering?: Maybe<VideoIssue>;
  videoIssueWarnings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  videoTooBright?: Maybe<VideoIssue>;
  videoTooDark?: Maybe<VideoIssue>;
};

export type VideoIssuesPayload = {
  __typename?: 'VideoIssuesPayload';
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  videoIssues?: Maybe<VideoIssues>;
};

export type VirtualRangeSessionActivity = Node & PlayerActivity & SessionActivityInterface & {
  __typename?: 'VirtualRangeSessionActivity';
  aggregatedMeasurement?: Maybe<AggregatedMeasurement>;
  id: Scalars['ID']['output'];
  /** The activity is marked hidden for the current user */
  isHidden: Scalars['Boolean']['output'];
  /** The kind of the activity */
  kind?: Maybe<ActivityKind>;
  /** The player that created the activity */
  player?: Maybe<Profile>;
  sessionId?: Maybe<Scalars['String']['output']>;
  strokeCount: Scalars['Int']['output'];
  strokes?: Maybe<Array<Stroke>>;
  /** Date and time the activity was created */
  time?: Maybe<Scalars['DateTime']['output']>;
};


export type VirtualRangeSessionActivityAggregatedMeasurementArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  useNormalizedMeasurement?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VirtualRangeSessionActivityStrokesArgs = {
  clubs?: InputMaybe<Array<ClubEnum>>;
  maxTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  maxTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalMeasurement?: InputMaybe<Scalars['Float']['input']>;
  minTotalSideMeasurement?: InputMaybe<Scalars['Float']['input']>;
};

export type VisitorOrderBy = {
  /** The sort order */
  order?: InputMaybe<VisitorOrderByEnum>;
  /** The sort direction */
  sortDirection?: InputMaybe<SortDirection>;
};

/** Sort order for facility visitors */
export enum VisitorOrderByEnum {
  /** Order by email */
  Email = 'email',
  /** Order by full name */
  FullName = 'fullName',
  /** Order by last visit */
  LastVisited = 'lastVisited',
  /** Text match */
  Match = 'match',
  /** Order by player name */
  PlayerName = 'playerName',
  /** Order by number of visits */
  VisitCount = 'visitCount'
}

export type WaiverPartnerConsent = ConsentInterfaceType & {
  __typename?: 'WaiverPartnerConsent';
  /** The description of the consent */
  description?: Maybe<Scalars['String']['output']>;
  /** The info url of the consent */
  infoUrl?: Maybe<Scalars['URL']['output']>;
  /** Mark the consent as mandatory */
  isMandatory?: Maybe<Scalars['Boolean']['output']>;
  /** Mark the consent as persistent. The consent wishes be accepted, even if it is an optional */
  isPersistent?: Maybe<Scalars['Boolean']['output']>;
  /** Default value of the consent */
  isSelectedByDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The key of the partner's consent */
  key?: Maybe<Scalars['NonEmptyString']['output']>;
  /**
   * The kind of the consent
   * @deprecated No longer supported.
   */
  kind?: Maybe<Scalars['NonEmptyString']['output']>;
  /** The enum value of the kind of the consent */
  kindValue: ConsentKind;
  /** The localization */
  localization?: Maybe<Array<PartnerConsentLocalized>>;
  /** The title of the consent */
  title?: Maybe<Scalars['String']['output']>;
  /** The version of the consent */
  version?: Maybe<Scalars['String']['output']>;
};

export type WeatherConditionsInputType = {
  /** The altitude in meters */
  altitude?: InputMaybe<Scalars['Float']['input']>;
  /** The humidity in percent */
  humidity?: InputMaybe<Scalars['Float']['input']>;
  /** The pressure in Pa */
  pressure?: InputMaybe<Scalars['Float']['input']>;
  /** The temperature in Celsius */
  temperature?: InputMaybe<Scalars['Float']['input']>;
};

export type WebHook = Node & {
  __typename?: 'WebHook';
  /** The time the resource was created */
  createdAt: Scalars['DateTime']['output'];
  /** The internal database id */
  dbId: Scalars['String']['output'];
  /** The description of the webhook. */
  description?: Maybe<Scalars['String']['output']>;
  /** The endpoint URL of the webhook. */
  endpointUrl?: Maybe<Scalars['String']['output']>;
  /** The event types that the webhook is listening to. */
  eventTypes?: Maybe<Array<WebHookEventName>>;
  /** The facility that owns the resource */
  facility?: Maybe<Facility>;
  /** The headers that the webhook is sending. */
  headers?: Maybe<Array<KeyValue>>;
  id: Scalars['ID']['output'];
  /** Indicates if the webhook is activated. */
  isActivated: Scalars['Boolean']['output'];
  /** The time the resource was last updated */
  lastUpdatedAt: Scalars['DateTime']['output'];
  locations?: Maybe<Array<LocationInterfaceType>>;
};

export enum WebHookEventName {
  /** All events. */
  AllEvents = 'ALL_EVENTS',
  /** App Script Status event. */
  AppScriptingStatus = 'APP_SCRIPTING_STATUS',
  /** A Net Incident happens on range. */
  DrNetIncident = 'DR_NET_INCIDENT',
  /** A live stroke completed event. */
  TpsLiveOnStrokeCompletedEvent = 'TPS_LIVE_ON_STROKE_COMPLETED_EVENT',
  /** Conditions of a stroke changed. */
  TpsLiveOnStrokeConditionChanged = 'TPS_LIVE_ON_STROKE_CONDITION_CHANGED',
  /** A session info event. */
  TpsSessionInfo = 'TPS_SESSION_INFO',
  /** A player is changed. */
  TpsSimulatorChangePlayer = 'TPS_SIMULATOR_CHANGE_PLAYER',
  /** A player is given a gimme. */
  TpsSimulatorGivenGimme = 'TPS_SIMULATOR_GIVEN_GIMME',
  /** A player is given a mulligan. */
  TpsSimulatorGivenMulligan = 'TPS_SIMULATOR_GIVEN_MULLIGAN',
  /** A simulator hole completed event. */
  TpsSimulatorHoleCompleted = 'TPS_SIMULATOR_HOLE_COMPLETED',
  /** A player picks up their ball. */
  TpsSimulatorPlayerPickup = 'TPS_SIMULATOR_PLAYER_PICKUP',
  /** A simulator scorecard event. */
  TpsSimulatorScorecard = 'TPS_SIMULATOR_SCORECARD',
  /** A simulator shot is finished. */
  TpsSimulatorShotFinish = 'TPS_SIMULATOR_SHOT_FINISH',
  /** A simulator shot is starting. */
  TpsSimulatorShotStarting = 'TPS_SIMULATOR_SHOT_STARTING',
  /** A system info event. */
  TpsSystemInfo = 'TPS_SYSTEM_INFO',
  /** A timer info event. */
  TpsTimerInfo = 'TPS_TIMER_INFO'
}

export type WebHookMutationData = {
  __typename?: 'WebHookMutationData';
  /** Activate a WebHook */
  activate?: Maybe<Scalars['Boolean']['output']>;
  /** Activate a WebHook */
  deactivate?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a WebHook */
  delete?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** Test a WebHook */
  test?: Maybe<Scalars['Boolean']['output']>;
  /** Update a WebHook */
  update?: Maybe<WebHook>;
};


export type WebHookMutationDataTestArgs = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  eventType?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};


export type WebHookMutationDataUpdateArgs = {
  bayIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  endpointUrl?: InputMaybe<Scalars['String']['input']>;
  eventTypes?: InputMaybe<Array<InputMaybe<WebHookEventName>>>;
  headers?: InputMaybe<Array<KeyValueInput>>;
  locationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** A segment of a collection. */
export type WebHooksCollectionSegment = {
  __typename?: 'WebHooksCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<WebHook>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum WindMode {
  Breezy = 'BREEZY',
  Calm = 'CALM',
  Count = 'COUNT',
  Gusty = 'GUSTY',
  None = 'NONE',
  Stormy = 'STORMY',
  StrongBreeze = 'STRONG_BREEZE',
  Variable = 'VARIABLE',
  Windy = 'WINDY'
}

export type WindSettings = {
  __typename?: 'WindSettings';
  direction: Scalars['Float']['output'];
  windSpeed: Scalars['Float']['output'];
};

export type WorldCoord = {
  /** The altitude of the location */
  alt?: InputMaybe<Scalars['Float']['input']>;
  /** The latitude of the location */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** The longitude of the location */
  lon?: InputMaybe<Scalars['Float']['input']>;
};

export type AgeCriteria = ParticipationCriteria & {
  __typename?: 'ageCriteria';
  /** The end value of the range */
  end: Scalars['Int']['output'];
  /** Whether or not this range includes the end point */
  includesEnd: Scalars['Boolean']['output'];
  /** Whether or not this range includes the start point */
  includesStart: Scalars['Boolean']['output'];
  /** The name of the criteria */
  name?: Maybe<Scalars['String']['output']>;
  /** The start value of the range */
  start: Scalars['Int']['output'];
  /** The validation message when given value is tested against the criteria */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

export type AgeInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** The end value of the range */
  end: Scalars['Int']['input'];
  /** Whether or not this range includes the end point */
  includesEnd: Scalars['Boolean']['input'];
  /** Whether or not this range includes the start point */
  includesStart: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  /** The start value of the range */
  start: Scalars['Int']['input'];
};

export type CategoryCriteria = ParticipationCriteria & {
  __typename?: 'categoryCriteria';
  /** The accepted category for this criteria */
  category?: Maybe<Category>;
  /** The name of the criteria */
  name?: Maybe<Scalars['String']['output']>;
  /** The validation message when given value is tested against the criteria */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

export type CategoryInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** The accepted category for this criteria */
  category?: InputMaybe<Category>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GenderCriteria = ParticipationCriteria & {
  __typename?: 'genderCriteria';
  /** The accepted gender for this criteria */
  gender?: Maybe<CriteriaGender>;
  /** The name of the criteria */
  name?: Maybe<Scalars['String']['output']>;
  /** The validation message when given value is tested against the criteria */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

export type GenderInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** The accepted gender for this criteria */
  gender?: InputMaybe<CriteriaGender>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type HandicapRangeCriteria = ParticipationCriteria & {
  __typename?: 'handicapRangeCriteria';
  /** The end value of the range */
  end: Scalars['Float']['output'];
  /** Whether or not this range includes the end point */
  includesEnd: Scalars['Boolean']['output'];
  /** Whether or not this range includes the start point */
  includesStart: Scalars['Boolean']['output'];
  /** The name of the criteria */
  name?: Maybe<Scalars['String']['output']>;
  /** The start value of the range */
  start: Scalars['Float']['output'];
  /** The validation message when given value is tested against the criteria */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

export type HandicapRangeInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** The end value of the range */
  end: Scalars['Float']['input'];
  /** Whether or not this range includes the end point */
  includesEnd: Scalars['Boolean']['input'];
  /** Whether or not this range includes the start point */
  includesStart: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  /** The start value of the range */
  start: Scalars['Float']['input'];
};

export enum LongestDriveTournamentDifficulty {
  Custom = 'CUSTOM',
  Expert = 'EXPERT',
  Skilled = 'SKILLED'
}

export type Name = {
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

/** Return all data for a ticket option */
export type PaidEventTicketOption = {
  __typename?: 'paidEventTicketOption';
  /** Number of tickets available */
  capacity?: Maybe<Scalars['Int']['output']>;
  /** The ticket category */
  category?: Maybe<Scalars['String']['output']>;
  /** Description of the ticket */
  description?: Maybe<Scalars['String']['output']>;
  /** The displayed price of the ticket */
  displayPrice?: Maybe<Scalars['String']['output']>;
  /** The id of the flag */
  id?: Maybe<Scalars['Int']['output']>;
  /** Maximum tickets per person */
  max?: Maybe<Scalars['Int']['output']>;
  /** Minimum tickets per person */
  min?: Maybe<Scalars['Int']['output']>;
  /** The name of the ticket option */
  name?: Maybe<Scalars['String']['output']>;
  /** The price of the ticket */
  price?: Maybe<Scalars['Int']['output']>;
  /** How many tickets are booked */
  usedCapacity?: Maybe<Scalars['Int']['output']>;
};

/** Return all event data for a venue/event */
export type PaidEvents = {
  __typename?: 'paidEvents';
  /** Flags for the event */
  appliedFlags?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /** Can the event be booked */
  bookable?: Maybe<Scalars['Boolean']['output']>;
  /** Number of tickets available for the event */
  capacity?: Maybe<Scalars['Int']['output']>;
  /** The color code in hex */
  color?: Maybe<Scalars['Int']['output']>;
  /** Description of the event */
  description?: Maybe<Scalars['String']['output']>;
  /** The end date of the event */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** The event id */
  eventId: Scalars['String']['output'];
  /** The id of the event */
  id?: Maybe<Scalars['Int']['output']>;
  /** Metadata used to store extra data */
  meta?: Maybe<Scalars['String']['output']>;
  /** Event has payouts enabled */
  payoutsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The end date of the sign up period */
  signUpEndDate?: Maybe<Scalars['DateTime']['output']>;
  /** The start date of the sign up period */
  signUpStartDate?: Maybe<Scalars['DateTime']['output']>;
  /** The start date of the event */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  /** Ticket options for the event */
  ticketOption?: Maybe<Array<Maybe<PaidEventTicketOption>>>;
  /** The title of the event */
  title: Scalars['String']['output'];
};

/** Return all tickets for an event */
export type PaidTicketUser = {
  __typename?: 'paidTicketUser';
  /** The id of the user */
  id?: Maybe<Scalars['String']['output']>;
  /** The YGB-username of the user */
  username?: Maybe<Scalars['String']['output']>;
};

/** Return all tickets for an event */
export type PaidTickets = {
  __typename?: 'paidTickets';
  /** Maximum number of tickets the user can buy */
  maxUses?: Maybe<Scalars['Int']['output']>;
  /** The status of the ticket payment */
  status?: Maybe<Scalars['String']['output']>;
  /** User details */
  ticketUser?: Maybe<PaidTicketUser>;
  /** Number of tickets the user have bought */
  uses?: Maybe<Scalars['Int']['output']>;
};

export type Players1stIntegrationDetails = FacilityIntegrationResponse & {
  __typename?: 'players1stIntegrationDetails';
  isEnabled: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  providerKey?: Maybe<Scalars['String']['output']>;
};

/** A collections of helper functions */
export type PublicTools = {
  __typename?: 'publicTools';
  /** Retrieve the Scorecards based on arguments */
  getScorecardsByDbId?: Maybe<Array<Maybe<Scorecard>>>;
  /** Retrieve the tournaments based on arguments */
  getTournamentsByDbId?: Maybe<Array<Maybe<Tournament>>>;
  listAllowedScopes?: Maybe<Array<ApiResources>>;
};


/** A collections of helper functions */
export type PublicToolsGetScorecardsByDbIdArgs = {
  scorecardDbIds: Array<Scalars['String']['input']>;
};


/** A collections of helper functions */
export type PublicToolsGetTournamentsByDbIdArgs = {
  tournamentDbIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StaffNotifications = {
  appNotification: NetAlertType;
  appNotificationMessage?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  kioskAppNotification?: InputMaybe<NetAlertType>;
  kioskAppNotificationMessage?: InputMaybe<Scalars['String']['input']>;
  staffNotifications?: InputMaybe<Array<InputMaybe<Name>>>;
  triggerBall?: InputMaybe<Scalars['Int']['input']>;
};

export enum TournamentDistanceType {
  Carry = 'CARRY',
  Total = 'TOTAL'
}

export type TrackmanHandicapCriteria = ParticipationCriteria & {
  __typename?: 'trackmanHandicapCriteria';
  /** The name of the criteria */
  name?: Maybe<Scalars['String']['output']>;
  /** The minimum number of played rounds for this criteria */
  requiredRounds?: Maybe<Scalars['Int']['output']>;
  /** The validation message when given value is tested against the criteria */
  validationMessage?: Maybe<Scalars['String']['output']>;
};

export type TrackmanHandicapInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** The minimum number of played rounds for this criteria */
  numberOfRoundsRequired?: InputMaybe<Scalars['Int']['input']>;
};

export type UserHasPaid = {
  __typename?: 'userHasPaid';
  /** The identifier for the product */
  productIdentifier?: Maybe<Scalars['String']['output']>;
  /** A flag indicating if the user has paid to be a part of this tournament or not */
  userHasPaid?: Maybe<Scalars['Boolean']['output']>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', profile?: { __typename?: 'Profile', id: string, dbId?: string | null, fullName?: string | null, picture?: any | null } | null } | null };

export type FacilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacilitiesQuery = { __typename?: 'Query', facilities?: { __typename?: 'FacilityTypeCollectionSegment', items?: Array<{ __typename?: 'Facility', dbId?: string | null, id: string, name?: any | null, kind?: FacilityKind | null, developerAccess?: string | null, apiDeveloperAccess?: string | null } | null> | null } | null };

export type LocationsQueryVariables = Exact<{
  facilityId: Scalars['ID']['input'];
}>;


export type LocationsQuery = { __typename?: 'Query', node?:
    | { __typename?: 'AdminPersonInfo' }
    | { __typename?: 'Album' }
    | { __typename?: 'Ball' }
    | { __typename?: 'Booking' }
    | { __typename?: 'BroadcastNotificationStatus' }
    | { __typename?: 'BullsEyeTournament' }
    | { __typename?: 'ClosestToPinTournament' }
    | { __typename?: 'ClosestToThePinActivity' }
    | { __typename?: 'Club' }
    | { __typename?: 'CoachProfile' }
    | { __typename?: 'CoachStudent' }
    | { __typename?: 'CombineTestActivity' }
    | { __typename?: 'Course' }
    | { __typename?: 'CoursePlayActivity' }
    | { __typename?: 'Domain' }
    | { __typename?: 'DynamicReportActivity' }
    | { __typename?: 'EquipmentBrand' }
    | { __typename?: 'EquipmentSeries' }
    | { __typename?: 'EventReportActivity' }
    | { __typename?: 'Facility', locations?: Array<{ __typename?: 'Location', id: string, name?: any | null }> | null }
    | { __typename?: 'FacilityCoach' }
    | { __typename?: 'FacilityVisitor' }
    | { __typename?: 'Friendship' }
    | { __typename?: 'IndoorBaySponsorCampaign' }
    | { __typename?: 'IndoorSiteServer' }
    | { __typename?: 'IndoorSponsorCampaign' }
    | { __typename?: 'InfoScreen' }
    | { __typename?: 'InfoScreenPage' }
    | { __typename?: 'InfoScreenPageItem' }
    | { __typename?: 'Invitation' }
    | { __typename?: 'LabelType' }
    | { __typename?: 'LaunchAreaType' }
    | { __typename?: 'League' }
    | { __typename?: 'LeagueSeason' }
    | { __typename?: 'LeagueTeam' }
    | { __typename?: 'Location' }
    | { __typename?: 'LongestDriveTournament' }
    | { __typename?: 'Media' }
    | { __typename?: 'MembershipInfo' }
    | { __typename?: 'MultiRoundTournament' }
    | { __typename?: 'Net' }
    | { __typename?: 'NetIncident' }
    | { __typename?: 'NoteActivity' }
    | { __typename?: 'OrderOfMeritTournament' }
    | { __typename?: 'PdfReportActivity' }
    | { __typename?: 'PerformanceCenterActivity' }
    | { __typename?: 'PerformancePuttingSessionActivity' }
    | { __typename?: 'PersonInfo' }
    | { __typename?: 'PlannedRound' }
    | { __typename?: 'Profile' }
    | { __typename?: 'PuttPuttTournament' }
    | { __typename?: 'Radar' }
    | { __typename?: 'RangeBay' }
    | { __typename?: 'RangeBayActivity' }
    | { __typename?: 'RangeBaySponsorCampaign' }
    | { __typename?: 'RangeBullsEyeActivity' }
    | { __typename?: 'RangeCaptureTheFlagActivity' }
    | { __typename?: 'RangeConfigurationType' }
    | { __typename?: 'RangeFindMyDistanceActivity' }
    | { __typename?: 'RangeHitItActivity' }
    | { __typename?: 'RangePracticeActivity' }
    | { __typename?: 'RangeSite' }
    | { __typename?: 'RangeSponsorCampaign' }
    | { __typename?: 'RangeTarget' }
    | { __typename?: 'RangeVirtualGolfPlayActivity' }
    | { __typename?: 'RangeVirtualGolfPracticeActivity' }
    | { __typename?: 'Scorecard' }
    | { __typename?: 'ScorecardHole' }
    | { __typename?: 'ScorecardShot' }
    | { __typename?: 'ScreencastActivity' }
    | { __typename?: 'SeasonBullsEyeActivity' }
    | { __typename?: 'SeasonClosestToPinActivity' }
    | { __typename?: 'SeasonCourseActivity' }
    | { __typename?: 'SeasonEvent' }
    | { __typename?: 'SeasonLongestDriveActivity' }
    | { __typename?: 'SeasonPuttPuttActivity' }
    | { __typename?: 'SeasonShuffleBullsEyeActivity' }
    | { __typename?: 'Section' }
    | { __typename?: 'SessionActivity' }
    | { __typename?: 'ShotAnalysisSessionActivity' }
    | { __typename?: 'ShuffleBullsEyeTournament' }
    | { __typename?: 'SimulatorBay' }
    | { __typename?: 'SimulatorBayActivity' }
    | { __typename?: 'SimulatorSessionActivity' }
    | { __typename?: 'Sponsor' }
    | { __typename?: 'SponsorCampaign' }
    | { __typename?: 'Team' }
    | { __typename?: 'TestActivity' }
    | { __typename?: 'TournamentRound' }
    | { __typename?: 'TournamentTeam' }
    | { __typename?: 'TracySessionActivity' }
    | { __typename?: 'VideoActivityType' }
    | { __typename?: 'VirtualRangeSessionActivity' }
    | { __typename?: 'WebHook' }
   | null };

export type BaysInLocationQueryVariables = Exact<{
  locationId: Scalars['ID']['input'];
}>;


export type BaysInLocationQuery = { __typename?: 'Query', node?:
    | { __typename?: 'AdminPersonInfo' }
    | { __typename?: 'Album' }
    | { __typename?: 'Ball' }
    | { __typename?: 'Booking' }
    | { __typename?: 'BroadcastNotificationStatus' }
    | { __typename?: 'BullsEyeTournament' }
    | { __typename?: 'ClosestToPinTournament' }
    | { __typename?: 'ClosestToThePinActivity' }
    | { __typename?: 'Club' }
    | { __typename?: 'CoachProfile' }
    | { __typename?: 'CoachStudent' }
    | { __typename?: 'CombineTestActivity' }
    | { __typename?: 'Course' }
    | { __typename?: 'CoursePlayActivity' }
    | { __typename?: 'Domain' }
    | { __typename?: 'DynamicReportActivity' }
    | { __typename?: 'EquipmentBrand' }
    | { __typename?: 'EquipmentSeries' }
    | { __typename?: 'EventReportActivity' }
    | { __typename?: 'Facility' }
    | { __typename?: 'FacilityCoach' }
    | { __typename?: 'FacilityVisitor' }
    | { __typename?: 'Friendship' }
    | { __typename?: 'IndoorBaySponsorCampaign' }
    | { __typename?: 'IndoorSiteServer' }
    | { __typename?: 'IndoorSponsorCampaign' }
    | { __typename?: 'InfoScreen' }
    | { __typename?: 'InfoScreenPage' }
    | { __typename?: 'InfoScreenPageItem' }
    | { __typename?: 'Invitation' }
    | { __typename?: 'LabelType' }
    | { __typename?: 'LaunchAreaType' }
    | { __typename?: 'League' }
    | { __typename?: 'LeagueSeason' }
    | { __typename?: 'LeagueTeam' }
    | { __typename?: 'Location', bays?: Array<
        | { __typename?: 'RangeBay', id: string, dbId?: string | null, name?: string | null }
        | { __typename?: 'SimulatorBay', id: string, dbId?: string | null, name?: string | null }
      > | null }
    | { __typename?: 'LongestDriveTournament' }
    | { __typename?: 'Media' }
    | { __typename?: 'MembershipInfo' }
    | { __typename?: 'MultiRoundTournament' }
    | { __typename?: 'Net' }
    | { __typename?: 'NetIncident' }
    | { __typename?: 'NoteActivity' }
    | { __typename?: 'OrderOfMeritTournament' }
    | { __typename?: 'PdfReportActivity' }
    | { __typename?: 'PerformanceCenterActivity' }
    | { __typename?: 'PerformancePuttingSessionActivity' }
    | { __typename?: 'PersonInfo' }
    | { __typename?: 'PlannedRound' }
    | { __typename?: 'Profile' }
    | { __typename?: 'PuttPuttTournament' }
    | { __typename?: 'Radar' }
    | { __typename?: 'RangeBay' }
    | { __typename?: 'RangeBayActivity' }
    | { __typename?: 'RangeBaySponsorCampaign' }
    | { __typename?: 'RangeBullsEyeActivity' }
    | { __typename?: 'RangeCaptureTheFlagActivity' }
    | { __typename?: 'RangeConfigurationType' }
    | { __typename?: 'RangeFindMyDistanceActivity' }
    | { __typename?: 'RangeHitItActivity' }
    | { __typename?: 'RangePracticeActivity' }
    | { __typename?: 'RangeSite' }
    | { __typename?: 'RangeSponsorCampaign' }
    | { __typename?: 'RangeTarget' }
    | { __typename?: 'RangeVirtualGolfPlayActivity' }
    | { __typename?: 'RangeVirtualGolfPracticeActivity' }
    | { __typename?: 'Scorecard' }
    | { __typename?: 'ScorecardHole' }
    | { __typename?: 'ScorecardShot' }
    | { __typename?: 'ScreencastActivity' }
    | { __typename?: 'SeasonBullsEyeActivity' }
    | { __typename?: 'SeasonClosestToPinActivity' }
    | { __typename?: 'SeasonCourseActivity' }
    | { __typename?: 'SeasonEvent' }
    | { __typename?: 'SeasonLongestDriveActivity' }
    | { __typename?: 'SeasonPuttPuttActivity' }
    | { __typename?: 'SeasonShuffleBullsEyeActivity' }
    | { __typename?: 'Section' }
    | { __typename?: 'SessionActivity' }
    | { __typename?: 'ShotAnalysisSessionActivity' }
    | { __typename?: 'ShuffleBullsEyeTournament' }
    | { __typename?: 'SimulatorBay' }
    | { __typename?: 'SimulatorBayActivity' }
    | { __typename?: 'SimulatorSessionActivity' }
    | { __typename?: 'Sponsor' }
    | { __typename?: 'SponsorCampaign' }
    | { __typename?: 'Team' }
    | { __typename?: 'TestActivity' }
    | { __typename?: 'TournamentRound' }
    | { __typename?: 'TournamentTeam' }
    | { __typename?: 'TracySessionActivity' }
    | { __typename?: 'VideoActivityType' }
    | { __typename?: 'VirtualRangeSessionActivity' }
    | { __typename?: 'WebHook' }
   | null };

export type TestConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type TestConnectionQuery = { __typename: 'Query' };

export type GetFacilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFacilitiesQuery = { __typename?: 'Query', facilities?: { __typename?: 'FacilityTypeCollectionSegment', items?: Array<{ __typename?: 'Facility', dbId?: string | null, id: string, name?: any | null, kind?: FacilityKind | null } | null> | null } | null };

export type GetFacilitiesWithAccessQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFacilitiesWithAccessQuery = { __typename?: 'Query', facilities?: { __typename?: 'FacilityTypeCollectionSegment', items?: Array<{ __typename?: 'Facility', dbId?: string | null, id: string, name?: any | null, kind?: FacilityKind | null, developerAccess?: string | null, apiDeveloperAccess?: string | null } | null> | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename: 'Query' };

export type GetMePortalPropertiesQueryVariables = Exact<{
  application: Scalars['String']['input'];
}>;


export type GetMePortalPropertiesQuery = { __typename?: 'Query', me?: { __typename?: 'Me', properties?: Array<{ __typename?: 'ApplicationPropertySetting', key?: string | null, value?: string | null } | null> | null } | null };

export type SetMePortalPropertiesMutationVariables = Exact<{
  application: Scalars['String']['input'];
  addProperties?: InputMaybe<Array<InputMaybe<ApplicationPropertySettingInput>> | InputMaybe<ApplicationPropertySettingInput>>;
  removeProperties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type SetMePortalPropertiesMutation = { __typename?: 'Mutation', setUserProperties: { __typename?: 'SetUserPropertiesPayload', properties?: Array<{ __typename?: 'ApplicationPropertySetting', key?: string | null, value?: string | null } | null> | null } };


export const GetMeDocument = gql`
    query getMe {
  me {
    profile {
      id
      dbId
      fullName
      picture
    }
  }
}
    `;

export function useGetMeQuery(options?: Omit<Urql.UseQueryArgs<GetMeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMeQuery, GetMeQueryVariables>({ query: GetMeDocument, ...options });
};
export const FacilitiesDocument = gql`
    query Facilities {
  facilities(take: 8000) {
    items {
      dbId
      id
      name
      kind
      developerAccess: keyValue(key: "developerAccess")
      apiDeveloperAccess: keyValue(key: "apiDeveloperAccess")
    }
  }
}
    `;

export function useFacilitiesQuery(options?: Omit<Urql.UseQueryArgs<FacilitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<FacilitiesQuery, FacilitiesQueryVariables>({ query: FacilitiesDocument, ...options });
};
export const LocationsDocument = gql`
    query Locations($facilityId: ID!) {
  node(id: $facilityId) {
    ... on Facility {
      locations {
        id
        name
      }
    }
  }
}
    `;

export function useLocationsQuery(options: Omit<Urql.UseQueryArgs<LocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<LocationsQuery, LocationsQueryVariables>({ query: LocationsDocument, ...options });
};
export const BaysInLocationDocument = gql`
    query BaysInLocation($locationId: ID!) {
  node(id: $locationId) {
    ... on Location {
      bays(types: INDOOR_SIMULATOR_BAYS) {
        id
        dbId
        name
      }
    }
  }
}
    `;

export function useBaysInLocationQuery(options: Omit<Urql.UseQueryArgs<BaysInLocationQueryVariables>, 'query'>) {
  return Urql.useQuery<BaysInLocationQuery, BaysInLocationQueryVariables>({ query: BaysInLocationDocument, ...options });
};
export const TestConnectionDocument = gql`
    query testConnection {
  __typename
}
    `;

export function useTestConnectionQuery(options?: Omit<Urql.UseQueryArgs<TestConnectionQueryVariables>, 'query'>) {
  return Urql.useQuery<TestConnectionQuery, TestConnectionQueryVariables>({ query: TestConnectionDocument, ...options });
};
export const GetFacilitiesDocument = gql`
    query getFacilities {
  facilities(take: 10) {
    items {
      dbId
      id
      name
      kind
    }
  }
}
    `;

export function useGetFacilitiesQuery(options?: Omit<Urql.UseQueryArgs<GetFacilitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFacilitiesQuery, GetFacilitiesQueryVariables>({ query: GetFacilitiesDocument, ...options });
};
export const GetFacilitiesWithAccessDocument = gql`
    query getFacilitiesWithAccess {
  facilities(take: 8000) {
    items {
      dbId
      id
      name
      kind
      developerAccess: keyValue(key: "developerAccess")
      apiDeveloperAccess: keyValue(key: "apiDeveloperAccess")
    }
  }
}
    `;

export function useGetFacilitiesWithAccessQuery(options?: Omit<Urql.UseQueryArgs<GetFacilitiesWithAccessQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFacilitiesWithAccessQuery, GetFacilitiesWithAccessQueryVariables>({ query: GetFacilitiesWithAccessDocument, ...options });
};
export const GetUserProfileDocument = gql`
    query getUserProfile {
  __typename
}
    `;

export function useGetUserProfileQuery(options?: Omit<Urql.UseQueryArgs<GetUserProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>({ query: GetUserProfileDocument, ...options });
};
export const GetMePortalPropertiesDocument = gql`
    query getMePortalProperties($application: String!) {
  me {
    properties(application: $application) {
      key
      value
    }
  }
}
    `;

export function useGetMePortalPropertiesQuery(options: Omit<Urql.UseQueryArgs<GetMePortalPropertiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMePortalPropertiesQuery, GetMePortalPropertiesQueryVariables>({ query: GetMePortalPropertiesDocument, ...options });
};
export const SetMePortalPropertiesDocument = gql`
    mutation setMePortalProperties($application: String!, $addProperties: [ApplicationPropertySettingInput] = [], $removeProperties: [String] = []) {
  setUserProperties(
    input: {addProperties: $addProperties, removeProperties: $removeProperties, application: $application}
  ) {
    properties {
      key
      value
    }
  }
}
    `;

export function useSetMePortalPropertiesMutation() {
  return Urql.useMutation<SetMePortalPropertiesMutation, SetMePortalPropertiesMutationVariables>(SetMePortalPropertiesDocument);
};