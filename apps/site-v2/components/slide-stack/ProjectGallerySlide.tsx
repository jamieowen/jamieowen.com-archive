import { FC, useMemo } from "react";
import { ProjectData } from "types";
import { Canvas } from "react-three-fiber";
import { SlideContainer, SlideContainerProps } from "./SlideStack";
import { SpriteAssetLoader } from "../infinite-grid";
import { InfiniteGrid } from "components/infinite-grid";

export const ProjectGallerySlide: FC<
  { project?: ProjectData } & SlideContainerProps
> = ({ project, children, ...props }) => {
  const assets = useMemo(() => {
    if (!project) {
      return [];
    }
    return [...project.images.map((i) => i.url), ...project.json];
  }, [project]);

  return (
    // @ts-ignore // unsure about this error..
    <SlideContainer {...props} padding={false}>
      <Canvas
        colorManagement={false}
        pixelRatio={2}
        invalidateFrameloop={false}
        gl={{ alpha: false, antialias: true }}
      >
        <SpriteAssetLoader urls={assets}>
          {(loadState) => <InfiniteGrid loadState={loadState} />}
        </SpriteAssetLoader>
      </Canvas>
    </SlideContainer>
  );
};
