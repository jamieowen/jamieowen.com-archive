
# Ideas for instanced mesh

## Api Implementation

const config = new ContextConfig({
  meshes: {
    box: {
      maxInstances: 100,
      geometry: new BoxBufferGeometry(1,1,1,1,1,1),
      material: new MeshBasicMaterial({
        color: 'blue'
      }),
      // extras
      castShadows: true,
      receiveShadows: true
    },
    sphere: {
      maxInstances: 100,
      geometry: new BoxBufferGeometry(1,1,1,1,1,1),
      material: new MeshBasicMaterial({
        color: 'blue'
      })
    }
  }
});

const {
  BoxGeometryReference,
  SphereGeometryReference
} = config.createMeshClasses();

// or, register a geometry/material combo with context config
// and:
const {
  BoxMeshInstance,
  SphereMeshInstance,
  SuzanneMeshInstance
} = createMeshInstanceClasses( contextConfig );

const context = new MeshInstanceContext( contextConfig );
scene.add( context );

const instance = new MeshInstance( 
  new BoxGeometryReference(),
  new MeshInstancePhongMaterial()
)

context.add( instance );



## Internal Implementation

MeshInstance --> Object3D
- On added to parent ? or..
- On updateMatrixWorld(),  detect current MeshInstanceContext.
- Register a count and hash/id of material/geometry combination.
- Or may be update

MeshInstanceContext --> Object3D
  - Create a Mesh and InstnacedGeometry for instance config.
  - onBeforeRender, update the instance draw range.
  - etc.

