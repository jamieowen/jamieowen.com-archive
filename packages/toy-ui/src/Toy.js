import React, {
} from 'react';


import {
  useMetrics,
  Providers,
  useToy
} from './contexts';

import {
  Panel
} from './base';  

import {
  Slider,
  Button
} from './controls';
import { tsPropertySignature } from '@babel/types';


const Controls = ()=>{
  const toy = useToy();
  console.log( '>> TOY:', toy );

  const test = [
    ['Specular', 0.3 ],
    ['Ambient', 0.5 ],
    ['Brightness', 0.4 ],
    ['Contrast', 0.6 ],
    ['Hue', 0.9 ],
    ['Variation', 1 ],
    ['Button', ()=>console.log( 'hello') ] 
  ]
  const controls = test.map( ([l,v],i)=>{
    if( typeof v === 'function' ){
      return (
        <Button key={i} value={v} label="" ordinal={i}/>
      )
    }else{
      return (
        <Slider key={i} value={v} label={l} ordinal={i}/>
      )
    }

  });
  return controls;
}


const Toy = ()=>{

  const metrics = useMetrics();
  console.log( 'Metrics : ', metrics );
  const { width } = metrics.panel;  
  const toy = useToy();
  console.log( 'OK>>', toy );


  return ( 
    <Providers>
        <Panel width={width}>
          <Controls/>
        </Panel>  
    </Providers>
  )

}

export {
  Toy
}