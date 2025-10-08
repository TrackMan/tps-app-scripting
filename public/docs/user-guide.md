# TrackMan App Scripting Editor - User Guide

## Overview

The TrackMan App Scripting Editor is a powerful visual tool for creating, editing, and managing interactive scripts for TrackMan simulators. These scripts can guide users through training scenarios, challenges, assessments, and skill-building exercises.

![Editor Interface](screenshots/editor-overview.png)
*The main editor interface showing the script tree, details panel, and validation system*

## Key Features

- **Visual Script Builder**: Drag-and-drop interface for creating complex training scripts
- **Real-time Validation**: Instant feedback on script structure and content
- **UI Configuration**: Visual editor for custom user interfaces
- **Facility Integration**: Direct connection to TrackMan facilities and bays
- **Import/Export**: Load existing scripts and export completed ones
- **Live Preview**: See your script structure as you build

---

## Getting Started

### 1. Accessing the Editor

Navigate to the TrackMan App Scripting Editor in your web browser. The interface consists of three main areas:

- **Left Panel**: Script tree and navigation
- **Right Panel**: Property editor and configuration
- **Top Bar**: Facility selection, import/export, and validation status

### 2. Facility Selection

Before creating scripts, select your target facility:

1. Click the facility dropdown in the top bar
2. Choose your TrackMan facility from the list
3. Select the specific location and bay if required

![Facility Selection](screenshots/facility-selection.png)
*Selecting a facility, location, and bay for your script*

### 3. Creating Your First Script

Every script starts with basic configuration:

1. Click on "Script" in the tree view
2. Configure basic script properties in the right panel
3. Add your first activity by clicking the "Add Activity" button

---

## Building Scripts

### Script Structure

TrackMan scripts follow a hierarchical structure:

```
Script
├── Activity 1 (e.g., "Warm-up")
│   ├── Step 1 (e.g., "Tee shots")
│   ├── Step 2 (e.g., "Approach shots")
│   └── Step 3 (e.g., "Putting")
├── Activity 2 (e.g., "Skill Challenge")
│   ├── Step 1 (e.g., "Accuracy test")
│   └── Step 2 (e.g., "Distance control")
└── Activity 3 (e.g., "Assessment")
    └── Step 1 (e.g., "Final evaluation")
```

### Creating Activities

Activities are top-level containers that group related training steps:

1. **Add Activity**: Click the " Add Activity" button
2. **Choose Type**: Select between Range Analysis or Performance Center
3. **Configure Properties**:
   - **Name**: Descriptive title for the activity
   - **Intro Message**: Welcome text shown to users
   - **End Message**: Completion text and next steps

![Activity Creation](screenshots/activity-creation.png)
*Creating a new Range Analysis Activity with intro and end messages*

### Adding Steps

Steps are individual training tasks within an activity:

1. **Select Activity**: Click on an activity in the tree
2. **Add Step**: Click " Add Step" button
3. **Configure Step Properties**:
   - **Name**: Clear, actionable title
   - **Intro Message**: Instructions for the user
   - **Logic**: Success/failure conditions and scoring

![Step Configuration](screenshots/step-configuration.png)
*Configuring a step with logic conditions and success criteria*

### Step Types

#### Range Analysis Steps
Perfect for technical analysis and swing improvement:
- **Swing Analysis**: Focus on swing mechanics
- **Ball Flight Analysis**: Analyze trajectory and spin
- **Distance Training**: Work on consistent distances
- **Accuracy Challenges**: Target-based training

#### Performance Center Steps
Ideal for game-like scenarios and skill challenges:
- **Tee Shot Training**: Driver and fairway wood practice
- **Approach Play**: Iron shots to targets
- **Short Game**: Chipping and pitching
- **Putting Challenges**: Green reading and distance control

---

## User Interface Configuration

### UI Editor Overview

The new UI Editor allows you to create custom interfaces for your scripts, providing users with interactive controls and visual feedback.

![UI Editor](screenshots/ui-editor.png)
*The UI Editor showing parameter selection and frame actions*

### Configuring UI Elements

1. **Select a Step**: Choose a Range Analysis or Performance Center step
2. **Open UI Editor**: Click the "UI Configuration" section
3. **Select Parameters**: Choose which shot parameters to display
4. **Configure Frame Actions**: Set up custom buttons and interactions

### Available Parameters

#### Range Analysis UI Parameters
- **Ball Speed**: Initial velocity of the ball
- **Launch Angle**: Vertical angle at impact
- **Spin Rate**: Backspin or sidespin measurements
- **Carry Distance**: Distance ball travels in air
- **Club Speed**: Velocity of the club at impact
- **Smash Factor**: Efficiency of energy transfer

#### Performance Center UI Parameters
- **Distance to Target**: How far from the intended target
- **Shot Accuracy**: Precision measurement
- **Trajectory Height**: Ball flight characteristics
- **Landing Angle**: Angle at which ball hits the ground

### Frame Actions

Frame actions are custom buttons that appear in the user interface:

1. **Add Frame Action**: Click "Add Frame Action" in the UI Editor
2. **Configure Action**:
   - **Text**: Button label (e.g., "Next Shot", "Analyze")
   - **Action Type**: Choose from available action types
   - **Conditions**: When the button should be enabled

![Frame Actions](screenshots/frame-actions.png)
*Configuring custom frame actions with conditions and labels*

---

## Import and Export

### Loading Existing Scripts

To load a previously created script:

1. **Click Import**: Use the " Load Script" button in the top bar
2. **Select File**: Choose a `.json` script file from your computer
3. **Review Structure**: The script will load in the tree view
4. **Validate**: Check for any validation errors in the right panel

![Script Import](screenshots/script-import.png)
*Loading an existing script file with validation feedback*

### Exporting Scripts

To save your completed script:

1. **Validate First**: Ensure your script has no validation errors
2. **Click Export**: Use the " Download Script" button
3. **Choose Location**: Save the `.json` file to your desired location
4. **Test Script**: Load the exported file to verify it works correctly

### Script Validation

The editor provides real-time validation:

- ** Green Checkmark**: Script is valid and ready to use
- ** Red X**: Script has errors that need fixing
- **️ Yellow Warning**: Script has warnings but can still be used

Click on validation messages to jump directly to the problematic area.

---

## Advanced Features

### Message Configuration

Messages provide context and guidance to users:

#### Intro Messages
- Displayed when an activity or step begins
- Should explain the goal and provide clear instructions
- Can include motivational content

#### End Messages
- Shown upon completion of an activity or step
- Provide feedback and next steps
- Can include performance summaries

### Logic Configuration

Define success and failure conditions for each step:

#### Success Conditions
- **Shot Count**: Minimum shots required
- **Accuracy Targets**: Required precision levels
- **Performance Metrics**: Speed, distance, or angle requirements

#### Failure Conditions
- **Maximum Attempts**: When to stop trying
- **Poor Performance**: Thresholds for inadequate results
- **Time Limits**: Maximum duration allowed

### Retry and Skip Options

Configure how users can interact with challenging steps:

- **Can Retry**: Allow users to attempt the step again
- **Skip on Success**: Automatically move to next step when completed
- **Manual Progression**: Require explicit user action to continue

---

## Examples and Templates

### Example Scripts

The editor includes several example scripts to help you get started:

#### Range Analysis Demo (`ui-demo.json`)
- **Focus**: Technical swing analysis
- **Features**: Multiple parameters, custom UI elements
- **Use Case**: Golf instruction and improvement

#### Performance Center Demo (`pc-ui-demo.json`)
- **Focus**: Game-like challenges and skills
- **Features**: Target-based training, performance metrics
- **Use Case**: Competitive training and assessment

### Loading Examples

1. Navigate to the `examples/` folder in your installation
2. Use the "Load Script" function to import example files
3. Explore the structure and configuration
4. Modify examples to create your own scripts

---

## Troubleshooting

### Common Issues

#### Validation Errors
- **Missing Required Fields**: Ensure all activities and steps have names
- **Invalid Logic**: Check that success/failure conditions are properly configured
- **Message Formatting**: Verify that intro and end messages are properly structured

#### Facility Connection Issues
- **Authentication Problems**: Ensure you're logged into TrackMan services
- **Network Issues**: Check your internet connection
- **Facility Access**: Verify you have permission to access the selected facility

#### UI Configuration Problems
- **Parameter Selection**: Ensure at least one parameter is selected for UI display
- **Frame Action Conflicts**: Check that frame actions don't have conflicting conditions
- **Missing Dependencies**: Verify all required UI elements are configured

### Getting Help

If you encounter issues:

1. **Check Validation Messages**: Look for specific error descriptions
2. **Review Examples**: Compare your script to working examples
3. **Console Debugging**: Open browser developer tools for detailed error information
4. **Contact Support**: Reach out to TrackMan technical support with specific error messages

---

## Best Practices

### Script Design

1. **Start Simple**: Begin with basic activities and add complexity gradually
2. **Clear Instructions**: Write clear, actionable messages for users
3. **Logical Progression**: Arrange activities and steps in a meaningful sequence
4. **Test Thoroughly**: Load and validate your scripts before deployment

### User Experience

1. **Provide Context**: Always explain what users should do and why
2. **Set Expectations**: Clearly communicate success criteria
3. **Offer Flexibility**: Allow retries and provide alternative paths
4. **Give Feedback**: Use end messages to acknowledge progress and provide guidance

### Performance

1. **Optimize Parameters**: Only display parameters that add value
2. **Minimize Complexity**: Keep UI elements focused and uncluttered
3. **Test on Device**: Verify your scripts work well on actual TrackMan systems
4. **Regular Updates**: Keep scripts current with facility capabilities

---

## API Reference

For advanced users working with the script format directly, see the [Schema Documentation](schema-reference.md) for detailed technical specifications.

## Version History

- **v1.0.0**: Initial release with Range Analysis and Performance Center support
- **v1.1.0**: Added UI Editor and custom interface configuration
- **v1.2.0**: Enhanced validation and debugging tools