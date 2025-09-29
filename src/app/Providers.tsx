import React from 'react';

// AppProviders is a small composition point for global providers (Auth, Theme, QueryClient, etc.)
// For now it simply forwards children — this gives us a single place to add providers later.
export const AppProviders: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default AppProviders;
