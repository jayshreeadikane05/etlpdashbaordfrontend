import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import EmailEditor from "react-email-editor";
import axios from "axios";
import Cookies from "js-cookie";

const CreateEmailTemplate = () => {
  const [templates, setTemplates] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const emailEditorRef = useRef(null);
  const navigate = useNavigate(); 
  const [isNewTemplate, setIsNewTemplate] = useState(true); 

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pri/getalltemplate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTemplates(response.data.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Fetch a specific template by ID
  const fetchTemplateById = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`http://localhost:8000/api/pri/getTemplate/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching template by ID:", error);
      return null;
    }
  };

  // Load design into the email editor
  const loadDesign = (design) => {
    emailEditorRef.current.editor.loadDesign(design || {});
  };

  // Redirect and load the editor with the selected template
  const editTemplate = async (template) => {
    const templateData = await fetchTemplateById(template._id);
    if (templateData) {
      navigate("/create-email-template", { state: { template: templateData } });
    }
  };
  

  // Create a blank template
  const createBlankTemplate = () => {
    const blankDesign = {}; // Empty design for a new template
    navigate("/create-email-template", { state: { template: { design: blankDesign } } });
  };
  const updateDesign = async () => {
    const token = Cookies.get("token");
    const currentDesign = await emailEditorRef.current.editor.saveDesign(); // Get the current design from the editor
    const templateId = selectedTemplate ? selectedTemplate._id : null; // Determine if we're editing an existing template
  
    try {
      if (templateId) {
        // Update existing template
        await axios.put(
          `http://localhost:8000/api/pri/updateTemplate/${templateId}`,
          { design: currentDesign },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Template updated successfully!");
      } else {
        // Create new template
        await axios.post(
          "http://localhost:8000/api/pri/createTemplate",
          { design: currentDesign },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Template created successfully!");
      }
      navigate("/create-email-template"); // Redirect back to template list
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template");
    }
  };
  
  return (
    <div className="container">
      <h1>Template Gallery</h1>

      {selectedTemplate ? (
        // Email Editor Section
        <div>
          <button className="btn btn-secondary mb-3" onClick={() => setSelectedTemplate(null)}>
            Back to Templates
          </button>
          <div style={{ height: "600px" }}>
            <EmailEditor ref={emailEditorRef} />
          </div>
          <button className="btn btn-success mt-3" onClick={updateDesign}>
            Save Template
          </button>
        </div>
      ) : (
        // Template Gallery Section
        <>
          {loading ? (
            <p>Loading templates...</p>
          ) : (
            <div className="row">
              {/* Show Blank Template Option */}
              <div className="col-md-3">
                <div className="card" style={{ margin: "10px" }}>
                  <div className="card-body">
                    <h5 className="card-title">Blank Template</h5>
                    <button
                      className="btn btn-primary"
                      onClick={createBlankTemplate}
                    >
                      Create Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Render Saved Templates */}
              {templates.map((template) => (
                <div key={template.id} className="col-md-3">
                  <div className="card" style={{ margin: "10px" }}>
                    <img
                      src={template.image || "https://via.placeholder.com/150"}
                      alt={template.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{template.name}</h5>
                      <button
                        className="btn btn-primary"
                        onClick={() => editTemplate(template)}
                      >
                        Edit Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreateEmailTemplate;
