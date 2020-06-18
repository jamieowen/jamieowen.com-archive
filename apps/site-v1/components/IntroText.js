import React from 'react';
import { metrics } from '../styles/typography';

export default class IntroText extends React.Component{

    constructor( props ){

        super( props );

        this.state = {
            numLines: 0
        }

        this.onResize = this.onResize.bind(this);

    }

    componentDidMount(){

        window.addEventListener( 'resize', this.onResize );
        this.onResize();

    }

    componentWillUnmount(){

        window.removeEventListener( 'resize', this.onResize );

    }

    onResize(){

        let height;
        if( typeof window !== 'undefined' ){
            height = window.innerHeight;
        }else{
            height = 500;
        }
        
        const numLines = Math.floor( height / metrics.lineHeight );  

        this.setState( {
            numLines: numLines
        });

    }

    render(){

        return (
            <div>
                
                <style jsx>
                {`
                    div{
                        width: 100%;
                        height: ${ (this.state.numLines - 2) * metrics.lineHeight }px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: left;
                        font-size: 24px;
                        line-height: ${metrics.lineHeight*2}px;
                    }
                `}
                </style>

                { this.props.children }

            </div>
        )

    }
}