import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0),
    // backgroundColor: 'rgba(255,0,255,0.5)'
  },
  item: {
    // backgroundColor: 'rgba(0,0,255,0.2)',
    padding: theme.spacing(0)
  }
}));

export const GridContainer = ({children, ...props})=>{
  const classes = useStyles();
  return (
    <Grid container spacing={0} className={classes.container} {...props}>
      { children }
    </Grid>
  )
}

export const GridItem = ({children, ...props})=>{
  const classes = useStyles();
  return (
    <Grid item xs={3} className={classes.item} {...props}>
      {children}
    </Grid>
  )
}

export const GridItem12 = (props) => <GridItem xs={12} {...props}/>
export const GridItem6 = (props) => <GridItem xs={6} {...props}/>
