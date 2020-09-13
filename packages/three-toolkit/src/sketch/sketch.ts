import {
  SketchParams,
  SketchSetup,
  SketchHooks,
  Sketch,
  defaultSketchParams,
} from "./api";
import { fromRAF } from "@thi.ng/rstream";
import { resizeObserverStream } from "../streams";

export function sketch(
  params: SketchParams | SketchSetup,
  setup?: SketchSetup
): Sketch {
  const _setup: SketchSetup = !setup ? (params as SketchSetup) : setup;
  const _params: SketchParams =
    typeof params === "object"
      ? defaultSketchParams(params)
      : defaultSketchParams();

  const container: HTMLElement = resolveContainer(_params);

  const raf = fromRAF();
  const resize = resizeObserverStream(container);
  const sketch = { container, raf, resize };
  const res = _setup(sketch);

  let hooks: SketchHooks;
  if (typeof res === "function") {
    hooks = { render: res };
  } else if (typeof res === "object") {
    hooks = res;
  } else {
    throw new Error("No return result provided from setup function.");
  }

  raf.subscribe({
    next: () => {
      hooks.render();
    },
  });

  return sketch;
}

const createContainer = () => {
  const div = document.createElement("div");
  div.style.backgroundColor = "crimson";
  return div;
};

const resolveContainer = (params: SketchParams): HTMLElement => {
  let container: HTMLElement;
  if (params.container === undefined) {
    container = createContainer();
    const [width, height] = params.dimensions;
    // container.style.width = `${width}px`;
    // container.style.height = `${height}px`;
    container.style.width = `50%`;
    container.style.height = `50%`;
    document.body.appendChild(container);
  } else if (typeof params.container === "string") {
    container = document.getElementById(params.container);
  }
  if (!container) {
    throw new Error("Error creating/accessing container.");
  }

  return container;
};
