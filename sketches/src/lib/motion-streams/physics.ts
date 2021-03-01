import { subscription } from "@thi.ng/rstream";
import { iterator, sideEffect, Transducer, step } from "@thi.ng/transducers";
import { set3, sub3, Vec } from "@thi.ng/vectors";
import { IMotionEvent, IParticle } from "./api";

export const calcVelocity = () => {
  let prev: Vec = undefined;
  return sideEffect<IMotionEvent<"particle">>((ev) => {
    if (!prev) {
      prev = [];
      set3(prev, ev.data.position);
    }
    sub3(ev.data.velocity, prev, ev.data.position);
    set3(prev, ev.data.position);
  });
};

interface ParticleSystemOpts<I, O> {
  xform: Transducer<IMotionEvent<"particle">, IMotionEvent<"particle">>;
}

export const particleSystem = <I, O>(opts: ParticleSystemOpts<I, O>) => {
  let c = 0;
  let apply = step(opts.xform);
  let tmp: IMotionEvent<"particle"> = {
    type: "particle",
    data: null,
    clock: null,
  };
  return subscription<
    IMotionEvent<"particle-array">,
    IMotionEvent<"particle-array">
  >(
    {
      next: () => {},
      error: (err) => {
        throw err;
      },
    },
    {
      // Apply given transducer to each particle in array.
      xform: sideEffect((ev) => {
        tmp.clock = ev.clock;
        for (let i = 0; i < ev.data.length; i++) {
          tmp.data = ev.data[i];
          apply(tmp);
        }
        c++;
      }),
    }
  );
};
