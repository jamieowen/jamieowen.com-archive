import { 
  WebGLRenderer,
  WebGLRendererParameters,
  Scene,
  PerspectiveCamera,
  Camera
} from 'three';

export type RendererOpts = {
  domElement:HTMLElement
} & WebGLRendererParameters

export class Renderer{

  renderer:WebGLRenderer;
  domElement:HTMLElement;
  camera:PerspectiveCamera;
  scene:Scene;

  constructor( _opts:RendererOpts ){

    const opts = {
      domElement:document.body,
      ..._opts
    };

    this.renderer = new WebGLRenderer({
      ...{
        antialias:true,
        alpha:false
      },
      ...opts
    });

    this.renderer.setPixelRatio(2); 
    this.domElement = opts.domElement;
    this.domElement.appendChild(this.renderer.domElement);
    this.domElement.style.position = 'absolute';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    const resizeObserver = new ResizeObserver((entries)=>{
      const e = entries[0];
      requestAnimationFrame(()=>{
        this.resize(e.contentRect.width,e.contentRect.height);
      })      
    });

    resizeObserver.observe(this.domElement);    
    
  }

  resize( width:number,height:number ){
    
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width,height);

  }

}

export function createRenderer(opts:RendererOpts){

  const renderer = new Renderer(opts);
  return {
    renderer,
    scene:renderer.scene,
    camera:renderer.camera
  }

}