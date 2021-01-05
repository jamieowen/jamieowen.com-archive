import { FC, useMemo, useState } from "react";
import { gestureStream3d, resizeObserverStream } from "@jamieowen/browser";
import { dragGesture3d } from "@jamieowen/motion";
import { useThree, Vector3 } from "react-three-fiber";
import { useInfiniteGrid } from "./hooks";

export const InfiniteGrid: FC<{ viewport: [number, number] }> = ({
  viewport,
}) => {
  const dimensions = [4, 3] as [number, number];
  const vp = [viewport[0] * 0.01, viewport[1] * 0.01] as [number, number];
  const { grid, position } = useInfiniteGrid(vp, dimensions);
  const [pos, setPos] = useState(position.deref());

  // useFrame(() => {
  //   console.log("FRAME LOOP");
  // }); `
  const three = useThree();
  const gesture = useMemo(() => {
    const { camera } = three;
    const domElement = three.gl.domElement;
    const resize$ = resizeObserverStream(domElement);
    console.log("Attach", domElement, camera);
    // resize$.next({ width: 0, height: 0 } as ResizeEvent);
    resize$.subscribe({
      next: (ev) => {
        console.log("RESIZE", ev);
      },
    });
    camera.position.z = 0.5;
    const stream = gestureStream3d(domElement, camera, resize$, {
      normal: [0, 0, 1],
    });

    position.subscribe({
      next: (pos) => {
        // setPos(pos);
      },
    });

    // stream.error = (err) => {
    //   console.log("ERRRPR", err);
    // };
    // stream.subscribe({
    //   next: (ev) => {
    //     // console.log("NEXT 3D", ev);
    //   },
    // });

    const drag = dragGesture3d(stream, {
      maxSpeed: 10,
      friction: 0.4,
    });
    drag.subscribe({
      next: ({ particle }) => {
        position.next([-particle.position[0], -particle.position[1]]);
      },
    });
    // drag.error = () => {
    //   console.log("Drag Error");
    // };

    return stream;
  }, []);

  // useEffect(() => {}, []);

  const items = grid.deref();
  // console.log("GRID RENDER UPDATE", pos, items.length, vp, dimensions);

  const s = 0.1;
  const ss = 0.9;
  const [w, h] = dimensions;
  const ms = [w * ss, h * ss, 1] as Vector3;
  return (
    <group scale={[s, s, s]}>
      {items.map((item, i) => {
        const x = item.local[0];
        const y = item.local[1];
        // console.log("XY:", viewport, x, y);
        return (
          <mesh key={i} position={[x, y, 0]} scale={ms}>
            <planeBufferGeometry />
            <meshBasicMaterial />
          </mesh>
        );
      })}
    </group>
  );
};
