import { Engine, EngineParams } from "./src/engine/Engine";
import { BoxBufferGeometry, Mesh, MeshBasicMaterial, Scene } from "three";


class App extends Engine{
  constructor(){

    const target = document.body;
    target.style.margin = '0px';

    super(<EngineParams>{
      domElement:target
    });

    const boxGeometry = new BoxBufferGeometry(1,1,1);
    const box = new Mesh(
      boxGeometry,
      new MeshBasicMaterial({
        color: 'crimson'
      })
    );

    const box2 = new Mesh(
      boxGeometry,
      new MeshBasicMaterial({
        color: 'blue'
      })
    );    
    
    const scene2 = new Scene();
    scene2.add( box2 );

    const scene  = this.objects.defaultScene;
    const camera = this.objects.defaultCamera;

    scene.add( box );

    this.objects.addScene(scene2);

    this.debug.setEnabled(true);
  }

}

const app = new App();