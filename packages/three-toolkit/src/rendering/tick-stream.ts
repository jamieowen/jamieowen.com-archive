import { fromRAF } from '@thi.ng/rstream';
import { Clock } from 'three';
import { map } from '@thi.ng/transducers';

export type TickEvent = {
  clock: Clock,
  delta: number,
  time: number,
  frame: number
}

export function tickStream<TickEvent>(){

  const clock = new Clock();
  const tick = map( (i:number)=>{
    return {
      clock,
      delta: clock.getDelta(),
      time: clock.getElapsedTime(),
      frame: i
    }
  });
  // @ts-ignore // unsure how to type this/
  return fromRAF().transform<TickEvent>( tick );

}