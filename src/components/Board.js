import Square from "./Square";
import { DropTarget } from "react-drag-drop-container";
import { ACTIONS } from "../reducers/GameReducer";
import { BOARD_WIDTH } from "../gameHelper";

const Board = ({ board, checkBoard, dispatch, onlyView = false }) => {
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
      <table className="entrada-salida">
        <tbody>
          <tr>
            {[...Array(BOARD_WIDTH).keys()].map((i) => (
              <td key={i}>{i === 0 ? <Square content={"🔻"} /> : null}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <td key={x} className={!onlyView ? checkBoard[y][x] : ""}>
                  {onlyView && <Square content={cell} />}
                  {!onlyView && (
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
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="entrada-salida">
        <tbody>
          <tr>
            {[...Array(BOARD_WIDTH).keys()].map((i) => (
              <td key={i}>
                {i === BOARD_WIDTH - 1 ? <Square content={"🔻"} /> : null}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Board;
