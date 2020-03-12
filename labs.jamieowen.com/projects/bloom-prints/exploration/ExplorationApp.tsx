import React from 'react';

import { AppSetup } from './app-core';
import { ArtworkEditor } from './artwork-editor/ArtworkEditor';
import { Types } from './TypeTest';
import { SliderTests } from './SliderTests';

import { Route } from 'react-router';
import { GridContainer, GridItem6 } from './styling/grid';

export const ExplorationApp = ()=>{

  return (
    <AppSetup>
      <Route path="/">
      </Route>
      <Route path="/editor">
        <ArtworkEditor/>  
      </Route>      
      <Route path="/ui-tests">
        <GridContainer spacing={6}>
          <GridItem6>
            <Types/>
          </GridItem6>
          <GridItem6>
            <SliderTests/>
            <SliderTests/>
          </GridItem6>
        </GridContainer>   
      </Route>            
    </AppSetup>        
  )

}