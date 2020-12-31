import React, { DependencyList, FC, useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, Container, Grid, CSSProperties, Text } from "theme-ui";
import { motion, TargetAndTransition, Variants, Variant } from "framer-motion";
import { Weather, Time } from "./Weather";
import { useRouter } from "next/router";
import { Styled } from "theme-ui";

enum Mode {
  Hidden = "hidden",
  Minimised = "minimised",
  Maximised = "maximised",
}

const animateVariants: { [key in Mode]: Variant } = {
  hidden: {
    top: "-8rem",
  },
  minimised: {
    top: "-4rem",
  },
  maximised: {
    top: "0rem",
  },
};

const toggleMode = (mode: Mode): Mode => {
  const modes = Object.values(Mode);
  const idx = modes.indexOf(mode);
  return modes[(idx + 1) % modes.length];
};

const NavigationLink: FC<{ href: string }> = ({ children, href }) => {
  const router = useRouter();
  const style =
    href !== "/" && router.pathname === href
      ? { textDecoration: "underline" }
      : {};
  return (
    <Text variant="navigation_link" sx={style}>
      <Link href={href}>{children}</Link>
    </Text>
  );
};

export const Navigation: FC<any> = () => {
  const [mode, setMode] = useState<Mode>(Mode.Minimised);
  useKey("a", () => setMode(toggleMode(mode)), [mode, setMode]);
  return (
    <motion.nav
      initial={Mode.Hidden}
      style={{ position: "absolute", zIndex: 1000, width: "100%" }}
      animate={mode}
      variants={animateVariants}
    >
      <Container variant="navigation">
        <Container variant="content_center">
          <Grid variant="navigation">
            <Box>
              <Text variant="navigation" sx={{ textAlign: "left" }}>
                <NavigationLink href="/">London, UK</NavigationLink>
                <Weather />
                <Time />
              </Text>
            </Box>
            <Box>
              <Text variant="navigation" sx={{ textAlign: "center" }}>
                <Styled.em>Get in Touch</Styled.em>
              </Text>
            </Box>
            <Box>
              <Text variant="navigation" sx={{ textAlign: "right" }}>
                <NavigationLink href="/about">About</NavigationLink>
                <NavigationLink href="/selected-work">Work</NavigationLink>
                {/* <Link href="/archived-work">Ae</Link> */}
                {/* <Link href="/writing">Writing</Link> */}
                {/* <NavigationLink href="/about">Play</NavigationLink> */}
              </Text>
            </Box>
          </Grid>
        </Container>
      </Container>
    </motion.nav>
  );
};

const useKey = (key: string, action: () => void, dep?: DependencyList) => {
  useEffect(() => {
    const onKeyUp = (ev: KeyboardEvent) => {
      if (ev.key === key.toLowerCase()) {
        action();
      }
    };
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, dep);
};
