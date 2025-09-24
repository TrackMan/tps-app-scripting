import { useQuery, useMutation } from 'urql';
import { useEffect, useCallback } from 'react';
import {
  GET_USER_PROPERTIES_QUERY,
  SET_USER_PROPERTIES_MUTATION,
  APP_SCRIPT_APPLICATION,
  PROPERTY_KEYS,
  UserPropertiesData,
  SetUserPropertiesVariables,
  SetUserPropertiesData,
  ApplicationPropertySettingInput,
} from '../graphql/userProperties';

export interface PersistedSelections {
  facilityId: string | null;
  locationId: string | null;
  bayId: string | null;
}

export interface UsePersistedSelectionsResult {
  selections: PersistedSelections;
  isLoading: boolean;
  error: Error | null;
  saveSelection: (key: keyof typeof PROPERTY_KEYS, value: string | null) => Promise<void>;
}

export const usePersistedSelections = (): UsePersistedSelectionsResult => {
  // Query to get existing properties
  const [propertiesResult] = useQuery<UserPropertiesData>({
    query: GET_USER_PROPERTIES_QUERY,
    variables: { application: APP_SCRIPT_APPLICATION },
  });

  // Mutation to set properties
  const [, setProperties] = useMutation<SetUserPropertiesData, SetUserPropertiesVariables>(
    SET_USER_PROPERTIES_MUTATION
  );

  // Parse properties into selections object
  const selections: PersistedSelections = {
    facilityId: null,
    locationId: null,
    bayId: null,
  };

  if (propertiesResult.data?.me?.properties) {
    const properties = propertiesResult.data.me.properties;
    
    const facilityProp = properties.find(p => p.key === PROPERTY_KEYS.FACILITY_ID);
    const locationProp = properties.find(p => p.key === PROPERTY_KEYS.LOCATION_ID);
    const bayProp = properties.find(p => p.key === PROPERTY_KEYS.BAY_ID);

    selections.facilityId = facilityProp?.value || null;
    selections.locationId = locationProp?.value || null;
    selections.bayId = bayProp?.value || null;
  }

  // Function to save a single selection
  const saveSelection = useCallback(async (key: keyof typeof PROPERTY_KEYS, value: string | null) => {
    const propertyKey = PROPERTY_KEYS[key];
    
    try {
      if (value === null) {
        // Remove the property if value is null
        await setProperties({
          application: APP_SCRIPT_APPLICATION,
          removeProperties: [propertyKey],
        });
      } else {
        // Add or update the property
        const addProperties: ApplicationPropertySettingInput[] = [
          { key: propertyKey, value }
        ];

        await setProperties({
          application: APP_SCRIPT_APPLICATION,
          addProperties,
        });
      }
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
      throw error;
    }
  }, [setProperties]);

  return {
    selections,
    isLoading: propertiesResult.fetching,
    error: propertiesResult.error || null,
    saveSelection,
  };
};