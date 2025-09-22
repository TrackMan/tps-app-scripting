import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from './auth-service';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  loginWithOAuth: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  tokenInfo: { isValid: boolean; expiresAt?: Date; scope?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Only check for OAuth tokens (user authentication), not client credential tokens
    const isAuth = authService.isAuthenticated();
    console.log('🔍 Checking auth status:', { isAuth, hasStoredToken: !!localStorage.getItem('trackman_auth_token') });
    
    setIsAuthenticated(isAuth);
    setIsLoading(false);
    
    if (!isAuth) {
      console.log('❌ Not authenticated - user needs to log in');
      setError(null); // Don't show error for unauthenticated state
    } else {
      console.log('✅ User is authenticated');
      setError(null);
    }
  };

  const login = async () => {
    // Client credential authentication has been removed - only OAuth login is supported
    console.log('❌ Client credential login is no longer supported. Use OAuth login instead.');
    throw new Error('Client credential authentication is disabled. Please use OAuth login.');
  };

  const loginWithOAuth = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.startOAuthLogin();
      // Note: This will redirect away from the app, so we won't reach the lines below
      // The OAuth callback will handle setting authentication state
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OAuth login failed';
      setError(errorMessage);
      setIsLoading(false);
      console.error('❌ OAuth login failed:', errorMessage);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logoutOAuth();
      console.log('🔓 Logged out successfully, auth service will handle redirect...');
      // Don't reload here - let the auth service handle the redirect to logout completion page
    } catch (err) {
      // Fallback to local logout if server logout fails
      console.warn('⚠️ Server logout failed, falling back to local logout:', err);
      authService.clearToken();
      console.log('🔓 Logged out locally, redirecting to login...');
      // Only reload if the auth service logout failed
      window.location.reload();
    }
  };

  const refreshAuth = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      authService.clearToken();
      await authService.getAccessToken();
      setIsAuthenticated(true);
      console.log('🔄 Token refreshed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Token refresh failed';
      setError(errorMessage);
      setIsAuthenticated(false);
      console.error('❌ Token refresh failed:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const tokenInfo = authService.getTokenInfo();

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    error,
    login,
    loginWithOAuth,
    logout,
    refreshAuth,
    tokenInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};