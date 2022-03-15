import { useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import { decryptBoard } from "../gameHelper";

export const Play = () => {
  const { encDungeon } = useParams();
  const [gesture, setGesture] = useState({ move: null });
  const initGesture = (e) => {
    let { clientX, clientY } = e;
    if (!clientX || !clientY) {
      let [touch] = e.touches;
      clientX = touch.clientX;
      clientY = touch.clientY;
    }
    setGesture({
      vertical: clientY,
      horizontal: clientX,
      state: "init",
      move: null,
    });
  };
  const endGesture = (e) => {
    let { clientX, clientY } = e;
    if (!clientX || !clientY) {
      let [touch] = e.changedTouches;
      clientX = touch.clientX;
      clientY = touch.clientY;
    }
    const vertical = clientY - gesture.vertical;
    const horizontal = clientX - gesture.horizontal;
    const move =
      Math.abs(vertical) > Math.abs(horizontal)
        ? vertical > 0
          ? "D"
          : "U"
        : horizontal > 0
        ? "R"
        : "L";
    setGesture({
      vertical: clientY,
      horizontal: clientX,
      state: "end",
      move,
    });
    console.log(move);
  };
  return (
    <div className="emoji" style={{ fontSize: "x-large" }}>
      <div
        style={{ position: "relative" }}
        onTouchStart={initGesture}
        onTouchEnd={endGesture}
        onMouseDown={initGesture}
        onMouseUp={endGesture}
      >
        <code
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <Board mode={"play"} board={decryptBoard(encDungeon)} />
      </div>
      Gesture: {gesture.move}
    </div>
  );
};

// http://localhost:3000/mazmoji/TlVXQU5VTlVOVU5VTlVOVQpTTldBRElXQVdBV0FXQU5VClRSV0FXQU5VTlVTUE5VTlUKU1BOVU5VTlVOVVdBV0FOVQpOVU5VTlVOVU5VV0FXQUNUCk5VTlVOVU5VTlVOVUNUTlUK
