import {
  ShaderChunk
} from 'three';

import instanced_vertex from '../glsl/chunks/instanced_vertex.glsl';
import instanced_fragment from '../glsl/chunks/instanced_fragment.glsl';

const { 
  instanced_pars_vertex,
  instanced_begin_vertex,
  instanced_normal_vertex,
  instanced_transform_vertex 
} = instanced_vertex;

const {
  instanced_pars_fragment,
  instanced_varyings_fragment
} = instanced_fragment;

const chunks = {  
  instanced_pars_vertex,
  instanced_begin_vertex,
  instanced_normal_vertex,
  instanced_transform_vertex,

  instanced_pars_fragment,
  instanced_varyings_fragment 
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