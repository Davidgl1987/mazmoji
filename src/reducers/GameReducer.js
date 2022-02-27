import {
  checkOptionPosition,
  createBoard,
  getRandomOption,
  PERMITTED_CLASS,
  rotateMatrix,
  setOptionOnBoard,
} from "../gameHelper";

export const initialGameState = {
  player: "",
  board: createBoard(),
  checkBoard: createBoard(),
  randomOption: getRandomOption(),
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
  const { value } = action;
  switch (action.type) {
    case ACTIONS.GENERATE_OPTIONS:
      return { ...state, randomOption: getRandomOption() };
    case ACTIONS.ROTATE_OPTION:
      let randOpt = [...state.randomOption];
      randOpt = rotateMatrix(randOpt);
      return { ...state, randomOption: randOpt };
    case ACTIONS.CLEAR_CHECK_OPTION:
      return { ...state, checkBoard: createBoard() };
    case ACTIONS.CHECK_OPTION_POSITION:
      return {
        ...state,
        checkBoard: checkOptionPosition(
          state.board,
          value.x,
          value.y,
          value.tiles,
          value.touched
        ),
      };
    case ACTIONS.SET_OPTION_ON_BOARD:
      const permitted = state.checkBoard[value.y][value.x] === PERMITTED_CLASS;
      return {
        ...state,
        checkBoard: createBoard(),
        board: setOptionOnBoard(
          state.board,
          value.x,
          value.y,
          value.tiles,
          state.checkBoard
        ),
        randomOption: permitted ? getRandomOption() : state.randomOption,
        turns: permitted ? state.turns : state.turns + 1,
      };
    case ACTIONS.SET_OPTION_ON_LEVELS:
      return { ...state };

    default:
      throw new Error("Acción no permitida");
  }
};
