import { implementsFunction } from "@thi.ng/checks";
import {
  Stream,
  stream,
  sync,
  ISubscribable,
  IStream,
  ITransformable,
  reactive,
} from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
interface GeometryEvent {
  type: "point" | "point-array"; // transform & transform array?
  data: any;
}

interface IRandomPointsOpts {
  count: number;
}

interface IGeometrySource<T extends GeometryEvent, O> {
  id: string;
  stream: ISubscribable<T> & ITransformable<T>;
  opts: Stream<O>;
}

export class RandomPoints implements IGeometrySource<any, IRandomPointsOpts> {
  opts: Stream<IRandomPointsOpts>;
  stream: ISubscribable<any> & ITransformable<any>;
  constructor(public id: string = "", opts: IRandomPointsOpts) {
    this.opts = reactive(opts);
    this.stream = sync({
      src: {
        opts: this.opts,
      },
      xform: map(({ opts }) => {
        return new Array(opts.count)
          .fill(0)
          .map(() => [Math.random(), Math.random(), Math.random()]);
      }),
    });
  }
}

export const fromRandomPoints = (id: string, opts: IRandomPointsOpts) => {
  return new RandomPoints(id, opts);
};

const fromGridPoints = () => {};

const fromGeometry = () => {};

// Sources return a stream and opts
// As it saves the extra work preparing stream based opts.
// they always return an array of the primtive?
// mapcat reducers flatten to a primitive
// a number of reducer functions can operate on single primitives.
// OR... we use ECS as a base 'factory'. all geom sources have a ref to a ecs and build entity objects that are emitted downstream.
