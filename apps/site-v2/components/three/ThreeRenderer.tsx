import React, { FC, useRef, useEffect } from "react";
import { Box } from "theme-ui";
import {
  createThreeRenderer,
  resizeObserverStream,
  tickStream,
  basicLightingSetup,
} from "@jamieowen/three-toolkit";
import { MeshLambertMaterial, SphereBufferGeometry, Mesh } from "three";

const sxBox = {
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: -2,
  backgroundColor: "red",
  top: "0px",
  left: "0px",
};

export const ThreeRenderer: FC<any> = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return createRenderer(ref.current);
  }, []);
  return <Box sx={sxBox} ref={ref}></Box>;
};

const createRenderer = (ele: HTMLDivElement) => {
  const resize = resizeObserverStream(ele);
  const tick = tickStream();

  const { renderer, scene, camera } = createThreeRenderer(ele, resize);
  camera.position.z = 10;
  const mesh = new Mesh(
    new SphereBufferGeometry(1, 6, 6),
    new MeshLambertMaterial({ color: "red" })
  );
  scene.add(mesh);
  const lights = basicLightingSetup();
  scene.add(lights);

  const render = () => {
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
  };

  tick.subscribe({
    next: render,
  });
  return () => {
    // dispose
    tick.done();
    console.log("dispose");
  };
};
