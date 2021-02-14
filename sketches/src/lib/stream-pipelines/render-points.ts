import { subscription } from "@thi.ng/rstream";
import { create } from "lodash";
import {
  BufferAttribute,
  BufferGeometry,
  Object3D,
  Points,
  PointsMaterial,
} from "three";
import { AttributeEvent } from "./api";

/**
 *
 * Create a points mesh given a position and
 * optional color attribute.
 *
 * @param position
 * @param color
 */
const createPoints = (position: Float32Array, color?: Float32Array) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  if (color) {
    geometry.setAttribute("color", new BufferAttribute(color, 4));
  }
  const material = new PointsMaterial({
    color: "white",
    vertexColors: color ? true : false,
    size: 1,
  });
  return new Points(geometry, material);
};
/**
 *
 * Render an incoming attribute stream to points.
 *
 * @param parent
 */
export const renderPoints = (parent: Object3D) => {
  const state: { received: boolean; mesh: Points } = {
    received: false,
    mesh: null!,
  };
  return subscription<null, AttributeEvent>(
    {
      next: (ev) => {
        if (!state.received) {
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
      },
    },
    {}
  );
};
