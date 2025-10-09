/**
 * Environment Switcher Service
 * 
 * Manages switching between development and production environments.
 * Stores the active environment in localStorage and provides methods
 * to switch between environments.
 */

export type Environment = 'dev' | 'prod';

const STORAGE_KEY = 'active-environment';

interface EnvironmentConfig {
  backendBaseUrl: string;
  loginBaseUrl: string;
  oauthClientId: string;
  oauthClientSecret: string;
}

/**
 * Get the currently active environment from localStorage
 */
export function getActiveEnvironment(): Environment {
  const stored = localStorage.getItem(STORAGE_KEY);
  console.log(`🔍 [environment-switcher] Reading from localStorage['${STORAGE_KEY}']:`, stored);
  const env = (stored === 'prod' || stored === 'dev') ? stored : 'dev';
  console.log(`🔍 [environment-switcher] Active environment:`, env);
  return env;
}

/**
 * Set the active environment in localStorage
 */
export function setActiveEnvironment(env: Environment): void {
  console.log(`💾 [environment-switcher] Writing to localStorage['${STORAGE_KEY}']:`, env);
  localStorage.setItem(STORAGE_KEY, env);
  console.log(`✅ [environment-switcher] Saved to localStorage`);
}

/**
 * Get the configuration for a specific environment
 * Checks runtime config (Azure) first, then falls back to build-time env vars
 */
export function getEnvironmentConfig(env: Environment): EnvironmentConfig {
  const runtimeConfig = (window as any)?.runtimeConfig;
  
  if (env === 'prod') {
    return {
      backendBaseUrl: runtimeConfig?.VITE_PROD_BACKEND_BASE_URL || import.meta.env.VITE_PROD_BACKEND_BASE_URL,
      loginBaseUrl: runtimeConfig?.VITE_PROD_LOGIN_BASE_URL || import.meta.env.VITE_PROD_LOGIN_BASE_URL,
      oauthClientId: runtimeConfig?.VITE_PROD_OAUTH_WEB_CLIENT_ID || import.meta.env.VITE_PROD_OAUTH_WEB_CLIENT_ID,
      oauthClientSecret: runtimeConfig?.VITE_PROD_OAUTH_WEB_CLIENT_SECRET || import.meta.env.VITE_PROD_OAUTH_WEB_CLIENT_SECRET,
    };
  } else {
    return {
      backendBaseUrl: runtimeConfig?.VITE_DEV_BACKEND_BASE_URL || import.meta.env.VITE_DEV_BACKEND_BASE_URL,
      loginBaseUrl: runtimeConfig?.VITE_DEV_LOGIN_BASE_URL || import.meta.env.VITE_DEV_LOGIN_BASE_URL,
      oauthClientId: runtimeConfig?.VITE_DEV_OAUTH_WEB_CLIENT_ID || import.meta.env.VITE_DEV_OAUTH_WEB_CLIENT_ID,
      oauthClientSecret: runtimeConfig?.VITE_DEV_OAUTH_WEB_CLIENT_SECRET || import.meta.env.VITE_DEV_OAUTH_WEB_CLIENT_SECRET,
    };
  }
}

/**
 * Get the configuration for the currently active environment
 */
export function getCurrentEnvironmentConfig(): EnvironmentConfig {
  const env = getActiveEnvironment();
  const config = getEnvironmentConfig(env);
  console.log(`🔍 [environment-switcher] getCurrentEnvironmentConfig() for '${env}':`, config);
  return config;
}

/**
 * Switch to the other environment (dev <-> prod)
 * Returns the new environment
 */
export function switchEnvironment(): Environment {
  const current = getActiveEnvironment();
  const newEnv: Environment = current === 'dev' ? 'prod' : 'dev';
  setActiveEnvironment(newEnv);
  return newEnv;
}

/**
 * Get a human-readable label for the environment
 */
export function getEnvironmentLabel(env: Environment): string {
  return env === 'prod' ? 'Production' : 'Development';
}

/**
 * Check if production environment is properly configured
 */
export function isProductionConfigured(): boolean {
  const config = getEnvironmentConfig('prod');
  console.log('🔍 [environment-switcher] isProductionConfigured() check:', {
    backendBaseUrl: config.backendBaseUrl,
    loginBaseUrl: config.loginBaseUrl,
    oauthClientId: config.oauthClientId ? 'SET' : 'NOT SET',
    oauthClientSecret: config.oauthClientSecret ? 'SET' : 'NOT SET',
    hasPlaceholder: config.oauthClientId?.includes('PROD-CLIENT-ID-HERE') || config.oauthClientSecret?.includes('PROD-CLIENT-SECRET-HERE')
  });
  
  const isConfigured = !!(
    config.backendBaseUrl &&
    config.loginBaseUrl &&
    config.oauthClientId &&
    config.oauthClientSecret &&
    !config.oauthClientId.includes('PROD-CLIENT-ID-HERE') &&
    !config.oauthClientSecret.includes('PROD-CLIENT-SECRET-HERE')
  );
  
  console.log('✅ [environment-switcher] isProductionConfigured():', isConfigured);
  return isConfigured;
}
