export { c as compileProgramAst, i as gpgpuFragmentBase, f as gpgpuQuadVertexShader, g as gpgpuSetup, h as gpgpuTriangleVertexShader, j as gpgpuWriteOperation, b as linesFragmentShader, l as linesVertexShader, p as particleLinesProgram, a as particlePointsProgram, e as pointsFragmentShader, d as pointsVertexShader } from '../common/ast-compile-helpers-fffc4db5.js';
import { i as ifThen } from '../common/controlflow-bb34ce5e.js';
import { a as assign, b as add, j as gt, k as defn, s as sub, l as $, r as ret, c as div, m as mul, f as $x, e as $y, n as $z, g as $w, h as $xyz } from '../common/swizzle-b9f66e93.js';
import { f as float, s as sym, a as vec2, d as vec3, u as uniform, i as input } from '../common/item-0dc2ff74.js';
import { s as snoiseVec3 } from '../common/simplex3-2b6df40b.js';
import { t as texture } from '../common/texture-5272c311.js';
import '../common/target-1201c05a.js';
import '../common/target-6ab9d31f.js';
import '../common/deferror-f4141613.js';
import '../common/is-plain-object-24968a48.js';
import '../common/unsupported-d467609e.js';
import '../common/deferror-480a42fb.js';
import '../common/is-number-dd4646bb.js';
import '../common/is-boolean-6acf0f42.js';
import '../common/math-ac89117e.js';
import '../common/is-node-e2ac186a.js';
import '../common/_node-resolve:empty-5550de3c.js';
import '../common/map-ab3a157d.js';
import '../common/implements-function-c507affc.js';
import '../common/filter-75019789.js';
import '../common/is-array-a7fa88fb.js';
import '../common/is-string-40d6c094.js';

/**
 *
 * Advance age by decay amount, by assigning
 * decay + age to age symbol.
 *
 * Once age > 1.0, reset age to 0.0 and apply
 * dead terms.
 *
 * @param age
 * @param decay
 * @param dead
 */
const advanceAgeByDecay = (age, decay, dead) => {
    return ifThen(gt(age, float(1.0)), [assign(age, float(0.0)), ...dead], [assign(age, add(age, decay))]);
};
/**
 *
 * Same as @see advanceAgeByDecay(),
 * but assign an emitter term to
 * the position.
 *
 * @param age
 * @param decay
 * @param emitter
 */
const advanceAgeByDecayEmit = (age, decay, position, emitter) => advanceAgeByDecay(age, decay, [assign(position, emitter)]);

const curlNoise3 = defn("vec3", "curlNoise3", ["vec3", "float"], (p, e) => {
    let D;
    let px0;
    let px1;
    let py0;
    let py1;
    let pz0;
    let pz1;
    return [
        (D = sym(vec2(e, 0))),
        (px0 = sym(snoiseVec3(sub(p, $(D, "xyy"))))),
        (px1 = sym(snoiseVec3(add(p, $(D, "xyy"))))),
        (py0 = sym(snoiseVec3(sub(p, $(D, "yxy"))))),
        (py1 = sym(snoiseVec3(add(p, $(D, "yxy"))))),
        (pz0 = sym(snoiseVec3(sub(p, $(D, "yyx"))))),
        (pz1 = sym(snoiseVec3(add(p, $(D, "yyx"))))),
        ret(div(vec3(add(sub(sub($z(py1), $z(py0)), $y(pz1)), $y(pz0)), add(sub(sub($x(pz1), $x(pz0)), $z(px1)), $z(px0)), add(sub(sub($y(px1), $y(px0)), $x(py1)), $x(py0))), mul(2, e))),
    ];
});

/**
 *
 * Accumulates provided forces.
 * This is an 'inline' approach without using glsl functions.
 *
 * @example
 * // glsl output
 * vec3 transformP = position;
 * vec3 transformV = velocity;
 * transformV = transformV + vec3(0.0,0.23,0.0);
 * transformV = transformV + curlNoise(position,0.3);
 * // etc ( per force )
 *
 * transformP = position + velocity;
 * // cap velocity speed.
 *
 *
 * @param position
 * @param velocity
 * @param mass
 * @param age
 * @param forces
 */
const accumulateForces = (position, velocity, mass, age, forces) => {
    const transformP = sym(position);
    const transformV = sym(vec3(0.0));
    // const transformV = sym(velocity); // TODO
    return [
        transformP,
        transformV,
        ...forces.map((f) => assign(transformV, add(transformV, f(position, velocity, mass, age)))),
        assign(transformP, add(position, transformV)),
        // temp ts fix??
    ];
};
// From Previous
// Including velocity? - needs capping and resetting at emission point
// const transformed = sym(
//   add(position, add(velocity, add(gravity, mul(curl, vec3(curlScale)))))
// );
// No Velocity
// const transformed = sym(
//   add(position, add(gravity, mul(curl, curlScale)))
// );
const gravity = (constant) => {
    return (position) => {
        // don't return a sym term here. Probably to map cat
        return constant;
    };
};
const curlPosition = (scale, input) => {
    return (position) => {
        return mul(scale, curlNoise3(position, input));
    };
};

/**
 * Given a basic 'constants' texture ( RGBA ), and presuming
 * that r & g are mass and decay. the other two
 */
const readConstants = (v_Uv) => {
    // Decl
    const u_constants = uniform("sampler2D", "constants");
    // Main
    const con = sym(texture(u_constants, v_Uv));
    const mass = sym($x(con));
    const decay = sym($y(con));
    const opt1 = sym($z(con));
    const opt2 = sym($w(con));
    return {
        decl: [u_constants],
        main: [con, mass, decay, opt1, opt2],
    };
};

/**
 *
 * @description
 *
 * Declare setup for 2 state values,
 * read them in a
 *
 * @example
 *
 * const read = readState2();
 * return program([
 *  ...read.decl,
 *  defMain(()=>[
 *    ...read.main
 *  ])
 * ])
 */
const readState2 = () => {
    // Decl
    const uni_state1 = uniform("sampler2D", "state_1");
    const uni_state2 = uniform("sampler2D", "state_2");
    const input_vUv = input("vec2", "vReadUV"); // TODO: Rename vReadUV - vUv
    // Main
    const s1 = sym(texture(uni_state1, input_vUv));
    const s2 = sym(texture(uni_state2, input_vUv));
    const position = sym($xyz(s1));
    // const velocity = sym(sub($xyz(s2), $xyz(s1)));
    const velocity = sym(sub($xyz(s1), $xyz(s2)));
    const age = sym($w(s1));
    return {
        // Enforce types.
        // Typescript seems to only apply a union / or type on array contents ( not order )
        decl: [uni_state1, uni_state2, input_vUv],
        main: [s1, s2, position, velocity, age],
    };
};
// ++ readState1

export { accumulateForces, advanceAgeByDecay, advanceAgeByDecayEmit, curlPosition, gravity, readConstants, readState2 };
