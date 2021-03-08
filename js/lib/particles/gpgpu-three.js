import {
  RawShaderMaterial,
  BufferGeometry,
  Scene,
  Mesh,
  WebGLRenderTarget,
  OrthographicCamera,
  RGBAFormat,
  FloatType,
  ClampToEdgeWrapping,
  NearestFilter,
  BufferAttribute,
  DoubleSide
} from "../../../_snowpack/pkg/three.js";
const defaultRttOpts = {
  format: RGBAFormat,
  type: FloatType,
  wrapS: ClampToEdgeWrapping,
  wrapT: ClampToEdgeWrapping,
  minFilter: NearestFilter,
  magFilter: NearestFilter,
  stencilBuffer: false,
  depthBuffer: false
};
const createTexture = (width, height) => {
  return new WebGLRenderTarget(width, height, {
    format: RGBAFormat,
    type: FloatType,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    stencilBuffer: false,
    depthBuffer: false
  });
};
const createGeometry = (buffer) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(buffer, 3));
  return geometry;
};
export class GPGPUState {
  constructor(renderer, setup) {
    this.scene = new Scene();
    this.renderer = renderer;
    this.states = new Array(setup.count).fill(0).map(() => createTexture(setup.width, setup.height));
    this.material = new RawShaderMaterial({
      vertexShader: setup.vertexSource,
      fragmentShader: setup.fragmentSource,
      depthTest: false,
      depthWrite: false,
      side: DoubleSide,
      uniforms: {
        previousState: {value: null}
      }
    });
    this.writeMaterial = new RawShaderMaterial({
      vertexShader: setup.vertexSource,
      fragmentShader: setup.fragmentWriteSource,
      depthTest: false,
      depthWrite: false,
      side: DoubleSide,
      uniforms: {
        inputSource: {value: null}
      }
    });
    this.geometry = createGeometry(setup.positionBuffer);
    this.mesh = new Mesh(this.geometry, this.material);
    this.camera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
    this.scene.add(this.mesh);
  }
  write(data) {
    this.writeMaterial.uniforms["inputSource"].value = data;
    this.mesh.material = this.writeMaterial;
    this.states.forEach((state) => {
      console.log("write state.");
      this.renderer.setRenderTarget(state);
      this.renderer.render(this.scene, this.camera);
    });
    this.renderer.setRenderTarget(null);
    this.mesh.material = this.material;
  }
  update() {
    this.material.uniforms["previousState"].value = this.states[1].texture;
    this.renderer.setRenderTarget(this.states[0]);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.shiftStates();
  }
  get current() {
    return this.states[0];
  }
  get preview() {
    return this.states[1];
  }
  get output() {
    return this.states[0];
  }
  shiftStates() {
    let prevState = this.states[this.states.length - 1];
    for (let i = 0; i < this.states.length; i++) {
      let current = this.states[i];
      this.states[i] = prevState;
      prevState = current;
    }
  }
}
