import { Stream, sync, merge } from '@thi.ng/rstream';
import { WebGLRenderer, Scene, PerspectiveCamera, WebGLRendererParameters, Raycaster, Camera, Vector2, Plane, Vector3 } from 'three';
import { tickStream, TickEvent } from  './tick-stream';
import { resizeObserverStream, ResizeEvent } from './resize-stream';
import { perspectiveCameraStream, sceneStream } from './object-stream';
import { addToDom, resizeRenderer, resizeCamera } from './render-ops';
import { gestureStream, GestureEvent } from '@thi.ng/rstream-gestures';
import { map } from '@thi.ng/transducers';
import { IntersectionHelper } from './IntersectionHelper';

export function rendererStream(opts:WebGLRendererParameters = {}){
  return new Stream<WebGLRenderer>((stream)=>{
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
  camera: PerspectiveCamera,
  scene: Scene,
  resize: ResizeEvent
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
  
  const stream = sync<any,RenderEvent>({
    src: { 
      tick,
      renderer,
      resize,
      scene,
      camera
    }
  }).transform<RenderEvent>(
    addToDom(),
    resizeRenderer(),
    resizeCamera()
  );

  // const raycaster = new Raycaster();
  // const mouse = new Vector2();
  // const planes = {
  //   xy: new Plane( new Vector3(0,1,0) ),
  //   xz: new Plane( new Vector3(0,0,1) ),
  //   yz: new Plane( new Vector3(1,0,0) )
  // }
  // const 

  const intersect = new IntersectionHelper();
  
  const gestures = gestureStream(domElement,{
    preventDefault:false,
    eventOpts: {
      capture: false
    }
  });
  let gevent = null;
  gestures.transform(
    map(e=>gevent=e)
  );

  return stream.transform( 
    map( (e:RenderEvent)=>{
      
      if( gevent && gevent.pos ){
        const [x,y] = gevent.pos;
        const {width,height} = e.resize;
        const mx = ( x / width ) * 2.0 - 1.0;
        const my = ( ( y / height ) * 2.0 ) - 1.0;

        intersect.setFromCamera( mx,-my,e.camera );
        const intersects = intersect.raycaster.intersectObjects(e.scene.children,true);
        // console.log( mx, my, y, height, intersects );
        if( intersects.length ){
          console.log( 'IN:', intersects );
        }
      }else{
        // console.log( ge );
      }
      
      // return e;

      return {
        ...e,
        intersect,
        gestures: gevent
      }
    })
  ) 

}

