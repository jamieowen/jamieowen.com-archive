import { useState, useEffect } from 'react';
import { useControls } from './ControlsContext';
import { EventEmitter } from 'eventemitter3';

const useToy = ( name, value, opts )=>{

  const controls = useControls();
  const [currentControl,setCurrentControl] = useState(null);
  const [currentValue,setCurrentValue ] = useState(value);

  useEffect( ()=>{
    if( !currentControl ){
      return;
    }
    const onChanged = (value)=>{
      setCurrentValue(value);
    }
    currentControl.events.on( 'changed', onChanged );
    return ()=>currentControl.events.off( 'changed', onChanged );        

  },[currentControl])

  if( currentControl ){
    return currentValue;
  }

  let control = controls.getControl( name );

  if( control ){
    setCurrentControl( control );
    setCurrentValue( control.value );
  }else{

    control = {
      id: name,
      type: 'slider',
      value: value,
      events: new EventEmitter()
    }

    controls.addControl( control );
    setCurrentControl( control );
    setCurrentValue( value );

  }

  return control.value;

}

export { useToy };