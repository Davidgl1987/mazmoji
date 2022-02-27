import { GameContextProvider } from "../context/GameContext";
import Board from "./Board";
import Levels from "./Levels";
import RandomElements from "./RandomElements";

const Game = () => {
  return (
    <GameContextProvider>
      <div className="ui">
        <RandomElements />
        <Levels />
      </div>
      <Board />
    </GameContextProvider>
  );
};

export default Game;
