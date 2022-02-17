import useDragDrop from "../hooks/useDragDrop";

const Draggable = ({ children, content }) => {
  const { onDrag } = useDragDrop();
  const onDragStart = (e, type) => {
    onDrag(content);
  };
  const onTouchStart = (e, type) => {
    console.log("onTouchStart");
    onDrag(content);
  };
  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, content)}
      onTouchStart={(e) => onTouchStart(e, content)}
    >
      {children}
    </div>
  );
};

export default Draggable;
