import { System, World, TagComponent } from "ecsy";
import { Component } from "react";
import { Quaternion, Euler, Vector3 } from "three";

class Active extends TagComponent{}
class Selected extends TagComponent{}

class Camera extends TagComponent{}
class Scene extends TagComponent{}
class Mesh extends TagComponent{}

class TransformComponent extends Component{

  public position:Vector3;
  public scale:Vector3;
  public rotation:Euler;
  public quaternion:Quaternion;

}

class LayerComponent extends Component{
  public layerName:string;  
}

class Object3DSystem extends System{

  init(){
    console.log( this );
  } 
  
  execute( delta:number,time:number ){

  }

}

const registerObject3DSystem = (world:World)=>{

  world.registerComponent( Active );
  world.registerComponent( Selected );
  world.registerComponent( Camera );
  world.registerComponent( Scene );
  world.registerComponent( Mesh );
  world.registerComponent( TransformComponent );

  world.registerSystem( Object3DSystem );

}

export {
  Active,
  Selected,
  Camera,
  Scene,
  Mesh,
  TransformComponent,
  LayerComponent,
  Object3DSystem,
  registerObject3DSystem
}