import { TxLike } from '@thi.ng/transducers/api';
import * as tx from '@thi.ng/transducers';
import { Node } from './nodes';

type XLayoutOpts = {
  cache:boolean
}

type XLayoutXForm = (
  runParams:object
) => {};//:TxLike<number,Node>{};

export class XLayout{

  private xformFunc:XLayoutXForm;
  private runOpts:XLayoutXForm;

  constructor(xform:XLayoutXForm);
  constructor(opts:XLayoutOpts,xform:XLayoutXForm);
  constructor(){    
    this.xformFunc = arguments.length === 1 ? arguments[0] : arguments[1];
    this.runOpts = arguments.length === 2 ? arguments[0] : {};
  }

  // MOVE ALL OPS TO THIS CONTEXT.>
  // FOR SEED AND NODE CREATION??

  private branchOp(){

  }

  transduce( 
    NodeType,
    apiOps,
    internalOps,
    seedIterable?    
  ){

    seedIterable = !seedIterable ? [0] : seedIterable;
    const ops1 = tx.comp.apply(this,internalOps);
    const ops2 = tx.comp.apply(this,apiOps);

    const res = tx.transduce(
      tx.comp(
        tx.map(seed=>{
          // create type with factory, etc...
        }),
        ops1,
        ops2
      ),
      tx.push(),
      seedIterable
    )

    
  }

  generate(params:any={}):Node{

    const xform = this.xformFunc(params);

    // Create A Generate Pass Object.
    const res = tx.transduce(
      xform,
      tx.push(),
      [1]
    );

    const graph:Node = res[0][0];
    return graph;

  }

}
