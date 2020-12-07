
/** 
 * Based on: <three.js version: 107> 
 **/


import { 
  MeshLambertMaterial 
} from 'three';

import vertexShader from './glsl/lambert_instanced_vert.glsl';
import fragmentShader from './glsl/lambert_instanced_frag.glsl';

class MeshInstanceLambertMaterial extends MeshLambertMaterial{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  MeshInstanceLambertMaterial
}
