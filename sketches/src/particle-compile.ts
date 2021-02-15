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
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  FloatType,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  PlaneBufferGeometry,
  UVMapping,
  RGBAFormat,
  RGBFormat,
  ShaderMaterial,
  TextureDataType,
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
} from "@thi.ng/shader-ast";
import { gpgpuRandomData } from "./lib/particles/gpgpu-data";

const stateUpdate = (renderer: WebGLRenderer) => {
  const setup = gpgpuSetup({
    geomType: "triangle", // quad needs indices
    width: 128,
    height: 128,
    count: 2,
    updateProgram: (target) => {
      // Defs
      const previousIn = uniform("sampler2D", "state_1", { prec: "highp" });
      const currentIn = uniform("sampler2D", "state_0");
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
          assign(target.gl_FragColor, current),
        ]),
      ]);
    },
  });

  const state = new GPGPUState(renderer, setup);
  const data = gpgpuRandomData(128, 128);
  const dataTex = new DataTexture(
    data,
    128,
    128,
    RGBAFormat,
    FloatType,
    UVMapping,
    ClampToEdgeWrapping,
    ClampToEdgeWrapping,
    NearestFilter,
    NearestFilter
  );
  state.write(dataTex);
  console.log(dataTex);
  // console.log(data);
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
