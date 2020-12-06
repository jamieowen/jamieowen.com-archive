import { BufferGeometry, InstancedBufferGeometry, Material } from "three";
import { DrawState } from "~packages/three-drawcontext";

export class DrawBuffer {
  id: string;
  material: Material;
  instance: BufferGeometry;
  instanced: InstancedBufferGeometry;
  drawRange = {
    start: 0,
    end: 0,
  };
  constructor(material: Material, instance: BufferGeometry) {
    this.instance = instance;
    this.material = material;
    this.instanced = new InstancedBufferGeometry();
  }

  reset() {
    this.drawRange.start = 0;
    this.drawRange.end = 0;
  }
}

export const createBuffer = (material: Material, geometry: BufferGeometry) => {
  console.log("Create", material, geometry);
  return new DrawBuffer(material, geometry);
};
