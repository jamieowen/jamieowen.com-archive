import React from 'react';

const style:object = {
  position: 'fixed',
  overflow: 'scroll',
  top: '0px',
  right: '0px',
  width: '100px',
  height: '100%',
  backgroundColor: 'rgba(255,0,0,0.1)'
}

const page:object = {
  height: '100vh',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(255,0,255,0.1)',
  border: 'crimson solid 1px'
}

const ReactMain = ()=>{

  const onScroll = ()=>{
    console.log( 'okok' );
  }

  return (
    <div id="page-target-temp" style={style} onScroll={onScroll}>
      <div style={page}>
        Page 1
      </div>
      <div style={page}>
        Page 2
      </div>      
      <div style={page}>
        Page 3
      </div>                        
    </div>
  )

}

export {
  ReactMain
}
