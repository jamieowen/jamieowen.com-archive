import React from 'react';
import ReactDOM from 'react-dom';

const Sketch = ( SketchComponent )=>{

  window.onload = ()=>{

    const domElement = document.createElement( 'div' );
    domElement.className = 'sketch-container';
    document.body.appendChild( domElement );
    const style = document.createElement( 'style' );
    style.innerText = `
      body{
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
      }
      .sketch-container{
        position: absolute;
        width: 100%;
        height: 100%;
      }

      // canva{
      //   width: 100%;
      //   height: 100%;
      // }

    `
    document.body.appendChild( style );

    ReactDOM.render(
      <SketchComponent/>,
      domElement
    )

  }

}

export default Sketch;