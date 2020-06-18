import React, {
  createContext,
  useContext,
  useReducer,
  useMemo
} from 'react';

// import { loadExchanges, refreshExchanges } from './api';

const ExchangesStateContext = createContext();
const ExchangesApiContext = createContext();

const LOAD_EXCHANGES_START = 'load-exchanges-start';
const LOAD_EXCHANGES_END = 'load-exchanges-end';
const LOAD_EXCHANGES_ERROR = 'load-exchanges-error';

const initialState = {
  loadState: null,
  exchanges: [],
  lastUpdated: null
}

const reduceState = (state,action)=>{
  switch(action.type){
    case '':
      break;
    default:
      throw new Error('Unhandled action type.');
  }
  return state;
}


const createApi = ( dispatch )=>{
  return {
    loadExchanges:async()=>{
      dispatch({
        type:LOAD_EXCHANGES_START
      })
      const exchanges = await loadExchanges();
      dispatch({
        type:LOAD_EXCHANGES_END,
        exchanges: exchanges
      })
    }
  }
}

const ExchangesProvider = ({
  children
})=>{

  const [state,dispatch] = useReducer(reduceState,initialState);
  const api = useMemo(()=>createApi(dispatch),[dispatch]);

  return (
    <ExchangesStateContext value={state}>
      <ExchangesApiContext value={api}>
        { children }
      </ExchangesApiContext>
    </ExchangesStateContext>
  )

}

const useExchangesState = ()=>{
  return useContext(ExchangesStateContext);
}

const useExchangesApi = ()=>{
  return useContext(ExchangesApiContext);
}

export {
  ExchangesProvider,
  useExchangesState,
  useExchangesApi
}

