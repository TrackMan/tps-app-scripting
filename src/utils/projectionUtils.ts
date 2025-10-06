/**
 * Utility for projecting 3D world coordinates to 2D image pixel coordinates
 * using Unity's camera projection matrices from hole metadata.
 */

// Vector3 is a tuple array [x, y, z]
export type Vector3 = [number, number, number];

export interface Matrix4x4Data {
  m00: number; m01: number; m02: number; m03: number;
  m10: number; m11: number; m12: number; m13: number;
  m20: number; m21: number; m22: number; m23: number;
  m30: number; m31: number; m32: number; m33: number;
}

export interface HoleMetadata {
  Width?: number;
  Height?: number;
  fieldOfView?: number;
  nearClipPlane?: number;
  farClipPlane?: number;
  aspect?: number;
  projectionMatrix: Matrix4x4Data;
  worldToCameraMatrix: Matrix4x4Data;
}

export interface PixelCoordinate {
  x: number;        // Pixel x coordinate (integer)
  y: number;        // Pixel y coordinate (integer)
  xPct: number;     // Normalized x (0-1)
  yPct: number;     // Normalized y (0-1)
  isVisible: boolean; // Whether point is within image bounds
}

/**
 * Matrix4x4 class for transformation operations
 */
class Matrix4x4 {
  private data: number[];

  constructor(matrixData: Matrix4x4Data) {
    // Unity/column-major layout
    this.data = [
      matrixData.m00, matrixData.m10, matrixData.m20, matrixData.m30,
      matrixData.m01, matrixData.m11, matrixData.m21, matrixData.m31,
      matrixData.m02, matrixData.m12, matrixData.m22, matrixData.m32,
      matrixData.m03, matrixData.m13, matrixData.m23, matrixData.m33,
    ];
  }

  /**
   * Multiply matrix by a 4D vector [x, y, z, w]
   */
  multiplyVector4(v: number[]): number[] {
    const result = [0, 0, 0, 0];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        result[row] += this.data[col * 4 + row] * v[col];
      }
    }
    return result;
  }
}

/**
 * Cache for loaded metadata to avoid repeated network requests
 */
const metadataCache = new Map<string, HoleMetadata>();

/**
 * Load and parse hole metadata from a URL
 */
export async function loadHoleMetadata(metaDataUrl: string): Promise<HoleMetadata> {
  // Check cache first
  if (metadataCache.has(metaDataUrl)) {
    return metadataCache.get(metaDataUrl)!;
  }

  try {
    // In development, use proxy to avoid CORS issues
    // Replace CDN domain with /cdn-proxy prefix
    const fetchUrl = metaDataUrl.replace('https://cdn.trackmangolf.com', '/cdn-proxy');
    
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.status} ${response.statusText}`);
    }

    const metadata: HoleMetadata = await response.json();

    console.log('[ProjectionUtils] Loaded metadata:', {
      width: metadata.Width,
      height: metadata.Height,
      hasProjectionMatrix: !!metadata.projectionMatrix,
      hasWorldToCameraMatrix: !!metadata.worldToCameraMatrix,
      projectionMatrixSample: metadata.projectionMatrix ? {
        m00: metadata.projectionMatrix.m00,
        m11: metadata.projectionMatrix.m11,
      } : null
    });

    // Validate required fields
    if (!metadata.projectionMatrix || !metadata.worldToCameraMatrix) {
      console.error('[ProjectionUtils] Metadata structure:', metadata);
      throw new Error('Metadata missing required projectionMatrix or worldToCameraMatrix');
    }

    // Cache the result
    metadataCache.set(metaDataUrl, metadata);
    
    return metadata;
  } catch (error) {
    console.error('[ProjectionUtils] Error loading metadata:', error);
    throw error;
  }
}

/**
 * Project a 3D world coordinate to 2D pixel coordinates
 * 
 * @param worldPos - 3D position in Unity world coordinates
 * @param metadata - Hole metadata containing camera matrices
 * @returns Pixel coordinates and normalized coordinates
 */
export function projectWorldToPixel(
  worldPos: Vector3,
  metadata: HoleMetadata
): PixelCoordinate {
  // Use default dimensions if not provided
  const width = metadata.Width ?? 1280;
  const height = metadata.Height ?? 720;

  // Create matrices
  const V = new Matrix4x4(metadata.worldToCameraMatrix);
  const P = new Matrix4x4(metadata.projectionMatrix);

  // 1. Convert world position to homogeneous coordinates [x, y, z, 1]
  const w = [worldPos[0], worldPos[1], worldPos[2], 1];

  // 2. Transform to camera space: c = V * w
  const c = V.multiplyVector4(w);

  // 3. Transform to clip space: q = P * c
  const q = P.multiplyVector4(c);

  // 4. Perspective divide to get NDC (normalized device coordinates)
  // Handle case where q[3] (w component) is zero or very small
  if (Math.abs(q[3]) < 0.0001) {
    console.warn('[ProjectionUtils] Point not projectable (w ≈ 0)');
    return {
      x: -1,
      y: -1,
      xPct: -1,
      yPct: -1,
      isVisible: false,
    };
  }

  const ndc = [q[0] / q[3], q[1] / q[3], q[2] / q[3]];

  // 5. Convert NDC [-1, 1] to pixel coordinates
  // Note: Y is flipped because image origin is top-left
  const u = (ndc[0] * 0.5 + 0.5) * width;
  const v = (1 - (ndc[1] * 0.5 + 0.5)) * height;

  // 6. Compute normalized coordinates
  const uPct = u / width;
  const vPct = v / height;

  // 7. Check if point is visible within image bounds
  const isVisible = u >= 0 && u < width && v >= 0 && v < height;

  return {
    x: Math.floor(u),
    y: Math.floor(v),
    xPct: uPct,
    yPct: vPct,
    isVisible,
  };
}

/**
 * Project multiple world positions to pixel coordinates
 */
export async function projectWorldPositions(
  positions: Vector3[],
  metaDataUrl: string
): Promise<PixelCoordinate[]> {
  const metadata = await loadHoleMetadata(metaDataUrl);
  return positions.map(pos => projectWorldToPixel(pos, metadata));
}

/**
 * Clear the metadata cache (useful for testing or memory management)
 */
export function clearMetadataCache(): void {
  metadataCache.clear();
}
