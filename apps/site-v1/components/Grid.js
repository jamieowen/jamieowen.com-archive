import React from 'react';
import { metrics } from '../styles/typography';

export default class Grid extends React.Component{

    constructor( props ){

        super( props );

    }    

    render(){

        return (
            <section>
                <style jsx>
                {
                    `
                    section{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        width: ${ metrics.columnWidth * 3 }px;
                        margin: 0px ${ metrics.columnWidth * 0.25 }px;
                        flex-wrap: wrap;
                        // left: 50%;
                        // margin-left: -${ metrics.columnWidth * 1.5 }px;
                    }
                    `
                }
                </style>
                { this.props.children }
            </section>
        )

    }
}