
/** 
 * Based on: <three.js version: 107> 
 **/


import { 
  MeshStandardMaterial 
} from 'three';

import vertexShader from './glsl/standard_instanced_vert.glsl';
import fragmentShader from './glsl/standard_instanced_frag.glsl';

class MeshInstanceStandardMaterial extends MeshStandardMaterial{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  MeshInstanceStandardMaterial
}
