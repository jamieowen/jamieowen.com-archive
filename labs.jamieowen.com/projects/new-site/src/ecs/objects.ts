import {
  Scene,
  Object3D,
  Mesh
} from 'three';

class ECSScene extends Scene{

  constructor(){

    super();
    this.addEventListener('added',this.onAdded);
    // this.addEventListener('removed',this.onRemoved);

  }

  private onAdded = (ev:object)=>{
    console.log( 'ADD:', ev );
  }

}

class EntityObject3D extends Object3D{

  constructor(){
    super();
    this.addEventListener('added',this.onAdded);
  }  
  private onAdded = (ev:object)=>{
    console.log( 'ADD:', ev );
  }  

}

export {
  ECSScene,
  EntityObject3D
}