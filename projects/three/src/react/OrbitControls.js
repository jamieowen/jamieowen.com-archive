import React,{
  useMemo
} from 'react';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

import { 
  useRender,
} from 'react-three-fiber'

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

export default Controls;