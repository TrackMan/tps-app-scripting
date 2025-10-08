import React, { useEffect, useState } from 'react';
import { Vector3, projectWorldToPixel, loadHoleMetadata, PixelCoordinate } from '../../utils/projectionUtils';
import './ShotTrajectoryOverlay.css';

export interface ShotData {
  startPosition: Vector3;
  finishPosition: Vector3;
  shotNumber?: number;
}

interface Props {
  imageUrl: string;
  metaDataUrl: string;
  shots: ShotData[];
  imageWidth?: number;
  imageHeight?: number;
}

interface ProjectedShot {
  start: PixelCoordinate;
  finish: PixelCoordinate;
  shotNumber?: number;
}

/**
 * Component that displays a hole image with multiple shot trajectories overlaid
 */
const ShotTrajectoryOverlay: React.FC<Props> = ({
  imageUrl,
  metaDataUrl,
  shots,
  imageWidth,
  imageHeight,
}) => {
  const [projectedShots, setProjectedShots] = useState<ProjectedShot[]>([]);
  const [metadataDimensions, setMetadataDimensions] = useState({ width: imageWidth ?? 1280, height: imageHeight ?? 720 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!shots || shots.length === 0 || !metaDataUrl) {
      setProjectedShots([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        console.log('[ShotTrajectory] Loading metadata from:', metaDataUrl);
        const metadata = await loadHoleMetadata(metaDataUrl);
        
        if (cancelled) return;

        // Use metadata dimensions if available
        const width = metadata.Width ?? 1280;
        const height = metadata.Height ?? 720;
        setMetadataDimensions({ width, height });

        console.log(`[ShotTrajectory] Projecting ${shots.length} shot(s)`);
        const projected: ProjectedShot[] = [];
        
        for (const shot of shots) {
          const start = projectWorldToPixel(shot.startPosition, metadata);
          const finish = projectWorldToPixel(shot.finishPosition, metadata);
          
          // Only include shots where both points are visible
          if (start.isVisible && finish.isVisible) {
            projected.push({ start, finish, shotNumber: shot.shotNumber });
            console.log(`[ShotTrajectory] Shot ${shot.shotNumber || '?'}: Start(${start.x.toFixed(0)},${start.y.toFixed(0)}) -> Finish(${finish.x.toFixed(0)},${finish.y.toFixed(0)})`);
          } else {
            console.log(`[ShotTrajectory] Shot ${shot.shotNumber || '?'}: Skipped (not visible)`);
          }
        }

        if (!cancelled) {
          setProjectedShots(projected);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[ShotTrajectory] Error projecting positions:', err);
          setError(err instanceof Error ? err.message : 'Failed to project trajectory');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shots, metaDataUrl, imageWidth, imageHeight]);

  // Measure actual rendered image size for correct SVG viewBox
  useEffect(() => {
    const updateImageDimensions = () => {
      if (imageRef.current) {
        const { clientWidth, clientHeight } = imageRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          console.log('[ShotTrajectory] Rendered image size:', clientWidth, 'x', clientHeight);
        }
      }
    };

    // Measure on image load
    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        // Image already loaded
        updateImageDimensions();
      } else {
        img.addEventListener('load', updateImageDimensions);
      }
    }

    // Update on window resize
    window.addEventListener('resize', updateImageDimensions);

    return () => {
      if (img) {
        img.removeEventListener('load', updateImageDimensions);
      }
      window.removeEventListener('resize', updateImageDimensions);
    };
  }, [imageUrl]);

  // Shot colors - use different colors for each shot
  const shotColors = [
    '#ec691a', // Orange (shot 1) - TrackMan Orange
    '#3b82f6', // Blue (shot 2)
    '#10b981', // Green (shot 3)
    '#f59e0b', // Amber (shot 4)
    '#ef4444', // Red (shot 5)
    '#8b5cf6', // Violet (shot 6+)
  ];
  
  const getColorForShot = (index: number) => {
    return shotColors[index % shotColors.length];
  };

  // Create a curved path for the trajectory (quadratic bezier)
  const createCurvedPath = (x1: number, y1: number, x2: number, y2: number): string => {
    // Calculate the control point for a curved path
    // The curve bends perpendicular to the shot direction
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point offset (perpendicular to the line, 8% of distance for subtle arc)
    const curveAmount = distance * 0.08;
    const perpX = -dy / distance;
    const perpY = dx / distance;
    
    // Control point at midpoint, offset perpendicular
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const controlX = midX + perpX * curveAmount;
    const controlY = midY + perpY * curveAmount;
    
    return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
  };

  return (
    <div className="shot-trajectory-container">
      <div className="rotation-wrapper">
        <img 
          ref={imageRef}
          src={imageUrl} 
          alt="Hole layout"
          className="hole-image"
        />
        
        {!loading && !error && projectedShots.length > 0 && (
          <svg
            className="trajectory-overlay"
            viewBox={`0 0 ${metadataDimensions.width} ${metadataDimensions.height}`}
            preserveAspectRatio="none"
          >
            {projectedShots.map((shot, index) => {
              const color = getColorForShot(index);
              const curvePath = createCurvedPath(
                shot.start.x, 
                shot.start.y, 
                shot.finish.x, 
                shot.finish.y
              );
              
              return (
                <g key={index}>
                  {/* Shadow line (straight, underneath) */}
                  <line
                    x1={shot.start.x}
                    y1={shot.start.y}
                    x2={shot.finish.x}
                    y2={shot.finish.y}
                    stroke="rgba(0, 0, 0, 0.3)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  
                  {/* Shot trajectory line (curved, white) */}
                  <path
                    d={curvePath}
                    stroke="white"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.9"
                  />
                  
                  {/* Start marker (tee position) */}
                  <circle
                    cx={shot.start.x}
                    cy={shot.start.y}
                    r="8"
                    fill="white"
                    stroke={color}
                    strokeWidth="3"
                  />
                
                  {/* Finish marker (ball position) */}
                  <g>
                    <circle
                      cx={shot.finish.x}
                      cy={shot.finish.y}
                      r="10"
                      fill={color}
                      stroke="white"
                      strokeWidth="3"
                    />
                    <circle
                      cx={shot.finish.x}
                      cy={shot.finish.y}
                      r="4"
                      fill="white"
                    />
                  </g>
                
                  {/* Shot number label */}
                  {shot.shotNumber !== undefined && (
                    <text
                      x={shot.finish.x}
                      y={shot.finish.y - 18}
                      fill={color}
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="white"
                      strokeWidth="4"
                      paintOrder="stroke"
                    >
                      {shot.shotNumber}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      
      {loading && (
        <div className="trajectory-status">Loading trajectory...</div>
      )}
      
      {error && (
        <div className="trajectory-error">
          Failed to render trajectory
        </div>
      )}
      </div>
    </div>
  );
};

export default ShotTrajectoryOverlay;
