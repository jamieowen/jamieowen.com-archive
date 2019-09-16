import React from 'react';
import { metrics } from '../styles/typography';
import Transition from '../components/Transition';

export default class List extends React.Component{

    constructor( props ){

        super( props );

    }

    render(){

        return (
            <div className="break">

                <style jsx>
                {`
                    div{
                        margin: 0px; padding: 0px;
                        line-height: ${metrics.lineHeight * 1 }px;
                        // width: ${metrics.columnWidth * 3 }px;
                    }

                    ul{
                        // list-style-type:disc;
                        overflow-wrap: normal;
                    }
                `}
                </style>

                <ul className="fnt-smaller">
                    { 
                        this.props.children.map( (ele,i)=>{

                            return React.cloneElement( ele, {
                                index: i,
                                lastChild: i === this.props.children.length-1
                            })

                        })
                    }
                </ul>                

            </div>
        )

    }
}