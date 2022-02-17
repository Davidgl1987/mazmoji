import { useContext } from "react";
import GameContext from "../context/GameContext";

const useDragDrop = () => {
  const { matrix, setMatrix, selectedElement, setSelectedElement } =
    useContext(GameContext);

  const onDrag = (element) => {
    setSelectedElement(...element);
  };

  const onDrop = (x, y) => {
    let m = [...matrix];
    m[x][y] = selectedElement;
    setMatrix(m);
    setSelectedElement(null);
  };

  return {
    onDrag,
    onDrop,
  };
};

export default useDragDrop;
