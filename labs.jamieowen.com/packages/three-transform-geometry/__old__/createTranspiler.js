import glslTranspiler from 'glsl-transpiler';

import prepareIOAttributes from '../shaders/prepareIOAttributes';
import generateHeaders from '../shaders/generateHeaders';
import generateReadOps from '../shaders/generateReadOps';
import generateWriteOps from '../shaders/generateWriteOps';
import parseIncludes from '../shaders/parseIncludes';

const createTranspiler = ( 
  geometry,
  uniforms,
  read,
  write,
  updateShader,
  jsGlobals
)=>{

  const attributes = prepareIOAttributes( geometry,read,write );

  const shaderChunks = {
    header: generateHeaders(attributes.read,attributes.write),
    read: generateReadOps(attributes.read),
    write: generateWriteOps(attributes.write)
  }

  const shaderCode = parseIncludes(updateShader,shaderChunks);

  const transpile = glslTranspiler({
    uniform: (name)=>{
      console.log( 'get name :', name );
      return `uniforms['${name}']`;
    },
    attribute: (name)=>{
      console.log( 'get attribute name :', name );
      return `attributes['${name}']`;
    },
    varying: (name)=>{
      console.log( 'get varying name :', name );
    }
  });
  
  const source = transpile(shaderCode);

  console.log( 'Compiled Source :' );
  console.log(updateShader);

  console.log( 'Compiled Source :' );
  console.log(source);
  
}

export default createTranspiler;