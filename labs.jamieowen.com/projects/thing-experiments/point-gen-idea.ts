import * as l from './layout-gen/layout2';
import { Smush32 } from '@thi.ng/random';
import * as ll from './layout';


const rand = new Smush32();
const dims = 200;

// Add Tagging
// l.tagNode(10),
// l.tagNodeIndexed((i:number)=>i>3 ? 20 : 1),

const gNodes = ll.grid(5,5,[
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

const sliderX:HTMLInputElement = document.createElement('input');
const sliderY:HTMLInputElement = document.createElement('input');
sliderX.type = sliderY.type = 'range';
sliderX.min = sliderY.min = '0';
sliderX.max = sliderY.max = '100';
sliderX.value = sliderY.value = '0';

sliderX.oninput = sliderY.oninput = ()=>{
  console.log( 'ok',sliderX.value, sliderY.value );
  // console.log(pointsNode);
  render(gNodes);
}

document.body.appendChild(sliderX);
document.body.appendChild(sliderY);

const render = (node:l.Node)=>{

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

render(gNodes);






