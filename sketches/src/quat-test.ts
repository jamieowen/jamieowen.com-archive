import { GeometryAlignment, sketch } from "@jamieowen/three";
import { set3, sub3, normalize } from "@thi.ng/vectors";
import { mainModule } from "process";
import {
  Euler,
  Matrix4,
  Quaternion,
  Vector3,
  ArrowHelper,
  Scene,
  Group,
  MeshBasicMaterial,
} from "three";
import {
  createMeshFactory,
  createInstancedMesh,
  instancedMeshIterator,
} from "./lib/three";

const mf = createMeshFactory();

const quatTest = () => {
  const group = new Group();
  mf.plane(GeometryAlignment.CENTER);
  const f1 = mf.mesh(group);
  f1.scale.multiplyScalar(3);
  f1.rotation.x = Math.PI * -0.5;

  mf.basicMaterial({
    color: "red",
  });
  mf.sphere(GeometryAlignment.CENTER);
  const s1 = mf.mesh(group);
  const s2 = mf.mesh(group);

  mf.basicMaterial({
    color: "crimson",
  });
  mf.box();
  const b1 = mf.mesh(group);
  b1.scale.set(0.1, 0.1, 3);
  // b1.scale.multiplyScalar(0.2);

  const up = new Vector3(0, 1, 0);
  const v1 = new Vector3(2, 1, -2);
  const v2 = new Vector3(4, 4, 0);

  const quat = new Quaternion();
  const mat = new Matrix4();
  const euler = new Euler();

  b1.position.subVectors(v2, v1).multiplyScalar(0.5).add(v1);

  s1.position.copy(v1);
  s2.position.copy(v2);

  v1.normalize();
  v2.normalize();

  const sub = new Vector3();

  sub.subVectors(v2, v1);
  // sub.normalize();
  // up.normalize();

  console.log("okok");

  // v1.normalize();
  // v2.normalize();

  quat.setFromUnitVectors(v2, v1);
  // mat.makeRotationFromQuaternion(quat);
  b1.setRotationFromQuaternion(quat);
  // b1.setRotationFromMatrix(mat);

  const helper = new ArrowHelper(new Vector3(), undefined, 2);
  helper.position.copy(s1.position);
  group.add(helper);
  helper.setDirection(sub.clone().normalize());
  console.log(sub);
  return group;
};

const lookAtTest = () => {
  const group = new Group();

  mf.basicMaterial({
    color: "green",
  });

  const pos = new Vector3(-2, 3, 0);
  mf.box();
  const obj = mf.mesh(group);
  obj.scale.z = 5;
  obj.scale.multiplyScalar(0.2);

  const dir = new Vector3(2, 1, 0);
  obj.position.copy(pos);
  obj.lookAt(new Vector3().copy(pos).add(dir));

  // obj.lookAt(dir);
  const helper = new ArrowHelper(dir.clone().normalize(), new Vector3(), 4);
  group.add(helper);
  helper.position.copy(pos);
  helper.setDirection(dir.clone().normalize());

  const helper2 = new ArrowHelper(undefined, undefined, 2, "blue");
  group.add(helper2);

  return group;
};

const instanceTest = () => {
  let geom = mf.geometryFactory.create("box");
  geom = geom.clone().applyMatrix4(new Matrix4().makeScale(0.1, 0.1, 3));

  let pgeom = mf.geometryFactory.create("sphere");
  pgeom = pgeom.clone().applyMatrix4(new Matrix4().makeScale(0.1, 0.1, 0.1));

  const group = new Group();
  const count = 20;
  const ins = createInstancedMesh(
    geom,
    new MeshBasicMaterial({
      color: "yellow",
    }),
    count
  );

  const pnt = createInstancedMesh(
    pgeom,
    new MeshBasicMaterial({
      color: "white",
    }),
    count
  );

  const iterator = instancedMeshIterator(ins);
  const quat = new Quaternion();
  const helper = new ArrowHelper(new Vector3(1, 0, 0), undefined, 3, "hotpink");
  group.add(helper);

  let prev = [0, 0, 0];
  iterator((idx, pos, scal, rot) => {
    pos.x = idx * 0.3;
    pos.y = Math.sin(idx) * 0.4;
    pos.z = Math.cos(idx) * 0.7;

    const dir = normalize([], sub3([], pos.toArray(), prev));
    // console.log("Vel", dir);

    if (idx < count) {
      helper.setDirection(new Vector3().fromArray(dir));
      helper.position.fromArray(prev);
    }

    quat.setFromUnitVectors(
      new Vector3().fromArray(dir).normalize(),
      new Vector3()
    );
    rot.setFromQuaternion(quat);

    set3(prev, pos.toArray());
  });

  // pnt.geometry.setAttribute("instance", ins.geometry.getAttribute("position"));
  pnt.instanceMatrix = ins.instanceMatrix;

  group.add(ins);
  // ins.visible = false;
  group.add(pnt);
  group.position.x = -(count * 0.5) * 0.3;
  return group;
};

sketch(({ scene, render, configure, controls }) => {
  const qtest = quatTest();
  scene.add(qtest);

  const ltest = lookAtTest();
  scene.add(ltest);

  const itest = instanceTest();
  scene.add(itest);

  render(() => {});
});
