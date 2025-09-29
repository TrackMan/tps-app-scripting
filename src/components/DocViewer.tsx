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
    <div className="doc-viewer-layout">
      {/* Table of Contents */}
      <div className="doc-toc">
        <h3>Contents</h3>
  <ul>
          {sections.map(section => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={activeSection === section.id ? 'active' : ''}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="doc-content-area">
        <div 
          className="doc-markdown-box markdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};