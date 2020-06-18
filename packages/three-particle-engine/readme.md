
# Notes


## Attributes

### Minimal

+ Position
+ Life
+ Age
+ Color / Diffuse

### Additional
+ Scale
+ Rotation

### Material Dependent
+ Ambient
+ Specular
+ Metalness
+ Roughness / etc 


## CPU / GPU Representation

### CPU

+ All attributes encoded in vertex buffers
+ Optional async ( multi-frame lag ) integration.
+ Spatial indexing and querying options.
+ Transpiled GLSL if possible.

### GPU
+ All attributes encoded in texture buffers
+ Vertex buffers & transform feedback (webgl2)



## Init / Render / Update steps.

### Init
+ Create vertex buffers with max particle count. 
+ Or, create texture buffers.
+ 

## Instnacing Component.

Instancing component that allows for custom attributes
with a bunch of configurations that match differnet shaders.
Perhaps with an iterator interface.

CPU updates of the attributes can be handled via regular 
iterators.  But perhaps we could introduce vertex updating
purely on the GPU. Using a GLSL transpiler for CPU updates
and then a move to transform feedback when possible.  The GLSL code could work with texture btyruffers in the short term for webgl 1.

AdaptableBufferGeometry - houses attributes.
AdaptableBufferAttribute - details prefernce on feedback availability, cpu and gpu updates. 

AdaptableBasicMaterial
AdaptableLamnertMaterial,
AdaptablePointMaterial,
etc...

These can form the basis of particle engines and a whole bunch of optized tools for rnedering.

Feedback Interface.
If updates/feedback are deifned using glsl. and we can operate in both cpu and gpu modes, we need some way to update data and supply relevant
attribute update logic. This could be provided to the material but may need an additional class to house the logic for shader creation and render/update to logic for feedback. It also gives us options for switching between worker rendering and multi-frame passes on large amounts of data.  Also CPU based rendering gives us the option of using some spatial indexing on positoin data for fast distance queries.

TransformFeedbackUpdate
( geometry, mat)




