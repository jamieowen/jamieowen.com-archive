import { RecentWork } from "./recent-work";
import { TechStack } from "./tech-stack";
import { Interests } from "./interests";
import { GetInTouch } from "./get-in-touch";

import { Intro } from "./index";
import { Fragment } from "react";

export { getStaticProps } from "services/get-static-paths";

const FullPage = ({ projects }) => {
  return (
    <Fragment>
      <Intro />
      <RecentWork projects={projects}></RecentWork>
      <TechStack />
      <Interests />
      <GetInTouch />
    </Fragment>
  );
};

export default FullPage;
