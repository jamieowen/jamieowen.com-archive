import { GestureType, GestureEvent, gestureStream, GestureStreamOpts } from '@thi.ng/rstream-gestures';
import { trace, ISubscriber, Stream } from "@thi.ng/rstream";
import * as tx from '@thi.ng/transducers';
import { PerspectiveCamera, Raycaster, Ray, Vector2, Plane, Scene } from 'three';


export type GestureStream2dOpts = Partial<GestureStreamOpts>;
export type GestureStream3dOpts = {

} & GestureStream2dOpts;

export type GestureEvent3D = {

} & GestureEvent;


/**
 * 
 * GestureStream2d
 * 
 * @param domElement 
 * @param opts 
 */
export function gestureStream2d( 
  domElement:HTMLElement,
  opts?:GestureStreamOpts 
){
  return gestureStream(domElement,opts)
}

/**
 * 
 * GestureStream3d
 * 
 * @param domElement 
 * @param camera 
 * @param opts 
 */
export function gestureStream3d( 
  domElement:HTMLElement,
  cameraStream: any,
  sceneStream: any,
  opts?: GestureStream3dOpts,
){

  const gestures2d = gestureStream2d(domElement,opts);
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const plane = new Plane();

  console.log( raycaster );
  // raycaster.setFromCamera( mouse, camera );
  // raycaster.ray.intersectPlane()


  const gestures3d = gestures2d.transform<GestureEvent3D>(
    tx.comp(
      tx.take(100),
      tx.sideEffect((e)=>{

        // const rect = // we need resize / dome size for mouse...
      }),
      tx.trace('gesture3d')
    )
  );

  return gestures3d;

}

// export function projectGestures = ()=>{
  
// }
