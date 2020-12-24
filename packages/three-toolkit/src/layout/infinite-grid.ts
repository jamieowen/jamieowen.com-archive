import { ISubscribable, sync } from "@thi.ng/rstream";
import { comp, iterator, map, range2d } from "@thi.ng/transducers";
import { szudzikPairSigned } from "./pairing-functions";

export type GridOpts = {
  // Dimensions of each grid cell
  dimensions: [number, number];
  // Size of viewport
  viewport: [number, number];
};

export type GridCell = {
  id: number;
  world: [number, number];
  cell: [number, number];
  local: [number, number];
};

/**
 *
 * Return an infinite grid iterator given a start position,
 * grid cell and viewport dimensions.
 *
 * @param position
 * @param opts
 */
export const infiniteGridIterator = (
  position: [number, number],
  opts: GridOpts
) => {
  const [gw, gh] = opts.dimensions;
  const [vw, vh] = opts.viewport;

  const px = position[0];
  const py = position[1];

  // start cell x/y
  const xx = Math.floor(px / gw);
  const yy = Math.floor(py / gh);

  // cell row / cols
  const xc = Math.ceil(vw / gw);
  const yc = Math.ceil(vh / gh);

  const fromX = xx;
  const fromY = yy;
  const toX = xx + xc;
  const toY = yy + yc;

  return iterator(
    comp(
      map(([x, y]) => {
        const wx = x * gw;
        const wy = y * gh;
        const id = szudzikPairSigned(x, y);
        return {
          id,
          cell: [x, y],
          world: [wx, wy],
          local: [wx - px, wy - py],
        } as GridCell;
      })
    ),
    range2d(fromX, toX, fromY, toY)
  );
};

/**
 * Creates a reactive infinite grid with
 * @param position
 * @param opts
 */
export function infiniteGrid<T = any>(
  position: ISubscribable<[number, number]>,
  opts: ISubscribable<GridOpts>,
  handle: {
    add: (cell: GridCell) => T;
    remove: (id: number, handler: T) => void;
    update: (cell: GridCell, handler: T) => void;
  }
) {
  let prev = new Map<number, T>();
  let visible = new Map<number, T>();
  let swap: any;
  let res = [];

  return sync({
    src: {
      position,
      opts,
    },
    xform: map(({ opts, position }) => {
      const gridIterator = infiniteGridIterator(position, opts);
      res.splice(0);
      for (let cell of gridIterator) {
        let handler = prev.get(cell.id);
        if (!handler) {
          handler = handle.add(cell);
        }
        prev.delete(cell.id);
        visible.set(cell.id, handler);
        handle.update(cell, handler);
        res.push(cell);
      }
      for (let [id, handler] of prev.entries()) {
        handle.remove(id, handler);
      }
      prev.clear();
      swap = prev;
      prev = visible;
      visible = swap;
      return res;
    }),
  });
}
