import { Stream } from "@thi.ng/rstream";
import { ResizeEvent } from "../streams";

export interface Sketch {
  container: HTMLElement;
  raf: Stream<number>;
  resize: Stream<ResizeEvent>;
}

export type SketchParams = {
  container?: undefined | string | HTMLElement;
  dimensions: [number, number];
};

export const defaultSketchParams = (
  init: Partial<SketchParams> = {}
): SketchParams => {
  return {
    dimensions: [800, 600],
    ...init,
  };
};

export type SketchRender = () => void;

export type SketchHooks = {
  render: SketchRender;
};

export type SketchSetup = (sketch: Sketch) => SketchHooks | SketchRender;
