import {
  sketch,
  createMeshFactory,
  createDomeSimpleLight,
} from "@jamieowen/three";
import { rotateAroundAxis3 } from "@thi.ng/vectors";
import { PlaneBufferGeometry } from "three";

const mf = createMeshFactory();

sketch(({ scene, render }) => {
  createDomeSimpleLight(scene);

  const geom = new PlaneBufferGeometry(1, 1, 10, 10);
  mf.setGeometry(geom as any);
  const plane = mf.mesh(scene);
  plane.position.y = 1;
  const position = geom.getAttribute("position");

  const axis = [0.4, 1, 0];
  const pnt = [0, 0, 0];
  const theta = Math.PI * 0.35;

  for (let i = 0; i < position.count; i++) {
    pnt[0] = position.getX(i);
    pnt[1] = position.getY(i);
    pnt[2] = position.getZ(i);

    rotateAroundAxis3(null, pnt, axis, theta);

    position.setXYZ(i, pnt[0], pnt[1], pnt[2]);
  }

  render(() => {});
});
