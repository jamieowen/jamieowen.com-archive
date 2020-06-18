import React, {
  Fragment
} from 'react';

import { 
  Canvas
} from 'react-three-fiber'

import styled from 'styled-components';

import { Toy } from '@jamieowen/toy.gui';
import Sketch from '@jamieowen/sketch';
import * as r from '@jamieowen/three-renderman/src/react';

const SomeMesh = props=>{
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[1,1,1,1,1,1]}/>
      <meshLambertMaterial attach="material" color={props.color ? props.color : 'red' }/>
    </mesh>
  )
}

const Container = styled.div`
  width: 700px;
  height: 500px;
`;

Sketch( ()=>{ 

  return (
    <Fragment>
      <Toy>        
      </Toy>
      <Container>
      <Canvas pixelRatio={2} camera={{position:[0,0,5]}}>
        <r.renderer>

          <r.compositor>
            <r.pipeline default>
              <r.renderLayer name="background"/>
              {/* <r.layerPass name="background"/> */}
            </r.pipeline>
          </r.compositor>

          <r.cameras>
            <perspectiveCamera default name="camera1"/>
            <perspectiveCamera name="camera2"/>
            <perspectiveCamera name="camera3"/>
            {/* <r.orbitControlsCamera/> */}
          </r.cameras>

          <r.scenes>
            <scene default>
              <pointLight position={[1,1,1]} intensity={1.4}/>
              <SomeMesh position={[0,0,0]} color="yellow"/>
            </scene>
            <scene>
              <pointLight position={[1,5,1]} intensity={1.4}/>
              <SomeMesh position={[0,1,0]} color="green"/>            
            </scene>
          </r.scenes>

          <r.viewport layout="grid">
                      
            <r.viewport name="first" camera="camera1" backgroundColor={0xFF0000}/> 

            <r.viewport layout="vertical">
              <r.viewport name="second-nested-first" backgroundColor={0x111111}/>
              <r.viewport name="second-nested-second" backgroundColor={0x4444FF}/>
            </r.viewport>

            <r.viewport name="third" camera="camera1" backgroundColor={0x118811}/>
            <r.viewport name="forth" camera="camera1" backgroundColor={0x770077}/>

          </r.viewport>

        </r.renderer>
          
      </Canvas>
      </Container>
    </Fragment>

  )
  
})