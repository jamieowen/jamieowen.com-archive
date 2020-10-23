import { render } from "@testing-library/react";
import React, { CSSProperties, FC, useState } from "react";
import { useObserverRef } from "./observer-context";
import { ObserverObject } from "./observer-manager";

export const Observe: FC<any> = ({ children }) => {
  const [state, setState] = useState({});
  const { ref, domRef } = useObserverRef(() => {
    // setUpdated({ id: updated.id + 1 });
    console.log("Observe changed...", ref.current.state);
    setState({ ratio: ref.current?.ratio, state: ref.current?.state });
  });
  console.log("Re-render");
  return children({ ref, domRef });
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
  textTransform: "uppercase",
};

export const Debug: FC<{ item: ObserverObject }> = ({ item, children }) => {
  return (
    <span style={debugStyle}>
      <div style={textStyle}>{item.state || "no-state"}</div>
      {children}
    </span>
  );
};
