import React, { FC, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectAnimate } from "./use-animate";
import { useObserverRef } from "./observer-context";
import { IntersectionObject } from "./observer-manager";

type MotionProps = {};

export const Motion2: FC<MotionProps> = ({ children }) => {
  const props = useIntersectAnimate((ratio: number) => ({
    opacity: ratio,
  }));
  // const variants = useVariants(intersection);
  // const isect = useObserverRef();
  return <motion.div {...props}>{children}</motion.div>;
};

let count = 0;
export const Motion: FC<MotionProps> = ({ children }) => {
  const [id, setId] = useState(++count);
  const [state, setState] = useState("hidden");
  const [updated, setUpdated] = useState({ id: 1 });
  const { ref, domRef } = useObserverRef(() => {
    setUpdated({ id: updated.id + 1 });
  });
  console.log("Re-render", updated);

  let color = "";
  switch (state) {
    case "hidden":
      color = "rgba(255,0,255,0.2)";
      break;
  }
  return (
    <motion.span ref={domRef}>
      <IntersectionDebug
        state={ref.current.ratio + " " + updated.id}
        color={color}
      >
        {children}
      </IntersectionDebug>
    </motion.span>
  );
};

export const IntersectionDebug: FC<any> = ({
  state = "state",
  color = "blue",
  children,
}) => {
  const bgColor = color;
  const msg = state;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: bgColor,
      }}
    >
      <div
        style={{
          fontSize: 8,
          right: "0px",
          textTransform: "uppercase",
          position: "absolute",
        }}
      >
        {msg}
      </div>
      {children}
    </div>
  );
};
