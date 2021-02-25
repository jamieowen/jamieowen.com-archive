import { createGeometryFactory, GeometryFactory } from "@jamieowen/three";
import {
  Mesh,
  BufferGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshBasicMaterialParameters,
  MeshStandardMaterialParameters,
  SphereBufferGeometry,
  Object3D,
  Vector3,
} from "three";

type MaterialParamType =
  | MeshBasicMaterialParameters
  | MeshStandardMaterialParameters;

type MaterialClass<T> = new (...args: any[]) => T;

type MaterialClassType =
  | MaterialClass<MeshBasicMaterial>
  | MaterialClass<MeshStandardMaterial>;

export class MeshFactory {
  nextMaterialParams: MaterialParamType;
  nextMaterialClass: MaterialClassType;
  nextGeometry: BufferGeometry;
  geometryFactory: GeometryFactory = createGeometryFactory();
  scale: Vector3 = new Vector3(1, 1, 1);

  constructor() {
    this.setMaterial(
      {
        color: "white",
      },
      MeshBasicMaterial
    );
    this.sphere();
  }

  setGeometry(geometry: BufferGeometry) {
    this.nextGeometry = geometry;
  }

  plane() {
    this.setGeometry(this.geometryFactory.create("plane"));
  }

  sphere() {
    this.setGeometry(this.geometryFactory.create("sphere"));
  }

  box() {
    this.setGeometry(this.geometryFactory.create("box"));
  }

  setMaterial(params: MaterialParamType, cls: MaterialClassType) {
    this.nextMaterialParams = params;
    this.nextMaterialClass = cls;
  }

  basicMaterial(params: MeshBasicMaterialParameters) {
    this.setMaterial(params, MeshBasicMaterial);
  }

  standardMaterial(params: MeshStandardMaterialParameters) {
    this.setMaterial(params, MeshStandardMaterial);
  }

  mesh(parent?: Object3D) {
    const mesh = new Mesh(
      this.nextGeometry,
      new this.nextMaterialClass(this.nextMaterialParams)
    );
    if (parent) {
      parent.add(mesh);
    }
    mesh.scale.copy(this.scale);
    return mesh;
  }
}

export const createMeshFactory = () => {
  return new MeshFactory();
};
