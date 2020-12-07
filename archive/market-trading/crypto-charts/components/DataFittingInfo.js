import React from 'react';


export default props=>{

  const widths = [
    1440,
    1440/2,
    1440/3
  ]

  const barWidths = [ 3,5,7 ];

  const divisions = barWidths.map( (bw,i)=>{

    const res = widths.map( w=>{
      return w/bw;
    })

    return (
      <div key={i}>{ 'Bar Width :' + bw + ' : ' + res.join( ', ' ) }</div>
    )

  })

  return (
    <div>
      <div>{ 'Widths : ' + widths.join( ', ' ) }</div>
      <div>{ divisions }</div>
    </div>
  )

}