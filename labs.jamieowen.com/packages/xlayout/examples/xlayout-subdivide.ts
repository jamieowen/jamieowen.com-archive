import { BoundsNode,RectNode,CircleNode,Node } from '../src/nodes';
import { renderSvg } from '../src/renderers/renderSvg';
import * as tx from '@thi.ng/transducers';
import { Vec } from '@thi.ng/vectors';

type SubDivideOpts = {
  w:number,h:number,
  xw?:[] | number,yw?:[] | number
}
type BoundsInfo = {
  w:number,h:number
  x:number,y:number
}

const defaultOpts:SubDivideOpts = {
  w:2,h:2
}

type CreateChild = (i:number,x:BoundsInfo,p:Node) => Node | void;

const weightsToPositions = (weights)=>{
  return weights.slice(1).reduce((acc,x,i)=>{
    // acc.length === 0 ? acc.push(0) : acc.push(weights[i-1]);
    acc.push(acc[i] + weights[i]);
    return acc;
  },[0]);
}

function subdivide( 
  node:BoundsNode,
  opts:SubDivideOpts=defaultOpts,
  create:CreateChild
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
        const b:BoundsNode = new BoundsNode('',node);
        b.bounds = [x.w,x.h];
        b.translate = [x.x,x.y];
        // pass data ? - or store in boundsnode??        
        return b;
      }),
    ),
    tx.range2d(x,y)
  )

}

const createBounds = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new BoundsNode('',p);
  node.translate = [x.x,x.y];
  node.bounds = [x.w,x.h];
  return node;
}

const opacities = [...tx.iterator(
  tx.interpolateLinear(10),
  [0,1]
)];

const createRect = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new RectNode('',p);
  // node.translate = [1,1];
  node.attributes['stroke'] = 'black';
  node.attributes['fill'] = 'blue';
  // node.size = [x.w-2,x.h-2];
  node.size = [x.w,x.h];
  if( node.depth < 1 ){
    node.attributes['ry'] = node.attributes['rx'] = 20;
  }else{
    node.attributes['ry'] = node.attributes['rx'] = 5;
  }

  return node;
}

const createCircle = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new CircleNode('',p);
  node.radius = x.w*0.5;
  return node;
}

type SubCondition = (
  target:BoundsNode,
  depth:number
)=>SubDivideOpts | null;


function *subdivideOnCondition(node:BoundsNode,create:CreateChild,condition:SubCondition){

  let depth = 0;
  let i = 0;
  let nextDepth = []
  let currentDepth = [node]
  
  // This needs to be a breadth first / level order 
  // traversal

  while( currentDepth.length ){
    
    const nextNode = currentDepth.shift();
    nextNode.depth = depth;    
    yield nextNode;

    const subOpts = condition(nextNode,depth);

    if( subOpts ){      
      for( node of subdivide(nextNode,subOpts || {w:2,h:2},create) ){
        nextDepth.push(node);        
        i++;
      }      
    }else{
      // give option allow child creation?
      // const c:Node = create(i,x,b);
      const info = {
        x: nextNode.translate[0],
        y: nextNode.translate[1],
        w: nextNode.bounds[0],
        h: nextNode.bounds[1]
      }

      create(null,info,nextNode);

    }

    if( currentDepth.length === 0 ){
      console.log( 'Next Depth ', nextDepth );
      currentDepth = nextDepth;
      nextDepth = []
      depth++;
      i=0;
    }

  }

}



const dims = 400;
const dims2 = dims/2;
const root = new BoundsNode('');
root.bounds = [dims,dims];


let maxLarge = 4;
let maxMedium = 2;
let maxSmall = 3;

// @ts-ignore
const iterator = subdivideOnCondition(root,createRect,(target:Node,depth:number)=>{
  // if( depth > 0 ){
  //   return false;
  // }else
  if( depth === 0 ){
    return { w:4,h:3, xw:[0.1,0.4,0.3,0.2],yw:[0.4,0.4,0.2] }
    // return { w:4, h:4 }
  }else
  if( depth < 4 && Math.random() > 0.5 ){
    const r = Math.round( Math.random() * 3 ) + 1;
    return { w:r,h:r }
  }else{
    return false;
  }
});

for( let node of iterator ){
  console.log( 'Yield :', node.depth );
}

// @ts-ignore
// const sub = [ ...subdivide(root,{w:2,h:2},createRect) ]

// const circle = new CircleNode('',root);
// const r = 60;
// circle.radius = r;
// circle.attributes['fill'] = '#f0f';
// circle.attributes['opacity'] = '0.9';
// circle.translate = [dims2-r,dims2-r];

root.update();

const ele = <SVGElement>renderSvg(root);
document.body.appendChild(ele);
ele.style.margin = '1px';



