
/** 
 * Based on: <three.js version: 107> 
 **/


import { 
  MeshPhongMaterial 
} from 'three';

import vertexShader from './glsl/phong_instanced_vert.glsl';
import fragmentShader from './glsl/phong_instanced_frag.glsl';

class MeshInstancePhongMaterial extends MeshPhongMaterial{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  MeshInstancePhongMaterial
}
