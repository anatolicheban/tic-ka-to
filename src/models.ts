export type Field = null | "K" | "T";

export type Turn = Exclude<Field, null>;

export type GameMatrix = [
  [Field, Field, Field],
  [Field, Field, Field],
  [Field, Field, Field],
];

export type CoordNum = 0 | 1 | 2;

export type Coord = [CoordNum, CoordNum];

export const combinations: [Coord, Coord, Coord][] = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];
