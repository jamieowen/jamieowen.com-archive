import { World } from "ecsy";
import { Scene, Clock } from "three";
import { registerRendererSystem } from "./systems/RendererSystem";
import { registerDomSystem } from "./systems/DomSystem";
import { registerObject3DSystem } from "./systems/Object3DSystem";

class Application{

  public domElement:HTMLElement;
  public world:World;
  public clock:Clock;

  private running:boolean = false;

  constructor(domElement:HTMLElement=null){

    this.domElement = domElement || document.body;

    this.initInternals();
    this.init();

    this.start();

  }

  private initInternals(){

    this.world = new World();

    this.registerDomSystem();
    this.registerObject3DSystem();
    this.registerRendererSystem();

    this.clock = new Clock();
    
  }

  /**
   * Override to implement custom renderer system.
   */
  public registerDomSystem(){
    registerDomSystem( this.world, this.domElement );
  }

  public registerObject3DSystem(){
    registerObject3DSystem(this.world);
  }

  public registerRendererSystem(){
    registerRendererSystem( this.world );
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

  public addScene( scene:Scene ){
    // ?
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