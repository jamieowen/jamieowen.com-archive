import { Component } from 'react';
import Link from 'next/link';
import Browser from 'bowser';

import Transition from './Transition';
import ProjectsGrid from './ProjectsGrid';

import { calcPageMetrics } from '../styles/typography';


export default class ProjectsGridThumb extends Component{


    static defaultProps = {

        cellW: 1,
        cellH: 2,
        project: { 
            thumb: '/static/images/profile-pic.jpg',
            title: 'Test Project',
            agency: 'Agency'
        }

    }

    constructor( props ){

        super( props );

        this.domElement = null;

    }

    componentDidMount(){

        window.addEventListener( 'resize', this.onResize );
        this.onResize();

    }

    componentWillUnmount(){

        window.removeEventListener( 'resize', this.onResize );

    }

    onResize = ()=>{

        if( !this.domElement ){
            return;
        }

        let cellSize = calcPageMetrics().cellSize;

        this.domElement.style.width = ( cellSize * this.props.cellW ) + 'px';
        this.domElement.style.height = ( cellSize * this.props.cellH ) + 'px';
        
    }

    onHandleRef = ( ref )=>{

        this.domElement = ref;
        this.onResize();

    }

    render(){

        const project = this.props.project;

        const style = {
            backgroundImage: `url( ${project.thumb.url} )`
        }

        if( !this.props.project.thumb ){

            style.backgroundImage = '';
            style.backgroundColor = '#000011';

        }

        return (
            
            <Transition>
                <Link href={{ pathname: '/work', query: { id: project.id } }} as={`/work/${project.id}`}>            
                    
                    <div ref={ this.onHandleRef } className="grid-item" style={style}>

                        <div className="fnt-regular fnt-smaller fnt-shadow">{ project.client }</div>
                        <div className="fnt-heavy fnt-small fnt-shadow">{ project.title }</div>

                    </div>
                    
                </Link>
            </Transition>
            
        )

    }
}


/**
 



 */