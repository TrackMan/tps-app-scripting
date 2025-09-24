# TrackMan App Scripting Editor - Quick Reference

## Keyboard Shortcuts

### General
- `Ctrl + S` - Save current script
- `Ctrl + O` - Open script file
- `Ctrl + N` - New script
- `Ctrl + Z` - Undo
- `Ctrl + Y` - Redo
- `F5` - Run/Execute script
- `F11` - Toggle fullscreen mode

### Navigation
- `Ctrl + F` - Find in current file
- `Ctrl + H` - Find and replace
- `Ctrl + G` - Go to line
- `Ctrl + P` - Quick file open
- `Ctrl + Shift + P` - Command palette

### Code Editing
- `Ctrl + /` - Toggle line comment
- `Ctrl + Shift + /` - Toggle block comment
- `Tab` - Indent selected lines
- `Shift + Tab` - Unindent selected lines
- `Ctrl + D` - Duplicate line
- `Ctrl + Shift + K` - Delete line

## UI Components Quick Reference

### Toolbar Actions
- **New** - Create new script
- **Open** - Load existing script
- **Save** - Save current script
- **Download** - Export script as JSON
- **Run** - Execute script
- **Settings** - Open configuration panel

### Side Panels
- **Activities Panel** - Drag and drop script activities
- **Properties Panel** - Configure selected activity
- **Variables Panel** - Manage script variables
- **Debug Panel** - View execution logs and errors

### Activity Categories
- **Input/Output** - Data collection and display
- **Logic** - Conditional statements and loops
- **Math** - Calculations and formulas
- **Navigation** - Flow control
- **Custom** - User-defined activities

## Script Structure

### Basic Script Template
```json
{
  "name": "My Script",
  "version": "1.0.0",
  "activities": [
    {
      "id": "start",
      "type": "start",
      "next": "activity1"
    },
    {
      "id": "activity1",
      "type": "input",
      "properties": {
        "prompt": "Enter value:",
        "variable": "userInput"
      },
      "next": "end"
    },
    {
      "id": "end",
      "type": "end"
    }
  ]
}
```

### Common Activity Types
- `start` - Script entry point
- `end` - Script termination
- `input` - User input collection
- `output` - Display information
- `condition` - If/else logic
- `loop` - Repetitive operations
- `calculation` - Mathematical operations
- `variable` - Variable assignment

## Common Properties

### All Activities
- `id` - Unique identifier
- `type` - Activity type
- `name` - Display name (optional)
- `description` - Activity description (optional)
- `next` - Next activity ID

### Input Activities
- `prompt` - Text shown to user
- `variable` - Variable to store input
- `dataType` - Expected data type
- `required` - Whether input is mandatory

### Output Activities
- `message` - Text to display
- `format` - Display format (text, html, markdown)

### Condition Activities
- `condition` - Boolean expression
- `trueNext` - Activity if condition is true
- `falseNext` - Activity if condition is false

## Variables

### Declaration
Variables are automatically declared when first used in activities.

### Naming Rules
- Must start with letter or underscore
- Can contain letters, numbers, underscores
- Case sensitive
- No spaces or special characters

### Data Types
- `string` - Text values
- `number` - Numeric values
- `boolean` - True/false values
- `array` - List of values
- `object` - Complex data structures

## Error Messages

### Common Errors
- **"Activity not found"** - Invalid activity ID reference
- **"Circular reference detected"** - Activities reference each other in a loop
- **"Variable not defined"** - Using undefined variable
- **"Invalid JSON syntax"** - Malformed script structure
- **"Missing required property"** - Activity missing mandatory property

### Debugging Tips
1. Check activity IDs for typos
2. Verify all `next` references point to valid activities
3. Ensure variables are defined before use
4. Validate JSON syntax
5. Use debug panel to trace execution

## File Operations

### Supported Formats
- `.json` - Native script format
- `.txt` - Plain text export
- `.zip` - Compressed script package

### Import/Export
- Scripts are saved as JSON files
- Can be shared between users
- Version information is preserved
- Activity configurations are maintained

## Best Practices

### Script Organization
- Use descriptive activity names
- Group related activities
- Add comments and descriptions
- Keep scripts modular and focused

### Performance
- Minimize nested loops
- Use efficient data structures
- Cache frequently used values
- Optimize condition checks

### Maintenance
- Regular backups
- Version control
- Document changes
- Test thoroughly before deployment