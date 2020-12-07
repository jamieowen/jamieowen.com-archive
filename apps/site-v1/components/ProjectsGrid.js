import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Browser from 'bowser';

import Transition from '../components/Transition';

import ProjectsGridCell from '../components/ProjectsGridCell';
import { metrics, calcPageMetrics } from '../styles/typography';


export default class ProjectsGrid extends Component{

    constructor( props ){

        super( props );

    }

    static defaultProps = {

        featured: [],
        nonFeatured: [],
        gridType: 'grid-1'

    }


    renderGrid1(){

        const featured = this.props.featured;
        const nonFeatured = this.props.nonFeatured;

        if( Browser.mobile ){

            return (
                <div ref={ this.onHandleRef } className="flex-grid flex-col-grid">
    
                    <ProjectsGridCell cellW={4} cellH={4} project={ featured[0] }/>
                    <ProjectsGridCell cellW={4} cellH={2} project={ featured[1] }/>
                    <ProjectsGridCell cellW={4} cellH={2} project={ featured[2] }/>
                    <ProjectsGridCell cellW={4} cellH={4} project={ featured[3] }/>            
    
                </div>
    
            )

        }else{

            return (
                <div ref={ this.onHandleRef } className="flex-grid flex-col-grid">
    
                    <ProjectsGridCell cellW={2} cellH={2} project={ featured[0] }/>
                    <ProjectsGridCell cellW={2} cellH={1} project={ featured[1] }/>
                    <ProjectsGridCell cellW={2} cellH={1} project={ featured[2] }/>
                    <ProjectsGridCell cellW={2} cellH={2} project={ featured[3] }/>            
    
                </div>
    
            )

        }


    }

    renderGrid2(){

        const featured = this.props.featured;
        const nonFeatured = this.props.nonFeatured;

        // Output must be the same on client and server ( server will render desktop i assume )
        if( Browser.mobile ){

            return (

                <div ref={ this.onHandleRef }>
                    
                    <div className='flex-grid flex-col-grid-2'>
    
                        <ProjectsGridCell cellW={4} cellH={3} project={ featured[0] }/>
                        <ProjectsGridCell cellW={2} cellH={2} project={ nonFeatured[0] }/>
                        <ProjectsGridCell cellW={2} cellH={2} project={ nonFeatured[1] }/>
    
                    </div>
    
                    <div className="flex-grid flex-row-grid">
    
                        <ProjectsGridCell cellW={2} cellH={2} project={ nonFeatured[2] }/>
                        <ProjectsGridCell cellW={2} cellH={2} project={ nonFeatured[3] }/>
                        <ProjectsGridCell cellW={4} cellH={2} project={ featured[1] }/>
    
                    </div>
    
                </div>  

            )

        }else{

            return (
                <div>
                    
                    <div ref={ this.onHandleRef } className="flex-grid flex-col-grid-2">
    
                        <ProjectsGridCell cellW={3} cellH={2} project={ featured[0] }/>
                        <ProjectsGridCell cellW={1} cellH={1} project={ nonFeatured[0] }/>
                        <ProjectsGridCell cellW={1} cellH={1} project={ nonFeatured[1] }/>
    
                    </div>
    
                    <div className="flex-grid flex-row-grid">
    
                        <ProjectsGridCell cellW={1} cellH={1} project={ nonFeatured[2] }/>
                        <ProjectsGridCell cellW={1} cellH={1} project={ nonFeatured[3] }/>
                        <ProjectsGridCell cellW={2} cellH={1} project={ featured[1] }/>
    
                    </div>
    
                </div>            
            )

        }

    }

    renderGrid3(){

        const featured = this.props.featured;
        const nonFeatured = this.props.nonFeatured;

        if( Browser.mobile ){

            return (
                <div ref={ this.onHandleRef } className="flex-grid flex-row-grid">
    
                    <ProjectsGridCell cellW={4} cellH={4} project={ featured[0] }/>
                    <ProjectsGridCell cellW={4} cellH={4} project={ featured[1] }/>
                    <ProjectsGridCell cellW={4} cellH={2} project={ featured[2] }/>
                    <ProjectsGridCell cellW={2} cellH={2} project={ nonFeatured[0] }/>
                    <ProjectsGridCell cellW={2} cellH={2} project={ nonFeatured[1] }/>
    
                </div>
    
            )

        }else{

            return (
                <div ref={ this.onHandleRef } className="flex-grid flex-row-grid">
    
                    <ProjectsGridCell cellW={2} cellH={2} project={ featured[0] }/>
                    <ProjectsGridCell cellW={2} cellH={2} project={ featured[1] }/>
                    <ProjectsGridCell cellW={2} cellH={1} project={ featured[2] }/>
                    <ProjectsGridCell cellW={1} cellH={1} project={ nonFeatured[0] }/>
                    <ProjectsGridCell cellW={1} cellH={1} project={ nonFeatured[1] }/>
    
                </div>
    
            )

        }


    }

    componentDidMount(){

        window.addEventListener( 'resize', this.onResize );
        this.onResize();

    }

    componentWillUnmount(){

        window.removeEventListener( 'resize', this.onResize );

    }

    componentDidUpdate(){

        this.onResize();

    }

    onResize = ()=>{

        if( !this.domElement ){
            return;
        }

        const cellSize = calcPageMetrics().cellSize;

        // this.domElement.style.backgroundColor = 'hotpink';
        // this.domElement.style.marginBottom = '44px';

        switch( this.props.gridType ){
            
            case 'grid-1':
            case 'grid-3':

                if( Browser.mobile ){
                    this.domElement.style.width = ( cellSize * 4 ) + 'px';
                    this.domElement.style.height = ( cellSize * 12 ) + 'px';
                }else{
                    this.domElement.style.width = ( cellSize * 4 ) + 'px';
                    this.domElement.style.height = ( cellSize * 3 ) + 'px';
                }

                break;
            case 'grid-2':

                if( Browser.mobile ){
                    this.domElement.style.width = ( cellSize * 4 ) + 'px';
                    this.domElement.style.height = ( cellSize * 9 ) + 'px';
                }else{
                    this.domElement.style.width = ( cellSize * 4 ) + 'px';
                    this.domElement.style.height = ( cellSize * 2 ) + 'px';
                }


                break;

        }


        
    }

    onHandleRef = ( ref )=>{

        this.domElement = ref;
        this.onResize();

    }    
    
    render(){

        let renderFunction = ()=>{ return ( <div></div>) };

        switch( this.props.gridType ){

            case 'grid-1':
                renderFunction = this.renderGrid1;
                break;
            case 'grid-2':
                renderFunction = this.renderGrid2;
                break;
            case 'grid-3':
                renderFunction = this.renderGrid3;
                break;                

        }

        return (

            <Fragment>

                <style jsx global>
                    {`

                        // Container CSS

                        div.flex-grid{

                            display: flex;                        
                            align-content: flex-start;
                            flex-wrap: wrap;
                            
                        }

                        div.flex-row-grid{

                            flex-direction: row;

                        }

                        div.flex-col-grid{

                            flex-direction: column;

                        }

                        div.flex-col-grid-2{

                            flex-direction: column;

                        }

                        @media( max-width:767px ){

                            div.flex-col-grid-2{

                                flex-direction: row;
    
                            }

                        }

                        // Item CSS

                        div.grid-item{                        
                            box-sizing: border-box;
                            background-position: 50% 50%;
                            background-size: cover;
                            cursor: pointer;
                            border-right: 1px solid #212121;
                            border-bottom: 1px solid #212121;
                            padding: 12px;
                            overflow: hidden;  
                            transition: opacity 0.35s ease-out;
                            opacity: 0.4;
                        }

                        div.grid-item:hover{
                            opacity: 0.1;                            
                        }

                    `}
                </style>


                { renderFunction.call( this ) }

            </Fragment>

        )

        // return renderFunction.call( this ); 
        
    }



}