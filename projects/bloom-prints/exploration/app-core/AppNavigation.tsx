import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const AppNavigation = (props)=>{

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/editor">
          <Button>Editor</Button>
        </Link>        
        <Link to="/ui-tests">
          <Button>UI Tests</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )

}