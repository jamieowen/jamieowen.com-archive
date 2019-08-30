import React, {
} from 'react';

import {
  useMetrics,
  Providers
} from './contexts';

import {
  Panel
} from './base';

import { ControlsRenderer } from './core/ControlsRenderer';

const Toy = ({children,...props})=>{

  const metrics = useMetrics();
  const { width } = metrics.panel;

  return ( 
    <Providers>
        <div>
          { children }
        </div>
        <Panel width={width}>
          <ControlsRenderer/>
        </Panel>  
    </Providers>
  )

}

export {
  Toy
}