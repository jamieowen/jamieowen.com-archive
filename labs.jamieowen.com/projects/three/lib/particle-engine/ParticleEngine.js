import {
  Object3D,
  Mesh,
  MeshBasicMaterial,
  BoxBufferGeometry
} from 'three';


import PointEmitter from './emitters/PointEmitter';

/**
 * 
 * Particle engine.
 * 
 * Instanced Particle ( with material and geometry )
 * Point Particle ( gl point primitives )
 * Ribbons / Trails ?
 * 
 * > Attributes
 * Position
 * Life
 * Age
 * Scale
 * Color
 * Diffuse
 * Ambient
 * Specular
 * Metalness,Etc.
 * 
 * > Emitters
 * Point Emitter
 * Sphere Emitter
 * Box Emitter
 * Rect Emitter
 * Geometry Emitter ( encode geometry vertices into texture )
 * 
 * > Forces
 * Gravity Force
 * Attraction/Repulsion Force
 * Cyclone / Twister
 * 
 * 
 * > Flows ?
 * Cubic Bezier flow
 * 2D Vector Field
 * 3D Vector Field
 * etc.
 * 
 */
class ParticleEngine extends Object3D{

  constructor(){
    
    super();

    this.emitters = [];
    this.forces = [];

    const pointEmitter = new PointEmitter(); 
    this.add( pointEmitter );

    const pointEmitter2 = new PointEmitter();
    this.add( pointEmitter2 );

    pointEmitter2.position.set( 5,5,0 );

  }

  updateMatrixWorld(f){
    super.updateMatrixWorld(f);
  }

  add(child){    
    super.add(child);
    // console.log( 'ADD :', child );
  }

}

export default ParticleEngine;