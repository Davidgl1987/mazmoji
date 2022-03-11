import Element from "./Element";
import { useGameContext } from "../context/GameContext";
import { ACTIONS } from "../reducers/GameReducer";

const RandomElements = () => {
  const { state, dispatch } = useGameContext();
  const { randomOption, randomWall } = state;
  const rotateWall = () => {
    dispatch({
      type: ACTIONS.ROTATE_WALL,
    });
  };

  return (
    <div className="random-elements">
      <div>
        <div style={{ margin: "1em" }}>
          <button onClick={rotateWall}>Rotate 🔄</button>
        </div>
        <Element tiles={randomWall} />
      </div>
      <div>
        <Element tiles={randomOption} />
      </div>
    </div>
  );
};

export default RandomElements;
