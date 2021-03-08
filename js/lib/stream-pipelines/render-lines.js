import {subscription} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {
  BufferGeometry,
  LineSegments,
  LineBasicMaterial,
  BufferAttribute
} from "../../../_snowpack/pkg/three.js";
export const createLineSegments = (position, color) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  if (color) {
    geometry.setAttribute("color", new BufferAttribute(color, 4));
  }
  const material = new LineBasicMaterial({
    color: "white",
    vertexColors: color ? true : false,
    linewidth: 10
  });
  return new LineSegments(geometry, material);
};
export const renderLines = (parent) => {
  const state = {
    received: false,
    mesh: null
  };
  return subscription({
    next: (ev) => {
      if (!state.received) {
        state.received = true;
        state.mesh = createLineSegments(ev.data.position, ev.data.color);
        parent.add(state.mesh);
        console.log("add mesh");
      }
    }
  });
};
