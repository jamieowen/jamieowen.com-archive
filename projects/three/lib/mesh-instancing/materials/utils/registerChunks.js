import {
  ShaderChunk
} from 'three';

const chunks = {

  'instanced-common': require( '../glsl/chunks/instanced-common.glsl')

}

let done = false;
const registerChunks = ()=>{
  
  if( !done ){
    Object.keys( chunks ).forEach( (key)=>{
      ShaderChunk[ key ] = chunks[key];
    })
  }

  console.log( ShaderChunk );
  
}

export {
  chunks,
  registerChunks
}