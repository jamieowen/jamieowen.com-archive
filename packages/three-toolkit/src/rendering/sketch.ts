import { sync } from "@thi.ng/rstream";
import { sideEffect } from "@thi.ng/transducers";
import { tickStream } from "../streams/clock-stream";
import { resizeObserverStream } from "../streams/resize-observer-stream";
import { createDomElement } from "./dom-element";
import { rendererStream } from "./render-stream";
export * from "./object-shorthand";
/**
 * Sketch creation function.
 * @param update
 */
export function sketch(update: any) {
  const domElement = createDomElement(document.body);
  const resize = resizeObserverStream(domElement);
  const renderer = rendererStream();
  const tick = tickStream();

  renderer.subscribe({
    next: (r) => {
      domElement.appendChild(r.domElement);
    },
  });

  sync({
    src: {
      renderer,
      resize,
    },
  }).subscribe({
    next: ({ resize, renderer }) => {
      if (!renderer.domElement.parentNode) {
        domElement.appendChild(renderer.domElement);
      }
      renderer.setSize(resize.width, resize.height);
    },
  });

  return sync({
    src: {
      resize,
      tick,
      renderer,
    },
  }).transform(sideEffect(update));
}
