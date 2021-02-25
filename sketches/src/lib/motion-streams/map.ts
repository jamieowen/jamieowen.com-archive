import { Vec } from "@thi.ng/vectors";
import { map } from "@thi.ng/transducers";
import { IMotionEvent } from "./api";

export const mapPosition = (fn: (time: number, position: Vec) => void) =>
  map<IMotionEvent, IMotionEvent>(
    (ev) => (fn(ev.clock.time, ev.data.position), ev)
  );
