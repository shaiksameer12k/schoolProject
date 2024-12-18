import React from "react";
import { useDraggable } from "@dnd-kit/core";

export const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-pointer draggable-item"
    >
      {children}
    </div>
  );
};
