import { program, Term } from "@thi.ng/shader-ast";
import { targetJS } from "@thi.ng/shader-ast-js";
import { targetGLSL, GLSLVersion } from "@thi.ng/shader-ast-glsl";

export const compileGLSL = (body: Parameters<typeof program>[0]) => {
  const compile = targetGLSL({
    type: "vs",
    prelude: `// hell world`,
    version: GLSLVersion.GLES_300,
    versionPragma: true,
  });

  const glsl = compile(program(body));
  return glsl;
};

export const compileJS = (body: Parameters<typeof program>[0]) => {
  const compile = targetJS();
  const js = compile(program(body));
  return {
    js,
    fn: compile.compile(program(body)),
  };
};
