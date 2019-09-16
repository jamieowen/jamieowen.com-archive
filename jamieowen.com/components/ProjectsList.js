import { Component } from 'react';

import projects from '../data/projects.generated';

import Transition from './Transition';
import ProjectThumb from './ProjectThumb';

export default class ProjectsList extends Component{


    static defaultProps = {

        featured: true,
        featuredMax: Math.Infinity,
        nonFeatured: false,
        nonFeaturedMax: Math.Infinity

    }

    constructor( props ){

        super( props );

    }

    getFeatured(){

        if( this.props.featured ){

            return projects.filter( ( project, i )=>{

                return project.featured && i < this.props.featuredMax;
    
            }).map( ( project, i )=>{
    
                return (
                    <Transition key={i+1}>
                        <ProjectThumb
                            featured={true}                            
                            project={project}
                        />
                    </Transition>
                ) 
    
            })

        }else{

            return [];

        }

    }

    getNonFeatured(){

        if( this.props.nonFeatured ){

            return projects.filter( ( project, i )=>{

                return !project.featured;
            })
            
            .filter( ( project, i )=>{

                return  i < this.props.nonFeaturedMax;

            }).map( ( project, i )=>{

                return (
                    <Transition key={i+1}>
                        <ProjectThumb
                            featured={false}                            
                            project={project}
                        />
                    </Transition>
                )

            })


        }else{
            return [];
        }

    }

    render(){

        
        return (
            
            <div >

                <div>
                { this.getFeatured() }
                </div>
                <div>
                { this.getNonFeatured() }
                </div>                            

            </div>

        )        

    }


}