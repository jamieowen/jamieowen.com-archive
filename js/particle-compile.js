import {
  sketch,
  createGeometryFactory,
  GeometryAlignment
} from "../_snowpack/pkg/@jamieowen/three.js";
import {
  gpgpuSetup
} from "./lib/particles/index.js";
import {
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  FloatType,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  UVMapping,
  RGBAFormat
} from "../_snowpack/pkg/three.js";
import {GPGPUState} from "./lib/particles/gpgpu-three.js";
import {
  defMain,
  program,
  uniform,
  texture,
  sym,
  input,
  assign,
  mul
} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
import {gpgpuRandomData} from "./lib/particles/gpgpu-data.js";
const randomData = () => {
  return new DataTexture(gpgpuRandomData(128, 128), 128, 128, RGBAFormat, FloatType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, NearestFilter, NearestFilter);
};
sketch(({render, renderer, configure, clock, scene}) => {
  configure({
    width: "1024px",
    height: "768px"
  });
  const geom = createGeometryFactory();
  const mesh = new Mesh(geom.create("plane", GeometryAlignment.BOTTOM), new MeshBasicMaterial({
    color: "white"
  }));
  scene.background = new Color("white");
  scene.add(mesh);
  const state = new GPGPUState(renderer, gpgpuSetup({
    geomType: "triangle",
    width: 128,
    height: 128,
    count: 2,
    updateProgram: (target) => {
      const previousIn = uniform("sampler2D", "previouState", {
        prec: "highp"
      });
      const vReadUV = input("vec2", "vReadUV");
      const previous = sym(texture(previousIn, vReadUV));
      return program([
        vReadUV,
        previousIn,
        defMain(() => [
          previous,
          assign(target.gl_FragColor, mul(previous, 0.99))
        ])
      ]);
    }
  }));
  state.write(randomData());
  render(() => {
    state.update();
    mesh.material.map = state.preview.texture;
    mesh.material.needsUpdate = true;
  });
});
