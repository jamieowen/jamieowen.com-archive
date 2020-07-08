import { Stream, merge, sync, fromRAF, fromIterable, CloseMode } from '@thi.ng/rstream';
import { WebGLRenderer, Scene, PerspectiveCamera, Clock, WebGLRendererParameters } from 'three';
import * as tx from '@thi.ng/transducers';

export type RendererEvent = {
  container:HTMLElement,
  renderer:WebGLRenderer,
  scene:Scene,
  camera: PerspectiveCamera
}

export type RenderOpts = {

} & WebGLRendererParameters;


export function renderStream(opts:RenderOpts={}){

  const renderer = new WebGLRenderer(opts);
  const clock = new Clock();
  clock.start()

  const tick = tx.map( i=>{
    
    return {
      renderer,
      clock,
      delta:clock.getDelta(),
      time:clock.getElapsedTime(),
      frame: i
    }

  })

  const stream = merge({
    src: [
      fromRAF().transform( tick )
    ]    
  });

  return stream;

}

// export const renderScene = (scene) => tx.map( r=>r.renderer.render(sce))

export const addToDom = ()=>tx.comp( 
  tx.sideEffect(d=>{


    console.log( 'add to dom' );
  })
)

export function resizeObserverStream(
  domElement: HTMLElement,
  opts:ResizeObserverOptions = { box: 'border-box' }
){
  return new Stream((stream)=>{

    const callback = (entries:ResizeObserverEntry[])=>{
      const entry = entries[0];
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      stream.next({ width, height, entry });
    }

    const observer = new ResizeObserver(callback);
    observer.observe( domElement,opts );

    return ()=>{
      observer.disconnect();
    }

  });
}