export class DeferredNodeDecl{

  constructor(
    public childRfn:Function,
    public NodeType:Function = Node,
    public depth:number = 0,
    public children:Array<NodeDecl> = null,
    public parent:NodeDecl = null
    // public thisOps?, 
    // public childOps?
  ){
  }
  
  getIndex(){
    if(this.parent ){
      return this.parent.children.indexOf(this);
    }else{
      return 0;
    }
  }

  expand(){
    // Causes the node to request the children at the current 'i'.
    // i.e. gen.points(i=>[])
    // or, gen.grid(10,10,i=>[])
    // or this could be hidden entirely:
    // gen.rect([])
    // But key thing is the request for the array does not happen until
    // 'i' for the parent is given.
    if( !this.children ){   
      // TODO : expand() should leverage generators??
      // This would propagate into the creation of nodes ( subdivisions, grids, etc )
      const index = this.getIndex();
      this.children = this.childRfn(index);
      // this.children.forEach((node:DeferredNodeDecl)=>{
      //   node.parent = this;
      //   node.depth = this.depth+1;
      // })

      for( let node of this.children ){
        node.parent = this;
        node.depth = this.depth+1;        
      }
    }
  }

  getChildren(){
    this.expand();
    return this.children;
  }

}

export function* depthFirstIterator( graph:DeferredNodeDecl ){

  function* traverse( node:DeferredNodeDecl ){
    yield node;
    // TODO : getChildren() should leverage generators??
    for( let child of node.getChildren() ){
      yield* traverse(child);
    }
  }  
  yield* traverse( graph );

}


export function* breadthFirstIterator( graph:DeferredNodeDecl ){

  let toExplore = [graph];

  while( toExplore.length ){
    const toYield = toExplore;
    toExplore = [];
    for( let node of toYield ){

      // TODO: Concat using generators...
      console.log( 'parent:',node );
      toExplore = toExplore.concat( node.getChildren() );
      // console.log( 'TO YIELD:', [ ...node.getChildren() ] )
      // toExplore = [ ...toExplore, ...node.getChildren() ]
      
    }
    toYield[toYield.length-1].lastDepth = true;
    const lastDepth = toYield[toYield.length-1]
    console.log( `Last Depth Node: : ${lastDepth.depth}`, lastDepth );
    // console.log( 'toYield:' ,toYield );
    yield *toYield;
  }  

}

// console.log( 'Depth First :' );
// for( let item of depthFirstIterator(graph) ){
//   console.log( 'depth:', item.depth );
// }

// console.log( '' );
// console.log( 'Breadth First :' );
// for( let item of breadthFirstIterator(graph) ){
//   console.log( 'depth:', item.depth, item );
// }