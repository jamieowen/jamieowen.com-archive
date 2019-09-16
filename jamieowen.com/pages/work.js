import React from 'react';
import { Fragment } from 'react';

import Link from 'next/link';

import Page from '../components/Page';

import HeaderFooter from '../sections/header-footer';
import ProjectsList from '../components/ProjectsList';

import ListProjects from '../sections/list-projects';
import projects from '../data/projects';

import Transition from '../components/Transition';
import { requestBoundsUpdate } from '../components/TransitionManager';

import { calcPageMetrics } from '../styles/typography';
import { metrics } from '../styles/typography';

export default class Work extends Page{

    static getInitialProps (props) {

        const query = props.query;
        return {
            projectId: query.id
        }

    }

    constructor( props ){

        super( props );


    }

    componentDidMount(){

        window.addEventListener( 'resize', this.onResize );
        this.updateImageSizes();

    }

    componentWillUnmount(){

        window.removeEventListener( 'resize', this.onResize );

    }

    componentDidUpdate(){

        this.updateImageSizes();

    }

    onResize = ()=>{

        this.updateImageSizes();

    }

    updateImageSizes(){

        if( this.projectImageElements ){

            const width = calcPageMetrics().actualWidth;
            
            this.projectImageElements.forEach( ( e )=>{

                if( e.ele ){

                    let ratio = e.image.height / e.image.width;
                    e.ele.style.width = width + 'px';
                    e.ele.style.height = ( width * ratio ) + 'px';

                }

            })

            requestBoundsUpdate();

        }

    }

    render(){

        let projectId = this.props.projectId;
        if( !projectId ){
            projectId = projects.getPageOrderProjects()[ 0 ].id;
        }
        
        const projectsList = projects.getPageOrderProjects();
        const project = projects.getProjectById( projectId );
        const nextPrev = projects.getNextPreviousProject( projectId );

        const headerImage = project.thumb ? project.thumb.url.replace('./static/', '/static/' ) : '/static/images/profile-pic.jpg';
        
        const formatNumbers = ( current, max )=>{

            return ( '00' + current ).slice(-2) + '/' + ( '00' + max ).slice(-2);

        }

        this.projectImageElements = [];

        const images = project.images.map( ( image,i )=>{

            const url = image.url;

            return (
                <div key={ i + 1 } >

                    <style jsx>
                    {`
                        div.numbers{
                            width: 100%;
                            text-align: center;
                        }    
                        
                        img.thumb{
                            background-color: #111111;
                            display: block;
                        }                        
                    `}
                    </style>
                    {/* <Transition gid={ `work-thumb-${ i + 1 }` }> */}
                        <img className="thumb"                 
                            src={url.replace('./static/', '/static/' ) }            
                            ref={ (ele)=>{ this.projectImageElements.push( { ele,image } ) } }       
                            />
                    {/* </Transition> */}

                    <Transition in={false}>
                        <div className="fnt-smallest color-secondary numbers">{ formatNumbers( i + 1, project.images.length ) }</div>
                    </Transition>

                </div>

            )

        }); 

        const createLink = ( project, text, className )=>{
            
            const exists = project !== null;

            return (
                <Link href={ exists ? { pathname: '/work', query: { id: project.id } } : undefined }  as={ exists ? `/work/${project.id}` : undefined }>
                    <a className={ className }>                                    
                        <div className="fnt-light fnt-medium">{ text }</div>
                        <div className="fnt-regular fnt-small">{ exists ? project.title : 'XXX' }</div>
                    </a>
                </Link>                
            )
        }

        const nextBack = (
            <nav>
                { createLink( nextPrev.previous, 'Previous', '' ) }
                {/* { createLink( nextPrev.next, 'Next', 'right' ) } */}
            </nav>
        )

        return (
            <Page>

                <style jsx>
                {`


                nav{
                    position: relative;
                    width: 100%;
                    
                    // display: flex;
                    // column-count: 2; 
                    // column-width: 50%;
                    // justify-content: space-between;

                }

                a.right{
                    position: absolute;
                    text-align: right;
                    right: 0px;
                    top: 0px;
                    opacity: 1;
                }

                a{
                    display: block;
                    color: #ffffff;
                    text-decoration: none;
                    // text-decoration: underline;
                    // opacity: 0.1;
                }


                div.left{
                    width: 50%;

                }

                div.right{
                    right: 0px;
                    top: 0px;
                    position: absolute;
                    width: 50%;
                    text-align: right;
                }

                div.columns{
                    position: relative;
                }


                `}
                </style>


                <div className="break-6"/>
                
                <Transition in={false}>
                    <div className="columns">

                        <div className="fnt-smallest color-secondary">Client Project</div>

                        <div className="right">
                            <div className="fnt-smallest color-secondary">{ formatNumbers( projectsList.indexOf( project ) + 1, projectsList.length ) }</div>   
                        </div>                        

                    </div>
                </Transition>

                <Transition in={false}>
                    <h1 className="fnt-large fnt-light color-content">{project.client}/</h1>
                    <h1 className="fnt-large fnt-regular">{project.title}</h1>
                </Transition>

                <div className="break-1"/>

                <div className="columns">

                    <Transition in={false}>
                        <div className="left fnt-smallest color-secondary">
                            <div>Agency</div>
                            <h2 className="fnt-small fnt-regular color-primary">{project.agency}</h2>
                        </div>
                    </Transition>

                    <Transition in={false}>
                        <div className="right fnt-smallest color-secondary">
                            <div>Technology</div>
                            <h2 className="fnt-small fnt-regular color-primary">{project.tech.join(', ')}</h2>
                        </div>
                    </Transition>

                </div>            


                <div className="break-1"/>

                <Transition in={false}>                    
                    <div className="fnt-smallest color-secondary">Info</div>
                </Transition>
                <Transition in={false}>
                    { 
                        project.content ? 
                        ( <div dangerouslySetInnerHTML={ { __html:project.content } }></div> ) :
                        ( <p>Content to come...</p> )
                    }
                </Transition>
                
                <div className="break-1"/>
                
                {/* <img className="thumb" src={headerImage}/> */}

                { 
                    images.length ? (
                        <Fragment>
                            <div className="fnt-smallest color-secondary">
                                Images
                            </div>
                            { images }
                        </Fragment>

                    )
                    : 
                    '' }


                <div className="break-2"/>

                <nav>
                { 
                    nextPrev.previous ?  
                    (
                        <div>
                            
                            {/* <div className="fnt-smallest color-secondary">
                                Navigation
                            </div> */}
                            <Link href={{ pathname: '/work', query: { id: nextPrev.previous.id } }} as={`/work/${nextPrev.previous.id}`}>
                                                            
                                <a className="">                                    

                                    <div className="fnt-light fnt-medium">Previous</div> 
                                    <div className="fnt-regular fnt-smallest color-secondary">{ nextPrev.previous.title }</div>                                                                       
                                    
                                </a>
                                
                            </Link>
                            <div className="break-2"/>
                        </div>

                    ) :
                    <span/>
                }

                { 
                    nextPrev.next ?  
                    (
                        <div className="right">
                            
                            {/* <div className="fnt-smallest color-secondary">
                                Navigation
                            </div> */}
                            <Link href={{ pathname: '/work', query: { id: nextPrev.next.id } }} as={`/work/${nextPrev.next.id}`}>
                                                            
                                <a className="">                                    

                                    <div className="fnt-light fnt-medium">Next</div> 
                                    <div className="fnt-regular fnt-smallest color-secondary">{ nextPrev.next.title }</div>                                                                       
                                    
                                </a>
                                
                            </Link>
                            <div className="break-2"/>
                        </div>

                    ) :
                    <span/>
                }
                </nav>
                
                <div className="break-2"/>

                <ListProjects transitionIn={false}/>
                

                {/* <ProjectsList 
                    featured={true}
                    featuredMax={6}
                    nonFeatured={true}
                    /> */}

                <HeaderFooter transitionIn={false}/>

                <div className="break-4"/>

            </Page>
        )

    }
}