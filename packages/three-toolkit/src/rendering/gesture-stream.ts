import { GestureType, GestureEvent, gestureStream, GestureStreamOpts } from '@thi.ng/rstream-gestures';
import { trace, ISubscriber, Stream } from "@thi.ng/rstream";
import * as tx from '@thi.ng/transducers';

export type GestureStream3dOpts = {

} & GestureStreamOpts;

export type GestureEvent3D = {

} & GestureEvent;

export function gestureStream3D( 
  element:HTMLElement, 
  opts: GestureStream3dOpts
){
  const gestures = gestureStream(element,opts)
  return gestures.transform<GestureEvent3D>(
    tx.comp(
      tx.map(e=>e),
      tx.trace('message')
    )
  );

}


// const sub:ISubscriber<GestureEvent> = {
//   next:(e:GestureEvent)=>{
//     console.log( 'e',e );
//   }
// };

// gestures.subscribe(sub,
//   comp( 
//     filter((e:GestureEvent)=>e.type==GestureType.DRAG)
//   )
// );

// gestures.subscribe(
//   trace("distance1"),
//   comp(
//     filter((e:GestureEvent) => e.type === GestureType.DRAG),
//     map((e:GestureEvent)=>({
//       distance:'i',e
//     }))
//     // map((e:GestureEvent)=>e)
//   )
// );


// gestures.subscribe((e:GestureEvent)=>({
//   next:()=>{
//     console.log( 'ok' );
//   }
// }))


// import { GestureType,GestureEvent,gestureStream } from '@thi.ng/rstream-gestures';
// import { trace, ISubscriber } from "@thi.ng/rstream";
// import { comp, dedupe, filter, map, pluck } from '@thi.ng/transducers';
// import * as tx from '@thi.ng/transducers';

// import * as rx from '@thi.ng/rstream';