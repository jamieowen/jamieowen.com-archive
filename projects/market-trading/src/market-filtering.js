import React, {
  useEffect,
  useRef
} from 'react';
import Sketch from '@jamieowen/sketch';

import {
  ROC,
  SMA
} from 'technicalindicators';

import * as LightweightCharts from 'lightweight-charts';

import {
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

console.log( 'LWC', LightweightCharts);

const Chart = ({
  data,
  lineFields
})=>{

  const containerRef = useRef();
  const chart = useEffect( ()=>{

    const domElement = containerRef.current;
    var chart = LightweightCharts.createChart(domElement, {
      width: 600,
      height: 300,
      layout: {
        backgroundColor: '#000000',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });
    console.log( "Create Chart :", chart );
    
    var candleSeries = chart.addCandlestickSeries({
      upColor: 'rgba(255, 144, 0, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)',
    });

    candleSeries.setData(data);

    if( lineFields ){
      lineFields.forEach( (field,i)=>{

        const colors = [
          '76,175,80',
          '122,30,255',
          '76,175,80'
        ]
        const c = colors[i];
        
        let areaSeries = chart.addAreaSeries({
          overlay: true,
          scaleMargins: {
            top: 0.8,
            bottom: 0
          },
          topColor: `rgba(${c},0.56)`,
          bottomColor: `rgba(${c}, 0.04)`,
          lineColor: `rgba(${c}, 1)`,
          lineWidth: 1,
        });

        const fieldData = data.map( (d)=>{
          return { time: d.time, value: d[field] };
        })

        areaSeries.setData( fieldData );

      })
    }

    return ()=>{
      // Delete this chart here..
    }

  },[data])

  return (
    <div ref={containerRef}>

    </div>
  )
}

const BAT_BTC = require( '../crypto-charts/fetch-data/historical/BAT_BTC.json' );

const DataKeys = [
  'time',
  'open',
  'close',
  'high',
  'low',
  'volumefrom',
  'volumeto',
  'roc_10',
  'sma_roc'
]

const DataTransform = {
  'time': (d)=>{
    return new Date(d*1000).toLocaleDateString();
  }
}

const testRechartsData = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

const computeIndicator = ( 
  Indicator, 
  period, 
  target,
  targetIn,
  targetOut
)=>{

  const ta = new Indicator({
    period : period, 
    values : []
  });

  target.forEach( (d,i) => {
    const value = d[targetIn];
    const result = ta.nextValue(value);
    d[targetOut] = result || 0;
  });

}

computeIndicator( ROC,10,BAT_BTC,'close','roc_10' );
computeIndicator( SMA,20,BAT_BTC,'roc_10','sma_roc' );

const OCHLTable = ({
  data
})=>{

  const rows = data.map( (d)=>{
    const cols = DataKeys.map( (key,i)=>{
      return (
        <td key={i}>{ DataTransform[key] ? DataTransform[key](d[key]) : d[key] }</td>
      ) 
    })
    return (
      <tr>{cols}</tr>
    )
  })

  const headings = DataKeys.map( (key,i)=>{
    return (
      <td key={i}>{key}</td>
    )
  });

  return (
    <table>
      <tr>{headings}</tr>
      { rows }
    </table>
  )

}

Sketch( ()=>{
  return (
    <div>
      <style>
        {
          `td{
            padding: 4px;
          }`
        }

      </style>

      <AreaChart width={730} height={250} data={testRechartsData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        {/* <Tooltip /> */}
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>

      <Chart data={BAT_BTC} lineFields={['roc_10', 'sma_roc' ]}/>
      <OCHLTable data={BAT_BTC}/>
    </div>
  )
})