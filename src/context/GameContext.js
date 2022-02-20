import { createContext, useContext, useReducer } from "react";
import { GameReducer, initialGameState } from "../reducers/GameReducer";

export const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialGameState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
