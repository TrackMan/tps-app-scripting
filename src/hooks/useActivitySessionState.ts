import { useRef, useCallback } from 'react';
import { useClient } from 'urql';
import { FIND_COURSE_ID, GET_COURSE_INFORMATION } from '../graphql/queries';

export interface CourseInfo {
  id: string;
  displayName: string;
  difficulty?: string;
  description?: string;
  holes?: Array<{
    holeNumber: number;
    images: Array<{
      url: string;
      metaDataUrl?: string;
    }>;
  }>;
}

export interface ActivitySessionData {
  activitySessionId: string;
  activityType?: string;
  activitySubType?: string;
  courseIdentifier?: string;
  courseInfo?: CourseInfo;
  isLoadingCourse?: boolean;
  timestamp: string;
}

/**
 * Hook to manage shared state across events with the same ActivitySession.
 * This allows us to extract information from the first SessionInfo event
 * and make it available to all subsequent events in the same session.
 */
export function useActivitySessionState() {
  const client = useClient();
  const sessionStateRef = useRef<Map<string, ActivitySessionData>>(new Map());



  /**
   * Process a SessionInfo event and extract activity information.
   * If it's a course play activity, fetch the course details from GraphQL.
   */
  const processSessionInfo = useCallback(async (event: any) => {
    try {
      const activitySessionId = 
        event?.data?.ActivitySession?.Id || 
        event?.ActivitySession?.Id;
      
      if (!activitySessionId) return;

      // Check if we already have this session
      if (sessionStateRef.current.has(activitySessionId)) {
        return;
      }

      const eventModel = event?.data?.EventModel || event?.EventModel || event;
      const activity = eventModel?.Activity;

      if (!activity) return;

      const sessionData: ActivitySessionData = {
        activitySessionId,
        activityType: activity.Type,
        activitySubType: activity.SubType,
        courseIdentifier: activity.Identifier,
        timestamp: new Date().toISOString(),
      };

      // Store initial session data
      sessionStateRef.current.set(activitySessionId, sessionData);

      // If this is a Course activity, fetch course information
      if (activity.Type === 'Course' && activity.Identifier) {
        console.log('[ActivitySession] Course detected:', activity.Identifier);
        
        // Mark as loading
        sessionStateRef.current.set(activitySessionId, {
          ...sessionData,
          isLoadingCourse: true,
        });

        try {
          // Step 1: Find course ID by identifier
          const courseIdResult = await client.query(FIND_COURSE_ID, {
            courseIdentifiers: activity.Identifier,
          }).toPromise();

          console.log('[ActivitySession] Course ID query result:', courseIdResult);

          const courseId = courseIdResult?.data?.courses?.items?.[0]?.id;

          if (!courseId) {
            console.warn('[ActivitySession] Course ID not found for:', activity.Identifier);
            sessionStateRef.current.set(activitySessionId, {
              ...sessionData,
              isLoadingCourse: false,
            });
            return;
          }

          // Step 2: Get full course information
          const courseInfoResult = await client.query(GET_COURSE_INFORMATION, {
            courseId,
          }).toPromise();

          console.log('[ActivitySession] Course info query result:', courseInfoResult);

          const courseNode = courseInfoResult?.data?.node;

          if (courseNode) {
            const courseInfo: CourseInfo = {
              id: courseId,
              displayName: courseNode.displayName,
              difficulty: courseNode.difficulty,
              description: courseNode.description,
              holes: courseNode.holes,
            };

            console.log('[ActivitySession] Course info loaded:', courseInfo.displayName);

            // Update session data with course info
            sessionStateRef.current.set(activitySessionId, {
              ...sessionData,
              courseInfo,
              isLoadingCourse: false,
            });
          } else {
            sessionStateRef.current.set(activitySessionId, {
              ...sessionData,
              isLoadingCourse: false,
            });
          }
        } catch (error) {
          console.error('[ActivitySession] Error fetching course info:', error);
          sessionStateRef.current.set(activitySessionId, {
            ...sessionData,
            isLoadingCourse: false,
          });
        }
      }
    } catch (error) {
      console.error('[ActivitySession] Error processing SessionInfo:', error);
    }
  }, [client]);

  /**
   * Get the activity session data for a given activity session ID
   */
  const getSessionData = useCallback((activitySessionId: string): ActivitySessionData | undefined => {
    return sessionStateRef.current.get(activitySessionId);
  }, []);

  /**
   * Get all activity sessions
   */
  const getAllSessions = useCallback((): ActivitySessionData[] => {
    return Array.from(sessionStateRef.current.values());
  }, []);

  /**
   * Clear a specific session
   */
  const clearSession = useCallback((activitySessionId: string) => {
    sessionStateRef.current.delete(activitySessionId);
  }, []);

  /**
   * Clear all sessions
   */
  const clearAllSessions = useCallback(() => {
    sessionStateRef.current.clear();
  }, []);

  return {
    processSessionInfo,
    getSessionData,
    getAllSessions,
    clearSession,
    clearAllSessions,
  };
}
