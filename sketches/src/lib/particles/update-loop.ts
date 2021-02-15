import {
  defn,
  sym,
  arraySym,
  float,
  vec4,
  ifThen,
  bool,
  ret,
  Vec3Term,
  vec3,
  add,
  assign,
} from "@thi.ng/shader-ast";

// Notes: ( not following but here as ref )
// https://gamedev.stackexchange.com/questions/71900/how-can-i-calculate-force-and-acceleration

/**
 * Forces are just some action added to an acceleration vector
 */

const gravity = (grav: Vec3Term) => (
  position: Vec3Term,
  velocity: Vec3Term
): Vec3Term => {
  return grav;
};

// type Force = (pos: Vec3Term, vel: Vec3Term) => Vec3Term;

type Force = () => Vec3Term;

export const addForce = (val: number): Force => () => vec3(val);

export const positionUpdate = (forces: Force[] = []) => {
  return defn(
    "vec3",
    "positionUpdate",
    [
      ["vec3", "position"],
      ["vec3", "velocity"],
      ["float", "age"],
    ],
    (position, velocity, age) => {
      const accel = sym<"vec3">(vec3(0));
      const accum = forces.map((f) => {
        return assign(accel, add(accel, f()));
      });

      return [
        accel,
        ...accum,
        assign(velocity, add(velocity, accel)),
        assign(position, add(position, velocity)),
        ret(position),
      ];
    }
  );
};

/**
 * Temp func to log return types of objects.
 */
export const debugAstTypes = () => {
  console.log("vec4", vec4(10));
  console.log("float", float(10));
  console.log("if", ifThen(bool(true), [vec4(2)], [vec4(3)]));
  console.log("sym", sym(vec4(10)));
};

export const debugShader = () => {
  return defn(
    "vec3",
    "debugOut",
    [
      ["vec3", "position"],
      ["vec3", "accell"],
      ["vec3", "age"],
    ],
    (pos, acc, age) => {
      return [ret(vec3(0))];
    }
  );
};

// Notes.

// Sym is a a symbol definition. I.e : vec4 test = vec4();
// Hot to define an array?
