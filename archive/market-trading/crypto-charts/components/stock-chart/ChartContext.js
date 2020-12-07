import React, {
  createContext,
  useReducer,
  useContext
} from 'react'

const ChartContext = createContext({});

const defaultProviderValue = {
  data: null
}

const ChartProvider = ({children,value})=>{

  return (
    <ChartContext.Provider value={createApiProviderValue(value)}>
      { children }
    </ChartContext.Provider>
  )

}

const useChart = ()=>{
  return useContext( ChartContext );
}

const createApiProviderValue = (value)=>{

  const initState = Object.assign( {},defaultProviderValue,value );
  const [ state,dispatch ] = useReducer( stateReducer,initState );
  
  return state;

}

const stateReducer = (state,action)=>{

  retutn
}

export {
  ChartProvider,
  ChartContext,
  createApiProviderValue,
  useChart
}
