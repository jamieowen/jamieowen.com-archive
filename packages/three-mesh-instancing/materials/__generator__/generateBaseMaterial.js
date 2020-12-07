const generateBaseMaterial = ( 
  BaseClass, 
  ClassName,  
  vertexShaderPath,
  fragmentShaderPath
)=>{

  return `
import { 
  ${BaseClass} 
} from 'three';

import vertexShader from '${vertexShaderPath}';
import fragmentShader from '${fragmentShaderPath}';

class ${ClassName} extends ${BaseClass}{

  constructor(opts){
    super(opts);    
  }

  onBeforeCompile(shader){
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
  }

}

export { 
  ${ClassName}
}
`
}

export default generateBaseMaterial;