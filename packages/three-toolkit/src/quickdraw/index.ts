import {
  PerspectiveCamera,
  Scene,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PlaneBufferGeometry
} from 'three';

const currentGeometry = ( ( geom )=>{
  
  let current = geom;
  return ( geom? )=>{
    current = geom !== undefined ? geom : current;
    return current;
  }

})(new PlaneBufferGeometry());

// currentGeometry();

const mesh = ()=> geom => mat => new Mesh(geom,mat);

export function quickdraw(){

}
export function geometry(){

}

export function mesh(){
  return new Mesh();
}