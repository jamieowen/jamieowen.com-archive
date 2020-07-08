import { 
  WebGLRenderer,
  WebGLRendererParameters,
  Scene,
  PerspectiveCamera
} from 'three';

export type CreateRendererOpts = {
    domElement:HTMLElement
} & WebGLRendererParameters


function createContainer(position:string){
  const container = document.createElement('div');
  container.style.position = position;
  container.style.width = '100%';
  container.style.height = '100%';
  return container;
}

export function createRenderer( _opts:CreateRendererOpts ){

  const opts = {
    domElement:document.body,
    ..._opts
  }
    
  const renderer: WebGLRenderer = new WebGLRenderer({
    ...{
      antialias:true,
      alpha:false
    },
    ...opts
  });
  
  const scene: Scene = new Scene();
  const camera: PerspectiveCamera = new PerspectiveCamera();

  /** Create container to place renderer - and to listen on resize observer */
  /** Two containers with the outer as absolute prevents containers auto resizing on a loop in certain conditions. */
  const outer = createContainer('absolute'); 
  const inner = createContainer('relative');
  outer.appendChild(inner);
  inner.appendChild(renderer.domElement);
  opts.domElement.appendChild(outer);
  renderer.setPixelRatio(2);

  /** Resize the renderer using resize observer */
  const resizeObserver = new ResizeObserver((entries)=>{
    const e = entries[0];
    resize(e.contentRect.width,e.contentRect.height);
  });  
  resizeObserver.observe(inner);
  
  /** Allow disposing of resize observer */
  function dispose(){
    resizeObserver.disconnect();
  }

  function resize( width,height ){    
    renderer.setSize(
      width,height
    );
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    console.log( 'resize',width,height );
  }

  return {
    renderer,
    scene,
    camera,
    dispose,
    resize
  }

}