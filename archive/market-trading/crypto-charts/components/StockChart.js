import React, {
  useMemo,
  useState,
  useEffect,
  createRef
} from 'react';

import styled from 'styled-components'
import * as d3 from 'd3';

const SvgTarget = styled.svg`
  background-color: #1a237e;

`;

const initialise = (data,svg)=>{

  const width = data.length * 5;//1000;
  const height = 400;

  d3.select( svg )
    .attr("width", width)
    .attr("height", height);

  const timeExtent = d3.extent( data, d=>{
    return d.time * 1000;
  });  
  const highExtent = d3.extent( data, d=>{
    return d.high;
  })  
  const lowExtent = d3.extent( data, d=>{
    return d.low;
  })  
  const hlExtent = [ lowExtent[0], highExtent[1] ];

  const valueExtent = hlExtent;

  console.log( 'Extents : ', timeExtent, valueExtent );

  const xS = d3.scaleTime()
    .domain(timeExtent)
    .range([0, width])
    .interpolate(d3.interpolateRound);

  const x = v=>{
    let r = xS(v);
    return Math.round( r / 5 )*5;
  }

  const w = x(data[1].time*1000)-x(data[0].time*1000);

  // console.log( 'W',w )

  const y = d3.scaleLinear()
    .domain(valueExtent).nice()
    .range([height,0])
    .interpolate(d3.interpolateRound);
    // .padding(0.1);  
  
  return {
    x,y,
    width,height,
    w
  }

}

const renderGrid = svg=>{

}

const renderCandlesticks = (data,svg,config)=>{

  const {x,y,w} = config;

  const ocFill = d=>{
    return d.open > d.close ? 
      'red' : 
      'yellow';
  }
  
  const wickW = 1;

  console.log( 'WIDTH : ', w );

  const ocHeight = d=>{
    return d.open > d.close ? 
      y(d.close)-y(d.open) : 
      y(d.open)-y(d.close);
  }
  
  const lhHeight = d=>{
    return y(d.low)-y(d.high);
  }

  const ocY = d=>{
    return d.open > d.close ? 
      y(d.open) : y(d.close);
  }

  const ocX = d=>{
    const resX = x(d.time*1000);

    let stat = 'fail'
    if( resX % 5 === 0 ){
      stat = 'success';
    }
    // console.log( resX + ' -- ', stat );
    return resX;
  }

  const lhX = d=>{
    return x(d.time*1000) + ( ( w-wickW ) / 2 );
  }

  const margin = 0;

  

  const svgSelect = d3.select( svg );

  // Render LH ( wicks )

  svgSelect.append("g")
    .attr("transform",`translate(${margin},${margin})`)
    .attr("fill", "white")
  .selectAll("rect")
  .data(data)
  .join("rect")
    .attr("x",lhX)
    .attr("y",d=>y(d.high))
    .attr("width",wickW )
    // .attr("height",d=>10)
    .attr("height",lhHeight)

  // Render OC ( bars )

  svgSelect.append("g")
      .attr("transform",`translate(${margin},${margin})`)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x",ocX)
      .attr("y",ocY)
      .attr("fill",ocFill )
      .attr("width",w)
      .attr("height",ocHeight);

}

const renderAxes = svg=>{

}

const StockChart = props=>{

  const { data } = props;
  const domRef = createRef();
  const svgRef = createRef();

  useEffect( ()=>{  

    console.log( 'Render D3' );
    const res = initialise( data,svgRef.current );

    // renderGrid( target, )
    renderCandlesticks( data,svgRef.current,res );
    // renderAxes()
    
  }, [ data ] );

  return (
    <div ref={domRef} style={{overflow:'scroll'}}>
      <SvgTarget ref={svgRef}>

      </SvgTarget>
    </div>
  )

}

export default StockChart;