import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { flatten } from "@thi.ng/transducers";
import React, {
  FC,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { Box } from "theme-ui";
import { PerspectiveCamera, TextureLoader } from "three";
import { GenerativeGrid, useGenerativeGrid } from "./GenerativeGridContext";
import { Smush32 } from "@thi.ng/random";

export const GridGLRender: FC<any> = () => {
  const grid = useGenerativeGrid();
  const [scroll, setScroll] = useState({
    position: 0,
    then: 0,
    time: 0,
  });
  useScrollPosition(({ currPos }) => {
    const now = performance.now();
    setScroll({
      position: currPos.y,
      then: now,
      time: now - scroll.then,
    });
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Canvas
        pixelRatio={2}
        invalidateFrameloop={true}
        gl={{
          alpha: false,
          antialias: true,
        }}
      >
        {/** Force some change in the scene to invalidate the frame loop */}
        <group position={[0, scroll.position, 0]} />
        <Grid3DScene grid={grid} scrollPosition={scroll.position} />
      </Canvas>
    </Box>
  );
};

export const Grid3DScene: FC<{
  grid: GenerativeGrid;
  scrollPosition: number;
}> = ({ grid, scrollPosition }) => {
  useViewportRender(grid, scrollPosition);

  return (
    <group>
      <scene visible={false}>
        <mesh>
          <sphereBufferGeometry />
          <meshBasicMaterial color="crimson" />
        </mesh>
      </scene>
      <mesh position={[0, 0, -1]} scale={[40, 40, 40]}>
        <planeBufferGeometry />
        <meshBasicMaterial color="crimson" />
      </mesh>
      <mesh
        scale={[12.5, 5, 0.1]}
        position={[0, 0, 0]}
        rotation={[0, scrollPosition * 0.001, 0]}
      >
        <planeBufferGeometry />
        <Suspense fallback={<meshBasicMaterial color="blue" />}>
          <ImageMaterial />
        </Suspense>
      </mesh>
    </group>
  );
};

const ImageMaterial = () => {
  const texture = useLoader(
    TextureLoader,
    "https://images.prismic.io/allofustest/4f349d0f2b7304bcba3337c46c3ea9701a5ff92b_nmoq_wide.jpg"
  );
  return <meshBasicMaterial map={texture} />;
};

const useViewportRender = (gen: GenerativeGrid, scrollPosition: number) => {
  const random = useMemo(() => new Smush32(0x0423498), []);

  const cameras = useMemo(() => {
    console.log("CREATE CAMERAS..");
    return gen.grid.map(() => {
      const cam = new PerspectiveCamera(45, 1 / 1);
      cam.position.z = 10;
      cam.userData["rand"] = random.float();
      // cam.look
      return cam;
    });
  }, [gen.grid]);

  useFrame(({ gl, scene, camera }) => {
    const { grid, size } = gen;
    const height = gl.getContext().drawingBufferHeight / gl.getPixelRatio();

    gl.autoClear = false;
    gl.setClearColor("white");
    gl.clear();

    // gl.setViewport(0, -10 + height - 256, 256, 256);
    // gl.render(scene, cameras[0]);
    // return;

    grid.forEach(([x, y, step, depth], i) => {
      const gridCam = cameras[i];
      const _size = size * step;
      const gy = size * y;
      const _y = -scrollPosition - gy + height - _size;
      gridCam.position.y = -scrollPosition * gridCam.userData["rand"] * 0.01;
      gridCam.position.x = -scrollPosition * gridCam.userData["rand"] * 0.01;
      gl.setViewport(x * size, _y, _size, _size);
      gl.render(scene, gridCam);
    });
  }, 1);
};
