import * as tx from '@thi.ng/transducers';

type NodeIterable = Iterable<Node>;
type XFormArray = Array<tx.TxLike<any,any>>;

export class Node implements NodeIterable{ // Correct Typescript interface??

  public xform:XFormArray;
  public iterable:any; // ( 2d iterable type? )
  public isBranch:boolean = false;
  public attributes:Map<string,any> = new Map();

  constructor(  
    xform?:XFormArray,
    iterable?:NodeIterable
  ){
    this.xform = xform;
    this.iterable = iterable;
    this.isBranch = iterable !== undefined;
  }

  *[Symbol.iterator](){

    // why 2 types for iterator?
    let reduce;
    if( this.xform ){
      // Based on tx.iterator source
      const rfn = tx.comp.apply(this,this.xform )( tx.push() )
      const complete = rfn[1];
      reduce = rfn[2];
    }else{
      reduce = (a,x)=>(a.push(x),a);
    }

    for( let n of this.iterable ){
      // yield node;
      // console.log(n);
      const nn = reduce([],n)[0];
      // console.log( nn );
      if( nn.isBranch ){
        yield n; // yield actual container branch
        yield* nn;
      }else{
        yield nn;
      }
      
    }
  }

}

export const make2d = tx.mapIndexed((i,x)=>{
  return [x,0];
  // if( typeof x === 'number' ){
  //   return [x,0]
  // }else
  // }
})

export const makeNode = tx.mapIndexed((i,x):Node=>{
  return new Node();
});

export const makeBranchNode = (count:number)=> tx.map((node:Node):Node=>{
  node.iterable = makeNodeIterable( tx.range(count) );
  node.isBranch = true;
  return node;
})

type RfnNodeIndex = (i:number,node:Node)=>{}
type RfnGetSet = (i:number,value:any)=>{}


export const tagNodeIndexed = ( rfn:RfnNodeIndex ) => tx.mapIndexed((i:number,node:Node)=>{
  node.tag = rfn(i,node);
  return node;
});
export const tagNode = (tag:number)=>tx.map((node:Node)=>(node.tag = tag,node));

export const points = ( count:number, xform?:XFormArray ) =>{
  const iterable = makeNodeIterable( tx.range(count) );
  return new Node( xform,iterable );
}

export const setAttribute = (name:string,rfn:RfnNodeIndex)=>tx.mapIndexed(
  (i:number,node:Node)=>{
    node.attributes.set(name,rfn(i,node) || null );
    return node;
  });

  export const getSetAttribute = (name:string,rfn:RfnGetSet)=>tx.mapIndexed(
    (i:number,node:Node)=>{
      const value = node.attributes.get(name);
      const res = rfn(i,value) || null;
      // console.log( 'set res', res );
      node.attributes.set(name,res);
      return node;
    });  

// export const getAttribute = (name:string,rfn:RfnInde)

export const position = (rfn:RfnNodeIndex)=> setAttribute(
  'position', (i:number,node:Node)=>rfn(i,node)
);

type RfnAttribute = (i:number,current:any,node:Node) => any;
type VecAttributeApi = {
  set:(rfn:RfnAttribute)=>{},
  scaleScalar:(rfn:RfnAttribute)=>{},  
}
function createVecAttributeAPI(name:string):VecAttributeApi{

  return {
    set:(rfn:RfnAttribute)=>tx.mapIndexed((i:number,node:Node)=>{
      const current = node.attributes.get(name);
      const changed = rfn(i,current,node);
      node.attributes.set(name,changed);
    }),
    scaleScalar:(rfn:RfnAttribute)=>tx.mapIndexed((i:number,node:Node)=>{
      const current = node.attributes.get(name);
      const scale:number = rfn(i,current,node);
      current[0]*=scale; current[1]*=scale;
      node.attributes.set(name,current);
    })    
  }

    // l.position.scale(()=>3), // .set, .offset, .rotate(), .scale()
    // l.position.set(l.ODD(()=>10)), // .set, .offset, .rotate(), .scale()
}

export const pos:VecAttributeApi = createVecAttributeAPI('position');

export const scale = (scale:any)=> getSetAttribute(
  'position',(i:number,current:any)=>(current[0]*=scale,current[1]*=scale,current) 
);

export const makeNodeIterable = ( iterable:Iterable<any> ):NodeIterable =>{
  return tx.iterator(
    tx.comp( 
      make2d,
      makeNode
    ),
    iterable
  )
}



// const points = ( count:number, xform ) =>{

//   return {
//     *[Symbol.iterator](){

//       // return tx.comp
//       yield 0
//       yield 1
//       yield 2

//       for( value of tx.range(count) ){
        
//         // tx.xform value
//         // do that.

//         if( value.iterator ){
//           yield* value
//         }else{
//           yield value
//         }
        

//       }

//     }
//   }
// }


// interface Node{
//   iterator:Iterable<any>;
//   [Symbol.iterator]?:any,
//   position:any,
//   size?:any,
//   color?:any

// }

// const makeNode = tx.map( (i,value)=>{

//   if( typeof value === 'number' ){
    
//   }
// } )
// 1
// points(10,[
//   translate((i)=>i>2 ?), // apply to position
//   scale([]), // apply to position
//   instance.scale(),
//   instance.size()
//   color()
//   branch((i)=>i%2 ? undefined : points(10,[
//     random()
//   ]))
// ])

// // or

// points( 10,
//   translate(),


// )