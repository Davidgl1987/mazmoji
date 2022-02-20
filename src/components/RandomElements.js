import Element from "./Element";
import { getOptions } from "../gameHelper";
import Draggable from "./Draggable";

const RandomElements = () => {
  const [randomElem1, randomElem2] = getOptions();
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
        <div>
          <span>Option 1</span>
          <Draggable content={randomElem1}>
            <Element tiles={randomElem1} />
          </Draggable>
        </div>
        <div>
          <span>Option 2</span>
          <Draggable content={randomElem2}>
            <Element tiles={randomElem2} />
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default RandomElements;
