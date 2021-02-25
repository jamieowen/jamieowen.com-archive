import { create } from "lodash";
import { Group, Material, Object3D, BackSide } from "three";
import { createMeshFactory } from "./mesh-factory";

const meshFactory = createMeshFactory();

export const createDomeScene = (parent?: Object3D) => {
  const group = new Group();
  if (parent) {
    parent.add(group);
  }
  meshFactory.basicMaterial({
    color: "white",
    side: BackSide,
  });

  const floor = meshFactory.mesh();
  const dome = meshFactory.mesh();

  group.add(floor);
  group.add(dome);

  dome.scale.multiplyScalar(5);

  return {
    group,
    dome,
    floor,
  };
};
