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
    : { padding: "40px 0px 20px 0px" };

const backgroundPosition = (size: Size) =>
  size === "small"
    ? { backgroundPosition: "0px 34px" }
    : size === "medium"
    ? { padding: "10px 20px" }
    : { backgroundPosition: "0px 78px" };

const lineHeight = (size: Size) =>
  size === "small"
    ? { lineHeight: "48px" }
    : size === "medium"
    ? { lineHeight: "48px" }
    : { lineHeight: "48px" };

export const Button: FC<
  ComponentProps<typeof Link> & {
    onClick?: ReactEventHandler;
    size?: Size;
  }
> = ({ children, onClick = () => {}, sx = {}, size = "large", ...props }) => {
  return (
    <Link
      as="a"
      target="_blank"
      sx={{
        width: "100%",
        height: "100%",
        // lineHeight: "48px",
        cursor: "pointer",
        position: "relative",
        transition: "background-position 0.02s ease-out",
        ":hover": {
          transition: "background-position 0.08s ease-out",
          backgroundPosition: "0px 0px",
          color: "background",
        },
        display: "inline",
        background: (theme) =>
          `linear-gradient(${theme.colors.primary},${theme.colors.primary}) no-repeat`,
        ...backgroundPosition(size),
        ...padding(size),
        ...sx,
      }}
      onClick={onClick}
      onPointerOver={() => console.log("Pointer")}
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
