import { defaultIpsum, lorumIpsum } from "components/helpers/lorumIpsum";
import { TextFormatter } from "components/text-formatter";
import { useRouter } from "next/router";

import {
  BodyHeader,
  Section,
  BodySmallText,
  BodyText,
  MenuItems,
  ProjectLinks,
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

export const IntroTextSlide: FC<SlideContainerProps> = ({
  children,
  ...props
}) => {
  const slideRef = useRef<HTMLDivElement>();
  // const scrollValue = useMotionValue(0);

  return (
    // @ts-ignore // unsure about this error.. to do with ref.
    <SlideContainer {...props} ref={slideRef}>
      <Section>
        <BodyHeader>00 / Menu</BodyHeader>
        <MenuItems />
      </Section>
      {/* <Section size="mid">
        <BodyHeader>01 / Intro</BodyHeader>
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK.
          <br />
          <br />I use current web technologies to build apps, installations &
          websites. Keep scrolling to have a peruse! Or Resume / CV
        </BodyText>
      </Section> */}

      {/* <Section size="full">
        <BodyHeader>03 / Recent Work</BodyHeader>
        <Section size="sml" nomargin>
          <BodySmallText>
            I'm lucky to have worked with some talented folk at Moving Brands,
            Goodboy Digital, AllOfUs. On projects for Google,
          </BodySmallText>
        </Section>
        <Section size="full">
          <ProjectLinks />
        </Section>
      </Section> */}

      {/* <Section size="full">
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
      </Section> */}

      <Section>
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
