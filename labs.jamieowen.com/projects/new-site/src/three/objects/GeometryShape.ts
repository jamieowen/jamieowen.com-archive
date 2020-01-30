import {
  Mesh,
  MeshBasicMaterial,
  BoxBufferGeometry,
  MeshLambertMaterial
} from 'three';

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const geometry = new BoxBufferGeometry(10,10,10);
const material = new MeshLambertMaterial({
  color: 'crimson'
});

class GeometryShape extends Mesh{

  constructor(){
    super(geometry,material);
  }


}

export {
  GeometryShape
} 