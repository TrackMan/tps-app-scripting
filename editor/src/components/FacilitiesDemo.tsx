import React from 'react';
import { useQuery } from 'urql';
import { GET_FACILITIES } from '../graphql/queries';
import { AuthStatus } from './AuthStatus';
import { useAuth } from '../lib/AuthProvider';

export const FacilitiesDemo: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [result] = useQuery({
    query: GET_FACILITIES,
    variables: { take: 10, skip: 0 },
    pause: !isAuthenticated, // Don't run query if not authenticated
  });

  const { data, fetching, error } = result;

  return (
    <div className="facilities-demo">
      <h2>TrackMan Facilities Demo</h2>
      
      <AuthStatus />
      
      {isAuthenticated && (
        <div className="query-section">
          <h3>Facilities Query Results</h3>
          
          {fetching && <div className="loading">Loading facilities...</div>}
          
          {error && (
            <div className="error">
              <p><strong>GraphQL Error:</strong></p>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          )}
          
          {data?.facilities?.items && (
            <div className="facilities-list">
              <p><strong>Found {data.facilities.items.length} facilities:</strong></p>
              <ul>
                {data.facilities.items.map((facility: any) => (
                  <li key={facility.id} className="facility-item">
                    <strong>{facility.name}</strong> 
                    <span className="facility-details">
                      (ID: {facility.id}, Kind: {facility.kind})
                    </span>
                    {facility.developerAccess && (
                      <span className="developer-access">
                        🔧 Dev Access: {facility.developerAccess}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};