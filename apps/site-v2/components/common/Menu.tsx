import Link from "next/link";
import { ElementType, FC, Fragment, useMemo } from "react";
import { Container, Heading, Text } from "theme-ui";
import { Button } from "./Button";

export const Menu: FC<{}> = ({ children }) => {
  return <Text variant="body">{children}</Text>;
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
      // href={href}
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
      { label: "Intro.", href: "#intro" },
      { label: "Tech Stack.", href: "#tech-stack" },
      { label: "Recent Work.", href: "#recent-work", break: true },
      { label: "Archive.", href: " " },
      { label: "Get In Touch.", href: " " },
      { label: "Github.", href: " " },
      { label: "LinkedIn.", href: " " },
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
