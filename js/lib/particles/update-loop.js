import {
  defn,
  sym,
  float,
  vec4,
  ifThen,
  bool,
  ret,
  vec3,
  add,
  assign
} from "../../../_snowpack/pkg/@thi.ng/shader-ast.js";
const gravity = (grav) => (position, velocity) => {
  return grav;
};
export const addForce = (val) => () => vec3(val);
export const positionUpdate = (forces = []) => {
  return defn("vec3", "positionUpdate", [
    ["vec3", "position"],
    ["vec3", "velocity"],
    ["float", "age"]
  ], (position, velocity, age) => {
    const accel = sym(vec3(0));
    const accum = forces.map((f) => {
      return assign(accel, add(accel, f()));
    });
    return [
      accel,
      ...accum,
      assign(velocity, add(velocity, accel)),
      assign(position, add(position, velocity)),
      ret(position)
    ];
  });
};
export const debugAstTypes = () => {
  console.log("vec4", vec4(10));
  console.log("float", float(10));
  console.log("if", ifThen(bool(true), [vec4(2)], [vec4(3)]));
  console.log("sym", sym(vec4(10)));
};
export const debugShader = () => {
  return defn("vec3", "debugOut", [
    ["vec3", "position"],
    ["vec3", "accell"],
    ["vec3", "age"]
  ], (pos, acc, age) => {
    return [ret(vec3(0))];
  });
};
