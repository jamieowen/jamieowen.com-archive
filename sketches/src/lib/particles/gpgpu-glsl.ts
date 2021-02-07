import {
  assign,
  defMain,
  input,
  program,
  uniform,
  mul,
  vec4,
  add,
  output,
  $xy,
} from "@thi.ng/shader-ast";
import { GLSLTarget } from "@thi.ng/shader-ast-glsl";

/**
 *
 * Render a quad style geometry and
 * generate UV for GPGPU texture read.
 *
 * @param target
 */
export const gpgpuQuadVertexShader = (target: GLSLTarget) => {
  const modelViewMatrix = uniform("mat4", "modelViewMatrix", {});
  const projectionMatrix = uniform("mat4", "projectionMatrix");
  const position = input("vec3", "position");
  const vReadUV = output("vec2", "vReadUV");

  return program([
    modelViewMatrix,
    projectionMatrix,
    position,
    vReadUV,
    defMain(() => [
      assign(vReadUV, add($xy(position), 0.5)),
      assign(
        target.gl_Position,
        mul(projectionMatrix, mul(modelViewMatrix, vec4(position, 1.0)))
      ),
    ]),
  ]);
};

/**
 *
 * Render 'big triangle' style geometry and
 * generate UV for GPGPU texture read.
 *
 * @param target
 */
export const gpgpuTriangleVertexShader = (target: GLSLTarget) => {
  const position = input("vec3", "position");
  const vReadUV = output("vec2", "vReadUV");
  return program([
    position,
    vReadUV,
    defMain(() => [
      assign(vReadUV, mul(0.5, add($xy(position), 1.0))),
      assign(target.gl_Position, vec4(position, 1.0)),
    ]),
  ]);
};

export const gpgpuFragmentBase = (target: GLSLTarget) => {
  const previous = uniform("sampler2D", "previous");
  const current = uniform("sampler2D", "current");
  const vReadUV = input("vec2", "vReadUV");

  return program([previous, current, vReadUV, defMain(() => [])]);
};
