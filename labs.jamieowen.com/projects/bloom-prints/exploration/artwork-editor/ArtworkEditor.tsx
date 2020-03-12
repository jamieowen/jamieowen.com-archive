import React from 'react';
import { GridContainer,GridItem6, GridItem12 } from '../styling/grid';
import { FullscreenContainer } from '../styling/containers';
import { makeStyles } from '@material-ui/core/styles';
import { Tab,Tabs,Toolbar,AppBar } from '@material-ui/core';

import { H1,H3,Body1 } from '../styling/typography';
import { Types } from '../TypeTest';

export const useStyles = makeStyles(theme => ({
  tab: {
    minWidth:'100px'
  },
  toolbar: {
    minHeight: 'auto',
    padding: 0
  },
  preview:{
    backgroundColor: 'crimson',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }

}));

export const ArtworkEditor = (props)=>{

  const classes = useStyles();
  console.log( 'classes:', classes );

  const onChange = ()=>{
    console.log('change');
  }

  return (
    <FullscreenContainer>
      {/* <Types/> */}
      <GridContainer spacing={0}>
        <GridItem6>
          <AppBar position="static">
          <Toolbar className={classes.toolbar}>
          <Tabs value={0} onChange={onChange}>
            
            <Tab label="Layout" className={classes.tab}/>
            <Tab label="Photos" className={classes.tab}/>
            <Tab label="Style" className={classes.tab}/>
            <Tab label="Personalise" className={classes.tab}/>
            
          </Tabs>
          </Toolbar>
          </AppBar>
        </GridItem6>
        <GridItem6>
          <div className={classes.preview}/>
        </GridItem6>
      </GridContainer>
    </FullscreenContainer>
  )

}