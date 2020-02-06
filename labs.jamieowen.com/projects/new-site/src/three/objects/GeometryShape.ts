import {
  Mesh,
  MeshBasicMaterial,
  BoxBufferGeometry,
  MeshLambertMaterial
} from 'three';

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const geometry = new BoxBufferGeometry(10,10,10);

class GeometryShape extends Mesh{

  public material:MeshLambertMaterial;
  constructor(){

    const material = new MeshLambertMaterial({
      color: 'crimson'
    });
    super(geometry,material);
  }


}

export {
  GeometryShape
} 