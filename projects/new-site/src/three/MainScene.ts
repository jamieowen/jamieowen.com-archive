import {
  Scene, Box3, Vector3, Mesh, BoxBufferGeometry, MeshBasicMaterial, Matrix4, HemisphereLight, Color, MeshLambertMaterial
} from 'three';

import { 
  GUI,GUIController 
} from 'dat-gui';

import { GeometryShape } from './objects/GeometryShape';
import { Cameras } from './objects/Cameras';
import { Bounds } from './objects/Bounds';

const randomPoints = (numPoints:number,bounds:Box3,itemHandler:Function=null):Array<any>=>{

  const points:Array<object> = [];
  const size:Vector3 = bounds.getSize(new Vector3());
  let insert:Function;
  if( itemHandler ){
    insert = (i:number,x:number,y:number,z:number)=>{
      const res = itemHandler(i,x,y,z);
      points.push(res);
    }
  }else{
    insert = (i:number,x:number,y:number,z:number)=>{
      points.push( [x,y,z] );
    }
  }
  for( let i = 0; i<numPoints; i++ ){

    const x = ( Math.random() * size.x ) + bounds.min.x;
    const y = ( Math.random() * -size.y );
    const z = ( Math.random() * size.z ) + bounds.min.z;
    
    insert(i,x,y,z);

  }

  return points;

}

const generateColorPalette = ( color1:Color, computeComplementary:boolean, steps:number=20 ):Array<Color>=>{

  const color2:Color = color1.clone();
  if( computeComplementary ){
    color2.offsetHSL( 0.5,0,0 );
  }else{
    color2.offsetHSL(0,0,1);
  }
  const colors:Array<Color> = [];
  for( let i:number = 0; i<steps; i++ ){

   const c = color1.clone();
   const amount = ( 1 / (steps-1) ) * i;
   c.lerpHSL(color2,amount);
   colors.push(c);

  }

  return colors;

}


class MainScene extends Scene{

  private static COUNT:number = 10;  
  
  private geometries:Array<GeometryShape> = [];

  constructor(){

    super();

    this.background = new Color('white');

    this.onBeforeRender = ()=>{
      // console.log( 'Render Scene' );
    }

    // Bounds    
    const bounds = new Bounds();
    this.add(bounds);

    // Boxes
    const colors = generateColorPalette( new Color('blue'),true );    

    const points = randomPoints(MainScene.COUNT, bounds.sceneBounds, (i:number,x:number,y:number,z:number)=>{

      const shape:GeometryShape = new GeometryShape();
      shape.material.color.set(colors[i%colors.length]);
      shape.position.set(x,y,z);
      shape.rotation.x = Math.PI * Math.random();
      shape.rotation.y = Math.PI * Math.random();
      shape.rotation.z = Math.PI * Math.random();
      this.add( shape );
      return shape;

    } );

    // Lights
    const hemLight = new HemisphereLight(0xffffff,0x444444);
    this.add(hemLight);

    // Cameras
    const cameras:Cameras = new Cameras();
    this.add( cameras );

  }

}

export {
  MainScene
}