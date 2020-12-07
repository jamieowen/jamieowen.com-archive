
/** 
 * Based on: <three.js version: 107> 
 **/


import { 
  MeshNormalMaterial 
} from 'three';

import vertexShader from './glsl/normal_instanced_vert.glsl';
import fragmentShader from './glsl/normal_instanced_frag.glsl';

class MeshInstanceNormalMaterial extends MeshNormalMaterial{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  MeshInstanceNormalMaterial
}
