import Element from "./Element";
import { isWall } from "../gameHelper";
import { useGameContext } from "../context/GameContext";
import { ACTIONS } from "../reducers/GameReducer";

const RandomElements = () => {
  const { state, dispatch } = useGameContext();
  const { randomOption } = state;
  const rotateOption = () => {
    dispatch({
      type: ACTIONS.ROTATE_OPTION,
    });
  };

  return (
    <div className="random-elements">
      <h5>Use this on board!</h5>
      <div className="container">
        {isWall(randomOption) && (
          <div style={{ margin: "1em" }}>
            <button onClick={() => rotateOption()}>Rotate 🔄</button>
          </div>
        )}
        <Element tiles={randomOption} />
      </div>
    </div>
  );
};

export default RandomElements;
