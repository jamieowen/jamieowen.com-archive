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
import { Button } from "components/common";
import { colors } from "components/theme/colors";

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
        <Text as="span" variant="project_text">
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

const MenuItem2: FC<{ label: string; href: string }> = ({ label, href }) => {
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

const MenuItem: FC<{ label: string; href: string }> = ({ label, href }) => {
  return (
    <Button
      size="small"
      // href={href}
      onClick={() => console.log("Do Click", href)}
      sx={{
        cursor: "pointer",
        marginRight: "16px",
        // transition: "opacity 0.1s ease-out",
        // ":hover": {
        //   opacity: 0.4,
        // },
      }}
    >
      <Text variant="body_small" as="span">
        {label}
      </Text>
    </Button>
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
      {links.map((link, i) => (
        <Fragment key={i}>
          <MenuItem {...link} />
          {link.break ? <br /> : null}
        </Fragment>
      ))}
    </Container>
  );
};

export const BodyText: FC<{}> = ({ children }) => {
  return <Text variant="body">{children}</Text>;
};

export const BodySmallText: FC<{}> = ({ children }) => {
  return <Text variant="body_small">{children}</Text>;
};

export const BodyHeader: FC<{}> = ({ children }) => {
  return <Heading variant="subtitle_header">{children}</Heading>;
};

export const Section: FC<{
  id?: string;
  as?: ElementType;
  size?: "sml" | "mid" | "full";
  nomargin?: boolean;
}> = ({ as = "section", size = "sml", children, nomargin = false }) => {
  return (
    <Container
      variant="section"
      as={as}
      className={nomargin ? size : ["margin", size].join(" ")}
    >
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
      <Section size="mid">
        <BodyHeader>01 / Intro</BodyHeader>
        <BodyText>
          Hello. My name is Jamie. I'm a Creative Developer & Software Engineer
          based in London, UK. I use current web technologies to build apps,
          installations & websites. Keep scrolling to have a peruse! Or Resume /
          CV
        </BodyText>
      </Section>
      <Section id="tech-stack" size="full">
        <BodyHeader>02 / Tech Stack</BodyHeader>
        <Section as="div" size="sml" nomargin>
          <BodySmallText>
            I've worked with a lot of frameworks, languages and platforms over
            the years but my typical focus is functional & object-oriented
            programming in Typescript/Javascript ES6.
            <br />
            <br />
          </BodySmallText>
        </Section>
        <Section as="div" size="mid">
          <TechGridList />
        </Section>
      </Section>
      <Section size="full">
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
      <Section id="tech-stack">
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

const techListData = (): GridColumns => [
  // Creative Tech
  [
    // Each Line can have multiple links
    [
      ["Three.js", "https://threejs.org/"],
      ["Pixi.js", "https://www.pixijs.com/"],
    ],
    [["thi.ng/umbrella", "https://thi.ng/"]],
    [
      ["WebGL", "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API"],
      ["GLSL", ""],
      ["twgl", "http://twgljs.org/"],
    ],
    [
      ["Canvas", "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"],
      ["WebAudio", ""],
    ],
    [
      ["Workers", ""],
      ["Wasm", ""],
      ["TypedArrays", ""],
    ],
    [
      ["WebVR", ""],
      ["WebAR", ""],
      ["WebXR", ""],
    ],
  ],
  // Front End
  [
    [
      ["Typescript", ""],
      ["Javascript ES6", ""],
    ],
    [
      ["React", ""],
      ["Redux", ""],
      ["Storybook", ""],
    ],
    [
      ["Styled Components", ""],
      ["JSS", ""],
      ["Emotion", ""],
    ],
    [
      ["Material UI", ""],
      ["Theme UI", ""],
    ],

    [
      ["Webpack", ""],
      ["Babel", ""],
      ["Rollup", ""],
    ],
    [
      ["Jest", ""],
      ["Testing Library", ""],
    ],
  ],
  // Backend
  [
    [
      ["Node.js", ""],
      ["Express", ""],
      ["Next.js", ""],
    ],
    [
      ["Lerna", ""],
      ["Yarn", ""],
      ["Npm", ""],
    ],
    [
      ["Git", ""],
      ["CI", ""],
      ["Github Actions", ""],
    ],
    [
      ["MongoDB", ""],
      ["Mongoose", ""],
    ],
    [
      ["Docker", ""],
      ["Kubernetes", ""],
    ],
    [
      ["JAMStack", ""],
      ["Headless", ""],
    ],
    [
      ["Contentful", ""],
      ["Shopify", ""],
    ],
  ],
  // Generalist
  [
    [
      ["Python", ""],
      ["Jupyter Lab", ""],
    ],
    [
      ["OpenCV", ""],
      ["NLTK", ""],
    ],
    [["OpenFrameworks", ""]],
    [
      ["Sketch", ""],
      ["Figma", ""],
      ["Adobe CC", ""],
    ],
    [
      ["Framer", "https://www.framer.com/"],
      ["Framer Motion", "https://www.framer.com/motion/"],
    ],
    [
      ["Maya", ""],
      ["Houdini", ""],
    ],
  ],
];

const interestData = () => ({});

type GridColumn = [label: string, url: string][][];
type GridColumns = [GridColumn, GridColumn, GridColumn, GridColumn];
type GridNames = [string, string, string, string];

const GridListColumn: FC<{ name: string; data: GridColumn }> = ({
  name,
  data,
}) => {
  return (
    <Container>
      <BodyHeader>{name}</BodyHeader>
      <ul>
        {data.map((line, i) => (
          <li key={i}>
            {line.map(([label, url], i) => (
              <Fragment key={i}>
                <Button href={url} size="small">
                  {label}
                </Button>
                {i === line.length - 1 ? "" : " / "}
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    </Container>
  );
};

const GridList: FC<{
  columns: GridColumns;
  names: GridNames;
}> = ({ columns, names }) => {
  return (
    <Grid variant="tech_list">
      {columns.map((col, i) => (
        <GridListColumn key={i} data={col} name={names[i]} />
      ))}
    </Grid>
  );
};

const TechGridList = () => {
  const data = useMemo(
    () => ({
      columns: techListData(),
      names: [
        "02.1 / Creative Tech",
        "02.2 / Frontend",
        "02.3 / Backend/Devops",
        "02.4 / Generalist",
      ] as GridNames,
    }),
    []
  );

  return <GridList columns={data.columns} names={data.names} />;
};
