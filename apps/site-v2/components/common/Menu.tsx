import Link from "next/link";
import { ElementType, FC, Fragment, useMemo } from "react";
import { Container, Heading, Text } from "theme-ui";
import { Button } from "./Button";
import { BodyHeader, Section } from "./Common";

export const Menu: FC<{}> = ({ children }) => {
  return (
    <Section as="nav">
      <BodyHeader>00 / Menu</BodyHeader>
      <MenuItems />
    </Section>
  );
};

// const MenuItem2: FC<{ label: string; href: string }> = ({ label, href }) => {
//   return (
//     <Link
//       // href={href}
//       onClick={() => console.log("Do Click", href)}
//       variant="body_small"
//       sx={{
//         cursor: "pointer",
//         marginRight: "16px",
//         transition: "opacity 0.1s ease-out",
//         ":hover": {
//           opacity: 0.4,
//         },
//       }}
//     >
//       <Text variant="body_small" as="span">
//         {label}
//       </Text>
//     </Link>
//   );
// };

const MenuItem: FC<{ label: string; href: string }> = ({ label, href }) => {
  return (
    <Button
      size="small"
      href={href}
      onClick={() => console.log("Do Click", href)}
      sx={{
        cursor: "pointer",
        marginRight: "16px",
        // transition: "opacity 0.1s ease-out",
        // ":hover": {
        //   opacity: 0.4,
        // },
      }}
    >
      <Text variant="body_small" as="span">
        {label}
      </Text>
    </Button>
  );
};

export const MenuItems: FC<{}> = () => {
  const links = useMemo(
    () => [
      { label: "Intro.", href: "/" },
      { label: "Recent Work.", href: "/recent-work" },
      { label: "Tech Stack.", href: "/tech-stack", break: true },
      { label: "Get In Touch.", href: "/get-in-touch" },
      { label: "Archived.", href: "/archived-work" },
      { label: "Interests.", href: "/interests" },

      { label: "Github.", href: "https://github.com/jamieowen" },
      // { label: "LinkedIn.", href: "https://www.linkedin.com/in/jamie-owen" },
    ],
    []
  );

  return (
    <Container>
      {links.map((link, i) => (
        <Fragment key={i}>
          <MenuItem {...link} />
          {link.break ? <br /> : null}
        </Fragment>
      ))}
    </Container>
  );
};
