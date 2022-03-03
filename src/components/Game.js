import { GameContextProvider } from "../context/GameContext";
import Board from "./Board";
import Levels from "./Levels";
import { Messages } from "./Messages";
import RandomElements from "./RandomElements";

const Game = () => {
  return (
    <GameContextProvider>
      <div className="ui">
        <Messages />
        <RandomElements />
      </div>
      <Board />
      <Levels />
    </GameContextProvider>
  );
};

export default Game;
