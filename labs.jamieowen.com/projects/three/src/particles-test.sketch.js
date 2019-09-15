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

import Renderer from '../lib/renderer';
import Sketch from '../../visualisation/crypto-charts/sketch';
import ParticleEngine from '../lib/particle-engine';
// import SkyDome from '../../budo-archive/src/lib/objects/SkyDome';

extend( {ParticleEngine} );


const Thing = ({ vertices,ref })=>{
  return (
    <group ref={ref => console.log('we have access to the instance', ref )}>
      <line>
        <geometry
          ref={ref}
          attach="geometry"
          vertices={vertices.map(v => new THREE.Vector3(...v))}
          onUpdate={self => (self.verticesNeedUpdate = true)}
        />
        <lineBasicMaterial attach="material" color="black" />
      </line>
      <mesh 
        onClick={e => console.log('click')} 
        onPointerOver={e => console.log('hover')} 
        onPointerOut={e => console.log('unhover')}>
        <octahedronGeometry attach="geometry" />
        <meshBasicMaterial 
          attach="material" 
          color="peachpuff" 
          opacity={0.5} transparent />
      </mesh>
    </group>
  )
}

Sketch( ()=>{

  const renderer = useMemo(()=>{
    // const engine = new ParticleEngine();
    // console.log( engine );
    return new Renderer();
  })

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
      <particleEngine ref={ref}/>
    </Canvas>
  )
  
})