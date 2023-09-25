"use client";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { useState } from "react";

const Page = () => {
  const [isDropped, setIsDropped] = useState<any>(false);
  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "droppable-1") {
      setIsDropped(true);
    }
  }
  const draggableMarkup = <Draggable>Drag me</Draggable>;
  return (
    <div className="h-screen ">
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <div className="w-full h-full flex ">
          <div className="h-full w-1/2 border border-red-500">
            <Droppable id={"1"}>
              {isDropped ? draggableMarkup : "Drop here"}
            </Droppable>
          </div>
          <div className="h-full w-1/2 border border-red-500">
            <Droppable id={"2"}>
              {isDropped ? draggableMarkup : "Drop here"}
            </Droppable>
          </div>
        </div>
        {/* <Droppable id={"2"} /> */}
      </DndContext>
    </div>
  );
};

export default Page;
