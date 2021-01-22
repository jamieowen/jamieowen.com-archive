import { defaultIpsum, lorumIpsum } from "components/helpers/lorumIpsum";
import { TextFormatter } from "components/text-formatter";
import { useRouter } from "next/router";
import { CSSProperties, FC, useEffect, useMemo, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { ProjectData } from "types";
import { Link } from "theme-ui";
import {
  useSlideContext,
  SlideContainer,
  SlideContainerProps,
} from "./SlideStack";
import { useProjects } from "components/context/ProjectsContext";

const em = (): CSSProperties => ({
  verticalAlign: "super",
  fontSize: "12px",
  backgroundColor: "white",
  color: "black",
});

export const IntroTextSlide: FC<SlideContainerProps> = ({
  children,
  ...props
}) => {
  const { currentProject, projects } = useProjects();
  const context = useSlideContext();
  const slideRef = useRef<HTMLDivElement>();
  // const scrollValue = useMotionValue(0);

  const text = useMemo(() => defaultIpsum().generateParagraphs(3), []);

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
        <em style={{ ...em() }}> _00{i + 1}</em>
        <strong>{p.content.title} </strong>
        <strong>{p.content.client}</strong>
        <strong>{p.content.order} </strong>{" "}
      </Link>
    );

    return {
      ref,
      element,
      project: p,
    };
  });

  // Check current stack mode.
  // If stacked, then ensure active project is within scroll visibility.
  useEffect(() => {
    // console.log("REF", slideRef.current);
    // console.log("Selected Project : ", currentProject);
    if (context.stackMode !== "root" && currentProject) {
      const entry = projectLinks.filter(
        (p) => p.project.id === currentProject.id
      );
      if (entry.length > 0) {
        // Get scroll position for selected link and
        // focus within that area.
        const { ref, project } = entry[0];
        const top = ref.current.offsetTop;
        const mid = top + ref.current.offsetHeight / 2;
        slideRef.current.scrollTo({
          behavior: "smooth",
          top: top - 100,
        });
      } else {
        console.warn("In stack mode, but no current project set...");
      }
    }
  }, [context.stackMode, currentProject]);

  return (
    // @ts-ignore // unsure about this error..
    <SlideContainer {...props} ref={slideRef}>
      <TextFormatter>
        {/* <strong>Hello.</strong> You’ve reached the website of Jamie Owen, A{" "}
        <em>Creative Technologist</em> & <em>Software Engineer </em>based in
        London, UK. I have 18+ years of experience working with a range of
        coding platforms building creative web software for installations,
        mobile and desktop. */}
        {text}
        <p>
          Read more Below. Use your mouse or thumb pointer to interact with
          these digital words. Shuffle some Color Palettes. Select something at
          random. Or generate garbage. Once you are done, you get the
        </p>
        <strong>Work & recent projects include </strong>
        {/* <em>_001 </em>
      <strong>Systems Thinking / </strong>
      <em>Lloyds Banking Group</em>, _002 Multitouch Installations National
      Museum of Qatar @ AllOfUs, Google Livecase */}
        {projectLinks.map((l) => l.element)}
        {/* {text} */}
      </TextFormatter>
    </SlideContainer>
  );
};
