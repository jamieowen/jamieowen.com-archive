import { NumberKeyframeTrack } from "three";


/**
 * Transducers 101
 */

 const multiply = (x:number,factor:number)=>x*factor;

 const m10 = (x:number)=>multiply(x,10);

 const createMultiply = (factor:number) => (x:number)=>x*factor;

 const m2 = createMultiply(2);


const gridRows = (rows:number,spacing:number) => (idx:number)=> [ idx % rows * spacing, Math.floor(idx/rows) * spacing ]

const gridPos = gridRows( 10,10 );

const arrayFill = (initial:number,inc:number ) => (count:number)=> new Array(count).fill(0).map((x,i)=>(i+initial)*inc );
const createArrayAscending = arrayFill(1,1);
const arrayBlank = arrayFill(0,0);

const items100 = createArrayAscending(100);

const items100_m = items100.map( m10 );


const sourceString = 'Hello there, this is a string to be a counted by frequencies used in this';

const wordHistogram = sourceString
  .split(' ')
  .reduce((acc:any,w:any)=>{
    acc[w] ? acc[w]++ : acc[w] = 1;
    return acc;
  },{})

console.log( 'history', wordHistogram );

const pascalsTriangle = (height:number)=>{

  const cells = [];
  
  for( let y:number = 0; y<height; y++ ){
    
    const row = new Array(y+1);
    cells.push( row );

    for( let x:number = 0; x<row.length; x++ ){
      if( x === 0 || x === row.length-1 ){
        cells[y][x] = 1;
      }else{
        cells[y][x] = cells[y-1][x] + cells[y-1][x-1];
      }
    }

  }

  return cells;

}

console.log( pascalsTriangle(7) );

console.log( multiply(10,2) );
console.log( m10(2) );
console.log( m2(33) );
console.log( items100 );
console.log( items100_m );


const customMap = (src,func) => src.reduce( (acc,x)=>{
  acc.push(func(x));
  return acc;
},[] )

const customFilter = (src,func) => src.reduce( (acc,x)=>{
  func(x) ? acc.push(x) : null;
  return acc;
},[]);

console.log( 'Custom Map', customMap( createArrayAscending(30), (x)=>x*2 ) );
console.log( 'Custom Filter', customFilter( createArrayAscending(30), (x)=>x%2===0 ) );


import * as svg from '@thi.ng/hiccup-svg'
import * as hiccup from '@thi.ng/hiccup';

console.log( svg );

const render = hiccup.serialize( svg.svg(
  { width: 100, height: 100 },
  svg.circle( [10,10], 5, { fill: 'blue' } )
) );

console.log( render );
// svg.


