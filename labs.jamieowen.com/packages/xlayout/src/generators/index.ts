import { Node, GroupNode, PointNode, BoundsNode, CircleNode, RectNode } from '../nodes';
import * as tx from '@thi.ng/transducers';

type GenOps = Array<any>;

const nodeFactory = (parent:Node, NodeType:any )=>{
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
        nodeFactory(parent,NodeType),
        tx.map(x=>{
          const { seed,node } = x;
          nodeInit(seed,node);
          return node;
        }),
        tx.comp.apply(this,genops && genops.length > 0 ? genops : [noop] )
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

export function group( genops? ){
  return createGenerator( GroupNode,genops,[0],()=>{} );
}

export function bounds( width:number,height:number,genops?:GenOps ){
  return createGenerator( BoundsNode,genops,[0],(seed:number,node:BoundsNode)=>{
    node.bounds[0] = width;
    node.bounds[1] = height;
  } );
}

export function circle( radius:number,genops?:GenOps ){
  return createGenerator( CircleNode,genops,[0],(seed:number,node:CircleNode)=>{
    node.radius = radius;
  })
}

export function rect( width:number,height:number,genops?:GenOps ){
  return createGenerator( RectNode,genops,[0],(seed:number,node:RectNode)=>{
    node.size[0] = width;
    node.size[1] = height;
  })
}

export function points( count:number, genops?:GenOps ){
  return createGenerator(
    PointNode,genops,
    tx.range(count),
    ()=>{}
  )
}

export function grid( width:number,height:number, genops?:GenOps ){
  return createGenerator( PointNode, genops,
    tx.range2d(width,height),
    (seed:any,node:PointNode)=>{
      node.translate[0] = seed[0];
      node.translate[1] = seed[1];
    }
  )
}

