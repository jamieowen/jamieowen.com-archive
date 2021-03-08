# Geometry Streams.

This is an experiment exploring using streams for geometry creatiom and
processing. The idea is to use streams as the node element within a processing graph.
Nodes can be connected together via subscriptions and transforms using @thi.ng/rstream.

Stream events are standardised around a set of geometry primitives, such as point, line, entity and perhaps triangle. Events can be trasnformed to different event types and back again
if feasible. ( i.e. convert point arrays to points and back, or lines to points and back )

The aim is test feasibility of running a graph at 60fps that is performing a decent number of operations & transformations.

This would enable some fast creative coding experimentation.

Also, it would pave the way to further experiments, such as a DSL for creating graphs for shorthand use, or feeding into a genetic algorithm.

# TODO / DUMP

WORK OUT OVERVIEW OF STREAMS USAGE.

- What are common stream patterns?
- - e.g. how best to chain opts + stream together?
- What are the differences between subscribe/transform/map
- There was an error with subscribe via a map function. ( expression is not callable )

# Eg.

grid()
fromGeometry(geom)
fromText()

A geometry stream emits either points, arrays of points, lines, etc.

```
interface Event{
  type: 'point' | 'point-array' | 'line' | 'line-array'
  data: {}
  index: ? // optional additions injected into the pipeline.
}
```

stream.transform(
mapcat(toPoints), // flattens any arrays to points. or lines to points ?
index(kdTree())
mask(shape())
voronoi()
encodeTexture()

  <!-- filter(()) -->

)

# How is animation made fast?
# Do all points have some kind of unique id?
# And do stream geometry sources cache reused points/lines, if they update frequently?
