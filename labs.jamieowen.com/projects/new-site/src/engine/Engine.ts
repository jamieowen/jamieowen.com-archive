import { EventDispatcher, Camera, Scene, Box3 } from "three";
import { DomManager } from "./DomManager";
import { RenderManager } from "./RenderManager";
import { ObjectManager } from "./ObjectManager";
import { DebugManager } from "./DebugManager";

type EngineParams = {
  domElement:HTMLElement,
  scrollElement:HTMLElement,
  renderOnce:boolean,
  autoResize:boolean
}

const defaultParams:EngineParams = {
  domElement:null,
  scrollElement:null,
  renderOnce:false,
  autoResize:true
}

class Engine extends EventDispatcher{

  public worldBounds:Box3 = new Box3(); // a general world space to use for scale

  public dom:DomManager;
  public renderer:RenderManager;
  public objects:ObjectManager;
  public debug:DebugManager; // Should be an optinal include
  public running:boolean = false;

  private renderOverride:Function;

  constructor(params:EngineParams){

    super(); 

    this.dom = new DomManager(this,params);
    this.objects = new ObjectManager(this,params);
    this.debug = new DebugManager(this,params); // Should be an optional include
    this.renderer = new RenderManager(this,params);

    /**
     * TODO: This initialisation order needs looking at.
     * During the setup() function, custom objects can be added to 
     * the objects manager.
     * 
     * The key thing is we need to ensure that all objects are registered
     * before we dispatch key manager events ( resize, scroll, etc )
     * 
     * Also,if objects are added/removed post setup - this would cause
     */
    this.objects.initialise();
    this.debug.initialise();
    this.setup(this.objects.defaultScene,this.objects.defaultCamera);

    this.dom.initialise();     
    this.renderer.initialise();    
    
    
    this.start();

  }

  /**
   * 
   * Override in sub class to setup default scene and register any objects.
   * 
   * @param scene 
   * @param camera 
   */  
  public setup(scene:Scene,camera:Camera){
    throw new Error('Override setup function in base class.');
  }

  public start(){
    if( !this.running ){
      this.running = true;
      this.tick();
    }
  }

  public stop(){
    this.running = false;
  }

  public tick =()=>{

    const camera:Camera = this.objects.getActiveCamera();
    const scene:Scene = this.objects.getActiveScene();
    
    this.debug.update();
    this.objects.update();    

    if( this.renderOverride ){
      this.renderOverride( this.renderer,scene,camera );
    }else{
      this.renderer.render( scene,camera );
    }
    
    if( this.running ){
      requestAnimationFrame( this.tick );
    }

  }

  public setRenderOverride( render:Function ){    
    this.renderOverride = render;
  }

}


export {
  Engine,
  EngineParams
}