export const BOARD_HEIGHT = 7;
export const BOARD_WIDTH = 10;

export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(null));
};

export const MAX_TURNS = 20;

export const PROBABILITIES = {
  WALL: 0.8,
  MONSTER: 0.65,
  TRAP: 0.15,
  LEVEL: 0.2,
  DIAMOND: 0.2,
};

export const getOptions = () => {};

export const ELEMENT_TYPES = {
  GROUND: "⬜",
  WALL: "🟫",
  SPIDER: "🕷️",
  SNAKE: "🐍",
  CTHULHU: "🦑",
  DIAMOND: "💎",
  TRAP: "♨️",
};

export const WALL_GROUPS = [
  [
    [null, null, ELEMENT_TYPES.WALL],
    [null, ELEMENT_TYPES.WALL, null],
    [ELEMENT_TYPES.WALL, null, null],
  ],
  [
    [ELEMENT_TYPES.WALL, null, null],
    [null, ELEMENT_TYPES.WALL, null],
    [ELEMENT_TYPES.WALL, null, null],
  ],
  [
    [null, null, ELEMENT_TYPES.WALL],
    [ELEMENT_TYPES.WALL, ELEMENT_TYPES.WALL, null],
    [null, null, null],
  ],
  [
    [null, null, null],
    [ELEMENT_TYPES.WALL, ELEMENT_TYPES.WALL, ELEMENT_TYPES.WALL],
    [null, null, null],
  ],
  [
    [ELEMENT_TYPES.WALL, null],
    [ELEMENT_TYPES.WALL, null],
  ],
  [
    [ELEMENT_TYPES.WALL, null],
    [null, ELEMENT_TYPES.WALL],
  ],
];

export const MONSTER_GROUPS = [
  [
    ELEMENT_TYPES.SPIDER,
    ELEMENT_TYPES.SPIDER,
    ELEMENT_TYPES.SPIDER,
    ELEMENT_TYPES.SPIDER,
  ],
  [ELEMENT_TYPES.SPIDER, ELEMENT_TYPES.SPIDER, ELEMENT_TYPES.SNAKE],
  [ELEMENT_TYPES.SPIDER, ELEMENT_TYPES.SNAKE, ELEMENT_TYPES.SNAKE],
  [ELEMENT_TYPES.SPIDER, ELEMENT_TYPES.CTHULHU],
  [ELEMENT_TYPES.CTHULHU],
];
