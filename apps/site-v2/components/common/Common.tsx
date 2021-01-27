import { ElementType, FC } from "react";
import { Container, Heading, Text } from "theme-ui";

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
