import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import icons from "../resource/fontawesome.json";
import "font-awesome/css/font-awesome.min.css";

const Canvas = ({ elements, setElements, selectedElement, setSelectedElement }) => {
  const fileInputRef = useRef(null);
  const [uploadingElementId, setUploadingElementId] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [currentIconElementId, setCurrentIconElementId] = useState(null);
  const [, dropRef] = useDrop(() => ({
    accept: [
      "TEXT",
      "PARAGRAPH",
      "IMAGE",
      "LIST",
      "BUTTON",
      "TABLE",
      "DIVIDER",
      "SPACER",
      "SOCIAL",
      "HTML",
      "VIDEO",
      "ICONS",
      "MENU",
      "STICKER",
    ],
    drop: (item) => {
      const defaultContent = (() => {
        switch (item.type) {
          case "TEXT":
            return "New Text";
          case "PARAGRAPH":
            return "New Paragraph";
          case "IMAGE":
            return "";
          case "LIST":
            return ["Item 1", "Item 2", "Item 3"];
          case "BUTTON":
            return "Click Me";
          case "TABLE":
            return {
              headers: ["Header 1", "Header 2", "Header 3"],
              rows: [
                ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
                ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
              ],
            };
          case "DIVIDER":
            return null;
          case "SPACER":
            return { size: "10px", unit: "px" };
          case "SOCIAL":
            return [
              { icon: "facebook", url: "https://facebook.com" },
              { icon: "twitter", url: "https://twitter.com" },
              { icon: "linkedin", url: "https://linkedin.com" },
              { icon: "instagram", url: "https://instagram.com" },
            ];
          case "HTML":
            return "<p>Custom HTML Block</p>";
          case "VIDEO":
            return { url: "", title: "New Video" };
          case "ICONS":
            return [];
          case "MENU":
            return ["Menu Item 1", "Menu Item 2", "Menu Item 3"];
          case "STICKER":
            return "Sticker Block";
          default:
            return "";
        }
      })();

      const newElement = {
        id: Date.now(),
        type: item.type,
        content: defaultContent,
        properties: {
          fontSize: "16px",
          color: "#000000",
          textAlign: "left",
        },
      };

      setElements((prev) => [...prev, newElement]);

      if (item.type === "IMAGE") {
        setUploadingElementId(newElement.id);
        setTimeout(() => fileInputRef.current?.click(), 0);
      }
      if (item.type === "ICONS") {
        setCurrentIconElementId(newElement.id);
        setShowIconPicker(true);
      }
    },
  }));

  const handleIconSelect = (icon) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === currentIconElementId
          ? { ...el, content: [...el.content, icon] }
          : el
      )
    );
    setShowIconPicker(false);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleContentChange = (e, elementId) => {
    console.log("Calling this changes", e, elementId);
    setElements((prev) =>
      prev.map((el) =>
        el.id === elementId ? { ...el, content: e.target.value } : el
      )
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setElements((prev) =>
          prev.map((el) =>
            el.id === uploadingElementId
              ? { ...el, content: reader.result }
              : el
          )
        );
        setUploadingElementId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInlineEdit = (newValue, elementId, index, type = "item") => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === elementId) {
          if (type === "item") {
            if (Array.isArray(el.content)) {
              const updatedContent = [...el.content];
              updatedContent[index] = newValue;
              return { ...el, content: updatedContent };
            }
            return { ...el, content: newValue };
          } else if (type === "header") {
            const updatedHeaders = [...el.content.headers];
            updatedHeaders[index] = newValue;
            return {
              ...el,
              content: { ...el.content, headers: updatedHeaders },
            };
          } else if (type === "cell") {
            const { rowIndex, cellIndex } = index;
            const updatedRows = [...el.content.rows];
            updatedRows[rowIndex][cellIndex] = newValue;
            return { ...el, content: { ...el.content, rows: updatedRows } };
          }
        }
        return el;
      })
    );
  };

  return (
    <div
      ref={dropRef}
      style={{
        flex: 1,
        padding: "20px",
        background: "#f0f0f0",
        color: "#000",
        overflowY: "scroll",
      }}
    >
      <h3>Canvas</h3>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    
    {elements.map((element) => (
  <div
    key={element.id}
    onClick={(e) => {
      e.stopPropagation();
      setSelectedElement(element);
    }}
    style={{
      margin: "10px 0",
      padding: "15px",
      background: "#fff",
      border: selectedElement?.id === element.id ? "1px solid blue" : "1px solid #ccc",
      cursor: "pointer",
    }}
  >
    {element.type === "TEXT" && (
     
        <input
          type="text"
          value={element.content}
          onChange={(e) => handleContentChange(e, element.id)}
          style={{
            fontSize: element.properties?.fontSize || "16px",
            color: element.properties?.color || "#000",
            textAlign: element.properties?.textAlign || "left",
            width: "100%",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        />
    )}

          {element.type === "PARAGRAPH" && (
            <textarea
              value={element.content}
              onChange={(e) => handleContentChange(e, element.id)}
              style={{ width: "100%", minHeight: "100px" }}
            />
          )}
          {element.type === "IMAGE" && (
            <div>
              {element.content ? (
                <img
                  src={element.content}
                  alt="Uploaded"
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                />
              ) : (
                <p style={{ color: "#777" }}>Drop an image here to upload.</p>
              )}
            </div>
          )}
          {element.type === "LIST" && (
            <ul>
              {element.content.map((item, index) => (
                <li
                  key={index}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleInlineEdit(e.target.textContent, element.id, index)
                  }
                  style={{ cursor: "text" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {element.type === "BUTTON" && (
            <button
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInlineEdit(e.target.textContent, element.id)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "text",
              }}
            >
              {element.content || "Button"}
            </button>
          )}

          {element.type === "TABLE" && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {element.content.headers.map((header, index) => (
                    <th
                      key={index}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleInlineEdit(
                          e.target.textContent,
                          element.id,
                          index,
                          "header"
                        )
                      }
                      style={{
                        border: "1px solid #ccc",
                        padding: "5px",
                        cursor: "text",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleInlineEdit(
                            e.target.textContent,
                            element.id,
                            { rowIndex, cellIndex },
                            "cell"
                          )
                        }
                        style={{
                          border: "1px solid #ccc",
                          padding: "5px",
                          cursor: "text",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {element.type === "DIVIDER" && (
            <div>
              <label>
                Divider Thickness (px):
                <input
                  type="number"
                  value={element.content || "1"}
                  onChange={(e) => handleContentChange(e, element.id)}
                  style={{ width: "50px", marginLeft: "10px" }}
                />
              </label>
              <hr
                style={{
                  border: "none",
                  borderTop: `${element.content || 1}px solid #ccc`,
                  margin: "10px 0",
                }}
              />
            </div>
          )}

          {element.type === "SPACER" && (
            <div
              style={{
                height: element.content.size,
                backgroundColor: "#f5f5f5",
                margin: "10px 0",
              }}
            >
              <label>
                Spacer Size:
                <input
                  type="number"
                  value={parseInt(element.content.size)}
                  onChange={(e) =>
                    handleContentChange(
                      {
                        ...element.content,
                        size: `${e.target.value}${element.content.unit}`,
                      },
                      element.id
                    )
                  }
                  style={{ width: "50px", marginLeft: "10px" }}
                />
              </label>
              <select
                value={element.content.unit}
                onChange={(e) =>
                  handleContentChange(
                    { ...element.content, unit: e.target.value },
                    element.id
                  )
                }
              >
                <option value="px">px</option>
                <option value="em">em</option>
              </select>
            </div>
          )}

          {element.type === "SOCIAL" && (
            <div>
              {element.content.map((social, index) => (
                <div key={index}>
                  <i
                    className={`fa-brands fa-${social.icon}`}
                    style={{ marginRight: "10px" }}
                  ></i>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) =>
                      handleInlineEdit(
                        { ...social, url: e.target.value },
                        element.id,
                        index,
                        "social"
                      )
                    }
                    placeholder="Enter Social URL"
                    style={{ width: "80%" }}
                  />
                </div>
              ))}
            </div>
          )}

          {element.type === "HTML" && (
            <textarea
              value={element.content}
              onChange={(e) => handleContentChange(e, element.id)}
              placeholder="Enter HTML"
              style={{ width: "100%", minHeight: "100px" }}
            />
          )}

          {element.type === "VIDEO" && (
            <div>
              <input
                type="url"
                value={element.content || ""}
                onChange={(e) => handleContentChange(e, element.id)}
                placeholder="Enter Video URL"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              {element.content && (
                <video controls width="100%">
                  <source src={element.content} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

          {element.type === "ICONS" && (
            <div>
              {element.content.map((icon, index) => (
                <i
                  key={index}
                  className={`fa ${icon}`}
                  style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}
          {showIconPicker && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "20px",
                border: "1px solid gray",
                zIndex: 1000,
              }}
            >
              <h4>Select an Icon</h4>
              <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {icons.map((icon) => (
                  <i
                    key={icon}
                    className={`fa ${icon}`}
                    style={{
                      margin: "10px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleIconSelect(icon)}
                  />
                ))}
              </div>
              <button onClick={() => setShowIconPicker(false)}>Close</button>
            </div>
          )}

          {element.type === "MENU" && (
            <ul>
              {element.content.map((menuItem, index) => (
                <li
                  key={index}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleInlineEdit(e.target.textContent, element.id, index)
                  }
                >
                  {menuItem}
                </li>
              ))}
            </ul>
          )}

          {element.type === "STICKER" && (
            <div style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
              {element.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
