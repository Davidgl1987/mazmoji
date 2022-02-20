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
    [[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SPIDER]],
    [[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SPIDER]],
  ],
  [
    [[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SPIDER]],
    [[ELEMENT_TYPES.SNAKE], null],
  ],
  [
    [[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.SNAKE]],
    [[ELEMENT_TYPES.SNAKE], null],
  ],
  [[[ELEMENT_TYPES.SPIDER], [ELEMENT_TYPES.CTHULHU]]],
  [[ELEMENT_TYPES.CTHULHU]],
];
