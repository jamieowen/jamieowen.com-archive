import React, {
  createContext,
  Fragment,
  useState
} from 'react';
import Sketch from './sketch';

import chartData from './fetch-data/historical/ETH_BTC.json';
import StockChart from './components/StockChart';
import DataFittingInfo from './components/DataFittingInfo';
import { StockChart as StockChart2 } from './components/stock-chart';

console.log( 'STOCK 2 ', StockChart2 );
Sketch( ()=>{

  const [timeframeOffset,setTimeframeOffset] = useState(0);
  const [timeframeRange,setTimeframeRange] = useState(100);

  const onNext = ()=>{
    setTimeframeOffset( timeframeOffset+1 );
  }

  const onPrevious = ()=>{
    setTimeframeOffset( timeframeOffset-1 );
  }

  const data = chartData.slice( 1,500 );

  console.log( data );

  return (
    <Fragment>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
      <span>Timeframe Index: {timeframeOffset}, </span>
      <span>Timeframe Range: {timeframeRange}</span>

      <StockChart data={data}/>        
      <DataFittingInfo/>
      <StockChart2/>
    </Fragment>
    
  )

})
