import {
  Scene, Box3, Vector3, Mesh, BoxBufferGeometry, MeshBasicMaterial, Matrix4, HemisphereLight, Color, MeshLambertMaterial
} from 'three';

import { 
  GUI,GUIController 
} from 'dat-gui';

import { DrawContext } from '../engine/DrawContext';
// import { GeometryShape } from './objects/GeometryShape';
// import { Cameras } from './objects/Cameras';
// import { Bounds } from './objects/Bounds';

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

const geometry:BoxBufferGeometry = new BoxBufferGeometry(1,1,1,1,1,1);
const createShapeMesh = ():Mesh=>{
  return new Mesh(
    geometry,
    new MeshLambertMaterial({
      color:'blue'
    })
  )
};


class TestScrollScene extends Scene{

  private static COUNT:number = 10;  
  
  // private geometries:Array<GeometryShape> = [];
  public sceneBounds:Box3;
  constructor(){

    super();

    this.name = 'test-scroll-scene';
    this.background = new Color('#cfcfcf');

    this.onBeforeRender = ()=>{
      // console.log( 'Render Scene' );
    }

    // Bounds    
    // const bounds = new Bounds();
    // this.add(bounds);

    this.sceneBounds = new Box3();
    this.sceneBounds.min.set(-20,0,-10);
    this.sceneBounds.max.set(20,100,10);

    // Boxes
    const colors = generateColorPalette( new Color('blue'),true );    

    // const points = randomPoints(TestScrollScene.COUNT, this.sceneBounds, (i:number,x:number,y:number,z:number)=>{

    //   const shape:Mesh = createShapeMesh();
    //   shape.material.color.set(colors[i%colors.length]);
    //   shape.position.set(x,y,z);
    //   shape.scale.multiplyScalar( Math.random() + 1 * 10 );
    //   shape.rotation.x = Math.PI * Math.random();
    //   shape.rotation.y = Math.PI * Math.random();
    //   shape.rotation.z = Math.PI * Math.random();
    //   this.add( shape );
    //   return shape;

    // } );

    // Lights
    const hemLight = new HemisphereLight(0xffffff,0x444444);
    this.add(hemLight);

    // Cameras
    // const cameras:Cameras = new Cameras();
    // this.add( cameras );

    const c:DrawContext = new DrawContext(this,(c:DrawContext,t:number,d:number)=>{

      for( let i = 0; i<10; i++ ){
        // let s = 4.9;//Math.random() * 10;
        let s = ( Math.random() * 6 ) + 2;
        s = Math.sin( Math.PI * 2.0 * t * 0.1 ) * 3 + ( i * 2.0 );
  
        // if( i % 2 === 0 ){
          c.lambertMaterial();  
        // }else{
        //   c.basicMaterial();
        // }
        
        c.position(i*5,0,0);
        c.scale(s,s,s);
        // c.color(0xff00ff);
        c.color(colors[i%colors.length].getHex());
        c.box();
      }
  
      c.scale(1,1,1);
      c.lambertMaterial();
      c.color(0xffff00);
      c.position(0,10,0);
      c.sphere();
      c.color(0x00ffff);
      c.position(0,20,0);
      c.plane();

    });

  }

}

export {
  TestScrollScene
}