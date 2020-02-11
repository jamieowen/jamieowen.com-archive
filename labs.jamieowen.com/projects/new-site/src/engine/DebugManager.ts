import { EngineParams, Engine } from "./Engine";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera, Scene, Camera } from "three";
import { GUI,GUIController } from 'dat.gui';
import { EngineEvent } from "./EngineEvent";

const createOutput = ():HTMLElement =>{

  const output = document.createElement('div');
  output.style.zIndex = '100';
  output.style.fontFamily = 'Helvetica,Arial,sans';
  output.style.fontSize = '10px';
  output.style.color = '#AAA';
  output.style.boxSizing = 'border-box';
  output.style.top = '0px';
  output.style.left = '0px';
  output.style.padding = '16px';
  output.style.lineHeight = '18px';
  output.style.position = 'absolute';
  return output;

}

class DebugManager{

  private engine:Engine;
  private enabled:boolean = false;
  private debugOutput:HTMLElement;

  public gui:GUI;
  public orbitControls:OrbitControls;
  public orbitCamera:PerspectiveCamera;

  constructor(engine:Engine,params:EngineParams){
    
    this.engine = engine;
    this.orbitCamera = new PerspectiveCamera(45,1/1,0.1,10000);
    this.orbitCamera.position.z = 10;
    this.orbitCamera.name = 'orbit-cam';
    this.debugOutput = createOutput();
    // this.gui = new GUI({
    //   width: 350
    // });

  }

  public initialise(){

    const element:HTMLElement = this.getDomElement();
    this.orbitControls = new OrbitControls(this.orbitCamera,element);
    this.orbitControls.enabled = false;
    element.addEventListener('mouseup',()=>{
      console.log( 'mouseup' );
    });

    this.engine.objects.addCamera(this.orbitCamera);

    // this.orbitCamera.cop
  }

  public update(){

    if( this.enabled ){
      this.orbitControls.update();
    }
  }


  private getDomElement():HTMLElement{
    return this.engine.dom.domContainer;
  }

  private addListeners(){

    this.engine.addEventListener(EngineEvent.SCENE_ADDED,this.onEngineEvent);
    this.engine.addEventListener(EngineEvent.CAMERA_ADDED,this.onEngineEvent);
    this.engine.addEventListener(EngineEvent.ACTIVE_SCENE_CHANGED,this.onEngineEvent);
    this.engine.addEventListener(EngineEvent.ACTIVE_CAMERA_CHANGED,this.onEngineEvent);

    const element = this.getDomElement();
    element.addEventListener('keyup',this.onKeyup);
  }

  private removeListeners(){

    this.engine.removeEventListener(EngineEvent.SCENE_ADDED,this.onEngineEvent);
    this.engine.removeEventListener(EngineEvent.CAMERA_ADDED,this.onEngineEvent);
    this.engine.removeEventListener(EngineEvent.ACTIVE_SCENE_CHANGED,this.onEngineEvent);
    this.engine.removeEventListener(EngineEvent.ACTIVE_CAMERA_CHANGED,this.onEngineEvent);    

    const element = this.getDomElement();
    element.removeEventListener('keyup',this.onKeyup);

  }

  private onKeyup = (ev:KeyboardEvent)=>{
    const char:string = String.fromCharCode(ev.which);
    switch( char.toLowerCase() ){
      case 's':
        this.engine.objects.cycleScene();
        break;
      case 'c':
        this.engine.objects.cycleCamera();
        break;
    }
  }

  private updateOutput(){

    const numScenes:number = this.engine.objects.scenes.length;
    const numCameras:number = this.engine.objects.cameras.length;
    const activeCamera:Camera = this.engine.objects.getActiveCamera();
    const activeScene:Scene = this.engine.objects.getActiveScene();
    // const numUpdatables:number = this.engine.objects.cameras.length;
    this.debugOutput.innerHTML = `
      <b style='color:white'>SWITCH SCENES (S), SWITCH CAMERA (C), <b><br/>
      <b>SCENES :</b><span> ${numScenes} ( ${activeScene.name || 'Scene'} )</span><br/>
      <b>CAMERAS :</b><span> ${numCameras} ( ${activeCamera.name || 'Cam'} )</span><br/>   
    `;
  }

  private onEngineEvent = ()=>{
    this.updateOutput();
  }

  public setEnabled( enable:boolean ){
    
    const element:HTMLElement = this.getDomElement();

    if( enable && !this.enabled ){

      this.enabled = true;      
      this.addListeners();
      this.updateOutput();
      this.orbitControls.enabled = true;
      this.engine.objects.setActiveCamera(this.orbitCamera);
      element.appendChild( this.debugOutput );

    }else
    if( !enable && this.enabled ){

      this.enabled = false;
      this.orbitControls.enabled = false;
      this.removeListeners();
      element.removeChild( this.debugOutput );

    }

  }

}

export {
  DebugManager
}