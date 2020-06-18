import { Scene, PerspectiveCamera, BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, HemisphereLight, Camera, EventDispatcher } from "three";
import { Application } from "./src/ecs/Application";


class PhysicsMesh extends Mesh{
  // static components = [ PhysicsComponent, InteractiveComponent ];
  // public physics:PhysicsComponen;
}

class MyMesh extends Mesh{

  constructor(geometry,material){
    super(geomety,material);

    this.addEventListener( 'addedToScene', ()=>{

    })

  }


  removedFromScene(){

  }

  update(){

  }

}

class App extends Application{

  setup( s:Scene, c:Camera ){   

    // this.registerSystem( DomScrollSystem, { tension: 1, track: 2, scrollElement:} );
    // this.registerSystem( DebugSystem );

    // interactionSystem.addComponents( mesh.entity );
    // physicsSystem.addPhysics( mesh );

    // this.add
    const scene = new Scene();
    const camera = new PerspectiveCamera(45,1/1,0.1,1000);
    const geometry = new BoxBufferGeometry(1,1,1,1,1,1);
    const material = new MeshLambertMaterial({color:'crimson'});
    const hemLight = new HemisphereLight();

    let mesh:Mesh;
    for( let i = 0; i<20; i++ ){
      mesh = new Mesh(geometry,material);      
      mesh.position.x = ( i * 1 ) + ( i * 0.1 );
      mesh.userData.components = [
        // [ PhysicsComponent, { mass: 0, tension: 1 } ],
        // [ InteractiveComponent ], { interactive:true } ]
      ]
      scene.add( mesh );
      
    }
    
    camera.position.z = 100;

    scene.add( camera );
    scene.add( hemLight );

    this.registerScene(scene);
    // this.getObject3DEntity(camera).addComponent( ActiveTag )
    // const camera = s

  } 

}


window.onload = ()=>{

  document.body.style.margin = '0px';
  document.body.style.width = '100%';
  document.body.style.height = '100%';

  const app = new App();

}