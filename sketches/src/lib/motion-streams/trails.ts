import { subscription, Subscription } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";
import { create } from "lodash";
import { createTransform } from "../motion-streams-rough";
import { set, set3 } from "@thi.ng/vectors";

import { IMotionEvent, ITransform } from "./api";

export class Trails extends Subscription<
  IMotionEvent<"transform">,
  IMotionEvent<"transform-array">
> {
  trails: ITransform[] = [];
  emit: boolean = false;

  constructor(public length: number, public emitWhenFull: boolean = true) {
    super();
    this.trails = [];
  }

  next(ev: IMotionEvent<"transform">) {
    if (this.trails.length < this.length) {
      this.trails.unshift(createTransform());
    } else {
      const last = this.trails.pop();
      this.trails.unshift(last);
    }
    const input = ev.data;
    const transform = this.trails[0];

    set3(transform.position, input.position);

    if (this.emitWhenFull && this.trails.length >= this.length) {
      this.dispatch({
        type: "transform-array",
        data: this.trails,
        clock: ev.clock,
      });
    } else {
    }
  }

  error(err) {
    console.log("Err", err);
  }
}

export const trails = (length: number) => new Trails(length);
