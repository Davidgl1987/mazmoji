export const BOARD_HEIGHT = 8;
export const BOARD_WIDTH = 10;

export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(null));
};

export const MAX_TURNS = 20;

export const ELEMENTS = {
  WALL: { img: "🟫", probability: 2 },
  SPIDER: { img: "🕷️", probability: 0.6 },
  SNAKE: { img: "🐍", probability: 0.4 },
  CTHULHU: { img: "🦑", probability: 0.2 },
  DIAMOND: { img: "💎", probability: 0.2 },
  TRAP: { img: "♨️", probability: 0.4 },
  LEVEL: { img: "⬆️", probability: 0.2 },
};

export const getRandomOption = () => {
  const totalProbability = Object.keys(ELEMENTS).reduce(
    (prev, curr) => prev + ELEMENTS[curr].probability,
    0
  );
  const randomProbability = Math.random() * totalProbability;
  let sumProbability = 0;
  for (let i = 0; i < Object.keys(ELEMENTS).length; i++) {
    const keyElement = Object.keys(ELEMENTS)[i];
    const element = ELEMENTS[keyElement];
    sumProbability += element.probability;
    if (randomProbability <= sumProbability) {
      if (element.img === ELEMENTS.WALL.img) {
        return WALL_GROUPS[Math.floor(Math.random() * WALL_GROUPS.length)];
      }
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
        //TODO: usar el 'touched' como offset al pintar y comprobar la posición
        // ...se sale del tablero
        if (
          x + j - touched.x >= BOARD_WIDTH ||
          y + i - touched.y >= BOARD_HEIGHT
        )
          permitted = false;
        // ...es la de salida
        if (
          x + j - touched.x === BOARD_WIDTH - 1 &&
          y + i - touched.y === BOARD_HEIGHT - 1
        )
          permitted = false;
        // .. no está dentro del tablero
        if (x + j - touched.x < 0 || y + i - touched.y < 0) permitted = false;
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
        if (
          tile[i][j] !== null &&
          x + j - touched.x < BOARD_WIDTH &&
          y + i - touched.y < BOARD_HEIGHT &&
          x + j - touched.x >= 0 &&
          y + i - touched.y >= 0
        ) {
          checkBoard[y + i - touched.y][x + j - touched.x] = permitted
            ? "permitted"
            : "forbidden";
        }
      }
    }
  } else {
    checkBoard[y][x] = permitted ? "permitted" : "forbidden";
  }
  return checkBoard;
};
