import {
  Mesh,
  InstancedBufferGeometry,
  InstancedBufferAttribute
} from 'three';

// import {
//   MeshInstanceDebugMaterial
// } from './materials'

class MeshInstanceTypeRenderer extends Mesh{

  constructor(meshConfig){

    const {
      geometry,
      material,
      maxInstances
    } = meshConfig;

    const geom = new InstancedBufferGeometry();    
    geom.copy( geometry );
    geom.maxInstancedCount = maxInstances;

    const mat = material;

    const translate = new Float32Array(maxInstances*3).fill(0);
    const scale = new Float32Array(maxInstances*3).fill(1);

    geom.addAttribute( 'translate', new InstancedBufferAttribute(translate,3) );
    geom.addAttribute( 'scale', new InstancedBufferAttribute(scale,3) );

    console.log( 'TYPE : ', material,geom );
        
    // 
    // BITCOIN, generative piece, explore indicators and MA to generate stuff.

    super(geom,mat);

  }

}

export default MeshInstanceTypeRenderer;