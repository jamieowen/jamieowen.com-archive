import p5, { Renderer, p5InstanceExtensions } from 'p5';

// https://github.com/processing/p5.js/wiki/Global-and-instance-mode

const s = ( sketch:p5 ) => {

  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(200, 200);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x,y,50,50);
  };

  sketch.mouseMoved = (ev:MouseEvent)=>{
    // console.log( ev );
    x = sketch.mouseX;
    y = sketch.mouseY;
  }
};

let myp5 = new p5(s);






