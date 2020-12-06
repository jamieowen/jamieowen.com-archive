import {
  BoxBufferGeometry,
  SphereBufferGeometry,
  PlaneBufferGeometry,
} from "three";
import { GeometryFactory } from "./GeometryFactory";

export function createGeometryFactory() {
  const factory = new GeometryFactory();
  factory.register("box", () => new BoxBufferGeometry());
  factory.register("sphere", () => new SphereBufferGeometry());
  factory.register("plane", () => new PlaneBufferGeometry());
  return factory;
}
