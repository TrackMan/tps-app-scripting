// Centralized environment variable handling for backend & login services.
// New preferred variables:
//   VITE_BACKEND_BASE_URL (e.g. https://dr-cloud-api-dev.trackmangolfdev.com)
//   VITE_LOGIN_BASE_URL   (e.g. https://tm-login-dev.trackmangolfdev.com)
// Legacy fallbacks:
//   VITE_GRAPHQL_URL (full path) and VITE_OAUTH_TOKEN_URL (full token endpoint)
//
// This module normalizes trailing slashes and constructs service endpoints:
//   GraphQL:  <backend>/graphql
//   REST:     <backend>/api
//   OAuth:    <login>/connect/token
//
// Migration:
// 1. Add new base URLs to your .env.
// 2. Remove old full URLs once confident.
// 3. This helper will warn if only legacy vars are present.

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

const backendBase = (() => {
  // Try runtime configuration first (for Azure App Service)
  const runtimeBase = (window as any)?.runtimeConfig?.VITE_BACKEND_BASE_URL;
  if (runtimeBase && runtimeBase.startsWith('http')) {
    return stripTrailingSlash(runtimeBase);
  }
  
  // Fall back to build-time environment
  const base = import.meta.env.VITE_BACKEND_BASE_URL?.trim();
  if (base) return stripTrailingSlash(base);
  
  // Legacy fallback
  const legacyGraphql = import.meta.env.VITE_GRAPHQL_URL?.trim();
  if (legacyGraphql) {
    console.warn('[env] Using legacy VITE_GRAPHQL_URL as backend base fallback');
    return stripTrailingSlash(legacyGraphql.replace(/\/graphql$/, ''));
  }
  
  // Production fallback for Azure App Service
  if (typeof window !== 'undefined' && window.location.hostname.includes('trackmangolfdev.com')) {
    return 'https://dr-cloud-api-dev.trackmangolfdev.com';
  }
  
  return '';
})();

const loginBase = (() => {
  // Try runtime configuration first (for Azure App Service)
  const runtimeBase = (window as any)?.runtimeConfig?.VITE_LOGIN_BASE_URL;
  if (runtimeBase && runtimeBase.startsWith('http')) {
    return stripTrailingSlash(runtimeBase);
  }
  
  // Fall back to build-time environment
  const base = import.meta.env.VITE_LOGIN_BASE_URL?.trim();
  if (base) return stripTrailingSlash(base);
  
  // Legacy fallback
  const legacyToken = import.meta.env.VITE_OAUTH_TOKEN_URL?.trim();
  if (legacyToken) {
    console.warn('[env] Using legacy VITE_OAUTH_TOKEN_URL as login base fallback');
    return stripTrailingSlash(legacyToken.replace(/\/connect\/token$/, ''));
  }
  
  // Production fallback for Azure App Service
  if (typeof window !== 'undefined' && window.location.hostname.includes('trackmangolfdev.com')) {
    return 'https://tm-login-dev.trackmangolfdev.com';
  }
  
  return '';
})();

export const ENV_URLS = {
  backendBase,
  loginBase,
  graphql: backendBase ? `${backendBase}/graphql` : import.meta.env.VITE_GRAPHQL_URL || '',
  rest: backendBase ? `${backendBase}/api` : '',
  oauthToken: loginBase ? `${loginBase}/connect/token` : import.meta.env.VITE_OAUTH_TOKEN_URL || '',
};

// Debug environment loading
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

// OAuth Web Client Configuration (for authorization code flow)
// Function to get OAuth client ID - with runtime support
function getOAuthClientId(): string {
  // Try runtime configuration first (for Azure App Service)
  const runtimeClientId = (window as any)?.runtimeConfig?.VITE_OAUTH_WEB_CLIENT_ID;
  if (runtimeClientId && runtimeClientId.length > 10) {
    return runtimeClientId;
  }
  
  // Fall back to build-time environment variable
  const buildTimeClientId = import.meta.env.VITE_OAUTH_WEB_CLIENT_ID;
  if (buildTimeClientId) {
    return buildTimeClientId;
  }
  
  // Production fallback for Azure App Service
  if (typeof window !== 'undefined' && window.location.hostname.includes('trackmangolfdev.com')) {
    return 'dr-web.4633fada-3b16-490f-8de7-2aa67158a1d6';
  }
  
  return '';
}

// Function to get OAuth client secret - with runtime support
function getOAuthClientSecret(): string {
  // Try runtime configuration first (for Azure App Service)
  const runtimeClientSecret = (window as any)?.runtimeConfig?.VITE_OAUTH_WEB_CLIENT_SECRET;
  if (runtimeClientSecret && runtimeClientSecret.length > 10) {
    return runtimeClientSecret;
  }
  
  // Fall back to build-time environment variable
  const buildTimeClientSecret = import.meta.env.VITE_OAUTH_WEB_CLIENT_SECRET;
  if (buildTimeClientSecret) {
    return buildTimeClientSecret;
  }
  
  // Production fallback for Azure App Service
  if (typeof window !== 'undefined' && window.location.hostname.includes('trackmangolfdev.com')) {
    return '7c870264-3703-4ec2-add8-5f8e57251d0e';
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
  redirectUri: (() => {
    // Build redirect URI dynamically from current window location
    // This automatically works for localhost, dev, staging, and production environments
    const origin = window.location.origin;
    return `${origin}/account/callback`;
  })(),
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
  console.log('🔍 Asserting required URLs:', ENV_URLS);
  
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
