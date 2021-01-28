import { ElementType, FC } from "react";
import { Container, Heading, Text } from "theme-ui";
import { Button } from "./Button";

export const NextButton: FC<{ href: string }> = ({ children, href = "/" }) => {
  return (
    <Button href={href}>
      <Text as="span" variant="navigation_body">
        {children}
      </Text>
    </Button>
  );
};
