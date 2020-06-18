import ReactGA from 'react-ga';
ReactGA.initialize('UA-101925879-1');

import RouterEvents from './RouterEvents';

RouterEvents.on( 'route-change-complete', ( url )=>{

    ReactGA.pageview( url );

})


export default ()=>{

    return (
        <div id="tracking"/>
    )
}