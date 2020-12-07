import path from 'path';
import fs from 'fs';

import {
  REVISION,
  ShaderLib
} from 'three';

const GLSL_OUTPUT = path.resolve( __dirname, '../glsl' );
const MATERIAL_OUTPUT = path.resolve( __dirname, '../' );
const INDEX_OUTPUT = path.resolve( __dirname, '../' );
const INDEX_NAME = 'index.generated.js';

const VERT_SUFFIX = '_vert';
const FRAG_SUFFIX = '_frag';
const GLSL_FILE_SUFFIX = '.glsl.js';
const MATERIAL_FILE_SUFFIX = '.js';

import generateBaseMaterial from './generateBaseMaterial';

/** shaderLibID:[ id,writePath ]*/
const shaderLibExports = {
  basic: ['basic_instanced'],
  lambert: ['lambert_instanced'],
  phong: ['phong_instanced'],
  standard: ['standard_instanced'],
  matcap: ['matcap_instanced'],
  normal: ['normal_instanced']
}

/** materialBaseClass:writePath */
const materialExports = {
  MeshBasicMaterial: ['MeshInstanceBasicMaterial','basic_instanced'],
  MeshLambertMaterial: ['MeshInstanceLambertMaterial','lambert_instanced'],
  MeshPhongMaterial: ['MeshInstancePhongMaterial','phong_instanced'],
  MeshStandardMaterial: ['MeshInstanceStandardMaterial','standard_instanced'],
  MeshMatcapMaterial: ['MeshInstanceMatcapMaterial','matcap_instanced'],
  MeshNormalMaterial: ['MeshInstanceNormalMaterial','normal_instanced']
}

const mapKeys = (obj,op)=>{
  return Object.keys( obj ).map( (key,i)=>{
    const v = obj[key];
    return op(key,v,i);
  })
}

const writeSync = (path,contents)=>{
  const header = `
/** 
 * Based on: <three.js version: ${REVISION}> 
 **/

`;
  if( fs.existsSync(path) ){
    fs.unlinkSync(path);
  }
  fs.writeFileSync(path,header+contents,{encoding:'utf8'});
}


const wrapGlsl = (src)=>{
return `
export default \`
${src}
\`
`
}


/**
 * Write GLSL files.
 */
mapKeys( shaderLibExports,(key,entry,i)=>{
  const name = entry[0];
  const vertexShader = ShaderLib[key].vertexShader;
  const fragmentShader = ShaderLib[key].fragmentShader;
  const vertexShaderPath = path.join(GLSL_OUTPUT,`${name}${VERT_SUFFIX}${GLSL_FILE_SUFFIX}`);
  const fragmentShaderPath = path.join(GLSL_OUTPUT,`${name}${FRAG_SUFFIX}${GLSL_FILE_SUFFIX}`);

  writeSync(vertexShaderPath,wrapGlsl(vertexShader));
  writeSync(fragmentShaderPath,wrapGlsl(fragmentShader));

} )

/**
 * Only export materials from the index.generated.js file.
 */
const indexExports = [];

/**
 * Write Material Files.
 */
mapKeys( materialExports,(key,entry,i)=>{
  const name = entry[0];
  const glslName = entry[1];

  const out = path.join(MATERIAL_OUTPUT,name+MATERIAL_FILE_SUFFIX);  

  const res = generateBaseMaterial(
    key,name,
    `./${path.relative(MATERIAL_OUTPUT,GLSL_OUTPUT)}/${glslName}${VERT_SUFFIX}${GLSL_FILE_SUFFIX.replace('.js','')}`,
    `./${path.relative(MATERIAL_OUTPUT,GLSL_OUTPUT)}/${glslName}${FRAG_SUFFIX}${GLSL_FILE_SUFFIX.replace('.js','')}`,
  );  
  writeSync(out,res);
  indexExports.push( out );
} )

/**
 * Write index.generated.js
 */
const indexFile = indexExports.map( (file)=>{
  return `export * from "./${path.relative(INDEX_OUTPUT,file)}"`
}).join('\n')

writeSync( path.join(INDEX_OUTPUT,INDEX_NAME), indexFile );

