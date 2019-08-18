import path from 'path';
import fs from 'fs';

import {
  REVISION,
  ShaderLib
} from 'three';

const ROOT = path.resolve( __dirname,'../' );
const GLSL_OUTPUT = path.resolve( __dirname, '../glsl' );
const MATERIAL_OUTPUT = path.resolve( __dirname, '../' );
const GLSL_FILE_SUFFIX = '.gen.glsl.js';
const MATERIAL_FILE_SUFFIX = '.gen.js';

import generateBaseMaterial from './generateBaseMaterial';


/** shaderLibID:[ id,writePath ]*/
const shaderLibExports = {
  basic: ['basic-instanced'],
  lambert: ['lambert-instanced'],
  phong: ['phong-instanced'],
  standard: ['standard-instanced'],
  matcap: ['matcap-instanced'],
  normal: ['normal-instanced']
}

/** materialBaseClass:writePath */
const materialExports = {
  MeshBasicMaterial: ['MeshInstanceBasicMaterial','basic'],
  MeshLambertMaterial: ['MeshInstanceLambertMaterial',''],
  MeshPhongMaterial: ['MeshInstancePhongMaterial'],
  MeshStandardMaterial: ['MeshInstanceStandardMaterial'],
  MeshMatcapMaterial: ['MeshInstanceMatcapMaterial'],
  MeshNormalMaterial: ['MeshInstanceNormalMaterial']
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
 * [ AUTO_GENERATED ]
 * <three.js version: ${REVISION}> 
 * <last-modified: ${new Date().toString()}>
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
  const outVert = path.join(GLSL_OUTPUT,`${name}-vert${GLSL_FILE_SUFFIX}`);
  const outFrag = path.join(GLSL_OUTPUT,`${name}-frag${GLSL_FILE_SUFFIX}`);
  
  writeSync(outVert,wrapGlsl(vertexShader));
  writeSync(outFrag,wrapGlsl(fragmentShader));

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
  const res = generateBaseMaterial(key,name,REVISION);
  const out = path.join(MATERIAL_OUTPUT,name+MATERIAL_FILE_SUFFIX);
  writeSync(out,res);
  indexExports.push( out );
} )

/**
 * Write index.generated.js
 */
const indexFile = indexExports.map( (file)=>{
  return `export * from "./${path.relative(ROOT,file)}"`
}).join('\n')

writeSync( path.join(ROOT,'index.generated.js'), indexFile );

