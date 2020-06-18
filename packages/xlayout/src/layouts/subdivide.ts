import * as tx from '@thi.ng/transducers';
import { Node,BoundsNode } from '../nodes';

export type SubDivideOpts = {
  w:number,h:number,
  xw?:[] | number,yw?:[] | number
}

export type BoundsInfo = {
  w:number,h:number
  x:number,y:number,
  ix:number,iy:number
}

export const createBounds = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new BoundsNode('',p);
  node.translate = [x.x,x.y];
  node.bounds = [x.w,x.h];
  return node;
}

const defaultOpts:SubDivideOpts = {
  w:2,h:2
}

export type CreateChild = (i:number,x:BoundsInfo,p:Node) => Node | void;

const weightsToPositions = (weights)=>{
  return weights.slice(1).reduce((acc,x,i)=>{
    acc.push(acc[i] + weights[i]);
    return acc;
  },[0]);
}

export function subdivide( 
  node:BoundsNode,
  opts:SubDivideOpts=defaultOpts,
  create:CreateChild=createBounds
){
  const { w,h } = opts;
  const x = Math.max(1,w);
  const y = Math.max(1,h); 

  // division weights
  const xw = opts.xw || new Array(x).fill(1/x); // todo, custom weights.
  const yw = opts.yw || new Array(y).fill(1/y); 

  // position multipliers
  const px = weightsToPositions(xw);
  const py = weightsToPositions(yw);

  // bounds dims
  const bw = node.bounds[0];
  const bh = node.bounds[1];

  return tx.iterator(
    tx.comp(
      tx.map(i=>{
        const x:number = i[0];
        const y:number = i[1];
        return { 
          x:px[x]*bw,
          y:py[y]*bh, 
          w:xw[x]*bw,
          h:yw[y]*bh
        }     
      }),
      tx.mapIndexed((i,x)=>{
        // const b:BoundsNode = new BoundsNode('',node);
        // b.bounds = [x.w,x.h];
        // b.translate = [x.x,x.y];
        // // pass data ? - or store in boundsnode??  ( i.e 'SEED' )
        // return b;
        return create(i,x,node);
      }),
    ),
    tx.range2d(x,y)
  )

}
