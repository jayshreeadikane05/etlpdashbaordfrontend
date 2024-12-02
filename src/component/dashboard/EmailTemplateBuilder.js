import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";

const EmailTemplateBuilder = () => {
  const location = useLocation();
  const emailEditorRef = useRef(null);
  const [templateId, setTemplateId] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [templateName, setTemplateName] = useState("Sample Template");
  const [isTemplateSaved, setIsTemplateSaved] = useState(false);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false); // New state to track template loading

  const template = templateData || { design: {} };

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
      const templateData = {
        name: templateName,
        design,
      };
      const token = Cookies.get('token');
      axios
        .post("http://localhost:8000/api/pri/saveTemplate", templateData, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Saved Template Response:", response.data);
          if (response.data && response.data.data._id) {
            setTemplateId(response.data.data._id);
            setIsTemplateSaved(true);
            alert("Template saved successfully!");
          } else {
            console.error("Template ID not found in response data.");
          }
        })
        .catch((error) => {
          console.error("Error saving template:", error);
        });
    });
  };

  const updateDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      const updatedTemplateData = {
        name: templateName,
        design,
      };
      const token = Cookies.get('token');
      axios
        .put(`http://localhost:8000/api/pri/updateTemplate/${templateId}`, updatedTemplateData, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Updated Template Response:", response.data);
          alert("Template updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating template:", error);
          alert("Failed to update the template.");
        });
    });
  };

  const onLoad = () => {
    const emptyDesign = {
      body: {
        rows: [],
        values: {},
      },
    };
    emailEditorRef.current.editor.loadDesign(emptyDesign);
  };

  useEffect(() => {
    console.log("location>>>", location);
    console.log("location>>>", location?.state);
  
    if (location?.state?.template) {
      const { template } = location.state;
      setTemplateData(template);
      setTemplateName(template.name);
      setIsTemplateLoaded(true); 
    }
  }, [location?.state?.template]);
  
  useEffect(() => {
    if (isTemplateLoaded && emailEditorRef.current && emailEditorRef.current.editor) {
      if (template && template.design) {
        emailEditorRef.current.editor.loadDesign(template.design); 
      }
    }
  }, [isTemplateLoaded, template]);
  
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
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              style={{
                padding: "10px",
                marginRight: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                flex: 1,
              }}
            />

            {!isTemplateSaved ? (
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
            ) : (
              <button
                onClick={updateDesign}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f0ad4e",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update Design
              </button>
            )}

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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateBuilder;
