import { defn, ret, add, vec3 } from "@thi.ng/shader-ast";
import { targetJS } from "@thi.ng/shader-ast-js";

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

export class ParticleSystem {
  constructor() {}
  update() {}
}
