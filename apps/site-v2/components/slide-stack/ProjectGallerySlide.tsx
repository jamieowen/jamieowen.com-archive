import { TextFormatter } from "components/text-formatter";
import { FC } from "react";
import { ProjectData } from "types";
import { GLCanvasGrid } from "components/infinite-grid";
import {
  useSlideContext,
  SlideContainer,
  SlideContainerProps,
} from "./SlideStack";

// <GLCanvasGrid padding={false} />

export const ProjectGallerySlide: FC<
  { project?: ProjectData } & SlideContainerProps
> = ({ project, children, ...props }) => {
  return (
    <SlideContainer {...props}>
      <TextFormatter>
        <strong>{project && project.content.title}</strong>
        <p>{project && project.content.client}</p>
        {/* {lorum.generateParagraphs(3)} */}
      </TextFormatter>
    </SlideContainer>
  );
};
