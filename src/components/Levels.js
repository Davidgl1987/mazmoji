import { useGameContext } from "../context/GameContext";
import { ELEMENTS } from "../gameHelper";

const Levels = () => {
  const { state } = useGameContext();
  const { levels } = state;
  return (
    <div className="levels">
      <h5>Levels</h5>
      <div className="container">
        <div className="square">
          {ELEMENTS.DIAMOND.img} {levels.DIAMOND}
        </div>
        <div className="square">
          {ELEMENTS.SPIDER.img} {levels.SPIDER}
        </div>
        <div className="square">
          {ELEMENTS.SNAKE.img} {levels.SNAKE}
        </div>
        <div className="square">
          {ELEMENTS.CTHULHU.img} {levels.CTHULHU}
        </div>
        <div className="square">
          {ELEMENTS.TRAP.img} {levels.TRAP}
        </div>
      </div>
    </div>
  );
};

export default Levels;
