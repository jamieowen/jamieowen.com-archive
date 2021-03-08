import {
  sketch,
  createGeometryFactory,
  createGridHelper,
  gestureStream3d
} from "../_snowpack/pkg/@jamieowen/three.js";
import {map, comp} from "../_snowpack/pkg/@thi.ng/transducers.js";
import {cross3, sub3, normalize} from "../_snowpack/pkg/@thi.ng/vectors.js";
import {
  createFrameLoop,
  createTransform,
  beginPhysics,
  endPhysics,
  forceVector,
  steerRandomPoint,
  limitVelocity
} from "./lib/motion-streams-rough/index.js";
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  ArrowHelper,
  Vector3,
  AxesHelper,
  BoxBufferGeometry,
  BackSide,
  AmbientLight,
  MeshLambertMaterial,
  PointLight
} from "../_snowpack/pkg/three.js";
const tmp = new Vector3();
const createArrowHelper = (parent, color = "yellow", dir = [0, 0, 1]) => {
  const helper = new ArrowHelper(void 0);
  helper.setColor(color);
  helper.setLength(0.35, 0.2, 0.1);
  tmp.fromArray(dir);
  helper.setDirection(tmp);
  parent.add(helper);
  return helper;
};
const geometries = createGeometryFactory();
const createMesh = (scene, color, scale) => {
  const mesh = new Mesh(geometries.create("sphere"), new MeshBasicMaterial({color}));
  scene.add(mesh);
  mesh.scale.multiplyScalar(scale);
  return mesh;
};
const calcAxes = (dir) => {
  const right = cross3([], dir, [0, 1, 0]);
  const up = cross3([], right, dir);
  return {
    up,
    right
  };
};
const createSceneBox = (scene) => {
  const box = new Mesh(new BoxBufferGeometry(2, 2, 2), new MeshLambertMaterial({color: "lightgray", side: BackSide}));
  const light = new AmbientLight(16777215, 0.2);
  const plight = new PointLight(16777215, 0.5);
  plight.position.set(1.5, 1, 2);
  scene.add(light);
  scene.add(plight);
  scene.add(box);
  return box;
};
const renderTransform = (scene) => {
  const renderMap = new WeakMap();
  return {
    next: (obj) => {
      let renderer = renderMap.get(obj);
      if (!renderer) {
        renderer = createMesh(scene, "red", 0.1);
        renderMap.set(obj, renderer);
        scene.add(renderer);
        console.log("add", obj.position);
      }
      renderer.position.fromArray(obj.position);
    }
  };
};
sketch(({render, configure, scene, domElement, camera, resize}) => {
  const grid = createGridHelper();
  const axes = new AxesHelper(3);
  const mousePoint = createMesh(scene, "crimson", 1);
  const s = 0.3;
  mousePoint.scale.set(s, 0, s);
  scene.add(axes);
  createSceneBox(scene);
  const group = new Group();
  group.position.set(1, 3, 1).multiplyScalar(0.2);
  scene.add(group);
  const dir1 = [-1, 0.5, 0.5];
  const dir1h = createArrowHelper(group, "white", dir1);
  const ax = calcAxes(dir1);
  const rightHelper = createArrowHelper(group, "blue", ax.right);
  const upHelper = createArrowHelper(group, "red", ax.up);
  const vectorHelper = createArrowHelper(scene, "yellow");
  const tmp2 = new Vector3();
  gestureStream3d(domElement, camera, resize).subscribe({
    next: (ev) => {
      mousePoint.position.fromArray(ev.pos);
      const target = group.position.toArray();
      const dir = normalize(null, sub3([], ev.pos, target));
      tmp2.fromArray(dir);
      dir1h.setDirection(tmp2);
      const axes2 = calcAxes(dir);
      tmp2.fromArray(axes2.up);
      upHelper.setDirection(tmp2);
      tmp2.fromArray(axes2.right);
      rightHelper.setDirection(tmp2);
    },
    error: () => {
    }
  });
  createFrameLoop([createTransform()]).transform(comp(map(beginPhysics()), map(forceVector([0, 1e-3, 0])), map(steerRandomPoint(0.5)), map(limitVelocity(0.03)), map(endPhysics()))).subscribe(renderTransform(scene));
  configure({
    width: "1024px",
    height: "768px"
  });
  render(() => {
  });
});
