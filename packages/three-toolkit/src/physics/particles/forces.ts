import { defn, ret, add, vec3, TaggedFn0 } from "@thi.ng/shader-ast";

export const gravity = defn(
  "vec3",
  "gravityForce",
  ["vec3", "vec3", "vec3"],
  (position, velocity, acceleration) => {
    return [ret(add(vec3(0, 1, 0), acceleration))];
  }
);

export const friction = defn(
  "vec3",
  "gravityForce",
  ["vec3", "vec3", "vec3"],
  (position, velocity, acceleration) => {
    return [ret(add(vec3(0, 1, 0), acceleration))];
  }
);
