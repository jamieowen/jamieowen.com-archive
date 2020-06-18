

/**
 * The attribute and vertex shader processor/runner.
 * @param {*} attribs 
 */
const processorApi = (attribs)=>{

  const attributes = {};
  
  attribs.forEach( (att,i)=>{

    const entry = {
      name: att.name,
      size: att.size,
      offset: 0,
      value: []
    }
    return entry;

  })

  const transpiler_scope_getAttribute = (name)=>{
    return `api.attributes[name].value`;
  }

  const stepAttributes = ()=>{
    attributes.forEach( (att)=>{
      att.value = att.array.slice(att.offset,att.size);
    })
  }

  const process = (main)=>{

    stepAttributes();
    main();
    
  }

  const api = {
    transpilerApi,
    process
  }

  return api;

}

/**
 * Wrapper creates the enclosure that
 * executes the compiled vertex shader code.
 * 
 * // TODO: look at processing in steps.
 */
const createWrapper = (updateShaderCode)=>{

  return `
    
    /** This code will execute within the scope of the processor api **/
    /** So will have access to all functions in the above api **/


    /** Shader code contains a glsl style main() function **/
    ${ updateShaderCode } 

    api.process( main );


    return api;

  `

}

const compileFunction = (updateShaderCode)=>{
  return new Function( 'attribs', createWrapper(main) );
}
