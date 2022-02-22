export const BOARD_HEIGHT = 7;
export const BOARD_WIDTH = 10;

export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(null));
};

export const MAX_TURNS = 20;

export const PROBABILITIES = {
  WALL: 0.6, //0.8,
  MONSTER: 0.5, //0.65,
  TRAP: 0.4, //0.15,
  LEVEL: 0.3, //0.2,
  DIAMOND: 0.2,
};

export const ELEMENT_TYPES = {
  GROUND: "⬜",
  WALL: "🟫",
  SPIDER: "🕷️",
  SNAKE: "🐍",
  CTHULHU: "🦑",
  DIAMOND: "💎",
  TRAP: "♨️",
  LEVEL: "⬆️",
};

export const getOptions = (
  howMany = 2,
  options = Object.keys(PROBABILITIES),
  result = []
) => {
  if (howMany === 0) return result;
  const randomKeyElem = Math.floor(Math.random() * (options.length + 1));
  const randomElem = options[randomKeyElem];
  let elem = ELEMENT_TYPES[randomElem];
  const randomProb = Math.random();
  if (PROBABILITIES[randomElem] >= randomProb) {
    switch (randomElem) {
      case "MONSTER":
        elem =
          MONSTER_GROUPS[Math.floor(Math.random() * MONSTER_GROUPS.length)];
        break;
      case "WALL":
        elem = WALL_GROUPS[Math.floor(Math.random() * WALL_GROUPS.length)];
        break;
      default:
        elem = [[elem]];
    }
    options.splice(randomKeyElem, 1);
    return getOptions(howMany - 1, options, result.concat([elem]));
  } else {
    if (options.length === 0) options = Object.keys(PROBABILITIES);
    return getOptions(howMany, options, result);
  }
};

export const WALL_GROUPS = [
  [
    [null, null, ELEMENT_TYPES.WALL],
    [null, ELEMENT_TYPES.WALL, null],
    [ELEMENT_TYPES.WALL, null, null],
  ],
  [
    [ELEMENT_TYPES.WALL, null],
    [null, ELEMENT_TYPES.WALL],
    [ELEMENT_TYPES.WALL, null],
  ],
  [
    [null, null, ELEMENT_TYPES.WALL],
    [ELEMENT_TYPES.WALL, ELEMENT_TYPES.WALL, null],
  ],
  [[ELEMENT_TYPES.WALL, ELEMENT_TYPES.WALL, ELEMENT_TYPES.WALL]],
  [[ELEMENT_TYPES.WALL], [ELEMENT_TYPES.WALL]],
  [
    [ELEMENT_TYPES.WALL, null],
    [null, ELEMENT_TYPES.WALL],
  ],
];

export const MONSTER_GROUPS = [
  [
    [[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SPIDER]],
    [[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SPIDER]],
  ],
  [[[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SPIDER]], [[ELEMENT_TYPES.SNAKE]]],
  [[[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SNAKE]], [[ELEMENT_TYPES.SNAKE]]],
  [[[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.CTHULHU]]],
  [[ELEMENT_TYPES.CTHULHU]],
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
    tiles.findIndex((r) => r.findIndex((c) => c === ELEMENT_TYPES.WALL) > -1) >
    -1
  );
};

export const checkOptionPosition = (board, x, y, tile) => {
  // Devuelve un tablero con la pieza (tile) en la posición xy
  // comprobando lo que ya hay en board
  let checkBoard = createBoard();
  let permitted = true;
  // No se puede colocar en la entrada
  if (x === 0 && y === 0) permitted = false;
  // Ni en la salida
  if (x === BOARD_WIDTH - 1 && y === BOARD_HEIGHT - 1) permitted = false;
  // Ni en una casilla ocupada
  if (board[y][x] !== null) permitted = false;
  // Si cierra una parte de la mazmorra
  // TODO: Llamar A* para cada casilla vacía
  if (isWall(tile)) {
    // Si alguna pieza que compone el tile...
    for (let i = 0; i < tile.length; i++) {
      for (let j = 0; j < tile[i].length; j++) {
        // ...se sale del tablero
        if (x + j >= BOARD_WIDTH || y + i >= BOARD_HEIGHT) permitted = false;
        // ...es la de salida
        if (x + j === BOARD_WIDTH - 1 && y + i === BOARD_HEIGHT - 1)
          permitted = false;
        // ...está ocupada
        if (board[i][j] !== null) permitted = false;
        // ...cierra una parte de la mazmorra
        // TODO: Llamar A* para cada casilla vacía
      }
    }
  }

  // Coloreamos el checkBoard
  if (isWall(tile)) {
    for (let i = 0; i < tile.length; i++) {
      for (let j = 0; j < tile[i].length; j++) {
        if (tile[i][j] !== null && x + j < BOARD_WIDTH && y + i < BOARD_HEIGHT)
          checkBoard[y + i][x + j] = permitted ? "permitted" : "forbidden";
      }
    }
  } else {
    checkBoard[y][x] = permitted ? "permitted" : "forbidden";
  }
  return checkBoard;
};
