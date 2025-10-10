// Centralized environment variable handling for backend & login services.
// Supports switching between development and production environments.
// The active environment is stored in localStorage and managed by environment-switcher.ts
//
// This module normalizes trailing slashes and constructs service endpoints:
//   GraphQL:  <backend>/graphql
//   REST:     <backend>/api
//   OAuth:    <login>/connect/token

import { getCurrentEnvironmentConfig } from './environment-switcher';

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

const backendBase = (() => {
  console.log('🔍 [env.ts] Initializing backendBase...');
  
  // Try runtime configuration first (for Azure App Service)
  const runtimeBase = (window as any)?.runtimeConfig?.VITE_BACKEND_BASE_URL;
  if (runtimeBase && runtimeBase.startsWith('http')) {
    console.log('✅ [env.ts] Using runtime config for backendBase:', runtimeBase);
    return stripTrailingSlash(runtimeBase);
  }
  
  // Get environment-aware configuration from localStorage
  try {
    console.log('🔍 [env.ts] Calling getCurrentEnvironmentConfig()...');
    const envConfig = getCurrentEnvironmentConfig();
    if (envConfig.backendBaseUrl) {
      console.log('✅ [env.ts] Using environment config for backendBase:', envConfig.backendBaseUrl);
      return stripTrailingSlash(envConfig.backendBaseUrl);
    }
  } catch (error) {
    console.warn('[env] Failed to get environment config:', error);
  }
  
  // Fallback to build-time default environment
  const base = import.meta.env.VITE_BACKEND_BASE_URL?.trim();
  console.log('⚠️ [env.ts] Using build-time fallback for backendBase:', base);
  if (base) return stripTrailingSlash(base);
  
  return '';
})();

const loginBase = (() => {
  // Try runtime configuration first (for Azure App Service)
  const runtimeBase = (window as any)?.runtimeConfig?.VITE_LOGIN_BASE_URL;
  if (runtimeBase && runtimeBase.startsWith('http')) {
    return stripTrailingSlash(runtimeBase);
  }
  
  // Get environment-aware configuration from localStorage
  try {
    const envConfig = getCurrentEnvironmentConfig();
    if (envConfig.loginBaseUrl) {
      return stripTrailingSlash(envConfig.loginBaseUrl);
    }
  } catch (error) {
    console.warn('[env] Failed to get environment config:', error);
  }
  
  // Fallback to build-time default environment
  const base = import.meta.env.VITE_LOGIN_BASE_URL?.trim();
  if (base) return stripTrailingSlash(base);
  
  return '';
})();

export const ENV_URLS = {
  backendBase,
  loginBase,
  graphql: backendBase ? `${backendBase}/graphql` : import.meta.env.VITE_GRAPHQL_URL || '',
  rest: backendBase ? `${backendBase}/api` : '',
  oauthToken: loginBase ? `${loginBase}/connect/token` : import.meta.env.VITE_OAUTH_TOKEN_URL || '',
};

// Debug environment loading (only in development)
const isProduction = (window as any)?.runtimeConfig?.VITE_NODE_ENV === 'production';
if (!isProduction) {
  console.log('🔍 Environment Debug:', {
    backendBase,
    loginBase,
    'runtimeConfig.VITE_NODE_ENV': (window as any)?.runtimeConfig?.VITE_NODE_ENV || 'NOT SET',
    'import.meta.env.VITE_NODE_ENV': import.meta.env.VITE_NODE_ENV || 'NOT SET',
    'import.meta.env.VITE_BACKEND_BASE_URL': import.meta.env.VITE_BACKEND_BASE_URL,
    'import.meta.env.VITE_LOGIN_BASE_URL': import.meta.env.VITE_LOGIN_BASE_URL,
    'import.meta.env.VITE_OAUTH_WEB_CLIENT_ID': import.meta.env.VITE_OAUTH_WEB_CLIENT_ID ? 'SET' : 'NOT SET',
    ENV_URLS
  });
}

// OAuth Web Client Configuration (for authorization code flow)
// Function to get OAuth client ID - with runtime and environment-aware support
function getOAuthClientId(): string {
  // Try runtime configuration first (for Azure App Service)
  const runtimeClientId = (window as any)?.runtimeConfig?.VITE_OAUTH_WEB_CLIENT_ID;
  if (runtimeClientId && runtimeClientId.length > 10) {
    return runtimeClientId;
  }
  
  // Get environment-aware configuration from localStorage
  try {
    const envConfig = getCurrentEnvironmentConfig();
    if (envConfig.oauthClientId) {
      return envConfig.oauthClientId;
    }
  } catch (error) {
    console.warn('[env] Failed to get environment config for OAuth client ID:', error);
  }
  
  // Fall back to build-time environment variable
  const buildTimeClientId = import.meta.env.VITE_OAUTH_WEB_CLIENT_ID;
  if (buildTimeClientId) {
    return buildTimeClientId;
  }
  
  return '';
}

// Function to get OAuth client secret - with runtime and environment-aware support
function getOAuthClientSecret(): string {
  // Try runtime configuration first (for Azure App Service)
  const runtimeClientSecret = (window as any)?.runtimeConfig?.VITE_OAUTH_WEB_CLIENT_SECRET;
  if (runtimeClientSecret && runtimeClientSecret.length > 10) {
    return runtimeClientSecret;
  }
  
  // Get environment-aware configuration from localStorage
  try {
    const envConfig = getCurrentEnvironmentConfig();
    if (envConfig.oauthClientSecret) {
      return envConfig.oauthClientSecret;
    }
  } catch (error) {
    console.warn('[env] Failed to get environment config for OAuth client secret:', error);
  }
  
  // Fall back to build-time environment variable
  const buildTimeClientSecret = import.meta.env.VITE_OAUTH_WEB_CLIENT_SECRET;
  if (buildTimeClientSecret) {
    return buildTimeClientSecret;
  }
  
  return '';
}

export const OAUTH_CONFIG = {
  get webClientId() {
    return getOAuthClientId();
  },
  get webClientSecret() {
    return getOAuthClientSecret();
  },
  get redirectUri() {
    // Priority:
    // 1. Runtime config (Azure environment variable)
    // 2. Build-time env (for local development)
    // 3. Dynamic from window.location.origin (fallback)
    
    const runtimeRedirect = (window as any)?.runtimeConfig?.VITE_OAUTH_REDIRECT_URI;
    if (runtimeRedirect) {
      return runtimeRedirect;
    }
    
    const buildTimeRedirect = import.meta.env.VITE_OAUTH_REDIRECT_URI;
    if (buildTimeRedirect) {
      return buildTimeRedirect;
    }
    
    // Fallback: build dynamically from current window location
    const origin = window.location.origin;
    return `${origin}/account/callback`;
  },
  scopes: [
    'openid',
    'profile', 
    'email',
    'offline_access',
    'https://auth.trackman.com/dr/cloud',
    'https://auth.trackman.com/authorization'
  ]
};

export function assertRequiredUrls() {
  const isProduction = (window as any)?.runtimeConfig?.VITE_NODE_ENV === 'production';
  if (!isProduction) {
    console.log('🔍 Asserting required URLs:', ENV_URLS);
  }
  
  if (!ENV_URLS.graphql) {
    console.error('❌ GraphQL endpoint is not configured:', {
      backendBase,
      'VITE_BACKEND_BASE_URL': import.meta.env.VITE_BACKEND_BASE_URL,
      'VITE_GRAPHQL_URL': import.meta.env.VITE_GRAPHQL_URL
    });
    throw new Error('GraphQL endpoint is not configured. Set VITE_BACKEND_BASE_URL or VITE_GRAPHQL_URL.');
  }
  if (!ENV_URLS.oauthToken) {
    console.error('❌ OAuth token endpoint is not configured:', {
      loginBase,
      'VITE_LOGIN_BASE_URL': import.meta.env.VITE_LOGIN_BASE_URL,
      'VITE_OAUTH_TOKEN_URL': import.meta.env.VITE_OAUTH_TOKEN_URL
    });
    throw new Error('OAuth token endpoint is not configured. Set VITE_LOGIN_BASE_URL or VITE_OAUTH_TOKEN_URL.');
  }
}
