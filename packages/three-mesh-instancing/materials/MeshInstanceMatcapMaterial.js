
/** 
 * Based on: <three.js version: 107> 
 **/


import { 
  MeshMatcapMaterial 
} from 'three';

import vertexShader from './glsl/matcap_instanced_vert.glsl';
import fragmentShader from './glsl/matcap_instanced_frag.glsl';

class MeshInstanceMatcapMaterial extends MeshMatcapMaterial{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  MeshInstanceMatcapMaterial
}
