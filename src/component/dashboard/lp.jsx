import React, { useRef } from "react";

import EmailEditor from "react-email-editor";

const EmailTemplateBuilder = (props) => {
  const emailEditorRef = useRef(null);
  const options = {
    user: {
      id: 1,
    },
    features: {
      userUploads: true,
    },
    tabs: {
      content: {
        enabled: true,
      },
    },
  };

  const toolsConfig = {};

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("Exported HTML:", html);
      alert("Output HTML has been logged in your developer console.");
    });
  };

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("Saved Design JSON:", JSON.stringify(design, null, 4));
      alert("Design JSON has been logged in your developer console.");
    });
  };

  const onLoad = () => {
    // Load an empty design
    const emptyDesign = {
      body: {
        rows: [],
        values: {},
      },
    };

    emailEditorRef.current.editor.loadDesign(emptyDesign);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div style={{ padding: "20px" }}>
          <div
            className="button-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={saveDesign}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save Design
            </button>
            <button
              onClick={exportHtml}
              style={{
                padding: "10px 20px",
                backgroundColor: "#008CBA",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Export HTML
            </button>
          </div>

          <div
            className="email-editor-container"
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <EmailEditor
              ref={emailEditorRef}
              projectId={35778}
              minHeight="90vh"
              onLoad={onLoad}
              options={options}
              tools={toolsConfig}
              displayMode={"popup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateBuilder;
