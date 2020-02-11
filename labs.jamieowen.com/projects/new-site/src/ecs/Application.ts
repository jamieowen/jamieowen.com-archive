import { World } from "ecsy";
import { Scene, Clock, Object3D, EventDispatcher } from "three";
import { RendererSystem } from "./systems/RendererSystem";
import { DomSystem } from "./systems/DomSystem";
import { Object3DSystem } from "./systems/Object3DSystem";


/**
 * 

 RenderEngine
 Determine the base needs..
 ECS Can build / expose on top of this.
 dom
  -- resize element
  -- scroll element
 renderer 
 events
  -- global event system
 cameras
  -- cameraAdded,cameraRemoved,setActiveCamera
 scenes 
  -- sceneAdded,sceneRemoved,setActiveScene
 layers
  -- layerAdded
 updatables
  -- add new scene -> traverse and call setup & update()
  -- call update()?
 interaction
  -- dispatch global events
  -- dispatch events on object.
 controls

 ecs

 setup()
 update()


 */


class Application{

  public domElement:HTMLElement;
  public scrollElement:HTMLElement;
  public world:World = new World();
  public clock:Clock = new Clock();

  public running:boolean = false;
  public events:EventDispatcher = new EventDispatcher();

  constructor(domElement:HTMLElement=null){

    this.domElement = domElement || document.body;

    this.initInternals();
    this.init();
    this.start();

  }

  private initInternals(){

    const systems = this.getSystems();

    systems.forEach((s:any)=>{
      this.world.registerSystem(s.system);
      const system = this.world.getSystem(s.system);

      // Would be nice if ecsy allowed params to be passed to a system.
      // @ts-ignore
      system.postinit(s.params);
    })
    
  }

  /**
   * Overridable method to return the apps list of startup systems.
   */
  public getSystems():Array<object>{

    return [
      { system:DomSystem, params:{ domElement:this.domElement, scrollElement:this.scrollElement } },
      { system:Object3DSystem },
      { system:RendererSystem }
    ]
    
  }

  public init(){
  
  }

  public start(){

    if( this.running ){
      return;
    }

    this.running = true;
    this.tick();

  }

  public tick =()=>{

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.elapsedTime;

    this.world.execute(delta,elapsedTime);

    if( this.running ){
      requestAnimationFrame( this.tick );
    }

  }

  /**
   * 
   * Until three.js has better event handling / bubbling, traverse a scene
   * and register entities/components via the handler lookup.
   * 
   * Obviously unregistering objects become less automatic.
   * 
   * @param scene 
   */
  public registerScene( scene:Scene ){
    const objectSystem:Object3DSystem = <Object3DSystem>this.world.getSystem(Object3DSystem);
    objectSystem.registerSceneEntities(scene);
  }

  public registerObject3D( obj:Object3D ){
    const objectSystem:Object3DSystem = <Object3DSystem>this.world.getSystem(Object3DSystem);
    objectSystem.registerObject3D( obj );
  }

  public addCamera(){
    // ?
  }

  public addLayer( name:string ){
    // ?
  }

}

export {
  Application
}


/**
 * Traversal Functions
 */

// interface IPhysicsComponent{
//   mass:number,
//   position:Vector3
// }

// class PhysicsComponent extends Component implements IPhysicsComponent{

//   public mass:number = 1;
//   public position:Vector3;

//   reset(){
//     this.mass = 1;
//   }

// }

// class PhysicsObject extends Object3D implements IPhysicsComponent{
//   public mass:number = 10;
// }

// const addMeshEntity = (world:World,mesh:Mesh):Entity =>{

//     return world.createEntity()
//       .addComponent(TransformComponent,mesh)
//       .addComponent(GeometryComponent,mesh)
//       .addComponent(MaterialColorComponent,mesh)
    
// }

// const addPhysicsEntity = (world:World,obj:PhysicsObject):Entity =>{

//   return world.createEntity()
//     .addComponent(TransformComponent,obj)
//     .addComponent(PhysicsObject,obj)  
  
// }

// const addSceneEntities = (world:World,scene:Scene):Array<Entity> =>{

//   const entities:Array<Entity> = [];
//   console.log( 'Traverse' ); 
//   scene.traverse((obj:Object3D)=>{

//     let entity:Entity;
//     if( obj instanceof Mesh ){      
//       entity = addMeshEntity(world,obj);
//       console.log( 'Add Mesh Entity', entity, obj );
//     }else
//     if( obj instanceof PhysicsObject ){
//       entity = addPhysicsEntity(world,obj);
//     }

//     if( entity ){
//       entities.push(entity);
//     }    

//   })

//   return entities;
// }