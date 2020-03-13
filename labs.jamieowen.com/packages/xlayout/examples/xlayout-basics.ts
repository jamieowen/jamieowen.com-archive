import * as tx from '@thi.ng/transducers';

import * as gen from '../src/generators';
import { Node } from '../src/nodes';

import { circle,rect,asPolygon } from '@thi.ng/geom';

import * as hiccupSvg from '@thi.ng/hiccup-svg';
import * as hiccup from '@thi.ng/hiccup';

const scl = 15;
let graphX = gen.bounds(100,100,[
  gen.group([
    gen.grid(4,4,[
      tx.map((n:Node)=>(n.translate[0]*=scl,n.translate[1]*=scl,n)),
      gen.rect(3,3)
    ])
  ]),
  gen.group([
    gen.grid(2,2,[      
      gen.points(5)
    ])
  ])
]);

const createGraph = ( xform )=>{
  const res = tx.transduce(
    xform,
    tx.push(),
    [1]
  );
  return res[0][0];
}

const graph = createGraph(graphX);
graph.update(); // update matrices
console.log( 'Graph Root :', graph );


const renderSvg = ( root:Node )=>{
  const c = hiccupSvg.circle([50,50],40,{fill:'#f0f'});
  // console.log( c );
  const a = { width:100,height:100 };

  // Scenegraph toHiccup function is working. As the thi.ng demo
  // Uses this when rendering using hdom-canvas....
  // Accept - toHiccup() Does not expand recursively.
  // https://github.com/thi-ng/umbrella/blob/feaf8d3f8c1dd3e9141a151b4e473423a6f62242/examples/scenegraph/src/index.ts#L163

  console.log( 'HICCUP:', root.toHiccup() );
  
  const conv = hiccupSvg.convertTree(root);
  console.log( 'CONVERT:',conv );

  return hiccupSvg.svg(a,
    hiccupSvg.rect([0,0],a.width,a.height,{fill:'#333'}),c,conv
  );
}

const hsvg:any = renderSvg(graph); // hiccup format svg ( so nested arrays )
const svgString:string = hiccup.serialize(hsvg);

function addSvg(str:string){
  const ele = document.createElement('div');
  ele.innerHTML = svgString;
  document.body.appendChild(ele);
}

addSvg(svgString);
addSvg(svgString);
addSvg(svgString);
addSvg(svgString);
addSvg(svgString);

// console.log( 'Graph Result:',graph );

// console.log( graph.toHiccup() );

const r = rect([0,0],[10,10],{ fill:"#eff"} );
console.log( r.toHiccup() );

// const circ = circle(0.5,{fill:'#f0f'});
// const poly = asPolygon(circle(0.5, { fill: "#f0f" }), 3)

// console.log( circ,poly,r );
// console.log( poly.toHiccup() );