import { useColorContext } from "components/context/ColorContext";
import {
  FC,
  Children,
  useState,
  createContext,
  useContext,
  useMemo,
  MouseEvent,
  cloneElement,
  forwardRef,
} from "react";
import { useRouter } from "next/router";
import { Container } from "theme-ui";
import { motion } from "framer-motion";
import { ProjectData } from "types";

type StackMode = "root" | "stacked" | "hover" | "expanded";

const getPosition = (
  index: number,
  mode: StackMode,
  hoverIndex: number,
  selectedIndex: number
) => {
  const hoverMin = 5;
  const hoverMax = 10;
  const rootHeight = 8;

  let hoverOffset: number;
  if (hoverIndex === null) {
    hoverOffset = 0;
  } else if (index === hoverIndex) {
    hoverOffset = -hoverMin;
  } else if (index < hoverIndex) {
    hoverOffset = -hoverMax;
  } else {
    hoverOffset = hoverMin;
  }
  switch (mode) {
    case "root":
      if (index === 0) {
        return "0%";
      } else {
        return `calc(100% - ${(3 - index) * rootHeight}px )`;
      }
    case "stacked":
      return index * 33.33 + hoverOffset + "%";
    case "expanded":
      return index * 20 + (index > selectedIndex ? 40 : 0) + hoverOffset + "%";
    default:
      return index * 33.33 + "%";
  }
};

/**
 * The click handler for all slides.
 * Depending on current stack state, behave differently.
 *
 * @param index
 * @param mode
 * @param selectedIndex
 * @param setMode
 * @param setSelectedIndex
 */
const onClick = (
  index: number,
  mode: StackMode,
  selectedIndex: number,
  setMode: (mode: StackMode) => void,
  setSelectedIndex: (index: number) => void
) => {
  console.log("on click", mode, selectedIndex, index);

  // Check the index of each slide. ( This is the click action )
  // As a reminder :
  // The 'root' state is the intro slide fully shown.
  // 'stacked' is all slides shown with equal visual distribution.
  // 'expanded' is either the 2nd or 3rd slide showing to the maximum extent.
  // A slide is marked as 'selected' ( and scrollable ) when fully expanded or in the 'root' state for slide 0

  switch (index) {
    case 0:
      if (mode !== "root") {
        setMode("root");
        setSelectedIndex(0);
      } else if (mode === "root") {
        // Disable
        // setMode("stacked");
        // setSelectedIndex(-1);
      }
      break;
    case 1:

    case 2:
      if (mode === "stacked") {
        setSelectedIndex(index);
        setMode("expanded");
      } else if (mode === "expanded" && index !== selectedIndex) {
        setSelectedIndex(index);
        // setMode("stacked");
      }
      break;
  }
};

const onNavigationClick = (ev: MouseEvent<any>) => {
  // move to stacked state.
  //
};

interface ISlideStackContext {
  launchProject: (ev: MouseEvent<any>, project: ProjectData) => void;
  stackMode: StackMode;
}
const SlideStackContext = createContext<ISlideStackContext>(null!);

export const useSlideContext = () => {
  const context = useContext(SlideStackContext);
  return context;
};

export const SlideStack: FC<any> = ({ children }) => {
  // Color? May shift to theme-ui
  // const colorContext = useColorContext();
  const router = useRouter();

  // Stack mode, hover & seelcted index.
  const [mode, setMode] = useState<StackMode>("stacked");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Current animate state to new project
  const [nextProject, setNextProject] = useState<ProjectData>(null!);

  const contextValue = useMemo<ISlideStackContext>(() => {
    console.log("Create new context value...");
    return {
      stackMode: mode,
      launchProject: (ev, project) => {
        setMode("expanded");
        setSelectedIndex(1);
        setNextProject(project);
        router.push(project.url);
      },
    };
  }, [nextProject, mode]);

  // console.log(
  //   "Slide Stack UPDATE : ( selected/hover ) ",
  //   selectedIndex,
  //   hoverIndex,
  //   "Current Mode:",
  //   mode
  // );

  const slides = Children.map(children, (child, i) => {
    // const color = colorContext.palette.backgroundRange[i];
    const padding =
      child.props.padding === undefined ? true : child.props.padding;
    const selected = i === selectedIndex;
    const hover = i === hoverIndex;
    return (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: i,
        }}
        animate={{
          y: getPosition(i, mode, hoverIndex, selectedIndex),
          transition: {
            type: "spring",
            damping: 40,
            stiffness: 350,
            // delay: mode === "stacked" && hoverIndex === i ? 0 : 0.5,
            // duration: 0.8,
            // ease: "easeOut",
          },
        }}
        onPointerEnter={() => setHoverIndex(i)}
        onPointerLeave={() => setHoverIndex(null)}
        onClick={() =>
          onClick(i, mode, selectedIndex, setMode, setSelectedIndex)
        }
      >
        {cloneElement(child, {
          // bgColor: color,
          padding,
          selected,
          hover,
        })}
        {/* <Slide
          bgColor={color}
          padding={padding}
          selected={selected}
          hover={hover}
        >
          {child}
        </Slide> */}
      </motion.div>
    );
  });
  return (
    <SlideStackContext.Provider value={contextValue}>
      <Container
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "fixed",
        }}
      >
        {slides}
      </Container>
    </SlideStackContext.Provider>
  );
};

export type SlideContainerProps = Partial<{
  bgColor: string;
  padding: boolean;
  selected: boolean;
  hover: boolean;
}>;

export const SlideContainer = forwardRef<HTMLDivElement, SlideContainerProps>(
  (
    {
      children,
      bgColor = "crimson",
      padding = true,
      selected = false,
      hover = false,
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        variant="slide_container"
        data-slide={true}
        // onScroll={(ev) => console.log("on scroll", ev.currentTarget.scrollTop)}
        sx={{
          pointerEvents: selected ? "all" : "none",
          overflow: selected ? "scroll" : "hidden",
          padding: padding ? "4rem 4rem 4rem 4rem" : "0rem",
        }}
      >
        {/* Shadow */}
        <Container
          variant="slide_shadow"
          sx={{
            margin: padding ? "-4rem" : "0rem",
          }}
        ></Container>
        {children}
      </Container>
    );
  }
);
