import { Type } from "@thi.ng/api";
import { MemMappedComponentOpts } from "@thi.ng/ecs";

export const particleSystemComponents = {
  position: (): MemMappedComponentOpts<"position"> => ({
    id: "position",
    type: Type.F32,
    size: 3,
    default: () => [0, 0, 0],
  }),
  acceleration: (): MemMappedComponentOpts<"acceleration"> => ({
    id: "acceleration",
    type: Type.F32,
    size: 3,
    default: () => [0, 0, 0],
  }),
  velocity: (): MemMappedComponentOpts<"velocity"> => ({
    id: "velocity",
    type: Type.F32,
    size: 3,
    default: () => [Math.random(), Math.random(), Math.random()],
  }),
  age: (): MemMappedComponentOpts<"age"> => ({
    id: "age",
    type: Type.I32,
    size: 1,
    default: () => [Math.round(Math.random() * 100) + 100],
  }),
};
