import {
  Group,
  WebGLRenderer
} from 'three';

class Renderer{

  constructor(){

    this.renderer = new WebGLRenderer({
      antialias: true
    });

    const domElement = document.createElement('div');
    document.body.appendChild(domElement);
    domElement.appendChild( this.renderer.domElement );

    document.addEventListener('resize',this.onResize);
    this.onResize();

  }

  onResize(){

    const w = window.innerWidth;
    const h = window.innerHeight;

    this.renderer.setSize(w*0.5,h*0.5);

  }

  
}

export {
  Renderer
}