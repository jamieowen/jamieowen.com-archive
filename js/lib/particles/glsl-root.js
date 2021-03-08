import {
  assign,
  defMain,
  input,
  program,
  uniform,
  mul,
  vec3,
  vec4,
  sym,
  ret,
  defn
} from "../../../_snowpack/pkg/@thi.ng/shader-ast.js";
export const systemVertexShader = (target) => {
  const position = input("vec3", "position");
  const color = input("vec3", "color");
  const textureIn = uniform("sampler2D", "textureIn");
  const modelViewMatrix = uniform("mat4", "modelViewMatrix", {});
  const projectionMatrix = uniform("mat4", "projectionMatrix");
  const transformed = sym(position);
  return program([
    modelViewMatrix,
    projectionMatrix,
    position,
    color,
    textureIn,
    defMain(() => [
      transformed,
      particleModel(transformed),
      assign(target.gl_Position, mul(projectionMatrix, mul(modelViewMatrix, vec4(transformed, 1))))
    ])
  ]);
};
const particleModel = defn("vec3", "particleModel", ["vec3"], (previous) => {
  return [ret(vec3(0))];
});
const readTextureRGB = defn("vec3", "readTextureRGB", ["vec3"], () => {
  return [ret(vec3(0))];
});
