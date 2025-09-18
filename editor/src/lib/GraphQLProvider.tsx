import React from 'react';
import { Provider } from 'urql';
import { urqlClient } from './graphql-client';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export const GraphQLProvider: React.FC<GraphQLProviderProps> = ({ children }) => {
  return <Provider value={urqlClient}>{children}</Provider>;
};