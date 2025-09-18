import React from 'react';
import { useAuth } from '../lib/AuthProvider';

export const AuthStatus: React.FC = () => {
  const { isAuthenticated, isLoading, error, login, logout, refreshAuth, tokenInfo } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-status loading">
        <span>🔄 Checking authentication...</span>
      </div>
    );
  }

  return (
    <div className="auth-status">
      <div className="auth-info">
        <span className={`status-indicator ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}>
          {isAuthenticated ? '🔒 Authenticated' : '🔓 Not Authenticated'}
        </span>
        
        {tokenInfo.expiresAt && (
          <span className="token-expiry">
            Expires: {tokenInfo.expiresAt.toLocaleString()}
          </span>
        )}
        
        {tokenInfo.scope && (
          <span className="token-scope">
            Scope: {tokenInfo.scope}
          </span>
        )}
      </div>
      
      <div className="auth-actions">
        {!isAuthenticated ? (
          <button onClick={login} className="auth-button login">
            Login
          </button>
        ) : (
          <>
            <button onClick={refreshAuth} className="auth-button refresh">
              Refresh Token
            </button>
            <button onClick={logout} className="auth-button logout">
              Logout
            </button>
          </>
        )}
      </div>
      
      {error && (
        <div className="auth-error">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};