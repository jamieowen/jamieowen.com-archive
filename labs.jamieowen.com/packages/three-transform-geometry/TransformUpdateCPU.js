import createTranspiler from './compiler/createTranspiler';

const defaultOpts = {
  read: [],
  write: [],
  updateShader: null,
  uniforms: {},
  jsFunctions: null
}

class TransformUpdateCPU{

  constructor(geometry,opts){

    const { 
      uniforms,
      read, 
      write, 
      updateShader,
      jsGlobals
    } = Object.assign( {},defaultOpts,opts );


    const transpiler = createTranspiler( 
      geometry, 
      uniforms,
      read,write,
      updateShader,
      jsGlobals
    );

    // const shaderCode = parseIncludes(updateShader,shaderChunks);
    // const shaderProgram = new CpuProgram(
    //   shaderCode,
    //   uniforms,
    //   jsGlobals
    // );

    // this.shaderProgram = shaderProgram;
    // this.updateAttributes = attributes;

  }

  update(){

    // bind uniforms to shader context.
    // update 

    // this.updateAttributes.write.forEach( (att)=>{
    //   att.needsUpdate = true;
    // });

  } 

}

export default TransformUpdateCPU;