import { WebGLRenderer, Scene, Camera } from "three";
import { Engine,EngineParams } from './Engine';
import { EngineEvent } from "./EngineEvent";

class RenderManager{

  public engine:Engine;
  public renderer:WebGLRenderer;

  constructor(engine:Engine,params:EngineParams){

    this.engine = engine;
    this.renderer = new WebGLRenderer({
      antialias:true
    });
    this.renderer.setPixelRatio(2);
    engine.addEventListener( EngineEvent.DOM_RESIZE, this.onEngineEvent );

  }

  public initialise(){

    // Too coupled? don't like this method of access.
    const element = this.engine.dom.domContainer;
    element.appendChild(this.renderer.domElement);

  }

  public resize( width:number,height:number ){
  
    this.renderer.setSize(width,height);

  }
  
  public render( scene:Scene,camera:Camera){
  
    this.renderer.render(scene,camera);

  }

  private onEngineEvent = (event:any)=>{

    switch( event.type ){
      case EngineEvent.DOM_RESIZE:
        const {width,height } = event;
        this.resize(width,height);
        break;      
    }
    
  }


}

export {
  RenderManager
}