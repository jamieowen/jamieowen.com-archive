import { defMain, defn, vec2, assign, vec4 } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import {} from "@thi.ng/shader-ast-stdlib";
import { shaderSourceFromAST, ShaderSpec } from "@thi.ng/webgl";

/**
 * Some notes for this....
 *
 * Looking at some real basics of thi.ng ast.
 * Perhaps to write some basic webgl particle engine to power
 * instanced objects using three.js
 *
 * Leveraging 'compute textures' that could be handled in JS or webgl.
 * To do things like boids and ribbon effects. The usual...
 *
 */
test("shader ast test", () => {
  console.log("shader ast");

  //
  const spec: ShaderSpec = {
    attribs: {
      position: "vec2",
    },
    uniforms: {
      resolution: ["vec2", [100, 100]],
    },
    vs: (gl, _, attribs) => [
      defMain(() => [assign(gl.gl_Position, vec4(attribs.position, 0, 1))]),
    ],
    fs: (gl, unis, _, outs) => [
      defMain(() => [assign(outs.fragColor, vec4(1, 1, 1, 1))]),
    ],
  };

  const version = GLSLVersion.GLES_100;
  const glslVS = shaderSourceFromAST(spec, "vs", version);
  const glslFS = shaderSourceFromAST(spec, "fs", version);

  console.log(glslVS);
  console.log(glslFS);
});
