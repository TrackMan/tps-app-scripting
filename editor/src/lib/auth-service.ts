interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

interface TokenData {
  accessToken: string;
  tokenType: string;
  expiresAt: Date;
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
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.tokenData !== null && this.isTokenValid();
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