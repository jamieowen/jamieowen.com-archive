import { useResizeObserver } from "components/helpers";
import { FC } from "react";
import { Canvas } from "react-three-fiber";
import { Container } from "theme-ui";
import { InfiniteGrid } from "./InfiniteGrid";

export const GLCanvasGrid: FC<any> = () => {
  const { ref, entry } = useResizeObserver();

  return (
    <Container
      ref={ref}
      sx={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <Canvas pixelRatio={2} invalidateFrameloop={true}>
        <mesh scale={[0.1, 0.1, 0.1]}>
          <meshBasicMaterial />
          <sphereBufferGeometry />
        </mesh>
        {entry && (
          <InfiniteGrid
            viewport={[entry.contentRect.width, entry.contentRect.height]}
          />
        )}
      </Canvas>
    </Container>
  );
};
