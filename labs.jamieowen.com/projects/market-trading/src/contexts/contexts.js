import {
  createContext
} from 'react';

const ExchangeContext = createContext(null);
const MarketContext = createContext(null);
const PriceDataContext = createContext(null);
const IndicatorDataContext = createContext(null);


const ExchangeProvider = ({
  exchange = {
    id: ''
  },
  ...props
})=>{

  return (
    <ExchangeContext.Provider>

    </ExchangeContext.Provider>
  )
}

const MarketProvider = ({
  market = {
    symbol: null,
    name: null
  },
  ...props
})=>{

  const provider = useMarketProvider( market );

  return (
    <MarketContext.Provider value={provider}>

    </MarketContext.Provider>
  )
}

export {
  ExchangeProvider,
  MarketProvider
}