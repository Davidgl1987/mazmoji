import Square from "./Square";
import { ELEMENT_TYPES, isWall } from "../gameHelper";
import { DragDropContainer } from "react-drag-drop-container";

const Element = ({ tiles }) => {
  if (isWall(tiles)) {
    return (
      <DragDropContainer targetKey="square" dragData={tiles}>
        <table className="elements">
          <tbody>
            {tiles.map((row, r) => (
              <tr key={r} className="element-row">
                {row.map((col, c) => (
                  <td key={r + "_" + c}>
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
                <td key={r + "_" + c} className={"element-col " + col}>
                  <DragDropContainer targetKey="square" dragData={tiles}>
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
