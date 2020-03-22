import { BoundsNode,RectNode,CircleNode,Node } from '../src/nodes';
import { renderSvg } from '../src/renderers/renderSvg';
import { renderCanvas } from '../src/renderers/renderCanvas';
import allPaperSizes from '@5no/paper-sizes/compiled/iso';
import getPaperSize from '@5no/paper-sizes';

import { subdivide,BoundsInfo } from '../src/generators/subdivide';
import { subdivideOnCondition } from '../src/generators/subdivideOnCondition'
import { grid,gridOffset } from '../src/generators/grid';
import { basketweave } from '../src/generators/basketweave';


import { GUI, GUIController } from 'dat.gui';
import { windmill } from '../src/generators/windmill';

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

const createRect = (i:number,x:BoundsInfo,p:Node)=>{
  const node = new RectNode('',p);
  // node.translate = [1,1];
  node.attributes['stroke'] = 'white';
  node.attributes['fill'] = '#222';
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

const options = {
  paperSize: 'A4',
  dpi: 72,
  orientation:'portrait',
  tiling:'windmill',
  tilingWidth: 4,
  tilingHeight: 4,
  subdivision:'none',
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
    if( depth < 4 && Math.random() > 0.5 ){
      const r = Math.round( Math.random() * 3 ) + 1;
      return { w:r,h:r }
    }else{
      return false;
    }

  });

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

  const innerWidth = width * 0.5;
  const innerHeight = height * 0.5;
  const container = new BoundsNode('',root);
  container.bounds[0] = innerWidth;
  container.bounds[1] = innerHeight;
  container.translate[0] = innerWidth * 0.5;
  container.translate[1] = innerHeight * 0.5;
    
  count = 0;

  let iterator = null;
  let gridOpts = {
    w:options.tilingWidth,h:options.tilingHeight,
    sx:innerWidth/options.tilingWidth,
    sy:innerHeight/options.tilingHeight
  }

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
    default:
      iterator = subTileTemp();
      console.warn('No iterator for tiling type.');
  }
  
  if( iterator ){

    for( let node of iterator ){
      // console.log( 'Yield :', node );
    }

  }


  const bg:RectNode = new RectNode('',root);
  bg.attributes['fill'] = '#ddd';
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
canvasApi.domElement.style.display = 'inline';

const gui = new GUI({width:300});
gui.domElement.style.margin = '0px';
gui.add(options,'paperSize',paperSizesKeys);
gui.add(options,'dpi',[72,150,300]);
gui.add(options,'orientation', ['portrait','landscape']);

gui.add(options,'tiling',['none','grid','offsetGrid','herringbone','basketweave','windmill','hopscotch'] );
gui.add(options,'tilingWidth',0,20,1);
gui.add(options,'tilingHeight',0,20,1);

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




