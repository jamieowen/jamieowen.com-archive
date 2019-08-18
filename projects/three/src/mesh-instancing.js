import React, {
} from 'react';

// import {
//   useSprings
// } from 'react-spring/three';

import { 
  Canvas,
  extend as extendFiber
} from 'react-three-fiber'

import {
  BoxBufferGeometry
} from 'three';

import Sketch from '@jamieowen/sketch';
import {
  MeshInstanceContext,
  MeshInstance,
  ContextConfig,
  MeshInstanceBasicMaterial,
  MeshInstanceNormalMaterial
} from '@jamieowen/three-mesh-instancing';

const config = new ContextConfig({
  meshes: {
    box: {
      maxInstances: 10,
      geometry: new BoxBufferGeometry(1,1,1,1,1,1),
      material: new MeshInstanceBasicMaterial({
        color: 'blue'
      })
    },
    sphere: {
      maxInstances: 10,
      geometry: new BoxBufferGeometry(1,1,1,1,1,1),
      material: new MeshInstanceBasicMaterial({
        color: 'crimson'
      })
    }
  }
});

const {
  BoxMeshInstance,
  SphereMeshInstance
} = config.createMeshClasses();

extendFiber({
  MeshInstance,
  MeshInstanceContext,   
  BoxMeshInstance,
  SphereMeshInstance,
});

Sketch( ()=>{

  const boxInstances = new Array(10).fill(null).map( (v,i)=>{
    return <boxMeshInstance 
      key={i}
      position={[ i*1.5-(10*1.5/2),0,0 ]}
      />
  });

  const sphereInstances = new Array(10).fill(null).map( (v,i)=>{
    return <sphereMeshInstance 
      key={i}
      position={[ 0,i*1.5-(10*1.5/2),0 ]}
      />
  });  

  return (
    <Canvas 
      camera={{position: [0,0,20]}}
      pixelRatio={2}
      onCreated={({ gl }) => console.log(gl)}>
    >      
      <meshInstanceContext args={[config]}>
        { boxInstances }
        { sphereInstances }
      </meshInstanceContext>
    </Canvas>
  )
  
})