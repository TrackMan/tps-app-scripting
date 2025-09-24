// Build information utility
export interface BuildInfo {
  version: string;
  timestamp: string;
  commit?: string;
}

export const getBuildInfo = (): BuildInfo => {
  // In development, use current timestamp
  if (import.meta.env.DEV) {
    return {
      version: 'dev',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
  }



  // In production, use Vite environment variables (VITE_ prefix required)
  // Fallback to package version if environment variable not available
  const envVersion = import.meta.env.VITE_APP_VERSION;
  const version = envVersion && envVersion !== 'undefined' ? envVersion : '0.1.0';
  const buildTime = import.meta.env.VITE_APP_BUILD_TIME;
  const commitSha = import.meta.env.VITE_APP_COMMIT_SHA;

  // Format the build time if available
  let timestamp: string;
  if (buildTime) {
    // Convert ISO timestamp to readable format
    timestamp = new Date(buildTime).toISOString().slice(0, 16).replace('T', ' ');
  } else {
    timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  }

  return {
    version,
    timestamp,
    commit: commitSha?.slice(0, 7) || undefined,
  };
};

export const formatBuildInfo = (buildInfo: BuildInfo): string => {
  const { version, timestamp, commit } = buildInfo;
  
  if (version === 'dev') {
    return `dev • ${timestamp}`;
  }
  
  if (commit) {
    return `v${version} • ${commit} • ${timestamp}`;
  }
  
  return `v${version} • ${timestamp}`;
};