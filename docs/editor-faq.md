# TrackMan App Scripting Editor - Frequently Asked Questions

## Getting Started

### Q: How do I create my first script?
**A:** Click the "New" button in the toolbar, or press `Ctrl + N`. This creates a blank script with a start and end activity. You can then add activities by dragging them from the Activities Panel.

### Q: What file formats are supported?
**A:** The editor primarily works with JSON files (.json) for scripts. You can also import plain text files and export scripts in various formats including compressed packages.

### Q: How do I save my work?
**A:** Use `Ctrl + S` or click the "Save" button. Your script will be saved as a JSON file. Always save before testing or closing the editor.

## Script Building

### Q: How do I connect activities together?
**A:** Each activity has a "next" property that specifies which activity runs next. Set this to the ID of the target activity. For conditional activities, use "trueNext" and "falseNext" properties.

### Q: Can I reuse activities in multiple places?
**A:** Each activity must have a unique ID within a script. If you need similar functionality in multiple places, create separate activities with different IDs but the same configuration.

### Q: How do I handle user input?
**A:** Use Input activities. Set the "prompt" property to ask the user a question, and specify a "variable" name to store their response. The variable can then be used in other activities.

### Q: What's the difference between variables and properties?
**A:** Properties are configuration settings for activities (like prompt text or calculation formulas). Variables are data storage that can change during script execution and be passed between activities.

## Troubleshooting

### Q: My script won't run - what should I check?
**A:** Common issues:
1. Ensure all activities have valid "next" references
2. Check that variable names are spelled correctly
3. Verify JSON syntax is valid
4. Make sure there's a path from start to end
5. Look for circular references between activities

### Q: How do I debug a script that's not working correctly?
**A:** Use the Debug Panel to:
1. View execution logs
2. Check variable values at each step
3. See which activities are being executed
4. Identify where execution stops or fails

### Q: Why do I get "Variable not defined" errors?
**A:** This happens when you reference a variable before it's been created. Make sure:
1. Input activities that create variables run before activities that use them
2. Variable names are spelled consistently
3. The script flow reaches the variable creation activity

### Q: How do I fix circular reference errors?
**A:** This occurs when activities reference each other in a loop. Check your "next" properties to ensure there's no infinite loop. Draw out your script flow to visualize the connections.

## Advanced Features

### Q: Can I create custom activities?
**A:** Yes! Use the Custom activity type and define your own properties and behavior. You can create reusable components for common operations.

### Q: How do I handle complex data structures?
**A:** Use object and array data types. You can nest objects and arrays to create complex data structures. Access nested properties using dot notation (e.g., "user.name").

### Q: Can I include external data or APIs?
**A:** The editor supports various input sources. You can configure activities to fetch data from external sources, though specific capabilities depend on your deployment environment.

### Q: How do I optimize script performance?
**A:** Best practices:
1. Minimize the number of activities in loops
2. Use efficient data structures
3. Cache frequently accessed values
4. Avoid deep nesting of conditions
5. Test with realistic data volumes

## File Management

### Q: How do I share scripts with other users?
**A:** Scripts are saved as JSON files that can be easily shared. You can:
1. Export scripts using the Download button
2. Share the JSON file directly
3. Use version control systems for team collaboration
4. Create script packages with multiple related scripts

### Q: Can I import scripts from other systems?
**A:** If the scripts are in JSON format with compatible structure, yes. You may need to adjust activity types and properties to match the editor's schema.

### Q: How do I backup my scripts?
**A:** Regularly download your scripts as JSON files and store them securely. Consider using cloud storage or version control systems for automatic backups.

### Q: What happens if I lose my work?
**A:** If you haven't saved your script, changes may be lost when closing the editor. Always save frequently. Some browsers may retain unsaved changes temporarily, but this isn't guaranteed.

## UI and Customization

### Q: Can I customize the editor interface?
**A:** Yes! Use the Settings panel to:
1. Adjust theme and colors
2. Configure panel layouts
3. Set default properties for activities
4. Customize keyboard shortcuts
5. Configure auto-save settings

### Q: How do I resize panels?
**A:** Click and drag the borders between panels to resize them. Double-click borders to auto-fit content.

### Q: Can I hide panels I don't use?
**A:** Yes, most panels can be collapsed or hidden through the View menu or panel controls. Customize your workspace for maximum efficiency.

### Q: How do I reset the interface to default?
**A:** Go to Settings > Reset Layout, or clear your browser's local storage for the editor domain.

## Integration and Deployment

### Q: How do I run scripts outside the editor?
**A:** Scripts created in the editor are JSON files that can be executed by any compatible runtime. Check your deployment documentation for specific runtime requirements.

### Q: Can I integrate the editor into my own application?
**A:** The editor is designed to be embeddable. Refer to the integration documentation for API details and embedding instructions.

### Q: How do I handle different environments (dev, test, prod)?
**A:** Use variables and configuration activities to make scripts environment-agnostic. Set environment-specific values through external configuration rather than hardcoding them in scripts.

## Getting Help

### Q: Where can I find more detailed documentation?
**A:** Check the other documentation sections:
- User Guide for comprehensive tutorials
- Quick Reference for syntax and shortcuts  
- Troubleshooting Guide for common issues
- Walkthrough for step-by-step examples

### Q: How do I report bugs or request features?
**A:** Contact your system administrator or development team with detailed descriptions of issues or enhancement requests.

### Q: Are there video tutorials available?
**A:** Check with your organization for training materials and video tutorials specific to your deployment and use cases.