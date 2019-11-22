console.log( 'OKOK--' );
import {
  Renderer
} from '@jamieowen/three-renderman';

import {
  BoxBufferGeometry,
  Mesh,
  MeshLambertMaterial
} from 'three';


const renderer = new Renderer();
// const viewport = new Viewport();
// const camera = new Camera();
// const 

const boxGeometry = new BoxBufferGeometry();
const material = new MeshLamberMaterial({color:'blue'});
const mesh = new Mesh(boxGeometry,material);

// imperative
// t.lambertMaterial();
// t.box({color:'white'});
// t.mesh('custom');
// 


