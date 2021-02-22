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
  UVMapping,
  RGBAFormat,
  WebGLRenderer,
  RawShaderMaterial,
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
  mul,
} from "@thi.ng/shader-ast";
import { gpgpuRandomData } from "./lib/particles/gpgpu-data";

const randomData = () => {
  return new DataTexture(
    gpgpuRandomData(128, 128),
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
};

sketch(({ render, renderer, configure, clock, scene }) => {
  configure({
    width: "1024px",
    height: "768px",
  });

  const geom = createGeometryFactory();

  const mesh = new Mesh(
    geom.create("plane", GeometryAlignment.BOTTOM),
    new MeshBasicMaterial({
      color: "white",
    })
  );
  scene.background = new Color("white");
  scene.add(mesh);

  const state = new GPGPUState(
    renderer,
    gpgpuSetup({
      geomType: "triangle", // quad needs indices
      width: 128,
      height: 128,
      count: 2,
      updateProgram: (target) => {
        // Defs
        const previousIn = uniform("sampler2D", "previouState", {
          prec: "highp",
        });
        const vReadUV = input("vec2", "vReadUV");

        // Main
        // const current = sym(texture(currentIn, vReadUV));
        const previous = sym(texture(previousIn, vReadUV));

        return program([
          vReadUV,
          previousIn,
          // currentIn,
          defMain(() => [
            previous,
            // current,
            assign(target.gl_FragColor, mul(previous, 0.99)),
          ]),
        ]);
      },
    })
  );

  state.write(randomData());

  render(() => {
    state.update();
    (mesh.material as MeshBasicMaterial).map = state.preview.texture;
    (mesh.material as MeshBasicMaterial).needsUpdate = true;

    // renderer.setViewport(0, 0, gpgpu.setup.width, gpgpu.setup.height);
    // renderer.render(gpgpu.state.scene, gpgpu.state.camera);
  });
});
