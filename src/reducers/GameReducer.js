import { createBoard, getOptions, rotateMatrix } from "../gameHelper";

export const initialGameState = {
  player: "",
  board: createBoard(),
  randomOptions: getOptions(),
  selectedOption: null,
  turns: 0,
  levels: {
    SPIDER: 1,
    SNAKE: 1,
    CTHULHU: 1,
    TRAP: 1,
    DIAMOND: 1,
  },
};

export const ACTIONS = {
  GENERATE_OPTIONS: "GENERATE_OPTIONS",
  ROTATE_OPTION: "ROTATE_OPTION",
  SELECT_OPTION: "SELECT_OPTION",
  CHECK_OPTION_POSITION: "CHECK_OPTION_POSITION",
  SET_OPTION_ON_BOARD: "SET_OPTION_ON_BOARD",
  SET_OPTION_ON_LEVELS: "SET_OPTION_ON_LEVELS",
};

export const GameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GENERATE_OPTIONS:
      return { ...state, randomOptions: getOptions() };
    case ACTIONS.ROTATE_OPTION:
      let randOpt = [...state.randomOptions];
      randOpt[action.value] = rotateMatrix(randOpt[action.value]);
      return { ...state, randomOptions: [...randOpt] };
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
