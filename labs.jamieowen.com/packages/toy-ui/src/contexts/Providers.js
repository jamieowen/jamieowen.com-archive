import React from 'react';

import {
  MetricsProvider,
  ControlsProvider,
  useMetrics
} from './';


const Providers = ({children})=>{
  const metrics = useMetrics();
  return (
    <ControlsProvider>
      <MetricsProvider value={metrics}>
        {children}
      </MetricsProvider>
    </ControlsProvider>
  )
}

export {
  Providers
}