import {
  sketch,
  createGeometryFactory,
  motionRadialOrbit,
  motionBlend,
  createGridHelper,
  motionFigure8Orbit,
  motionConfig,
  dragGesture3d,
  gestureStream2d,
  gestureStream3d,
} from "@jamieowen/three-toolkit";

import { Mesh, MeshBasicMaterial, Scene } from "three";

const geometries = createGeometryFactory();
const createMesh = (scene: Scene, color: string, scale: number) => {
  const mesh = new Mesh(
    geometries.create("sphere"),
    new MeshBasicMaterial({ color })
  );
  scene.add(mesh);
  mesh.scale.multiplyScalar(scale);
  return mesh;
};

sketch(({ render, configure, scene, domElement, camera, resize }) => {
  const mesh1 = createMesh(scene, "yellow", 0.1);
  const mesh2 = createMesh(scene, "orange", 0.1);
  const mesh3 = createMesh(scene, "blue", 0.1);
  const center = createMesh(scene, "blue", 0.075);
  const grid = createGridHelper();
  scene.add(grid);

  motionRadialOrbit(motionConfig({ radius: 4, speed: 0.1 })).subscribe({
    next: (val) => {
      mesh1.position.fromArray(val.position);
    },
  });

  motionFigure8Orbit(motionConfig({ radius: 2, speed: 0.01 })).subscribe({
    next: (val) => {
      mesh2.position.fromArray(val.position);
    },
  });

  motionBlend(
    0.5,
    motionRadialOrbit(motionConfig({ radius: 0.5, speed: 0.01 })),
    motionFigure8Orbit(motionConfig({ radius: 6, speed: 0.05 }))
  ).subscribe({
    next: (val) => {
      mesh3.position.fromArray(val);
    },
  });

  const gesture2d$ = gestureStream2d(domElement, {});
  const gesture3d$ = gestureStream3d(domElement, camera, resize);

  dragGesture3d(gesture3d$).subscribe({
    next: ({ particle }) => {
      grid.position.fromArray(particle.position);
    },
  });

  configure({
    width: "1024px",
    height: "768px",
  });

  render(() => {});
});
