import {
  Mesh,
  BufferGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshBasicMaterialParameters,
  MeshStandardMaterialParameters,
  SphereBufferGeometry,
  Object3D,
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

  constructor() {
    this.setMaterial(
      {
        color: "white",
      },
      MeshBasicMaterial
    );
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
      new SphereBufferGeometry(1, 1, 1),
      new this.nextMaterialClass(this.nextMaterialParams)
    );
    if (parent) {
      parent.add(mesh);
    }
    console.log("mesh", parent, mesh);
    return mesh;
  }
}

export const createMeshFactory = () => {
  return new MeshFactory();
};
