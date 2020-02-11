
import React, {
  useState, 
  useEffect,
  useMemo,
  // Component,
  useRef,
  createContext,
  useContext
} from 'react';

import ReactDOM from 'react-dom';

// class AppClass extends Component{

//   constructor(){
//     this.state = {
//       myValue: 10
//     }


//   }
//   componentDidMount(){
//     console.log( '---k' );
//   }

//   onClick = ()=>{
//     this.setState({
//       myValue:10
//     })
//   }

//   render(){


//     return (
//       <div>
//         <h2>Hello</h2>
//       </div>
//     )
//   }

// }


const MyContext = createContext();


const MyComponent = ()=>{

  const [myValue,setValue] = useState(10);
  const myContainerRef = useRef();
  const myContext = useContext(MyContext);

  // console.log( myContext );

  const myCachedValue = useMemo( ()=>{
    // console.log( 'Use Memo')
    return 20;
  },[]) 

  useEffect( ()=>{
    // console.log( 'Use Effect' );
    // console.log( myContainerRef )
  })
  
  const onClick = ()=>{
    setValue(myValue+1);
  }

  // console.log( 'Rendering', myContainerRef )

  return (
    <div ref={myContainerRef}>
      <h1>Hello {myValue} </h1>
      <h1>Cached {myCachedValue}</h1>
      <h2>Global Counter:{myContext.counter}</h2>
      <button onClick={onClick}>Button</button>
    </div>
  )

}


/**
 * Read this : https://www.framer.com/api/data/
 */
/// const framerData = new Data({});

const App = ()=>{

  const [myAppData,setMyAppData] = useState({
    someGlobal:'hello',
    counter:0
  })

  const onClick = ()=>{
    const obj = Object.assign({},myAppData,{ counter: myAppData.counter+1} )
    setMyAppData(obj);
  }

  return (
    <div>
      <MyContext.Provider value={myAppData}>
        <MyComponent/>
        <MyComponent/>
        <MyComponent/>      
      </MyContext.Provider>
      <button onClick={onClick}>Update Global</button>
    </div>
  )
}



const domElement = document.createElement( 'div' )
document.body.appendChild(domElement);

ReactDOM.render( 
  <App/>,
  domElement
)