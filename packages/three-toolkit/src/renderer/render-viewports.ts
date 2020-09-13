import { WebGLRenderer, Scene, Camera } from "three";
import { range2d, map } from "@thi.ng/transducers";

type RenderGridParams = Partial<{
  grid: [number, number];
  render: (xy: [number, number], wh: [number, number], i: number) => void;
}>;

export const defaultViewportGridParams = (
  params: RenderGridParams
): RenderGridParams => {
  return {
    grid: [2, 2],
    ...params,
  };
};

export const renderViewportGrid = (
  renderer: WebGLRenderer,
  params: RenderGridParams = {}
) => {
  const _params = defaultViewportGridParams(params);
  const [gx, gy] = _params.grid;
  const { width, height } = renderer.getContext().canvas;
  const pr = renderer.getPixelRatio();

  const vw = width / pr / gx;
  const vh = height / pr / gy;

  renderer.setScissorTest(true);

  [...range2d(gx, gy)].map(([x, y], i) => {
    renderer.setScissor(vw * x, vh * y, vw, vh);
    renderer.setViewport(vw * x, vh * y, vw, vh);
    params.render([x, y], [vw, vh], i);
  });

  renderer.setScissorTest(false);
};
