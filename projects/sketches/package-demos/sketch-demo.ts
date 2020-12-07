import {
  sketch,
  createThreeRenderer,
  boxGeometry,
  basicLightingSetup,
  createLightHelpers,
  orbitControls,
  createCameraHelpers,
  keyInputStream,
  renderViewportGrid,
} from "@jamieowen/three-toolkit";
import { Mesh, MeshLambertMaterial } from "three";

sketch(({ container, resize }) => {
  console.log("Sketch Setup");
  const { renderer, scene, camera } = createThreeRenderer(container, resize);
  camera.position.z = 10;

  const material = new MeshLambertMaterial({
    color: "crimson",
  });
  const geometry = boxGeometry({
    depth: 0.25,
  });

  const lights = basicLightingSetup();
  console.log(scene.add(lights));
  const lightsHelpers = createLightHelpers(lights);
  scene.add(lightsHelpers);
  const controls = orbitControls(camera, container);
  const camHelpers = createCameraHelpers(scene);
  scene.add(camHelpers);

  const meshes: Mesh[] = [];

  camera.position.set(10, 3, 7);
  camera.lookAt(0, 0, 0);

  const keyInput = keyInputStream(container);

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      mesh.position.x = x * 1.2 - (4 * 1.2 + 1) / 2 + 0.5;
      mesh.position.y = y * 1.2 - (4 * 1.2 + 1) / 2 + 0.5;
      mesh.position.z = Math.random();
      meshes.push(mesh);
    }
  }

  // const cube = cube
  return () => {
    scene.traverse((obj) => {
      if (typeof obj["update"] === "function") {
        // console.log("Update :", obj);
        // @ts-ignore
        obj.update();
      }
    });
    // renderer.render(scene, camera);
    renderViewportGrid(renderer, {
      grid: [4, 4],
      render: ([x, y], [w, h], i) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      },
    });
  };
});
