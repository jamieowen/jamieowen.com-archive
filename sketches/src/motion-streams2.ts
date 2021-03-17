import {
  sketch,
  createGeometryFactory,
  createGridHelper,
  dragGesture3d,
  gestureStream3d,
} from "@jamieowen/three";

import { fromRAF, setLogger, ISubscriber } from "@thi.ng/rstream";
import { map, comp } from "@thi.ng/transducers";
import { add3, cross3, Vec, sub3, normalize } from "@thi.ng/vectors";
import {
  createFrameLoop,
  createTransform,
  beginPhysics,
  endPhysics,
  ITransform,
  forceVector,
  wrapBoundsScalar,
  steerRandomPoint,
  limitVelocity,
} from "./lib/motion-streams-rough";
// import { ConsoleLogger, LogLevel } from "@thi.ng/api";
// setLogger(new ConsoleLogger("rstream", LogLevel.FINE));

import {
  ConeBufferGeometry,
  CylinderBufferGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Scene,
  ArrowHelper,
  Vector3,
  Object3D,
  AxesHelper,
  BoxBufferGeometry,
  BackSide,
  AmbientLight,
  MeshLambertMaterial,
  PointLight,
} from "three";

const tmp = new Vector3();
const createArrowHelper = (
  parent: Object3D,
  color: string = "yellow",
  dir: Vec = [0, 0, 1]
) => {
  const helper = new ArrowHelper(undefined);
  helper.setColor(color);
  helper.setLength(0.35, 0.2, 0.1);
  tmp.fromArray(dir);
  helper.setDirection(tmp);
  parent.add(helper);
  return helper;
};

const geometries = createGeometryFactory();
const createMesh = (scene: Scene, color: string, scale: number) => {
  const mesh = new Mesh(
    geometries.create("sphere"),
    new MeshBasicMaterial({ color })
  );
  scene.add(mesh);
  mesh.scale.multiplyScalar(scale);
  return mesh;
};

const calcAxes = (dir: Vec) => {
  const right = cross3([], dir, [0, 1, 0]);
  const up = cross3([], right, dir);
  return {
    up,
    right,
  };
};

const createSceneBox = (scene: Scene) => {
  const box = new Mesh(
    new BoxBufferGeometry(2, 2, 2),
    new MeshLambertMaterial({ color: "lightgray", side: BackSide })
  );
  const light = new AmbientLight(0xffffff, 0.2);
  const plight = new PointLight(0xffffff, 0.5);
  plight.position.set(1.5, 1, 2);
  scene.add(light);
  scene.add(plight);
  scene.add(box);
  return box;
};

const renderTransform = (scene: Scene): ISubscriber<ITransform> => {
  const renderMap = new WeakMap<ITransform, Mesh>();
  return {
    next: (obj) => {
      // console.log("Render");
      let renderer = renderMap.get(obj);
      if (!renderer) {
        renderer = createMesh(scene, "red", 0.1);
        renderMap.set(obj, renderer);
        scene.add(renderer);
        console.log("add", obj.position);
      }
      renderer.position.fromArray(obj.position);
    },
  };
};

sketch(({ render, configure, scene, domElement, camera, resize }) => {
  const grid = createGridHelper();
  const axes = new AxesHelper(3);
  const mousePoint = createMesh(scene, "crimson", 1);
  const s = 0.3;
  mousePoint.scale.set(s, 0, s);
  scene.add(axes);
  // scene.add(grid);
  createSceneBox(scene);

  // dir
  const group = new Group();
  group.position.set(1, 3, 1).multiplyScalar(0.2);
  scene.add(group);
  const dir1 = [-1, 0.5, 0.5];
  const dir1h = createArrowHelper(group, "white", dir1);
  const ax = calcAxes(dir1);
  const rightHelper = createArrowHelper(group, "blue", ax.right);
  const upHelper = createArrowHelper(group, "red", ax.up);

  const vectorHelper = createArrowHelper(scene, "yellow");
  const tmp = new Vector3();

  // Gesture
  gestureStream3d(domElement, camera, resize).subscribe({
    next: (ev) => {
      mousePoint.position.fromArray(ev.pos);
      const target = group.position.toArray();
      const dir = normalize(null, sub3([], ev.pos, target));
      tmp.fromArray(dir);
      // console.log(dir);
      dir1h.setDirection(tmp);
      const axes = calcAxes(dir);
      tmp.fromArray(axes.up);
      upHelper.setDirection(tmp);
      tmp.fromArray(axes.right);
      rightHelper.setDirection(tmp);
    },
    error: () => {},
  });

  /**
   * TODO:
   *
   * A couple of thing.
   *
   * + How do we debug?  If I want to render lines / points for different components?
   * + Having some kind of emit/debug to stream that can be injected into the pipeline
   * + Creation of objects and ECS system.
   * + Shared WeakMap of underlying mapped data.
   * + Emit stream of physics data, convert velocities & positions to line/line-array events... ( similar to geometry processing idea )
   */
  createFrameLoop([createTransform()])
    .transform(
      comp(
        map(beginPhysics()),
        map(forceVector([0, 0.001, 0])),
        map(steerRandomPoint(0.5)),
        map(limitVelocity(0.03)),
        map(endPhysics())
        // map(wrapBoundsScalar(2))
      )
    )
    .subscribe(renderTransform(scene));

  configure({
    width: "1024px",
    height: "768px",
  });

  render(() => {});
});
