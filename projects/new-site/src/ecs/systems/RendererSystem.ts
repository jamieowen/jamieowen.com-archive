import { System, Entity, World } from "ecsy";
import { WebGLRenderer, PerspectiveCamera } from "three";
import { DomResize } from "./DomSystem";
import { CameraTag, SceneTag, Object3DComponent } from "./Object3DSystem";

class RendererSystem extends System{

  static queries = {
    resize: { components:[DomResize], listen: { changed: true } },
    cameras: { components: [ CameraTag ], listen: { changed: true } },
    scenes: { components: [ SceneTag ] } 
  }


  public renderer:WebGLRenderer;

  public init(){
      
    const resize:DomResize = this.getResize();
    const domElement:HTMLElement = resize.target;

    console.log( 'Init Renderer:', resize );
    
    this.renderer = new WebGLRenderer({
      antialias:true
    })
    this.renderer.setPixelRatio(2);
    this.defaultCamera = new PerspectiveCamera()

    domElement.appendChild(this.renderer.domElement);
    this.resize();

  }

  public postinit(params:any){
    console.log( 'post init renderer');

    let camera = null;
    this.queries.cameras.changed.forEach( (e:Entity)=>{
      console.log( 'QUERY' );
      const obj = e.getComponent(Object3DComponent);
      console.log( obj );
    })

  }

  public resize(){

    const resize:DomResize = this.getResize();
    this.renderer.setSize(
      resize.bounds.max.x,
      resize.bounds.max.y
    );

  }

  public execute(delta:number,time:number){    

    const resized:DomResize = this.getChangedResize();
    if( resized ){
      this.resize();
    }
        
  }

  public getResize():DomResize{
    return this.queries.resize.results[0].getComponent(DomResize);
  }

  public getChangedResize():DomResize{
    if(this.queries.resize.changed.length > 0 ){
      return this.queries.resize.changed[0].getComponent(DomResize);
    }else{
      return null;
    }
  }  

}

export {
  RendererSystem
}