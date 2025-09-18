import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from './auth-service';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
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
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);
    setIsLoading(false);
    
    if (!isAuth) {
      setError('Not authenticated');
    } else {
      setError(null);
    }
  };

  const login = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.getAccessToken();
      setIsAuthenticated(true);
      console.log('✅ Successfully authenticated');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      setIsAuthenticated(false);
      console.error('❌ Authentication failed:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.clearToken();
    setIsAuthenticated(false);
    setError(null);
    console.log('🔓 Logged out');
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