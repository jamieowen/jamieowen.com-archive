
import React from 'react';

import { Fragment } from 'react';
import Link from 'next/link';

import Transition from '../components/Transition';
import { metrics } from '../styles/typography';

import SvgMenu from '../styles/svg/menu-button.svg';
import SvgGithub from '../styles/svg/github.svg';
import SvgLinkedIn from '../styles/svg/linkedin.svg';
import SvgTwitter from '../styles/svg/twitter.svg';

export default ( props )=>{

    console.log( 'WORK PROPS ', props );
    return (
            
        <section>

            <style jsx>
            {`

                div.col-container{

                    width: 100%;
                    box-sizing: border-box;
                    display: flex;
                    
                }

                div.column{                    
                    flex: 50%;
                }

            `}
            </style>

            <style jsx global>
            {`
                svg.icon{
                    
                    width: ${ metrics.desktop.lineHeight * 1.5 }px;
                    height: ${ metrics.desktop.lineHeight * 1.5 }px;

                    margin-right: ${ metrics.desktop.lineHeight * 0.5 }px;

                    fill: white;
                    opacity: 1;
                    transition: opacity 0.25s;
                    cursor: pointer;
                    pointer-events: all;
                    
                }

                @media( max-width: 767px ){
                    svg.icon{
                    
                        width: ${ metrics.mobile.lineHeight * 2 }px;
                        height: ${ metrics.mobile.lineHeight * 2 }px;
                        margin-right: ${ metrics.mobile.lineHeight * 1 }px;
                        
                    }                    
                }

                svg.icon:hover{
                    opacity: 0.5;
                }

            `}
            </style>            
                
            <div className="break-5"/>

            <div className="col-container ">

                <div className="column">
                    <Transition in={ props.transitionIn }>
                        <span className="hide-op">
                            <div className="fnt-smallest fnt-heavy color-secondary">
                                Location/Contact
                            </div>

                            <h1 className="fnt-smaller fnt-heavy color-primary">
                                London, UK
                            </h1>

                            <h2 className="fnt-smaller fnt-regular color-primary">
                                {/* Creative Technologist <br/>and Software Engineer */}
                                +44(0)7976 000480<br/>
                                hello@jamieowen.com
                            </h2>
                        </span>
                    </Transition>
                </div>

                <div className="column">
                    <Transition in={ props.transitionIn }>
                        <span className="hide-op">
                            <div className="fnt-smallest fnt-heavy color-secondary">
                                Social
                            </div>

                            <div>                            
                                <Link href="http://github.com/jamieowen">
                                    <a target="_blank"><SvgGithub className="icon"/></a>
                                </Link>
                                <Link href="http://www.linkedin.com/in/jamie-owen">
                                    <a target="_blank"><SvgLinkedIn className="icon"/></a>
                                </Link>
                                <Link href="https://twitter.com/_jamieowen">
                                    <a target="_blank"><SvgTwitter className="icon"/></a>
                                </Link>                                
                            </div>
                        </span>
                    </Transition>
                </div>

            </div>

        </section>

    )
    
}