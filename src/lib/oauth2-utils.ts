/**
 * OAuth2 Authorization Code with PKCE utilities
 * For integrating with TrackMan login server
 */

/**
 * Generate a cryptographically secure random string for PKCE
 */
function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (v) => charset[v % charset.length]).join('');
}

/**
 * Generate PKCE code verifier
 */
export function generateCodeVerifier(): string {
  return generateRandomString(128);
}

/**
 * Generate PKCE code challenge from verifier using SHA256
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to base64url
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generate a random state parameter for CSRF protection
 */
export function generateState(): string {
  return generateRandomString(32);
}

/**
 * OAuth2 configuration interface
 */
export interface OAuth2Config {
  clientId: string;
  clientSecret?: string;
  loginBaseUrl: string;
  redirectUri: string;
  scopes: string[];
}

/**
 * Build authorization URL for OAuth2 Authorization Code flow with PKCE
 */
export async function buildAuthorizationUrl(
  config: OAuth2Config,
  codeVerifier: string,
  state: string,
  prompt?: string
): Promise<string> {
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(' '),
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  // Add prompt parameter if provided (e.g., 'login' to force login screen)
  if (prompt) {
    params.set('prompt', prompt);
  }

  const finalUrl = `${config.loginBaseUrl}/connect/authorize?${params.toString()}`;
  return finalUrl;
}

/**
 * Parse authorization callback URL to extract code and state
 */
export function parseAuthorizationCallback(url: string): {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
} {
  const urlObj = new URL(url);
  const params = urlObj.searchParams;

  return {
    code: params.get('code') || undefined,
    state: params.get('state') || undefined,
    error: params.get('error') || undefined,
    error_description: params.get('error_description') || undefined,
  };
}

/**
 * Exchange authorization code for access token via backend proxy
 * This keeps client secrets on the server and never exposes them to the browser
 */
export async function exchangeCodeForToken(
  config: OAuth2Config,
  code: string,
  codeVerifier: string,
  environment: 'dev' | 'prod'
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}> {
  // Call our backend endpoint instead of OAuth server directly
  // This keeps client secrets secure on the server
  const backendUrl = `${window.location.origin}/api/auth/exchange-token`;
  
  console.log(`🔑 [oauth2-utils] Calling backend token exchange for environment: ${environment}`);
  console.log(`🔑 [oauth2-utils] Redirect URI: ${config.redirectUri}`);
  
  let response: Response;
  
  try {
    response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        codeVerifier,
        environment,
        redirectUri: config.redirectUri  // Send the redirect_uri that was used in authorization request
      })
    });
  } catch (error) {
    console.error('❌ Network error during token exchange:');
    console.error('  Error:', error);
    console.error('  Backend URL:', backendUrl);
    throw new Error(`Failed to fetch token: ${error instanceof Error ? error.message : 'Network error'}`);
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Token exchange failed:');
    console.error('  Status:', response.status, response.statusText);
    console.error('  Response:', errorText);
    throw new Error(`Token exchange failed: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const tokenData = await response.json();
  
  console.log(`✅ [oauth2-utils] Token exchange successful for environment: ${environment}`);
  
  return tokenData;
}