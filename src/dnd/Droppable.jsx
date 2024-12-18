import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-full p-4 border-2 border-dashed ${isOver ? "bg-gray-200" : ""}`}
    >
      {children}
    </div>
  );
};
