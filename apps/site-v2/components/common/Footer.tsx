import React, { FC } from "react";
import { Container } from "theme-ui";
import { HeroType } from ".";

export const Footer: FC<any> = ({ children }) => {
  return (
    <Container as="footer" variant="footer_normal">
      <Container variant="content_center">
        <HeroType>
          Footer - TODO set to footer html element...{children}
        </HeroType>
      </Container>
    </Container>
  );
};
