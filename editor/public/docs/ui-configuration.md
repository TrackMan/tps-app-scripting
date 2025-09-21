# UI Configuration Guide - Custom Interfaces

## 🎨 Overview

The UI Configuration feature allows you to create custom user interfaces for your TrackMan scripts. This powerful tool lets you control exactly what parameters users see, how they interact with the data, and what actions they can take during training.

![UI Editor Overview](screenshots/ui-editor-overview.png)
*The UI Configuration panel showing parameter selection and frame actions*

---

## 🚀 Getting Started with UI Configuration

### When to Use UI Configuration

- **Range Analysis Scripts**: Display technical parameters like ball speed, launch angle, spin rate
- **Performance Center Scripts**: Show game-focused metrics like distance to target, accuracy
- **Custom Training**: Create specialized interfaces for specific training goals
- **User Experience**: Simplify complex data for different skill levels

### Accessing the UI Editor

1. **Select a Range Analysis or Performance Center step**
2. **Look for the "UI Configuration" section** in the details panel
3. **Click to expand** and start customizing your interface

---

## 📊 Range Analysis UI Configuration

### Available Parameters

The Range Analysis UI offers comprehensive shot analysis parameters:

| Parameter | Description | Best For | Skill Level |
|-----------|-------------|----------|-------------|
| **Ball Speed** | Initial velocity of the ball | All training types | Beginner+ |
| **Club Speed** | Velocity of club at impact | Swing mechanics | Beginner+ |
| **Smash Factor** | Efficiency ratio (ball/club speed) | Contact quality | Intermediate+ |
| **Launch Angle** | Vertical angle at impact | Ball flight optimization | Intermediate+ |
| **Spin Rate** | Backspin or sidespin RPM | Advanced ball flight | Advanced |
| **Carry Distance** | Distance ball travels in air | Distance training | All levels |
| **Total Distance** | Carry + roll distance | Real-world application | All levels |
| **Attack Angle** | Club path at impact | Technical analysis | Advanced |
| **Club Path** | Direction of club through impact | Swing plane work | Advanced |
| **Face Angle** | Clubface position at impact | Direction control | Advanced |

### Configuration Examples

#### Beginner-Friendly Setup
```
Selected Parameters:
✅ Ball Speed
✅ Club Speed  
✅ Carry Distance
✅ Smash Factor

Goal: Focus on basic contact quality and distance
```
![Beginner UI](screenshots/ui-beginner-range.png)
*Simple interface showing essential parameters*

#### Advanced Technical Analysis
```
Selected Parameters:
✅ Ball Speed
✅ Club Speed
✅ Launch Angle
✅ Spin Rate
✅ Attack Angle
✅ Club Path
✅ Face Angle
✅ Smash Factor

Goal: Complete swing analysis and optimization
```
![Advanced UI](screenshots/ui-advanced-range.png)
*Comprehensive interface for detailed analysis*

#### Distance Training Focus
```
Selected Parameters:
✅ Ball Speed
✅ Club Speed
✅ Carry Distance
✅ Total Distance
✅ Launch Angle
✅ Smash Factor

Goal: Optimize distance through efficiency and launch conditions
```

### Step-by-Step Configuration

1. **Select Your Range Analysis Step**
   - Click on the step in the tree view
   - Ensure it's a Range Analysis step type

2. **Open UI Configuration**
   - Scroll to the "UI Configuration" section
   - Click to expand if collapsed

3. **Choose Parameters**
   - Check boxes for desired parameters
   - Consider your users' skill level
   - Focus on 4-6 parameters maximum for clarity

4. **Preview and Test**
   - Save your script and load it to test
   - Verify parameters display correctly
   - Adjust based on user feedback

---

## 🎯 Performance Center UI Configuration

### Available Parameters

Performance Center UI focuses on game-situation metrics:

| Parameter | Description | Best For | Use Case |
|-----------|-------------|----------|----------|
| **Distance to Target** | How far from intended target | Accuracy training | All challenges |
| **Shot Accuracy** | Precision score/percentage | Skills assessment | Competitive training |
| **Trajectory Height** | Ball flight characteristics | Course management | Strategy training |
| **Landing Angle** | Angle ball hits ground | Green-side play | Short game |
| **Carry vs Roll** | Flight vs ground distance | Course strategy | Various conditions |
| **Target Zone** | Which scoring zone hit | Scoring games | Competitive play |
| **Points Scored** | Game/challenge points | Motivation | All game formats |
| **Consistency Index** | Shot-to-shot variation | Skill development | Improvement tracking |

### Configuration Examples

#### Target Challenge Setup
```
Selected Parameters:
✅ Distance to Target
✅ Shot Accuracy
✅ Points Scored
✅ Target Zone

Goal: Competitive target-based training
```
![Target Challenge UI](screenshots/ui-target-challenge.png)
*Game-focused interface with scoring elements*

#### Course Management Training
```
Selected Parameters:
✅ Distance to Target
✅ Trajectory Height
✅ Landing Angle
✅ Carry vs Roll

Goal: Strategic shot-making and course conditions
```

#### Consistency Development
```
Selected Parameters:
✅ Distance to Target
✅ Shot Accuracy
✅ Consistency Index
✅ Target Zone

Goal: Develop repeatable, accurate shots
```

---

## ⚡ Frame Actions - Interactive Elements

### What Are Frame Actions?

Frame Actions are custom buttons and interactive elements that appear in your script's user interface. They allow users to:
- Advance to the next step
- Analyze their shots in detail
- Access help or instructions
- Reset or retry challenges
- View performance summaries

![Frame Actions](screenshots/frame-actions-example.png)
*Frame actions providing user control and interaction*

### Creating Frame Actions

1. **Access Frame Actions**
   - In the UI Configuration section
   - Look for "Frame Actions" area
   - Click "Add Frame Action"

2. **Configure Action Properties**
   ```
   Text: "Analyze Shot"
   Action Type: "ShowDetails"  
   Conditions: "After each shot"
   ```

3. **Set Visibility Conditions**
   - When should the button appear?
   - What triggers its availability?
   - Should it disappear after use?

### Common Frame Action Types

#### Navigation Actions
```
Action: "Next Step"
- Appears: After success criteria met
- Function: Advance to next training step
- Condition: Success condition satisfied

Action: "Continue Training"  
- Appears: After step completion
- Function: Move to next activity
- Condition: All requirements met
```

#### Analysis Actions
```
Action: "View Shot Details"
- Appears: After each shot
- Function: Show detailed parameter breakdown
- Condition: Shot data available

Action: "Compare Shots"
- Appears: After 3+ shots
- Function: Side-by-side shot comparison
- Condition: Multiple shots recorded
```

#### Utility Actions
```
Action: "Retry Challenge"
- Appears: After failure condition
- Function: Reset and start over
- Condition: Failure state reached

Action: "Get Help"
- Appears: Always available
- Function: Show tips and guidance
- Condition: None (always visible)
```

### Advanced Frame Action Configuration

#### Conditional Visibility
```
Frame Action: "Bonus Challenge"
Conditions:
- User completed current step successfully
- Accuracy > 80%
- Time remaining > 5 minutes
Result: Only appears for high-performing users with time left
```

#### Progressive Actions
```
Frame Action Sequence:
1. "Start Challenge" (initial state)
2. "View Progress" (during challenge) 
3. "See Results" (after completion)
4. "Next Level" (if successful)
```

---

## 🎭 User Experience Design Principles

### Layout and Visual Hierarchy

#### Parameter Organization
```
Primary Display (Large, prominent):
- Key performance metrics
- Success/failure indicators
- Current progress

Secondary Display (Medium, supporting):
- Technical details
- Comparison data
- Historical context

Tertiary Display (Small, supplementary):
- Raw numbers
- Advanced metrics
- Debug information
```

#### Color and Visual Cues
- **Green**: Success, good performance, on-target
- **Red**: Failure, poor performance, off-target  
- **Blue**: Information, neutral data, system status
- **Yellow/Orange**: Warnings, caution, attention needed

### Responsive Design Considerations

#### Desktop/Tablet Layout
```
┌─────────────┬─────────────┐
│   Primary   │  Secondary  │
│  Metrics    │   Details   │
├─────────────┼─────────────┤
│ Frame Actions │ Progress   │
└─────────────┴─────────────┘
```

#### Mobile Layout
```
┌─────────────────┐
│  Primary Metric │
├─────────────────┤
│ Frame Actions   │
├─────────────────┤
│ Secondary Info  │
└─────────────────┘
```

---

## 🔧 Advanced Configuration Techniques

### Dynamic Parameter Selection

Adjust parameters based on user skill level:

```javascript
// Beginner Configuration
if (userSkillLevel === 'beginner') {
  parameters = ['Ball Speed', 'Carry Distance', 'Smash Factor'];
}

// Intermediate Configuration  
if (userSkillLevel === 'intermediate') {
  parameters = ['Ball Speed', 'Club Speed', 'Launch Angle', 'Spin Rate', 'Carry Distance'];
}

// Advanced Configuration
if (userSkillLevel === 'advanced') {
  parameters = ['All Parameters']; // Show everything
}
```

### Contextual UI Adaptation

Modify interface based on training context:

```javascript
// Driver Training Context
if (clubType === 'driver') {
  emphasize = ['Ball Speed', 'Launch Angle', 'Spin Rate'];
  deemphasize = ['Attack Angle', 'Club Path'];
}

// Short Game Context
if (shotType === 'chipping') {
  emphasize = ['Distance to Target', 'Landing Angle'];
  hide = ['Ball Speed', 'Club Speed'];
}
```

### Progressive Disclosure

Reveal complexity gradually:

```
Step 1: Basic parameters only (3-4 key metrics)
Step 2: Add intermediate parameters (2-3 additional)  
Step 3: Full technical display (all relevant parameters)
Step 4: Comparative analysis (historical data, trends)
```

---

## 📱 Platform-Specific Considerations

### TrackMan System Integration

#### Display Constraints
- **Screen Size**: Optimize for TrackMan display dimensions
- **Touch Interface**: Ensure buttons are finger-friendly
- **Viewing Distance**: Parameters must be readable from hitting position
- **Lighting Conditions**: High contrast for various lighting

#### Performance Optimization
- **Parameter Count**: Limit to essential metrics to avoid clutter
- **Update Frequency**: Balance real-time updates with system performance  
- **Data Persistence**: Consider what data needs to be saved between sessions

### User Environment Factors

#### Skill Level Adaptation
```
Beginner Users:
- Fewer parameters (3-4 maximum)
- Larger text and numbers
- Clear success/failure indicators
- Encouraging messaging

Advanced Users:
- Complete parameter sets
- Detailed technical data
- Comparative analysis tools
- Precise numeric values
```

#### Training Context
```
Individual Practice:
- Personal best comparisons
- Detailed analysis tools
- Self-paced progression
- Historical tracking

Group Training:
- Simplified displays
- Quick transitions
- Clear visibility for instructor
- Standardized layouts
```

---

## 🧪 Testing and Iteration

### UI Testing Process

1. **Parameter Visibility Test**
   - Are chosen parameters clearly visible?
   - Do they update correctly after each shot?
   - Are values formatted appropriately?

2. **Frame Action Functionality**
   - Do buttons appear when expected?
   - Do they perform the correct actions?
   - Are they accessible and intuitive?

3. **User Flow Testing**
   - Can users complete the training without confusion?
   - Are instructions clear and actionable?
   - Does the interface support the learning objectives?

### Common Issues and Solutions

#### Too Much Information
```
Problem: Users overwhelmed by parameter count
Solution: Reduce to 4-6 key parameters, use progressive disclosure

Problem: Technical terms confusing beginners
Solution: Use plain language labels, add explanatory tooltips
```

#### Poor Visibility
```
Problem: Parameters hard to read during training
Solution: Increase font sizes, improve contrast, better positioning

Problem: Frame actions not noticed by users
Solution: Use color, animation, or size to draw attention
```

#### Inconsistent Experience
```
Problem: Different steps have different UI layouts
Solution: Standardize layouts within activities, maintain visual consistency
```

---

## 📊 Performance Metrics and Analytics

### Measuring UI Effectiveness

Track these metrics to improve your UI design:

#### User Engagement
- **Time spent viewing parameters**: Are users actually looking at the data?
- **Frame action click rates**: Which buttons are users actually using?
- **Step completion rates**: Does UI complexity affect completion?

#### Learning Outcomes
- **Improvement rates**: Do UI choices support skill development?
- **User feedback**: What do users find helpful vs. confusing?
- **Instructor observations**: What works in real training sessions?

### Optimization Strategies

#### A/B Testing UI Configurations
```
Version A: Minimal parameters (3-4 key metrics)
Version B: Comprehensive parameters (8-10 metrics)
Version C: Progressive disclosure (3→6→10 parameters)

Measure: Completion rates, user satisfaction, learning outcomes
```

#### Iterative Improvement Process
1. **Deploy initial UI configuration**
2. **Collect user feedback and usage data**
3. **Identify pain points and confusion areas**
4. **Make targeted improvements**
5. **Test changes with small user group**
6. **Roll out improvements to all users**

---

## 🎯 Best Practices Summary

### DO These Things ✅

- **Start with fewer parameters** and add complexity gradually
- **Use consistent layouts** across similar training steps
- **Provide clear visual feedback** for success/failure states
- **Test with real users** in actual training environments
- **Consider the physical training environment** (lighting, distance, etc.)
- **Make frame actions obvious** and easy to use
- **Use appropriate colors** for different types of information
- **Keep performance smooth** by limiting parameter count

### DON'T Do These Things ❌

- **Overwhelm beginners** with too many technical parameters
- **Use inconsistent layouts** between similar steps
- **Hide important actions** in unclear locations
- **Forget about mobile/tablet considerations**
- **Ignore user feedback** about interface usability
- **Make assumptions** about what users want to see
- **Create overly complex** frame action sequences
- **Sacrifice performance** for visual complexity

---

## 🚀 Next Steps

Once you've mastered UI configuration:

1. **Experiment with different parameter combinations** for various training goals
2. **Create template configurations** for common training scenarios  
3. **Gather feedback from actual users** and iterate based on real usage
4. **Explore advanced frame actions** for sophisticated user interactions
5. **Consider creating style guides** for consistent UI across multiple scripts

For troubleshooting UI issues, see the [Troubleshooting Guide](troubleshooting.md).
For complete script examples using advanced UI, check the example files: `ui-demo.json` and `pc-ui-demo.json`.

---

*This guide covers the technical aspects of UI configuration. For overall script design principles, see the [Script Building Workflow](script-building.md) guide.*