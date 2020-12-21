import { ISubscribable, Subscription } from "@thi.ng/rstream";
import {
  GestureEvent,
  GestureStream,
  GestureType,
} from "@thi.ng/rstream-gestures";
import { sub2, sub3, Vec } from "@thi.ng/vectors";
import { comp, map, filter } from "@thi.ng/transducers";
import { GestureEvent3D, GestureStream3D } from "../streams";

type DragGesture2D = GestureEvent & {
  translate: Vec;
  delta: Vec;
  start: Vec;
};

type DragGesture3D = GestureEvent3D & {
  translate: Vec;
  delta: Vec;
  start: Vec;
};

export const dragGesture2d = (
  gesture$: GestureStream
): ISubscribable<DragGesture2D> => {
  let translate: Vec = [0, 0];
  let delta: Vec;
  let start: Vec;

  return gesture$.transform(
    comp(
      filter(
        (ev) => ev.type !== GestureType.MOVE && ev.type !== GestureType.ZOOM
      ),
      map((ev) => {
        switch (ev.type) {
          case GestureType.START:
            start = ev.pos;
            translate = [0, 0];
            delta = [0, 0];
            break;
          case GestureType.END:
          case GestureType.DRAG:
            delta = sub2([], ev.pos, delta);
            translate = sub2([], ev.pos, start);
            break;
        }
        return {
          ...ev,
          translate,
          delta,
          start,
        };
      })
    )
  );
};

export const dragGesture3d = (
  gesture$: GestureStream3D
): ISubscribable<DragGesture3D> => {
  let translate: Vec;
  let delta: Vec;
  let start: Vec;

  return gesture$.transform(
    comp(
      filter(
        (ev) => ev.type !== GestureType.MOVE && ev.type !== GestureType.ZOOM
      ),
      map((ev) => {
        switch (ev.type) {
          case GestureType.START:
            start = ev.pos;
            translate = [0, 0, 0];
            delta = [0, 0, 0];
            break;
          case GestureType.END:
          case GestureType.DRAG:
            delta = sub3([], ev.pos, delta);
            translate = sub3([], ev.pos, start);
            break;
        }
        return {
          ...ev,
          translate,
          delta,
          start,
        };
      })
    )
  );
};
