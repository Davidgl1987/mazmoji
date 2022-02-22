import { useGameContext } from "../context/GameContext";
import { ELEMENT_TYPES } from "../gameHelper";

const Levels = () => {
  const { state } = useGameContext();
  const { levels } = state;
  return (
    <div>
      <h4>Levels</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <strong>Diamonds</strong>
          <div className="square">
            {ELEMENT_TYPES.DIAMOND} {levels.DIAMOND}
          </div>
        </div>
        <div>
          <strong>Monsters</strong>
          <div className="square">
            {ELEMENT_TYPES.SPIDER} {levels.SPIDER}
          </div>
          <div className="square">
            {ELEMENT_TYPES.SNAKE} {levels.SNAKE}
          </div>
          <div className="square">
            {ELEMENT_TYPES.CTHULHU} {levels.CTHULHU}
          </div>
        </div>
        <div>
          <strong>Traps</strong>
          <div className="square">
            {ELEMENT_TYPES.TRAP} {levels.TRAP}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Levels;
