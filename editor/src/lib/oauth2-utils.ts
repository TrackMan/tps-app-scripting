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
    console.log('🔑 Adding prompt parameter to URL:', prompt);
    params.set('prompt', prompt);
  } else {
    console.log('⚠️ No prompt parameter to add to URL');
  }

  const finalUrl = `${config.loginBaseUrl}/connect/authorize?${params.toString()}`;
  console.log('🔗 Final authorization URL with all parameters:', finalUrl);
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
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  config: OAuth2Config,
  code: string,
  codeVerifier: string
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}> {
  const tokenUrl = `${config.loginBaseUrl}/connect/token`;
  
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: config.redirectUri,
    code_verifier: codeVerifier,
  });

  // Always include client_id in body
  body.append('client_id', config.clientId);
  
  // For confidential clients, include client_secret in body (like portal does)
  if (config.clientSecret) {
    body.append('client_secret', config.clientSecret);
    console.log('🔐 Using client credentials in request body (confidential client)');
  } else {
    console.log('🔓 Using public client authentication');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  console.log('🔄 Exchanging authorization code for token...');
  console.log('📍 Token URL:', tokenUrl);
  console.log('📋 Request body:', body.toString());
  console.log('🗝️ Auth method:', config.clientSecret ? 'Client credentials in body' : 'Public (client_id only)');
  
  let response: Response;
  
  try {
    response = await fetch(tokenUrl, {
      method: 'POST',
      headers,
      body: body.toString(),
    });

    console.log('📨 Response status:', response.status);
    console.log('📨 Response headers:', Object.fromEntries(response.headers.entries()));
  } catch (error) {
    console.error('❌ Network error during token exchange:');
    console.error('  Error:', error);
    console.error('  Token URL:', tokenUrl);
    console.error('  This is likely a CORS issue or network connectivity problem');
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
  console.log('✅ Token exchange successful');
  console.log('📦 Token data keys:', Object.keys(tokenData));
  
  return tokenData;
}