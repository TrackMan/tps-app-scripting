# Hole Image Display Feature

## Overview

Added visual hole layout image to the CourseInfoBanner component. When viewing events from a course play activity, the banner now displays the hole layout image below the course information and progress section.

## Implementation

### Data Source

Course information is fetched via GraphQL using the `GET_COURSE_INFORMATION` query which includes:

```graphql
query GetCourseInformation($courseId: ID!) {
  node(id: $courseId) {
    ... on Course {
      displayName
      difficulty
      description 
      holes {
        holeNumber
        images {
          url
          metaDataUrl
        }
      }
    }
  }
}
```

Each hole can have multiple images with:
- `url` - Direct image URL
- `metaDataUrl` - Optional metadata URL

### Component Changes

#### CourseInfoBanner.tsx

Added a new section at the bottom of the banner:

```tsx
{/* Display hole image if available */}
{eventHole !== undefined && courseInfo?.holes && (
  <div className="hole-image-container">
    {(() => {
      // Find the hole matching the current event's hole number
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
```

**Key Features**:
1. **Conditional Display**: Only shows when `eventHole` is available and course has hole data
2. **Hole Matching**: Finds the hole by matching `holeNumber` with `eventHole`
3. **First Image**: Uses the first image in the `images` array
4. **Error Handling**: Hides image if URL fails to load (broken link, CORS, etc.)
5. **Accessibility**: Includes descriptive `alt` text

### Styling

#### CourseInfoBanner.css

Added styles for the image container and image:

```css
/* Hole Image Styles */
.hole-image-container {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hole-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  object-fit: contain;
  background: white;
  padding: 4px;
}
```

**Design Choices**:
- **Separator**: Subtle top border separates image from text content
- **Centering**: Image is centered horizontally
- **Max Height**: 300px prevents overly large images
- **Responsive**: `max-width: 100%` ensures it fits on smaller screens
- **Object Fit**: `contain` preserves aspect ratio without cropping
- **White Background**: Provides clean frame for the image
- **Shadow**: Adds depth and visual separation from banner background

## Visual Layout

```
┌─────────────────────────────────────────────────────┐
│ ️  Adare Manor                                     │
│     Difficulty: 4                                   │
│     The Golf Course at Adare Manor...              │
│     18 holes                                        │
│     ───────────────────────────────────────        │
│     Hole 1 • Shot 1 • Player 1                     │
│     ───────────────────────────────────────        │
│     [   Hole 1 Layout Image Display   ]           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Data Flow

1. **Session Info Event** received
   - `useActivitySessionState` detects Course activity
   - Calls `FIND_COURSE_ID` GraphQL query
   - Calls `GET_COURSE_INFORMATION` with course ID
   - Stores course data including holes in session state

2. **ChangePlayer Event** received
   - Sets `eventHole` to `ActiveHole` from event
   - Carried forward to subsequent events

3. **Banner Render**
   - Gets `courseInfo` from session state
   - Gets `eventHole` from event or carry-forward
   - Finds matching hole in `courseInfo.holes`
   - Displays first image if available

## Error Handling

### Missing Data Scenarios

1. **No event hole**: Image section doesn't render
2. **No course info**: Image section doesn't render
3. **No holes data**: Image section doesn't render
4. **Hole not found**: Returns `null`, no error thrown
5. **No images for hole**: Returns `null`, graceful degradation
6. **Image load failure**: `onError` hides the image element

### Network Issues

- **Broken URL**: Image disappears via `onError` handler
- **CORS errors**: Image disappears via `onError` handler
- **Slow loading**: Browser handles loading state
- **No visual error**: Prevents broken image icon from showing

## Testing

To test the feature:

1. **Prerequisites**:
   - Course play activity with valid course data
   - Course must have hole images configured
   - ActivitySession events must include ChangePlayer

2. **Test Steps**:
   ```
   1. Start course play activity on simulator
   2. View webhook events in inspector
   3. Click on any event from the session
   4. Verify banner shows:
      - Course name and info
      - Current hole and shot number
      - Hole layout image at bottom
   ```

3. **Expected Results**:
   - Image appears below progress section
   - Image is centered and properly sized
   - Image has white frame and shadow
   - Different holes show different images

4. **Edge Cases to Test**:
   - Events before first ChangePlayer (no hole image)
   - Course with missing hole images (graceful degradation)
   - Different holes (image changes correctly)
   - Browser resize (image remains responsive)

## Future Enhancements

Potential improvements:

1. **Multiple Images**: Show image carousel if hole has multiple images
2. **Metadata**: Display additional info from `metaDataUrl`
3. **Zoom**: Click image to view full-size
4. **Loading State**: Show skeleton/spinner while image loads
5. **Caching**: Cache images to improve performance
6. **Lazy Loading**: Only load image when banner is visible
7. **Image Selection**: Let user choose which image to display (overhead, green view, etc.)

## Files Modified

### Frontend Components
-  `src/components/CourseInfoBanner.tsx` - Added hole image display logic
-  `src/components/CourseInfoBanner.css` - Added image styling

### GraphQL Queries
- ℹ️ `src/graphql/queries.ts` - No changes (already includes hole images in `GET_COURSE_INFORMATION`)

### State Management
- ℹ️ `src/hooks/useActivitySessionState.ts` - No changes (already fetches and stores course info)

## Related Documentation

- [Activity Session State](./ACTIVITY_SESSION_STATE.md) - How course info is fetched and stored
- [Shot Number Carry-Forward Fix](./SHOT_NUMBER_CARRY_FORWARD_FIX.md) - How hole number is determined
- GraphQL schema - Course and Hole type definitions

## Performance Considerations

### Image Loading
- Images are loaded on-demand when banner renders
- Browser handles caching automatically
- No lazy loading implemented (images load immediately)

### Memory
- Images are not stored in state
- React re-renders are minimal (only when event changes)
- Error handling prevents memory leaks from failed loads

### Network
- One image request per hole per session
- Images may be large (course layouts)
- Consider implementing lazy loading for large galleries

## Accessibility

-  **Alt Text**: Descriptive alt text includes hole number
-  **Semantic HTML**: Uses standard `<img>` element
-  **Responsive**: Works on all screen sizes
- ️ **Screen Readers**: Consider adding more context
- ️ **Keyboard Navigation**: Image is not interactive (good for display)

## Browser Compatibility

-  Modern browsers (Chrome, Firefox, Safari, Edge)
-  CSS features (flexbox, border-radius, box-shadow)
-  Error handling via `onError` event
-  Object-fit support (IE11 may need polyfill)

---

**Added**: October 3, 2025
**Purpose**: Enhance visual context for course play events
**Impact**: Better user understanding of current hole layout
