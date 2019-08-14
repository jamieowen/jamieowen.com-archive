import React from 'react';

import { 
  ChartProvider
} from './ChartContext';

const StockChart = props=>{

  return (
    <ChartProvider>
      <div>Test</div>
    </ChartProvider>
  )

}

export default StockChart;