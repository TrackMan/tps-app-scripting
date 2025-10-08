# Quick Start Guide - TrackMan App Scripting Editor

##  Getting Started in 5 Minutes

This guide will help you create your first TrackMan script quickly and easily.

### Step 1: Access the Editor
1. Open your web browser
2. Navigate to the TrackMan App Scripting Editor
3. Log in with your TrackMan credentials

### Step 2: Select Your Facility
1. Click the **facility dropdown** in the top bar
2. Choose your **TrackMan facility** from the list
3. Select a **location** and **bay** if prompted

![Quick Setup](screenshots/quick-setup.png)
*Quick facility selection to get started*

### Step 3: Create Your First Activity
1. Click the **" Add Activity"** button
2. Choose **"Range Analysis"** for technical training
3. Give it a name like **"Driver Practice"**
4. Add an intro message: *"Let's work on your driver technique"*

### Step 4: Add a Training Step
1. Click on your new activity in the tree
2. Click **" Add Step"**
3. Name it **"Tee Shots"**
4. Set the intro message: *"Hit 5 tee shots focusing on your setup"*

### Step 5: Configure Success Criteria
1. Click on your step to select it
2. In the **Logic** section, set:
   - **Success shots**: 5
   - **Can retry**: Yes
   - **Skip on success**: No

### Step 6: Test and Save
1. Check for the **green checkmark** (validation passed)
2. Click **" Download Script"** to save your work
3. Your first script is ready!

---

##  Common Workflows

### Creating a Range Analysis Script
**Best for**: Technical improvement, swing analysis, data-driven training

1. **Add Range Analysis Activity**
2. **Add Steps** for different aspects:
   - Driver technique
   - Iron accuracy  
   - Short game
3. **Configure UI** to show relevant parameters
4. **Set clear success criteria**

### Creating a Performance Center Script  
**Best for**: Game-like challenges, skills assessment, competitive training

1. **Add Performance Center Activity**
2. **Add Challenge Steps**:
   - Target accuracy
   - Distance control
   - Pressure situations
3. **Use scoring systems**
4. **Add progression difficulty**

---

##  Pro Tips for Beginners

### Script Structure
- **Start with 1 activity, 2-3 steps** - keep it simple
- **Use clear, action-oriented names** - "Hit 10 drivers" not "Driver step"
- **Write helpful messages** - explain what the user should do

### Success Criteria
- **Be specific but achievable** - "5 successful shots" not "perfect shots"
- **Allow retries** - learning is iterative
- **Provide clear feedback** - use end messages to explain results

### UI Configuration
- **Show relevant parameters only** - don't overwhelm users
- **Use consistent layouts** - similar steps should look similar
- **Test on actual devices** - what works on desktop may differ on tablets

---

##  Essential Features Overview

### The Tree View (Left Panel)
- **Script**: Overall configuration
- **Activities**: Major training sections  
- **Steps**: Individual training tasks
- **Drag & Drop**: Reorder items easily

### The Details Panel (Right Panel)
- **Properties**: Names, messages, settings
- **Logic**: Success/failure conditions
- **UI Configuration**: Custom interface setup
- **Validation**: Real-time error checking

### The Top Bar
- **Facility Selection**: Choose your TrackMan location
- **Import/Export**: Load and save scripts
- **Validation Status**: Green  = ready to use

---

##  Your First Complete Script

Here's a template you can follow:

```
 My Training Script
├──  Warm-up Activity
│   ├── Easy Swings (10 shots, focus on rhythm)
│   └── Target Practice (hit 5 to center target)
├── ️ Main Training Activity  
│   ├── Driver Distance (5 shots, measure consistency)
│   ├── Iron Accuracy (10 shots to various targets)
│   └── Short Game (chip shots, different lies)
└──  Assessment Activity
    └── Skills Test (combine all elements learned)
```

### Implementation Steps:
1. **Create each activity** with descriptive names
2. **Add steps** with clear instructions
3. **Set realistic success criteria** for each step
4. **Add helpful intro/end messages**
5. **Configure UI** to show relevant data
6. **Test and refine** based on user feedback

---

##  Common Mistakes to Avoid

###  Don't Do This
- Create too many activities at once
- Use vague names like "Step 1", "Step 2"
- Set impossible success criteria
- Skip intro messages
- Forget to validate before saving

###  Do This Instead
- Start with 1-2 activities, add more later
- Use descriptive names like "Driver Accuracy Challenge"
- Set achievable but meaningful goals
- Write clear, encouraging messages
- Always check the green validation checkmark

---

## 🆘 Need Help?

### Quick Fixes
- **Red X in validation?** Click the error message to see what's wrong
- **Can't select facility?** Check your internet connection and login
- **Script won't load?** Verify the JSON file isn't corrupted
- **UI looks wrong?** Make sure you've selected at least one parameter

### Getting Support
1. **Check the examples** - `ui-demo.json` and `pc-ui-demo.json`
2. **Review error messages** - they usually explain the exact problem  
3. **Open browser console** - F12 for detailed technical information
4. **Contact TrackMan support** - include your script file and error details

---

##  Next Steps

Once you've created your first script:

1. **Load the examples** to see advanced features
2. **Experiment with UI configuration** for custom interfaces
3. **Try both Range Analysis and Performance Center** activities
4. **Share with colleagues** for feedback and iteration
5. **Read the full User Guide** for comprehensive features

**Happy scripting!** ️‍️

---

*For detailed documentation, see the complete [User Guide](user-guide.md)*