import { BoundsNode,RectNode,CircleNode,Node } from '../src/nodes';
import { renderSvg } from '../src/renderers/renderSvg';
import { renderCanvas } from '../src/renderers/renderCanvas';
import allPaperSizes from '@5no/paper-sizes/compiled/iso';
import getPaperSize from '@5no/paper-sizes';
import { Smush32 } from '@thi.ng/random';

import { subdivide,BoundsInfo } from '../src/generators/subdivide';
import { subdivideOnCondition } from '../src/generators/subdivideOnCondition'
import { grid,gridOffset } from '../src/generators/grid';
import { basketweave } from '../src/generators/basketweave';
import { matrixRepeater } from '../src/generators/matrixRepeater';

import { GUI, GUIController } from 'dat.gui';
import { windmill } from '../src/generators/windmill';
import { herringbone } from '../src/generators/herringbone';
import { hopscotch } from '../src/generators/hopscotch';
import { dedupe } from '@thi.ng/transducers';

const createBounds = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new BoundsNode('',p);
  node.translate = [x.x,x.y];
  node.bounds = [x.w,x.h];
  return node;
}

// const opacities = [...tx.iterator(
//   tx.interpolateLinear(10),
//   [0,1]
// )];

const Rand = new Smush32();

const BG_COLOR = '#eff';
// const colors = [ '#f0f', '#ff0', '#00f', '#0ff','#0f0' ];
const colors = ['#111','#222','#333','#444','#555','#666']

const randomArrayValue = ( arr )=>{
  const r = ( Rand.norm() + 1.0 ) * 0.5;
  return arr[ Math.round( r * (arr.length-1) ) ];
}

const createRect = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new RectNode('',p);
  // node.translate = [1,1];
  node.attributes['stroke'] = BG_COLOR;  
  // node.attributes['lineStyle'] = 2;
  node.attributes['weight'] = 1;

  node.attributes['alpha'] = 0.4;
  node.attributes['fill'] = '#222';
  // node.attributes['fill'] = randomArrayValue(colors);
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
  node.attributes['fill'] = 'black';
  return node;
}

const dims = 400;
const root = new BoundsNode('');
root.bounds = [dims,dims];

const paperSizesKeys = Object.keys(allPaperSizes);
let aspectRatioOpts = [ '1:1','16:9','3:2','4:3' ];
// aspectRatioOpts = aspectRatioOpts.concat( 
//   aspectRatioOpts.slice(1).reverse().map(v=>v.split(':').reverse().join(':'))
// )
let aspectRatios = aspectRatioOpts.map(v=>{
  const w = v.split(':')[0];
  const h = v.split(':')[1];
  return w/h;
})

const nearestAspectRatio = (v)=>{  
  let d = Number.POSITIVE_INFINITY;
  let a = null;
  let i = null;
  aspectRatios.forEach((r,ii)=>{
    const dd = Math.abs(v-r);
    if( dd < d ){
      a = r;
      d = dd;
      i = ii;
    }
  })
  return a;
}

const RandSplit = new Smush32(0x311e23f );
function splitByRatio(node:BoundsNode,ratio:number){
  const w = node.bounds[0];
  const h = node.bounds[1];

  let w1 = ( Math.min(w,h)*ratio ) / Math.max(w,h);
  let w2 = 1 - w1;
  if( RandSplit.norm() > 0 ){
    let ww = w1;
    w1 = w2;
    w2 = ww;
  }

  if( w1 === 0 || w2 === 0 ){
    return false;
  }else{
    return w > h ? { w:2,h:1, xw:[w1,w2], yw:[1] } : { w:1,h:2, yw:[w1,w2], xw:[1] };
  }  

}

console.log( 'Nearest : ', nearestAspectRatio(1.5) );

console.log( 'aspect opts :', aspectRatioOpts, aspectRatios );


const options = {
  paperSize: 'A4',
  dpi: 72,
  orientation:'portrait',
  tiling:'grid',
  tilingWidth: 2,
  tilingHeight: 2,
  innerWidth:0.6,
  innerHeight:0.5,
  subdivideTemp:false,
  subdivision:'none',
  subTargetRatio: '1:1',
  // subdivision props?
  numImages: 200,
  maxLarge: 4,
  maxMedium: 3,
  maxSmall: 3,
  minArea: 2*2,
  update:()=>{
    render();
    canvasApi.renderOnce();
  }  
}


let count = 0;
const createNode = (i:number,x:BoundsInfo,p:Node)=>{
  
  const bounds = new BoundsNode('',p);
  bounds.translate[0]=x.x;
  bounds.translate[1]=x.y;
  bounds.bounds[0]=x.w;
  bounds.bounds[1]=x.h;
  
  if( count <= options.numImages ){
    const node = createRect(i,x,bounds);
    // console.log( 'Create' );
    count++;
  }

  // createCircle(i,x,p);

  return bounds;

}

const subTileTemp = ()=>{

  
  count = 0;

  return subdivideOnCondition(root,createNode,(target:Node,depth:number)=>{
    // if( depth > 0 ){
    //   return false;
    // }else
    if( count > options.numImages ){
      return false;
    }else
    if( depth === 0 ){
      // return { w:4,h:3, xw:[0.1,0.4,0.3,0.2],yw:[0.4,0.4,0.2] }
      return { w:4, h:4 }
    }else
    if( depth < 4 && Rand.norm() > 0.5 ){
      const r = Math.round( Rand.norm() * 3 ) + 1;
      return { w:r,h:r }
    }else{
      return false;
    }

  });

}

const subdivideNode = (node)=>{

  if( !options.subdivideTemp ){
    return;
  }    

  [ ...subdivideOnCondition(node,createNode,(target:BoundsNode,depth:number)=>{

    // subdivide to nearest aspect ratio?
    // subdivde to minimum area?
    // subdivide using specific ratios/weights?
    // subdivide to maximum number images?

    const w = target.bounds[0];
    const h = target.bounds[1];    
    const nodeArea = w*h;
    const nodeAspect = w/h;
    const validAspect = nearestAspectRatio(nodeAspect);

    const minArea = 75*75;

    if( nodeArea - ( nodeArea*0.2 ) > minArea ){

      // return splitByRatio(target,1);

      // console.log( 'VALID ASPECT :', nodeAspect, validAspect );
      const ar = randomArrayValue( aspectRatios );
      // const r = ar > 1
      // console.log( 'RAN', 1 / ar );
      // return splitByRatio(target,0.666667);
      // return splitByRatio(target,1);
      return splitByRatio(target,1/ar);

      if( nodeArea * 0.8 < minArea ){ // 20% padding? no subdiv..
        return false
        // return w > h ? { w:5,h:1 } : { w:1,h:5 };
      }else
      if( nodeArea * 0.6 < minArea ){
        console.log( 'DIV 2' );
        console.log( '>>', splitByRatio(target,1) );
        // return w > h ? { w:2,h:1 } : { w:1,h:2 };

        // return splitByRatio(target,1);
        return splitByRatio(target,0.666667);
      }else
      if( nodeArea * 0.5 < minArea ){
        console.log( 'DIV 3' );
        return w > h ? { w:3,h:1 } : { w:1,h:3 };
        // return splitByRatio(target,1);
      }else{
        return splitByRatio(target,1);
      }
      // if( w > h ){
        
      //   console.log( 'RAND :' , ar );
      //   return { w:2,h:1,xw:[0.333,0.667],yw:[1] };
      // }else
      // if( w < h ){
      //   return { w:1,h:2,yw:[0.333,0.667],xw:[1] };
      // }else{
      //   return { w:2,h:2 };
      // }

    }else{
      return false;
    }
    // if( depth > 0 ){
    //   return false;
    // }else
    console.log( 'SIBDIVIDE', nodeArea );
    return false;
    // if( count > options.numImages ){
    //   return false;
    // }else
    if( depth === 0 ){
      // return { w:4,h:3, xw:[0.1,0.4,0.3,0.2],yw:[0.4,0.4,0.2] }
      return { w:1, h:2 }
    }else
    if( depth < 2 && Rand.norm() > 0.5 ){
      const r = Math.round( Rand.norm() * 1 ) + 1;
      return { w:r,h:r }
    }else{
      return false;
    }

  })]

}

const render = ()=>{

  const size = getPaperSize(options.paperSize);
  size.info.dpi = options.dpi;

  let width = size.widthToPixels();
  let height = size.heightToPixels();
  
  if( options.orientation === 'landscape' ){
    const w = width;
    width = height;
    height = w;
  }

  root.bounds[0] = width;
  root.bounds[1] = height;

  console.log( 'WIDTH/HEIGHT:', width,height );

  const then = performance.now();
  root.children.splice(0);

  const innerWidth = width * options.innerWidth;
  const innerHeight = height * options.innerHeight;
  const container = new BoundsNode('',root);
  container.bounds[0] = innerWidth;
  container.bounds[1] = innerHeight;
  container.translate[0] = ( width - innerWidth ) * 0.5;
  container.translate[1] = ( height - innerHeight ) * 0.5;
    
  count = 0;

  let iterator = null;
  let gridOpts = {
    w:options.tilingWidth,h:options.tilingHeight,
    sx:innerWidth/options.tilingWidth,
    sy:innerHeight/options.tilingHeight
  }

  Rand.seed(0x0023e12);

  switch( options.tiling ){
    case 'grid':
      iterator = grid(container,gridOpts,createNode);
      break;
    case 'offsetGrid':
      iterator = gridOffset(container,gridOpts,createNode);
      break;
    case 'basketweave':
      iterator = basketweave(container,gridOpts,createNode);
      break;
    case 'windmill':
      iterator = windmill(container,gridOpts,createNode);
      break;
    case 'herringbone':
      iterator = herringbone(container,gridOpts,createNode);
      break;
    case 'hopscotch':
      iterator = hopscotch(container,gridOpts,createNode);
      break;
    default:
      iterator = subTileTemp();
      console.warn('No iterator for tiling type.');
  }
  
  if( iterator ){

    for( let node of iterator ){
      subdivideNode(node);
    }

  }

  const bg:RectNode = new RectNode('',root);
  bg.attributes['fill'] = BG_COLOR;
  bg.size = root.bounds;
  root.children.unshift( root.children.splice(-1)[0] );
  root.update();

  console.log( 'Time :', ( performance.now() - then ) /1000 );


}

render();

// const ele = <SVGElement>renderSvg(root);
// document.body.appendChild(ele);
// ele.style.margin = '1px';

const canvasApi = renderCanvas(root);
document.body.appendChild(canvasApi.domElement);
document.body.style.backgroundColor = '#111';
canvasApi.domElement.style.display = 'inline';

const gui = new GUI({width:300});
gui.domElement.style.margin = '0px';
gui.add(options,'paperSize',paperSizesKeys);
gui.add(options,'dpi',[72,150,300]);
gui.add(options,'orientation', ['portrait','landscape']);

gui.add(options,'tiling',['none','grid','offsetGrid','herringbone','basketweave','windmill','hopscotch'] );
gui.add(options,'tilingWidth',1,20,1);
gui.add(options,'tilingHeight',1,20,1);
gui.add(options,'innerWidth',0,1,0.01);
gui.add(options,'innerHeight',0,1,0.01);

gui.add(options,'subdivideTemp');

gui.add(options,'numImages',0,1000,1); 
gui.add(options,'maxLarge',0,100,1); 
gui.add(options,'maxMedium',0,100,1); 
gui.add(options,'maxSmall',0,100,1); 
// gui.add(canvasApi, 'pause' );
// gui.add(canvasApi, 'play' );
const controller = gui.add(options,'update',).name('Update');

gui.__controllers.forEach((c:GUIController)=>{
  c.onChange( ()=>{
    options.update();
  })
})




