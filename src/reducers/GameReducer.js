import {
  checkOptionPosition,
  createBoard,
  getOptions,
  rotateMatrix,
} from "../gameHelper";

export const initialGameState = {
  player: "",
  board: createBoard(),
  checkBoard: createBoard(),
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
  CLEAR_CHECK_OPTION: "CLEAR_CHECK_OPTION",
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
    case ACTIONS.CLEAR_CHECK_OPTION:
      return { ...state, checkBoard: createBoard() };
    case ACTIONS.CHECK_OPTION_POSITION:
      const { tiles, x, y, touched } = action.value;
      let checkBoard = checkOptionPosition(state.board, x, y, tiles, touched);
      return { ...state, checkBoard };
    case ACTIONS.SET_OPTION_ON_BOARD:
      return { ...state };
    case ACTIONS.SET_OPTION_ON_LEVELS:
      return { ...state };

    default:
      throw new Error("Acción no permitida");
  }
};
