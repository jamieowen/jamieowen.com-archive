import { AmbientLight, DirectionalLight, PointLight, Group } from "three";

export const basicLightingSetup = () => {
  const ambient = new AmbientLight("blue", 0.2);
  const dir = new DirectionalLight();
  const point = new PointLight();

  const group = new Group();
  group.add(point);
  group.add(dir);
  group.add(ambient);
  dir.position.set(1, 1, 1);
  point.position.set(-2, 1, 2);

  // const controls = {};
  // return [group, controls];
  return group;
};
