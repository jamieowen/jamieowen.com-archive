import transpiler from 'glsl-transpiler';
import Program from './Program';

const Compiler = (
  shaderCode,
  attributes,
  uniforms
)=>{

  /**
   * Prepare read functions for transpiled js code.
   */
  const readAttribute = (name)=>{
    return `${name}_att`;
  }

  const readUniform = (name)=>{
    return `${name}_uni`;
  }

  const readVarying = (name)=>{
    return `null`;
  }

  /**
   * Transpile shader code.
   */
  const transpile = transpiler({
    attribute: readAttribute,
    uniform: readUniform,
    varying: readVarying,
    debug: true
  });

  const jsSource = transpile( shaderCode );
  
  /**
   * Generate expected argument strings for js run function.
   */
  const attributeArgs = Object.keys( attributes ).map( (name)=>{
    return `${name}_att`;
  });

  const uniformArgs = Object.keys(uniforms).map( (name)=>{
    return `${name}_uni`;
  })  

  

  /**
   * Generate return footer and compile run function.
   */
  const info = transpile.compiler;
  const jsFooter = `
  main();
  return {
    ${
      Object.keys( info.varyings ).map((name)=>{
        const v = info.varyings[name];
        return `${v.id}:${v.id}`;
      }).join(',')
    }
  }
  `;

  // args are attributes first, then uniforms.
  const args = attributeArgs.concat( uniformArgs );
  const run = new Function( args,jsSource+jsFooter );

  return new Program(
    attributes,
    uniforms,
    run
  );

}

const compileProgram = Compiler;

export {
  Compiler,
  compileProgram
}

export default Compiler;