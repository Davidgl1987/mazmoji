import Game from "./components/Game";
import { GameContextProvider } from "./context/GameContext";

const App = () => {
  return (
    <div className="App">
      <header>
        <h3>Mazmoji</h3>
      </header>
      <main>
        <GameContextProvider>
          <Game />
        </GameContextProvider>
      </main>
    </div>
  );
};

export default App;
