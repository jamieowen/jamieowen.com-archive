import { rendererStream, renderStream, update, render, resizeCamera, resize, resizeRenderer, setup, gestureStream3d, GestureEvent3D } from '@jamieowen/three-toolkit';
import * as tx from '@thi.ng/transducers';
import { GestureEvent, gestureStream } from '@thi.ng/rstream-gestures';

import {
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Matrix4,
  Scene,
  PerspectiveCamera,
  PlaneBufferGeometry
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Group } from 'three';
import { HemisphereLight } from 'three';
import { DirectionalLight } from 'three';
import { MeshLambertMaterial } from 'three';
import { count } from 'yargs';
import { fill } from '@thi.ng/transducers';
import { transduce } from '@thi.ng/transducers';
import { iterate } from '@thi.ng/transducers';

const element = document.createElement('div');
document.body.appendChild(element);
element.style.margin = '0px';
element.style.position = 'absolute';
element.style.width = '100%';
element.style.height = '100%';
element.style.display = 'block';
element.style.overflow = 'hidden';

const container = new Group();

const mesh = new Mesh(
  new BoxBufferGeometry(1, 1, 1),
  new MeshLambertMaterial({ color: 'crimson' })
)
mesh.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0.5, 0));
container.add(mesh);

const plane = new Mesh(
  new PlaneBufferGeometry(1, 1),
  new MeshBasicMaterial({ color: 'white' })
);

const light = new HemisphereLight(0xffffff,0xaaaaaa);
container.add(light);

const dir = new DirectionalLight(0xff00ff,1);
container.add(dir);

dir.position.set( 10,10,-10 );

container.add(plane);
plane.geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI * 0.5));
plane.scale.set(5, 5, 5);

let controls;
// mesh( scene, )
// const items = [ ...iterate( fill(100) ) ];

// console.log( items );

renderStream(element).transform(

  setup(({ scene, camera, ...rest },a) => {

    console.log( 'set', camera,scene, rest, a );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    controls = new OrbitControls(camera, element);

    scene.add(container);

  }),
  update(({gestures}) => {

    const g:GestureEvent3D = gestures;
    controls.update();

  }),
  render()
)

// const m = [ 'mesh', { material: 'lambert', color: 'blue' } ] 

