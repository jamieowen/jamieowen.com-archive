import React, {
  Fragment,
  useRef,
  useState
} from 'react';

import styled from 'styled-components' ;

import {
  useSpring,
  useSprings,
  useTransition,
  useChain,
  animated,
  config
} from 'react-spring';


const ExampleContainer = styled.div`
  position: relative;
  background-color: pink;
  width: 100%;
  display: flex;
`;

const Text = styled.div`
  width: 80%;
  font-family: sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
  margin: 32px 0px;  
`

const Block = styled( animated.div )`
  background-color: hotpink;
  // position: absolute;
  width: 60px
  height: 60px;
  border-radius: 28px;
`

import Sketch from '../crypto-charts/sketch';

const items = [ 1,2,3,4,5 ];

Sketch( ()=>{
  
  const [toggled,setToggle] = useState(true);

  /**
   * Basic Props Test.
   * Props only return value with object only arguments.
   */
  const basicProps = useSpring({
    opacity: toggled ? 1 : 0,
    transform: toggled ? 'translate(0px,0px)' : 'translate(0px,30px)',
    backgroundColor: toggled ? 'hotpink' : 'yellow',
    config: config.wobbly,
    onRest: ()=>{
      console.log( 'onRest event' );
    }
  });

  /**
   * Function Args Test
   * Passing a function as init arguments.
   */
  const getFuncProps = ()=>{
    return {
      opacity: toggled ? 1 : 0,
      transform: toggled ? 'translate(0px,0px)' : 'translate(0px,30px)',
      backgroundColor: toggled ? 'hotpink' : 'yellow',
      config: toggled ? config.stiff : config.wobbly      
    }
  }

  const [funcProps,setFuncProps,stopFuncProps] = useSpring( getFuncProps );

  setFuncProps( getFuncProps() );

  /**
   * useSprings Array of objects as arguments
   */
  const colors = [ 'red', 'crimson', 'blue', 'gold', 'yellow' ]
  const springsBasic = useSprings( items.length, items.map( (item,i)=>{
    return {
      opacity: toggled ? 1 : 1,
      transform: toggled ? `translate(0px,0px)` : `translate(${10 + ( i*100 )}px,0px)`,
      backgroundColor: toggled ? 'hotpink' : colors[ i % colors.length ],
      config: toggled ? config.stiff : config.wobbly,
      delay: ( items.length - i ) * 50
    }
  }));


  const getSpringsFuncProps = i=>{
    return {
      opacity: toggled ? 0.2 : 1,
      transform: toggled ? `translate(0px,0px)` : `translate(${10 + ( i*100 )}px,0px)`,
      backgroundColor: toggled ? 'hotpink' : colors[ i % colors.length ],
      config: toggled ? config.stiff : config.wobbly,
      // delay: 1
      // delay: ( ( items.length - i ) * 50 ) + 1
    }
  }

  const [ springsFuncProps, setSpringsFuncProps, stopSpringsFuncsProp ] = useSprings( items.length, getSpringsFuncProps );
  setSpringsFuncProps( getSpringsFuncProps );

  /**
   * Use this to toggle all animations
   */
  const toggle = ()=>{
    console.log( '**Toggle**' );
    setToggle( !toggled );
  }

  console.log( 'Render', toggled );

  return (
    <Fragment>
      <div>
        Controls
        <button onClick={ toggle }>Toggle</button>
      </div>
      <Text>
        <h1>useSpring()</h1>
        Basic single useSpring() passing an object as parameters. This RETURNS JUST A PROPS
        object, which is an object primitive with AnimatedValue objects a property attributes.
        <br/><br/>
        If the useState property that influences the transition is the main state and is used
        infrequently then it seems ok to use this method.  If the updating of the spring is frequent like
        via an input event then better to use the function method below. This is because we 
        don't want to over-use react renders during animation.
      </Text>
      <ExampleContainer>
        <Block style={basicProps}>        
        </Block>
      </ExampleContainer>
      <Text>
        Function passed to useSpring(). This RETURNS PROPS AND SET/STOP FUNCTIONS.
        Initial properties returned from init function are set immediately on applied props.
        The init function is called once, and its use seems just seems to be to change the return type of the useSpring() hook.
        <br/><br/>
        If using this method in conjunction with a useState value its probably best to create a getProps()
        function and pass this in to the useSpring().  It might be tempting to call setProps() on the event that causes
        a change but only do so if we do not rely on state, ( like via an event ) otherwise the props would evaluate on the next state.
        If this is happending its probably better to use the object method.
      </Text>
      <ExampleContainer>
        <Block style={funcProps}>        
        </Block>
      </ExampleContainer> 
      <Text>
        <h1>useSprings()</h1>
        Object passed to useSprings(). Same as basic but iterates over an array of items each
        render.  Spring props can be adjusted independently with array iterator index, along with common settings,
        delay, etc.
      </Text>
      <ExampleContainer>
        { springsBasic.map( (springProp,i)=><Block key={i} style={springProp}/> ) }
      </ExampleContainer>   
      <Text>
        Function passed to useSprings().
      </Text>
      <ExampleContainer>
        { springsFuncProps.map( (springProp,i)=><Block key={i + 'oo'} style={springProp}/> ) }
      </ExampleContainer>                   

    </Fragment>
  )
})