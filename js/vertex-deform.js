import {
  sketch,
  createMeshFactory,
  createDomeSimpleLight
} from "../_snowpack/pkg/@jamieowen/three.js";
import {rotateAroundAxis3} from "../_snowpack/pkg/@thi.ng/vectors.js";
import {PlaneBufferGeometry} from "../_snowpack/pkg/three.js";
const mf = createMeshFactory();
sketch(({scene, render}) => {
  createDomeSimpleLight(scene);
  const geom = new PlaneBufferGeometry(1, 1, 10, 10);
  mf.setGeometry(geom);
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
  render(() => {
  });
});
