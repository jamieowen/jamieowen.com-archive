import {
  Renderer
} from '@jamieowen/three-renderman';

import {
  Scene,
  Group,
  PerspectiveCamera,
  Mesh,
  BoxBufferGeometry,
  MeshBasicMaterial
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Helpers
 */
const boxGeometry = new BoxBufferGeometry(1,1,1,1,1,1);
const createBox = (matParams)=>{
  const material = new MeshBasicMaterial(matParams);
  return new Mesh(boxGeometry,material);
}

/**
 * Setup
 */
const renderer = new Renderer();
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(45,1,0.1,100);
camera.position.z = 10;

const controls = new OrbitControls(camera,renderer.domElement);

renderer.scenes.add( scene );
renderer.cameras.add( camera );

const bgLayer = renderer.layers.add('background');
const maskLayer = renderer.layers.add('mask');
const fgLayer = renderer.layers.add('foreground');

renderer.passes.add( { layers:[ 'background' ], mask:['mask'] } );
renderer.passes.add( { layers:[ 'foreground' ] } );

/**
 * Objects
 */
const box1 = createBox({color:'blue'});
const box2 = createBox({color:'red'});

box1.layers.set(bgLayer);
box2.layers.set(fgLayer);

scene.add(box1);
box1.position.x = -2;
scene.add(box2);

renderer.setSize(400,300);
renderer.start(()=>{
  controls.update();
});

//console.log( renderer );

// const renderer = new Renderer();
// console.log( renderer );

// import {
//   Renderer
// } from '@jamieowen/three-renderman';

// import {
//   BoxBufferGeometry,
//   Mesh,
//   MeshLambertMaterial,
//   MeshBasicMaterial,
//   Scene
// } from 'three';


// const renderer = new Renderer();
// // const viewport = new Viewport();
// // const camera = new Camera();
// // const 

// const boxGeometry = new BoxBufferGeometry(1,1,1,1,1,1);
// // const material = new MeshLambertMaterial({color:'blue'});
// const material = new MeshBasicMaterial({color:'red'});
// const mesh = new Mesh(boxGeometry,material);
// renderer.scene.add( mesh );


// renderer.onRender();

// renderer.layers.add([
//   'foreground',
//   'background'
// ]);

// renderer.scenes.add({
//   main: new Scene()
// })

// renderer.cameras.add({
  
// })

// renderer.effects({

// })

// renderer.passes.add([
//   { layers:['bg'], scene: 'main', camera: 'main', effects:'', clear:['depth'] },
//   { layers:['fb'], scene: 'main', camera: 'main' },
// ]);


// Layers? - a way to group a number of objects. 
// Rendering by default, will render each layer clearing or not clearing stencil/depth/etc. then a final render with no layer selection.
// This can be used for compositing, masking, etc.
// - name
// - pipeline (optional)
// - order
// - stencil/depth/color ( clear, etc )

// Pipelines / Effects
// This is a definition of a set of effects, blurs, noise, etc. they are not bound to a scene or camera, 
// They just define a number of 


// group(()=>{

//   return [
//     cube(),
//     cube()
//   ]

// })


