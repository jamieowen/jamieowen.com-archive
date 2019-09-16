import projects from '../data/projects';

import ProjectsGrid from '../components/ProjectsGrid';
import Transition from '../components/Transition';

export default (props)=>{

    const featured = projects.getFeaturedProjects();
    const nonFeatured = projects.getNonFeaturedProjects();

    return (
        
        <section>

            <Transition>
                <div >
                    <h2 className="fnt-smallest color-secondary">Featured Work</h2>
                    {/* <p className="fnt-smaller">
                        Some most recent work from <br/>within the past couple of years. 
                    </p> */}
                </div>
            </Transition>

            <ProjectsGrid 
                gridType="grid-1" 
                featured={featured.splice(0,4)}
                nonFeatured={[]}
                />
            <ProjectsGrid 
                gridType="grid-2" 
                featured={featured.splice(0,2)}
                nonFeatured={nonFeatured.splice(0,4)}
                />
            <ProjectsGrid 
                gridType="grid-3" 
                featured={featured.splice(0,3)}
                nonFeatured={nonFeatured.splice(0,2)}
                />

        </section>

    )
}