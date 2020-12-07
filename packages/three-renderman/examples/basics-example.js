
import {
  Renderer,
  DrawContext
} from '@jamieowen/three-renderman'

import {
  MeshBasicMaterial,
  SphereBufferGeometry,
  Mesh,
  BoxBufferGeometry,
  Box3,
  ConeBufferGeometry,
  Vector3
} from 'three';

document.body.style.margin = '0px';

const renderer = new Renderer();
const scene = renderer.defaultScene;



const S = 10;
const bounds = new Box3();
bounds.min.set(-S,-S,-S);
bounds.max.set(S,S,S);
const boundsMesh = new Mesh(
  new BoxBufferGeometry(1,1,1),
  new MeshBasicMaterial({
    color: 'red',
    wireframe: true,
  })
)
boundsMesh.scale.multiplyScalar(S*2);
scene.add( boundsMesh );

const particle = new Mesh(
  new ConeBufferGeometry(),
  new MeshBasicMaterial({
    color: 'red',
    wireframe:true    
  })
)
particle.scale.set(0.4,1,0.4);
scene.add( particle );
particle.userData.velocity = new Vector3(0,1,0);

const v1 = new Vector3();
const v2 = new Vector3();
const v3 = new Vector3();


renderer.mount(document.body);
renderer.start(()=>{
  
  const v = particle.userData.velocity;
  v1.copy(v);
  v1.multiplyScalar(0.1);
  particle.position.add(v1);

  if( !bounds.containsPoint(particle.position) ){
    v1.copy(particle.position);
    bounds.getCenter(v2);
    
    v2.sub(v1);
    
    v.add(v2);
  }
  v.clampScalar(-3,3);

})


// const c = new DrawContext(scene);

  // c.begin();
  
  // for( var i = 0; i<10; i++ ){
  //   c.box();
  // }

  // c.end();
