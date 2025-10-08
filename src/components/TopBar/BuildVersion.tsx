import React from 'react';
import { getBuildInfo, formatBuildInfo } from '../../utils/buildInfo';

export const BuildVersion: React.FC = () => {
  const buildInfo = getBuildInfo();
  const buildText = formatBuildInfo(buildInfo);

  return (
    <div 
      className="build-version" 
      title={`Build: ${buildText}`}
    >
      {buildText}
    </div>
  );
};