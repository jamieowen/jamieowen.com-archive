import * as d3 from 'd3';

import ETH_BTC from './fetch-data/historical/ETH_BTC';

let ohcvData = ETH_BTC.slice(1,1000);

const ohcvCopy = ohcvData.map( (d,i)=>{
  const h = 0.3;
  const l = 0.1;
  return Object.assign( {},d,{
    high: l+h + ( i*h ),
    low: l + ( i*h ),
    open: l + 0.05,
    close: (l+h)-0.07
  })
});

// ohcvData = ohcvCopy;

const margin = 0;

const width = ohcvData.length * 5; //window.innerWidth - (margin*2);
const height = ( window.innerHeight / 2 ) - (margin*2);

console.log( 'Dims : ', ohcvData.length, width,height );
console.log( 'TF LENGTH:', ohcvData.length );
console.log( ohcvData );


const timeExtent = d3.extent( ohcvData, d=>{
  return d.time * 1000;
});

const highExtent = d3.extent( ohcvData, d=>{
  return d.high;
})

const lowExtent = d3.extent( ohcvData, d=>{
  return d.low;
})

const hlExtent = [ lowExtent[0], highExtent[1] ]; 

console.log( 'Extents : ', highExtent, lowExtent );

const valueExtent = hlExtent;//lowExtent;

// console.log( 'Start/End : ',  timeExtent );

const xScale = d3.scaleTime()
  .domain(timeExtent)
  .range([0, width])
  .interpolate(d3.interpolateRound);

const w = xScale(ohcvData[1].time*1000)-xScale(ohcvData[0].time*1000);

console.log( 'W',w )

const yScale = d3.scaleLinear()
  .domain(valueExtent).nice()
  .range([height,0])
  .interpolate(d3.interpolateRound);
  // .padding(0.1);

const range = timeExtent.map( d=>{
  return new Date( 1000*d );
})
console.log( 'Range :', range );
// console.log( 'Scale:', width, xScale(timeExtent[0]), xScale(timeExtent[1]) );

const xAxis = d3.axisTop(xScale).tickFormat( d3.timeFormat("%b-%d-%y") );//ticks(d3.timeDay.every(10));
const yAxis = d3.axisRight(yScale);

// console.log( xAxis() );

const body = d3.select("body");
body.style( 'padding', '0px' )
  .style( 'margin', '0px' )
  .style( 'color', 'white' );
const svg = body.append("svg")
  .attr("width", width)
  .attr("height", height)

svg.style('background-color', '#999999' );

const info = body.append( 'div' );
info.append( 'h4' ).text( `high extents :${highExtent}` );
info.append( 'h4' ).text( `low extents :${lowExtent}` );

svg.append("g")
  .attr("transform",`translate(${margin},${height+margin})`)
  .call(xAxis);

svg.append("g")
  .attr("transform",`translate(${margin},${margin})`)
  .call(yAxis)


svg.append("g")
    .attr("transform",`translate(${margin},${margin})`)
    .attr("fill", "rgba(255,255,255,0.15)")
  .selectAll("rect")
  .data(ohcvData)
  .join("rect")
    .attr("x",d=>Math.round(xScale(d.time*1000)))
    .attr("y",d=>yScale(d.high))
    .attr("width",w)
    // .attr("height",d=>10)
    .attr("height",d=>yScale(d.low)-yScale(d.high))



const ocFill = d=>{
  return d.open > d.close ? 
    'red' : 
    'yellow';
}

const ocHeight = d=>{
  return d.open > d.close ? 
    yScale(d.close)-yScale(d.open) : 
    yScale(d.open)-yScale(d.close);
}

const ocY = d=>{
  return d.open > d.close ? 
    yScale(d.open) : yScale(d.close);
}


svg.append("g")
    .attr("transform",`translate(${margin},${margin})`)
  .selectAll("rect")
  .data(ohcvData)
  .join("rect")
    .attr("x",d=>Math.round(xScale(d.time*1000)))
    .attr("y",ocY)
    .attr("fill",ocFill )
    .attr("width",w)
    .attr("height",ocHeight)

  

