import { Stream } from "@thi.ng/rstream";
import { defn } from "@thi.ng/shader-ast";
import { Type } from "@thi.ng/api";
import { MemMappedComponentOpts } from "@thi.ng/ecs";

export type AstDef = ReturnType<typeof defn>;
// export type Force = ReturnType<typeof defn>;
export type SpawnLocation = ReturnType<typeof defn>;

export interface ForceDef {
  id: string;
  fn: AstDef;
  components: [];
}

export interface EmitterDef {
  id: string;
  signature: string;
  behaviours: ForceDef[];
  // spawn: SpawnLocation;
}

export interface EmitterEvent {
  type: "emit";
  emitter: IEmitter;
}

export type EmitterStream = Stream<EmitterEvent>;

export interface IEmitter {
  stream: EmitterStream;
  definition: EmitterDef;
  emit: () => void;
}

export const components = {
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
    // default: () => [Math.round(Math.random() * 100) + 100],
  }),
};
