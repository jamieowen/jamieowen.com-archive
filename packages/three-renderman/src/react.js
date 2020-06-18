import React,{
  useRef
} from 'react';

import {   
  extend,
  useRender
} from 'react-three-fiber';

import {
  Renderer,
  Cameras,
  RenderLayer,
  Pipeline,
  Compositor,
  Viewport,
  Scenes
} from './implementation';

extend({
  ImplRenderer:Renderer,
  ImplViewport:Viewport,
  ImplCameras:Cameras,
  ImplRenderLayer:RenderLayer,
  ImplPipeline:Pipeline,
  ImplCompositor:Compositor,
  ImplScenes:Scenes
});

const renderer = (props)=>{
  const renderer = useRef();
  let once = false;
  useRender( ({gl,scene,camera})=>{
    if( once ){
      return;
    }
    // once = true;
    renderer.current.render(gl,scene,camera);
    // renderer.current.render(gl,scene,camera);
    
  },true);
  return <implRenderer {...props} ref={renderer}/>
}

const viewport = props=>{
  return <implViewport {...props}/>
}

const scenes = props=>{
  return <implScenes {...props}/>
}

const cameras = props=>{
  return <implCameras {...props}/>
}

const renderLayer = props=>{
  return <implRenderLayer {...props}/>
}

const pipeline = props=>{
  return <implPipeline {...props}/>
}

const compositor = props=>{
  return <implCompositor {...props}/>
}

export {
  renderer,
  cameras,
  viewport,
  compositor,
  renderLayer,
  pipeline,
  scenes
}



