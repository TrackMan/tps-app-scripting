import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GraphQLProvider } from './lib/GraphQLProvider';
import { AuthProvider } from './lib/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </AuthProvider>
  </React.StrictMode>
);
