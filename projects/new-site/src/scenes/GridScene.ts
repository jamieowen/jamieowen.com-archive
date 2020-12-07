import * as tx from '@thi.ng/transducers';
import { Smush32 } from '@thi.ng/random';
import { Scene, Mesh, SphereBufferGeometry, MeshBasicMaterial, CircleBufferGeometry, Vector3, Color } from 'three';

import { 
  GUI,GUIController 
} from 'dat-gui';

class Grid{

  xStart:number = -3;
  yStart:number = -3;
  xEnd:number = 3;
  yEnd:number = 3;

  setPosition(){

  }

  [Symbol.iterator](){

    return tx.iterator(
      tx.comp(
        tx.mapIndexed((i,x)=>{
          return x;
        })
      ),
      tx.range2d(
        this.xStart,this.xEnd,
        this.yStart,this.yEnd
      )
    )

  }

}

const geometry = new SphereBufferGeometry(1,10,10);
const circle = new CircleBufferGeometry(1,36*2);

const meshPool = [];

function poolSphere(mesh){
  meshPool.push(mesh);
}

function createSphere(){

  if( meshPool.length > 0 ){
    return meshPool.shift();
  }

  const material = new MeshBasicMaterial({
    color: new Color()
  });
  material.color.setRGB(Math.random(),Math.random(),Math.random())
  console.log( 'Creae Sphere');
  return new Mesh(circle,material);  

}

const output = document.createElement( 'div' );
output.style.zIndex = '1000';
output.style.color = 'white';
output.style.top = '100px';
output.style.position = 'absolute';


class PointerPhysics{
  
  position:Vector3 = new Vector3();
  velocity:Vector3 = new Vector3();
  acceleration:Vector3 = new Vector3();


  update(){    

  }
  
}

export class GridScene extends Scene{

  grid:Grid = new Grid();
  inited:boolean = false;

  center:Vector3 = new Vector3();
  velocity:Vector3 = new Vector3(0.1,0.02,0);

  init(){
    console.log( 'GRID init' );
    this.inited = true;
    
    document.body.appendChild( output );

  }

  updateMatrixWorld(force){

    super.updateMatrixWorld(force);

    !this.inited ? (this.init()) : false;
    this.center.add(this.velocity);

    let scale = 10;
    const x = Math.floor( this.center.x / scale );
    const y = Math.floor( this.center.y / scale );
    const xMod = this.center.x % scale;
    const yMod = this.center.y % scale;

    output.innerHTML = `
    - ${x}, ${y}, <br/>
    - ${xMod.toFixed(2)}, ${yMod.toFixed(2)}
    `;

    while( this.children.length ){
      const child = this.children[0];
      this.remove(child);
      poolSphere(child);
    }

    const scl = 5;
    for( let item of this.grid ){
      const mesh = createSphere();
      mesh.position.x = item[0] * scl;
      mesh.position.y = item[1] * scl;
      mesh.position.x += xMod;
      mesh.position.y += yMod;
      this.add(mesh);
    }    

  }


}