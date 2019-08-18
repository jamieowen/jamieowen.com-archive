class Program{

  constructor(
    attributes,
    uniforms,
    run
  ){

    this.attributes = attributes;
    this.uniforms = uniforms;
    this._execute = run;
    this.bufferLength = this.calculateBufferLength();

  }

  calculateBufferLength(){
    let bufferLen = undefined;
    const attributeValues = this.attributeMap( (att)=>{
      const len = att.array.length / att.size;
      if( !bufferLen ){
        bufferLen = len;
      }else
      if( bufferLen !== len ){
        throw new Error( 'Attribute arrays are not equal in length' );
      }      
    })   
    return bufferLen; 
  }

  setUniform( name,value ){
    this.uniforms[ name ].value = value;
  }

  uniformMap( op=()=>{} ){
    const { uniforms } = this;
    return Object.keys( uniforms ).map( (name,i)=>{
      return op( uniforms[name],name,i );
    })
  }

  attributeMap( op=(att,name,i)=>{} ){
    const { attributes } = this;
    return Object.keys( attributes ).map( (name,i)=>{
      return op(attributes[name],name,i);
    })
  }

  run( start=0,end ){

    // TODO: This can all be improved and is incomplete.

    // 1. Investigate other compile/transpile interactoin methods.
    // 2. Unroll write-back loop.
    // 3. Proper type support.
    // 4. Could change how attributes/uniforms are mapped / iterated

    const uniformValues = this.uniformMap( (uni)=>{
      return uni.value;
    });
    
    for( let i = start; i<this.bufferLength; i++ ){

      const attributeValues = this.attributeMap( (att)=>{
        const offset = i * att.size;
        return att.array.slice(offset, offset + att.size);
      });

      const args = attributeValues.concat( uniformValues );
      const varyings = this._execute.apply(this._execute,args);      

      this.attributeMap( (att)=>{
        if( att.feedback ){
          const res = varyings[ att.feedback ];
          const offset = att.size * i;
          
          if( att.size === 3 ){
            att.array[offset] = res[0];
            att.array[offset+1] = res[1];
            att.array[offset+2] = res[2];
          }else
          if( att.size === 2 ){
            att.array[offset] = res[0];
            att.array[offset+1] = res[1];
          }else
          if( att.size === 1 ){
            att.array[offset] = res[0];
          }
        }
      })

    }

  }

}

export default Program;