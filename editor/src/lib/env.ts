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
  const base = import.meta.env.VITE_BACKEND_BASE_URL?.trim();
  if (base) return stripTrailingSlash(base);
  
  // Legacy fallback
  const legacyGraphql = import.meta.env.VITE_GRAPHQL_URL?.trim();
  if (legacyGraphql) {
    console.warn('[env] Using legacy VITE_GRAPHQL_URL as backend base fallback');
    return stripTrailingSlash(legacyGraphql.replace(/\/graphql$/, ''));
  }
  return '';
})();

const loginBase = (() => {
  const base = import.meta.env.VITE_LOGIN_BASE_URL?.trim();
  if (base) return stripTrailingSlash(base);
  
  // Legacy fallback
  const legacyToken = import.meta.env.VITE_OAUTH_TOKEN_URL?.trim();
  if (legacyToken) {
    console.warn('[env] Using legacy VITE_OAUTH_TOKEN_URL as login base fallback');
    return stripTrailingSlash(legacyToken.replace(/\/connect\/token$/, ''));
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

// OAuth Web Client Configuration (for authorization code flow)
// Function to get OAuth client ID - simplified approach
function getOAuthClientId(): string {
  // Use build-time environment variable directly
  // This will be set during the Docker build process in Azure
  return import.meta.env.VITE_OAUTH_WEB_CLIENT_ID || '';
}

// Function to get OAuth client secret - simplified approach
function getOAuthClientSecret(): string {
  // Use build-time environment variable directly
  // This will be set during the Docker build process in Azure
  return import.meta.env.VITE_OAUTH_WEB_CLIENT_SECRET || '';
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
  if (!ENV_URLS.graphql) {
    throw new Error('GraphQL endpoint is not configured. Set VITE_BACKEND_BASE_URL or VITE_GRAPHQL_URL.');
  }
  if (!ENV_URLS.oauthToken) {
    throw new Error('OAuth token endpoint is not configured. Set VITE_LOGIN_BASE_URL or VITE_OAUTH_TOKEN_URL.');
  }
}
