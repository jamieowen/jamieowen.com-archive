import React, { CSSProperties, FC, Fragment } from "react";
import { SlideStack } from "components/slide-stack";
import { TextFormatter } from "components/text-formatter";
import { GLCanvasGrid } from "components/infinite-grid";
import { StaticPropsType } from "services/get-static-paths";
import { ProjectData } from "types";
export { getStaticPaths, getStaticProps } from "services/get-static-paths";

const em = (): CSSProperties => ({
  verticalAlign: "super",
  fontSize: "12px",
  backgroundColor: "white",
  color: "black",
});

const IntroText: FC<{ projects: ProjectData[] }> = ({ projects }) => {
  const projectsChildren = projects.map((p, i) => {
    return (
      <Fragment>
        <em style={{ ...em() }}>_00{i + 1}</em>
        <strong>{p.content.title} </strong>
        <strong>{p.content.client}</strong>
      </Fragment>
    );
  });
  return (
    <TextFormatter>
      <strong>Hello.</strong> You’ve reached the website of Jamie Owen, A{" "}
      <em>Creative Technologist</em> & <em>Software Engineer </em>based in
      London, UK. I have 18+ years of experience working with a range of coding
      platforms building creative web software for installations, mobile and
      desktop.
      <p>
        Read more Below. Use your mouse or thumb pointer to interact with these
        digital words. Shuffle some Color Palettes. Select something at random.
        Or generate garbage. Once you are done, you get the
      </p>
      <strong>Work & recent projects include </strong>
      {/* <em>_001 </em>
      <strong>Systems Thinking / </strong>
      <em>Lloyds Banking Group</em>, _002 Multitouch Installations National
      Museum of Qatar @ AllOfUs, Google Livecase */}
      {projectsChildren}
    </TextFormatter>
  );
};

const SelectedLinkText: FC<any> = () => {
  return (
    <TextFormatter>
      <strong>Projects.</strong>
      <em>Creative Technologist</em> & <em>Software Engineer </em>based in
      Further detail on CNN Airwars.
    </TextFormatter>
  );
};

export const Home: FC<StaticPropsType> = ({ project, projects, archived }) => {
  // console.log(project, projects, archived);
  return (
    <SlideStack>
      <IntroText projects={projects} />
      <SelectedLinkText />
      <GLCanvasGrid padding={false} />
    </SlideStack>
  );
};

export default Home;
