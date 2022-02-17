import { createBoard } from "../gameHelper";

export const initialState = {
  player: "",
  board: createBoard(),
  randomOptions: null,
  selectedOption: null,
  turns: 0,
  levels: {
    SPIDER: 1,
    SNAKE: 1,
    CTHULHU: 1,
    TRAPS: 1,
    TREASURES: 1,
  },
};

export const ACTIONS = {
  GENERATE_OPTIONS: "GENERATE_OPTIONS",
  SELECT_OPTION: "SELECT_OPTION",
  CHECK_OPTION_POSITION: "CHECK_OPTION_POSITION",
  SET_OPTION_ON_BOARD: "SET_OPTION_ON_BOARD",
  SET_OPTION_ON_LEVELS: "SET_OPTION_ON_LEVELS",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GENERATE_OPTIONS:
      return { ...state };
    case ACTIONS.SELECT_OPTION:
      return { ...state };
    case ACTIONS.CHECK_OPTION_POSITION:
      return { ...state };
    case ACTIONS.SET_OPTION_ON_BOARD:
      return { ...state };
    case ACTIONS.SET_OPTION_ON_LEVELS:
      return { ...state };

    default:
      throw new Error("Acción no permitida");
  }
};
