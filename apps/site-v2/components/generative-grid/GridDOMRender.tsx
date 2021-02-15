import React, { FC, HTMLAttributes } from "react";
import { Box } from "theme-ui";
import { useGenerativeGrid } from "./GenerativeGridContext";

export const GridDOMRender: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { grid, size, random } = useGenerativeGrid();

  return (
    <Box {...props}>
      {grid.map(([x, y, step, depth], i) => (
        <div
          key={i}
          style={{
            width: step * size,
            height: step * size,
            top: y * size,
            left: x * size,
            position: "absolute",
            backgroundColor: `rgba(0,0,0,${random.float() * 0.1})`,
            boxSizing: "border-box",
            border: "1px solid white",
            visibility: "hidden",
          }}
        />
      ))}
    </Box>
  );
};
