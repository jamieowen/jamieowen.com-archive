import React, {
  useRef,
  useState,
  useEffect
} from 'react';

import { 
  Canvas,
  extend as extendFiber,
  useFrame,
  useRender,
  useUpdate
} from 'react-three-fiber'

import OrbitControls from './react/OrbitControls';


import {
  SphereBufferGeometry,
  DoubleSide,
  BackSide,
  Matrix4,
  Font
} from 'three';

import montSerratBlackJson from './fonts/Montserrat Black_Regular.json';
const montSerratBlack = new Font(montSerratBlackJson);


import * as r from '@jamieowen/three-renderman/src/react';
import Sketch from '@jamieowen/sketch';
import {
  MeshInstanceContext,
  MeshInstance,
  ContextConfig,
  MeshInstanceBasicMaterial,
  MeshInstanceLambertMaterial,
  MeshInstancePhongMaterial,
  MeshInstanceStandardMaterial,
  MeshInstanceNormalMaterial
} from '@jamieowen/three-mesh-instancing';

import TextMesh from './react/TextMesh';

import { useCannon } from './cannon/useCannon';

const segs = 10;
const dishSegs = 7;
const dishRadius = 50;
const sphereGeometry = new SphereBufferGeometry(1,segs,segs);
const dishGeometry = new SphereBufferGeometry( 
  dishRadius,dishSegs,dishSegs,
  0,Math.PI*2,
  0,Math.PI*0.5
);
const mat = new Matrix4();
mat.makeRotationZ(Math.PI);
dishGeometry.applyMatrix(mat);

const maxInstances = 1000;
const instanceConfig = new ContextConfig({
  meshes:{
    sphere: {
      maxInstances: maxInstances,
      geometry: sphereGeometry,
      material: new MeshInstanceStandardMaterial({
        color: 'crimson'
      })
    }    
  }
})

extendFiber({
  MeshInstanceContext,
  ...instanceConfig.meshClasses
});


const Simulation = ()=>{

  const [max] = useState(200);
  const [step] = useState(3);
  const [current,setCurrent] = useState(0);
  const timeout = 500;

  const cannon = useCannon(dishGeometry);
  
  const refs = new Array(max).fill(null).map(()=>{
    return useRef();
  });

  const [added] = useState(()=>{
    return new Array(max).fill(null).map(()=>{
      return false;
    });
  });
  const [spheres] = useState( ()=>{
    return new Array(max).fill(null).map((v,i)=>{

      const ref = refs[i];
      const off = 60;
      const off2 = off/2;
      const position = [
        Math.random() * off - off2,
        5 + ( Math.random() * 5.0 ),
        Math.random() * off - off2
      ]
      const s = ( Math.random() * 0.9 + 0.1 ) * 5;
      const scale = [s,s,s];

      const sphere = (
        <sphereMeshInstance key={i} ref={ref} position={position} scale={scale}/>
      )
      return sphere;
  
    });
  })

  if( current < max ){
    setTimeout( ()=>{
      setCurrent(Math.min(current+step,max));
    },timeout);
  }

  useEffect(()=>{    
    refs.forEach( (ref,i)=>{
      const obj = ref.current;
      if( obj && !added[i] ){
        const r = obj.scale.x;
        cannon.addSphere(ref.current,1*r);
        added[i] = true;
      }      
    });
  });

  return (
    <meshInstanceContext args={[instanceConfig]}>
      { spheres.slice(0,current) }
    </meshInstanceContext>
  )
}

Sketch( ()=>{

  return (
    <Canvas camera={{position: [0,0,30]}} pixelRatio={2}>
      <Simulation/>
      <mesh geometry={dishGeometry} visible={true}>
        <meshLambertMaterial color="blue" attach="material" opacity={0.1} transparent={true} side={BackSide}/> 
      </mesh>
      <TextMesh font={montSerratBlack} text={"M"}/>
      <pointLight position={[7,7,2]}></pointLight>
      <pointLight position={[7,-7,2]}></pointLight>
      <ambientLight intensity={0.4}/>
      <OrbitControls/>
    </Canvas>
  )

})