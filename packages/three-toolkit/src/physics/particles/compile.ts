// import { defn, ret, add, vec3 } from "@thi.ng/shader-ast";
// import { targetJS } from "@thi.ng/shader-ast-js";
// import { Vec3Like } from "@thi.ng/vectors";

// const addGravity = defn(
//   "vec3",
//   "addGravity",
//   ["vec3", "vec3"],
//   (position, velocity) => {
//     return [ret(add(vec3(0, 1, 0), velocity))];
//   }
// );

// // create compiler?
// const compileJs = targetJS();
// const res = compileJs(addGravity);
// // console.log("AST");
// // console.log(res);
// const Module = compileJs.compile(addGravity);
