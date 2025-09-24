import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

interface DocViewerProps {}

export const DocViewer: React.FC<DocViewerProps> = () => {
  const [activeSection, setActiveSection] = useState<string>('index');
  const [content, setContent] = useState<string>('<p>Loading...</p>');

  const sections = [
    { id: 'index', title: 'Documentation Overview' },
    { id: 'quick-start', title: 'Quick Start Guide' },
    { id: 'editor-walkthrough', title: 'Step-by-Step Walkthrough' },
    { id: 'editor-user-guide', title: 'Complete User Guide' },
    { id: 'script-building', title: 'Script Building Guide' },
    { id: 'ui-configuration', title: 'UI Configuration' },
    { id: 'editor-quick-reference', title: 'Quick Reference' },
    { id: 'editor-faq', title: 'Frequently Asked Questions' },
    { id: 'troubleshooting', title: 'Troubleshooting Guide' }
  ];

  const loadContent = async (sectionId: string) => {
    try {
      setContent('<p>Loading...</p>');
      const response = await fetch(`/docs/${sectionId}.md`);
      if (response.ok) {
        const markdownText = await response.text();
        const htmlContent = await marked(markdownText);
        setContent(htmlContent);
      } else {
        setContent(`<p>Error: Could not load ${sectionId}.md</p>`);
      }
    } catch (error) {
      setContent(`<p>Error loading content: ${error}</p>`);
    }
  };

  useEffect(() => {
    loadContent(activeSection);
  }, [activeSection]);

  return (
    <div className="doc-viewer" style={{ display: 'flex', height: '100%' }}>
      {/* Table of Contents */}
      <div style={{ 
        width: '250px', 
        borderRight: '1px solid #ccc', 
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}>
        <h3>Contents</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sections.map(section => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                style={{
                  background: activeSection === section.id ? '#007acc' : 'transparent',
                  color: activeSection === section.id ? 'white' : '#333',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  borderRadius: '4px'
                }}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div 
          className="markdown-content"
          style={{ 
            backgroundColor: '#ffffff', 
            padding: '20px', 
            borderRadius: '4px',
            border: '1px solid #ddd',
            lineHeight: '1.6'
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};