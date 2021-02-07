import { program } from "@thi.ng/shader-ast";
import { GLSLTarget, GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { gpgpuQuadVertexShader, gpgpuTriangleVertexShader } from "./gpgpu-glsl";

export interface IGPGPUSetupOpts {
  geomType: "triangle" | "quad";
  width: number;
  height: number;
  count: number; // num states
  // initialData: Float32Array;
  updateProgram: (target: GLSLTarget) => ReturnType<typeof program>;
}

export interface GPGPUSetup {
  opts: IGPGPUSetupOpts;
  data: Float32Array;
  position: Float32Array;
  vertexShader: string;
  fragmentShader: String;
}

export const gpgpuSetup = (opts: IGPGPUSetupOpts) => {
  const { width, height, count, geomType, updateProgram } = opts;

  const targetVS = targetGLSL({
    version: GLSLVersion.GLES_100,
    versionPragma: false,
    type: "vs",
  });

  const targetFS = targetGLSL({
    version: GLSLVersion.GLES_100,
    versionPragma: false,
    type: "fs",
    prelude: "precision highp float;",
  });

  let vertexAst;
  let positionBuffer;

  /**
   * Determine which vertex shader to use
   * for determining read uv from geometry.
   */
  if (geomType === "quad") {
    vertexAst = gpgpuQuadVertexShader(targetVS);
    // prettier-ignore
    positionBuffer = new Float32Array([ -0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0 ]);
  } else {
    vertexAst = gpgpuTriangleVertexShader(targetVS);
    positionBuffer = new Float32Array([-1, -1, 0, -1, 4, 0, 4, -1, 0]);
  }

  const fragmentAst = updateProgram(targetFS);
  const vertexSource = targetVS(vertexAst);
  const fragmentSource = targetFS(fragmentAst);

  return {
    // data,
    geomType,
    count,
    vertexAst,
    fragmentAst,
    vertexSource,
    fragmentSource,
    positionBuffer,
    width,
    height,
  };
};
