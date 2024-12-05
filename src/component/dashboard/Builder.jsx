import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import PropertiesPanel from "./PropertyPanel";
const Builder = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

  const handlePropertyChange = (property, value) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === selectedElement.id
          ? { ...el, properties: { ...el.properties, [property]: value } }
          : el
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setSelectedElement={setSelectedElement} />
      <Canvas
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        elements={elements}
        setElements={setElements}
      />
      <PropertiesPanel
        selectedElement={selectedElement}
        handlePropertyChange={handlePropertyChange}
      />
    </div>
  </DndProvider>
  );
};

export default Builder;
