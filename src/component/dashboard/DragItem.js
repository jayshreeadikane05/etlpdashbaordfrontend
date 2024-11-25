import React from "react";
import { useDrag } from "react-dnd";

const DragItem = ({ type, children }) => {
  const [, dragRef] = useDrag(() => ({
    type,
    item: { type },
  }));

  return (
    <div
      ref={dragRef}
      style={{
        padding: "10px",
        margin: "5px 0",
        border: "1px solid #ccc",
        cursor: "grab",
        background: "#000",
      }}
    >
      {children}
    </div>
  );
};

export default DragItem;
