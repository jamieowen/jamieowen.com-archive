import * as l from './layout-gen/layout2';
import { Smush32 } from '@thi.ng/random';


const rand = new Smush32();
const dims = 200;
const pointsNode = l.points(20,[
  l.tagNode(10),
  l.tagNodeIndexed((i:number)=>i>3 ? 20 : 1),

  // l.tag((i)=>i>3)
  l.position((i,current,node)=>[rand.float(),rand.float()]),
  l.scale(dims)
  // l.position((i,current,node)=>[Math.random()]  
  // l.pos.set(()=>)

  
  // l.makeBranchNode(3),  
  // t.branch((n:Node)=>n.hasTag(A) ? l.points(10, ) : null )
]);

const canvas:HTMLCanvasElement = document.createElement('canvas');
canvas.width = canvas.height = dims;
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
  console.log(pointsNode);
  render(pointsNode);
}

document.body.appendChild(sliderX);
document.body.appendChild(sliderY);

const render = (node:l.Node)=>{

  let count = 0;

  ctx.fillStyle = '#efefef';
  ctx.fillRect(0,0,dims,dims);
  ctx.fillStyle = 'black';

  // @ts-ignore
  for( let node:l.Node of pointsNode ){
    const position = node.attributes.get('position');
    // console.log( 'node', position );
    if( position ){
      ctx.beginPath();
      ctx.arc( position[0],position[1],3,0,Math.PI*2 );
      ctx.fill();
    }
    count++;
  }

  console.log( rand.float(),rand.float(),rand.float() );
  console.log( 'Count:', count );

}

render(pointsNode);






