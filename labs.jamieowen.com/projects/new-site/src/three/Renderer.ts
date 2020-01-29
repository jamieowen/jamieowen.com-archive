import {
  WebGLRenderer,
  PerspectiveCamera
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Renderer{

  public renderer:WebGLRenderer;

  public controls:OrbitControls;
  public camera:PerspectiveCamera = new PerspectiveCamera(45,1/1,0.1,1000);  

  constructor(domElement:HTMLElement){
  
    this.renderer = new WebGLRenderer({
      antialias:true
    });

    this.renderer.setPixelRatio(2);
    this.renderer.setClearColor('white');

    domElement.appendChild( this.renderer.domElement );    

    this.controls = new OrbitControls(this.camera,this.renderer.domElement);
    this.camera.position.z = 100;

    window.addEventListener( 'resize',this.onResize );
    this.onResize();

  }

  public setSize(width:number,height:number){

    this.renderer.setSize(width,height);
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();

  }

  onResize = ()=>{
    this.setSize(window.innerWidth,window.innerHeight);
  }

}

export {
  Renderer
}