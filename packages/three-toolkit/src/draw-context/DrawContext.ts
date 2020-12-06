import {
  Color,
  Euler,
  Material,
  Object3D,
  Vector3,
  WebGLRenderer,
} from "three";
import { createGeometryFactoryMap } from "./GeometryFactory";
import { Vec3Like } from "@thi.ng/vectors";
import { createBuffer, DrawBuffer } from "./DrawBuffer";
import { createMaterial } from "./materials";

export type MaterialId =
  | "basic"
  | "lambert"
  | "phong"
  | "standard"
  | "physical"
  | string;
export type GeometryId = string;
export type BufferSignature = [MaterialId, GeometryId];

export class DrawState {
  private object: Object3D = new Object3D();
  rotation: Euler;
  scale: Vector3;
  position: Vector3;
  material: MaterialId;
  geometry: GeometryId;
  color: Color = new Color();

  constructor() {
    this.rotation = this.object.rotation;
    this.position = this.object.position;
    this.scale = this.object.scale;
  }
}

export class DrawContext {
  state: DrawState = new DrawState();
  buffers = new Map<string, DrawBuffer>();
  geometries = createGeometryFactoryMap();

  constructor(renderer: WebGLRenderer) {
    this.standardMaterial();
  }

  begin() {
    for (let buffer of this.buffers.values()) {
      buffer.reset();
    }
  }

  basicMaterial() {
    this.state.material = "basic";
  }

  lambertMaterial() {
    this.state.material = "lambert";
  }

  phongMaterial() {
    this.state.material = "phong";
  }

  standardMaterial() {
    this.state.material = "standard";
  }

  physicalMaterial() {
    this.state.material = "physical";
  }

  position(position: Vec3Like) {
    this.state.position.x = position[0];
    this.state.position.y = position[1];
    this.state.position.z = position[2];
  }
  color(color: string | number | Color) {
    this.state.color.set(color);
  }

  sphere() {
    this.state.geometry = "sphere";
    this.pushState();
  }

  box() {
    this.state.geometry = "box";
    this.pushState();
  }

  private pushState() {
    // get buffer signature
    // get / create buffer.
    // push state to buffer

    const buffer = this.getBuffer();
    console.log("push instanced");
  }

  private getBufferSignature(): BufferSignature {
    return [this.state.material, this.state.geometry];
  }

  private getBuffer(): DrawBuffer {
    const signature = this.getBufferSignature().join("/");
    if (this.buffers.has(signature)) {
      return this.buffers.get(signature);
    } else {
      console.log("create");
      const material = createMaterial(this.state.material);
      const geometry = this.geometries.get(this.state.geometry)();
      const buffer = createBuffer(material, geometry);
      this.buffers.set(signature, buffer);
    }
  }
}
