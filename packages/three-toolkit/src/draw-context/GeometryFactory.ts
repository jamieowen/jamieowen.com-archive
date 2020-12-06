import { Fn, Fn0 } from "@thi.ng/api";
import { memoize1 } from "@thi.ng/memoize";
import { BufferGeometry, SphereBufferGeometry, BoxBufferGeometry } from "three";

type GeometryFactoryMap = Map<string, Fn0<BufferGeometry>>;

export const createGeometryFactoryMap = () => {
  const map: GeometryFactoryMap = new Map();
  registerSphere(map);
  registerBox(map);
  return map;
};

const defineGeometry = (id: string, create: Fn0<BufferGeometry>) => (
  map: GeometryFactoryMap
) => map.set(id, memoize1(create));

export const registerSphere = defineGeometry(
  "sphere",
  () => new SphereBufferGeometry()
);

export const registerBox = defineGeometry("box", () => new BoxBufferGeometry());
