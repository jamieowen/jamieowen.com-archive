import { map } from "@thi.ng/transducers";

export const X = undefined;
type ID = number | undefined;

export type Pattern = ID[][];

export type Tile = {
  id: number;
  w: number;
  h: number;
  x: number;
  y: number;
};

export type PatternDefinition = {
  width: number;
  height: number;
  tiles: Tile[];
};

export const compilePattern = (pattern: Pattern): PatternDefinition => {
  const tileMap = new Map<
    ID,
    {
      id: ID;
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
      tiles: {
        x: number;
        y: number;
      }[]; // store the x,y & min x/y values.
    }
  >();
  for (let y = 0; y < pattern.length; y++) {
    const row = pattern[y];
    for (let x = 0; x < row.length; x++) {
      const id = pattern[y][x];
      if (tileMap.has(id)) {
        const info = tileMap.get(id);
        info.minX = Math.min(info.minX, x);
        info.maxX = Math.max(info.maxX, x);
        info.minY = Math.min(info.minY, y);
        info.maxY = Math.max(info.maxY, y);
        info.tiles.push({ x, y });
      } else {
        const info = {
          id,
          minX: x,
          maxX: x,
          minY: y,
          maxY: y,
          tiles: [{ x, y }],
        };
        tileMap.set(id, info);
      }
    }
  }

  const tiles = [
    ...map(([key, i]): Tile => {
      const w = i.maxX - i.minX + 1;
      const h = i.maxY - i.minY + 1;
      /** ensuret tiles are rectangular ( No 'L' shapes ) **/
      /** and also we can handle a NxN internal island cases */
      /** undefined cells do not count and only determine overlapped areas **/

      if (i.id !== X && w * h !== i.tiles.length) {
        throw new Error("Tiles must maintain a rectangular shape.");
      }

      return {
        id: i.id,
        w,
        h,
        x: i.minX,
        y: i.minY,
      };
    }, tileMap),
  ].sort((a, b) => a.id - b.id);
  return {
    width: pattern[0].length,
    height: pattern.length,
    tiles,
  };
};
