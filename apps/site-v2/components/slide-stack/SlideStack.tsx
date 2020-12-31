import { useColorContext } from "components/context/ColorContext";
import { FC, Children, useState } from "react";
import { Container } from "theme-ui";
import { motion } from "framer-motion";

type StackMode = "root" | "stacked" | "hover" | "expanded";

const getPosition = (
  index: number,
  mode: StackMode,
  hoverIndex: number,
  selectedIndex: number
) => {
  let hoverOffset: number;
  if (hoverIndex === null) {
    hoverOffset = 0;
  } else if (index === hoverIndex) {
    hoverOffset = -5;
  } else if (index < hoverIndex) {
    hoverOffset = -10;
  } else {
    hoverOffset = 5;
  }
  switch (mode) {
    case "root":
      if (index === 0) {
        return "0%";
      } else {
        return `calc(100% - ${(3 - index) * 30}px )`;
      }
    case "stacked":
      return index * 33.33 + hoverOffset + "%";
    case "expanded":
      return index * 20 + (index > selectedIndex ? 40 : 0) + hoverOffset + "%";
    default:
      return index * 33.33 + "%";
  }
};

const onClick = (
  index: number,
  mode: StackMode,
  selectedIndex: number,
  setMode: (mode: StackMode) => void,
  setSelectedIndex: (index: number) => void
) => {
  console.log("on click", mode, selectedIndex, index);
  switch (index) {
    case 0:
      if (mode !== "root") {
        setMode("root");
      } else if (mode === "root") {
        setMode("stacked");
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

export const SlideStack: FC<any> = ({ children }) => {
  const colorContext = useColorContext();
  const [mode, setMode] = useState<StackMode>("root");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  console.log("Slide : ", mode, selectedIndex, hoverIndex);
  const slides = Children.map(children, (child, i) => {
    const color = colorContext.palette.backgroundRange[i];
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
        <Slide bgColor={color}>{child}</Slide>
      </motion.div>
    );
  });
  return (
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
  );
};

export const Slide: FC<{ bgColor: string }> = ({
  children,
  bgColor = "crimson",
}) => {
  return (
    <Container
      style={{ backgroundColor: bgColor }}
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        padding: "4rem",
      }}
    >
      {/* Shadow */}
      <Container
        sx={{
          width: "100%",
          height: "16px",
          margin: "-4rem",
          position: "fixed",
          opacity: "0.1",
          backgroundColor: "black",
        }}
      ></Container>
      {children}
    </Container>
  );
};
