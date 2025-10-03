import React from 'react';
import { CourseInfo, ActivitySessionData } from '../hooks/useActivitySessionState';
import './CourseInfoBanner.css';

interface Props {
  sessionData: ActivitySessionData;
  isLoading?: boolean;
  // Event-specific data (not session-level)
  eventHole?: number;
  eventShot?: number;
  eventPlayerName?: string;
}

const CourseInfoBanner: React.FC<Props> = ({ sessionData, isLoading, eventHole, eventShot, eventPlayerName }) => {
  if (isLoading) {
    return (
      <div className="course-info-banner loading">
        <div className="course-info-content">
          <span className="course-info-loading">Loading course information...</span>
        </div>
      </div>
    );
  }

  const { courseInfo } = sessionData;

  return (
    <div className="course-info-banner">
      <div className="course-info-content">
        <div className="course-info-icon">🏌️</div>
        <div className="course-info-details">
          {courseInfo && (
            <>
              <div className="course-info-name">{courseInfo.displayName}</div>
              {courseInfo.difficulty && (
                <div className="course-info-difficulty">
                  Difficulty: <span className="difficulty-value">{courseInfo.difficulty}</span>
                </div>
              )}
              {courseInfo.description && (
                <div className="course-info-description">{courseInfo.description}</div>
              )}
              {courseInfo.holes && (
                <div className="course-info-holes">{courseInfo.holes.length} holes</div>
              )}
            </>
          )}
          
          {/* Display event-specific hole and shot */}
          {eventHole !== undefined && eventShot !== undefined && (
            <div className="course-info-progress">
              <span className="progress-hole">Hole {eventHole}</span>
              <span className="progress-separator">•</span>
              <span className="progress-shot">Shot {eventShot}</span>
              {eventPlayerName && (
                <>
                  <span className="progress-separator">•</span>
                  <span className="progress-player">{eventPlayerName}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Display hole image if available */}
      {eventHole !== undefined && courseInfo?.holes && (
        <div className="hole-image-container">
          {(() => {
            const hole = courseInfo.holes.find(h => h.holeNumber === eventHole);
            if (hole?.images && hole.images.length > 0) {
              return (
                <img 
                  src={hole.images[0].url} 
                  alt={`Hole ${eventHole} layout`}
                  className="hole-image"
                  onError={(e) => {
                    // Hide image if it fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              );
            }
            return null;
          })()}
        </div>
      )}
    </div>
  );
};

export default CourseInfoBanner;
