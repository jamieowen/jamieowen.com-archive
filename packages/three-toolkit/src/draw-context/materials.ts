import { MeshBasicMaterial, MeshLambertMaterial } from "three";
import { MaterialId } from "./DrawContext";
export const createMaterial = (material: MaterialId) => {
  switch (material) {
    case "basic":
      return new MeshBasicMaterial({
        vertexColors: true,
      });
    case "lambert":
      return new MeshLambertMaterial({
        vertexColors: true,
      });
  }
};
