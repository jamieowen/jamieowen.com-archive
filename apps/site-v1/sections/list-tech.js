import technology from '../data/technology';

import List from '../components/List';
import ListItem from '../components/ListItem';
import Transition from '../components/Transition';

export default (props)=>{

    return (
        <section>            


            <Transition>    
                <div className="break">
                    <h2 className="fnt-smallest color-secondary">Technology</h2>
                    {/* <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p>     */}
                </div>
            </Transition>
                    
            <List>
            { 
                technology.map( ( tech, i )=>{

                    return (
                        <ListItem key={i+1}>{ tech.title }</ListItem>
                    )

                })
            }
            </List>
        
   
        </section>
    )
}