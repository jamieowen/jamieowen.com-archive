import Router from 'next/router';
import EventEmitter from 'eventemitter3';

const routerEvents = new EventEmitter();

Router.onRouteChangeStart = ( url )=>{
    // console.log( 'Route Change Start', arguments );

    routerEvents.emit( 'route-change-start', url );

}

Router.onRouteChangeComplete = ( url )=>{
    // console.log( 'Route Change Complete' );

    routerEvents.emit( 'route-change-complete', url );

}

export default routerEvents;