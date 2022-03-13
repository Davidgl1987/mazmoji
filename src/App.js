import Game from "./pages/Game";
import { GameContextProvider } from "./context/GameContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Play } from "./pages/Play";

const App = () => {
  return (
    <div className="App">
      <header>
        <h3>Mazmoji</h3>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path="mazmoji"
              element={
                <GameContextProvider>
                  <Game />
                </GameContextProvider>
              }
            />
            <Route path="mazmoji/:encDungeon" element={<Play />} />
            <Route path="*" element={<div>NO HAY PAGINA</div>} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
