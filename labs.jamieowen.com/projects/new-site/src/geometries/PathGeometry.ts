import { 
  BufferGeometry, Path
} from 'three';

class PathGeometry extends BufferGeometry{

  constructor(){

    super();
    console.log( 'path geometry' );
    const path:Path = new Path();

    path.moveTo(0,0);
    // path.lineTo( 0, 0.8 * 10 );
    // path.quadraticCurveTo( 0, 1 * 10, 0.2 * 10, 1 * 10 );
    path.lineTo( 10,10 );
    path.closePath();

    this.setFromPoints(path.getPoints());

  }

}

export {
  PathGeometry
}