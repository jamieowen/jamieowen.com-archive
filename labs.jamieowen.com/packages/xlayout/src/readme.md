# Layout via functional thinking...

Some little notes around this library.
Using @thi.ng transducers and es6 iterators to generate
data based on current iterations of 1d or 2d space. ( and later 3d )

Essentially the premise is to provide a transducer style api to 
operating on Node based data.

```

```

Core concepts:

## Node - represents an indexed element in the iteratable

- guid:{
    i: // integer index of the viewable iteration
    ig: // index of the total range potential of the iterate?
  }
- attributes - customisable on-demand attributes ( position,scale,rotate,etc )
  2 attributes created by default?
  indexes?? or should they sit in guid?
  index = 1,2,3 or [0,0],[0,1], etc - depending on range iterator.

  position? 2d is obvious ( index->position ) but for 1d?
  ( perhaps this is created on the line(), grid() or whatever function )

- children? ( iterable )
- isBranch - Essentialy has iterator/iterable?
- branchDepth - The current node depth

## Attribute Operators

- shorthand to operate on attributes.
- position,scale,color
- 

```
type AttributeOp = (i:number,value:any,node:Node) => any; // return new value
```
## Node Operators

- operate on nodes ( tag, branch, filter )
- operate 

```
type NodeOp = (i:number,node:Node) => Node; // return node with some modification
```
## Iterables? Iterators?

Essentially they are the 'children' of a node. Or the root creation nodes.
And will operate o
- range1d(), range2d(), range3d()
- or, line(), grid(), cube()
- points() ?


## Sources ? Or iterators - trying to determine the correct 

