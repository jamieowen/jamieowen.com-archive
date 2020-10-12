import * as tx from "./@thi.ng/transducers";
import { BoundsNode, Node } from "../nodes";
import { CreateChild, createBounds, BoundsInfo } from "./subdivide";

export type GridOpts = {
  w: number;
  h: number;
  sx: number;
  sy: number;
  offset?: boolean;
  ox?: number;
};

const defaultOpts: GridOpts = {
  w: 4,
  h: 4,
  sx: 1,
  sy: 1,
  offset: false,
};

export function grid(
  parent: Node,
  opts?: GridOpts,
  create: CreateChild = createBounds
) {
  opts = Object.assign({}, defaultOpts, opts);

  let mapOffset = tx.noop();
  if (opts.offset) {
    const ox = opts.sx * 0.5;
    mapOffset = tx.mapIndexed((i, b: BoundsInfo) => {
      b.x -= ox * (b.iy % 2);
      return b;
    });
  }

  return tx.iterator(
    tx.comp(
      tx.mapIndexed((i, r) => {
        const ix: number = r[0];
        const iy: number = r[1];
        const x: number = ix * opts.sx;
        const y: number = iy * opts.sy;
        const w: number = opts.sx;
        const h: number = opts.sy;
        return { x, y, w, h, ix, iy };
      }),
      mapOffset,
      tx.mapIndexed((i, x) => {
        // console.log( 'Create grid',i,x);
        return create(i, x, parent);
      })
    ),
    tx.range2d(opts.w, opts.h)
  );
}

const defaultOffsetOpts: GridOpts = Object.assign({}, defaultOpts, {
  offset: true,
});

export function gridOffset(
  parent: Node,
  opts?: GridOpts,
  create?: CreateChild
) {
  opts = Object.assign({}, defaultOffsetOpts, opts);
  return grid(parent, opts, create);
}
