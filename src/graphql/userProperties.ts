import { gql } from 'urql';

// Query to get all user properties for the app
export const GET_USER_PROPERTIES_QUERY = gql`
  query getMePortalProperties($application: String!) {
    me {
      properties(application: $application) {
        key
        value
      }
    }
  }
`;

// Mutation to set user properties
export const SET_USER_PROPERTIES_MUTATION = gql`
  mutation setMePortalProperties(
    $application: String!
    $addProperties: [ApplicationPropertySettingInput] = []
    $removeProperties: [String] = []
  ) {
    setUserProperties(
      input: {
        addProperties: $addProperties
        removeProperties: $removeProperties
        application: $application
      }
    ) {
      properties {
        key
        value
      }
    }
  }
`;

// Application name constant
export const APP_SCRIPT_APPLICATION = 'APP-SCRIPT-PORTAL';

// Property keys
export const PROPERTY_KEYS = {
  FACILITY_ID: 'FACILITY_ID',
  LOCATION_ID: 'LOCATION_ID',
  BAY_ID: 'BAY_ID',
} as const;

// Types for the queries/mutations
export interface UserProperty {
  key: string;
  value: string;
}

export interface UserPropertiesData {
  me: {
    properties: UserProperty[];
  };
}

export interface ApplicationPropertySettingInput {
  key: string;
  value: string;
}

export interface SetUserPropertiesVariables {
  application: string;
  addProperties?: ApplicationPropertySettingInput[];
  removeProperties?: string[];
}

export interface SetUserPropertiesData {
  setUserProperties: {
    properties: UserProperty[];
  };
}