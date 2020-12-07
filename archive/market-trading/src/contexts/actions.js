
const LOAD_MARKETS_START = 'load-markets-start';
const LOAD_MARKETS_COMPLETE = 'load-markets-complete';
const LOAD_MARKETS_ERROR = 'load-markets-error';



const initialExchangeState = {
  exchange: {}, // data / vo for provider supplied target exchange
  markets: [],
  loadState: null
}

const initialMarketState = {
  market: {}, // data / vo for provider supplied target market.
  priceDataByTimeFrame: {},  
  indicatorDataByTimeframe
}

const exchangeReducer = (state,action)=>{

  let newState = null;

  switch( action.type ){
    case '':
      break;
  }

}

