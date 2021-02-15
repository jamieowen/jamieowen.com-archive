import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  SphereBufferGeometry,
  MeshBasicMaterial,
} from "three";
import {
  color,
  drawContext,
  position,
  sphere,
  DrawContext,
} from "@jamieowen/three-toolkit";
import { iterator, range3d, sideEffect } from "@thi.ng/transducers";

const width = 800;
const height = 600;
const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(2);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(45, width / height);
camera.position.z = 10;
camera.updateProjectionMatrix();
const scene = new Scene();
const mesh = new Mesh(new SphereBufferGeometry(), new MeshBasicMaterial());
scene.add(mesh);

const ctx = new DrawContext(renderer);
console.log("CTX", ctx);

const render = () => {
  ctx.color("blue");
  ctx.basicMaterial();

  [
    ...iterator(
      sideEffect(([x, y, z]) => {
        ctx.position([x * 10, y * 10 - 10, z * 10]);
        ctx.sphere();
      }),
      range3d(3, 3, 3)
    ),
  ];
};
render();

renderer.render(scene, camera);

// new DrawContext();
// ctx.sphere()
// ctc.position

// })
