import Element from "./Element";
import { ELEMENT_TYPES } from "../gameHelper";
import Draggable from "./Draggable";

const RandomElements = () => {
  return (
    <div>
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
          <Draggable content={ELEMENT_TYPES.WALL}>
            <Element type={ELEMENT_TYPES.WALL} />
          </Draggable>
        </div>
        <div>
          <span>Option 2</span>
          <Draggable content={ELEMENT_TYPES.SNAKE}>
            <Element type={ELEMENT_TYPES.SNAKE} />
          </Draggable>
        </div>
        <div>
          <span>Option 3</span>
          <Draggable content={ELEMENT_TYPES.SPIDER}>
            <Element type={ELEMENT_TYPES.SPIDER} />
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default RandomElements;
