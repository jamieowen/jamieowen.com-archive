import {
  Scene
} from 'three';

import { GeometryShape } from './objects/GeometryShape';


class MainScene extends Scene{

  private static COUNT:number = 10;  
  private geometries:Array<GeometryShape> = [];

  constructor(){

    super();

    this.onBeforeRender = ()=>{
      // console.log( 'Render Scene' );
    }

    for( let i:number = 0; i<MainScene.COUNT; i++ ){

      const shape = new GeometryShape();
    
      shape.position.x = Math.random() * 50 - 25;
      shape.position.y = Math.random() * 50 - 25;

      this.add( shape );

    }

  }

}

export {
  MainScene
}