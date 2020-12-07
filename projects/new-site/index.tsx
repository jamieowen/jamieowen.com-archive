
import { Renderer } from './src/three/Renderer';
import { MainScene } from './src/three/MainScene';
import { WebGLRenderer, PerspectiveCamera } from 'three';

import React from 'react';
import ReactDOM from 'react-dom';
import { ReactMain } from './src/ReactMain';

import { World } from 'ecsy';

const app = ()=>{ 
  window.onload = ()=>{

    document.body.style.margin = '0px';
    document.body.style.position = 'fixed';

    // React
    const container:HTMLElement = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<ReactMain/>,container);

    // Three
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