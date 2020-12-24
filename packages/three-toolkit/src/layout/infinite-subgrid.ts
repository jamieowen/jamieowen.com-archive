import { ISubscribable, sync } from "@thi.ng/rstream";
import { comp, iterator, map, range2d } from "@thi.ng/transducers";
import { ChangeMap } from "./change-map";
import { szudzikPairSigned } from "./pairing-functions";
import { SubGridCell, SubGridOpts } from "./grid-types";

/**
 *
 * Return an infinite grid iterator given a start position,
 * grid cell and viewport dimensions.
 *
 * @param position
 * @param opts
 */
export const infiniteSubGridIterator = (
  position: [number, number],
  opts: SubGridOpts
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
        } as SubGridCell;
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
export function infiniteSubGrid<T = any>(
  position: ISubscribable<[number, number]>,
  opts: ISubscribable<SubGridOpts>,
  handle: {
    add: (cell: SubGridCell) => T;
    remove: (id: number, handler: T) => void;
    update: (cell: SubGridCell, handler: T) => void;
  }
) {
  const changeMap = new ChangeMap<number, T>();
  let res = [];
  return sync({
    src: {
      position,
      opts,
    },
    xform: map(({ opts, position }) => {
      const gridIterator = infiniteSubGridIterator(position, opts);
      res.splice(0);
      for (let cell of gridIterator) {
        const handler = changeMap.set(cell.id, () => handle.add(cell));
        handle.update(cell, handler);
        res.push(cell);
      }
      changeMap.next((id, val) => handle.remove(id, val));
      return res;
    }),
  });
}
