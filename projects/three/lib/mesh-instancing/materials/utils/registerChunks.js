import {
  ShaderChunk
} from 'three';

import instanced_common from '../glsl/chunks/instanced_common.glsl';
import instanced_pars_vertex from '../glsl/chunks/instanced_pars_vertex.glsl';
import instanced_begin_vertex from '../glsl/chunks/instanced_begin_vertex.glsl';
import instanced_normal_vertex from '../glsl/chunks/instanced_normal_vertex.glsl';
import instanced_vertex from '../glsl/chunks/instanced_vertex.glsl';

import instanced_mat_basic from '../glsl/chunks/instanced_material_basic.glsl';


const chunks = {  
  instanced_common,
  instanced_pars_vertex,  
  instanced_begin_vertex,
  instanced_normal_vertex,
  instanced_vertex,

  // instanced_basic_fragment
  
}

let done = false;
const registerChunks = ()=>{
  
  if( !done ){
    Object.keys( chunks ).forEach( (key)=>{
      ShaderChunk[ key ] = chunks[key];
    })
  }
  
}

export {
  chunks,
  registerChunks
}