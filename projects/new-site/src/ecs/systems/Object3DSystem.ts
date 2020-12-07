import { System, World, TagComponent, Entity, Component } from "ecsy";
import { Quaternion, Euler, Vector3, Mesh, Object3D, Camera, Scene, Light, EventDispatcher } from "three";

// class ActiveTag extends TagComponent{}
// class SelectedTag extends TagComponent{}

class CameraTag extends TagComponent{}
class SceneTag extends TagComponent{}
class LightTag extends TagComponent{}
class MeshTag extends TagComponent{}
class UpdatableTag extends TagComponent{}

class Object3DComponent extends Component{
  public object:Object3D;
}

// class LayerComponent extends Component{
//   public layerName:string;
//   public renderOrder:number;
// }

class TagWeakMap extends WeakMap{

  constructor(){

    super();

    this.set(Scene,SceneTag);
    this.set(Mesh,MeshTag);
    this.set(Camera,CameraTag);
    this.set(Light,LightTag);

  }

}

class ComponentWeakMap extends WeakMap{
  constructor(){
    super();
  }
}

class Object3DSystem extends System{

  // Fix typescript types for this.
  public objectTypeToTagMap:WeakMap<any,any> = new TagWeakMap();
  public objectTypeToComponentMap:WeakMap<any,any> = new ComponentWeakMap();

  public init(){
    // console.log( this );
  }

  /**
   * Register 
   * @param world 
   */
  public postinit(params:any){

    const world:World = this.world;

    // world.registerComponent( ActiveTag );
    // world.registerComponent( SelectedTag );
    world.registerComponent( CameraTag );
    world.registerComponent( SceneTag );
    world.registerComponent( MeshTag );
    world.registerComponent( UpdatableTag );
    // world
    // world.registerComponent( TransformComponent );

  }


  public execute( delta:number,time:number ){

  }    

  /**
   * Traverse a three.js and register all compatible objects.
   * @param scene
   */
  registerSceneEntities(scene:Scene){

    scene.traverse(this.registerObject3D);

  }

  /**
   * 
   * Create an entity from the supplied Object3D and automatically 
   * create mapped ECS Components and Tags.
   * 
   * The Object3D instances prototype is traversed so all inherited
   * classes can have components attached.
   * 
   */
  registerObject3D =( obj:Object3D )=>{

    const world:World = this.world;
    const entity = world.createEntity();
    entity.addComponent(Object3DComponent,{object:obj});
    
    // @ts-ignore
    if( typeof(obj.update) == 'function' ){
      entity.addComponent(UpdatableTag);
    }
        
    // @ts-ignore
    let p = obj.__proto__;
    while( p !== EventDispatcher.prototype ){

      const TagClass = this.objectTypeToTagMap.get(p.constructor);
      const CompClass = this.objectTypeToComponentMap.get(p.constructor);

      if( TagClass ){
        entity.addComponent(TagClass);
      }

      if( CompClass ){
        entity.addComponent(CompClass);
      }

      p = p.__proto__;

    }

    return entity;

  }

}

const registerObject3DSystem = (world:World,objectHandler:WeakMap):object=>{



  world.registerSystem( Object3DSystem );

  const handleObject3D = (entity:Entity,obj:Object3D)=>{
    entity.addComponent(TransformComponent,obj);
  }

  const handleCamera = (entity:Entity,obj:Camera)=>{
    handleObject3D(entity,obj);
    entity.addComponent(CameraTag);
  }

  const handleMesh = (entity:Entity,obj:Camera)=>{
    handleObject3D(entity,obj);
    entity.addComponent( MeshTag,obj );    
  }  

  const entityHandlers = new WeakMap();
  entityHandlers.set( Object3D,handleObject3D );
  entityHandlers.set( Mesh,handleMesh );
  entityHandlers.set( Camera,handleCamera );
  
  return entityHandlers;

}

export {
  // ActiveTag,
  // SelectedTag,
  CameraTag,
  SceneTag,
  MeshTag,
  // TransformComponent,
  // LayerComponent,
  Object3DComponent,
  Object3DSystem,
  registerObject3DSystem
}