import {
  Scene, Box3, Vector3, Mesh, BoxBufferGeometry, MeshBasicMaterial, Matrix4, HemisphereLight
} from 'three';

import { GeometryShape } from './objects/GeometryShape';


const randomPoints = (numPoints:number,bounds:Box3,itemHandler:Function=null)=>{

  const points:Array<object> = [];
  const size:Vector3 = bounds.getSize(new Vector3());
  console.log( 'Size', size );
  console.log( 'Bounds Min', bounds.min );
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


class MainScene extends Scene{

  private static COUNT:number = 10;  
  
  private geometries:Array<GeometryShape> = [];

  constructor(){

    super();

    this.onBeforeRender = ()=>{
      // console.log( 'Render Scene' );
    }

    // Bounds    
    const bounds = new Box3();    
    bounds.min.set(-20,0,-10);
    bounds.max.set(20,100,10);

    // Bounds Mesh
    const offsetMatrix = new Matrix4().makeTranslation(0,-0.5,0);
    const boundsMesh = new Mesh(
      new BoxBufferGeometry(1,1,1).applyMatrix(offsetMatrix),
      new MeshBasicMaterial({
        color: 'red',
        wireframe: true
      })
    );
    this.add( boundsMesh );
    bounds.getSize( boundsMesh.scale );
    
    // Boxes
    const points = randomPoints(MainScene.COUNT, bounds, (i:number,x:number,y:number,z:number)=>{
      const shape = new GeometryShape();
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

  }

}

export {
  MainScene
}