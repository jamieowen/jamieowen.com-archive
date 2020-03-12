import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme
} from "@material-ui/core";

import { AppContainer } from '../styling/containers';
import { AppNavigation } from './AppNavigation';

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

export const AppSetup = ({children,...props})=>{

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />        
        <AppNavigation/>
        <AppContainer>          
          {children}
        </AppContainer>      
      </ThemeProvider>
    </Router>
  )

}