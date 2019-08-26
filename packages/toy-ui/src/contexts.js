import React, { createContext,useContext } from 'react';
import { createContextApi } from './createContextApi';

const cellHeight = 36;
const MetricsContext = createContext({
  grid: {
    cell: ( cellHeight ) + 'px',
    cellH: ( cellHeight/2 ) + 'px',
    cell2: ( cellHeight*2 ) + 'px'
  },
  panel: {
    width: ( cellHeight * 8 ) + 'px'
  }
});

const ToyContext = createContext({});
const ToyProvider = props=><ToyContext.Provider {...props}/>

const ControlContext = createContext({
  selected: false,
  value: null
});

const ControlProvider = props=><ControlContext.Provider {...props}/>
const MetricsProvider = props=><MetricsContext.Provider {...props}/>
const useMetrics = ()=>useContext(MetricsContext);


const initialState = {
  controls: [],
  selectedControl: null
}

const api = {
  addControl: (config,state)=>{
    return { config };
  },
  removeControl: (config,state)=>{
    return { config };
  },
  getControlConfig: (id,state)=>{

  },
  getControlValue: (id,state)=>{

  },
  setControlValue: (id,value,state)=>{

  },
  observe: (id,callback,state)=>{

  },
  unobserve:(id,callback,state)=>{

  }
}

const reducer = (state,action)=>{

  const type = action.type;
  console.log( type );

}

const {
  Context,
  Provider,
  Consumer,
  useToy
} = createContextApi( 'Toy',initialState,api,reducer );

export {
  Context,
  Provider,
  Consumer,
  useToy
}

const Providers = ({children})=>{
  const metrics = useMetrics();
  const toy = useToy();
  console.log( 'TOY', toy );
  return (
    <ToyProvider>
      <Provider value={toy}>
        <MetricsProvider value={metrics}>
          {children}
        </MetricsProvider>
      </Provider>
    </ToyProvider>
  )
}


export {
  Providers,
  ControlProvider,
  useMetrics
}


