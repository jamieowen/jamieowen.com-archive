import {
  BoxBufferGeometry,
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  Euler,
  Object3D,
  Vector3,
  Matrix4,
  Material
} from 'three';

interface Command{
  id:number,
  parent:Object3D,
  arguments:Array<any>
}

class DrawContext{

  private scene:Scene;
  private parent:Object3D;
  private position:Vector3;
  private scale:Vector3;
  private rotation:Euler;
  private transformMatrix:Matrix4;
  private material:Material;

  // private materialPool:WeakMap;
  // private geometryPool:WeakMap<

  private currentCommand:number;
  private commands:Array<object> = [];

  constructor(scene:Scene){
    this.scene = scene;
    this.parent = scene;
  }

  public begin(){
    this.currentCommand = 0;
    // this.position.set(0,0,0);
  }

  public end(){
    for( var i:number = 0; i<this.commands.length; i++ ){

    }
  }

  public moveTo(x:number,y:number,z:number){
    // this.position.set(x,y,z);
  }

  public wireframeMaterial(color:number){

  }

  public basicMaterial(color:number){

  }

  public box(){

  }

  public sphere(){

  }  


}

export {
  DrawContext
}