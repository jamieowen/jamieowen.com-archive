
import { Renderer } from './src/three/Renderer';
import { MainScene } from './src/three/MainScene';
import { WebGLRenderer, PerspectiveCamera } from 'three';

const app = ()=>{ 
  window.onload = ()=>{

    document.body.style.margin = '0px';

    const renderer:Renderer = new Renderer(document.body);
    const scene:MainScene = new MainScene();

    const update = ()=>{

      const r:WebGLRenderer = renderer.renderer;
      const camera:PerspectiveCamera = renderer.camera;

      r.render(scene,camera);

      requestAnimationFrame(update);

    }

    update();

  }
} 

export {
  app
}