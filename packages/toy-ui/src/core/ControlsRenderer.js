import React, {
  useState
} from 'react';

import { useControls } from '../contexts';


import {
  Slider,
  Button
} from '../controls/';

let renderCount = 0;

/**
 * Wrap each control with an update interface to minimize
 * changes in state to this component wrapper only.
 */
const ControlRenderer = ({
  Renderer,
  control,
  ordinal,
  ...props
})=>{

  const [currentValue,setCurrentValue] = useState(value);
  const {setControlValue} = useControls();
  const onChange = (value)=>{
    setCurrentValue(value); // force us to refresh, and update value globally
    setControlValue(control,value);
  }
  const value = control.value;
  const label = control.id; 

  return (
    <Renderer 
      label={label}
      value={value} 
      ordinal={ordinal}
      onChange={onChange} 
      {...props}/>
  )

}

/**
 * 
 */
const ControlsRenderer = ()=>{

  renderCount++;
  console.log( 'Controls Render', renderCount );
  const controls = useControls().controls;

  const renderers = controls.map( (control,i)=>{

    const value = control.value;

    if( typeof value === 'function' ){
      return (
        <Button         
          key={i} 
          // onChange={onChange}
          value={value} 
          label="" 
          ordinal={i}/>
      )
    }else{
      return (
        <ControlRenderer key={i} ordinal={i} Renderer={Slider} control={control}/>
      )
    }

  });

  return renderers;

}

export { ControlsRenderer };