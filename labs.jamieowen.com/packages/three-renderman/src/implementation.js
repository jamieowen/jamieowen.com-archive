import {
  Group,
  Scene
} from 'three';

import {
  renderGraph
} from './renderGraph';

class Renderer extends Group{
  constructor(){
    super();
    console.log( 'Create Renderer' );
    this.addEventListener( 'childAdded', ()=>{
      console.log( 'added' );
    })
  }
  render(renderer,scene,camera){
    renderGraph( this,renderer,scene,camera );
  }
}

class Viewport extends Group{
  constructor(){
    super();
    this.isViewport = true;
    this._layout = null;
  }  
  get layout(){
    if( this._layout ){
      return this._layout;
    }else
    if( this.parent && this.parent.isViewport ){
      return this.parent.layout;
    }
  }
  set layout(value){
    this._layout = value;
  }
}

class Scenes extends Group{
  constructor(){
    super();
    // default scene?
    this.isScenes = true;
  }  
}

class Cameras extends Group{
  constructor(){
    super();
    this.isCameras = true;
    // default perspective?
    // default ortho?
  }
}

class Compositor extends Group{
  constructor(){
    super();
    this.isCompositor = true;
  }
}

class Pipeline extends Group{
  constructor(){
    super();
    this.isPipeline = true;
  }
}

class RenderLayer extends Group{
  constructor(){
    super();
    this.isRenderLayer = true;
  }
}

export {
  Renderer,
  Cameras,
  RenderLayer,
  Pipeline,
  Compositor,
  Viewport,
  Scenes
}