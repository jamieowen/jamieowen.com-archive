import React, {
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';
import { useMetrics,useToy } from './contexts';
import { Control } from './base';
import { base,size,abs,interactive } from './css';
import { useDrag,useBounds } from './hooks';

const SliderArea = styled.div.attrs(({opacity,width})=>{
  opacity = opacity * 0.5 + 0.5;
  return {
    style: {opacity,width}
  }
})`
  height: 100%;
  background-color: firebrick;  
  pointer-events: none;
`

const SliderHitArea = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`

const Slider = ({value,...props})=>{
  
  const [pressed,setPressed] = useState(false);
  const [avalue,setValue] = useState(value);  
  const sw = avalue * 100 + '%';
  const [bounds,boundsRef] = useBounds();

  const update = (ev)=>{
    const {clientX} = ev;
    const [lx,width] = [clientX-bounds.x,bounds.width];
    const value = Math.max(0,Math.min(1,lx/width));
    setValue(value);
  }

  const onPointerDown = (ev)=>{
    setPressed(true);
    update(ev.nativeEvent);
  }
  const onPointerUp = ()=>{
    setPressed(false);
  }
  const onPointerMove = (ev)=>{
    update(ev.nativeEvent);
  }

  useEffect(()=>{
    if( pressed ){
      window.addEventListener('mouseup',onPointerUp);
      window.addEventListener('mousemove',update);
    }
    return ()=>{
      window.removeEventListener('mouseup',onPointerUp);
      window.removeEventListener('mousemove',update);
    }
  },[pressed])  

  return (
    <Control 
      {...props}>

      <SliderArea 
        opacity={avalue}
        width={sw}/> 

      <SliderHitArea
        onMouseUp={onPointerUp}
        onMouseDown={onPointerDown}
        onMouseMove={pressed?onPointerMove:undefined}            
        ref={boundsRef}
      />

    </Control>
  )

}


const ButtonArea = styled.div`
  ${base}
  background-color: hotpink;
`
const Button = ()=>{

  const toy = useToy();
  console.log( 'Button : ', toy );
  return (
    <Control>
      <ButtonArea>  
        Button
      </ButtonArea>
    </Control>
  )

}


export {
  Slider,
  Button
}
