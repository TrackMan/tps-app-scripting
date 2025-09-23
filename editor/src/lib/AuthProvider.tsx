import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from './auth-service';
import { GET_ME } from '../graphql/queries';
import { useQuery } from 'urql';

// Dummy usage to trigger codegen
const _dummy = GET_ME;

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  loginWithOAuth: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  tokenInfo: { isValid: boolean; expiresAt?: Date; scope?: string };
  profile: Profile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface Profile {
  id: string;
  dbId: number;
  fullName: string;
  picture?: string;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Only check for OAuth tokens (user authentication), not client credential tokens
    const isAuth = authService.isAuthenticated();
    
    setIsAuthenticated(isAuth);
    setIsLoading(false);
    
    if (!isAuth) {
      setError(null); // Don't show error for unauthenticated state
    } else {
      setError(null);
    }
  };

  const login = async () => {
    // Client credential authentication has been removed - only OAuth login is supported
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
      // Don't reload here - let the auth service handle the redirect to logout completion page
    } catch (err) {
      // Fallback to local logout if server logout fails
      console.warn('⚠️ Server logout failed, falling back to local logout:', err);
      authService.clearToken();
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
  // Fetch user profile after authentication
  const [{ data, fetching }] = useQuery({ query: GET_ME, pause: !isAuthenticated });
  React.useEffect(() => {
    if (data?.me?.profile) {
      setProfile(data.me.profile);
    }
  }, [data]);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    error,
    login,
    loginWithOAuth,
    logout,
    refreshAuth,
    tokenInfo,
    profile,
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