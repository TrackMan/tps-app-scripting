# Troubleshooting Guide - Common Issues and Solutions

##  Overview

This guide helps you diagnose and fix common issues when using the TrackMan App Scripting Editor. Find quick solutions to validation errors, facility connection problems, UI configuration issues, and more.

---

##  Quick Problem Identification

### Error Types and Visual Indicators

| Indicator | Problem Type | Urgency | Next Action |
|-----------|--------------|---------|-------------|
|  **Red X** | Validation errors | High | Must fix before use |
| ️ **Yellow Warning** | Warnings/suggestions | Medium | Should fix for best experience |
|  **Green Check** | All good | None | Ready to use |
|  **Loading Spinner** | Network/processing | Wait | May indicate connection issues |
|  **Connection Error** | Network failure | High | Check internet/authentication |

---

##  Validation Errors

### Common Validation Issues

#### Missing Required Fields
```
Error: "Activity name is required"
Location: Activity properties panel
```
**Solution**:
1. Select the problematic activity in the tree
2. Enter a descriptive name in the "Name" field
3. Save and re-validate

```
Error: "Step must have intro message"
Location: Step properties panel
```
**Solution**:
1. Select the step with the error
2. Add clear instructions in the "Intro Message" field
3. Explain what the user should do

#### Invalid Logic Configuration
```
Error: "Success condition requires at least 1 shot"
Location: Step logic configuration
```
**Solution**:
1. Open the Logic section for the problematic step
2. Set "Shots Required" to a reasonable number (typically 5-10)
3. Ensure conditions are achievable

```
Error: "Failure condition cannot be less than success condition"
Location: Step logic configuration  
```
**Solution**:
1. Check your success condition (e.g., 8 shots required)
2. Set failure condition higher (e.g., max 15 attempts)
3. Ensure logical progression

#### UI Configuration Errors
```
Error: "UI configuration requires at least one parameter"
Location: UI Configuration section
```
**Solution**:
1. Open UI Configuration for the step
2. Select at least one relevant parameter
3. Choose parameters appropriate for your training goal

### Step-by-Step Validation Fixing

1. **Identify the Error**
   - Look for red  indicators in the tree
   - Click on validation messages to jump to problems
   - Note the specific error message

2. **Locate the Problem**
   - Click on the problematic item in the tree
   - Find the relevant section in the details panel
   - Look for empty required fields or invalid values

3. **Apply the Fix**
   - Fill in missing information
   - Correct invalid configurations
   - Use examples as reference if needed

4. **Re-validate**
   - Save your changes
   - Check for green  validation status
   - Address any remaining issues

![Validation Process](screenshots/validation-process.png)
*Step-by-step validation error resolution*

---

##  Facility Connection Issues

### Authentication Problems

#### "Not authorized to access this resource"
```
Symptoms:
- Facility dropdown shows error
- Cannot load facility list
- Authentication warnings in console
```

**Troubleshooting Steps**:
1. **Check Login Status**
   - Ensure you're logged in to TrackMan services
   - Look for login prompts or expired session warnings
   - Try refreshing the page and logging in again

2. **Verify Environment Configuration**
   - Open browser developer tools (F12)
   - Check the Environment Debug panel (if enabled)
   - Verify VITE_BACKEND_BASE_URL and VITE_LOGIN_BASE_URL

3. **Network Diagnostics**
   - Check internet connection
   - Verify no firewall blocking TrackMan services
   - Try accessing other TrackMan services to confirm connectivity

4. **Clear Browser Data**
   - Clear cache and cookies for the editor domain
   - Restart browser and try again
   - Use incognito/private mode to test

![Connection Troubleshooting](screenshots/connection-debug.png)
*Using debug tools to diagnose connection issues*

#### Facility List Not Loading
```
Symptoms:
- Dropdown shows "Loading..." indefinitely
- No facilities appear in list
- Console errors about GraphQL queries
```

**Solutions**:
1. **Refresh the Connection**
   - Click the facility dropdown again
   - Refresh the browser page
   - Wait for network timeout and retry

2. **Check Permissions**
   - Verify you have access to TrackMan facilities
   - Contact your TrackMan administrator
   - Ensure your account has appropriate permissions

3. **Environment Issues**
   - Compare working local vs. failing cloud environment
   - Check if environment variables match exactly
   - Verify API endpoints are accessible

### Network Connection Problems

#### Intermittent Connectivity
```
Symptoms:
- Sometimes works, sometimes doesn't
- Random disconnections
- Incomplete data loading
```

**Solutions**:
1. **Check Network Stability**
   - Test other web services for stability
   - Consider network quality and bandwidth
   - Try different network connection if available

2. **Browser-Specific Issues**
   - Try different browser (Chrome, Firefox, Edge)
   - Disable browser extensions temporarily
   - Check if corporate firewall affects specific browsers

---

##  UI Configuration Issues

### Parameter Display Problems

#### Parameters Not Showing
```
Problem: Selected parameters don't appear in UI
Possible Causes:
- Parameters not saved properly
- Conflicting UI configuration
- Script not reloaded after changes
```

**Solution Steps**:
1. **Verify Selection**
   - Re-open UI Configuration section
   - Confirm parameters are checked
   - Save script and reload

2. **Check Step Type**
   - Ensure step type matches parameter type
   - Range Analysis parameters only work with Range Analysis steps
   - Performance Center parameters only work with Performance Center steps

3. **Clear Browser Cache**
   - Force refresh (Ctrl+F5 or Cmd+Shift+R)
   - Clear browser cache for the editor
   - Restart browser if necessary

#### Frame Actions Not Working
```
Problem: Custom buttons don't appear or function
Symptoms:
- Buttons missing from interface
- Buttons present but non-functional
- Incorrect button behavior
```

**Troubleshooting**:
1. **Check Frame Action Configuration**
   - Verify button text is set
   - Confirm action type is selected
   - Review visibility conditions

2. **Test Conditions**
   - Ensure trigger conditions are met
   - Check if success/failure states affect visibility
   - Verify no conflicting conditions

3. **Browser Console Check**
   - Open developer tools (F12)
   - Look for JavaScript errors
   - Note any frame action related errors

### Layout and Display Issues

#### UI Elements Overlapping
```
Problem: Parameters or buttons overlap or are cut off
Common Causes:
- Too many parameters selected
- Screen resolution issues
- Browser zoom level
```

**Solutions**:
1. **Reduce Parameter Count**
   - Select fewer parameters (4-6 maximum recommended)
   - Use progressive disclosure for complex training
   - Group related parameters together

2. **Check Display Settings**
   - Reset browser zoom to 100%
   - Try different screen resolution if possible
   - Test on target TrackMan hardware

#### Poor Readability
```
Problem: Text too small, colors hard to see, poor contrast
```

**Solutions**:
1. **Simplify Display**
   - Reduce number of displayed parameters
   - Use larger, clearer fonts
   - Increase contrast between text and background

2. **Test in Real Environment**
   - Check visibility from hitting position
   - Consider lighting conditions in facility
   - Test with actual TrackMan system display

---

##  Import/Export Problems

### Script Loading Issues

#### Invalid JSON Format
```
Error: "Failed to parse script file"
Symptoms:
- Script won't load
- JSON parsing errors
- Corrupted file messages
```

**Solutions**:
1. **Validate JSON Format**
   - Use online JSON validator to check file
   - Look for missing commas, brackets, or quotes
   - Compare with working example files

2. **Re-export from Source**
   - If possible, re-export from original editor
   - Check if file was corrupted during transfer
   - Try copying and pasting script content

3. **Manual Repair**
   - Open file in text editor
   - Look for obvious syntax errors
   - Fix formatting issues carefully

#### Schema Version Mismatch
```
Error: "Script schema version not supported"
Symptoms:
- Script loads but shows validation errors
- Features not working as expected
- Compatibility warnings
```

**Solutions**:
1. **Check Schema Version**
   - Look at script file header for version info
   - Compare with editor's supported versions
   - Update script format if necessary

2. **Migration Path**
   - Export data from problematic script
   - Create new script in current editor
   - Manually transfer activities and steps

### Export Problems

#### Missing Script Data
```
Problem: Exported script missing activities or steps
Symptoms:
- Incomplete script export
- Missing configuration data
- Partial activity exports
```

**Solutions**:
1. **Validation First**
   - Ensure script validates completely before export
   - Fix all validation errors
   - Confirm all required fields are filled

2. **Step-by-Step Export**
   - Save script frequently during creation
   - Export after each major change
   - Keep backup copies of working versions

---

##  Performance Issues

### Slow Loading

#### Editor Takes Long to Load
```
Symptoms:
- Page loads slowly
- Long delays when switching between sections
- Timeouts during facility loading
```

**Solutions**:
1. **Network Optimization**
   - Check internet connection speed
   - Try during off-peak hours
   - Consider connection quality

2. **Browser Optimization**
   - Close unnecessary browser tabs
   - Clear browser cache and cookies
   - Update to latest browser version
   - Disable unnecessary extensions

3. **System Resources**
   - Close other applications
   - Ensure adequate system memory
   - Check if antivirus is interfering

#### Large Script Performance
```
Problem: Editor becomes slow with complex scripts
Symptoms:
- Lag when editing large scripts
- Slow tree navigation
- Delayed validation
```

**Solutions**:
1. **Script Optimization**
   - Break large scripts into smaller modules
   - Reduce number of activities/steps per script
   - Simplify complex logic conditions

2. **Browser Performance**
   - Use Chrome or Edge for better performance
   - Increase browser memory if possible
   - Close other tabs and applications

---

##  Testing and Debugging

### Debug Tools and Techniques

#### Browser Developer Tools
1. **Open Developer Tools** (F12)
2. **Console Tab**: Check for JavaScript errors
3. **Network Tab**: Monitor API calls and responses
4. **Application Tab**: Check local storage and cookies

#### Environment Debug Panel
If available, use the Environment Debug component:
1. **Check Environment Variables**: Verify all required settings
2. **Review Computed URLs**: Ensure API endpoints are correct
3. **Monitor Authentication**: Check token status and validity

#### Step-by-Step Debugging Process
1. **Identify Symptoms**: What exactly isn't working?
2. **Check Console**: Look for error messages
3. **Test Isolation**: Try with minimal script to isolate issue
4. **Compare Working Examples**: Use example files as reference
5. **Systematic Testing**: Change one thing at a time

### Common Debug Scenarios

#### "It worked yesterday, now it doesn't"
**Possible Causes**:
- Session expired (re-login required)
- Network/server issues (temporary)
- Browser cache issues (clear cache)
- Changes to facility permissions (contact admin)

**Debug Steps**:
1. Try hard refresh (Ctrl+F5)
2. Clear browser cache and cookies
3. Test in incognito/private mode
4. Try different browser
5. Check if issue affects other users

#### "It works on my computer but not others"
**Possible Causes**:
- Browser differences (version, settings, extensions)
- Network environment differences (firewall, proxy)
- Authentication/permission differences
- Local vs. cloud environment differences

**Debug Steps**:
1. Compare browser versions and settings
2. Test same script on problem computer
3. Check network and authentication settings
4. Verify user permissions match

---

## 🆘 Getting Additional Help

### Before Contacting Support

Gather this information:
- **Script file** (if possible)
- **Exact error messages** (screenshots helpful)
- **Browser and version** (e.g., Chrome 91.0.4472.124)
- **Operating system** (Windows 10, macOS, etc.)
- **Steps to reproduce** the problem
- **Network environment** (corporate, home, etc.)

### Self-Help Resources

1. **Example Files**: Load and study `ui-demo.json` and `pc-ui-demo.json`
2. **Schema Documentation**: Review technical specifications
3. **Browser Console**: Check for detailed error information
4. **Network Tools**: Use browser network tab to diagnose connection issues

### Escalation Path

1. **Check Documentation**: Review relevant guides first
2. **Try Simple Solutions**: Clear cache, restart browser, re-login
3. **Test with Examples**: Verify basic functionality works
4. **Collect Debug Information**: Gather error details and context
5. **Contact TrackMan Support**: Provide complete problem description

---

##  Prevention and Best Practices

### Avoiding Common Issues

#### Development Best Practices
- **Save frequently** during script creation
- **Validate regularly** as you build
- **Test with real users** before deployment
- **Keep backup copies** of working scripts
- **Use descriptive names** for activities and steps

#### Deployment Best Practices
- **Test in target environment** before rollout
- **Verify facility permissions** for all users
- **Provide user training** on new features
- **Monitor initial usage** for unexpected issues
- **Plan rollback strategy** if problems occur

#### Maintenance Best Practices
- **Regular script reviews** for outdated content
- **Update based on user feedback** 
- **Monitor performance metrics** 
- **Keep documentation current**
- **Plan periodic updates** to maintain engagement

---

##  Issue Resolution Workflow

### Standard Troubleshooting Process

```
1. Identify Problem
   ├── Read error message carefully
   ├── Note when/where it occurs
   └── Check if it's reproducible

2. Quick Fixes
   ├── Hard refresh page (Ctrl+F5)
   ├── Clear browser cache
   ├── Try incognito mode
   └── Check network connection

3. Systematic Diagnosis  
   ├── Open browser developer tools
   ├── Check console for errors
   ├── Review network requests
   └── Test with minimal example

4. Apply Solution
   ├── Fix identified issues
   ├── Test fix works
   ├── Document solution
   └── Share with team if relevant

5. Prevent Recurrence
   ├── Update documentation
   ├── Improve error handling
   ├── Train users on prevention
   └── Monitor for similar issues
```

---

**Remember**: Most issues have simple solutions. Start with the basics (refresh, clear cache, re-login) before diving into complex debugging. When in doubt, test with the provided example files to verify basic functionality.

For specific feature documentation, see the [User Guide](user-guide.md) or [UI Configuration Guide](ui-configuration.md).