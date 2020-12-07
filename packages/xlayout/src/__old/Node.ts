import * as tx from "../__old2/layouts/@thi.ng/transducers";

type NodeIterable = Iterable<Node>;
export type XFormArray = Array<tx.TxLike<any, any>>;

type Guid = {
  id: number; // global unique id
  yid: number; // yield id - ( in current iteration )
};
type Range2 = {
  x: number;
  y: number;
};
type Range3 = {
  x: number;
  y: number;
  z: number;
};

export class Node implements NodeIterable {
  // Correct Typescript interface??

  // public guid:Guid; // ? Needed? Could be generated when needed
  // Store current range - this is enough to generate a unique id when required
  public seed: Range2 | Range3;

  public xform: XFormArray;
  public iterable: any; // ( 2d iterable type? )
  public isBranch: boolean = false;
  public attributes: Map<string, any> = new Map();

  constructor(xform?: XFormArray, iterable?: NodeIterable) {
    this.xform = xform;
    this.iterable = iterable;
    this.isBranch = !!iterable;
  }

  *[Symbol.iterator]() {
    // why 2 types for iterator?
    let reduce;
    if (this.xform) {
      console.log("Reduce XFORM :", this.xform);
      // Based on tx.iterator source
      const rfn = tx.comp.apply(this, this.xform)(tx.push());
      const complete = rfn[1];
      reduce = rfn[2];
    } else {
      reduce = (a, x) => (a.push(x), a);
    }

    for (let n of this.iterable) {
      // yield node;
      const nn = reduce([], n)[0];
      // console.log( nn );
      console.log("NN", nn);
      if (nn.isBranch) {
        yield n; // yield actual container branch
        yield* nn;
      } else {
        yield nn;
      }
    }
  }
}
