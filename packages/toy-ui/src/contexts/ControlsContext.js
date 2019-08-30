import React,{
  createContext,
  useReducer,
  useContext
} from 'react';

import { useControlsReducer } from './ControlsApi'

const ControlsContext = createContext(null);
const useControls = ()=>useContext(ControlsContext);

let refreshCount = 0;

const ControlsProvider = ({
  children,
  ...props
})=>{
  refreshCount++;
  const state = useControlsReducer();
  console.log( 'Refresh Count:', refreshCount );
  console.log( 'Reducer state:', state );

  return (
    <ControlsContext.Provider value={state}>
      { children }
    </ControlsContext.Provider>
  )

}

export {
  ControlsProvider,
  useControls
}






