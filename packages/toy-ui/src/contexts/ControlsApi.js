import {
  useReducer,
  useState,
  useMemo
} from 'react';

const controlEx = {
  id: '',
  group: '',
  value: null,
  props: {
    min: 0,
    max: 0,
    step: 0 
  },
  transforms: []
}
const createInitialState = ()=>{

  console.log( 'Create initial State' );
  return {
    controls: [],
  }

}

const createDispatchApi = (state,dispatch)=>{

  console.log( 'Create dispatch api.' );
  return {
    addControl:( control )=>{
      dispatch( {
        type: 'add-control',
        control
      })
    },
    removeControl: ( control )=>{
      dispatch({
        type: 'remove-control',
        control
      })
    },
    setControlValue: ( control, value )=>{
      dispatch({
        type: 'set-control-value',
        control,
        value
      })
    },
    observe:()=>{

    },
    unobserve:()=>{

    },
    getControl: (id)=>{
      let res = null;
      for( let i = 0; !res && i<state.controls.length; i++ ){
        if( state.controls[i].id === id ){
          res = state.controls[i];
        }
      }
      return res;
    }    
  }
}

const controlsReducer = (state,action)=>{

  const type = action.type;
  const control = action.control;
  if( !control ){
    return state;
  }
  let changed = false;

  switch( type ){
    case 'add-control':
      changed = true;
      state.controls.push( action.control );
      break;
    case 'remove-control':
      changed = true;
      break;
    case 'set-control-value':
      const { value } = action;
      control.value = value;
      // Emit value changes via events rather than 
      // context state.  This is to limit global context state
      // changes.
      control.events.emit( 'changed',value );
      // changed = true;
      break;
    
  }

  if( changed ){
    return {
      ...state
    }
  }else{
    return state;
  }

}

const useControlsReducer = ()=>{

  const [state,dispatch] = useReducer( controlsReducer, undefined, ()=>createInitialState() );
  const api = useMemo( ()=>createDispatchApi(state,dispatch), [state] );

  return {
    dispatch,
    ...state,
    ...api
  }

}

export {
  useControlsReducer
}