// import * as l from './layout-gen/layout2';
import { Smush32 } from '@thi.ng/random';
import * as ll from '../src';
import * as tx from '@thi.ng/transducers';

const rand = new Smush32();
const dims = 200;

// Add Tagging
// l.tagNode(10),
// l.tagNodeIndexed((i:number)=>i>3 ? 20 : 1),

const gNodes = ll.grid(2,2,[
  ll.position.fromSeed(),
  ll.position.scale((i)=>[40,40]),
  ll.position.offset((i)=>[20,20])
]);

const canvas:HTMLCanvasElement = document.createElement('canvas');
canvas.width = canvas.height = dims * 2;
canvas.style.width = `${dims}px`;
canvas.style.height = `${dims}px`;
document.body.appendChild(canvas);
const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

const render = (node:any)=>{

  let count = 0;
  
  ctx.scale(2,2);

  ctx.fillStyle = '#efefef';
  ctx.fillRect(0,0,dims,dims);
  ctx.fillStyle = 'black';

  // @ts-ignore
  for( let node:l.Node of gNodes ){
    const position = node.attributes.get('position');
    // console.log( 'node', position );
    if( position ){
      ctx.beginPath();
      ctx.arc( position[0],position[1],3,0,Math.PI*2 );
      ctx.fill();
    }
    count++;
  }

  // console.log( rand.float(),rand.float(),rand.float() );
  console.log( 'Count:', count );

}

// render(gNodes);


import * as gen from '../src/generators';

// let out = gen.group([0,0],[
//   gen.group([0,0],[
//     gen.group()
//   ])
// ])

let out = gen.points2(1,[
  gen.group2(),
  gen.group2([
    gen.grid2(2,2)
  ]),
  gen.group2([
    gen.grid2(2,2,[
      gen.points2(5)
    ])
  ])
]);

// console.log( '--OUT--', out, typeof out );
const genResult = tx.transduce(
  out,
  tx.push(),
  [1]
)
console.log( 'GEN RESULT',genResult[0] );


// const xform = tx.comp(
//   tx.map((x)=>x*2),
//   tx.mapcat((x)=>[x,x,x]),
// )

// const res = tx.transduce(
//   xform,
//   tx.push(),
//   [0,1,2,3]
// )

// console.log( 'RES :', res );