import React, { DependencyList, FC, useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, Container, Grid, CSSProperties, Text } from "theme-ui";
import { motion, TargetAndTransition, Variants, Variant } from "framer-motion";

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
export const Navigation: FC<any> = () => {
  const [mode, setMode] = useState<Mode>(Mode.Maximised);
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
              <Link href="/">
                <Text variant="navigation" sx={{ textAlign: "left" }}>
                  London 20<sup>c</sup> 103:40
                </Text>
              </Link>
            </Box>
            <Box>
              <Text variant="navigation" sx={{ textAlign: "center" }}>
                Get in Touch
              </Text>
            </Box>
            <Box>
              <Text variant="navigation" sx={{ textAlign: "right" }}>
                <Link href="/">Hom</Link>
                <Link href="/about">About</Link>
                <Link href="/selected-work">Work</Link>
                {/* <Link href="/archived-work">Ae</Link> */}
                {/* <Link href="/writing">Writing</Link> */}
                <Link href="/about">Play</Link>
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

// import React, { FC } from "react";
// import Link from "next/link";
// import { PageItem } from "../services/fetch-pages";

// type NavigationProps = {
//   items: PageItem[];
// };
// export const Navigation: FC<NavigationProps> = ({ items = [] }) => {
//   return (
//     <div>
//       {items.map((item, i) => {
//         return (
//           <Link key={i} href={item.url}>
//             <div>{item.url}</div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };
