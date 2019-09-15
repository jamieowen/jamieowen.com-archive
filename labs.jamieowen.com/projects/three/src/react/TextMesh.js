import React,{
  useMemo
} from 'react';

import { extend } from 'react-three-fiber';
import createTextGeometry from '../geometry/createTextGeometry';

const TextMesh = ({
  text,
  font
})=>{

  const geometry = useMemo(()=>createTextGeometry(
    text,
    { font }
  ),[text,font]);

  return (
    <mesh geometry={geometry}>
      <meshLambertMaterial color="black" attach="material"/>
    </mesh>
  )

}

// extend({
//   TextMesh
// })

export default TextMesh;
