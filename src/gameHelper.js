import EasyStar from "easystarjs";

import { en } from "./langs/en";

export const BOARD_HEIGHT = 6;
export const BOARD_WIDTH = 8;

export const PERMITTED_CLASS = "permitted";
export const FORBIDDEN_CLASS = "forbidden";

export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(null));
};

export const MAX_TURNS = 10;

export const ELEMENTS = {
  WALL: { img: "🟫" },
  SPIDER: { img: "🕷️", probability: 0.5 },
  SNAKE: { img: "🐍", probability: 0.4 },
  CTHULHU: { img: "🐙", probability: 0.2 },
  DIAMOND: { img: "💎", probability: 0.2 },
  TRAP: { img: "🔥", probability: 0.4 },
};

export const NULL_ELEMENT = "⬜";

export const getRandomWall = () => {
  return WALL_GROUPS[Math.floor(Math.random() * WALL_GROUPS.length)];
};

export const getRandomOption = () => {
  const options = Object.keys(ELEMENTS);
  options.splice(options.indexOf("WALL"), 1);
  const totalProbability = options.reduce(
    (prev, curr) => prev + ELEMENTS[curr].probability,
    0
  );
  const randomProbability = Math.random() * totalProbability;
  let sumProbability = 0;
  for (let i = 0; i < options.length; i++) {
    const keyElement = options[i];
    const element = ELEMENTS[keyElement];
    sumProbability += element.probability;
    if (randomProbability <= sumProbability) {
      return [[element.img]];
    }
  }
};

export const WALL_GROUPS = [
  [
    [
      ELEMENTS.WALL.img,
      ELEMENTS.WALL.img,
      ELEMENTS.WALL.img,
      ELEMENTS.WALL.img,
    ],
  ],
  [
    [ELEMENTS.WALL.img, ELEMENTS.WALL.img],
    [ELEMENTS.WALL.img, ELEMENTS.WALL.img],
  ],
  [
    [ELEMENTS.WALL.img, null],
    [ELEMENTS.WALL.img, null],
    [ELEMENTS.WALL.img, ELEMENTS.WALL.img],
  ],
  [
    [ELEMENTS.WALL.img, null],
    [ELEMENTS.WALL.img, ELEMENTS.WALL.img],
    [null, ELEMENTS.WALL.img],
  ],
  [
    [ELEMENTS.WALL.img, ELEMENTS.WALL.img, ELEMENTS.WALL.img],
    [null, ELEMENTS.WALL.img, null],
  ],
];

export const rotateMatrix = (source) => {
  // get the dimensions of the source matrix
  const M = source.length;
  const N = source[0].length;
  // create a new NxM destination array
  let destination = new Array(N);
  for (let i = 0; i < N; i++) {
    destination[i] = new Array(M);
  }
  // start copying from source into destination
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      destination[i][j] = source[M - j - 1][i];
    }
  }
  return destination;
};

export const isWall = (tiles) => {
  return (
    tiles.findIndex((r) => r.findIndex((c) => c === ELEMENTS.WALL.img) > -1) >
    -1
  );
};

export const checkOptionPosition = (board, x, y, tile, touched) => {
  // Devuelve un tablero con la pieza (tile) en la posición xy
  // comprobando lo que ya hay en board
  let checkBoard = createBoard();
  let permitted = true;
  let error_text = false;

  // Si alguna pieza que compone el tile...
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < tile[i].length; j++) {
      if (tile[i][j] === null) continue;
      // Usamos el 'touched' como offset al pintar y comprobar la posición
      let newX = x + j - touched.x;
      let newY = y + i - touched.y;
      // ...se sale del tablero
      if (newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
        permitted = false;
        error_text = en.ERROR_OUT_OF_BOARD;
      }
      // ...es la entrada
      else if (newX === 0 && newY === 0) {
        permitted = false;
        error_text = en.ERROR_ENTRANCE;
      }
      // ...es la de salida
      else if (newX === BOARD_WIDTH - 1 && newY === BOARD_HEIGHT - 1) {
        permitted = false;
        error_text = en.ERROR_EXIT;
      }
      // .. no está dentro del tablero
      else if (newX < 0 || newY < 0) {
        permitted = false;
        error_text = en.ERROR_OUT_OF_BOARD;
      }
      // ...está ocupada
      else if (board[newY][newX] !== null) {
        permitted = false;
        error_text = en.ERROR_CELL_OCCUPIED;
      }
    }
  }
  // ...cierra una parte de la mazmorra
  // Al algoritmo A* hay que pasarle un tablero con la pieza "puesta"
  let easystar = new EasyStar.js();
  let boardWithTile = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < tile[i].length; j++) {
      let newX = x + j - touched.x;
      let newY = y + i - touched.y;
      if (
        tile[i][j] !== null &&
        newX < BOARD_WIDTH &&
        newY < BOARD_HEIGHT &&
        newX >= 0 &&
        newY >= 0
      ) {
        if (permitted) boardWithTile[newY][newX] = tile[i][j];
      }
    }
  }
  easystar.setGrid(boardWithTile);
  let acceptableTiles = Object.keys(ELEMENTS).reduce(
    (prev, curr) =>
      curr === "WALL" ? prev : prev.concat([ELEMENTS[curr].img]),
    [null]
  );
  easystar.setAcceptableTiles(acceptableTiles);

  // Todas las casillas tienen que ser accesibles
  if (permitted) {
    for (let i = 0; i < boardWithTile.length; i++) {
      const row = boardWithTile[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if ((i === 0 && j === 0) || cell === ELEMENTS.WALL.img) continue;
        let path = null;
        easystar.findPath(0, 0, j, i, function (resultPath) {
          path = resultPath;
        });
        easystar.enableSync();
        easystar.calculate();
        if (path === null) {
          permitted = false;
          error_text =
            j === BOARD_WIDTH - 1 && i === BOARD_HEIGHT - 1
              ? en.ERROR_NO_WAY_OUT
              : en.ERROR_ISOLATED_CELLS;
        }
        if (!permitted) break;
      }
      if (!permitted) break;
    }
  }

  // Coloreamos el checkBoard
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < tile[i].length; j++) {
      let newX = x + j - touched.x;
      let newY = y + i - touched.y;
      if (
        tile[i][j] !== null &&
        newX < BOARD_WIDTH &&
        newY < BOARD_HEIGHT &&
        newX >= 0 &&
        newY >= 0
      ) {
        checkBoard[newY][newX] = permitted ? PERMITTED_CLASS : FORBIDDEN_CLASS;
      }
    }
  }
  return { checkBoard, error_text, permitted };
};

export const setOptionOnBoard = (board, x, y, tile, checkBoard) => {
  let tileType = null;
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < tile[i].length; j++) {
      const t = tile[i][j];
      if (t !== null) {
        tileType = t;
        break;
      }
    }
    if (tileType !== null) break;
  }
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const permitted = checkBoard[i][j] === PERMITTED_CLASS;
      if (permitted) board[i][j] = tileType;
    }
  }
  return board;
};

export const getShareBoard = (board) => {
  let sharedBoard = "";
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      sharedBoard += cell === null ? "⬜" : cell;
    }
    sharedBoard += "\n";
  }
  return sharedBoard;
};

export const getSharedLink = (shareBoard) => {
  let homepage = window.location.href;
  return homepage + "/" + encryptBoard(shareBoard);
};

export const encryptBoard = (shareBoard) => {
  let letterBoard = shareBoard;
  for (let i = 0; i < Object.keys(ELEMENTS).length; i++) {
    const key = Object.keys(ELEMENTS)[i];
    const { img } = ELEMENTS[key];
    letterBoard = letterBoard.replaceAll(img, key.substring(0, 2));
  }
  letterBoard = letterBoard.replaceAll(NULL_ELEMENT, "NULL".substring(0, 2));
  return btoa(letterBoard);
};

export const decryptBoard = (encryptedBoard) => {
  let shareBoard = atob(encryptedBoard);
  let board = [];
  let rows = shareBoard.split("\n");
  for (let i = 0; i < rows.length; i++) {
    let row = [];
    for (let j = 0; j < rows[i].length; j += 2) {
      let cell = rows[i].substring(j, j + 2);
      for (let e = 0; e < Object.keys(ELEMENTS).length; e++) {
        const key = Object.keys(ELEMENTS)[e];
        const { img } = ELEMENTS[key];
        cell = cell.replace(key.substring(0, 2), img);
      }
      if (cell === "NULL".substring(0, 2)) row.push(null);
      else row.push(cell.slice());
    }
    board.push([...row]);
  }
  return board;
};
