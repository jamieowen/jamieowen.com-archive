import awards from '../data/awards';

import List from '../components/List';
import ListItem from '../components/ListItem';
import Transition from '../components/Transition';
import AwardIcon from '../components/AwardIcon';

import { metrics } from '../styles/typography';

export default (props)=>{

    return (
        <section>            

            <Transition>
                <div className="break">
                    <h1 className="fnt-smallest color-secondary">Awards</h1>
                    {/* <p>
                        Some most recent work from <br/>within the past couple of years. 
                    </p>                     */}
                </div>
            </Transition>

            <List>
            { 
                awards.map( ( award, i )=>{

                    return (
                        <ListItem key={i+1}>{ award.title }<AwardIcon count={award.count}/></ListItem>
                    )

                })
            }
            </List>                  

                
        </section>
    )
}