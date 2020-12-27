import { ECS, ComponentID, Group } from "@thi.ng/ecs";
import { Type } from "@thi.ng/api";
import { particleSystemComponents } from "./components";

// type Component = "position" | "velocity" | "color" | "age" | "maxage";

interface ECSComps {
  position: Float32Array;
  velocity: Float32Array;
  acceleration: Float32Array;
  age: Uint32Array;
}

type PSystemParams = {
  count: number;
};

export class ParticleSystem<T extends ECSComps> {
  forces: [];
  emitters: [];
  ecs: ECS<T>;
  main: Group<T, "position" | "velocity" | "acceleration" | "age">;

  // components:{ [key of T]:string}
  // components:

  constructor(params: Partial<PSystemParams> = {}) {
    const { count = 100 } = params;

    this.ecs = new ECS<T>(count);

    // Add default components
    this.ecs.defComponent(particleSystemComponents.position());
    this.ecs.defComponent(particleSystemComponents.velocity());
    this.ecs.defComponent(particleSystemComponents.acceleration());
    this.ecs.defComponent(particleSystemComponents.age());

    // @ts-ignore
    this.main = this.ecs.defGroup([
      this.ecs.components.get("position"),
      this.ecs.components.get("velocity"),
      this.ecs.components.get("acceleration"),
      this.ecs.components.get("age"),
    ]);

    // this.main = this.ecs.defGroup([pos, vel]);

    for (let i = 0; i < 10; i++) {
      this.ecs.defEntity([
        this.ecs.components.get("position"),
        this.ecs.components.get("velocity"),
        this.ecs.components.get("acceleration"),
        this.ecs.components.get("age"),
      ]);
    }

    // console.log(pos.packedValues());
    console.log(this.ecs);
  }

  addEmitter(emitter: any) {
    // add emitter
    // check dependencies
    // add dependencies as refs to component ( required for defEntity )
  }

  update() {
    // iterate over emitter creation requests ( via streams )
    // create whilst available capacity.

    // apply forces, behaviours, etc.
    // this part will be compiled to run via compiled js ast
    // or glsl gpu ast.
    let count = 0;
    this.main.forEach(({ position, velocity, id, age }) => {
      position[0] += velocity[0] * 0.01;
      position[1] += velocity[1] * 0.01;
      position[2] += velocity[2] * 0.01;

      count++;
      age[0]--;

      if (age[0] <= 0) {
        this.ecs.deleteID(id);
      }
    });
  }
}

export const createParticlesPointsMesh = () => {};

// Usage
// Create System
// Create Emitter
// - Area Emitter ( emits within a given bounds, at a certain frequency, or when a pulse() method is called )
// - Point Emitter ( emits from a certain point, at a certain frequency of when a pulse methods is called )

// Emitters have a resultant group that is iterated on.
// which would include all particles in that group.

// Behaviours
// - Emitters define behaviours, which are attached to all particles emitted from that emitter.

// Forces
// Are added at the sytem level.
// And... at the emitter level?
