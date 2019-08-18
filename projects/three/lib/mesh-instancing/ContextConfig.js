import MeshInstance from './MeshInstance';

const createMeshClasses = (meshes)=>{

  const classes = {};

  Object.keys( meshes ).forEach((key)=>{

    const { 
      maxInstances,
      geometry,
      material
    } = meshes[key];

    const name = `${key[0].toUpperCase()}${key.slice(1)}MeshInstance`;

    const cls = class extends MeshInstance{

      // Unsure about passing geometry around
      constructor(){
        super(geometry,material.clone());
      }

    }

    // Unsure about this.
    cls.MAX_INSTANCES = maxInstances;
    cls.GEOMETRY = geometry;
    cls.MATERIAL = material;

    classes[ name ] = cls;

  });

  return classes;

}

class ContextConfig{

  constructor(config){
    
    const {
      meshes
    } = config;

    this.meshes = meshes;
    this._meshClasses = createMeshClasses(meshes);

  }

  createMeshClasses(){
    return this._meshClasses;
  }

}

export default ContextConfig;