import React,{
  forwardRef
} from 'react';
import styled from 'styled-components';

import { 
  ControlProvider,
  useMetrics
} from './contexts';

import {
  base,
  abs,
  fonts,
  size,
  background,
  grid,
  flex,
  interactive
} from './css';

const Panel = styled.div` // Should be group....
  ${base}
  ${fonts}
  ${size}
  position: absolute;
  top: 0px; right: 0%;
  // z-index: 10000;
  // display: grid;
  // grid-template-columns: 1fr;
  // grid-gap: 1px;
`;

const Grid = styled.div`
  ${base}
  ${grid}
  ${abs} // not ideal here. 
`;

const Button = styled.div`
  ${interactive}
  background-color: crimson;
`

const Text = styled.div`
  ${base}
  ${fonts}
  pointer-events:none;
`;

const Content = styled.div`
  ${base}
  ${flex}
`;

const ControlBase = styled.div`
  ${base}
  ${size}
  ${background}
`;

const ControlInput = ({children,cols,...props})=>{
  return (
    <Grid cols={cols} {...props}>      
      <Content halign="flex-start">{children}</Content>
      <Button/>
    </Grid>
  )
}

const ControlLabel = styled( Text )`
  ${abs};
  ${flex}
  padding: 0px ${props=>props.padding}px;
`

const ControlSettings = ({children,cols,...props})=>{
  return (
    <Grid cols={cols} {...props}>      
      <Button/>
      <Content halign="flex-start">{children}</Content>
    </Grid> 
  )
}

const ControlExtended = ()=>{

}

const Control = forwardRef(({
  children,
  ordinal,
  label="",
  ...props
},ref )=>{

  // console.log( 'forward ref', ref );
  const metrics = useMetrics();
  const { cell } = metrics.grid;
  const cellHeight = cell;
  const colsInput = `1fr ${cell}`;
  const colsSettings = `${cell} 1fr`;
  const bgColor = ordinal % 2 === 0 ? '#191919' : '#101010';
  const padding = parseInt(cellHeight.replace('px',''))/4;

  // TODO: defer render the settings compo
  return (
    <ControlProvider>
      <ControlBase 
        ref={ref}
        height={cell} 
        backgroundColor={bgColor}
        {...props}
        >

        <ControlInput cols={colsInput} x="0%">        
          { children }
          <ControlLabel padding={padding}>
            {label}
          </ControlLabel>           
        </ControlInput>            
        <ControlSettings x="100%" cols={colsSettings}>
          Settings  
        </ControlSettings>
       
      </ControlBase>  
    </ControlProvider>
  )

});


export {
  Control,
  Panel
}