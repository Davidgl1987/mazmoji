import Board from "./components/Board";
import RandomElements from "./components/RandomElements";
import Levels from "./components/Levels";
import Game from "./components/Game";

const App = () => {
  return (
    <div className="App">
      <header>
        <h3>Mazmoti</h3>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
};

export default App;
