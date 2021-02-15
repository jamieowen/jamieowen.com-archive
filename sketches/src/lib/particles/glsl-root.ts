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
  add,
  ret,
  defn,
  output,
  $xy,
} from "@thi.ng/shader-ast";
import { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import { project } from "@thi.ng/vectors";

/**
 * Vertex shader update.
 *
 * -- Todo
 * Reads from optionally multiple texture inputs.
 * Somehow mapping to supplied optional forces.
 * GPGPU updated vecs are read and applied to objects.
 *
 * @param target
 */
export const systemVertexShader = (target: GLSLTarget) => {
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
      // assign(transformed, add(transformed, vec3(1.0))),
      particleModel(transformed),
      assign(
        target.gl_Position,
        mul(projectionMatrix, mul(modelViewMatrix, vec4(transformed, 1.0)))
      ),
    ]),
  ]);
};

const particleModel = defn("vec3", "particleModel", ["vec3"], (previous) => {
  return [ret(vec3(0.0))];
});

const readTextureRGB = defn("vec3", "readTextureRGB", ["vec3"], () => {
  return [ret(vec3(0.0))];
});

// const gpgpuVertexShader = (target: GLSLTarget) => {
//   const;
// };
// const gpgpuFragmentShader = (target: GLSLTarget) => {
//   const textureIn = uniform("sampler2D", "textureIn");
// };
