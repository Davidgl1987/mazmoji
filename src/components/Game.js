import { useState } from "react";

import { createBoard } from "../gameHelper";
import GameContext from "../context/GameContext";
import Board from "./Board";
import Levels from "./Levels";
import RandomElements from "./RandomElements";

const Game = () => {
  const [matrix, setMatrix] = useState(createBoard());
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div>
      <GameContext.Provider
        value={{ matrix, setMatrix, selectedElement, setSelectedElement }}
      >
        <RandomElements />
        <Board />
        <Levels />
      </GameContext.Provider>
    </div>
  );
};

export default Game;
