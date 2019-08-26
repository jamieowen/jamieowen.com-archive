import React, {
  useRef,
  useMemo,
  forwardRef
} from 'react';

// import {
//   useSprings
// } from 'react-spring/three';

import { 
  Canvas,
  extend as extendFiber,
  useFrame,
  useRender,
  useUpdate
} from 'react-three-fiber'

import {
  BoxBufferGeometry,
  SphereBufferGeometry,
  TorusBufferGeometry,
  ConeBufferGeometry,
  TetrahedronBufferGeometry
} from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

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

const maxInstances = 50;
const numInstances = 10;

const config = new ContextConfig({
  meshes: {
    box: {
      maxInstances: maxInstances,
      geometry: new BoxBufferGeometry(1,1,1,1,1,1),
      material: new MeshInstanceBasicMaterial({
        color: 'blue'
      })
    },
    torus: {
      maxInstances: maxInstances,
      geometry: new TorusBufferGeometry(),
      material: new MeshInstanceLambertMaterial({
        color: 'hotpink'
      })
    },    
    sphere: {
      maxInstances: maxInstances,
      geometry: new SphereBufferGeometry(1,20,20),
      material: new MeshInstancePhongMaterial({
        color: 'green'
      })
    },
    cone: {
      maxInstances: maxInstances,
      geometry: new ConeBufferGeometry(),
      material: new MeshInstanceStandardMaterial({
        color: 'firebrick'
      })
    },
    tetra: {
      maxInstances: maxInstances,
      geometry: new TetrahedronBufferGeometry(),
      material: new MeshInstanceNormalMaterial({
      })
    }           
  }
});

// const {
//   BoxMeshInstance,
//   TorusMeshInstance,
//   SphereMeshInstance,
//   ConeMeshInstance
// } = config.createMeshClasses();

const res = extendFiber({
  MeshInstanceContext,
  ...config.meshClasses
});

const factoriesInstanced = {
  box: (props)=>{
    return <boxMeshInstance {...props}/>
  },
  torus: (props)=>{
    return <torusMeshInstance {...props}/>
  },   
  sphere: (props)=>{
    return <sphereMeshInstance {...props}/>
  },  
  cone: (props)=>{
    return <coneMeshInstance {...props}/>
  },
  tetra: (props)=>{
    return <tetraMeshInstance {...props}/>
  }     
}

const factoriesNonInstanced = {
  box: (props)=>{
    return (
      <mesh {...props} geometry={config.meshes.box.geometry}>
        <meshBasicMaterial color="blue" attach="material"/>
      </mesh>
    )
  },
  torus: (props)=>{
    return (
      <mesh {...props} geometry={config.meshes.torus.geometry}>
        <meshLambertMaterial color="hotpink" attach="material"/>
      </mesh>
    )
  },   
  sphere: (props)=>{
    return (
      <mesh {...props} geometry={config.meshes.sphere.geometry}>
        <meshPhongMaterial color="green" attach="material"/>
      </mesh>
    )
  },  
  cone: (props)=>{
    return (
      <mesh {...props} geometry={config.meshes.cone.geometry}>
        <meshStandardMaterial color="firebrick" attach="material"/>
      </mesh>
    )
  },
  tetra: (props)=>{
    return (
      <mesh {...props} geometry={config.meshes.tetra.geometry}>
        <meshNormalMaterial color="crimson" attach="material"/>
      </mesh>
    )
  }     
}

const types = Object.keys( factoriesInstanced );
// const types = [ 'torus', 'cone', 'sphere' ];
// const types = [ 'torus', 'box' ];

const createInstances = ( factory )=>{

  return new Array(numInstances).fill(null).map( (v,i)=>{    
    const props = { 
      key: i
    };
    const type = types[i%types.length];
    return factory[type](props);
  });

}

const Instancing = forwardRef( (props,ref)=>{
  const instances = createInstances(factoriesInstanced);
  return (
    <meshInstanceContext ref={ref} args={[config]}>
      { instances }
    </meshInstanceContext>    
  )
});

const NonInstancing = forwardRef( (props,ref)=>{    
  const instances = createInstances(factoriesNonInstanced);
  return (
    <group ref={ref}>
      { instances }
    </group>
  )
});

const Controls = ()=>{
  const controlsRef = useMemo(()=>{
    return {
      controls: null
    }
  },[])

  useRender(({camera,gl})=>{
    if( controlsRef.controls === null ){
      controlsRef.controls = new OrbitControls(camera,gl.domElement);
    }
  });
  
  return <group/>
}

const updateObject = (obj)=>{

  let child;
  let ox = 1.2;
  let children = obj.instances ? obj.instances : obj.children;
  let offset = children.length / 2 * ox;
  // console.log( 'updateObject - OFFSET',offset, obj.children.length );
  for( let i = 0; i<children.length; i++ ){
    child = children[i];
    child.position.y = ( i*ox ) - offset;
    // child.scale.x = Math.sin(i) + 0.4;
    // child.scale.y = child.scale.x;
    // child.scale.z = child.scale.x;

    child.rotation.y = Math.PI * i * 0.1;
  }

}

const UpdateLoop = ({instancedRef,nonInstancedRef})=>{

  useRender(({camera,gl})=>{
    // console.log( 'IN', instancedRef, nonInstancedRef );
    updateObject( instancedRef.current );    
    updateObject( nonInstancedRef.current ); 

  });

  return [];

}

Sketch( ()=>{

  const instancedRef = useRef();
  const nonInstancedRef = useRef();

  return (
    <Canvas 
      // invalidateFrameloop
      camera={{position: [0,0,5]}}
      pixelRatio={2}>      
      
      <Controls/>

      <r.renderer>

        <r.cameras>
          <perspectiveCamera name="camera1" position={[0,0,20]}/>
          <perspectiveCamera name="camera2" position={[0,0,20]}/>
          <perspectiveCamera name="camera3"/>
          {/* <r.orbitControlsCamera/> */}
        </r.cameras>

        <UpdateLoop nonInstancedRef={nonInstancedRef} instancedRef={instancedRef}/>

        <r.scenes>
          <scene name="instanced">
            <Instancing ref={instancedRef}/>
            <pointLight position={[2,2,2]} intensity={3}/>
            {/* <ambientLight intensity={0.2} /> */}            
          </scene>
          <scene name="non-instanced">
            <NonInstancing ref={nonInstancedRef}/>
            <pointLight position={[2,2,2]} intensity={3}/>
            {/* <ambientLight intensity={0.2} /> */}            
          </scene>
        </r.scenes>

        <r.viewport>                      
          <r.viewport 
            name="instanced" 
            camera="camera1" 
            scene="instanced"
            backgroundColor="crimson"/> 
          <r.viewport 
            name="non-instanced"
            scene="non-instanced"
            camera="camera1"
            pipeline="bloom"
            backgroundColor="firebrick"/>
        </r.viewport>      
      </r.renderer>
    </Canvas>
  )
  
})