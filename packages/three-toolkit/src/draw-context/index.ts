import {
  Object3D,
  Scene,
  BoxBufferGeometry,
  SphereBufferGeometry,
  BufferGeometry,
  Color,
  Vector3,
  Euler,
  Material,
  InstancedBufferGeometry,
} from "three";
import { Fn0, Fn } from "@thi.ng/api";
import { Vec3Like } from "@thi.ng/vectors";
import { memoize1 } from "@thi.ng/memoize";
import { EquivMap } from "@thi.ng/associative";
export * from "./GeometryFactory";
export * from "./DrawContext";

// type GeomFactory<T> = (params: ConstructorParameters<T>) => BufferGeometry;
// export function defineGeometry<T extends BufferGeometry>(
//   factory: GeomFactory<T>
// ) {
//   return factory();
// }

// export const sphere = () =>
//   defineGeometry((params) => SphereBufferGeometry.bind.apply(this, params));

interface IDrawState {
  color: Color;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  material: MaterialId;
  geometry: GeometryId;
}

type BufferSignature = string;
type MaterialId = "basic" | "lambert" | "phong" | "standard";
type GeometryId = string | "sphere" | "box";
type GeometryFactory = (id: GeometryId) => BufferGeometry;

interface IDrawContext {
  state: IDrawState;
  buffers: Map<BufferSignature, IDrawBuffer>;
  geometries: Map<GeometryId, GeometryFactory>;
}

class DrawContext implements IDrawContext {
  state: IDrawState = {
    color: new Color(),
    position: new Vector3(),
    scale: new Vector3(),
    rotation: new Euler(),
    material: "basic",
    geometry: "sphere",
  };
  buffers = new Map();
  geometries = new Map();
}

interface IDrawBuffer {
  id: string;
  material: Material;
  geometry: InstancedBufferGeometry;
  drawRange: {
    start: number;
    end: number;
  };
}

class DrawBuffer implements IDrawBuffer {
  id: BufferSignature;
  material: Material;
  geometry: InstancedBufferGeometry;
  drawRange = {
    start: 0,
    end: Infinity,
  };
  constructor(geometry: BufferGeometry, material: Material) {
    this.material = material;
    this.geometry = new InstancedBufferGeometry();
  }

  setFromState: (state: IDrawState) => {};
}

const context = new DrawContext();
const getContext = (apply: Fn<DrawContext, void>) => {
  apply(context);
};

export const getBufferSigature = (state: IDrawState) => {
  return [state.material, state.geometry].join("/");
};

const drawInstancedMesh = (geomType: string) =>
  getContext((context) => {
    context.state.geometry = geomType;
    const buffer = getBufferSigature(context.state);
    const geometry = context.geometries.get(geomType)();
    console.log("Draw State", buffer, geometry);
  });

export const color = (color: string | number) =>
  getContext(({ state }) => {
    state.color.set(color);
  });

export const position = (position: Vec3Like) =>
  getContext(({ state }) => {
    state.position.x = position[0];
    state.position.y = position[1];
    state.position.z = position[2];
  });

export const lambertMaterial = () =>
  getContext((context) => (context.state.material = "lambert"));

export const defineGeometry = (id: GeometryId, factory: GeometryFactory) =>
  getContext((context) => {
    context.geometries.set(id, factory);
  });

export const createGeometry = (id: GeometryId) => getContext(() => {});

// export const sphereGeom = (
//   ...params: ConstructorParameters<typeof SphereBufferGeometry>
// ) =>
//   memoize((params) => {
//     console.log("Memo:", params);
//     return {};
//   }, null);

// export const testMemo = memoize(
//   (x, y) => (console.log("exec", x, y), x[0] * y[0] + x[1] * y[1]),
//   new EquivMap()
// );
// export const sphere = (params: ConstructorParameters<typeof SphereBufferGeometry>) => memoize(()=>)

export const sphere = () => drawInstancedMesh("sphere");
export const box = () => drawInstancedMesh("sphere");

export const drawContext = (obj: Object3D | Scene, draw: Fn0<void>) => {
  // collect buffer info.

  // define geometries...
  defineGeometry(
    "sphere",
    memoize1((id) => {
      console.log("create sphere");
      return new SphereBufferGeometry();
    })
  );

  defineGeometry(
    "box",
    memoize1((id) => new BoxBufferGeometry())
  );

  draw();
  getContext((context) => {});
};
