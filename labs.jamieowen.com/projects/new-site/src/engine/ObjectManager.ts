import { EngineParams, Engine } from "./Engine";
import { Scene, PerspectiveCamera, Camera, OrthographicCamera } from "three";
import { EngineEvent } from "./EngineEvent";

class ObjectManager{

  private engine:Engine;
  private activeCamera:Camera;
  private activeScene:Scene;

  public defaultScene:Scene;
  public defaultCamera:PerspectiveCamera;  

  public scenes:Array<Scene> = [];
  public cameras:Array<Camera> = [];
  public layers:Array<string> = [];  

  constructor(engine:Engine,params:EngineParams){

    this.engine = engine;

    this.defaultScene = new Scene();
    this.defaultScene.name = 'default-scene';
    this.defaultCamera = new PerspectiveCamera(45,1/1,0.1,1000);
    this.defaultCamera.position.z = 10;
    this.defaultCamera.name = 'default-camera';

    engine.addEventListener( EngineEvent.DOM_RESIZE, this.onEngineEvent );

  }

  public initialise(){

    this.addScene(this.defaultScene);
    this.addCamera(this.defaultCamera);
    this.setActiveCamera(this.defaultCamera);
    this.setActiveScene(this.defaultScene);

  }

  public update(){
    
  }  

  public addScene( scene:Scene ){
    this.scenes.push( scene );
    this.engine.dispatchEvent( {type:EngineEvent.SCENE_ADDED,scene:scene} );
  }

  public addCamera( camera:Camera ){
    this.cameras.push( camera );
    this.engine.dispatchEvent( {type:EngineEvent.CAMERA_ADDED,camera:camera} );
  }

  public addLayer(){
    // or should go on renderer? Or scene??
  }

  public setActiveScene(scene:Scene){
    if( this.scenes.indexOf(scene)>= 0 && this.activeScene !== scene ){
      this.activeScene = scene;
      this.engine.dispatchEvent( {type:EngineEvent.ACTIVE_SCENE_CHANGED,scene:this.activeScene});
    }        
  }

  public setActiveCamera(camera:Camera){
    if( this.cameras.indexOf(camera)>= 0 && this.activeCamera !== camera ){
      this.activeCamera = camera;
      this.engine.dispatchEvent( {type:EngineEvent.ACTIVE_CAMERA_CHANGED,camera:this.activeCamera});      
    }
  }

  public cycleCamera(direction:number=1){
    let idx = this.cameras.indexOf(this.activeCamera);
    idx = ( idx + direction ) % this.cameras.length;
    this.setActiveCamera(this.cameras[idx]);    
  }

  public cycleScene(direction:number=1){
    let idx = this.scenes.indexOf(this.activeScene);
    idx = ( idx + direction ) % this.scenes.length;
    this.setActiveScene(this.scenes[idx]);    
  }

  public getActiveCamera():Camera{    
    return this.activeCamera;
  }

  public getActiveScene():Scene{
    return this.activeScene;
  }

  public updateCameras(width:number,height:number){

    const aspect = width/height;

    this.defaultCamera.aspect = aspect;
    this.defaultCamera.updateProjectionMatrix();

    this.cameras.forEach((cam:Camera)=>{

      if( cam instanceof PerspectiveCamera ){
        cam.aspect = aspect;
        cam.updateProjectionMatrix();
      }else
      if( cam instanceof OrthographicCamera ){
        // TODO.
      }

    })

  }

  private onEngineEvent = (event:Event)=>{

    switch( event.type ){
      case EngineEvent.DOM_RESIZE:
        const {width,height} = <any>event;
        console.log( 'Cam update') ;        
        this.updateCameras(width,height);
        break;


    }

  }
  

}

export {
  ObjectManager
}