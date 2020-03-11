import { WebGLRenderer, PerspectiveCamera, Scene, SphericalReflectionMapping } from 'three';
import { basicsExample } from './dc-basics';

const create = ()=>{

  const domElement = document.body;
  const renderer:WebGLRenderer = new WebGLRenderer({
    antialias:true,
  });
  renderer.setPixelRatio(2);

  const resize = (w,h)=>{
    renderer.setSize(w,h);
  }

  domElement.appendChild(renderer.domElement);
  resize(400,300);

  const select:HTMLSelectElement = document.createElement('select');
  // domElement.appendChild( select );

  const examples = [
    [ 'Basic', basicsExample ]
  ]

  // select.appendChild()

  const camera:PerspectiveCamera = new PerspectiveCamera(45,4/3,0.1,1000);
  const scene:Scene = basicsExample();
  camera.position.z = 10;

  renderer.render( scene,camera );

}

create();