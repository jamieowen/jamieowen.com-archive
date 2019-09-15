import React, {

} from 'react';
import styled from 'styled-components';

import {
  Control
} from '../base';

import {
  base
} from '../css';

const ButtonArea = styled.div`
  ${base}
  background-color: hotpink;
`;

const Button = ()=>{

  return (
    <Control>
      <ButtonArea>  
        Button
      </ButtonArea>
    </Control>
  )

}

export {
  Button
}