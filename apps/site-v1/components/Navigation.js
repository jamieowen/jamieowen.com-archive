import React from 'react';
import { withRouter } from 'next/router'
import Router from 'next/router';
import RouterEvents from '../components/RouterEvents';

import Link from 'next/link';
import { metrics } from '../styles/typography';

import projects from '../data/projects';

import Transition from './Transition';

import SvgMenu from '../styles/svg/menu-button.svg';
import SvgNext from '../styles/svg/next-button.svg';
import SvgPrevious from '../styles/svg/previous-button.svg';


class Navigation extends React.Component{

    constructor( props ){

        super( props );

    }


    componentDidMount(){

        window.addEventListener( 'scroll', this.onScroll );
        window.addEventListener( 'resize', this.onResize );

        this.onResize();

    }

    componentWillUnmount(){
        
        window.removeEventListener( 'scroll', this.onScroll );
        window.removeEventListener( 'resize', this.onResize );

    }

    onScroll = ( ev )=>{
        
        const isHome = this.props.router.pathname === '/';

        if( isHome ){

            const body = document.body;
            const html = document.documentElement;
            
            const height = Math.max( body.scrollHeight, body.offsetHeight, 
                                html.clientHeight, html.scrollHeight, html.offsetHeight );

            const scrollY = window.pageYOffset;

            if( scrollY / height > 0.25 ){
                this.nextButton.classList.remove( 'inactive' );
            }

        }

    }

    onResize = ( ev )=>{


    }    

    componentDidUpdate(){

        console.log( "NAVIGATION UPDATED" );

    }

    render(){

        const router = this.props.router;
        
        const links = [
            [ '/', 'Home' ],
            [ '/work', 'Work' ],
            [ '/play', 'Play' ]
        ];
        
        let projectId = undefined;

        if( this.props.projectId ){
            projectId = this.props.projectId;
        }else
        if( router.query && router.query.id ){
            projectId = router.query.id;        
        }

        const isHome = this.props.router.pathname === '/';
        const isWork = this.props.router.pathname.indexOf( '/work' ) > -1;

        let nextPrev;

        if( isWork ){
            nextPrev = projects.getNextPreviousProject( projectId );
        }else
        if( isHome ){
            nextPrev = {
                next: {
                    id: projects.getPageOrderProjects()[0].id
                }
            }
        }


        return (
            <nav>

                {/* <div className="menu-bar">
                {
                    links.map( ( link, i )=>{

                        const selected = link[0] === router.pathname;
                        
                        return (
                            <Link key={i} href={ link[0] }>
                                <a className={ 'fnt-small ' + ( selected ? 'fnt-regular' : 'fnt-heavy' )  }>{ link[1] }</a>
                            </Link>
                        )
                    } )

                }                
                </div> */}

                {/* <div>Back</div> */}
                {/* <div className="menu-button"></div> */}
                
                {/* <Transition>                     */}


                <Link href="/">

                    <div className={ `menu-button left${ isHome ? ' inactive' : '' }` }>
                        <SvgMenu/>            
                    </div>

                </Link>
                {/* </Transition> */}

                { 
                    // Previous Button

                    nextPrev.previous ?  
                    (
                        <Link 
                            href={{ pathname: '/work', query: { id: nextPrev.previous.id } }} 
                            as={`/work/${nextPrev.previous.id}`}
                            ref={ (ele)=>{ this.previousButton = ele; } }
                            >
                            <div className={ `menu-button right-prev${ isHome ? ' hidden' : '' }` }>
                                <SvgPrevious hello="there"/>
                            </div>
                        </Link>
                    ) :
                    <div className={ `menu-button right-prev inactive${ isHome ? ' hidden' : '' }` } ref={ (ele)=>{ this.previousButton = ele; } }>
                        <SvgPrevious/>
                    </div>
                } 

                {   

                    // Next Button

                    nextPrev.next ?  
                    (
                        <Link 
                            href={{ pathname: '/work', query: { id: nextPrev.next.id } }} 
                            as={`/work/${nextPrev.next.id}`}>                           
                            
                            <div 
                                className={ `menu-button right${ isHome ? ' inactive' : '' }` }
                                ref={ (ref)=>{ this.nextButton = ref } }>
                                <SvgNext/>
                            </div>
                        </Link>
                    ) :
                    <div 
                        className="menu-button right inactive"
                        ref={ (ref)=>{ this.nextButton = ref } }>
                        <SvgNext/>
                    </div>

                }

                <style jsx>
                {`
                    a{
                        font-size: 13px;
                        // font-weight: 500;
                        color: #000;
                        text-decoration: none;
                        margin:0px 10px;
                        letter-spacing: 0.25px;
                    }

                    nav{
                        position: fixed;
                        width: 100%;
                        z-index: 10000;
                        top: 0px; left: 0px;
                    }

                    .menu-bar{
                        background-color: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .menu-button{        
                        -webkit-over
                        box-sizing: border-box;
                        z-index: 10001;                
                        position: fixed;
                        cursor: pointer;
                        pointer-events: all;
                        width: ${ metrics.lineHeight * 2 }px;
                        height: ${ metrics.lineHeight * 2 }px;                        
                        top: ${ metrics.lineHeight * 2 }px;                   
                        border-radius: 50%;
                        opacity: 0.65;
                        transition: opacity 0.5s;
                        transform: translateY( 0px );
                        background-color: rgba( 0,0,0,0.1 );
                    }

                    .icon-size{
                        width: 30px;
                        height: 30px;
                    }

                    .menu-button:hover{
                        opacity: 0.3;
                    }

                    .menu-button:active,.menu-button:focus,.menu-button:link{
                        opacity: 0.65;
                    }

                    .inactive{
                        opacity: 0.1;
                        cursor: auto;
                        pointer-events: none;
                    }

                    .hidden{
                        visibility: hidden;
                    }

                    .fill{
                        background-color: white;
                        // background-color: hotpink;                        
                    }

                    .border{
                        border: solid 1px white;
                        background-color: #1A1D1C;                        
                    }

                    .left{
                        left: ${ metrics.lineHeight * 2 }px;
                    }

                    div.right{
                        right: ${ metrics.lineHeight * 2 }px;
                    }

                    div.right-prev{
                        right: ${ metrics.lineHeight * 5 }px;
                    }

                    @media( max-width: 767px ){

                        .menu-button{
                            top: ${ metrics.lineHeight * 0.5 }px !important;                            
                        }

                        .left{
                            left: ${ metrics.lineHeight * 0.5 }px !important;
                        }

                        .right{
                            right: ${ metrics.lineHeight * 0.5 }px !important;
                        }

                        .right-prev{
                            right: ${ metrics.lineHeight * 3.25 }px !important;
                        }

                    }       


                `}
                </style>                

            </nav>
        )

    }
    
}

// export default Navigation;
export default withRouter( Navigation );