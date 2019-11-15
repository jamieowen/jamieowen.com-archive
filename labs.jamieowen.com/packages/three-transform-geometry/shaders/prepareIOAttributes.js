
const findAttributes = ( geometry, names )=>{

  const res = [];  

  names.forEach( (name)=>{
    const att = geometry.attributes[name];
    if( att ){
      res.push( att );
      if( !att.name ){ // three.js doesn't set name in some circumstances.
        att.name = name;
      }
    }else{
      throw new Error( `The attribute "${name}" does exist on the supplied geometry.` );
    }
  })

  return res;

}

const prepareIOAttributes = ( geometry,read,write )=>{

  const readAttributes = findAttributes( geometry, read );
  const writeAttributes = findAttributes( geometry, write );

  // const attributeNames = [].concat( read ).concat( write );
  // const failed = [];
  // const used = [];
  // const bufferAttributes = [];

  // attributeNames.forEach( (name)=>{
  //   const bufferAttribute = geometry.attributes[name];
  //   if( !bufferAttribute ){
  //     failed.push(name);
  //   }else
  //   if( used.indexOf(name) === -1 ){
  //     used.push(name);
  //     bufferAttributes.push( bufferAttribute );
  //   }
  // });
  // if( failed.length ){
  //   throw new Error( `The attributes [ ${ failed.join(',' )} ] do not exist on the supplied geometry.` );
  // }else{
  //   return bufferAttributes;
  // }

  return {
    read: readAttributes,
    write: writeAttributes
  }

}

export default prepareIOAttributes;