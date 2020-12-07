import React from 'react';
import Sketch from '@jamieowen/sketch';
import { Canvas } from 'react-three-fiber';
import { 
  Toy,
  useToy 
} from '@jamieowen/toy.gui';

const TestValues = ()=>{

  const brightness = useToy( 'brightness', 0.3, { min: 0, max: 1, step: 0.1 });
  const shorthand = useToy( 'contrast', 0.5 );

  const onClick = useToy( 'redraw',(values)=>{
    console.log( 'Click' );
  })

  const values = [
    brightness, shorthand
  ];

  const renderValues = values.map((v,i)=>{
    return <div key={i}>{v.toString()}</div>
  });

  return (
    <div> 
      { renderValues }
    </div>
  )
}

Sketch( ()=>{
  return (
    <Toy>
      <TestValues/>
      <Canvas pixelRatio={2}>
      </Canvas>
    </Toy>
  )
});