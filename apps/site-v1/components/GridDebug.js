import React from 'react';
import { metrics } from '../styles/typography';

export default class Page extends React.Component{

    constructor( props ){

        super( props );

        this.state = {
            visible: true
        }

        this.onKeyUp = this.onKeyUp.bind(this);

    }

    componentDidMount(){

        window.addEventListener( 'keyup', this.onKeyUp );

    }

    componentWillUnmount(){

        window.removeEventListener( 'keyup', this.onKeyUp );

    }

    onKeyUp( ev ){

        switch( String.fromCharCode(ev.keyCode).toLowerCase() ){
            case 'g':
                
                this.setState( {
                    visible: !this.state.visible
                });

                break;
        }

    }

    render(){

        let lines = [];
        for( let i = 0; i<200; i++ ){
            lines.push( i );
        }

        //let columns = [10,11,12];
        const scale = 1.0;
        const className = "grid-debug" + ( this.state.visible ? '' : ' hide' );

        return (
            <div className={className }>
                <style jsx>
                {`
                    div.grid-debug{
                        pointer-events:none;
                        width: 100%; 
                        height: 100%;
                        position: absolute;
                        top: 0px;
                        z-index: 1000;
                    }

                    div.line{
                        width: 100%;
                        height: ${metrics.lineHeight * scale }px;
                        margin-bottom: ${metrics.lineHeight * scale }px;
                        background-color: #ff00ff;
                        opacity: 0.1;
                    }

                    .hide{
                        display: none;
                    }

                `}
                </style>

                {
                    lines.map( ( line )=>{
                        return (
                            <div className="line"/>
                        )
                    })
                }

            </div>
        )
   
    }
}