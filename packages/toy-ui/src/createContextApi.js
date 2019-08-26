import React, {
  createContext,
  useContext,
  useReducer,
  useMemo
} from 'react';

const createContextApi = ( 
  name,
  initialState, 
  api,reducer 
)=>{

  const Context = createContext();

  const Provider = ({children,...props})=>{
    
    const reduce = (state,action)=>{
      const type = action.type;
      const method = api[type];
      const newState = method.apply( method, args );
      
      console.log( 'Reduce' );

    }
    const [state,dispatch] = useReducer(reduce,initialState);
    
    const wrappedApi = useMemo( ()=>{      
      
      const newApi = {};
      Object.keys(api).forEach((key)=>{
        const method = ()=>{
          dispatch( {
            type: key,
            args: arguments.slice(0)
          })
        }
        newApi[key] = method;        
      })
      // console.log( 'Create API', newApi );
      return newApi;
    },[dispatch])
    // const wrappedApi = {};

    const value = {
      ...state,
      ...wrappedApi
    }
    // console.log( 'toy value', value );  

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    )
  }

  const use = ()=>{
    // console.log( 'use' ); 
    return useContext(Context);
  }
  

  return {
    Context,
    Provider,
    [ `use${name}` ]: use
  }
}

export {
  createContextApi
}