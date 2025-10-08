/**
 * Color palette for session/activity indicators
 */
export const SESSION_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#84cc16', // lime
  '#6366f1', // indigo
];

/**
 * Get a color for a given ID from the color map.
 * If the ID doesn't have a color assigned, assigns one based on the map size.
 */
export function getColorForId(id: string | undefined, colorMap: Map<string, string>): string | null {
  if (!id) return null;
  
  if (!colorMap.has(id)) {
    // Assign a color based on the current size of the map
    const colorIndex = colorMap.size % SESSION_COLORS.length;
    colorMap.set(id, SESSION_COLORS[colorIndex]);
  }
  
  return colorMap.get(id) || null;
}
