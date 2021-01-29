console.log("okk");
import { defn, div, sym, ret, Vec3Term } from "@thi.ng/shader-ast";

// const f = defn(asd,asd,)

// Inline Options for behaviours

// const gravity = ( )

ret();
export default {};

// worth looking at : https://github.com/thi-ng/umbrella/blob/develop/examples/shader-ast-canvas2d/src/index.ts

const gravity = (targ: Vec3Term, grav: Vec3Term) => {};

// brain dump..
/**
 * What am i trying to achieve?
 *
 * The speed of gpu but with the flexibility of being able to run on the CPU too.
 *
 * What operations are performed and where?
 * In the case of boids or some path following/collision detection movements, running on the Cpu, it would be useful to
 * access scene information. ( bounds, paths, nearest neighbours )
 *
 * GPU Preperation? ECS Buffers vs Textures.
 * From what i remember an initial data texture is used that takes a float array as source. When operating
 * on the GPU we read from a sampler object, perform operations on the data, then write the data back to
 * the draw buffer.  This is where multiple render buffers, or multiple passes are needed if this extension is
 * not available.
 *
 * If initialisation happens on the CPU, once data is commited and updates happen, the data between CPU/GPU is
 * now out of sync and its unrealistic to expect this to be synced.  So you make the decision to run a sim
 * on the CPU or GPU to begin with.
 *
 * Performing particle effects on the CPU gives the most flexibility in artistic terms. ( collision, interactoin, etc )
 * The aim though is to push as much to the gpu as possible. For example, creating ribbon effects, the particle is
 * integrated on the CPU, pushed to the gpu, where history is maintained and ribbon extrusion happens.
 *
 * The benefits of using a shader-ast approach is that if all particle computation is needed on the GPU, it can
 * be pushed there easily.
 *
 * Particle Emission
 * Handling particle emission may be a little tricky when catering for both CPU and GPU modes.  How are particles
 * created and at one point do they respawn?
 *
 * The simplest case is each particle is given an age, which is decremented each over time. Once it is less than 0
 * it is reset back to its start age or another random min/max age.  This will give a constant stream
 * of particles.
 *
 * The second option is particles are emitted on some event, ( a user interaction at a point, or on a timer frequency )
 *
 * It would be important to seperate the stages/passes of the particle life cycle up.
 * The stages would be emission, integration, death/life check, ??
 *
 */

/**
 * Use the ECS System to define the core paritcle system manager.
 *
 * Add emitters to the system that define a behaviour.
 * Add global behaviours/forces to the system.
 *
 * Behaviours are a collection of
 *
 * Define a life cycle that :
 * 1. emits given a buffer emit events.
 * 2. updates all particles with their behaviour
 * 3. updates global behiours and forces
 * 4. checks particle life and queues freed particles.
 *
 * Multiple passes or used for some stages of the lifecycle.
 *
 */
