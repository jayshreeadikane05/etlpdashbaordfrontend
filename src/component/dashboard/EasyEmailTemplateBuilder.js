import React, { useRef, useState } from 'react';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';

const EasyEmailTemplateBuilder = () => {
  const emailEditorRef = useRef(null);
  const [emailHtml, setEmailHtml] = useState('');

  const exportTemplate = () => {
    const editorInstance = emailEditorRef.current.editor;
    editorInstance.exportHtml((data) => {
      const { html } = data;
      setEmailHtml(html); // Save or display the generated HTML
      console.log('Exported HTML:', html);
      alert('Template exported. Check the console for HTML.');
    });
  };

  // Load a predefined template (optional)
  const loadTemplate = () => {
    const templateJson = {
      subject: 'Welcome Email',
      body: {
        rows: [
          {
            columns: [
              {
                contents: [
                  {
                    type: 'text',
                    values: {
                      text: '<p style="font-size: 18px;">Welcome to the Email Editor!</p>',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  
    if (!templateJson || !templateJson.subject || !templateJson.body) {
      alert('Invalid template structure.');
      return;
    }
  
    const editorInstance = emailEditorRef.current?.editor;
    if (!editorInstance) {
      console.error('Editor instance is not available.');
      return;
    }
  
    editorInstance.loadDesign(templateJson);
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h1>Email Template Builder</h1>
      <button onClick={exportTemplate} style={{ marginBottom: '10px', padding: '10px', cursor: 'pointer' }}>
        Export Template
      </button>
      <button onClick={loadTemplate} style={{ marginBottom: '10px', padding: '10px', cursor: 'pointer' }}>
        Load Template
      </button>

      <EmailEditorProvider
        data={{
          subject: 'My Default Email Subject', // Provide an initial subject
          body: {
            rows: [], // Provide an empty body as the default state
          },
        }}
      >
        <div style={{ height: '600px', border: '1px solid #ccc' }}>
          <EmailEditor
            ref={emailEditorRef}
            options={{
              showBrand: false, // Optional: Hide the branding
            }}
          />
        </div>
      </EmailEditorProvider>

      <div style={{ marginTop: '20px' }}>
        <h3>Generated HTML:</h3>
        <div style={{ whiteSpace: 'pre-wrap' }}>{emailHtml}</div>
      </div>
    </div>
  );
};

export default EasyEmailTemplateBuilder;
