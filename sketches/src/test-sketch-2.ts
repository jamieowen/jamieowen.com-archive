import {
  WebGLRenderer,
  SphereBufferGeometry,
  PerspectiveCamera,
  Scene,
  MeshBasicMaterial,
  Object3D,
} from "three";
import {
  color,
  drawContext,
  pointLightHelper,
  position,
  sphere,
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

renderer.render(scene, camera);
const geometries = {
  sphere: new SphereBufferGeometry(1, 3, 3),
};

const material = new MeshBasicMaterial({
  color: "white",
});

// const object = new Object3D();
// renderer.renderBufferDirect(
//   camera,
//   scene,
//   geometries.sphere,
//   material,
//   object,
//   {}
// );

const state = {};
// const loadedGeom = defineGeometry((params)=>{

// });

// const defineMaterial = defineMaterial(

// renderLoop(()=>{
//   drawContext(scene, () => {
//     // pushRenderTarget();
//     position(0, 0, 0);
//     lambert();
//     sphere();

//     pointStyle()
//     points([...])
//     vectorStyle()
//     vectors([...])
//   });

// });

// const lights = ()=>{
//   pointLight()
//   spotLight()
// }

const geometry = sphereGeom(10);
console.log(sphereGeom());
drawContext(scene, () => {
  color("white");
  [
    ...iterator(
      sideEffect(([x, y, z]) => {
        position([x * 10, y * 10 - 10, z * 10]);
        sphere();
      }),
      range3d(3, 3, 3)
    ),
  ];
});
