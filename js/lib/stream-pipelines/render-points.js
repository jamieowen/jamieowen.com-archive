import {subscription} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
import {
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial
} from "../../../_snowpack/pkg/three.js";
const createPoints = (position, color) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  if (color) {
    geometry.setAttribute("color", new BufferAttribute(color, 4));
  }
  const material = new PointsMaterial({
    color: "white",
    vertexColors: color ? true : false,
    size: 1
  });
  return new Points(geometry, material);
};
export const renderPoints = (parent) => {
  const state = {
    received: false,
    mesh: null
  };
  return subscription({
    next: (ev) => {
      if (!state.received) {
        state.received = true;
        state.mesh = createPoints(ev.data.position, ev.data.color);
        parent.add(state.mesh);
      } else {
        state.mesh.geometry.getAttribute("position").needsUpdate = true;
      }
    },
    error: (err) => {
      throw err;
    },
    done: () => {
      if (state.received) {
        parent.remove(state.mesh);
      }
    }
  }, {});
};
