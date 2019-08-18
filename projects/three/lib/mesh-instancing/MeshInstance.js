import {
  Object3D,

  // Temp
  Mesh,
  BoxBufferGeometry,
  Matrix4,
  MeshBasicMaterial
} from 'three';

let debugGeometry = null;
const createGeometry = ()=>{
  if( !debugGeometry ){
    const s = 0.25;
    debugGeometry = new BoxBufferGeometry(s,s,s,1,1,1);
    const transformMatrix = new Matrix4();
    transformMatrix.makeRotationZ( Math.PI * 0.5 );
    transformMatrix.makeRotationX( Math.PI * 0.25 );
    debugGeometry.applyMatrix( transformMatrix );
  }
  return debugGeometry;
}

class MeshInstance extends Object3D{

  constructor( geometry,material ){
    
    super();

    this.material = material;
    this.__parent = null;
    this.__context = null;
    this.debug();

  }

  getContext(){
    let parent = this.__parent;
    let context = null;
    while( parent && !context ){
      if( parent.isMeshInstanceContext ){
        context = parent;
      }
      parent = parent.parent;
    }
    return context;
  }

  get parent(){
    return this.__parent;
  }

  set parent( value ){
    if( this.__parent !== value ){
      this.__parent = value;
      const oldContext = this.__context;
      const newContext = this.getContext();
      this.__context = newContext;
      const changed = oldContext !== newContext;
      if( changed && oldContext ){
        oldContext.onRemoveInstance(this);
      }
      if( changed && newContext ){
        newContext.onAddInstance(this);
      }else
      if( !newContext && value ){
        throw new Error( 'MeshInstances must be added to a descendant of a MeshInstanceContext' );
      }
    }

  }

  debug(){

    this._debugMesh = new Mesh( 
      createGeometry(),
      new MeshBasicMaterial({
        color: this.material.color,
        wireframe: true
      })
    )

    this.add( this._debugMesh );

  }

}

export default MeshInstance;