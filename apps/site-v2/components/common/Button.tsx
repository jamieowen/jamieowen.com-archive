import { FC, ReactEventHandler, ComponentProps } from "react";
import { Container, Link, CSSProperties } from "theme-ui";

const background = (): CSSProperties => {
  return {};
};

type Size = "small" | "medium" | "large";

const padding = (size: Size) =>
  size === "small"
    ? { padding: "8px 0px 8px 0px" }
    : size === "medium"
    ? { padding: "10px 20px" }
    : { padding: "10px 0px 10px 0px" };

// const backgroundPosition = (size: Size) =>
//   size === "small"
//     ? { backgroundPosition: "0px 34px" }
//     : size === "medium"
//     ? { padding: "10px 20px" }
//     : { backgroundPosition: "0px 78px" };

// const lineHeight = (size: Size) =>
//   size === "small"
//     ? { lineHeight: "48px" }
//     : size === "medium"
//     ? { lineHeight: "48px" }
//     : { lineHeight: "48px" };

export const Button: FC<
  ComponentProps<typeof Link> & {
    onClick?: ReactEventHandler;
    size?: Size;
  }
> = ({
  children,
  onClick = () => {},
  sx = {},
  size = "large",
  href,
  ...props
}) => {
  return (
    <Link
      as="a"
      href={href}
      target={href && href.indexOf("http") === 0 ? "_blank" : undefined}
      sx={{
        width: "100%",
        height: "100%",
        lineHeight: size === "large" ? "40px" : "32px",
        cursor: "pointer",
        position: "relative",
        ":hover": {
          color: "background",
          backgroundColor: (theme) => theme.colors.primary,
        },
        ...padding(size),
        ...sx,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 *           sx={{
            ":hover": {
              backgroundColor: "red",
              cursor: "pointer",
            },
          }}
 */

// transition: "background-position 0.02s ease-out",
// ":hover": {
//   transition: "background-position 0.08s ease-out",
//   backgroundPosition: "0px 0px",
//   color: "background",
// },
// display: "inline",
// background: (theme) =>
//   `linear-gradient(${theme.colors.primary},${theme.colors.primary}) no-repeat`,
// ...backgroundPosition(size),
// ...padding(size),
// ...sx,
