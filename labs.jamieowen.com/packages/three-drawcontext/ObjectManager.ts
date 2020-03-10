import { Materials, Geometries } from './constants';
import { BoxBufferGeometry, BufferGeometry, Material, MeshBasicMaterial, MeshLambertMaterial, SphereBufferGeometry, Mesh } from 'three';

const registerGeometries = (om:ObjectManager)=>{
  om.registerGeometry( Geometries.BOX, ()=>{
    return new BoxBufferGeometry(1,1,1,1,1,1);
  });
  om.registerGeometry( Geometries.SPHERE, ()=>{
    return new SphereBufferGeometry(1,10,10)
  });
}

const registerMaterials = (om:ObjectManager)=>{
  om.registerMaterial( Materials.BASIC, ()=>{
    return new MeshBasicMaterial();
  });
  om.registerMaterial( Materials.LAMBERT, ()=>{
    return new MeshLambertMaterial();
  })    
}

export class ObjectManager{

  geometryRegister:Map<string,Function> = new Map<string,Function>();
  materialRegister:Map<string,Function> = new Map<string,Function>();

  geometryCache:Map<string,BufferGeometry> = new Map<string,BufferGeometry>();
  materialCache:Map<string,Material> = new Map<string,Material>();

  constructor(){
    registerGeometries(this);
    registerMaterials(this);
  }

  registerGeometry( name:string,create:Function ){
    this.geometryRegister.set(name,create);
  }

  registerMaterial( name:string,create:Function ){
    this.materialRegister.set(name,create);
  }  

  getGeometry(name:string){

    let source = this.geometryCache.get(name);
    if( !source ){
      const create = this.geometryRegister.get(name);
      if( create ){
        source = create();
        this.geometryCache.set(name,source);
      }else{
        throw new Error( `No geometry with name ${name}`);
      }
    }
    return source;

  }  

  getMaterial(name:string){

    let source = this.materialCache.get(name);
    if( !source ){
      const create = this.materialRegister.get(name);
      if( create ){
        source = create();
        this.materialCache.set(name,source);
      }else{
        throw new Error( `No material with name ${name}`);
      }
    }
    return source;

  }    


  createGeometry(name:string){
    return this.getGeometry(name);
  }

  createMaterial(name:string){
    const source = this.getMaterial(name);
    return source.clone();
  }

  createMesh(){
    return new Mesh();
  }

}
