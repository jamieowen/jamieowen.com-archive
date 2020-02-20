import { Color } from "three";

const generateColorPalette = ( color1:Color, computeComplementary:boolean, steps:number=20 ):Array<Color>=>{

  const color2:Color = color1.clone();
  if( computeComplementary ){
    color2.offsetHSL( 0.5,0,0 );
  }else{
    color2.offsetHSL(0,0,1);
  }
  const colors:Array<Color> = [];
  for( let i:number = 0; i<steps; i++ ){

   const c = color1.clone();
   const amount = ( 1 / (steps-1) ) * i;
   c.lerpHSL(color2,amount);
   colors.push(c);

  }

  return colors;

}

export {
  generateColorPalette
}