import {
  TextGeometry,
  BufferGeometry
} from 'three';

const createTextGeometry = ( text, {
  font = null,
  size = 60,
  height = 10,
  curveSegments = 4,
  bevelThickness = 10,
	bevelSize = 0.5,
	bevelEnabled = false,
})=>{

  const source = new TextGeometry( text, {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled
  } );

  source.computeBoundingBox();
  source.computeVertexNormals();

  const geometry = new BufferGeometry().fromGeometry(source);
  return geometry

}

export default createTextGeometry;