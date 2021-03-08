import {Mesh, MeshBasicMaterial, Group} from "../_snowpack/pkg/three.js";
import {createGeometryFactory, sketch} from "../_snowpack/pkg/@jamieowen/three.js";
import {samplePoisson} from "../_snowpack/pkg/@thi.ng/poisson.js";
import {KdTreeSet} from "../_snowpack/pkg/@thi.ng/geom-accel.js";
import {dist} from "../_snowpack/pkg/@thi.ng/vectors.js";
import {fit01} from "../_snowpack/pkg/@thi.ng/math.js";
const createPoints = () => {
  const index = new KdTreeSet(2);
  const size = 10;
  const s2 = size / 2;
  const points = samplePoisson({
    index,
    points: () => [Math.random() * size, Math.random() * size],
    iter: 10,
    density: (p) => {
      const dis2 = fit01(Math.pow(dist(p, [s2, s2]) / s2, 2), 0.2, 6);
      const dis = Math.random();
      return dis2;
    },
    max: 1e3
  });
  return {
    points,
    index
  };
};
sketch(({render, configure, scene}) => {
  const geometries = createGeometryFactory();
  const group = new Group();
  const {points, index} = createPoints();
  points.map((pnt) => {
    const mesh = new Mesh(geometries.create("circle"), new MeshBasicMaterial({color: "crimson"}));
    mesh.position.set(pnt[0], pnt[1], 0);
    const nearest = index.queryKeys(pnt, 10, 2);
    const radius = dist(pnt, nearest[1]) / 2;
    mesh.scale.multiplyScalar(radius);
    group.add(mesh);
    return mesh;
  });
  scene.add(group);
  group.position.set(-5, -5, 0);
  configure({
    width: "1024px",
    height: "768px"
  });
  render(() => {
  });
});
