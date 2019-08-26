

# Core


## Use Case.
1 scene
+ Render the scene to different viewports for editing / previewing different cameras. interacting with one viewport, showing a wireframe view, etc.
+ Render the scene to a differnent viewport with a given pipeline

2 scenes.
+ Render each scene to different viewports.
+ Render each scene to 


## Viewport definition
Viewports define areas of the screen to render to.
Along with a scene, optional camera and pipeline.


## Pipeline definition


    // console.log( EventDispatcher );
// console.log( new EventDispatcher() );

/**
 * Organise the key renderer entities
 * and 
 * 
 * Manage :
 * Scenes,
 * Cameras,
 * Effects,
 * Layers
 * 
 */

    ```
    // createRenderer
    
    // React integratio
    // useRenderer()
    // useCameras();
    // useScenes();
    // useEffects();
    // useLayers()
    // useRender()
    // useRenderPipeline()

    //

    // typical handling is render( scene, camera );
    // if we have two scenes rendering or two cameras rendering we 
    // need to be able to adjust for that.
    // 
    
    // pull layer masks to object directly.
    const backgroundLayer = useLayer('background');
    const foregroundLayer = useLayer('foreground');

    <Renderman>
      {/* <compositor>
        <pipeline id="default">
          <renderLayer all/>
          <renderLayer>
            <blendModeEffect/>
          </renderLayer>
          <renderLayer name="foreground" additive multiply>
            <blendModeEffect/>
            <glitchEffect/>
          </renderLayer>          
        </pipeline> // added by default
        <pipeline id="background">
          <renderLayer />
          <renderLayer />
        </pipeline>
        <pipeline id="default">
          <renderLayer />
        </pipeline>                
      </compositor> */}
      <cameras>
        <perspectiveCamera position={} name="camera1"/>
        <orbitControlsCamera name="orbit"/>
      </cameras>
      <viewport>
        <viewport interaction={true} wireframe={true} transformControls={true}>
          <object3D layer={backgroundLayer}>            
          </object3D>
        </viewport>
        <viewport mirror camera="orbit"> 
        </viewport>
        <viewport copy camera="camera">
        </viewport>        
      </viewport>
    </Renderman>

  ```



      // this.scene = new Scene();
    // this.position = new Vector2();  
    // this.size = new Vector2();
    // this.mirror = false; // can be boolean or string
    // this.views = [];
    // this.interaction = false;
    // this.wireframe = false;
    // this.layout = 'grid'; // vert, horizontal, stack?
    // this.pipeline = '';
