

import * as svg from '@thi.ng/hiccup-svg'
import * as hiccup from '@thi.ng/hiccup';
import * as tx from '@thi.ng/transducers';
import * as geom from '@thi.ng/geom';


const arrayFill = (initial:number,inc:number ) => (count:number)=> new Array(count).fill(0).map((x,i)=>(i+initial)*inc );
const createArrayAscending = arrayFill(1,1);

const xform = tx.comp(
  tx.filter((x:number)=>x%2===1),
  // tx.distinct(),
  // tx.
  tx.map((x)=>x*1)
)

// const res = tx.transduce( xform, tx.push(), createArrayAscending(30) );

const it = tx.iterator( xform, [1,2,3,4,5] );

const size:number = 500;
const render = hiccup.serialize( svg.svg(
  { width: size, height: size, style: { 'background-color':'crimson' } },
  svg.circle( [0,0], 20, { fill: 'blue' } )
) );

document.write(render);

// Hermite Interpolation
const values = [5, 10];

// interpolate values and transform into 2D points
// const vertices = [...tx.iterator(
//     tx.comp(
//         tx.interpolateHermite(10),
//         tx.mapIndexed((x, y) => [x, y])
//     ),
//     // duplicate first & last vals (1x LHS / 2x RHS)
//     // this is only needed for hermite interpolation
//     // (see doc string for `interpolateHermite`)
//     tx.extendSides(values, 1, 2)
// )];

// console.log( vertices );



const source = [ 0,3,5,9 ];
const xform2 = tx.comp( 
  tx.mapIndexed((i,x)=>[x,i])
)
const dest = new Array();
const res = tx.transduce(xform2,tx.fill(dest),source);
console.log( 'Test 1 ', res );


// generate SVG
const geomSvgDoc = geom.svgDoc(
  { width: 800, height: 200, "stroke-width": 0.1, viewBox:"0 800 0 200" },
  // interpolated points as polyline
  geom.rect([0,0],1 ),
  // original values as dots
  // ...values.map((y, x) => geom.circle([x * 10, y], 0.2)),
);

console.log( geom.rect([0,0],1 ) );
const rect = geom.rect([0,0],1 );
console.log( rect, rect.toHiccup() );

console.log( 'Geom SVG DOC', geomSvgDoc );
const geomSvg = geom.asSvg( geomSvgDoc );

// console.log( geomSvg );
document.write(geomSvg);

