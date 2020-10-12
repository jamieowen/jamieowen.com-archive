import * as tx from "../__old2/layouts/@thi.ng/transducers";
import { Node, XFormArray, NodeIterable } from "./Node";

type GridOpts = {
  fromX: number;
  fromY: number;
  // parent:Node, ? or step..
  stepX: number;
  stepY: number;
};

/**
 *
 * A grid iterator that produces a 2d grid of nodes.
 * Each node has a unique id given its position in 2d space.
 *
 * @param x The number of columns in the grid.
 * @param y The number of rows in the grid.
 * @param fromX The start x
 * @param fromY The start y
 */
export const grid = (
  x: number,
  y: number,
  xform: XFormArray = null,
  fromX: number = 0,
  fromY: number = 0
  // parent:Node = null ? Or STEP?
) => {
  const iterable = tx.range2d(fromX, fromX + x, fromY, fromY + y);

  const iterator: NodeIterable = tx.iterator(
    tx.comp(
      tx.mapIndexed((i: number, rng: any) => {
        const node = new Node(xform, null);
        node.seed = {
          x: rng[0],
          y: rng[1],
        };
        return node;
      })
    ),
    iterable
  );

  return new Node(xform, iterator);
};
