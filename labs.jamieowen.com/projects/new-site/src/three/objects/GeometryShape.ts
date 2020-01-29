import {
  Mesh,
  MeshBasicMaterial,
  BoxBufferGeometry
} from 'three';

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const geometry = new BoxBufferGeometry(10,10,10);
const material = new MeshBasicMaterial({
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