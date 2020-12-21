import { fromRAF, ISubscribable, StreamSync, sync } from "@thi.ng/rstream";
import { GestureStream, GestureType } from "@thi.ng/rstream-gestures";
import { map } from "@thi.ng/transducers";
import { Vec3Like, add3, mulN3, Vec3 } from "@thi.ng/vectors";
import { RafStream } from "./types";

export interface IParticle {
  acceleration: Vec3Like;
  velocity: Vec3Like;
}

export interface ITransform {
  position: Vec3Like;
  scale: Vec3Like;
  rotation: Vec3Like;
}

export class Transform implements ITransform {
  position: [0, 0, 0];
  scale: [0, 0, 0];
  rotation: [0, 0, 0];
}

export class Particle extends Transform implements IParticle {
  acceleration: [0, 0, 0];
  velocity: [0, 0, 0];
}

export type IForce = (particle: IParticle) => Vec3Like;

export const applyForce = () => {};
/**
 * A singular particle Stream class for use in simple
 * particle style effects.  Think gestures ( throw, drag, etc ) and
 * simple primary motion elements like mouse follow effects.
 */
// export class ParticleStream
//   extends StreamSync<{ raf: RafStream }>
//   implements IParticle {
//   acceleration: [0, 0, 0];
//   velocity: [0, 0, 0];
//   position: [0, 0, 0];
//   forces: IForce[];
//   // mass, friction?

//   constructor(raf: RafStream = fromRAF()) {
//     super({
//       src: {
//         raf,
//       },
//       xform: map((val) => {
//         // update
//         this.forces.forEach((f) => add3(null, this.acceleration, f(this)));
//         add3(null, this.velocity, this.acceleration);
//         mulN3(null, this.acceleration, 0);
//         add3(null, this.position, this.velocity);

//         return val;

//         /**
//           velocity.add(acceleration);
//           velocity.limit(topspeed);
//           location.add(velocity);
//       * */
//       }),
//     });
//   }

//   addForce(force: IForce) {
//     this.forces.push(force);
//   }

//   removeForce(for)
// }

// HOW BEST TO SRUCTIRE A PARTICLE?
// ABOVE IS THE STREMA CLASS APPRACH.
// BELOW WOULD BE A FUNCTION STREAM ONLY.
// PERHAPS A 3rd OPION IS TO CREATE A PARTICLE CLASS
// IN USUAL OO SETUP, THEN USE AN INSTANCE
// OF THAT IN THE DRAG GESTURE STREAM
// THE MOTION BLEND STUFF IS NICE - IN THAT IT IS RETURNING
// BASIC POSITION STREAM EVENTS. ALL EVAULATING TO A POSITION
// SHOULD THE PARTICLES BE ADAPTABLE TO THIS?
// PERHAPS THE PARTICLE SHOULD BE A CLASS, THIS WAY A NUMBER OF
// THEN CAN BE CONTROLLED IN TYPICAL WAY WITH A SYSTEM OBJECT. NOT THE SAME AS THE GPI/CPU SYS THOUGH.
// THEN THE POSITION EVENT IS COMPATITLE WITH OTHER VEC STREAMS.

// type ParticleStream = StreamSync<
export const particleStream = (
  rafStream?: RafStream,
  opts?: { forces: IForce[] }
) => {
  const acceleration = [0, 0, 0];
  const velocity = [0, 0, 0];
  const position = [0, 0, 0];

  const forces = [];

  // Not entirely sold on passing api methods down stream.
  // Seems like these should be class methods.
  const addForce = () => {};
  const removeForce = () => {};
  const addForceOnce = () => {};

  return sync({
    src: {
      raf: fromRAF(),
    },
    xform: map(() => {
      //         this.forces.forEach((f) => add3(null, this.acceleration, f(this)));
      //         add3(null, this.velocity, this.acceleration);
      //         mulN3(null, this.acceleration, 0);
      //         add3(null, this.position, this.velocity);
    }),
  });
};

/**
 * Applies a drag force to a particle and returns the particle
 * stream.
 *
 * @param gesture
 * @param raf
 * @param particle
 * @param opts
 */
export const dragParticleGesture = (
  gesture: GestureStream,
  particle?: ParticleStream,
  opts?: {}
) => {
  // convert raf to delta time ?
  if (!particle) {
    particle = new ParticleStream();
  }

  return sync({
    src: {
      gesture,
      particle,
    },
    xform: map(({ gesture, particle }) => {
      // store state? ( scan? )
      // drag
      // gesture down
      switch (gesture.type) {
        case GestureType.START:
          break;
        case GestureType.END:
          break;
        case GestureType.DRAG:
          console.log("DRAG", gesture);
          break;
      }

      return particle;
      // gesture move
      // gesture release
      // apply force
      // inertia
    }),
  });
};
