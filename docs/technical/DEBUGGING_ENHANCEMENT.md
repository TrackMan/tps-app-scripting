# Cloud Deployment Debugging Enhancement

## Summary
Enhanced the app-scripting editor with comprehensive debugging tools to help diagnose the authentication issue between local and cloud environments.

## Changes Made

### 1. Environment Debug Component (`EnvironmentDebug.tsx`)
- **Purpose**: Provides a collapsible debug panel showing environment configuration
- **Location**: Added to main App component, appears at the top when needed
- **Features**:
  - Shows all relevant environment variables (VITE_BACKEND_BASE_URL, VITE_LOGIN_BASE_URL, etc.)
  - Displays computed URLs for GraphQL and OAuth endpoints
  - Warns when critical environment variables are missing
  - Only shows in development or when there are configuration issues

### 2. Debug Utilities (`utils/debugUtils.ts`)
- **Purpose**: Centralized debugging functions for authentication troubleshooting
- **Functions**:
  - `logEnvironmentInfo()`: Logs comprehensive environment information to console
  - `logNetworkRequest()`: Logs network request details with truncated auth tokens
  - `logAuthError()`: Logs detailed authentication error information

### 3. Enhanced Error Handling in FacilityDropdown
- **Purpose**: Better error diagnostics for the failing facilities query
- **Features**:
  - Automatic environment logging when auth errors occur
  - Enhanced error display with debug information panel
  - Detailed troubleshooting guidance for users

### 4. Updated CSS Styles
- **Purpose**: Clean, professional styling for debug components
- **Features**:
  - Collapsible debug panels with proper visual hierarchy
  - Color-coded status indicators (green for OK, red for missing)
  - Monospace font for technical information
  - Warning panels for missing configuration

## How to Use for Debugging

### Local Testing
1. The EnvironmentDebug component will show automatically if environment variables are missing
2. Check browser console for detailed auth error logs when facility loading fails
3. All debug information is logged automatically in development mode

### Cloud Deployment Diagnosis
1. Deploy these changes to the cloud environment
2. Visit the cloud URL: https://app-scripting-editor.trackmangolfdev.com/
3. Open browser developer tools and check the console
4. Look for the environment debug information when the facilities query fails
5. Compare the logged environment variables between local and cloud

### Expected Debug Output
When the facilities query fails in cloud, you should see:
- Complete environment variable dump
- GraphQL error details with response codes
- Authentication token information (truncated for security)
- Browser and network information
- Local storage authentication state

## Next Steps
1. Deploy to cloud and capture the debug output
2. Compare environment variables between local and cloud
3. Verify OAuth token acquisition and validation differences
4. Check for network/firewall issues blocking authentication requests
5. Ensure all environment variables are properly set in cloud deployment

## Files Modified
- `editor/src/components/EnvironmentDebug.tsx` (new)
- `editor/src/utils/debugUtils.ts` (new)
- `editor/src/App.tsx` (added EnvironmentDebug component)
- `editor/src/components/FacilityDropdown.tsx` (enhanced error logging)
- `editor/src/treeview.css` (added debug component styles)

The application builds successfully and maintains all existing functionality while providing comprehensive debugging capabilities.