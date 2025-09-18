import React from 'react';
import { useQuery } from 'urql';
import { GET_USER_PROFILE } from '../graphql/queries';

export const UserProfile: React.FC = () => {
  const [result, reexecuteQuery] = useQuery({
    query: GET_USER_PROFILE,
  });

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading user profile...</div>;
  
  if (error) {
    return (
      <div className="error">
        <p>Error loading profile: {error.message}</p>
        <button onClick={() => reexecuteQuery({ requestPolicy: 'network-only' })}>
          Retry
        </button>
      </div>
    );
  }

  if (!data?.me) return <div>No user data found</div>;

  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {data.me.name}</p>
      <p><strong>Email:</strong> {data.me.email}</p>
      <p><strong>Member since:</strong> {new Date(data.me.createdAt).toLocaleDateString()}</p>
      <button onClick={() => reexecuteQuery({ requestPolicy: 'network-only' })}>
        Refresh
      </button>
    </div>
  );
};