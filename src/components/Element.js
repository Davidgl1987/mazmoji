import Square from "./Square";
import { isWall } from "../gameHelper";
import { DragDropContainer } from "react-drag-drop-container";
import { useState } from "react";

const Element = ({ tiles }) => {
  const [touched, setTouched] = useState(null);
  if (isWall(tiles)) {
    return (
      <DragDropContainer targetKey="square" dragData={{ tiles, touched }}>
        <table className="elements">
          <tbody>
            {tiles.map((row, r) => (
              <tr key={r} className="element-row">
                {row.map((col, c) => (
                  <td
                    key={r + "_" + c}
                    onPointerDown={({ target }) => setTouched({ x: c, y: r })}
                  >
                    <div className={"element-col " + col}>
                      <Square content={col} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DragDropContainer>
    );
  } else {
    return (
      <table className="elements">
        <tbody>
          {tiles.map((row, r) => (
            <tr key={r} className="element-row">
              {row.map((col, c) => (
                <td
                  key={r + "_" + c}
                  className={"element-col " + col}
                  onPointerDown={({ target }) => setTouched({ x: c, y: r })}
                >
                  <DragDropContainer
                    targetKey="square"
                    dragData={{ tiles, touched }}
                  >
                    <div className={"element-col " + col}>
                      <Square content={col} />
                    </div>
                  </DragDropContainer>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default Element;
