
import { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { Node,GroupNode, PointNode } from '../nodes';
import * as tx from '@thi.ng/transducers';

type GenOps = Array<any>;




const nodeFactory = (parent:Node, NodeType:any )=>{
  return tx.map(x=>{
    return new NodeType('',parent instanceof Node ? parent : null );
  })
}

const nodeFactory2 = (parent:Node, NodeType:any )=>{
  return tx.map(x=>{
    return {
      node:new NodeType('',parent instanceof Node ? parent : null ),
      seed:x
    }
  })
}


const noop = tx.map(x=>x);

export function createGenerator( NodeType,genops,seedIterable,nodeInit){

  return tx.map((parent:Node)=>{
    const res = tx.transduce(
      tx.comp(
        nodeFactory2(parent,NodeType),
        tx.map(x=>{
          const { seed,node } = x;
          nodeInit(seed,node);
          return node;
        }),
        tx.comp.apply(this,genops ? genops : [noop] )
      ),
      tx.push(),
      seedIterable
    )
    if(parent instanceof Node){
      return parent;
    }else{
      return res;
    }
  });

}

// export function group( genops?:GenOps ){
//   return tx.map((parent:Node)=>{
//     const res = tx.transduce(
//       tx.comp(
//         nodeFactory(parent,GroupNode),
//         tx.comp.apply(this,genops ? genops : [noop] )
//       ),
//       tx.push(),
//       [1]
//     )

//     if(parent){
//       return parent;
//     }else{
//       return res;
//     }
//   })
// }

// export function points( count:number, genops?:GenOps ){
//   return tx.map((parent:Node)=>{
//     const res = tx.transduce(
//       tx.comp(
//         nodeFactory(parent,PointNode),
//         tx.comp.apply(this,genops ? genops : [noop] )
//       ),
//       tx.push(),
//       tx.range(count)
//     )

//     if( parent instanceof Node ){
//       return parent;
//     }else{
//       return res;
//     }
//   })
// }

// export function grid( width:number, height:number, genops?:GenOps ){
//   return tx.map((parent:Node)=>{
//     const res = tx.transduce(
//       tx.comp(
//         nodeFactory(parent,PointNode),
//         tx.comp.apply(this,genops ? genops : [noop] )
//       ),
//       tx.push(),
//       tx.range2d(width,height)
//     )

//     if( parent instanceof Node ){
//       return parent;
//     }else{
//       return res;
//     }
//   })
// }

export function group2( genops? ){
  return createGenerator( GroupNode,genops,[0],()=>{} );
}

export function points2( count:number, genops?:GenOps ){
  return createGenerator(
    PointNode,genops,
    tx.range(count),
    ()=>{}
  )
}

export function grid2( width:number,height:number, genops?:GenOps ){
  return createGenerator( PointNode, genops,
    tx.range2d(width,height),
    (seed:any,node:PointNode)=>{
      node.translate[0] = seed[0];
      node.translate[1] = seed[1];
    }
  )
}