import { timeStamp } from "console";
import {
  RawShaderMaterial,
  BufferGeometry,
  Scene,
  Mesh,
  DataTexture,
  WebGLRenderTarget,
  WebGLRenderer,
  OrthographicCamera,
  Material,
  Mapping,
  RGBAFormat,
  FloatType,
  ClampToEdgeWrapping,
  NearestFilter,
  UVMapping,
  BufferAttribute,
  BackSide,
  FrontSide,
  DoubleSide,
} from "three";
import { GPGPUSetup, gpgpuSetup, GPGPUSetupOpts } from "./gpgpu-setup";

const defaultRttOpts = {
  format: RGBAFormat,
  type: FloatType,
  // mapping: UVMapping,
  wrapS: ClampToEdgeWrapping,
  wrapT: ClampToEdgeWrapping,
  minFilter: NearestFilter,
  magFilter: NearestFilter,
  stencilBuffer: false,
  depthBuffer: false,
};

const createTexture = (width: number, height: number) => {
  return new WebGLRenderTarget(width, height, {
    format: RGBAFormat,
    type: FloatType,
    // mapping: UVMapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    stencilBuffer: false,
    depthBuffer: false,
  });
};

const createGeometry = (buffer: Float32Array) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(buffer, 3));
  return geometry;
};

export class GPGPUState {
  renderer: WebGLRenderer;
  states: WebGLRenderTarget[];
  output: WebGLRenderTarget;
  material: RawShaderMaterial;
  writeMaterial: RawShaderMaterial;
  geometry: BufferGeometry;
  camera: OrthographicCamera;
  scene: Scene = new Scene();
  mesh: Mesh;

  /**
   *
   * @param renderer
   * @param setup
   */
  constructor(renderer: WebGLRenderer, setup: ReturnType<typeof gpgpuSetup>) {
    this.renderer = renderer;
    this.states = new Array(setup.count)
      .fill(0)
      .map(() => createTexture(setup.width, setup.height));
    this.output = createTexture(setup.width, setup.height);
    this.material = new RawShaderMaterial({
      vertexShader: setup.vertexSource,
      fragmentShader: setup.fragmentSource,
      depthTest: false,
      depthWrite: false,
      // side: setup.geomType === "triangle" ? BackSide : FrontSide,
      side: DoubleSide,
      uniforms: {
        ...this.states.reduce((map, _val, i) => {
          return {
            ...map,
            [`state_${i}`]: { value: this.states[i] },
          };
        }, {}),
      },
    });
    this.writeMaterial = new RawShaderMaterial({
      vertexShader: setup.vertexSource,
      fragmentShader: setup.fragmentWriteSource,
      depthTest: false,
      depthWrite: false,
      side: DoubleSide,
      uniforms: {
        ["state_0"]: { value: null },
      },
    });
    this.geometry = createGeometry(setup.positionBuffer);
    this.mesh = new Mesh(this.geometry, this.material);
    this.camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
    this.scene.add(this.mesh);
  }

  /**
   * Set the supplied data as all states and
   * write it to the current output buffer.
   *
   * This is replaces the current state and
   * @param data
   */
  write(data: DataTexture) {
    this.writeMaterial.uniforms["state_0"].value = data;
    this.mesh.material = this.writeMaterial;
    this.states.forEach((state) => {
      this.renderer.setRenderTarget(state);
      this.renderer.render(this.scene, this.camera);
    });
    this.renderer.setRenderTarget(null);
    this.mesh.material = this.material;
  }

  /**
   * Update the state using the supplied update shader.
   * Number of state textures should be equal to count + 1,
   * as the the texture in state[0] will be the output
   * texture.
   */
  update() {
    // Update state uniforms
    this.states.forEach((state, i) => {
      this.material.uniforms[`state_${i}`].value = state.texture;
    });
    // Render
    this.renderer.setRenderTarget(this.output);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.next();
  }

  get current() {
    return this.states[0];
  }

  /**
   * The state at state [0] is always the current most
   * recently written to state.
   *
   * Shift the state textures along after each update to
   * keep access to previous state.
   */
  next() {
    let prevState;
    for (let i = 0; i < this.states.length; i++) {
      prevState = this.states[i];
      // Update curent state at states[0]
      if (i === 0) {
        this.states[i] = this.output;
      } else {
        this.states[i] = prevState;
      }
    }
    // Set the last state to the new output buffer
    this.output = prevState;
  }
}
