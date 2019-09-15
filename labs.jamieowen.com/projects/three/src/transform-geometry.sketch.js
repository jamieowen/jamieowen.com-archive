import React, {
  useMemo,
  useRef,
  useEffect
} from 'react';

import { 
  Canvas,
  extend
} from 'react-three-fiber'
import * as THREE from 'three';

import Sketch from '../../visualisation/crypto-charts/sketch';
import TransformObject from './objects/TransformObject';

extend( {TransformObject} );

Sketch( ()=>{

  const ref = useRef();

  useEffect( ()=>{
    console.log( 'Ref', ref.current );
  });

  return (
    <Canvas 
      camera={{position: [0,0,20]}}
      pixelRatio={2}
      onCreated={({ gl }) => console.log(gl)}>
    >
      <transformObject ref={ref}/>
    </Canvas>
  )
  
})