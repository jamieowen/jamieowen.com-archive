import React, { createContext,useContext } from 'react';

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

const MetricsProvider = props=><MetricsContext.Provider {...props}/>
const useMetrics = ()=>useContext(MetricsContext);

export {
  MetricsProvider,
  useMetrics
}