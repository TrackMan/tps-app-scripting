import React, { useState, useEffect } from 'react';

interface DocumentationViewerProps {}

// Import the markdown files directly as text
const docContents: Record<string, string> = {
  'index.md': `# TrackMan App Scripting

**App Scripting** lets you orchestrate multi-app training flows across **Range Analysis** and **Performance Center** using JSON.

- ✅ Validate scripts with a JSON Schema (Draft 2020-12)
- ✅ Versioned schema under \`schema/<semver>/…\`
- ✅ Stable entrypoint at \`schema/latest/app-scripting.schema.json\`
- ✅ CI validation for all examples

## Quick start

1. Put the schema at \`schema/1.0.0/app-scripting.schema.json\`  
   (use the schema we finalized earlier).

2. Point \`latest\` to that version (pick one approach):

- **Pointer file (recommended):**
  \`schema/latest/app-scripting.schema.json\`
  \`\`\`json
  { "$ref": "../1.0.0/app-scripting.schema.json" }
  \`\`\`

- **Symlink:** \`ln -s ../1.0.0/app-scripting.schema.json schema/latest/app-scripting.schema.json\`

- **Copy:** \`cp schema/1.0.0/app-scripting.schema.json schema/latest/app-scripting.schema.json\`

3. Create an example:

\`\`\`json
{
  "$schema": "../schema/latest/app-scripting.schema.json",
  "version": "1.0.0",
  "activities": [
    {
      "id": "range-warmup",
      "type": "RangeAnalysisScriptedActivity",
      "name": "Range Analysis Warm-up",
      "description": "Initial range practice session",
      "steps": [
        {
          "id": "setup-range",
          "name": "Setup Range Session",
          "description": "Configure range analysis session"
        }
      ]
    }
  ]
}
\`\`\`

4. Validate:

\`\`\`bash
npm run validate
\`\`\``,

  'authoring-guide.md': `# Authoring Guide

This guide explains how to write **App Scripting** JSON files that orchestrate multi-app training flows across **Range Analysis** and **Performance Center**, and how those files are validated and executed.

## TL;DR (Quick Start)

1. Put the canonical schema at:
\`\`\`
schema/1.0.0/app-scripting.schema.json
\`\`\`

2. Point \`latest\` to it (recommended: pointer file):
\`\`\`json
// schema/latest/app-scripting.schema.json
{ "$ref": "../1.0.0/app-scripting.schema.json" }
\`\`\`

3. Create an example in \`examples/...\`:
\`\`\`json
{
  "$schema": "../schema/latest/app-scripting.schema.json",
  "version": "1.0.0",
  "activities": []
}
\`\`\`

4. Validate:
\`\`\`bash
npm run validate
\`\`\`

## Concepts

- **Script** — The top-level JSON file with an ordered list of \`activities\`.
- **Activity** — Targets a single host app. Types:
  - \`RangeAnalysisScriptedActivity\`
  - \`PerformanceCenterScriptedActivity\`
- **Step** — Individual actions within an activity with success/failure conditions.

## Activity Types

### Range Analysis Activity
Used for range practice sessions and shot analysis.

\`\`\`json
{
  "id": "range-session",
  "type": "RangeAnalysisScriptedActivity",
  "name": "Range Practice",
  "description": "Practice session on the driving range",
  "steps": [
    {
      "id": "warmup",
      "name": "Warm-up Shots",
      "description": "Take 10 warm-up shots with 7-iron"
    }
  ]
}
\`\`\`

### Performance Center Activity
Used for performance analysis and tracking.

\`\`\`json
{
  "id": "performance-analysis",
  "type": "PerformanceCenterScriptedActivity", 
  "name": "Performance Analysis",
  "description": "Analyze recent performance metrics",
  "steps": [
    {
      "id": "review-stats",
      "name": "Review Statistics",
      "description": "Review performance statistics from recent sessions"
    }
  ]
}
\`\`\`

## Step Logic

Each step can have logic for success/failure conditions:

\`\`\`json
{
  "id": "accuracy-test",
  "name": "Accuracy Test", 
  "description": "Hit targets with accuracy",
  "logic": {
    "successCondition": {
      "nodeType": "ConditionNode",
      "shots": 10,
      "conditions": [
        {
          "metric": "accuracy",
          "operator": ">=",
          "value": 80
        }
      ]
    },
    "canRetry": true,
    "skipOnSuccess": false
  }
}
\`\`\`

## Validation

All scripts are validated against the JSON schema. Use the validation tools:

\`\`\`bash
# Validate all examples
npm run validate

# Validate specific file
node tools/validate.js examples/my-script.json
\`\`\``,

  'schema-reference.md': `# Schema Reference

Complete reference for the App Scripting JSON Schema.

## Root Schema

\`\`\`json
{
  "type": "object",
  "required": ["version", "activities"],
  "properties": {
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "activities": {
      "type": "array",
      "items": { "$ref": "#/$defs/Activity" }
    }
  }
}
\`\`\`

## Activity Schema

Base activity with common properties:

\`\`\`json
{
  "type": "object",
  "required": ["id", "type", "name", "steps"],
  "properties": {
    "id": { "type": "string" },
    "type": { "enum": ["RangeAnalysisScriptedActivity", "PerformanceCenterScriptedActivity"] },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "steps": {
      "type": "array", 
      "items": { "$ref": "#/$defs/Step" }
    }
  }
}
\`\`\`

## Step Schema

\`\`\`json
{
  "type": "object",
  "required": ["id", "name"],
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "logic": { "$ref": "#/$defs/StepLogic" }
  }
}
\`\`\`

## Step Logic Schema

\`\`\`json
{
  "type": "object",
  "properties": {
    "setup": { "type": "object" },
    "successCondition": { "$ref": "#/$defs/LogicNode" },
    "failCondition": { "$ref": "#/$defs/LogicNode" },
    "canRetry": { "type": "boolean", "default": true },
    "skipOnSuccess": { "type": "boolean", "default": false }
  }
}
\`\`\`

## Logic Node Schema

\`\`\`json
{
  "type": "object",
  "required": ["nodeType"],
  "properties": {
    "nodeType": { "enum": ["ConditionNode", "AndNode", "OrNode"] },
    "shots": { "type": "number", "minimum": 1 },
    "conditions": {
      "type": "array",
      "items": { "$ref": "#/$defs/Condition" }
    },
    "children": {
      "type": "array", 
      "items": { "$ref": "#/$defs/LogicNode" }
    }
  }
}
\`\`\`

## Condition Schema

\`\`\`json
{
  "type": "object",
  "required": ["metric", "operator", "value"],
  "properties": {
    "metric": { 
      "enum": ["accuracy", "distance", "clubheadSpeed", "ballSpeed", "smashFactor"] 
    },
    "operator": { 
      "enum": ["=", "!=", "<", "<=", ">", ">="] 
    },
    "value": { "type": "number" }
  }
}
\`\`\``
};

export const DocumentationViewer: React.FC<DocumentationViewerProps> = () => {
  const [selectedDoc, setSelectedDoc] = useState<string>('index.md');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const docFiles = [
    { name: 'index.md', title: 'Overview' },
    { name: 'authoring-guide.md', title: 'Authoring Guide' },
    { name: 'schema-reference.md', title: 'Schema Reference' }
  ];

  useEffect(() => {
    loadDocumentation(selectedDoc);
  }, [selectedDoc]);

  const loadDocumentation = (filename: string) => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      const docContent = docContents[filename] || 'Documentation not found.';
      setContent(docContent);
      setLoading(false);
    }, 100);
  };

  // Simple markdown to HTML converter for basic formatting
  const renderMarkdown = (markdown: string) => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]*)`/g, '<code>$1</code>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    return `<p>${html}</p>`;
  };

  return (
    <div className="documentation-viewer">
      <div className="doc-sidebar">
        <h3>Documentation</h3>
        <ul className="doc-nav">
          {docFiles.map((doc) => (
            <li key={doc.name}>
              <button
                className={`doc-nav-item ${selectedDoc === doc.name ? 'active' : ''}`}
                onClick={() => setSelectedDoc(doc.name)}
              >
                {doc.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="doc-content">
        {loading && <div className="doc-loading">Loading documentation...</div>}
        {!loading && content && (
          <div 
            className="doc-markdown"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
      </div>
    </div>
  );
};