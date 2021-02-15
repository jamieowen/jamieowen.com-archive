import {
  defMain,
  defn,
  program,
  uniform,
  Mat4Sym,
  input,
  Vec3Sym,
  Vec4Sym,
  vec4,
  assign,
  mul,
  sym,
} from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL, GLSLTarget } from "@thi.ng/shader-ast-glsl";
import { JSTarget, targetJS } from "@thi.ng/shader-ast-js";

test("Detemining how to compile three.js compatible glsl", () => {
  console.log("oko");

  const compile = targetGLSL({
    version: GLSLVersion.GLES_100,
    type: "vs",
  });

  const glsl = vsShader(compile);
  const glslStr = compile(glsl);
  console.log(glslStr);

  const js = targetJS();
  const jsStr = js.compile(vsShaderJS(js));

  console.log(jsStr.main());

  expect(10).toBe(10);
});

const vsShader = (target: GLSLTarget) => {
  const position = input("vec3", "position");
  const color = input("vec3", "color");
  const modelViewMatrix = uniform("mat4", "modelViewMatrix", {});
  const projectionMatrix = uniform("mat4", "projectionMatrix");

  const transformed = sym(position);

  return program([
    modelViewMatrix,
    projectionMatrix,
    position,
    color,
    defMain(() => [
      transformed,
      assign(
        target.gl_Position,
        mul(projectionMatrix, mul(modelViewMatrix, vec4(transformed, 0.0)))
      ),
    ]),
  ]);
};

const vsShaderJS = (target: JSTarget) => {
  const position = input("vec3", "position");
  const color = input("vec3", "color");
  const modelViewMatrix = uniform("mat4", "modelViewMatrix", {});
  const projectionMatrix = uniform("mat4", "projectionMatrix");

  const transformed = sym(position);

  return program([
    modelViewMatrix,
    projectionMatrix,
    position,
    color,
    defMain(() => [
      transformed,
      // assign(
      //   target.gl_Position,
      //   mul(projectionMatrix, mul(modelViewMatrix, vec4(transformed, 0.0)))
      // ),
    ]),
  ]);
};
