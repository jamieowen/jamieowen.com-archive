import { subscription } from "@thi.ng/rstream";
import {
  BufferGeometry,
  LineSegments,
  LineBasicMaterial,
  BufferAttribute,
  Object3D,
} from "three";
import { AttributeEvent } from "./api";

export const createLineSegments = (
  position: Float32Array,
  color?: Float32Array
) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  if (color) {
    geometry.setAttribute("color", new BufferAttribute(color, 4));
  }
  // TODO: Use custom material to scale line based on some scale attribute
  // position + velocity * start
  // using shader material.
  // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_tiled_forward.html#L228
  const material = new LineBasicMaterial({
    color: "white",
    vertexColors: color ? true : false,
    linewidth: 10,
  });
  return new LineSegments(geometry, material);
};

export const renderLines = (parent: Object3D) => {
  const state = {
    received: false,
    mesh: null as LineSegments,
  };

  return subscription<null, AttributeEvent>({
    next: (ev) => {
      if (!state.received) {
        state.received = true;
        state.mesh = createLineSegments(ev.data.position!, ev.data.color);
        parent.add(state.mesh);
        console.log("add mesh");
      }
    },
  });
};
