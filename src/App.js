import { useEffect, useState } from "react";
import Game from "./components/Game";
import { GameContextProvider } from "./context/GameContext";
import { decryptBoard } from "./gameHelper";

const App = () => {
  const [dungeon, setDungeon] = useState(null);

  useEffect(() => {
    setDungeon(window.location.pathname.split("/mazmoji/")[1]);
  }, []);

  return (
    <div className="App">
      <header>
        <h3>Mazmoji</h3>
      </header>
      <main>
        {!dungeon && (
          <GameContextProvider>
            <Game />
          </GameContextProvider>
        )}
        {dungeon && (
          <div>
            {dungeon}
            <br />
            {decryptBoard(dungeon)}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
