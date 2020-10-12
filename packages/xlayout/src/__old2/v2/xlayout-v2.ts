import * as tx from '@thi.ng/transducers';

export function grid(rows:number,cols:number=rows){
  return tx.range2d(rows,cols);
}


type LayoutOptions = {

}

type Layout = {
  render:(action:RenderAction)=>{}
}

type RenderAction = (node:any)=>{}

type Cursor = {
  parent?:Cursor,
  opts:LayoutOptions,
  i:number,
  x:number,
  y:number,
  depth:number,
  node:any
}

export function layout2d(opts:LayoutOptions):Layout;
export function layout2d(iter2d:Iterable<any>,...xform:[]):Layout{


  function render(action:RenderAction){
    
    const cursor:Cursor = {
      parent:null,
      opts:{},
      i:-1,
      x:-1,
      y:-1,
      depth:0,
      node:null
    }

    const begin = tx.mapIndexed((i,xy)=>{
      cursor.i = i;
      cursor.x = xy[0];
      cursor.y = xy[1];
      return cursor;
    });

    const end = tx.map(node=>{
      return node;
    })

    const iterator = tx.iterator(
      tx.comp(
        begin,
        end
      ),
      iter2d
    )

    for( let node of iterator ){
      action(node);
    }

  }

  return <Layout>{
    render
  }

}
// Layer 1
// xlayout.
//   layout(
//     grid(),
//     convertToBounds(),
//     scale(i=>[10,10]),
//     rotate(i=>),
//     translate()
//   ).render((node)=>{

//   }

