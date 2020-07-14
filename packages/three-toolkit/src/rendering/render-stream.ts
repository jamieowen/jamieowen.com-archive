import { Stream, sync, merge } from '@thi.ng/rstream';
import { WebGLRenderer, Scene, PerspectiveCamera, WebGLRendererParameters, Raycaster } from 'three';
import { gestureStream2d, gestureStream3d } from './gesture-stream';
import { tickStream, TickEvent } from  './tick-stream';
import { resizeObserverStream } from './resize-stream';
import { perspectiveCameraStream, sceneStream } from './object-stream';
import { addToDom, resizeRenderer, resizeCamera } from './render-ops';
import { gestureStream } from '@thi.ng/rstream-gestures';


export function rendererStream<WebGLRenderer>(opts:WebGLRendererParameters = {}){
  return new Stream((stream)=>{
    const _opts:WebGLRendererParameters = {
      antialias: true,
      ...opts
    }
    const renderer = new WebGLRenderer(_opts);
    stream.next(renderer);
  })
}


type RenderEvent = {
  tick: TickEvent,
  renderer: WebGLRenderer,  
}

type RenderOpts = {
  camera?: PerspectiveCamera;
  scene?: Scene
}

export function renderStream( 
  domElement: HTMLElement,
  opts: RenderOpts = {}
){

  const tick = tickStream();
  const renderer = rendererStream();
  const resize = resizeObserverStream(domElement);
  const camera = perspectiveCameraStream( opts.camera );
  const scene = sceneStream( opts.scene );  
  const gestures = gestureStream3d(domElement);
  
  const stream = sync({
    src: { 
      tick,
      renderer,
      resize,
      scene,
      camera
    }
  }).transform(
    addToDom(),
    resizeRenderer(),
    resizeCamera()
  )


  const gstream = sync({  
    src: {
      // gestures
    }
  })


  console.log( stream );

  return stream;   

}

