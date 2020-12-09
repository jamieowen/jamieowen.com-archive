import React, { FC, Fragment } from "react";
import { Text } from "theme-ui";
import { BoxColumn } from "./containers";

export const BlockType: FC<{ title?: string }> = ({
  children,
  title = undefined,
}) => {
  return (
    <BoxColumn>
      {title ? <Text variant="subtitle_heading">{title}</Text> : null}
      <Text
        variant="body_title"
        // sx={{ fontSize: 4, lineHeight: "3rem", fontWeight: "semibold" }}
      >
        {children}
      </Text>
    </BoxColumn>
  );
};
