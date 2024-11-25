import React from "react";
import { useDrag } from "react-dnd";

const Sidebar = ({ setSelectedElement }) => {
  const items = [
    { id: 1, type: "TEXT", content: "Text Block" },
    { id: 2, type: "PARAGRAPH", content: "Paragraph Block" },
    { id: 3, type: "IMAGE", content: "Image Block" },
    { id: 4, type: "LIST", content :"List Block"},
    { id: 5, type: "BUTTON", content :"Button Block"},
    { id: 6, type: "DIVIDER", content :"Divider Block"},
    { id: 7, type: "TABLE", content :"Table Block"},
    { id: 8, type: "SPACER", content :"Spacer Block"},
    { id: 9, type: "SOCIAL", content :"Social Block"},
    { id: 10, type: "HTML", content :"Html Block"},
    { id: 11, type: "VIDEO", content :"Video Block"},
    { id: 12, type: "ICONS", content :"Icons Block"},
    { id: 13, type: "MENU", content :"Menu Block"},
    { id: 14, type: "STICKER", content :"Sticker Block"},
  ];

  return (
    <div style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}>
      <h3>Elements</h3>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} setSelectedElement={setSelectedElement} />
      ))}
    </div>
  );
};

const DraggableItem = ({ item, setSelectedElement }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: isDragging ? "lightgray" : "black",
        cursor: "move",
        border: "1px solid #ccc",
      }}
    >
      {item.content}
    </div>
  );
};

export default Sidebar;
