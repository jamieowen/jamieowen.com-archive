import {
  debugAstTypes,
  compileGLSL,
  compileJS,
  positionUpdate,
  debugShader,
  addForce,
} from "./lib/particles";
import {
  sketch,
  createGeometryFactory,
  GeometryAlignment,
  createInstancedMesh,
  instancedMeshIterator,
} from "@jamieowen/three";
import {
  RawShaderMaterial,
  Mesh,
  PCFShadowMap,
  AmbientLight,
  PointLight,
  MeshStandardMaterial,
  DirectionalLight,
} from "three";

sketch(({ render, scene, configure, renderer }) => {
  const geom = createGeometryFactory();

  const amb = new AmbientLight(0xffffff, 0.1);
  scene.add(amb);
  const point = new PointLight();
  point.castShadow = true;
  const dir = new DirectionalLight();
  dir.castShadow = true;
  // scene.add(dir);
  dir.position.set(20, 5, 5);
  scene.add(point);
  point.position.set(10, 10, 10);

  const mesh = new Mesh(
    geom.create("box"),
    new MeshStandardMaterial({
      color: "blue",
      emissive: "yellow",
      emissiveIntensity: 0.3,
    })
  );
  scene.add(mesh);
  mesh.position.y = 3;
  // const part = new Mesh(geom.create("box"), createShader());
  // scene.add(part);

  const instanced = createInstancedMesh(
    geom.create("box", GeometryAlignment.BOTTOM),
    new MeshStandardMaterial({
      color: "white",
      emissive: "lightgrey",
      emissiveIntensity: 0.4,
    }),
    10
  );
  instanced.castShadow = true;
  scene.add(instanced);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  // renderer.shadowMap.type = PCFSoftShadowMap;

  const plane = new Mesh(
    geom.create("plane"),
    new MeshStandardMaterial({ color: "lightgrey" })
  );
  scene.add(plane);
  plane.rotation.x = Math.PI * -0.5;
  plane.scale.multiplyScalar(10);
  plane.receiveShadow = true;

  const iterateMesh = instancedMeshIterator(instanced);

  iterateMesh((i, position, scale) => {
    position.x = 5 - i * 1.2;
    position.y = Math.sin((i / 9) * Math.PI) * 0.5;
    position.z = Math.sin((i / 9) * Math.PI) * 1.5;
  });

  configure({ width: "800px", height: "600px" });
  render(({ time }) => {
    // (part.material as RawShaderMaterial).uniforms.time.value = time;
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
