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
        const response = await axios.get(
          "http://localhost:8000/api/pri/getalltemplate",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTemplates(response.data.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const fetchTemplateById = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/pri/getTemplate/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching template by ID:", error);
      return null;
    }
  };

  const loadDesign = (design) => {
    emailEditorRef.current.editor.loadDesign(design || {});
  };

  const editTemplate = async (template) => {
    const templateData = await fetchTemplateById(template._id);
    if (templateData) {
      navigate("/create-email-template", { state: { template: templateData } });
    }
  };

  const createBlankTemplate = () => {
    const blankDesign = {};
    navigate("/create-email-template", { state: { template: { design: blankDesign } } });
  };

  const updateDesign = async () => {
    const token = Cookies.get("token");
    const currentDesign = await emailEditorRef.current.editor.saveDesign();
    const templateId = selectedTemplate ? selectedTemplate._id : null;
    try {
      if (templateId) {
        await axios.put(
          `http://localhost:8000/api/pri/updateTemplate/${templateId}`,
          { design: currentDesign },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Template updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8000/api/pri/createTemplate",
          { design: currentDesign },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Template created successfully!");
      }
      navigate("/create-email-template");
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template");
    }
  };

  return (
    <>
      <div className="page-header">
        <h3 className="page-title"> Template </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Email</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Email Template
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        {selectedTemplate ? (
          <div>
            <button
              className="btn btn-secondary mb-3"
              onClick={() => setSelectedTemplate(null)}
            >
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
          <>
            {loading ? (
              <p>Loading templates...</p>
            ) : (
              <div className="row">
                {/* Show Blank Template Option */}
                <div className="col-md-2">
                  <div className="card" style={{ margin: "10px" }}>
                    <div className="card-body">
                      <h5 className="card-title">Blank Template</h5>
                      <button
                        className="btn btn-outline-warning btn-fw"
                        onClick={createBlankTemplate}
                      >
                        Create Template
                      </button>
                    </div>
                  </div>
                </div>

                {/* Render Saved Templates */}
                {templates.map((template) => (
                  <div key={template.id} className="col-md-2">
                    <div
                      className="card templatebox"
                      style={{ margin: "10px" }}
                    >
                      <img
                        src={template.image || "https://via.placeholder.com/150"}
                        alt={template.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{template.name}</h5>
                        <div className="overlay"></div>
                        <button
                          className="btn btn-outline-light btn-fw"
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
    </>
  );
};

export default CreateEmailTemplate;
