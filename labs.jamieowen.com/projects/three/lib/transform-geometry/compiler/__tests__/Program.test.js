
import {
  compileProgram 
} from '../Compiler';

import * as basicConfig from './fixtures/basic-config';
import basicShader from './fixtures/basic-shader';

test( 'Test Program Basics', ()=>{

  const {
    uniforms,
    attributes
  } = basicConfig;

  const program = compileProgram( 
    basicShader,
    attributes,
    uniforms
  )

  const positions = attributes.position.array;

  // initial positions should be 1.
  console.log( 'RUN 1 (x3)' );
  program.setUniform( 'time', 3 );
  program.run();
  console.log( 'Positions:', positions );
  console.log( 'RUN 2 (x15)' );
  program.setUniform( 'time', 15 );
  program.run();
  console.log( 'Positions:', positions );

  // Actually write the test....

})