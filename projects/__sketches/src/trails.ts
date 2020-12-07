import { sketch } from '@jamieowen/three-toolkit';
import { 
  Scene, 
  PerspectiveCamera, 
  MeshStandardMaterial, 
  BoxBufferGeometry, 
  Mesh,
  AmbientLight,
  DirectionalLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new Scene();
const camera = new PerspectiveCamera();
const controls = new OrbitControls(camera,document.body);

const aLight = new AmbientLight(0xffffff,0.6);
const dLight = new DirectionalLight();
scene.add( aLight,dLight );
dLight.position.set(5,10,10);

const geometry = new BoxBufferGeometry(1,1,1);
const material = new MeshStandardMaterial({color:'hotpink'});
const mesh = new Mesh( geometry, material );

camera.position.z = 10;

scene.add( mesh );

sketch(({renderer, resize })=>{

  const { width,height } = resize;

  camera.aspect = width/height;
  camera.updateProjectionMatrix();

  controls.update();

  renderer.render(scene,camera);

});

























// import { rendererStream, renderStream, update, render, resizeCamera, resize, resizeRenderer, setup, gestureStream3d, GestureEvent3D, IntersectionHelper } from '@jamieowen/three-toolkit';
// import * as tx from '@thi.ng/transducers';
// import { GestureEvent, gestureStream } from '@thi.ng/rstream-gestures';

// import {
//   BoxBufferGeometry,
//   MeshBasicMaterial,
//   Mesh,
//   Matrix4,
//   Scene,
//   PerspectiveCamera,
//   PlaneBufferGeometry
// } from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { Group } from 'three';
// import { HemisphereLight } from 'three';
// import { DirectionalLight } from 'three';
// import { MeshLambertMaterial } from 'three';

// const element = document.createElement('div');
// document.body.appendChild(element);
// document.body.style.margin = '0px';
// element.style.margin = '0px';
// element.style.position = 'absolute';
// element.style.width = '100%';
// element.style.height = '100%';
// element.style.display = 'block';
// element.style.overflow = 'hidden';

// const container = new Group();

// const mesh = new Mesh(
//   new BoxBufferGeometry(1, 1, 1),
//   new MeshLambertMaterial({ color: 'crimson' })
// )
// mesh.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0.5, 0));
// container.add(mesh);

// const plane = new Mesh(
//   new PlaneBufferGeometry(1, 1),
//   new MeshBasicMaterial({ color: 'white' })
// );


// const pxy = new Mesh(
//   mesh.geometry,
//   new MeshLambertMaterial({ color: 'hotpink' })
// )
// // pxy.scale.multiplyScalar(0.2);
// container.add(pxy);
// pxy.position.set(3,0,3);

// const light = new HemisphereLight(0xffffff,0xaaaaaa);
// container.add(light);

// const dir = new DirectionalLight(0xff00ff,1);
// container.add(dir);

// dir.position.set( 10,10,-10 );

// container.add(plane);
// plane.geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI * 0.5));
// plane.scale.set(5, 5, 5);

// let controls;
// // mesh( scene, )
// // const items = [ ...iterate( fill(100) ) ];

// // console.log( items );

// renderStream(element).transform(

//   setup(({ scene, camera, ...rest },a) => {

//     console.log( 'set', camera,scene, rest, a );
//     camera.position.set(10, 10, 10);
//     camera.lookAt(0, 0, 0);
//     controls = new OrbitControls(camera, element);

//     scene.add(container);

//   }),
//   update(({gestures,intersect}) => {

//     const g:GestureEvent3D = gestures;
//     controls.update();

//     // if( g.intersects && g.intersects.length ){
//     //   console.log( g.intersects );
//     // }
//     // console.log( intersect );
//     const i:IntersectionHelper = intersect;
//     // console.log( i.xy.position );
//     // pxy.position.copy(i.xy.position);
//     pxy.position.copy( i.xy.position );
//     // pxy.position.multiplyScalar(0.3);

//   }),
//   render()
// )

// // const m = [ 'mesh', { material: 'lambert', color: 'blue' } ] 

