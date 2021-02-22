import { RecentWork } from "./recent-work";
import { TechStack } from "./tech-stack";
import { Interests } from "./interests";
import { GetInTouch } from "./get-in-touch";

import { Intro } from "./index";

export { getStaticProps } from "services/get-static-paths";

const FullPage = ({ projects }) => {
  return (
    <div>
      <Intro />
      <RecentWork projects={projects}></RecentWork>
      <TechStack />
      <Interests />
      <GetInTouch />
    </div>
  );
};

export default FullPage;
