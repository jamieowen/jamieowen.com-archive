import { Renderer } from "./src/three/Renderer"
// import { ECSScene, EntityObject3D } from "./src/ecs/objects";
import { Object3D, Vector3, Scene, Mesh } from "three";
import { World, System, Component, Entity } from "ecsy";
import { TransformComponent, GeometryComponent, MaterialColorComponent } from "./src/ecs/components";
import { Application } from "./src/ecs/Application";

interface IPhysicsComponent{
  mass:number,
  position:Vector3
}

class PhysicsComponent extends Component implements IPhysicsComponent{

  public mass:number = 1;
  public position:Vector3;

  reset(){
    this.mass = 1;
  }

}

class PhysicsObject extends Object3D implements IPhysicsComponent{
  public mass:number = 10;
}

class RenderSystem extends System{

  static queries = {
    physics: { components: [ PhysicsComponent ] },
    transform: { components: [ TransformComponent ] }
  }

  init(){
    // console.log( 'Hello System', this );
  }

  execute(delta:number,time:number){
    console.log( 'exe',this)
    const { physics,transform } = this.queries;

    physics.results.forEach((e)=>{
      const comp = e.getComponent(PhysicsComponent);
      console.log( comp );
    })

    transform.results.forEach((e)=>{
      const comp = e.getComponent(TransformComponent);
      console.log( comp );
    })    

  }

}

const addMeshEntity = (world:World,mesh:Mesh):Entity =>{

    return world.createEntity()
      .addComponent(TransformComponent,mesh)
      .addComponent(GeometryComponent,mesh)
      .addComponent(MaterialColorComponent,mesh)
    
}

const addPhysicsEntity = (world:World,obj:PhysicsObject):Entity =>{

  return world.createEntity()
    .addComponent(TransformComponent,obj)
    .addComponent(PhysicsObject,obj)  
  
}

const addSceneEntities = (world:World,scene:Scene):Array<Entity> =>{

  const entities:Array<Entity> = [];
  console.log( 'Traverse' ); 
  scene.traverse((obj:Object3D)=>{

    let entity:Entity;
    if( obj instanceof Mesh ){      
      entity = addMeshEntity(world,obj);
      console.log( 'Add Mesh Entity', entity, obj );
    }else
    if( obj instanceof PhysicsObject ){
      entity = addPhysicsEntity(world,obj);
    }

    if( entity ){
      entities.push(entity);
    }    

  })

  return entities;
}


class App extends Application{


  init(){   
    const scene = new Scene();
    console.log( 'INIT');
  }  

}


window.onload = ()=>{

  document.body.style.margin = '0px';
  document.body.style.width = '100%';
  document.body.style.height = '100%';

  const app = new App();

  // const domElement = document.body;
  // const renderer:Renderer = new Renderer(domElement);

  // const world = new World();
  // world.registerComponent(PhysicsComponent);
  // world.registerComponent(TransformComponent);  
  // world.registerSystem(RenderSystem);

  // const scene = new Scene();
  // const obj = new PhysicsObject();
  // 
  // scene.add( obj );

  // addSceneEntities(world,scene);
  
  // // const e1 = world.createEntity().addComponent(PhysicsComponent);
  // // const e2 = world.createEntity().addComponent(PhysicsComponent, new PhysicsObject() );

  // // console.log( e1,e2 );

  // world.execute(0,0);


}


// interface IPhysicsComponent{
//   mass:number;
// }

// class CustomObject extends Object3D implements IPhysicsComponent{

//   public mass:number;

//   constructor(){
//     super();
//   }
// }