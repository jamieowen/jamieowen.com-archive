import React from 'react';
import { Fragment } from 'react';

import { metrics } from '../styles/typography';
import Link from 'next/link';
import Transition from './Transition';

const Style = ()=>{

    return (
        <style jsx>
        {`
            li.list-item{
                display: inline-block;
                position: relative;
                font-weight: 300;
                vertical-align: top;
                transition: opacity 0.25s;
            }

            li.link{
                cursor: pointer;
            }

            li.link:active,li.link:visited,li.link:link{
                opacity: 1.0;
            }

            li.link:hover{
                opacity: 0.5;
            }

            div.list-item-container{
                display: inline-block;
            }

            span.list-spacer{
                margin-left: 8px;
                margin-right: 22px;
                position: relative;

                font-size: 10px;
                font-weight: 600;
                letter-spacing: 1.1px;

                color: #999999;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 1px solid white;
                display: inline-block;
            }

            span.list-spacer-odd{
                // opacity: 0.3;
            }

            span.list-spacer-num{
                font-size: 10px;                        
            }

            span.norm{
                vertical-align:bottom;
                margin: 0px ${metrics.lineHeight*0.65}px;
            }
        `}
        </style>
    )
}

export default class ListItem extends React.Component{

    constructor( props ){

        super( props );

    }

    render(){

        const linkProps = {
            href: this.props.href || undefined,
            as: this.props.as || undefined,
            target: this.props.target || undefined
        }

        const classes = [ 'list-item', 'fnt-large', 'color-content' ];

        if( linkProps.href ){
            classes.push( 'link' );
        }

        return (

            <Fragment>

                <Style/>
                <Link {...linkProps}>
                    <Transition>
                        <a className="color-content" target={ linkProps.target }>
                            <li className={ classes.join( ' ' ) }>                                            
                                { this.props.children }
                                { this.props.lastChild ? '' : <span className="norm color-secondary fnt-larger fnt-light">/</span>}                            
                            </li>                    
                        </a>
                    </Transition>
                </Link>

            </Fragment>

        );

    }
}