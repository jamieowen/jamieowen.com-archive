import React from 'react';
import { Grid,Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useContainerStyles = makeStyles(theme => ({
  app: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(12) // bar height
  },
  fullscreen: {
    width: '100%',
    height: `calc( 100% - ${theme.spacing(8) }px )`,
    padding: 0,
    margin: 0,
    top: theme.spacing(8),
    left: 0,
    position: 'fixed',
    // backgroundColor: 'crimson'
  },
}));

export const AppContainer = ({children,...props})=>{

  const classes = useContainerStyles();

  return (
    <div {...props} className={classes.app}>
      { children }
    </div>
  )

}

export const FullscreenContainer = ({children,...props})=>{

  const classes = useContainerStyles();
  return (
    <div className={classes.fullscreen}>
      { children }
    </div>
  )

}
