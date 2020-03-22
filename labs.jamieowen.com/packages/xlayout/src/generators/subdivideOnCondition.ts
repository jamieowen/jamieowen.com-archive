import { subdivide,SubDivideOpts,CreateChild } from './subdivide';
import { BoundsNode } from '../nodes';

type SubCondition = (
  target:BoundsNode,
  depth:number
)=>SubDivideOpts | null;


export function *subdivideOnCondition(node:BoundsNode,create:CreateChild,condition:SubCondition){

  let depth = 0;
  let i = 0;
  let nextDepth = []
  let currentDepth = [node]
  let totalCreateCount = 0;
  
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
      // const info = {
      //   x: nextNode.translate[0],
      //   y: nextNode.translate[1],
      //   w: nextNode.bounds[0],
      //   h: nextNode.bounds[1]
      // }

      //create(null,info,nextNode);
      totalCreateCount++;

    }

    if( currentDepth.length === 0 ){
      // console.log( 'Next Depth ', nextDepth );
      currentDepth = nextDepth;
      nextDepth = []
      depth++;
      i=0;
    }

  }

  console.log( 'Total Create Count:', totalCreateCount );

}
