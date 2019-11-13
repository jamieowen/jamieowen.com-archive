import React from 'react';
import Sketch from '@jamieowen/sketch';
import styled from 'styled-components';


const Container = styled.div`
  position: absolute;
  width: ${props=>props.width?props.width : '100%'};
  height: ${props=>props.height?props.height : '100%'};
  top: ${props=>props.top?props.top : '0px'};
  left: ${props=>props.left?props.left : '0px'};  
  background-color: rgba(0,0,0,0.1);
`


Sketch(()=>{

  return (
    <Container>
      <Container height="90%" top="10%">

        <Container width="65%">

          { /** Filter Select */}
          { /** Filtered Markets Renderer */}

        </Container>      
        <Container width="34%" left="66%">
          { /** Contextual Sidebar */}
        </Container>              
      </Container>

    </Container>
  )

})