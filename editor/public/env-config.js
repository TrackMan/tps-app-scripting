// Runtime environment configuration for Azure App Service
// This script creates a global window.env object with runtime environment variables

(function() {
  'use strict';
  
  // This will be replaced by the injection script
  window.env = {
    VITE_BACKEND_BASE_URL: '__VITE_BACKEND_BASE_URL__',
    VITE_LOGIN_BASE_URL: '__VITE_LOGIN_BASE_URL__',
    VITE_OAUTH_CLIENT_ID: '__VITE_OAUTH_CLIENT_ID__',
    VITE_OAUTH_CLIENT_SECRET: '__VITE_OAUTH_CLIENT_SECRET__',
    VITE_GRAPHQL_URL: '__VITE_GRAPHQL_URL__',
    VITE_OAUTH_TOKEN_URL: '__VITE_OAUTH_TOKEN_URL__'
  };
  
  console.log('🔧 Runtime environment loaded:', {
    backendBase: window.env.VITE_BACKEND_BASE_URL,
    loginBase: window.env.VITE_LOGIN_BASE_URL,
    clientId: window.env.VITE_OAUTH_CLIENT_ID ? 'SET' : 'NOT SET',
    clientSecret: window.env.VITE_OAUTH_CLIENT_SECRET ? 'SET' : 'NOT SET'
  });
})();