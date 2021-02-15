import { Mesh, MeshBasicMaterial, Group } from "three";
import { createGeometryFactory, sketch } from "@jamieowen/three";
import { samplePoisson } from "@thi.ng/poisson";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { dist } from "@thi.ng/vectors";
import { fit01 } from "@thi.ng/math";

const createPoints = () => {
  const index = new KdTreeSet(2);
  const size = 10;
  const s2 = size / 2;
  const points = samplePoisson({
    index,
    points: () => [Math.random() * size, Math.random() * size],
    iter: 10,
    // jitter: 1,
    density: (p) => {
      // console.log("PNT", p);
      const dis2 = fit01(Math.pow(dist(p, [s2, s2]) / s2, 2), 0.2, 6);
      const dis = Math.random();
      // console.log("PNT : ", p, dis2);
      return dis2;
    },
    // density: ([x, y]) => {
    //   // console.log(pnt);
    //   // return x / 10;
    //   return 0.9 + Math.min(Math.random() * 0.1, 0.1);
    // },
    max: 1000,
  });

  return {
    points,
    index,
  };
};

sketch(({ render, configure, scene }) => {
  const geometries = createGeometryFactory();
  const group = new Group();
  const { points, index } = createPoints();
  points.map((pnt) => {
    const mesh = new Mesh(
      geometries.create("circle"),
      new MeshBasicMaterial({ color: "crimson" })
    );
    mesh.position.set(pnt[0], pnt[1], 0);
    const nearest = index.queryKeys(pnt, 10, 2);
    // console.log("nearest :", nearest);
    const radius = dist(pnt, nearest[1]) / 2;
    mesh.scale.multiplyScalar(radius);

    // console.log("RADIUS: ", radius);
    group.add(mesh);
    return mesh;
  });

  scene.add(group);
  group.position.set(-5, -5, 0);
  configure({
    width: "1024px",
    height: "768px",
  });
  render(() => {});
});
