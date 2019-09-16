import clients from '../data/clients';

import List from '../components/List';
import ListItem from '../components/ListItem';
import Transition from '../components/Transition';

export default (props)=>{

    return (
        <section>   

            <Transition>    
                <div>
                    <h2 className="fnt-smallest color-secondary">Clients</h2>
                    {/* <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p>                     */}
                </div>
            </Transition>
        


            <List>
            { 
                clients.map( ( client, i )=>{

                    return (
                        <ListItem key={i+1}>{ client.title }</ListItem>
                    )

                })
            }
            </List>
                         
        </section>
    )
}