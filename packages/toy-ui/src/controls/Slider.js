import React, {
} from 'react';

import styled from 'styled-components';
import { Control } from '../base';
import { useDrag } from '../hooks/';

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

const Slider = ({
  value=0.35,
  min=0,
  max=1,
  step=null,
  onChange=()=>{},
  ...props
})=>{
  
  const sw = value * 100 + '%';
  const dragProps = useDrag( (local,bounds)=>{    
    const value = Math.max(0,Math.min(1,local.x/bounds.width));
    onChange(value);
  })

  return (
    <Control {...props}>
      <SliderArea opacity={value} width={sw}/>
      <SliderHitArea {...dragProps}/>
    </Control>
  )

}

export {
  Slider
}
