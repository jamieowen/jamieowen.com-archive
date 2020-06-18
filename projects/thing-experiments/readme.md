
# thi.ng Umbrella Notes.

[github](https://github.com/thi-ng/umbrella)


## To look into 
https://demo.thi.ng/umbrella/cellular-automata

## thi.ng/transducers

The main transducer set of libraries...

```
import * as tx from '@thi.ng/transducers';

// Composing a transducer of functions.
const xform = tx.comp( 
  tx.filter((x)=>x>10),
  tx.map((x)=>x*2) 
);

```


## thi.ng/geom
[https://github.com/thi-ng/umbrella/tree/develop/packages/geom]()

"Functional, polymorphic API for 2D geometry types & SVG generation."

Has a standardised geometry interface for basic 2d primitives.
Circle,Rect,Ellipse classes, with function shorthand.. geom.rect(), geom.polyline,etc.

Provides some interfaces to create SVG docs from this format.?

Questions?
Does this translate to a hiccup format? then to SVG? Not sure yet.


```
import * as geom from '@thi.ng/geom';
// or
import { asSvg,svgDoc,rect } from '@thi.ng/geom';
```







## OLD..

// import { GUI, GuiController } from 'dat.gui';
// import * as layout from './layout-gen/layoutGen';
// import * as tx from '@thi.ng/transducers';
// import * as ti from '@thi.ng/iterators';



// const points = layout.points(10);
// console.log( points );

// for( let pnt of points ){
//   console.log( '::', pnt );
// }

// const xform = tx.comp(
//   gridCols(3)
// );


// const la:any = lg.points(20)(
//   lg.translate([10,10]),
  
//   // lg.scale()
//   lg.attr('scale').comp( 
//     lg.translate((i,x)=>),
//     lg.noise2d((x)=>),


//   ),

// );

// const gridPoints = la.points(20)
// .position(
//   lg.grid(),
//   lg.offset([-1,-2])
//   lg.scale(10),
//   lg.filterIndex((i)=>i % 2)
// ).scale( 
//   lg.noise(seed),
//   lg.ramp2d()

// ).color(
//   lg.color(),
//   lg.fromPosition(
//     lg.color((pos)=>[...pos,0 ])
//   ),
//   lg.colorFromScale()
// ).size(
//   lg.size(10)
// ).attr('custom',
//   lg.translate([0,0])
// ).filter(
  
// ).subdivide((x)=>)

// for( let g:any of gridPoints ){
//   // render
// }

// console.log( 'Points :', [...la] );

// In Umbrella terms ( i think ) ( by types )
// TxLike : Transducer | IXForm


// x is a transducer
// xform a composition of them
// tx - TxLike - a transducer or xform
// rfn - the reduction function ( the last bit )
// xs - iterable

// let arr = [0,0,0,0,0,0];
// let dest = [];

// Customise Reducer to cache reduce to cached state.
// const myPush = tx.reducer( ()=>dest, (acc,x)=>(acc.push(x),acc ));

// let res = tx.transduce( xform,myPush,arr );
// res = tx.transduce( xform,myPush,arr );

// console.log(res);
// console.log(dest===res);

// const r = tx.range(10);

// // console.log( [...r] )


// const xform1 = tx.comp( 
//   tx.mapIndexed((i,x)=>[i,x]),
//   tx.map((x:any)=>(x[0]*3,x[1]*3,x))  
// )

// const iterable = tx.iterator(
//   tx.comp(
//     tx.map((x)=>x*5)
//   ),
//   tx.range(10)
// )

// console.log( iterable );
// console.log( iterable.next() );

// console.log( tx.transduce(xform1,tx.push(),tx.range(10) ) ); 

// console.log( [... ti.take(10, ti.cycle(ti.range(3)))] );

/**
export interface Reducer<A, B> extends Array<any> {
    [0]: () => A;
    [1]: (acc: A) => A;
    [2]: ReductionFn<A, B>;
}

// 0: Init
// 1: Acc function - wrapped in func? ( to fetch acc function )
// 2: Actual acc function - (acc,x)=> as native JS
 */

// check out th.ng geom for renderering

