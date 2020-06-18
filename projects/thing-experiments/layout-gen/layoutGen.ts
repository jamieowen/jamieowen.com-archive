import * as tx from '@thi.ng/transducers';
import { TxLike,IXform } from '@thi.ng/transducers';
import { add } from '@thi.ng/vectors';

/**
// points(10*40)
// 
// gridRows(10,1) // row length ? optional spacing?
// gridCols(10)
// translate(-5,-5)
// scale(10,2)
// size(10)
// bounds([10,10])
// rotate(Math.PI)
// rotateIndex(Math.PI,1)
// filterNoise(0.1)
// filterRandom()
// filterShape()

**/

type LayoutItem = {

  id?:number,
  // position:
}

class Layout implements IXform<any,any>{

  private iterable:Iterable<any>;
  private xf:any;

  // layout iterable ( LayoutItem? type )
  // pass additional comp TxLikes in to concstructor?
  constructor( xs:Iterable<any> ){

    this.iterable = xs;
    this.xf = [];

    // NOTE..
    // first step is to map to 
    // our internal LayoutItem format.
    /**

    // mapIndexed
    {  > per item
      id: [i],
      position:[x,y],


      // for sub dividing ( add layouts inside layouts )
      size:[0,0] ??

      // added when needed
      color: []// etc
    },
    
     */

     // componentXform = {}





  }

  xform():any{

    const xform = [];
    
    return tx.comp(
      tx.map( (x)=>[0,0] ),
      tx.comp(
        tx.map( (x)=>x )
      )
    )
  }

  attr( component:string,xform:any ){
    this.xf.push( [component,xform] );
  }

  position( args:any ){
    this.attr( 'position', tx.comp.apply(this,args) );
  }

  position( args:any ){
    this.attr( 'position', tx.comp.apply(this,args) );
  }  

  [Symbol.iterator] = ()=>{    
    return tx.iterator( this,this.iterable );
  }

}


export function componentValue(apply:any){
  return ( item:LayoutItem,component:string )=>{
    return apply( item[component] )
  }
}

export function translate = (vec:any) => componentValue( (val)=>(val[0]*=2,val[1]*=2) )


export function points(count:number):Layout{
  return new Layout(tx.range(count));
}

export function grid(width:number,height:number):Layout{
  const layout = new Layout(tx.range(width*height));
  return layout;
}

export const pointss = ( count:number )=>{

  return ( args:any=[] )=>{

    args = [ 
      tx.map( (x)=>[0,0] ) // init [0,0] point
    ].concat( args );

    console.log( args );
    return tx.iterator( 
      tx.comp.apply(this,args),
      tx.range(count)
    )

  }

}

// Row first iteration i = 0 = [0,0], i = 1 = [0,1]
// i.e. specify row height and cols will fill up infinitely
const gridRows = (rows:number)=>tx.mapIndexed((i,x)=>{
  const row = Math.floor(i/rows);
  const col = i % rows;
  return [col,row]; // x, y
});


// Col first iteration i = 0 = [1,0], i = 1 = [1,0]
// i.e. specify col width and rows will fill up infinitely
const gridCols = (cols:number)=>tx.mapIndexed((i,x)=>{
  const row = i % cols;
  const col = Math.floor(i/cols);
  return [col,row];
})

// export const translate = (vec)=>(x)=>add(x,vec);



/**
 * 
 * 


 const iterable = tx.iterator(
  tx.comp(
    tx.map((x)=>x*5)
  ),
  tx.range(10)
)


 points(10).comp(
   gridRows(),
   translate(),
   scale(),
   size()
 )

 points(10)(
   
 )

 */