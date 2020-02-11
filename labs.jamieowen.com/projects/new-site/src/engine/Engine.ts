import { EventDispatcher, Camera, Scene } from "three";
import { DomManager } from "./DomManager";
import { RenderManager } from "./RenderManager";
import { ObjectManager } from "./ObjectManager";
import { DebugManager } from "./DebugManager";

type EngineParams = {
  domElement:HTMLElement,
  scrollElement:HTMLElement,
  renderOnce:false,
  autoResize:true
}

class Engine extends EventDispatcher{

  public dom:DomManager;
  public renderer:RenderManager;
  public objects:ObjectManager;
  public debug:DebugManager; // Should be an optinal include
  public running:boolean = false;

  private customRender:Function;

  constructor(params:EngineParams){

    super(); 

    this.dom = new DomManager(this,params);
    this.objects = new ObjectManager(this,params);
    this.debug = new DebugManager(this,params); // Should be an optional include
    this.renderer = new RenderManager(this,params);

    this.dom.initialise();
    this.objects.initialise();    
    this.renderer.initialise();    

    this.debug.initialise();

    this.start();

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

    if( this.customRender ){
      this.customRender( this.renderer,scene,camera );
    }else{
      this.renderer.render( scene,camera );
    }
    
    if( this.running ){
      requestAnimationFrame( this.tick );
    }

  }

  public setCustomRender( render:Function ){    
    this.customRender = render;
  }

}


export {
  Engine,
  EngineParams
}