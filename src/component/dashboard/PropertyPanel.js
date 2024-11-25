import React from "react";

const PropertiesPanel = ({ selectedElement, handlePropertyChange }) => {
  if (!selectedElement) return <div style={{ padding: "10px" }}>Select an element to edit properties.</div>;

  const { properties } = selectedElement;

  return (
    <div style={{ width: "20%", padding: "10px", borderLeft: "1px solid #ccc" }}>
      <h3>Properties</h3>
      {selectedElement.type === "TEXT" && (
        <>
          <div>
            <label>Font Size:</label>
            <input
              type="number"
              value={parseInt(properties.fontSize)}
              onChange={(e) =>
                handlePropertyChange("fontSize", `${e.target.value}px`)
              }
              style={{ width: "100%", margin: "5px 0" }}
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="color"
              value={properties.color}
              onChange={(e) => handlePropertyChange("color", e.target.value)}
              style={{ width: "100%", margin: "5px 0" }}
            />
          </div>
          <div>
            <label>Text Alignment:</label>
            <select
              value={properties.textAlign}
              onChange={(e) => handlePropertyChange("textAlign", e.target.value)}
              style={{ width: "100%", margin: "5px 0" }}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </>
      )}
      {/* Add more conditions for other element types if needed */}
    </div>
  );
};

export default PropertiesPanel;
