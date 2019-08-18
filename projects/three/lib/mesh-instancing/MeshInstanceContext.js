import {
  Object3D
} from 'three';

import MeshInstanceTypeRenderer from './MeshInstanceTypeRenderer';

class MeshInstanceContext extends Object3D{

  constructor(contextConfig){

    super();

    const {
      meshes 
    } = contextConfig;
    this.config = contextConfig;    

    this.isMeshInstanceContext = true;
    this.typeRenderers = Object.keys( meshes ).map( (key)=>{

      const meshConfig = meshes[key];
      const renderer = new MeshInstanceTypeRenderer(meshConfig);
      this.add( renderer );
      return renderer;

    })
    
  }

  onAddInstance( instance ){

  }

  onRemoveInstance( instance ){
    
  }

}

export default MeshInstanceContext;