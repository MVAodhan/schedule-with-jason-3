import { useDroppable } from "@dnd-kit/core";

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${props.id}`,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full h-full bg-slate-100">
      {props.children}
    </div>
  );
}
export default Droppable;
