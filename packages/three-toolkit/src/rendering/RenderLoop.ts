import { Renderer, renderer } from "./Renderer";

type RenderOpts = {
  renderer:Renderer
}

class RenderLoop{

  constructor(opts:RenderOpts){

  }


}

export function render(opts:RenderOpts):Render{
  return new Render(opts);
}

/**
 
  renderer.render((r)=>{

    r.clear();
    r.
    
  });

  render( renderer )
  .clear()
  .camera( camera )
  .controls( orbitControls )
  .render( scene, layers )
  .effectPass()
  .render( scene, [ Layers.FOREGROUND ])


 */

