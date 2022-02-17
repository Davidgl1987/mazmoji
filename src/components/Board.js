import { useContext } from "react";
import GameContext from "../context/GameContext";
import useDragDrop from "../hooks/useDragDrop";
import Element from "./Element";

const Board = () => {
  const { matrix } = useContext(GameContext);
  const { onDrop: onDropHook } = useDragDrop();
  const onDragOver = (e, x, y) => {
    e.preventDefault();
    console.log("dragOver", x, y);
  };

  const onDrop = (e, x, y) => {
    e.preventDefault();
    onDropHook(x, y);
  };

  return (
    <div className="board-container">
      <table>
        <tbody>
          {matrix.map((row, x) => (
            <tr key={x}>
              {row.map((cell, y) => (
                <td key={y}>
                  <div
                    onDragOver={(e) => onDragOver(e, x, y)}
                    onDrop={(e) => onDrop(e, x, y)}
                  >
                    <Element type={cell} x={x} y={y} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
