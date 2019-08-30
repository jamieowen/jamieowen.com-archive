
const collectTypes = (obj,byType)=>{

  const types = byType || { 
    cameras: [],
    viewports: [],
    pipelines: [],
    compositors: [],
    renderLayers: [],
    scenes:[]
  };

  const len = obj.children.length;
  obj.leaf = len === 0 ? true : false;
  
  for( let i=0; i<len&&!obj.leaf; i++ ){

    const child = obj.children[i];
    const type = child.__proto__.constructor.name;  

    switch( type ){
      case 'Viewport':
        types.viewports.push(child);
        collectTypes(child,types);
        break;
      case 'Cameras':
        // child.leaf = true;
        // types.cameras.push(child);
        collectTypes(child,types);
        break;
      case 'Pipeline':
        types.pipelines.push(child);
        collectTypes(child,types);
        break;
      case 'Compositor':
        types.compositors.push(child);
        collectTypes(child,types);
        break;
      case 'RenderLayer':
        types.renderLayers.push(child);
        child.leaf = true;
        break;
      case 'Scenes':
        // Only collect inner scenes.
        // types.scenes.push(child);
        // console.log( 'len', child.children.length );
        collectTypes(child,types);
        // child.leaf = true;
        break;      
      case 'Scene':
        types.scenes.push(child);
        break;
      default :
        // don't allow incompatible types in hierarchy
        // obj.leaf = true;
        if( child.isCamera ){
          types.cameras.push(child);
        }else{
          console.warn('Skipped Type :',type,child);
        }
        
    }    
  }

  return types;

}


const layoutViewport = (viewport,width,height,x,y)=>{

  if( viewport.leaf ){
    viewport.viewBounds = {
      x,y,width,height
    };
  }else{
    const len = viewport.children.length;
    const method = viewport.layout || 'horizontal';

    viewport.children.forEach((vp,i)=>{

      let w = width, h = height;
      let r,c,s;
      switch( method ){
        case 'grid':
          s = Math.sqrt(len);
          w = w / Math.ceil( s )
          h = h / Math.round( s );                  
          r = Math.floor( i / s );
          c = Math.floor( i % s );
          layoutViewport(vp,w,h,c*w+x,r*h+y);
          break;
        case 'vertical':
          h = h/len;
          layoutViewport(vp,w,h,x,i*h+y);
          break;
        case 'horizontal':
          w = w/len;
          layoutViewport(vp,w,h,i*w+x,y);
          break;
      }
        
    });
  }
  
}

const createTypeLookups = (scene,camera,types)=>{

  const scenes = types.scenes;
  const cameras = types.cameras;

  const lookup = {
    cameras: {},
    scenes: {},
    defaultScene: scene,
    defaultCamera: camera    
  }

  scenes.forEach( (scene)=>{
    if( scene.name ){
      lookup.scenes[scene.name] = scene;
    }    
    if( scene.default ){
      lookup.defaultScene = scene;
    }
  })

  cameras.forEach( (camera)=>{
    if( camera.name ){
      lookup.cameras[camera.name] = camera;
    }    
    if( camera.default ){
      lookup.defaultCamera = camera;
    }    
  })

  return lookup;

}

const updateDomElement = (vp,i)=>{

  const vb = vp.viewBounds;
  let div = vp.domElement;
  if( !div ){

    div = vp.domElement = document.createElement('div');
    document.body.appendChild( div );
    // div.style.backgroundColor = `rgba(255,0,255,${0.2*(i+1)})`;
    div.style.position = 'fixed';
    div.style.boxSizing = 'border-box'      
    div.style.padding = '1px';
    div.style.pointerEvents = 'none'; 

    const inner = document.createElement('div');
    inner.style.padding = '20px';
    inner.style.width = inner.style.height = '100%';
    inner.style.boxSizing = 'border-box';
    // inner.style.backgroundColor = `rgba(255,0,255,${0.1*(i+1)})`;
    // inner.style.backgroundColor = `rgba(0,0,0,${0.1*(i+1)})`;
    div.appendChild( inner );

    const txt = document.createElement('div');
    inner.appendChild(txt);
    txt.innerText = vp.name || 'no name';
    txt.style.fontSize = '10px';
    txt.style.fontFamily = 'Arial';
    txt.style.color = 'white';

  } 

  div.style.width = `${vb.width}px`;
  div.style.height = `${vb.height}px`;
  // div.style.height = `${h}px`;
  div.style.left = `${vb.x}px`;
  div.style.top = `${vb.y}px`;

}

const renderGraph = (
  rendererRoot,
  threeRenderer,
  scene,
  camera
)=>{

  // document.body.style.backgroundColor = '#aaaaaa';

  // return;  
  const types = collectTypes(rendererRoot);
  const typeLookup = createTypeLookups(scene,camera,types);

  const domElement = threeRenderer.domElement;
  const pixelRatio = threeRenderer.getPixelRatio();
  const [width,height] = [domElement.width/pixelRatio,domElement.height/pixelRatio];
  const viewportRoot = types.viewports[0];

  // layoutViewport( viewportRoot,
  //   width/pixelRatio,height/pixelRatio,0,0
  // );

  layoutViewport( viewportRoot,
    width,height,0,0
  );  

  const viewports = types.viewports;
  // Render viewports.
  



  // threeRenderer.autoClear = false;
  // threeRenderer.clear();

  /**
   * Need to look in to this..
   */
  // typeLookup.defaultScene.updateMatrixWorld();

  for( let i = 0; i<viewports.length; i++ ){
    const vp = viewports[i];

    if( vp.leaf ){

      const vb = vp.viewBounds;
            
      let h = vb.height;
      let y = height-h-vb.y;

      updateDomElement(vp,i,h,y);

      threeRenderer.setViewport(vb.x,y,vb.width,h);      
      threeRenderer.setScissor(vb.x,y,vb.width,h);
      threeRenderer.setScissorTest(true);
      threeRenderer.setClearColor(vp.backgroundColor || 0xffffff );


      camera = typeLookup.defaultCamera;
      scene = typeLookup.defaultScene;

      if( vp.camera && typeLookup.cameras[vp.camera]){
        camera = typeLookup.cameras[vp.camera];
      }
      
      if( vp.scene && typeLookup.scenes[vp.scene] ){
        scene = typeLookup.scenes[vp.scene];
      }

      camera = typeLookup.defaultCamera;
      // scene = typeLookup.defaultScene;
      
      // scene.updateMatrixWorld();

      camera.aspect = vb.width/vb.height;
      camera.updateProjectionMatrix();
      
      // console.log( 'RENDER VP', camera.name, scene.name, vp, scene, camera );
      // console.log( '---------', camera.name, scene.name );
      // console.log( 'RENDER VP', camera );
      // console.log( 'RENDER VP', scene );
      // console.log( 'RENDER VP', vb );
      threeRenderer.render( scene,camera );

    }
 
  }

}

export {
  renderGraph
}
