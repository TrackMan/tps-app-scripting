// Query to get current user profile after login
export const GET_ME = gql`
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
import { gql } from 'urql';

// =============================================================================
// MAIN APPLICATION QUERIES
// =============================================================================

// Facilities query with access fields for developer filtering
export const FACILITIES_QUERY = gql`
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

// Locations query for a specific facility
export const LOCATIONS_QUERY = gql`
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

// Bays query for a specific location
export const BAYS_IN_LOCATION_QUERY = gql`
  query BaysInLocation($locationId: ID!) {
    node(id: $locationId) {
      ... on Location {
        bays(types: INDOOR_SIMULATOR_BAYS) {
          id
          dbId
          name
          ... on SimulatorBay {
            deviceId
          }
        }
      }
    }
  }
`;



export const GET_FACILITIES = gql`
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

export const GET_FACILITIES_WITH_ACCESS = gql`
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

export const GET_USER_PROFILE = gql`
  query getUserProfile {
    __typename
  }
`;
