import {program} from "../../../_snowpack/pkg/@thi.ng/shader-ast.js";
import {targetJS} from "../../../_snowpack/pkg/@thi.ng/shader-ast-js.js";
import {targetGLSL, GLSLVersion} from "../../../_snowpack/pkg/@thi.ng/shader-ast-glsl.js";
export const compileGLSL = (body) => {
  const compile = targetGLSL({
    type: "vs",
    prelude: `// hell world`,
    version: GLSLVersion.GLES_300,
    versionPragma: true
  });
  const glsl = compile(program(body));
  return glsl;
};
export const compileJS = (body) => {
  const compile = targetJS();
  const js = compile(program(body));
  return {
    js,
    fn: compile.compile(program(body))
  };
};
