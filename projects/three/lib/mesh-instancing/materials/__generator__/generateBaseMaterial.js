const generateBaseMaterial = ( 
  BaseClass, 
  ClassName
)=>{

  return `
import { 
  ${BaseClass} 
} from 'three';

class ${ClassName} extends ${BaseClass}{

  constructor(opts){
    super(opts);    

  }

  onBeforeCompile(shader){
    console.log( 'CUSTOM:${ClassName}->${BaseClass}' );
  }

}

export { 
  ${ClassName}
}
`
}

export default generateBaseMaterial;