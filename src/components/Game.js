import { GameContextProvider } from "../context/GameContext";
import Board from "./Board";
import Levels from "./Levels";
import RandomElements from "./RandomElements";

const Game = () => {
  return (
    <GameContextProvider>
      <RandomElements />
      <Board />
      <Levels />
    </GameContextProvider>
  );
};

export default Game;
