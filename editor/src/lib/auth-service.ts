interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

interface TokenData {
  accessToken: string;
  tokenType: string;
  expiresAt: Date;
  refreshToken?: string;
  scope?: string;
}

class AuthService {
  private static instance: AuthService;
  private tokenData: TokenData | null = null;
  private tokenRefreshPromise: Promise<TokenData> | null = null;

  private constructor() {
    // Load token from localStorage on initialization
    this.loadTokenFromStorage();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Get a valid access token, refreshing if necessary
   */
  public async getAccessToken(): Promise<string> {
    console.log('🎫 getAccessToken() called');
    
    // If we have a valid token, return it
    if (this.tokenData && this.isTokenValid()) {
      console.log('✅ Using existing valid token');
      return this.tokenData.accessToken;
    }

    console.log('🔄 Token invalid or expired, fetching new token...');

    // If there's already a refresh in progress, wait for it
    if (this.tokenRefreshPromise) {
      console.log('⏳ Token refresh already in progress, waiting...');
      const tokenData = await this.tokenRefreshPromise;
      return tokenData.accessToken;
    }

    // Start a new token refresh
    console.log('🚀 Starting new token refresh...');
    this.tokenRefreshPromise = this.fetchNewToken();
    
    try {
      const tokenData = await this.tokenRefreshPromise;
      return tokenData.accessToken;
    } finally {
      this.tokenRefreshPromise = null;
    }
  }

  /**
   * Fetch a new access token using client credentials
   */
  private async fetchNewToken(): Promise<TokenData> {
  const { ENV_URLS } = await import('./env');
  const tokenUrl = ENV_URLS.oauthToken;
  
  // Try runtime environment first (for Azure App Service)
  const runtimeClientId = (window as any)?.env?.VITE_OAUTH_CLIENT_ID;
  const runtimeClientSecret = (window as any)?.env?.VITE_OAUTH_CLIENT_SECRET;
  
  const clientId = (runtimeClientId && runtimeClientId !== '__VITE_OAUTH_CLIENT_ID__') 
    ? runtimeClientId 
    : import.meta.env.VITE_OAUTH_CLIENT_ID;
    
  const clientSecret = (runtimeClientSecret && runtimeClientSecret !== '__VITE_OAUTH_CLIENT_SECRET__') 
    ? runtimeClientSecret 
    : import.meta.env.VITE_OAUTH_CLIENT_SECRET;

    // Debug logging for OAuth configuration
    console.log('🔍 OAuth Debug Info:');
    console.log('  Token URL:', tokenUrl);
    console.log('  Client ID:', clientId ? `${clientId.substring(0, 8)}...` : 'MISSING');
    console.log('  Client Secret:', clientSecret ? `${clientSecret.substring(0, 4)}...` : 'MISSING');

    if (!tokenUrl || !clientId || !clientSecret) {
      throw new Error('OAuth configuration missing. Please check your environment variables.');
    }

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    console.log('📡 Making OAuth token request to:', tokenUrl);
    console.log('📋 Request body:', formData.toString());

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      console.log('📨 OAuth Response Status:', response.status, response.statusText);
      console.log('📨 OAuth Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OAuth Error Response:', errorText);
        throw new Error(`OAuth token request failed: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const tokenResponse: TokenResponse = await response.json();
      console.log('✅ OAuth Success Response:', tokenResponse);
      
      const tokenData: TokenData = {
        accessToken: tokenResponse.access_token,
        tokenType: tokenResponse.token_type,
        expiresAt: new Date(Date.now() + (tokenResponse.expires_in * 1000)),
        scope: tokenResponse.scope,
      };

      // Store the new token
      this.tokenData = tokenData;
      this.saveTokenToStorage();

      console.log('🔑 New access token obtained:');
      console.log('  Token (first 20 chars):', tokenData.accessToken.substring(0, 20) + '...');
      console.log('  Token Type:', tokenData.tokenType);
      console.log('  Expires At:', tokenData.expiresAt);
      console.log('  Scope:', tokenData.scope);
      return tokenData;

    } catch (error) {
      console.error('Failed to fetch access token:', error);
      throw error;
    }
  }

  /**
   * Check if the current token is valid (exists and not expired)
   */
  private isTokenValid(): boolean {
    if (!this.tokenData) {
      return false;
    }

    // Add 60 second buffer to prevent using tokens that expire very soon
    const bufferTime = 60 * 1000;
    const isExpired = Date.now() + bufferTime >= this.tokenData.expiresAt.getTime();
    
    return !isExpired;
  }

  /**
   * Save token to localStorage
   */
  private saveTokenToStorage(): void {
    if (this.tokenData) {
      localStorage.setItem('trackman_auth_token', JSON.stringify({
        accessToken: this.tokenData.accessToken,
        tokenType: this.tokenData.tokenType,
        expiresAt: this.tokenData.expiresAt.toISOString(),
        scope: this.tokenData.scope,
      }));
    }
  }

  /**
   * Load token from localStorage
   */
  private loadTokenFromStorage(): void {
    const stored = localStorage.getItem('trackman_auth_token');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.tokenData = {
          accessToken: parsed.accessToken,
          tokenType: parsed.tokenType,
          expiresAt: new Date(parsed.expiresAt),
          scope: parsed.scope,
        };

        // Clean up if token is expired
        if (!this.isTokenValid()) {
          this.clearToken();
        }
      } catch (error) {
        console.warn('Failed to parse stored token:', error);
        this.clearToken();
      }
    }
  }

  /**
   * Clear the current token
   */
  public clearToken(): void {
    this.tokenData = null;
    localStorage.removeItem('trackman_auth_token');
  }

  /**
   * Logout and clear server-side OAuth session
   */
  public async logoutOAuth(): Promise<void> {
    const { ENV_URLS } = await import('./env');
    
    console.log('🔓 Starting OAuth logout...');
    
    // Clear local token first
    this.clearToken();
    
    // For now, let's do a simpler approach: 
    // 1. Clear local tokens
    // 2. Open logout URL in a new tab to clear server session
    // 3. Keep user in the app with clear feedback
    
    try {
      // Open logout endpoint in new tab to clear server session silently
      const logoutUrl = `${ENV_URLS.loginBase}/connect/endsession`;
      console.log('🌐 Opening logout URL in background:', logoutUrl);
      
      // Open in a new tab that will close itself
      const logoutTab = window.open(logoutUrl, '_blank', 'width=1,height=1');
      
      // Close the logout tab after a brief delay
      setTimeout(() => {
        if (logoutTab) {
          logoutTab.close();
        }
      }, 2000);
      
      console.log('✅ Local logout completed. Server session cleared in background.');
      
    } catch (error) {
      console.warn('⚠️ Could not clear server session:', error);
      console.log('✅ Local logout completed (server session may still be active)');
    }
  }

  /**
   * Check if user is authenticated (has OAuth user tokens)
   */
  public isAuthenticated(): boolean {
    // Only consider user authenticated if we have valid OAuth tokens with proper scopes
    if (!this.tokenData || !this.isTokenValid()) {
      return false;
    }
    
    // Check if this is a user token (has user-specific scopes) vs client credential token
    const scope = this.tokenData.scope || '';
    const hasUserScopes = scope.includes('openid') || scope.includes('profile') || scope.includes('email');
    
    console.log('🔍 Authentication check:', {
      hasToken: !!this.tokenData,
      isValid: this.isTokenValid(),
      scope: scope,
      hasUserScopes: hasUserScopes
    });
    
    return hasUserScopes;
  }

  /**
   * Check if we have any valid token (user or client credential)
   */
  public hasValidToken(): boolean {
    return this.tokenData !== null && this.isTokenValid();
  }

  /**
   * Start OAuth2 Authorization Code flow - redirects to login server
   */
  public async startOAuthLogin(): Promise<void> {
    const { buildAuthorizationUrl, generateCodeVerifier, generateState } = await import('./oauth2-utils');
    const { ENV_URLS, OAUTH_CONFIG } = await import('./env');

    console.log('🚀 Starting OAuth login flow...');
    console.log('OAuth Config:', {
      webClientId: OAUTH_CONFIG.webClientId,
      redirectUri: OAUTH_CONFIG.redirectUri,
      loginBaseUrl: ENV_URLS.loginBase,
      scopes: OAUTH_CONFIG.scopes
    });

    // Check for required configuration
    if (!OAUTH_CONFIG.webClientId) {
      console.error('❌ Missing OAuth client ID');
      throw new Error('OAuth client ID is not configured');
    }
    if (!OAUTH_CONFIG.redirectUri) {
      console.error('❌ Missing OAuth redirect URI');
      throw new Error('OAuth redirect URI is not configured');
    }
    if (!ENV_URLS.loginBase) {
      console.error('❌ Missing login base URL');
      throw new Error('Login base URL is not configured');
    }

    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier();
    const state = generateState();

    console.log('📝 Generated PKCE parameters:', {
      codeVerifierLength: codeVerifier.length,
      stateLength: state.length
    });

    // Store PKCE parameters in sessionStorage for callback
    sessionStorage.setItem('oauth_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    // Build authorization URL
    const authUrl = await buildAuthorizationUrl(
      {
        clientId: OAUTH_CONFIG.webClientId,
        loginBaseUrl: ENV_URLS.loginBase,
        redirectUri: OAUTH_CONFIG.redirectUri,
        scopes: OAUTH_CONFIG.scopes
      },
      codeVerifier,
      state
    );

    console.log('🔗 Authorization URL:', authUrl);
    console.log('🌐 About to redirect to TrackMan login server...');
    
    // Redirect to login server
    window.location.href = authUrl;
  }

  /**
   * Handle OAuth callback - exchange authorization code for tokens
   */
  public async handleOAuthCallback(callbackUrl: string): Promise<void> {
    const { parseAuthorizationCallback, exchangeCodeForToken } = await import('./oauth2-utils');
    const { ENV_URLS, OAUTH_CONFIG } = await import('./env');

    console.log('🔄 Processing OAuth callback...');

    // Parse callback URL
    const { code, state, error, error_description } = parseAuthorizationCallback(callbackUrl);

    if (error) {
      throw new Error(`OAuth error: ${error} - ${error_description}`);
    }

    if (!code || !state) {
      throw new Error('Missing authorization code or state parameter');
    }

    // Verify state parameter
    const storedState = sessionStorage.getItem('oauth_state');
    if (state !== storedState) {
      throw new Error('Invalid state parameter - possible CSRF attack');
    }

    // Get stored code verifier
    const codeVerifier = sessionStorage.getItem('oauth_code_verifier');
    if (!codeVerifier) {
      throw new Error('Missing code verifier - OAuth flow was not properly initiated');
    }

    try {
      // Exchange code for tokens
      const tokenResponse = await exchangeCodeForToken(
        {
          clientId: OAUTH_CONFIG.webClientId,
          clientSecret: OAUTH_CONFIG.webClientSecret,
          loginBaseUrl: ENV_URLS.loginBase,
          redirectUri: OAUTH_CONFIG.redirectUri,
          scopes: OAUTH_CONFIG.scopes
        },
        code,
        codeVerifier
      );

      // Convert to internal format
      const tokenData: TokenData = {
        accessToken: tokenResponse.access_token,
        tokenType: tokenResponse.token_type,
        expiresAt: new Date(Date.now() + tokenResponse.expires_in * 1000),
        refreshToken: tokenResponse.refresh_token,
        scope: tokenResponse.scope
      };

      // Store tokens
      this.tokenData = tokenData;
      this.saveTokenToStorage();

      console.log('✅ OAuth login successful!');
      console.log('  Token expires at:', tokenData.expiresAt);
      console.log('  Scopes:', tokenData.scope);

    } finally {
      // Clean up session storage
      sessionStorage.removeItem('oauth_code_verifier');
      sessionStorage.removeItem('oauth_state');
    }
  }

  /**
   * Get token info for debugging
   */
  public getTokenInfo(): { isValid: boolean; expiresAt?: Date; scope?: string } {
    return {
      isValid: this.isTokenValid(),
      expiresAt: this.tokenData?.expiresAt,
      scope: this.tokenData?.scope,
    };
  }
}

export const authService = AuthService.getInstance();
export default authService;