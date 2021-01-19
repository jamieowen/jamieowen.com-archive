import { FC, Fragment, useEffect, useMemo, useRef } from "react";
import { GridOpts, infiniteGrid, reactive } from "@jamieowen/layout";
// import { createGeometryFactory } from "@jamieowen/three-toolkit";
import { createGeometryFactory } from "@jamieowen/three";
import { resizeObserverStream, gestureStream3d } from "@jamieowen/browser";
import { dragGesture3d } from "@jamieowen/motion";
import { ProjectData } from "types";
import { Canvas, useThree } from "react-three-fiber";
import { SlideContainer, SlideContainerProps } from "./SlideStack";
import { Group, Mesh, MeshBasicMaterial } from "three";

// <GLCanvasGrid padding={false} />

export const ProjectGallerySlide: FC<
  { project?: ProjectData } & SlideContainerProps
> = ({ project, children, ...props }) => {
  return (
    <SlideContainer {...props} padding={false}>
      <Canvas
        pixelRatio={2}
        invalidateFrameloop={false}
        gl={{ alpha: false, antialias: true }}
      >
        <InfiniteGrid />
        <mesh scale={[0.1, 0.1, 0.1]}>
          <meshBasicMaterial />
          <sphereBufferGeometry />
        </mesh>
      </Canvas>
    </SlideContainer>
  );
};

const InfiniteGrid = () => {
  useGrid();
  return <Fragment />;
};

const useGrid = () => {
  const { scene, gl, camera, invalidate } = useThree();
  const { domElement } = gl;

  useEffect(() => {
    const pool = {
      count: 0,
      map: new Map(),
    };

    const resize = resizeObserverStream(domElement);
    const gestures = gestureStream3d(domElement, camera as any, resize, {
      normal: [0, 0, 1],
    });

    gestures.subscribe({
      next: ({ type }) => {
        // console.log("Ges", type);
      },
    });
    resize.subscribe({
      next: () => {
        // console.log("RESIZE");
      },
    });

    const geometry = createGeometryFactory();
    const plane = geometry.create("plane");
    const group = new Group();
    scene.add(group);
    group.position.set(-5, -5, 0);
    console.log(plane);
    const position = reactive([0, 0] as [number, number]);
    const opts = reactive<GridOpts>({
      dimensions: [4, 3],
      viewport: [10, 10],
    });
    dragGesture3d(gestures, {
      // friction: 0.9,
      // maxSpeed: 10,
    }).subscribe({
      next: ({ particle }) => {
        position.next([-particle.position[0], -particle.position[1]]);
        invalidate();
      },
    });

    const grid = infiniteGrid<Mesh>(position, opts, {
      add: ({ id, local, world }) => {
        let mesh: Mesh;
        if (pool.count > 0) {
          mesh = pool.map.get(pool.count);
          pool.count--;
        } else {
          mesh = new Mesh(plane as any, new MeshBasicMaterial({}));
        }
        group.add(mesh);
        return mesh;
      },
      remove: (id: number, mesh) => {
        pool.count++;
        pool.map.set(pool.count, mesh);
        group.remove(mesh);
      },
      update: ({ id, world, local }, mesh) => {
        mesh.position.x = local[0];
        mesh.position.y = local[1];
      },
    });

    // return { position, grid, opts };

    // Create grid streams.
    // const streams = useMemo(() => {
    // }, []);
    // const [items,setItems] =
    // Update changes to dimensions or viewport
    // useMemo(() => {
    //   streams.opts.next({
    //     viewport,
    //     dimensions,
    //   });
    // }, [...dimensions, ...viewport]);
    // return streams;
  }, []);

  return () => {};
};
