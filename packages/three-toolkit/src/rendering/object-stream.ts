import { Stream } from '@thi.ng/rstream';
import { PerspectiveCamera, Scene } from 'three';

/**
 * Emit a three.js object type.
 * 
 * TODO: Add ability to cycle/add/remove objects.
 * 
 * @param obj 
 */
export function objectStream<T>( obj: ()=>T | T  ):Stream<T>{

  let src:T;
  if( typeof obj === 'function' ){
    src = obj();
  }else{
    src = obj;
  }

  return new Stream((stream)=>{
    stream.next( src );
  });

}

export const perspectiveCameraStream = ( 
  camera: PerspectiveCamera 
) => objectStream<PerspectiveCamera>( ()=> camera || new PerspectiveCamera() );

export const sceneStream = ( 
  scene:Scene 
) => objectStream<Scene>( ()=> scene || new Scene() );