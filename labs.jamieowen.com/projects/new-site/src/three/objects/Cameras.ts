import {
  PerspectiveCamera,
  Object3D,
  CameraHelper
} from 'three'

class Cameras extends Object3D{

  private domCamera:PerspectiveCamera;
  private camHelper:CameraHelper;

  constructor(){

    super()

    this.onBeforeRender = ()=>{
      console.log( 'Camera Renders')
    }
    this.addEventListener('added', ()=>{
      console.log('pkl');
    })

    this.domCamera = new PerspectiveCamera(45,1/1,1,1000);
    this.domCamera.position.z = 100;
    this.domCamera.updateProjectionMatrix();
    this.add( this.domCamera );    
    
    this.camHelper = new CameraHelper(this.domCamera)
    this.camHelper.update();
    this.add( this.camHelper );

    this.onResize();
    window.addEventListener('resize',this.onResize);

  }

  private update(){

  }

  private onResize=()=>{

    this.domCamera.aspect = window.innerWidth / window.innerHeight;
    this.domCamera.updateProjectionMatrix();
    this.camHelper.update();

  }

}

export {
  Cameras
}