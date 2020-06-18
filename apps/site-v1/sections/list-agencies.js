import agencies from '../data/agencies';

import List from '../components/List';
import ListItem from '../components/ListItem';
import Transition from '../components/Transition';

export default (props)=>{

    return (
        <section>            

            <Transition>
                <div>
                    <h2 className="fnt-smallest color-secondary">Agencies</h2>
                    {/* <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p> */}
                </div>
            </Transition>

            <List>
            { 
                agencies.map( ( agency, i )=>{

                    return (
                        <ListItem target="_blank" href={agency.url} key={i+1}>{ agency.name }</ListItem>
                    )

                })
            }
            </List>
                        
        </section>
    )
}