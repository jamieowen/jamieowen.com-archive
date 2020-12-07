import { Component, Fragment } from 'react';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
import Browser from 'bowser';

import Navigation from './Navigation';
import Meta from './Meta';
import Grid from './Grid';
import GridDebug from './GridDebug';
import LabExperiment from './LabExperiment';

import Tracking from './Tracking';


// Styles
import Typography from '../styles/typography';
import Reset from '../styles/reset';
import Core from '../styles/core';

import TransitionManager from './TransitionManager';
import Transition from './Transition';

import reset from '../styles/reset';
import typography from '../styles/typography';
import { metrics } from '../styles/typography';


export default class Page extends Component{

    constructor( props ){

        super( props );

    }

    render(){
        
        return (
            <Fragment>

                {/* Styles & Meta */}

                <Reset/>
                <Meta/>
                <Tracking/>
                
                <Core/>                
                <Typography/>                       

                {/* <GridDebug/>          */}

                <style jsx global>
                    {`

                    body { 
                        // background: #212121;
                        background-color: #1A1D1C;
                        width: 100%;
                        margin: 0px;
                        padding: 0px;
                        overflow-x: hidden;
 
                        color: #efefef;
                        font-family: Work Sans, sans serif;

                        // -webkit-overflow-scrolling: touch;

                    }

                    .container{

                        position: relative;
                        // background-color: rgba(0,255,0,0.02);

                        box-sizing: border-box;
                        width: 100%;
                        overflow-x: hidden;

                        min-width: 320px;
                        max-width: ${ 1000 + ( metrics.lineHeight * 2 ) }px;
                        
                    }

                    .container-edge{
                        position: absolute;
                        top: 100px;
                        right: 0px;
                        background-color: #ff0000;
                        width: 20px;
                        height: 20px;
                    }

                    @media( max-width: 768px ){

                        .container{                            
                            padding: 0px ${metrics.lineHeight * 0.6}px;
                        }

                    }

                    @media( min-width: 769px ){

                        .container{
                            padding: 0px ${metrics.lineHeight * 2}px;
                            
                        }

                    }

                    // @media( min-width: 1200px ){

                    //     .container{
                    //         max-width: 1000px;
                    //     }

                    // }
                                    
                `}
                </style>
                
                {/* Content */}

                <TransitionManager config={{
                    visibilityMargin: {
                        min: Browser.mobile ? 50 : 50,
                        max: Browser.mobile ? 150 : 250,
                        percentage: Browser.mobile ? 0.25 : 0.3
                    }
                }}>  
                    <div className="container">                

                        <Navigation/>
                        {/* <div className="container-edge"/> */}

                                            
                        { this.props.children }
                        
                    </div>
                </TransitionManager>

            </Fragment>
        )
    }
}
