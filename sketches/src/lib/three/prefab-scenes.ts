import {
  Group,
  Object3D,
  BackSide,
  DoubleSide,
  SphereBufferGeometry,
} from "three";
import { createMeshFactory } from "./mesh-factory";

const mf = createMeshFactory();

export const createDomeScene = (parent?: Object3D) => {
  const group = new Group();
  if (parent) {
    parent.add(group);
  }

  // Reset
  mf.scale.set(1, 1, 1);
  mf.scale.multiplyScalar(30);

  // Dome
  mf.lambertMaterial({
    color: "crimson",
    side: BackSide,
  });

  const geom = new SphereBufferGeometry(1, 20, 2);
  mf.setGeometry(geom);
  const dome = mf.mesh(group);

  // Floor
  mf.lambertMaterial({
    // mf.standardMaterial({
    color: "crimson",
    side: DoubleSide,
    emissive: "crimson",
    emissiveIntensity: 0.6,
  });
  mf.scale.multiplyScalar(10);
  mf.plane();
  const floor = mf.mesh(group);
  floor.rotation.x = Math.PI * -0.5;

  return {
    group,
    dome,
    floor,
  };
};
