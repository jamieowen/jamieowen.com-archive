import {
  WebGLRenderer,
  WebGLRendererParameters,
  Scene,
  Camera,
  PerspectiveCamera,
  Box3,
  Object3D,
  OrthographicCamera
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


class Collection<T> extends Array<T>{
  /** Based on : https://blog.simontest.net/extend-array-with-typescript-965cc1134b3 */
  private constructor(items?: Array<T>) {
    super(...items)
  }
  static create<T>(): Collection<T> {
      return Object.create(Collection.prototype);
  }
  public add(item:T):number{
    this.push(item);
    return this.length-1;
  }
  /** Need to extend properly and dispatch update events. */
}

enum ClearBuffer{
  DEPTH = 'depth',
  STENCIL = 'stencil',
  COLOR = 'color'
}

interface Pass{
  scene: string | Scene,
  camera: string | Camera,
  layers: Array<string>,
  pipeline: string,
  clear: Array<ClearBuffer>
}

interface EffectPipeline{

}


const createDomElement = ( type:string, style:any ):HTMLElement =>{
  const ele:HTMLElement = document.createElement(type);
  for( let s in style ){
    ele.setAttribute(s,style[s]);
  }
  return ele;
}

const defaultParams:WebGLRendererParameters = {
  antialias:true
}

class Renderer{

  public renderer:WebGLRenderer;
  public domElement:HTMLElement;
  public bounds:Box3 = new Box3(); // Indicates a non-enforced bounds for typical placement of content

  public layers:Collection<string> = Collection.create<string>();
  public scenes:Collection<Scene> = Collection.create<Scene>();
  public cameras:Collection<Camera> = Collection.create<Camera>();
  public passes:Collection<Pass> = Collection.create<Pass>();
  public effects:Collection<EffectPipeline> = Collection.create<EffectPipeline>();
  // public controls:Collection<Object3D> = Collection.create<Object3D>();

  private defaultCamera:Camera = new PerspectiveCamera(75,1/1,0.1,100);
  private defaultScene:Scene = new Scene();
  // private defaultControls:OrbitControls;

  private resizeObserver:any; // ResizeObserver TS defs missing?
  
  public isRunning:boolean = false;
  public isMounted:boolean = false;

  constructor(params?:WebGLRendererParameters){
    
    this.renderer = new WebGLRenderer(
      Object.assign({},defaultParams,params)
    )
    this.renderer.setPixelRatio(2);
    this.domElement = createDomElement('div',{
      margin: '0px',
      padding: '0px'
    });
    this.domElement.appendChild(this.renderer.domElement);
    this.bounds.setFromArray([0,0,0,0,0,0]).expandByScalar(50);
    this.defaultCamera.position.z = 25;
    // this.defaultControls = new OrbitControls(this.defaultCamera,this.domElement);

  }

  public start(update?:Function):void{
    if( !this.isRunning ){
      this.isRunning = true;
      this.render(update);
    }
  }

  private resolveScene(name?:String):Scene{
    let res:Scene = null;
    if( name ){
      this.scenes.forEach((scene)=>{
        if( scene.name === name ){
          res = scene;
        }
      })
    } 
    return res || this.scenes.length > 0 ? this.scenes[0] : this.defaultScene;
  }

  private resolveCamera(name?:string):Camera{
    let res:Camera = null;
    if( name ){
      this.cameras.forEach((camera)=>{
        if( camera.name === name ){
          res = camera;
        }
      })
    }
    return res || this.cameras.length > 0 ? this.cameras[0] : this.defaultCamera;
  }  

  private render(update?:Function){

    if( update ){
      update();
    }
    const {
      passes,renderer,layers
    } = this;

    if( passes.length === 0 ){
      const scene = this.resolveScene();
      const camera = this.resolveCamera();
      renderer.autoClear = true;
      renderer.render(scene,camera);
    }else{
      renderer.autoClear = false;
      renderer.clear();

      passes.forEach((pass:Pass)=>{    

        const scene = this.resolveScene(<string>pass.scene);
        const camera = this.resolveCamera(<string>pass.camera);

        if( pass.layers ){
          camera.layers.disableAll();
          pass.layers.forEach((layer)=>{
            const idx = layers.indexOf(layer);
            camera.layers.enable(idx);
          })
        }else{
          camera.layers.enableAll();
        }
        
        // console.log( 'Render',scene,camera );
        // console.log( 'isDefaultCamera:', camera === this.defaultCamera );
        // console.log( 'isDefaultScene', scene === this.defaultScene );
        // const scene:Scene = pass.scene instanceof String ? this.findScene(pass.scene) : pass.scene || defaultScene;
        
        renderer.render(scene,camera);
        
        // set camera layer masks.
        // clear buffers

      })
    }

    if( this.isRunning ){
      requestAnimationFrame(()=>{
        this.render(update);
      });
    }

  }

  /**
   * 
   * Set the size of the renderer and containing dom elements.
   * 
   * @param w 
   * @param h 
   */
  public setSize(w:number=400,h:number=300){

    this.renderer.setSize(w,h);
    const cameras = this.cameras.slice(0).concat(this.defaultCamera);
    cameras.forEach((cam,i)=>{
      console.log('UPDATE CAM',i )
      if( cam instanceof PerspectiveCamera ){        
        cam.aspect = w/h;
        cam.updateProjectionMatrix();
      }else
      if( cam instanceof OrthographicCamera ){
        cam.top = 0;
        cam.left = 0;
        cam.right = w;
        cam.bottom = h;
        cam.updateProjectionMatrix();
      }
    })

  }

  public mount(ele:HTMLElement,autoResize=true){    

    if( !this.isMounted ){

      if( autoResize ){
        // @ts-ignore
        this.resizeObserver = new ResizeObserver((entries)=>{
          const e = entries[0];
          this.setSize(
            e.contentRect.width,
            e.contentRect.height
          );
        });
        
        this.domElement.style.backgroundColor = 'blue';
        this.domElement.style.width = '100%';
        this.domElement.style.height = '100%';
        this.domElement.style.position = 'absolute';

        ele.appendChild(this.domElement);
        this.resizeObserver.observe(this.domElement);
        this.isMounted = true;
      }
    }

  }

  public unmount(ele:HTMLElement){

    if(this.isMounted && ele.contains(this.domElement)){
      if( this.resizeObserver ){
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      ele.removeChild(this.domElement);
      this.isMounted = false;      
    }

  }

}

export {
  Renderer
}