import React, { useEffect } from 'react';
import { useAuth } from '../lib/AuthProvider';

export const LoginPage: React.FC = () => {
  const { loginWithOAuth, error } = useAuth();

  // Automatically redirect to OAuth on component mount
  useEffect(() => {
    const initiateLogin = async () => {
      try {
        await loginWithOAuth();
      } catch (err) {
        console.error('Auto-login failed:', err);
      }
    };

    // Add a small delay to avoid potential race conditions
    const timer = setTimeout(initiateLogin, 100);
    return () => clearTimeout(timer);
  }, [loginWithOAuth]);

  // Only show this if there's an error
  if (error) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo">
              <svg width="48" height="48" viewBox="0 0 215 215">
                <g>
                  <path d="M198.385 0C207.593 0 215 7.40689 215 16.6155V198.385C215 207.593 207.593 215 198.385 215H85.5796C83.9781 215 82.6769 213.599 82.8771 211.997C92.9865 125.517 139.029 33.9316 169.558 0.300279C169.758 0.100093 170.058 0 170.358 0H198.385Z" fill="#EC691A"></path>
                  <path d="M16.6155 0H153.843C154.143 0 154.344 0.400372 154.043 0.600559C97.2905 48.2449 52.5489 145.535 33.9316 212.298C33.5312 213.899 32.0298 215 30.4283 215H16.6155C7.40689 215 0 207.593 0 198.385V16.6155C0 7.40689 7.40689 0 16.6155 0Z" fill="#EC691A"></path>
                </g>
              </svg>
            </div>
            <h1 className="login-title">APP SCRIPT EDITOR</h1>
            <p className="login-subtitle">Authentication Error</p>
          </div>

          <div className="login-content">
            <div className="login-error">
              <p>⚠️ {error}</p>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="login-button"
            >
              🔄 Try Again
            </button>

            <div className="login-info">
              <p>Click to retry authentication</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while redirecting to OAuth
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 215 215">
              <g>
                <path d="M198.385 0C207.593 0 215 7.40689 215 16.6155V198.385C215 207.593 207.593 215 198.385 215H85.5796C83.9781 215 82.6769 213.599 82.8771 211.997C92.9865 125.517 139.029 33.9316 169.558 0.300279C169.758 0.100093 170.058 0 170.358 0H198.385Z" fill="#EC691A"></path>
                <path d="M16.6155 0H153.843C154.143 0 154.344 0.400372 154.043 0.600559C97.2905 48.2449 52.5489 145.535 33.9316 212.298C33.5312 213.899 32.0298 215 30.4283 215H16.6155C7.40689 215 0 207.593 0 198.385V16.6155C0 7.40689 7.40689 0 16.6155 0Z" fill="#EC691A"></path>
              </g>
            </svg>
          </div>
          <h1 className="login-title">APP SCRIPT EDITOR</h1>
          <p className="login-subtitle">🔄 Redirecting to TrackMan login...</p>
        </div>
      </div>
    </div>
  );
};