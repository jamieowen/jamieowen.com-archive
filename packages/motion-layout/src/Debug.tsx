import React, { CSSProperties, FC } from "react";

// Types

const debugStyle: CSSProperties = {
  // backgroundColor: "rgba(0,0,0,0.1)",
  display: "inline-block",
  // border: "1px solid white",
  // boxSizing: "border-box",
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

export const Debug: FC<{ item: any | any }> = ({ item, children }) => {
  // item = { state: "nnono" };
  return (
    <span style={debugStyle}>
      <div style={textStyle}>{item.intersectionRatio}</div>
      {children}
    </span>
  );
};
