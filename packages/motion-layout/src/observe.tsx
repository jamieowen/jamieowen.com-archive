import React, { CSSProperties, FC, useState } from "react";
import { SchedulerItem } from "./scheduler-item";
import { useObserver } from "./use-observer";

export const Observe: FC<any> = ({ children }) => {
  const [state, setState] = useState({});
  const { ref, domRef, item } = useObserver(() => {
    // setUpdated({ id: updated.id + 1 });
    // console.log("Observe changed...", ref.current.state);
    setState({ ratio: ref.current?.ratio, state: ref.current?.state });
  });
  console.log("observe....re-render");
  return children({ ref, domRef, item });
};

const debugStyle: CSSProperties = {
  backgroundColor: "rgba(0,0,0,0.1)",
  display: "inline-block",
  border: "1px solid white",
  boxSizing: "border-box",
  position: "relative",
};

const textStyle: CSSProperties = {
  position: "absolute",
  top: "0x",
  right: "0px",
  fontSize: "8px",
  letterSpacing: 0.7,
  textTransform: "uppercase",
};

export const Debug: FC<{ item: SchedulerItem }> = ({ item, children }) => {
  return (
    <span style={debugStyle}>
      <div style={textStyle}>{item.state || "no-state"}</div>
      {children}
    </span>
  );
};
