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
   * Get a valid access token (user tokens only - no client credentials)
   */
  public async getAccessToken(): Promise<string> {
    console.log('🎫 getAccessToken() called');
    
    // Only return user tokens, never client credential tokens
    if (this.tokenData && this.isTokenValid() && this.isAuthenticated()) {
      console.log('✅ Using existing valid user token');
      return this.tokenData.accessToken;
    }

    console.log('❌ No valid user token available - client must authenticate via OAuth');
    throw new Error('No valid user token available. User must log in via OAuth.');
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
    console.log('🔍 Loading token from storage:', {
      hasStoredToken: !!stored,
      tokenPreview: stored ? stored.substring(0, 50) + '...' : 'none'
    });
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.tokenData = {
          accessToken: parsed.accessToken,
          tokenType: parsed.tokenType,
          expiresAt: new Date(parsed.expiresAt),
          scope: parsed.scope,
        };

        console.log('📦 Loaded token data:', {
          hasAccessToken: !!this.tokenData.accessToken,
          tokenType: this.tokenData.tokenType,
          expiresAt: this.tokenData.expiresAt,
          scope: this.tokenData.scope,
          isValid: this.isTokenValid()
        });

        // Clean up if token is expired
        if (!this.isTokenValid()) {
          console.log('🗑️ Token is expired, clearing...');
          this.clearToken();
        }
      } catch (error) {
        console.warn('Failed to parse stored token:', error);
        this.clearToken();
      }
    }
  }

  /**
   * Clear the current token and all authentication state
   */
  public clearToken(): void {
    console.log('🧹 Clearing all authentication tokens and state...');
    
    // Clear in-memory token
    this.tokenData = null;
    
    // Clear all possible localStorage keys
    localStorage.removeItem('trackman_auth_token');
    localStorage.removeItem('oauth_token');
    localStorage.removeItem('access_token');
    
    // Clear all sessionStorage OAuth state
    sessionStorage.removeItem('oauth_code_verifier');
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('oauth_processed');
    
    console.log('✅ All authentication state cleared');
  }

  /**
   * Force clear all authentication state and reload the page
   * Use this to completely reset authentication for testing
   */
  public forceResetAuthentication(): void {
    console.log('🔴 Force resetting all authentication...');
    
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear in-memory state
    this.tokenData = null;
    this.tokenRefreshPromise = null;
    
    console.log('🔄 Reloading page to complete reset...');
    window.location.href = window.location.origin;
  }

  /**
   * Logout and clear server-side OAuth session
   */
  public async logoutOAuth(): Promise<void> {
    console.log('🔓 Starting OAuth logout...');
    
    // Clear local token first
    this.clearToken();
    
    // Clear all storage to ensure complete logout
    try {
      localStorage.clear();
      sessionStorage.clear();
      console.log('🧹 Cleared all browser storage');
    } catch (error) {
      console.warn('Failed to clear storage:', error);
    }
    
    // Use TrackMan portal approach: redirect directly to server logout endpoint
    // This lets the OAuth server handle session clearing and proper logout flow
    try {
      const { ENV_URLS, OAUTH_CONFIG } = await import('./env');
      
      // Build logout URL with returnUrl parameter (exactly like portal approach)
      const returnUrl = `${window.location.origin}/?logout_complete=true&t=${Date.now()}`;
      const logoutUrl = new URL(`${ENV_URLS.loginBase}/connect/endsession`);
      
      // Add required parameters for proper logout
      if (OAUTH_CONFIG.webClientId) {
        logoutUrl.searchParams.set('client_id', OAUTH_CONFIG.webClientId);
      }
      
      // Use both standard OAuth parameter and portal-style returnUrl
      logoutUrl.searchParams.set('post_logout_redirect_uri', returnUrl);
      logoutUrl.searchParams.set('returnUrl', encodeURIComponent(returnUrl)); // Portal style
      
      console.log('🔄 Redirecting to TrackMan logout endpoint:', logoutUrl.toString());
      console.log('🔍 Return URL after logout:', returnUrl);
      
      // Direct redirect to OAuth server logout (like portal does)
      window.location.href = logoutUrl.toString();
      
    } catch (error) {
      console.error('❌ Failed to build logout URL:', error);
      // Fallback to simple logout completion page
      const fallbackUrl = `${window.location.origin}/?logout_complete=true&t=${Date.now()}`;
      console.log('🔄 Fallback: Redirecting to logout completion page:', fallbackUrl);
      window.location.href = fallbackUrl;
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
  public async startOAuthLogin(prompt?: string): Promise<void> {
    const { buildAuthorizationUrl, generateCodeVerifier, generateState } = await import('./oauth2-utils');
    const { ENV_URLS, OAUTH_CONFIG } = await import('./env');

    console.log('🚀 Starting OAuth login flow...');
    console.log('🔍 startOAuthLogin called with prompt parameter:', prompt);
    if (prompt) {
      console.log('🔑 Using prompt parameter:', prompt, '- This will force login screen');
    } else {
      console.log('⚠️ No prompt parameter provided - may auto-login if server session exists');
    }
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
      state,
      prompt
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

// Make auth service available globally for debugging
(window as any).authService = authService;

export default authService;