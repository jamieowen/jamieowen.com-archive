import { PointEvent } from "./api";
import { Stream, reactive, ISubscribable } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { implementsFunction } from "@thi.ng/checks";

/**
 * Todo. Opts Stream
 */
export const isSubscribable = (x: any): x is ISubscribable<any> =>
  implementsFunction(x, "subscribe");

export function optsStream<T>(opts: T | Stream<T>): Stream<T> {
  if (!isSubscribable(opts)) {
    return reactive<T>(opts as T);
  } else {
    return opts as Stream<T>;
  }
}

interface ICommonSourceOpts {}

interface IRandomPointsOpts extends ICommonSourceOpts {
  count: number;
  seed: number;
}

export const createRandomPoints = (
  id: string,
  opts: Partial<IRandomPointsOpts> = {}
) => {
  const inputs = reactive<IRandomPointsOpts>({
    count: 10,
    seed: 0,
    ...opts,
  });

  const stream$ = new Stream((src) => {
    const sub = inputs.subscribe({
      next: (inp) => {
        const arr = new Array(inp.count)
          .fill(0)
          .map(() =>
            dataToPointEvent([Math.random(), Math.random(), Math.random()])
          );
        src.next(arr);
      },
    });
    return () => {
      sub.unsubscribe();
    };
  }, {});
  return [stream$, inputs];
};

export const dataToPointEvent = (data: PointEvent["data"]): PointEvent => {
  return {
    data: data,
    type: "point",
  };
};
