import { createRenderer, addToDom, resizeObserverStream } from '@jamieowen/three-toolkit';
import { rendererStream, renderStream } from '@jamieowen/three-toolkit';
import * as tx from '@thi.ng/transducers';

import { 
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh, 
  Matrix4, 
  Scene,
  PerspectiveCamera
} from 'three';


import { PlaneBufferGeometry } from 'three';

const element = document.body;
element.style.margin = '0px';
// const { camera,scene } = createRenderer({
//   domElement: element
// });

const {
  renderer, scene,camera
} = createRenderer({
  domElement:document.body
});


const logOnce = (msg)=> tx.comp( 
  tx.takeNth(500),
  tx.sideEffect((e)=>console.log(msg,e) )
)

resizeObserverStream( document.body ).subscribe(
  tx.trace('resize::')
)
const r = renderStream().subscribe(
  tx.comp( 
    tx.map(x=>x),
    logOnce('first stream'),
    addToDom(),
  )
)

r.subscribe(
  logOnce('seperate stream')
);

console.log( 'STREAM', r );





// const camera = new PerspectiveCamera();
// const scene = new Scene();

// const { renderer } = r;

const mesh = new Mesh(
  new BoxBufferGeometry(1,1,1),
  new MeshBasicMaterial({color:'crimson'})
)
mesh.geometry.applyMatrix4(new Matrix4().makeTranslation(0,0.5,0));
scene.add(mesh);

const plane = new Mesh(
  new PlaneBufferGeometry(1,1),
  new MeshBasicMaterial({color:'white'})
);

scene.add(plane);
plane.geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI*0.5));
plane.scale.set(5,5,5);

camera.position.set(10,10,10);
camera.lookAt(0,0,0);
// camera.aspect = r.renderer.domElement.width / r.renderer.domElement.height;
// camera.updateProjectionMatrix();

// renderer.render(scene,camera);  

const render = ()=>{
  // console.log( 'render' );
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();



