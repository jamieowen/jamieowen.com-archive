import { TxLike } from "@thi.ng/transducers/api";
import * as tx from "./__old2/layouts/@thi.ng/transducers";
import { Node, BranchNode } from "./nodes";

type XLayoutOpts = {
  cache: boolean;
};

type XLayoutXForm = (runParams: object) => {}; //:TxLike<number,Node>{};

/**
 * Node ops perform some change to a node.
 * Such as set an attribute, position, etc.
 */
// TODO: How to return Types...??
type NodeOpRfn = (i: number, node: Node) => any;

/**
 * Create a node op and ensure correct data is passed through.
 * @param opRfn
 */
export function createNodeOp(opRfn: NodeOpRfn) {
  return tx.mapIndexed((i: number, pass: GeneratorPass) => {
    opRfn(i, pass.currentNode);
    return pass;
  });
}

export function createBranchOp(rfn) {
  return tx.mapIndexed((i: number, pass: GeneratorPass) => {
    const layout: XLayout = pass.layout;
    const genOp = rfn(i);
    if (genOp) {
      // only allow one for now..
      // console.log( 'Branch',genOp );
      layout.transduce(pass, BranchNode, [genOp], null, [0]);
    }
    return pass;
  });
}

export function createGeneratorOp(
  NodeType: any,
  userOps, // // array of txlike
  initOps?, // array of txlike
  seedIterable?
) {
  return tx.mapIndexed((i: number, pass: GeneratorPass) => {
    const layout: XLayout = pass.layout;
    layout.transduce(pass, NodeType, userOps, initOps, seedIterable);
    return pass;
  });
}

const noop = tx.map((x) => x);
class RootNode extends Node {}

type GeneratorPass = {
  layout: XLayout;
  currentNode: Node;
  totalOps: number;
};

export class XLayout {
  private xformFunc: XLayoutXForm;
  private runOpts: XLayoutXForm;

  constructor(xform: XLayoutXForm);
  constructor(opts: XLayoutOpts, xform: XLayoutXForm);
  constructor() {
    this.xformFunc = arguments.length === 1 ? arguments[0] : arguments[1];
    this.runOpts = arguments.length === 2 ? arguments[0] : {};
  }

  generate(params: any = {}): Node {
    const xform = this.xformFunc(params);

    // Create A Generate Pass Object.
    const res = tx.transduce(xform, tx.push(), [1]);

    const graph: Node = res[0][0];
    return graph;
  }

  generate2(params: any = {}): Node {
    const xform = this.xformFunc(params);
    const pass: GeneratorPass = {
      layout: this,
      currentNode: null,
      totalOps: 0,
    };
    const res2 = this.transduce(pass, RootNode, [xform]);
    // console.log( 'RES NEW!!! :', res2 );
    return res2[0];
  }

  transduce(
    pass: GeneratorPass,
    NodeType: any,
    userOps,
    initOps?,
    seedIterable?
  ) {
    seedIterable = !seedIterable ? [0] : seedIterable;

    initOps = initOps && initOps.length > 0 ? initOps : [noop];
    userOps = userOps && userOps.length > 0 ? userOps : [noop];

    const ops1 = tx.comp.apply(this, initOps);
    const ops2 = tx.comp.apply(this, userOps);
    const parent: Node = pass.currentNode;

    // console.log( 'PASS:', pass );
    // console.log( 'INIT_OPS:', initOps );
    // console.log( 'USER_OPS:', userOps );
    // console.log( 'OPS1', ops1 );
    // console.log( 'OPS2', ops2 );

    const result: Array<Node> = tx.transduce(
      tx.comp(
        tx.map((seed) => {
          // Not all cases could require creating a node??
          // In the case of branching - we could add straight
          // to the currentNode. ?? TODO....
          const node = new NodeType("", pass.currentNode);
          pass.currentNode = node;
          return pass;
        }),
        ops1,
        ops2,
        tx.map((pass: GeneratorPass) => {
          pass.currentNode = parent || pass.currentNode;
          pass.totalOps += ops1.length + ops2.length;
          return pass;
        })
      ),
      tx.push(),
      seedIterable
    );
    // console.log( 'Result', result );

    return result;
  }
}
