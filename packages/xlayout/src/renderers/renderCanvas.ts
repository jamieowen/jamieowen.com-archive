import { derefContext } from "@thi.ng/hiccup";
import * as hdom from '@thi.ng/hdom';
import * as hdomCanvas from '@thi.ng/hdom-canvas';
import { Node,BoundsNode } from '../nodes';
import { Vec } from '@thi.ng/vectors';

export type CanvasRenderOpts = {
  size:Vec,
  renderOnce:boolean
}

const defaultOpts:CanvasRenderOpts = {
  size:null,
  renderOnce:true
}

export type CanvasRenderAPI = {
  domElement:HTMLElement,
  renderOnce:()=>void,
  pause:()=>void,
  unpause:()=>void
}

export function renderCanvas(node:any,opts?:CanvasRenderOpts):CanvasRenderAPI{

  opts = Object.assign({},defaultOpts,opts);

  if( node instanceof BoundsNode && !opts.size ){
    opts.size = (<BoundsNode>node).bounds;
  }else
  if( !opts.size ){
    opts.size = [100,100];
    console.warn( 'No size supplied to Canvas render. Wrap in BoundsNode or specify size.' );
  }

  const attributes = {
    width: opts.size[0],
    height: opts.size[1],
  }

  const impl = hdom.DEFAULT_IMPL;
  const tree = [
    
    'div',
    { style:{ display:'inline', position:'relative' } },
    [
      hdomCanvas.canvas,attributes,
      // only need to pass root node which then expands itself via
      // .toHiccup() during rendering
      node
    ]    
  ]

  const _opts = { root: "app", ...opts };
  
  let prev: any[] = [];
  let isActive = !opts.renderOnce;
  const root:HTMLElement = document.createElement('div');  

  // const root = hdom.resolveRoot(_opts.root, impl);
  const update = () => {
    console.log( 'update',opts.renderOnce);
    attributes.width = node.bounds[0];
    attributes.height = node.bounds[1];
    
    _opts.ctx = derefContext(opts.ctx, _opts.autoDerefKeys);
    const curr = impl.normalizeTree(_opts, tree);
    if (curr != null) {
        if (_opts.hydrate) {
            impl.hydrateTree(_opts, root, curr);
            _opts.hydrate = false;
        } else {
            impl.diffTree(_opts, root, prev, curr);
        }
        prev = curr;
    }
    // check again in case one of the components called cancel
    isActive && requestAnimationFrame(update);
  };
  
  if( !opts.renderOnce ){
    isActive = true;
    requestAnimationFrame(update);
  }

  update();
  // return () => (isActive = false);

  return {
    domElement:<HTMLElement>root,
    renderOnce:()=>{
      update();
    },
    pause:()=>{
      isActive = false;
    },
    play:()=>{
      if( !isActive ){
        isActive = true;
        update();
      }
    }
  }
  
}