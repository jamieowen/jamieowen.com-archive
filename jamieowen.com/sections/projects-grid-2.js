import projects from '../data/projects.generated';

import ProjectsGrid from '../components/ProjectsGrid';
import Transition from '../components/Transition';

export default (props)=>{

    return (
        
        <section>

            <Transition>
                <div className="break">
                    <h2>Featured Work</h2>
                    <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p>
                </div>
            </Transition>

            <ProjectsGrid/>


        </section>

    )
}