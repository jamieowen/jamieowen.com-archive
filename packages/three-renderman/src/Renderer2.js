import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera
} from 'three';

class Renderer{

  constructor(){

    this.renderer = new WebGLRenderer({
      antialias: true
    });
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45,1/1,0.1,100);
    this.camera.position.z = 5;

    const domElement = document.createElement('div');
    const body = document.body;
    const style = document.createElement('style');

    style.innerHTML = `
      body{ 
        margin: 0px; padding: 0px;
      }
    `;

    body.appendChild(style);
    body.appendChild(domElement);
    
    domElement.appendChild( this.renderer.domElement );

    window.addEventListener('resize',this.onResize.bind(this));
    this.onResize();

    this.onRender();

  }

  onResize(){

    const w = window.innerWidth * 1;
    const h = window.innerHeight * 0.5;

    this.camera.aspect = w/h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w,h);

  }

  onRender(){

    this.renderer.render(this.scene,this.camera);

  }

  
}

export {
  Renderer
}