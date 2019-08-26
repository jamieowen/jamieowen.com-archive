import {
  Object3D
} from 'three';

import {
  registerChunks
} from './materials'

import MeshInstanceRenderer from './MeshInstanceRenderer';

class MeshInstanceContext extends Object3D{

  constructor(contextConfig){

    registerChunks();

    super();

    const {
      meshClasses
    } = contextConfig;

    if( !meshClasses || Object.keys(meshClasses).length === 0 ){
      throw new Error( 'No meshes found on config' );
    }

    this.config = contextConfig;    
    this.isMeshInstanceContext = true;  
    this.instances = []; // to access just instances - use this rather than children

    this.renderers = Object.keys(meshClasses).reduce( (prev,key,i)=>{

      const cls = meshClasses[key];
      
      const geometry = cls.GEOMETRY;
      const material = cls.MATERIAL;
      const maxInstances = cls.MAX_INSTANCES;

      const renderer = new MeshInstanceRenderer(geometry,material,maxInstances);
      this.add( renderer );

      return {
        ...prev,
        [key]:{
          renderer,
          geometry,
          material,
          maxInstances          
        }
      }

    },{});

    this.stats = {
      instanceCount: 0
    }
  
  }
  
  onAddInstance(instance){

    const type = instance.instanceType;
    if( !this.renderers[type] ){
      throw new Error( 'Cannot render this MeshInstance type in this MeshInstanceContext.' );
    }
    
    this.renderers[type].renderer.addInstance(instance);
    this.stats.instanceCount++;

    this.instances.push(instance);

  }

  onRemoveInstance(instance){

    const type = instance.instanceType;
    this.renderers[type].renderer.removeInstance(instance);
    this.stats.instanceCount--;    

    this.instances.splice(this.instances.indexOf(instance),1);

  }

}

export default MeshInstanceContext;