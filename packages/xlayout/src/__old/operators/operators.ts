import { mapIndexed, map } from "../../__old2/layouts/@thi.ng/transducers";
import { Vec } from "@thi.ng/vectors";
import { Node, BoundsNode, RectNode, CircleNode } from "../nodes";
import * as xlayout from "../XLayout";

// xlayout.createNodeOp((i,n:Node)=>(n.bounds[0]=w,n.bounds[1]=h))

export type NodeOpSet = (i: number) => any;
export const position1 = (rfn: NodeOpSet) =>
  xlayout.createNodeOp((i, n) => (n.translate = rfn(i)));
export const scale1 = (rfn: NodeOpSet) =>
  xlayout.createNodeOp((i, n) => (n.scale = rfn(i)));
export const attribute1 = (name: string, rfn: NodeOpSet) =>
  xlayout.createNodeOp((i, n) => (n.attributes[name] = rfn(i)));

export type OpRfn = (i: number, value: any, node: Node) => any;

export const mapNode = () => mapIndexed((i: number, context: XLayout) => {});

export const position = (rfn: OpRfn) =>
  mapIndexed((i: number, n: Node) => {
    n.translate = rfn(i, n.translate, n);
    return n;
  });

export const positionScale = (rfn: OpRfn) =>
  mapIndexed((i: number, n: Node) => {
    const s = rfn(i, n.translate, n);
    n.translate[0] *= s[0];
    n.translate[1] *= s[1];
    return n;
  });

export const scale = (rfn: OpRfn) =>
  mapIndexed((i: number, n: Node) => {
    n.scale = rfn(i, n.scale, n);
    return n;
  });

export const rotate = (rfn: OpRfn) =>
  mapIndexed((i: number, n: Node) => {
    n.rotate = rfn(i, n.rotate, n);
    return n;
  });

export const offset = (rfn: OpRfn) =>
  mapIndexed((i: number, n: Node) => {
    const off = rfn(i, n.translate, n);
    n.translate[0] += off[0];
    n.translate[1] += off[1];
    return n;
  });

export const attribute = (name: string, rfn: OpRfn) =>
  mapIndexed((i: number, n: Node) => {
    n.attributes[name] = rfn(i, n.attributes[name], n);
    return n;
  });

export const branch = (rfn: OpRfn) =>
  mapIndexed((i, n: Node) => {
    // const c = n.children.length-1;
    // console.log( 'Parent:', c,i );
    const r = rfn(i);
    console.log("Branch Res:", r);

    return n;
  });

export const branch2 = (rfn: OpRfn) =>
  mapIndexed((i, context: XLayout) => {
    const currentNode: Node = context.currentNode;
    // const
    const r = rfn(i);
    console.log("Branch Res:", r);

    return n;
  });

export const sizeToBounds = (rfn: OpRfn = () => {}) =>
  mapIndexed((i: number, n: Node) => {
    let factor: number = rfn(i, 1, n);
    factor = isNaN(factor) ? 1 : factor;

    if (n.parent instanceof BoundsNode) {
      const bn: BoundsNode = <BoundsNode>n.parent;
      if (n instanceof RectNode) {
        (<RectNode>n).size[0] = bn.bounds[0] * factor;
        (<RectNode>n).size[1] = bn.bounds[1] * factor;
      } else if (n instanceof CircleNode) {
        (<CircleNode>n).radius =
          Math.min(bn.bounds[0], bn.bounds[1]) * 0.5 * factor;
      }
    }
    return n;
  });

export const centerToBounds = (rfn: OpRfn = () => {}) =>
  mapIndexed((i: number, n: Node) => {
    if (n.parent instanceof BoundsNode) {
      const bn: BoundsNode = <BoundsNode>n.parent;
      n.translate[0] = bn.bounds[0] * 0.5;
      n.translate[1] = bn.bounds[1] * 0.5;
    }

    return n;
  });

// Add Tagging
// l.tagNode(10),
// l.tagNodeIndexed((i:number)=>i>3 ? 20 : 1),

// offset, translate.scale, translate.rotate?

// etc
