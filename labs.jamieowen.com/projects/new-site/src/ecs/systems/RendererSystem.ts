import { System, Entity, World } from "ecsy";
import { WebGLRenderer } from "three";
import { DomResize } from "./DomSystem";

class RendererSystem extends System{

  static queries = {
    resize: { components:[DomResize], listen: { changed: true } }
  }

  public renderer:WebGLRenderer;

  getResize():DomResize{
    return this.queries.resize.results[0].getComponent(DomResize);
  }

  getChangedResize():DomResize{
    if(this.queries.resize.changed.length > 0 ){
      return this.queries.resize.changed[0].getComponent(DomResize);
    }else{
      return null;
    }
  }

  public init(){
      
    const resize:DomResize = this.getResize();
    const domElement:HTMLElement = resize.target;

    console.log( 'Init Renderer:', resize );
    
    this.renderer = new WebGLRenderer({
      antialias:true
    })
    this.renderer.setPixelRatio(2);
    domElement.appendChild(this.renderer.domElement);

  }

  public execute(delta:number,time:number){    

    const resized:DomResize = this.getChangedResize();
    if( resized ){
      console.log( 'Resized', resized );
      this.renderer.setSize(
        resized.bounds.max.x,
        resized.bounds.max.y
      );
    }
    
  }

}

const registerRendererSystem = ( world:World )=>{

  world.registerSystem( RendererSystem );

}

export {
  RendererSystem,
  registerRendererSystem
}