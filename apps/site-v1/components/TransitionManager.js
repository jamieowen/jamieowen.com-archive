
import { Component } from 'react';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { TweenLite, CSSPlugin, EasePack } from 'gsap';


class TransitionSingleton{

    static instance = null;

    static defaultConfig = {

        visibilityMargin: {
            min: 20,
            max: 200,
            percentage: 0.2
        }

    }

    static getInstance(){

        if( !TransitionSingleton.instance ){
            TransitionSingleton.instance = new TransitionSingleton();
        }

        return TransitionSingleton.instance;

    }

    constructor(){

        this.id = Math.random();

        this.transitionsIndex = [];
        this.transitionsData = [];

        // pre-transition, intro-in, transition-in, transition-out, scroll, static, ?
        this.pageState = {};
        this.scrollDirection = 0;

        this.visibilityMargin = 0; // calculated on resize.

        this.mounted = false;
        this.needsUpdate = false;
        this.needsTransition = false;

        this.paused = true;
        
    }

    resume(){

        if( !this.paused ){
            return;
        }

        this.paused = false;

        console.log( 'Transition Resume' );

        window.addEventListener( 'scroll', this.onScroll );
        window.addEventListener( 'resize', this.onResize );
        
        this.onResize();

        this.frameUpdate();

    }    

    pause(){

        if( this.paused ){
            return;
        }

        this.paused = true;
        console.log( 'Transition Pause' );

        window.removeEventListener( 'scroll', this.onScroll );
        window.removeEventListener( 'resize', this.onResize );

    }

    setConfig( config ){

        this.config = config;

    }

    frameUpdate = ()=>{

        if( this.needsUpdate ){

            if( this.needsTransition ){

                const visible = this.getVisibleElements( ( data )=>{

                    data.transitionVisibility = 0;

                });

                for( let i = 0; i<visible.length; i++ ){

                    let data = visible[ i ];

                    if( false ){//data.transition.props.in ){

                        const domElement = data.domElement;

                        TweenLite.to( data, 3, {
    
                            // ease: ,
                            transitionVisibility: 1,
                            delay: i * 0.1,
                            onUpdate: ()=>{ 
                                
                                this.updateTransition( data,data );
    
                            },
                            onComplete: ()=>{
    
                            }
    
                        })

                    }else{  

                        data.transitionVisibility = 1;
                        this.updateTransition( data,data );

                    }



                }
                
            }            

            this.needsUpdate = false;
            this.needsTransition = false;

        }

        if( !this.paused ){
            requestAnimationFrame( this.frameUpdate );
        }        

    }

    onScroll = ( ev )=>{

        this.updateViewportVisibility();

    }

    onResize = ( ev )=>{

        let conf = this.config.visibilityMargin;
        let margin = conf.percentage * window.innerHeight;
        margin = Math.max( conf.min, Math.min( conf.max,margin ) );

        this.visibilityMargin = margin;

        this.updateTransitionBounds();
        this.updateViewportVisibility();

    }

    updateTransitionBounds(){

        for( let i = 0; i<this.transitionsData.length; i++ ){
            this.updateBounds( this.transitionsData[i] );
        }

    }

    getTransitionData( transition ){

        const idx = this.transitionsIndex.indexOf( transition );
        if( idx >= 0 ){
            return this.transitionsData[ idx ];
        }

    }

    requestBoundsUpdate(){

        this.updateTransitionBounds();

    }

    updateBounds( transitionData ){

        const rect = transitionData.domElement.getBoundingClientRect();
        const pageY = window.pageYOffset;

        transitionData.bounds = {
            top: rect.top + pageY,
            bottom: rect.bottom + pageY,
            height: rect.height
        }

    }

    registerTransition = ( transition )=>{

        const idx = this.transitionsIndex.indexOf( transition );

        // console.log( 'Register Transition' );

        if( idx < 0 ){

            this.transitionsIndex.push( transition );
            const domElement = ReactDOM.findDOMNode( transition );
            const data = {

                // The React transition component
                transition: transition,

                // The associated dom element.
                domElement: domElement,  
                
                // if visible or not.
                visible: undefined,

                // how 'in view' the element is. factoring in edge visibility. ( 0,1 )
                viewportVisibility: 0, 

                // the top or bottom edge the element is entering from ( -1,0,1 )
                viewportEdge: 0, 
                
                // how visible the element is due to current transition position ( 0-1 )
                transitionVisibility: 0,

                // the current state of the transition - to refine.
                // transition-start
                // transition-progress
                // transition-complete 
                // transitioned-out
                transitionState: 'transitioned-out', 

                // identifies if the element is being transitioned.
                transitioning: undefined,

                // page calcuated bounds via getBoundingClientRect + current page Y
                bounds: null

            }

            if( domElement instanceof HTMLImageElement ){

                // Trigger a bounds update when an image is loaded.
                if( !domElement.complete ){
                    const onComplete = ()=>{

                        this.onResize();
                        domElement.removeEventListener( 'load', onComplete );

                    }
                    domElement.addEventListener( 'load', onComplete );

                }

            }

            this.needsUpdate = true;
            this.needsTransition = true;

            this.updateBounds( data );            
            this.transitionsData.push( data );

            this.updateTransition( {
                visible: false
            }, data );

        }

    }

    

    unregisterTransition = ( transition )=>{

        const idx = this.transitionsIndex.indexOf( transition );

        // console.log( 'Unregister Transition' );

        if( idx >= 0 ){

            const data = this.transitionsData[ idx ];
            
            TweenLite.killTweensOf( data );

            this.transitionsIndex.splice( idx,1 );
            this.transitionsData.splice( idx,1 );

        }

    }

    updateTransition( newData, data ){

        const visChanged = newData.visible !== data.visible;
        const transChanged = newData.transitioning !== data.transitioning;
        const domElement = data.domElement;

        data = Object.assign( data, newData );

        if( visChanged ){
            domElement.style.visibility = data.visible ? 'visible' : 'hidden';    
        }

        // console.log( 'update transition', visChanged, data.viewportVisibility, newData );

        if( data.visible ){

            domElement.style.opacity = data.viewportVisibility * data.transitionVisibility;

        }

        // data.domElement.style.transform = `translateY(${( viewportEdge * ( 1 - viewportVisibility ) ) * 20}px)`;

    }

    sortVisible( visible, mode ){
        

    }

    getVisibleElements( func=()=>{} ){

        const visible = [];
        let data;

        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight
        }

        for( let i = 0; i<this.transitionsData.length; i++ ){

            data = this.transitionsData[ i ];

            if( 
                ( data.bounds.top >= viewport.top && data.bounds.top <= viewport.bottom ) ||
                ( data.bounds.bottom >= viewport.top && data.bounds.bottom <= viewport.bottom ) ||
                ( data.bounds.top >= viewport.top && data.bounds.bottom <= viewport.bottom ) ||
                ( data.bounds.top <= viewport.top && data.bounds.bottom >= viewport.bottom )
            ){

                visible.push( data );
                func( data );

            }
             
        }

        return visible;

    }




    updateViewportVisibility(){

        let visibility,data;
        // return;
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight
        }

        const margins = {
            top: viewport.top + this.visibilityMargin,
            bottom: viewport.bottom - this.visibilityMargin,
            height: this.visibilityMargin
        }

        let viewportVisibility,viewportEdge,transitionVisibility;
        let visible;

        let stats = {
            hidden: 0            
        }

        for( let i = 0; i<this.transitionsData.length; i++ ){

            data = this.transitionsData[ i ];

            data.domElement.style.backgroundColor = '';

            viewportVisibility = 0;
            viewportEdge = 0;
            transitionVisibility = data.transitionVisibility;

            if( data.bounds.bottom <= viewport.top || data.bounds.top >= viewport.bottom ){

                // hidden
                viewportVisibility = 0;                               
                visible = false;
                stats.hidden += 1;
                transitionVisibility = 1; // auto set transition to 1 for hidden elements. ( decide later )

            }else
            if( data.bounds.top < margins.bottom && data.bounds.bottom > margins.top ){

                // fully visible.                
                viewportVisibility = 1;

                visible = true;
                viewportEdge = 0;

            }else
            if( data.bounds.bottom <= margins.top && data.bounds.bottom >= viewport.top ){

                // intersection on top margin

                visible = true;
                viewportVisibility = Math.min( 1, 1 - ( margins.top - data.bounds.bottom ) / this.visibilityMargin );
                viewportEdge = -1;


            }else
            if( data.bounds.top >= margins.bottom && data.bounds.top <= viewport.bottom ){

                // intersection on bottom margin

                visible = true;
                viewportVisibility = Math.max( 0, 1 - ( data.bounds.top - margins.bottom ) / this.visibilityMargin );
                viewportEdge = 1;

            }else{
                
                // leave in for any errors for now..
                visible = true;
                data.domElement.style.backgroundColor = 'red';

            }

            this.updateTransition( {
                visible, viewportVisibility, viewportEdge, transitionVisibility
            }, data );
            
            
        }

    }    





}

const requestBoundsUpdate = ()=>{

    const instance = TransitionSingleton.getInstance();
    instance.requestBoundsUpdate();

}

export { requestBoundsUpdate };

export default class TransitionManager extends Component{

    static STATES = {

    }

    static childContextTypes = {
        
        registerTransition: PropTypes.func,
        unregisterTransition: PropTypes.func

    }

    static defaultProps = {

        config: TransitionSingleton.defaultConfig

    }

    getChildContext(){

        return {
            registerTransition: this.registerTransition,
            unregisterTransition: this.unregisterTransition
        }

    }    

    constructor( props ){
        
        super( props );

        const instance = TransitionSingleton.getInstance();
        instance.setConfig( props.config );

    }

    componentDidMount(){

        const instance = TransitionSingleton.getInstance();
        instance.resume();

    }

    componentWillUnmount(){
        
        const instance = TransitionSingleton.getInstance();
        instance.pause();

    }

    registerTransition( transition ){

        const instance = TransitionSingleton.getInstance();
        instance.registerTransition( transition );

    }

    unregisterTransition( transition ){

        const instance = TransitionSingleton.getInstance();
        instance.unregisterTransition( transition );

    }


    render(){

        return this.props.children;

    }




}