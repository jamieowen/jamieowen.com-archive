import * as gen from '../src/generators/generators2';
import * as ops from '../src/operators/operators2';

import { DeferredNodeDecl,breadthFirstIterator } from '../src/decl';
import { renderSvg } from '../src/renderers/renderSvg';
import { Node } from '../src';



// This is on option about receiving the current iteration step vs
// NOT receiving the iteration step.
// I think the issue - is we are increasing the complexity of each statement when
// not entirely needed.
// WE MAY OR MAY NOT need to use i to switch parameters.
// BUT IT IS DEFINITELY A REQUIREMENT.
// gen(
  // parameters as object 
  // ops as array, ops as func receiving i
  // children as array, children as func receiving i
// )
// A CLEANER OPTION IS TO USE CLOSURES to provide the iteration to that 
// portion of the tree when needed.
// the closre is a group that passes definied children to the parent..
// gen.bounds({w,h},[
//   gen.rect({fill:'#fff'},[
//     ops.sizeToBounds()
//   ]),
//   seed.step(i=>[
//     gen.rect({})
//   ]),
//   seed.depth(d=>[

//   ]),
//   gen.seed(s=>[

//   ])
// ]);

// gen.bounds([
//   ops.center(),
//   ops.sizeToNearestBounds()
// ],i=>[

// ])
// // Could also be shortened

// const centerAndSize = [
//   ops.center(),
//   ops.sizeToNearestBounds()
// ]

// gen.bounds([ops.size(100,100)],i=>
//   gen.group(centerAndSize,i=>[
  
//   ])
// ])


// gen.seed( s=>[
//   gen.
// ])


const defGraph = gen.root([
  gen.group(i=>[
    // This is only specifying children.
    // What happend to ops on any node??
  ]),
  // gen.group([
  //   ops.position([10,10])
  // ],[
  //   // children
  // ]),  
  // gen.points({
  //   // points here, is being initialised with an object.
  //   // if this wanted to be varied depending on some value.
  //   // we can vary by i....
  //   count:10
  // },i=>[
  //   // i applies to each point
  //   // which implies we don't need to receive in ops. ( as it would be the same )
  //   ops.position([0,0])
  // ]),
  gen.subdivide({width:2,height:2},i=>(
    gen.group()
  )),
  gen.group(i=>[
    gen.group(),
    gen.rect(i=>[
      // ops.attrib('fill',{}),
      console.log('>>', i),
      ops.position([10,10])
    ])    
  ])    
])

const graphMap:Map<DeferredNodeDecl,Node> = new Map();
let root = null;
let id = 0;

for( let n of breadthFirstIterator(defGraph) ){
  
  let node:DeferredNodeDecl = n;
    
  let depth = node.depth;
  const parent:Node = graphMap.get(node.parent); // if exists...
  
  const current:Node = new node.NodeType(id++,parent);
  current.attributes['id'] = id;
  graphMap.set(node,current);

  if( !root ){
    root = current;
  }

  if( node.lastDepth && depth ===1 ){
    // break;
  }

}

root.update();

const ele = <SVGElement>renderSvg(root);
document.body.appendChild(ele);
ele.style.margin = '1px';

console.log( root );
