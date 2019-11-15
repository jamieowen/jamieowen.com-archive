
/** 
 * Based on: <three.js version: 107> 
 **/


import { 
  MeshBasicMaterial 
} from 'three';

import vertexShader from './glsl/basic_instanced_vert.glsl';
import fragmentShader from './glsl/basic_instanced_frag.glsl';

class MeshInstanceBasicMaterial extends MeshBasicMaterial{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  MeshInstanceBasicMaterial
}
