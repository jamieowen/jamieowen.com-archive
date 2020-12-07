import { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class Transition extends Component{

    static STATES = {

        VIEWPORT_VISIBLE: 'viewport-visible',
        VIEWPORT_HIDDEN: 'viewport-hidden'
        
    }

    static contextTypes = {

        registerTransition: PropTypes.func,
        unregisterTransition: PropTypes.func,
        requestBoundsUpdate: PropTypes.func

    }

    static propTypes = {
    
        // onLayoutChange: PropTypes.func,
        group: PropTypes.string,
        in: PropTypes.bool

    }
    
    static defaultProps = {

        group: null,
        in: true

    }

    constructor( props ){

        super( props );

    }

    componentDidMount(){

        if( !this.context.registerTransition ){
            return;
        }
        
        this.context.registerTransition( this );

    }

    componentWillUnmount(){

        if( !this.context.unregisterTransition ){
            return;
        }
        
        this.context.unregisterTransition( this );

    }

    requestBoundsUpdate(){

        
    }

    componentWillAppear(callback) {
        // console.log('will appear');

        callback();
    }
    componentDidAppear() {
        // console.log('did appear');
    }

    componentWillEnter(callback) {
        console.log('will enter');
        callback();
        
    }
    componentDidEnter() {
        console.log('did enter');
    }
    componentWillLeave(callback) {
        console.log('wiil leave');
        callback();        
    }
    componentDidLeave() {
        console.log('did leave');
    }

    /**
     * Updates this transition with the new data that determines its transition state.
     * So for example, we may adjust its opacity or translation position from this data.
     * 
     * The 'correct' react way would be to update component state, however to avoid
     * any unneccessary react diff overhead, we only update state if we have a need to 
     * do so ( i.e. listeners ). Otherwise we go ahead and update the dom element directly.
     * 
     * @param {*} transtionManager 
     * @param {*} data 
     */
    updateTransition( transtionManager, data, opts ){

        // console.log( 'update transition' );

    }

    render(){

        return this.props.children;

    }

}

const TransitionWrapper = ( props )=>{
    return (
        <ReactTransitionGroup><Transition {...props} enter={true} exit={true} appear={true}>{props.children}</Transition></ReactTransitionGroup>
        // <ReactTransitionGroup component={Transition}>{props.children}</ReactTransitionGroup>
    )
}


export default TransitionWrapper;
// export default Transition;