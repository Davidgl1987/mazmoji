import Square from "./Square";
import { DropTarget } from "react-drag-drop-container";
import { useGameContext } from "../context/GameContext";

const Board = () => {
  const { state } = useGameContext();
  const { board: matrix } = state;

  return (
    <div className="board-container">
      <table>
        <tbody>
          {matrix.map((row, x) => (
            <tr key={x}>
              {row.map((cell, y) => (
                <td key={y}>
                  <DropTarget
                    style={{ background: "grey" }}
                    targetKey="square"
                    onDragEnter={({ dragData }) =>
                      console.log("dragenter", dragData)
                    }
                    onDragLeave={({ dragData }) =>
                      console.log("dragleave", dragData)
                    }
                  >
                    <Square content={cell} />
                  </DropTarget>
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
