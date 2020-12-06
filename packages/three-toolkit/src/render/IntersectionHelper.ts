import { Raycaster, Vector2, Plane, Vector3, PerspectiveCamera, Camera } from "three";


enum PlaneAxis {
  XY = 'xy',
  XZ = 'xz',
  YZ = 'yz',
}


function axisToVector(axis:PlaneAxis):Vector3{
  switch( axis ){
    case PlaneAxis.XY:
      return new Vector3(0,1,0);
    case PlaneAxis.XY:
      return new Vector3(0,0,1);
    case PlaneAxis.XZ:
      return new Vector3(1,0,0);
  }
}

class PlaneIntersection{
  
  plane: Plane;
  position: Vector3 = new Vector3();
  intersecting: boolean = false;

  constructor( axis:PlaneAxis ){

    this.plane = new Plane(axisToVector(axis));

  }

}

export class IntersectionHelper{

  raycaster:Raycaster = new Raycaster();
  mouse:Vector2 = new Vector2();

  xy:PlaneIntersection = new PlaneIntersection(PlaneAxis.XY);
  xz:PlaneIntersection = new PlaneIntersection(PlaneAxis.XZ);
  yz:PlaneIntersection = new PlaneIntersection(PlaneAxis.YZ);

  constructor(){
    console.log( 'New Helper :', this );
  } 

  setCamera(){

  }

  setObjects(){

  }

  setFromCamera( x:number,y:number,camera:Camera ){


    this.mouse.set(x,y);
    this.raycaster.setFromCamera(this.mouse,camera);
    
    // raycaster.setFromCamera( mouse, e.camera );
    // const intersects = raycaster.intersectObjects( e.scene.children, true );
    // ge.intersects = intersects;    
    const { ray } = this.raycaster;

    ray.intersectPlane(this.xy.plane,this.xy.position);

  }
}