import {
  Object3D,

  // Temp
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Vector3
} from 'three';


const vec3Target = new Vector3();
const vec3 = new Vector3();

class MeshInstance extends Object3D{

  constructor( geometry,material ){
    
    super();

    this.geometry = geometry;
    this.material = material;
    this.__parent = null;
    this.__context = null;
    // this.debug();

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
      // super.parent = value;      
      // this.parent.add( this._debugMesh );
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
      this.geometry,
      new MeshLambertMaterial({
        // color: 'red',
        color: this.material.color,
        // wireframe: true,
        // wireframeLinewidth: 0.0001
      })
    )

    this.add( this._debugMesh );

    

  }

}

export default MeshInstance;