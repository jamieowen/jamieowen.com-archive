import { defn, ret, add, vec3 } from "@thi.ng/shader-ast";
import { targetJS } from "@thi.ng/shader-ast-js";
import { Vec3Like } from "@thi.ng/vectors";
import { ECS, ComponentID } from "@thi.ng/ecs";
import { Type } from "@thi.ng/api";

type Component = "position" | "velocity" | "color" | "age" | "maxage";

const addGravity = defn(
  "vec3",
  "addGravity",
  ["vec3", "vec3"],
  (position, velocity) => {
    return [ret(add(vec3(0, 1, 0), velocity))];
  }
);

// create compiler?
const compileJs = targetJS();
const res = compileJs(addGravity);
console.log("AST");
console.log(res);
const Module = compileJs.compile(addGravity);

console.log(Module.addGravity([0, 0, 0], [1, 1, 1]));

export const particleSystem = (components: [], maxCount: 1000) => {
  // create buffer per componnet
  // add
  // iterator
  // update, add all forces to velocity, add velocity to position.
  // how to spawn?
  // emitters?
};

interface AstFnDefinition {}

interface IEmitter {
  position: Vec3Like[];
  type: "point" | "sphere" | "cube";
  initialVelocity: AstFnDefinition;
}

interface IForce {
  define: AstFnDefinition;
}

interface IParticleBehaviour {
  // todo..
}

interface ECSComps {
  position: Float32Array;
  velocity: Float32Array;
  color: Float32Array;
}

type PSystemParams = {
  count: number;
};

export class ParticleSystem<T extends ECSComps> {
  forces: [];
  emitters: [];
  ecs: ECS<T>;

  constructor(params: Partial<PSystemParams> = {}) {
    const { count = 100 } = params;
    this.ecs = new ECS<T>(count);

    const pos = this.ecs.defComponent({
      id: "position",
      type: Type.F32,
      size: 3,
      default: () => [0, 0, 0],
    });

    const vel = this.ecs.defComponent({
      id: "velocity",
      type: Type.F32,
      size: 3,
      default: () => [0, 1, 0],
    });

    const group = this.ecs.defGroup([pos, vel]);
    for (let i = 0; i < count; i++) {
      this.ecs.defEntity([pos, vel]);
    }

    group.forEach(({ position, velocity, id }) => {
      console.log("pos", id, position);
    });

    console.log(pos);

    console.log(pos.packedValues());
    console.log(pos.sparse);

    console.log(this.ecs);
  }

  emit(emitterID: string) {}
  update() {}
}
