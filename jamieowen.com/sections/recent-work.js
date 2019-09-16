import projects from '../data/projects.generated';

import ProjectThumb from '../components/ProjectThumb';
import ProjectsList from '../components/ProjectsList';
import Transition from '../components/Transition';

export default (props)=>{

    return (
        
        <section>

            <style jsx>
            {
                `
                section{
                    // background-color: #121212;
                    // width: 100%;                    
                }
                `
            }

            </style>

            <Transition>
                <div className="break">
                    <h2>Featured Work</h2>
                    <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p>
                </div>
            </Transition>

            <Transition>
                <ProjectsList 
                    featured={true} 
                    featuredMax={6}
                    nonFeatured={true}
                    nonFeaturedMax={10}
                    />
            </Transition>

        </section>

    )
}