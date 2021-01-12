import React, { FC } from "react";
import { SlideStack } from "components/slide-stack";

import { StaticPropsType } from "services/get-static-paths";

import { IntroTextSlide } from "components/slide-stack/IntroTextSlide";
import { ProjectTextSlide } from "components/slide-stack/ProjectTextSlide";
import { ProjectGallerySlide } from "components/slide-stack/ProjectGallerySlide";
import { ProjectsContextProvider } from "components/context/ProjectsContext";
export { getStaticPaths, getStaticProps } from "services/get-static-paths";

export const Home: FC<StaticPropsType> = ({ project, projects, archived }) => {
  return (
    <ProjectsContextProvider projects={projects}>
      <SlideStack>
        <IntroTextSlide />
        <ProjectTextSlide project={project} />
        <ProjectGallerySlide project={project} />
      </SlideStack>
    </ProjectsContextProvider>
  );
};

export default Home;
