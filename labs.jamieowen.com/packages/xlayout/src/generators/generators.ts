import { Node, GroupNode, PointNode, BoundsNode, CircleNode, RectNode } from '../nodes';
import * as tx from '@thi.ng/transducers';
import { XLayout } from '../XLayout';

type GenOps = Array<any>;

const nodeFactory = (parent:Node, NodeType:any )=>{
  return tx.map(x=>{
    const res = {
      node:new NodeType('',parent instanceof Node ? parent : null ),
      seed:x
    }
    res.node.depth = parent instanceof Node ? parent.depth++ : 0
    return res;
  })
}

const noop = tx.map(x=>x);

/**
 * 
 * The core transducer function to create and add nodes to each other.
 * Nodes are created by iterating over a 'seed' iterable, mapping
 * each value to an instantiated NodeType. Then performing a 
 * series of custom ops ( functions ) to the result.
 * 
 * @param NodeType 
 * @param genops 
 * @param seedIterable 
 * @param nodeInit 
 */
export function createGenerator( NodeType,genops,seedIterable,nodeInit){

  return tx.map((parent:Node)=>{

    if( !seedIterable ){
      seedIterable = [null];
    }

    const res = tx.transduce(
      tx.comp(
        nodeFactory(parent,NodeType),
        tx.map(x=>{
          const { seed,node } = x;
          nodeInit(seed,node);
          return node;
        }),
        tx.mapIndexed((i,x)=>{
          // console.log( 'Map---:', i, x.depth );
          return x;
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


export type RectOpts = {
  w:number,
  h:number
}

export type CreateNodeOp = {
  ops:GenOps,
  nodeType:any,
  iterable:Iterable<any>,
  initialise:(parent:Node,newNode:Node)=>{}
}

const defaultRectOpts:RectOpts = { w:10,h:10 };

export function rect2( opts?:RectOpts, ops:GenOps ):CreateNodeOp{
  const o = Object.assign({},defaultRectOpts,opts);

  return {
    ops,
    nodeType:RectNode,
    initialise:(seed:any,newNode:Node,parent:Node)=>{

    }
  }
}

export function rect3(opts?:RectOpts, ops:GenOps ){

  const initOps = [
    // ops.position(i=>i),
  ]
  return (context:XLayout)=>{
    context.transduce(RectNode,ops,initOps,[1]) // optional...
  }
}


export function group( genops? ){
  return createGenerator( GroupNode,genops,null,()=>{} );
}

export function bounds( width:number,height:number,genops?:GenOps ){
  return createGenerator( BoundsNode,genops,null,(seed:number,node:BoundsNode)=>{
    node.bounds[0] = width;
    node.bounds[1] = height;
  } );
}

export function circle( radius:number,genops?:GenOps ){
  return createGenerator( CircleNode,genops,null,(seed:number,node:CircleNode)=>{
    node.radius = radius;
  })
}

export function rect( width:number,height:number,genops?:GenOps ){
  return createGenerator( RectNode,genops,null,(seed:number,node:RectNode)=>{
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

  const ox = (width-1) * 0.5;
  const oy = (height-1) * 0.5;

  return createGenerator( PointNode, genops,
    tx.range2d(width,height),
    (seed:any,node:PointNode)=>{
      node.translate[0] = seed[0] - ox;
      node.translate[1] = seed[1] - oy;
    }
  )

}


const weightsToPositions = (weights)=>{
  return weights.reduce((acc,x,i)=>{
    acc.length === 0 ? acc.push(0) : acc.push(x + acc[i-1]);
    return acc;
  },[]);
}

export const subdivide = (w:number,h:number, genops?:GenOps)=>{

  const x = Math.max(1,w);
  const y = Math.max(1,h);
  
  const xWeights = new Array(x).fill(1/x); // todo, custom weights.
  const yWeights = new Array(y).fill(1/y);

  const xPos = weightsToPositions(xWeights);
  const yPos = weightsToPositions(yWeights);

  return createGenerator( BoundsNode, genops,
    tx.range2d(x,y),(seed:any,node:BoundsNode)=>{      

      const p:BoundsNode = node.parent;
      const pw = p.bounds[0];
      const ph = p.bounds[1];
      const sx = seed[0];
      const sy = seed[1];

      node.bounds[0] = pw*xWeights[sx];
      node.bounds[1] = ph*yWeights[sy];

      node.translate[0] = pw*xPos[sx];
      node.translate[1] = ph*yPos[sy];
      
    }
  )
  
}