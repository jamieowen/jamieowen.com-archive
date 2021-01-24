import { defaultIpsum, lorumIpsum } from "components/helpers/lorumIpsum";
import { TextFormatter } from "components/text-formatter";
import { useRouter } from "next/router";
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
      <Link
        ref={ref}
        key={i}
        sx={{
          ":hover": {
            backgroundColor: "red",
            cursor: "pointer",
          },
        }}
        onClick={(ev) => context.launchProject(ev, p)}
      >
        <Text as="span" variant="project_text">
          {/* <em style={{ ...em() }}> _00{i + 1}</em> */}
          <strong>{p.content.client}</strong> <span>{p.content.title} </span>
          <strong>({p.content.agency}) </strong>
        </Text>
      </Link>
    );

    return {
      ref,
      element,
      project: p,
    };
  });

  return <Fragment>{projectLinks.map((p) => p.element)}</Fragment>;
};

const MenuItem: FC<{ label: string; href: string }> = ({ label, href }) => {
  return (
    <Link
      // href={href}
      onClick={() => console.log("Do Click", href)}
      variant="body_small"
      sx={{
        cursor: "pointer",
        marginRight: "16px",
        transition: "opacity 0.1s ease-out",
        ":hover": {
          opacity: 0.4,
        },
      }}
    >
      <Text variant="body_small" as="span">
        {label}
      </Text>
    </Link>
  );
};

const MenuItems: FC<{}> = () => {
  const links = useMemo(
    () => [
      { label: "Intro.", href: "#intro" },
      { label: "Tech Stack.", href: "#tech-stack" },
      { label: "Recent Work.", href: "#recent-work", break: true },
      { label: "Archive.", href: " " },
      { label: "Get In Touch.", href: " " },
      { label: "Github.", href: " " },
      { label: "LinkedIn.", href: " " },
    ],
    []
  );

  return (
    <Container
    // sx={{
    //   "> * + *": {
    //     marginRight: "1rem !important",
    //   },
    // }}
    >
      {links.map((link) => (
        <Fragment>
          <MenuItem {...link} />
          {link.break ? <br /> : null}
        </Fragment>
      ))}
    </Container>
  );
};

const BodyText: FC<{}> = ({ children }) => {
  return <Text variant="body">{children}</Text>;
};

const BodySmallText: FC<{}> = ({ children }) => {
  return <Text variant="body_small">{children}</Text>;
};

const BodyHeader: FC<{}> = ({ children }) => {
  return <Heading variant="subtitle_header">{children}</Heading>;
};

const Section: FC<{ as?: ElementType }> = ({ as = "section", children }) => {
  return (
    <Container variant="content_container" as={as}>
      {children}
    </Container>
  );
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
      <Section>
        <BodyHeader>01 / Intro</BodyHeader>
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK. I use current web technologies to build apps,
          installations & websites. Keep scrolling to have a peruse! Or Resume /
          CV
        </BodyText>
      </Section>
      <Section id="tech-stack">
        <BodyHeader>02 / Tech Stack</BodyHeader>
        <BodySmallText>
          I've worked with a lot of frameworks, languages and platforms over the
          years but my typical focus is functional & object-oriented programming
          in Typescript/Javascript ES6.
          <br />
          <br />
        </BodySmallText>
        <TechList />
      </Section>
      <Section>
        <BodyHeader>03 / Recent Work</BodyHeader>
        <BodySmallText>
          I'm lucky to have worked with some talented folk at Moving Brands,
          Goodboy Digital, AllOfUs. On projects for Google,
        </BodySmallText>
        <ProjectLinks />
      </Section>
      <Section id="tech-stack">
        <BodyHeader>04 / Get In Touch</BodyHeader>
        <BodySmallText>
          Say Hello. Send an email.
          <br />
          <br />
        </BodySmallText>
        <TechList />
      </Section>
    </SlideContainer>
  );
};

const TechList: FC<{}> = () => {
  return (
    <Grid variant="tech_list">
      <Container>
        <BodyHeader>02.1 / Creative Tech</BodyHeader>
        <ul>
          <li>Three.js / Pixi.js</li>
          <li>thi.ng/umbrella</li>
          <li>StackGL / twgl</li>
          <li>Canvas / WebGL</li>
          <li>Framer / Framer Motion</li>
        </ul>
      </Container>
      <Container>
        <BodyHeader>02.2 / Frontend</BodyHeader>
        <ul>
          <li>Typescript/Javascript ES6</li>
          <li>React / Redux / Storybook</li>
          <li>Styled Components / JSS / Emotion</li>
          <li>Material UI / Theme UI</li>
          <li>Workers/Wasm/TypedArrays</li>
        </ul>
      </Container>
      <Container>
        <BodyHeader>02.3 / Backend/Devops</BodyHeader>
        <ul>
          <li>Node</li>
          <li>Next.js / Vercel</li>
          <li>Express / </li>
          <li>Lerna / Npm </li>
          <li>Docker / Kubernetes</li>
          <li>JAMStack / </li>
        </ul>
      </Container>
      <Container>
        <BodyHeader>02.4 / Generalist</BodyHeader>
        <ul>
          <li>Python / Jupyter Lab</li>
          <li>OpenCV / NLTK</li>
          <li>Maya / Houdini</li>
          <li>Sketch / Figma / Adobe CC</li>
          <li>OpenFrameworks / Processing</li>
        </ul>
      </Container>
    </Grid>
  );
};

// const v = () => {
//   return (
//     <TextFormatter>
//       {/* <strong>Hello.</strong> You’ve reached the website of Jamie Owen, A{" "}
//     <em>Creative Technologist</em> & <em>Software Engineer </em>based in
//     London, UK. I have 18+ years of experience working with a range of
//     coding platforms building creative web software for installations,
//     mobile and desktop. */}
//       {/* {text} */}
//       <p>
//         Read more Below. Use your mouse or thumb pointer to interact with these
//         digital words. Shuffle some Color Palettes. Select something at random.
//         Or generate garbage. Once you are done, you get the
//       </p>
//       <strong>Work & recent projects include </strong>
//       {/* <em>_001 </em>
//   <strong>Systems Thinking / </strong>
//   <em>Lloyds Banking Group</em>, _002 Multitouch Installations National
//   Museum of Qatar @ AllOfUs, Google Livecase */}
//       {/* {projectLinks.map((l) => l.element)} */}
//       {/* {text} */}
//     </TextFormatter>
//   );
// };
