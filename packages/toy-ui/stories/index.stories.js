import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { Slider } from '../src/controls/Slider';
import { ControlRenderer } from '../src/core/ControlsRenderer';

storiesOf('Hello Toy', module)
  // .add('to Storybook', () => <Welcome showApp={linkTo('Button')} /> )
  .add('Controls Overview', ()=>{
    return [
      <ControlRenderer ordinal={0} Renderer={Slider}/>,
      <ControlRenderer ordinal={1} Renderer={Slider}/>,
      <ControlRenderer ordinal={2} Renderer={Slider}/>,      
    ]
  })


storiesOf('Controls', module)
  .add('Boolean', () =>{} ) // value = true/false
  .add('Text', () =>{} ) // value = "asdas"
  .add('Options', () =>{} ) // value = [ "text", "text", 1 ]
  .add('Number', () =>{} ) // value = 1, 0.2, etc
  .add('Vector', () =>{} ) // value = [ 0.2,0.3,0.2 ] ( vec2,vec3,vec4, vecX )
  .add('Button', () =>{} ) // value = ()=>{}
  .add('Color', ()=>{} ) // value = '#efefef' || { r,g,b }, { h,s,l }, { l,a,b }
  // .add('')
  


// storiesOf('Control Modes', module)
//   .add('minimized', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('maximized', () => (
//     <Button onClick={action('clicked')}>
//     </Button>
//   ))
//   .add('settings mode', () => (
//     <Button onClick={action('clicked')}>
//     </Button>
//   ));  


// storiesOf('Number Slider', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     [

//     ]
    
//   ));

// storiesOf('Vector Slider', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
  
// storiesOf('Function Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));  
