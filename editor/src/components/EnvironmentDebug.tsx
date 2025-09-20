import React from 'react';

export const EnvironmentDebug: React.FC = () => {
  const isDevelopment = import.meta.env.DEV;
  const backendBase = import.meta.env.VITE_BACKEND_BASE_URL;
  const loginBase = import.meta.env.VITE_LOGIN_BASE_URL;
  const nodeEnv = import.meta.env.VITE_NODE_ENV;
  const mode = import.meta.env.MODE;

  // Only show in development or when there are issues
  if (!isDevelopment && backendBase && loginBase) {
    return null;
  }

  return (
    <div className="env-debug">
      <details>
        <summary>{isDevelopment ? '🛠️ Development Environment' : '⚠️ Environment Configuration'}</summary>
        <div className="env-debug-content">
          <div className="env-section">
            <h4>Environment Variables</h4>
            <table className="env-table">
              <tbody>
                <tr>
                  <td>MODE:</td>
                  <td>{mode || 'undefined'}</td>
                </tr>
                <tr>
                  <td>DEV:</td>
                  <td>{isDevelopment ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <td>VITE_NODE_ENV:</td>
                  <td>{nodeEnv || 'undefined'}</td>
                </tr>
                <tr>
                  <td>VITE_BACKEND_BASE_URL:</td>
                  <td className={backendBase ? 'env-ok' : 'env-missing'}>
                    {backendBase || 'NOT SET'}
                  </td>
                </tr>
                <tr>
                  <td>VITE_LOGIN_BASE_URL:</td>
                  <td className={loginBase ? 'env-ok' : 'env-missing'}>
                    {loginBase || 'NOT SET'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="env-section">
            <h4>Computed URLs</h4>
            <table className="env-table">
              <tbody>
                <tr>
                  <td>GraphQL:</td>
                  <td>{backendBase ? `${backendBase}/graphql` : 'Cannot compute - backend URL missing'}</td>
                </tr>
                <tr>
                  <td>OAuth Token:</td>
                  <td>{loginBase ? `${loginBase}/connect/token` : 'Cannot compute - login URL missing'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {(!backendBase || !loginBase) && (
            <div className="env-warning">
              <p><strong>⚠️ Missing Configuration</strong></p>
              <p>Some environment variables are not set. This may cause authentication and API calls to fail.</p>
              <p>Expected variables:</p>
              <ul>
                <li><code>VITE_BACKEND_BASE_URL</code> - Backend API base URL</li>
                <li><code>VITE_LOGIN_BASE_URL</code> - Authentication service base URL</li>
              </ul>
            </div>
          )}
        </div>
      </details>
    </div>
  );
};