import { GameContextProvider } from "../context/GameContext";
import Board from "./Board";
import Levels from "./Levels";
import { Messages } from "./Messages";
import RandomElements from "./RandomElements";

const Game = () => {
  return (
    <GameContextProvider>
      <Messages />
      <div className="ui">
        <RandomElements />
        <Board />
        <Levels />
      </div>
    </GameContextProvider>
  );
};

export default Game;
