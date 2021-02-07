import {
  sketch,
  createGeometryFactory,
  GeometryAlignment,
} from "@jamieowen/three";

import {
  systemVertexShader,
  gpgpuSetup,
  // gpgpuInitialData,
  // gpgpuRandomData,
} from "./lib/particles";

import {
  Color,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { GPGPUState } from "./lib/particles/gpgpu-three";
import {
  defMain,
  program,
  uniform,
  texture,
  sym,
  input,
  assign,
  vec4,
} from "@thi.ng/shader-ast";

const stateUpdate = (renderer: WebGLRenderer) => {
  const setup = gpgpuSetup({
    geomType: "triangle", // quad needs indices
    width: 128,
    height: 128,
    count: 2,
    // initialData: gpgpuRandomData(128, 128),
    updateProgram: (target) => {
      // Defs
      const previousIn = uniform("sampler2D", "previous", { prec: "highp" });
      const currentIn = uniform("sampler2D", "current");
      const vReadUV = input("vec2", "vReadUV");

      // Main
      const current = sym(texture(currentIn, vReadUV));
      const previous = sym(texture(previousIn, vReadUV));
      return program([
        vReadUV,
        previousIn,
        currentIn,
        defMain(() => [
          previous,
          current,
          assign(target.gl_FragColor, vec4(1.0, 0.0, 1.0, 1.0)),
        ]),
      ]);
    },
  });

  const state = new GPGPUState(renderer, setup);
  return {
    state,
    setup,
  };
};

sketch(({ render, renderer, configure, clock, scene }) => {
  configure({
    width: "1024px",
    height: "768px",
  });
  const gpgpu = stateUpdate(renderer);
  const geom = createGeometryFactory();

  const mesh = new Mesh(
    geom.create("plane", GeometryAlignment.BOTTOM),
    new MeshBasicMaterial({
      color: "white",
    })
  );

  scene.background = new Color("white");
  scene.add(mesh);
  gpgpu.state.update();

  // (mesh.material as MeshBasicMaterial).map = gpgpu.state.current.texture;
  (mesh.material as MeshBasicMaterial).map = gpgpu.state.current.texture;
  (mesh.material as MeshBasicMaterial).needsUpdate = true;

  render(() => {
    // renderer.setViewport(0, 0, gpgpu.setup.width, gpgpu.setup.height);
    // renderer.render(gpgpu.state.scene, gpgpu.state.camera);
  });
});
