# TrackMan App Scripting Editor - Step-by-Step Walkthrough

## Welcome to Your First Script!

This walkthrough will guide you through creating a complete script from start to finish. By the end, you'll have built a functional calculator script and understand all the core concepts.

## What We'll Build

We're going to create a **Simple Calculator Script** that:
1. Asks the user for two numbers
2. Lets them choose an operation (add, subtract, multiply, divide)
3. Performs the calculation
4. Displays the result
5. Asks if they want to calculate again

## Step 1: Understanding the Interface

When you first open the editor, you'll see:

### The Canvas (Center)
- Contains a **Start** activity (green circle) 
- Contains an **End** activity (red circle)
- This is where you'll build your script visually

### Activities Panel (Left)
Categories of activities you can drag onto the canvas:
- **Flow** - Start, End, Condition, Loop
- **Input/Output** - Get user input, show messages
- **Data** - Work with variables and calculations
- **Logic** - Decision making and comparisons

### Properties Panel (Right)
- Shows settings for the selected activity
- This is where you configure what each activity does

### Toolbar (Top)
- **New, Open, Save** - File operations
- **Run** - Test your script
- **Settings** - Customize the editor

## Step 2: Plan the Script Flow

Before we start building, let's plan our script:
```
Start
  ↓
Get First Number
  ↓
Get Second Number  
  ↓
Choose Operation
  ↓
Perform Calculation
  ↓
Show Result
  ↓
Ask to Continue?
  ↓ (Yes)      ↓ (No)
Back to Start   End
```

## Step 3: Get the First Number

Let's add our first input activity:

1. **Find the Input Activity**
   - Look in the Activities Panel on the left
   - Find the "Input" activity under the Input/Output section

2. **Add It to Canvas**
   - Drag the Input activity onto the canvas
   - Drop it between the Start and End activities

3. **Configure the Activity**
   - Click on the Input activity to select it
   - In the Properties Panel (right side), set:
     - **Name**: "Get First Number"
     - **Prompt**: "Enter the first number:"
     - **Variable**: "number1"
     - **Data Type**: "number"
     - **Required**: true

4. **Connect to Start Activity**
   - Click on the Start activity
   - In Properties Panel, set **Next** to the ID of your Input activity
   - (The ID is shown at the top of the Properties Panel)

## Step 4: Get the Second Number

1. **Add Another Input Activity**
   - Drag another Input activity to the canvas
   - Place it after the first input

2. **Configure It**
   - **Name**: "Get Second Number"
   - **Prompt**: "Enter the second number:"
   - **Variable**: "number2"
   - **Data Type**: "number"
   - **Required**: true

3. **Connect the Activities**
   - Select the first Input activity
   - Set its **Next** to the ID of the second Input activity

## Step 5: Choose the Operation

Now let's add a choice activity for the operation:

1. **Add a Choice Activity**
   - Drag a "Choice" activity from the Input/Output section
   - Place it after the second input

2. **Configure the Choices**
   - **Name**: "Choose Operation"
   - **Prompt**: "What operation do you want to perform?"
   - **Variable**: "operation"
   - **Options**: Add four options:
     - Value: "add", Label: "Addition (+)"
     - Value: "subtract", Label: "Subtraction (-)"
     - Value: "multiply", Label: "Multiplication (×)"
     - Value: "divide", Label: "Division (÷)"

3. **Connect It**
   - Set the second Input activity's **Next** to this Choice activity

## Step 6: Create the Calculations

We need four calculation activities, one for each operation:

### Addition Activity
1. **Add a Calculation Activity**
   - Drag from Data section
   - **Name**: "Add Numbers"
   - **Formula**: "{{number1}} + {{number2}}"
   - **Result Variable**: "result"

### Subtraction Activity
1. **Add Another Calculation**
   - **Name**: "Subtract Numbers"
   - **Formula**: "{{number1}} - {{number2}}"
   - **Result Variable**: "result"

### Multiplication Activity
1. **Add Another Calculation**
   - **Name**: "Multiply Numbers"
   - **Formula**: "{{number1}} * {{number2}}"
   - **Result Variable**: "result"

### Division Activity
1. **Add Another Calculation**
   - **Name**: "Divide Numbers"
   - **Formula**: "{{number1}} / {{number2}}"
   - **Result Variable**: "result"

## Step 7: Add Conditional Logic

We need to route to the correct calculation based on the user's choice:

1. **Add Condition Activities**
   - Add three Condition activities after the Choice
   - These will check which operation was selected

2. **Configure First Condition**
   - **Name**: "Check for Addition"
   - **Condition**: "{{operation}} == 'add'"
   - **True Next**: ID of Addition calculation
   - **False Next**: ID of second condition

3. **Configure Second Condition**
   - **Name**: "Check for Subtraction"  
   - **Condition**: "{{operation}} == 'subtract'"
   - **True Next**: ID of Subtraction calculation
   - **False Next**: ID of third condition

4. **Configure Third Condition**
   - **Name**: "Check for Multiplication"
   - **Condition**: "{{operation}} == 'multiply'"
   - **True Next**: ID of Multiplication calculation
   - **False Next**: ID of Division calculation

5. **Connect Choice to First Condition**
   - Set the Choice activity's **Next** to the first condition

## Step 8: Show the Result

1. **Add an Output Activity**
   - Place it after all the calculations
   - **Name**: "Show Result"
   - **Message**: "{{number1}} {{operation}} {{number2}} = {{result}}"

2. **Connect All Calculations**
   - Set each calculation activity's **Next** to this Output activity

## Step 9: Ask to Continue

1. **Add Another Choice Activity**
   - **Name**: "Continue?"
   - **Prompt**: "Do you want to perform another calculation?"
   - **Variable**: "continue"
   - **Options**:
     - Value: "yes", Label: "Yes, calculate again"
     - Value: "no", Label: "No, I'm done"

2. **Connect Output to This Choice**
   - Set the Output activity's **Next** to this Choice activity

## Step 10: Complete the Loop

1. **Add a Final Condition**
   - **Name**: "Check Continue"
   - **Condition**: "{{continue}} == 'yes'"
   - **True Next**: ID of first Input activity (creates a loop!)
   - **False Next**: "end"

2. **Connect the Choice**
   - Set the Continue Choice's **Next** to this final condition

## Step 11: Test Your Script

1. **Click the Run Button**
   - Press F5 or click Run in the toolbar

2. **Follow the Prompts**
   - Enter a first number (try 10)
   - Enter a second number (try 5)
   - Choose an operation (try Addition)
   - See the result: "10 add 5 = 15"
   - Choose to continue or end

3. **Check for Issues**
   - Look at the Debug Panel for any errors
   - Make sure all activities are properly connected
   - Verify variable names are spelled consistently

## Step 12: Enhance Your Script

Now that the basic script works, let's add some improvements:

### Add Input Validation
1. **Add Condition After Each Number Input**
   - Check if the input is actually a number
   - Show error message if not
   - Loop back to ask again

### Handle Division by Zero
1. **Add Condition Before Division**
   - Check if `{{number2}} == 0`
   - Show error message if true
   - Ask for a different second number

### Improve Output Formatting
1. **Update the Output Message**
   - Use proper operation symbols: +, -, ×, ÷
   - Format numbers with decimal places if needed
   - Add descriptive text

## Step 13: Save Your Work

1. **Save the Script**
   - Click Save or press Ctrl+S
   - Give it a name like "Calculator Script v1.0"
   - Choose a location on your computer

2. **Download a Copy**
   - Click Download to get a JSON file
   - This can be shared with others or used as backup

## Congratulations! 

You've successfully created a complete interactive script! You now understand:

-  How to add and configure activities
-  How to connect activities in logical flows
-  How to work with variables and user input
-  How to create conditional logic and loops
-  How to test and debug scripts
-  How to save and share your work

## What's Next?

Now that you've mastered the basics, try these challenges:

### Challenge 1: Scientific Calculator
Add more operations like:
- Square root
- Power/exponent
- Trigonometric functions (sin, cos, tan)

### Challenge 2: Unit Converter
Create a script that converts between:
- Temperature (Celsius, Fahrenheit, Kelvin)
- Length (meters, feet, inches)
- Weight (kg, pounds, ounces)

### Challenge 3: Quiz Game
Build a multiple-choice quiz that:
- Asks several questions
- Keeps track of correct answers
- Shows a final score
- Provides feedback on wrong answers

### Challenge 4: Data Collector
Create a form that:
- Collects user information
- Validates email format
- Saves data to variables
- Generates a summary report

## Tips for Success

1. **Start Simple**: Begin with basic scripts and add complexity gradually
2. **Test Frequently**: Run your script after each major addition
3. **Use Descriptive Names**: Make variable and activity names clear
4. **Plan First**: Sketch out your script flow before building
5. **Debug Systematically**: Use the Debug Panel to trace issues
6. **Save Often**: Don't lose your work - save regularly
7. **Experiment**: Try different activity types and configurations
8. **Ask for Help**: Use the documentation and FAQ when stuck

## Common Patterns You've Learned

- **Input → Process → Output**: The basic script pattern
- **Condition → Branch**: Making decisions in your script
- **Loop Back**: Creating repeatable workflows
- **Variable Storage**: Passing data between activities
- **Error Handling**: Checking for problems and providing alternatives

These patterns can be combined in countless ways to create sophisticated scripts for any purpose. The visual editor makes it easy to see and modify the logic flow, enabling rapid development and testing.

Happy scripting! 