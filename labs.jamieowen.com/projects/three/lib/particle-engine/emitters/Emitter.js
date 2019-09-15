import {
  Object3D,
  Mesh,
  BoxBufferGeometry,
  Matrix4,
  MeshBasicMaterial
} from 'three';

import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

let emitterGeometry = null;
const createEmitterGeometry = ()=>{
  if( !emitterGeometry ){
    emitterGeometry = new BoxBufferGeometry(1,1,1,1,1,1);
    const transformMatrix = new Matrix4();
    transformMatrix.makeRotationZ( Math.PI * 0.5 );
    transformMatrix.makeRotationX( Math.PI * 0.5 );
    emitterGeometry.applyMatrix( transformMatrix );
  }
  return emitterGeometry;
}

class Emitter extends Object3D{

  constructor(){

    super();

    /**
     * Anchor reference point.
     */
    this.anchor = new Mesh( 
      createEmitterGeometry(),
      new MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
      })
    )

    this.add( this.anchor );
    /**
     * Capture the reference to the renderer to attach TransformControls
     */
    this.anchor.onBeforeRender = (renderer,scene,camera,opt4  )=>{
      this.anchor.onBeforeRender = ()=>{}
      this.controls = new TransformControls( camera, renderer.domElement );
      scene.add( this.controls );
      this.controls.attach( this );
      // console.log( this.controls );
    }    

  }

}

export default Emitter;