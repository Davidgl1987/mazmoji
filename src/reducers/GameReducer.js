import {
  checkOptionPosition,
  createBoard,
  getRandomWall,
  getRandomOption,
  PERMITTED_CLASS,
  rotateMatrix,
  setOptionOnBoard,
} from "../gameHelper";
import { en } from "../langs/en";

export const initialGameState = {
  player: "",
  board: createBoard(),
  checkBoard: createBoard(),
  randomWall: getRandomWall(),
  randomOption: getRandomOption(),
  selectedOption: null,
  turns: 0,
  message: {
    text: en.DRAG_PIECE,
    class: "",
  },
};

export const ACTIONS = {
  GENERATE_OPTIONS: "GENERATE_OPTIONS",
  ROTATE_WALL: "ROTATE_WALL",
  CLEAR_CHECK_OPTION: "CLEAR_CHECK_OPTION",
  CHECK_OPTION_POSITION: "CHECK_OPTION_POSITION",
  SET_OPTION_ON_BOARD: "SET_OPTION_ON_BOARD",
  SET_OPTION_ON_LEVELS: "SET_OPTION_ON_LEVELS",
};

export const GameReducer = (state, action) => {
  const { value } = action;
  switch (action.type) {
    case ACTIONS.GENERATE_OPTIONS:
      return {
        ...state,
        randomOption: getRandomOption(),
        randomWall: getRandomWall(),
      };
    case ACTIONS.ROTATE_WALL:
      let randWall = [...state.randomWall];
      randWall = rotateMatrix(randWall);
      return { ...state, randomWall: randWall };
    case ACTIONS.CLEAR_CHECK_OPTION:
      return { ...state, checkBoard: createBoard() };
    case ACTIONS.CHECK_OPTION_POSITION:
      const { checkBoard, error_text } = checkOptionPosition(
        state.board,
        value.x,
        value.y,
        value.tiles,
        value.touched
      );
      return {
        ...state,
        checkBoard,
        message: {
          text: error_text ? error_text : en.GOOD_PLACE,
          class: error_text ? "forbidden" : "permitted",
        },
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
        randomWall: permitted ? getRandomWall() : state.randomWall,
        randomOption: permitted ? getRandomOption() : state.randomOption,
        turns: permitted ? state.turns + 1 : state.turns,
        message: {
          text: en.DRAG_PIECE,
          class: "",
        },
      };
    case ACTIONS.SET_OPTION_ON_LEVELS:
      return { ...state };

    default:
      throw new Error("Acción no permitida");
  }
};
