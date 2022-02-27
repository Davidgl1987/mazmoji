import Square from "./Square";
import { DropTarget } from "react-drag-drop-container";
import { useGameContext } from "../context/GameContext";
import { ACTIONS } from "../reducers/GameReducer";

const Board = () => {
  const { state, dispatch } = useGameContext();
  const { board: matrix, checkBoard } = state;

  const checkOptionPosition = (dragData, x, y) => {
    const { tiles, touched } = dragData;
    dispatch({
      type: ACTIONS.CHECK_OPTION_POSITION,
      value: { tiles, x, y, touched },
    });
  };

  const clearCheckOption = () => {
    dispatch({
      type: ACTIONS.CLEAR_CHECK_OPTION,
    });
  };

  const setOptionOnBoard = (tiles, x, y) => {
    dispatch({
      type: ACTIONS.SET_OPTION_ON_BOARD,
      value: { tiles, x, y },
    });
  };

  return (
    <div className="board-container">
      <table>
        <tbody>
          {matrix.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <td key={x} className={checkBoard[y][x]}>
                  <DropTarget
                    style={{ background: "grey" }}
                    targetKey="square"
                    onDragEnter={({ dragData }) =>
                      checkOptionPosition(dragData, x, y)
                    }
                    onDragLeave={({ dragData }) => clearCheckOption()}
                    onHit={({ dragData }) =>
                      setOptionOnBoard(dragData.tiles, x, y)
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
