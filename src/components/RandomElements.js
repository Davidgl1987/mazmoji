import Element from "./Element";
import { isWall } from "../gameHelper";
import { useGameContext } from "../context/GameContext";
import { ACTIONS } from "../reducers/GameReducer";

const RandomElements = () => {
  const { state, dispatch } = useGameContext();
  const { randomOptions } = state;
  const rotateOption = (optionIndex) => {
    dispatch({
      type: ACTIONS.ROTATE_OPTION,
      value: optionIndex,
    });
  };

  return (
    <div className="random-elements">
      <h4>Choose element</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          margin: "1em 0",
        }}
      >
        {randomOptions.map((randomOption, i) => (
          <div key={i}>
            <h5>Option {i + 1}</h5>
            <div style={{ height: 32 * 3 + "px" }}>
              <Element tiles={randomOption} />
            </div>
            {isWall(randomOption) && (
              <div style={{ margin: "1em" }}>
                <button onClick={() => rotateOption(i)}>Rotate 🔄</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomElements;
