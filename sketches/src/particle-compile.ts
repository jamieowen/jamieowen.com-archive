import {
  debugAstTypes,
  compileGLSL,
  compileJS,
  positionUpdate,
  debugShader,
  addForce,
} from "./lib/particles";
import { sketch, createGeometryFactory } from "@jamieowen/three";
import {
  GLSLVersion,
  RawShaderMaterial,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from "three";

const createShader = () => {
  return new RawShaderMaterial({
    side: DoubleSide,
    uniforms: {
      time: { value: 0 },
    },
    fragmentShader: `
    void main(){
      gl_FragColor = vec4(1.0);
    }
    `,
    vertexShader: `
    precision mediump float;
    

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float time;

    attribute vec3 position;

    void main(){
      vec3 p = position;
      p.x += 1.5 + sin(time) * 2.0;
      // p.x = 1.5; // WHY IS THIS NOT ASSIGNING??
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
    }
    `,
  });
};

sketch(({ render, scene, configure }) => {
  const geom = createGeometryFactory();

  const mesh = new Mesh(
    geom.create("plane"),
    new MeshBasicMaterial({ color: "blue" })
  );
  scene.add(mesh);
  mesh.position.y = 3;
  const part = new Mesh(geom.create("plane"), createShader());
  scene.add(part);
  // part.position.x = -1.5;

  configure({ width: "800px", height: "600px" });
  render(({ time }) => {
    (part.material as RawShaderMaterial).uniforms.time.value = time;
  });
}, document.body);

// worth looking at : https://github.com/thi-ng/umbrella/blob/develop/examples/shader-ast-canvas2d/src/index.ts

console.log("HELLO AST WORLD!");
console.log(debugAstTypes());

/**
 * POsitoin test.
 */
console.log("Position Update :");
const update = positionUpdate([addForce(0.1), addForce(31), addForce(0.4)]);

const glsl = compileGLSL([update]);
const js = compileJS([update]);

console.log(glsl);
console.log(js);
console.log("\nDebug");
console.log(compileGLSL([debugShader()]));
