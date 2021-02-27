import { map } from "@thi.ng/transducers";
import { DEFAULT_CLOCK } from "./clock";
import { IClock, IMotionEvent, ITransform } from "./api";

export const createTransform = (): ITransform => {
  return {
    position: [0, 0, 0],
  };
};

export const motionTransform = (tick = DEFAULT_CLOCK()) => {
  const data = createTransform();
  const type = "transform";
  return tick.transform(
    map<IClock, IMotionEvent<"transform">>((clock) => ({ clock, data, type }))
  );
};
