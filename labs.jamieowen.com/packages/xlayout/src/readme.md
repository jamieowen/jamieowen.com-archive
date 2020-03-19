# XLayout


## Introduction
XLayout is a declarative syntax and set of tools for describing layouts.
With an aim to iterate over an entire declative layout with different parameters to
produce different layouts in real-time in a generative manner.  Therefore, the speed at which it produces the declaration graph is important.

A typical layout to rendering process follows :

1. Declaration ( gen.root(), gen.ops(), etc ) ( lightweight, fast )
2. Scenegraph conversion. ( xlayout(graph) ) ( node caching )
3. Render*. ( renderSVG, renderCanvas )

*Note: XLayout is not a rendering engine. And the two renderers are using thi.ng which convert 
a tree to hiccup format before rendering.

## Why declarative?

My background is OO so trying to commit to a declarative approach is quite a task. But its clear 
that is has a lot of benefits?? - but some drawbacks??

?? 


## Nodes & Ops


### Breadth first initialistion



