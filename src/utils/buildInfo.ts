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

  // If the commit SHA isn't available at build time, try the runtime-injected window.env
  // (env-config.js injects window.env when running inside the container)
  let runtimeCommitSha: string | undefined = undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w && w.env && w.env.VITE_APP_COMMIT_SHA) {
      runtimeCommitSha = String(w.env.VITE_APP_COMMIT_SHA);
    }
  } catch (e) {
    // ignore (e.g., server-side rendering or restricted env)
  }

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
    commit: (commitSha || runtimeCommitSha)?.slice ? (commitSha || runtimeCommitSha)?.slice(0, 7) : undefined,
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