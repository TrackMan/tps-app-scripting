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

  // In production, these will be replaced by build process
  return {
    version: process.env.REACT_APP_VERSION || 'unknown',
    timestamp: process.env.REACT_APP_BUILD_TIME || new Date().toISOString().slice(0, 16).replace('T', ' '),
    commit: process.env.REACT_APP_COMMIT_SHA?.slice(0, 7) || undefined,
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