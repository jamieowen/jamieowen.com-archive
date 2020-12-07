import { DeferredNodeDecl, breadthFirstIterator } from "../decl";
import {
  BranchNode,
  GroupNode,
  BoundsNode,
  PointNode,
  RectNode,
  SubDivideNode,
} from "../nodes";
import * as tx from "../__old2/layouts/@thi.ng/transducers";

type childRfn = (i: number) => any; // shoudl return array.
const noop: childRfn = () => [];

export const root = (children = []) => group((i) => children);

// export const branch = (rfn:childRfn=noop):DeferredNodeDecl => new DeferredNodeDecl(rfn,BranchNode)
export const group = (rfn: childRfn = noop): DeferredNodeDecl =>
  new DeferredNodeDecl(rfn, GroupNode);

export type rectOpts = {
  w: number;
  h: number;
};

export function rect(opts: rectOpts, rfn: childRfn = noop): DeferredNodeDecl;
export function rect(rfn: childRfn = noop): DeferredNodeDecl;
export function rect(p1, p2): DeferredNodeDecl {
  const ops = [(n) => (n.width = 10), (n) => (n.width = 10)];

  const c = (i) => {
    p1(i);
    return [];
  };

  return new DeferredNodeDecl(c, RectNode);
}

export type SubDivideOpts = {
  width: number;
  height: number;
  xWeights?: null;
  yWeights?: null;
};

export function deferredNode(childRfn, NodeType) {
  return new DeferredNodeDecl(childRfn, NodeType);
}

export type BoundsInfoFunc = (
  i: number,
  x: number,
  y: number,
  w: number,
  h: number
) => DeferredNodeDecl;

export function subdivide(
  opts: SubDivideOpts,
  createNode: BoundsInfoFunc
): DeferredNodeDecl {
  return deferredNode(function(i) {
    console.log("SUB NODE");
    // return [];
    // we receive created node??
    const { width, height } = opts;
    const x = Math.max(1, width);
    const y = Math.max(1, height);

    //   const xWeights = new Array(x).fill(1/x); // todo, custom weights.
    //   const yWeights = new Array(y).fill(1/y);

    //   const xPos = weightsToPositions(xWeights);
    //   const yPos = weightsToPositions(yWeights);

    const it = tx.iterator(
      tx.mapIndexed((i, r) => {
        return createNode(i);
      }),
      tx.range2d(x, y)
    );

    return [...it];
  }, SubDivideNode);
}

// gen.subdivide( {w:2,h:2},{i,w,h,x,y}=>[
//   gen.rect([
//     ops.size([w,h]),
//     ops.position([x,y])
//   ]
// ])
