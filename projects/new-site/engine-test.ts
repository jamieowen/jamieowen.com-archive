import { Engine, EngineParams } from "./src/engine/Engine";
import { Scene, PerspectiveCamera } from "three";
import { GUI, GUIController } from "dat.gui";
import { TestPathsScene } from "./src/scenes/TestPathsScene";
import { TestScrollScene } from './src/scenes/TestScrollScene';
import { PageScrollScene } from "./src/scenes/PageScrollScene";
import { VectorTestScene } from "./src/scenes/VectorTestScene";
import { GridScene } from "./src/scenes/GridScene";

class App extends Engine{

  public setup(scene:Scene,camera:PerspectiveCamera){

    const testPathsScene:TestPathsScene = new TestPathsScene();
    this.objects.addScene(testPathsScene);

    const testScrollScene:TestScrollScene = new TestScrollScene();
    this.objects.addScene(testScrollScene);

    const pageScrollScene:PageScrollScene = new PageScrollScene();
    this.objects.addScene(pageScrollScene);
    
    const vectorTestScene:VectorTestScene = new VectorTestScene();
    this.objects.addScene(vectorTestScene);

    const gridScene:GridScene = new GridScene();
    this.objects.addScene(gridScene);    

    this.debug.setEnabled(true);
    this.objects.setActiveScene(gridScene);
    
    // this.objects.setActiveScene(pageScrollScene);
    // this.objects.setActiveCamera(pageScrollScene.domScrollCamera);

  }

}

const target = document.body;
target.style.margin = '0px';

const scrollTarget = document.createElement('div');
scrollTarget.style.position = 'fixed';
scrollTarget.style.width = '10%';
scrollTarget.style.left = '0px';
scrollTarget.style.height = '100%';
scrollTarget.style.overflow = 'scroll';
scrollTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
const scrollContent = document.createElement('div');
scrollContent.style.width = '100%';
scrollContent.style.height = '400%';
scrollTarget.appendChild( scrollContent );

const params:EngineParams = {
  domElement:target,
  scrollElement:scrollTarget
}
const app = new App(params);

target.appendChild(scrollTarget);