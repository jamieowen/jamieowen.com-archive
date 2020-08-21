import React from 'react';


import {
  ExchangeProvider,
  MarketProvider
} from '../contexts/contexts';

import {
  useExchange,
  useMarket
} from '../contexts/hooks';

const AppWrapper = props=>{
  return (
    <ExchangeProvider {...props}>
      <ExchangeList/>
    </ExchangeProvider>
  )
}

const ExchangeList = ()=>{

  const exchange = useExchange();  

  const marketRenderers = exchange.markets.map( (market)=>{
    return (
      <MarketProvider market={market}>
        <MarketRenderer/>
      </MarketProvider>
    )
  })

  return (
    <div>
      { marketRenderers }
    </div>
  )

}

const MarketRenderer = ()=>{

  const { market, ...api } = useMarket();

  return (
    <div>
      <div>{market.name}</div>
      <div>{market.symbol}</div>
      <div>
        Price Chart Component
      </div>
    </div>
  )
  

}