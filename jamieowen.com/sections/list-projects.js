import projects from '../data/projects.generated';

import List from '../components/List';
import ListItem from '../components/ListItem';
import Transition from '../components/Transition';

export default (props)=>{

    return (
        <section>   


            <Transition>    
                <div>
                    <h2 className="fnt-smallest color-secondary">Featured Work</h2>
                    {/* <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p>                     */}
                </div>
            </Transition>
        
            <List>
            { 
                projects.map( ( project, i )=>{

                    return (
                        <ListItem key={i+1} href={{ pathname: '/work', query: { id: project.id } }} as={`/work/${project.id}`}>
                            <span className="fnt-regular">{ project.client } </span>
                            <span className="fnt-light">{ project.title }</span>
                        </ListItem>
                    )

                })
            }
            </List>
                         
        </section>
    )
}