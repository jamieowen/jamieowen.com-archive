import React, {
  useRef
} from 'react';

// import {
//   useSprings
// } from 'react-spring/three';

import { 
  Canvas,
  extend as extendFiber,
  useRender
} from 'react-three-fiber'

import {
  BoxBufferGeometry
} from 'three';

import Sketch from '@jamieowen/sketch';


import { DynamicCubeMap } from './objects/DynamicCubeMap';

extendFiber({
  DynamicCubeMap
});

const Container = ()=>{

  const dyn = useRef();
  let c = 0;
  useRender( ({gl,scene,camera,...state})=>{

    if( c === 0 ){
      console.log( state );  
      console.log( dyn.current );    
    }
    dyn.current.render(gl,scene);
    gl.render( scene, camera );

    c++;
  }, true);


  return (
    <object3D>
      <dynamicCubeMap ref={dyn}/>
    </object3D>
  )
}
Sketch( ()=>{ 

 

  return (
    <Canvas 
      camera={{position: [0,0,20]}}
      pixelRatio={2}>
    >      
      <pointLight position={[10,10,10]}/>
      <ambientLight intensity={0.1}/>
      <Container/>
    </Canvas>
  )
  
})