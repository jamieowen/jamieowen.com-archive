import { defaultIpsum, lorumIpsum } from "components/helpers/lorumIpsum";
import { TextFormatter } from "components/text-formatter";
import { useRouter } from "next/router";

import {
  BodyHeader,
  Section,
  BodySmallText,
  BodyText,
  MenuItems,
} from "components/common";
import {
  CSSProperties,
  ElementType,
  FC,
  Fragment,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useMotionValue } from "framer-motion";
import { ProjectData } from "types";
import { Grid, Heading, Link, Text, Container } from "theme-ui";
import {
  useSlideContext,
  SlideContainer,
  SlideContainerProps,
} from "./SlideStack";
import { useProjects } from "components/context/ProjectsContext";
import { Button } from "components/common";
import { colors } from "components/theme/colors";
import { TechGridList, InterestsGridList } from "./GridList";

const em = (): CSSProperties => ({
  verticalAlign: "super",
  lineHeight: "96px",
  fontSize: "8px",
  backgroundColor: "white",
  color: "black",
});

// const useProjectLinks = () => {
//   // Check current stack mode.
//   // If stacked, then ensure active project is within scroll visibility.
//   useEffect(() => {
//     return;
//     // console.log("REF", slideRef.current);
//     // console.log("Selected Project : ", currentProject);
//     if (context.stackMode !== "root" && currentProject) {
//       const entry = projectLinks.filter(
//         (p) => p.project.id === currentProject.id
//       );
//       if (entry.length > 0) {
//         // Get scroll position for selected link and
//         // focus within that area.
//         const { ref, project } = entry[0];
//         const top = ref.current.offsetTop;
//         const mid = top + ref.current.offsetHeight / 2;
//         slideRef.current.scrollTo({
//           behavior: "smooth",
//           top: top - 100,
//         });
//       } else {
//         console.warn("In stack mode, but no current project set...");
//       }
//     }
//   }, [context.stackMode, currentProject]);
// };

const ProjectLinks: FC<{}> = () => {
  const { currentProject, projects } = useProjects();
  const context = useSlideContext();
  const projectLinks = projects.map((p, i) => {
    const ref = useRef<HTMLAnchorElement>();
    const element = (
      <Button ref={ref} key={i} onClick={(ev) => context.launchProject(ev, p)}>
        <Text as="div" variant="project_text">
          {/* <em style={{ ...em() }}> _00{i + 1}</em> */}
          <strong>{p.content.client}</strong> <span>{p.content.title} </span>
          <strong>({p.content.agency}) </strong>
        </Text>
      </Button>
    );

    return {
      ref,
      element,
      project: p,
    };
  });

  return <Fragment>{projectLinks.map((p) => p.element)}</Fragment>;
};

export const IntroTextSlide: FC<SlideContainerProps> = ({
  children,
  ...props
}) => {
  const slideRef = useRef<HTMLDivElement>();
  // const scrollValue = useMotionValue(0);

  return (
    // @ts-ignore // unsure about this error.. to do with ref.
    <SlideContainer {...props} ref={slideRef}>
      <Section as="nav">
        <BodyHeader>00 / Menu</BodyHeader>
        <MenuItems />
      </Section>
      <Section id="intro" size="mid">
        <BodyHeader>01 / Intro</BodyHeader>
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK.
          <br />
          <br />I use current web technologies to build apps, installations &
          websites. Keep scrolling to have a peruse! Or Resume / CV
        </BodyText>
      </Section>
      <Section id="tech-stack" size="full">
        <BodyHeader>02 / Tech Stack</BodyHeader>
        <Section as="div" size="sml" nomargin>
          <BodySmallText>
            I've worked with a lot of frameworks, languages and platforms over
            the years but my typical focus is functional & object-oriented
            programming in Typescript/Javascript ES6. Here's some potentially
            confusing words that I think about daily.
            <br />
            <br />
          </BodySmallText>
        </Section>
        <Section as="div" size="mid">
          <TechGridList />
        </Section>
      </Section>
      <Section id="recent-work" size="full">
        <BodyHeader>03 / Recent Work</BodyHeader>
        <Section as="div" size="sml" nomargin>
          <BodySmallText>
            I'm lucky to have worked with some talented folk at Moving Brands,
            Goodboy Digital, AllOfUs. On projects for Google,
          </BodySmallText>
        </Section>
        <Section as="div" size="full">
          <ProjectLinks />
        </Section>
      </Section>

      <Section id="interests" size="full">
        <BodyHeader>04 / Interests</BodyHeader>
        <Section as="div" size="sml" nomargin>
          <BodySmallText>
            I'm lucky to have worked with some talented folk at Moving Brands,
            Goodboy Digital, AllOfUs. On projects for Google,
            <br />
            <br />
          </BodySmallText>
        </Section>
        <Section as="div" size="mid">
          <InterestsGridList />
        </Section>
      </Section>

      <Section id="get-in-touch">
        <BodyHeader>04 / Get In Touch</BodyHeader>
        <BodySmallText>
          Say Hello. Send an email.
          <br />
          <br />
        </BodySmallText>
      </Section>
    </SlideContainer>
  );
};
