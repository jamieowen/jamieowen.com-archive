import { Children, cloneElement, FC, ReactElement, ReactNode } from "react";
import { Container, Text } from "theme-ui";
import { paletteGradientHSL, colorAsCSS } from "@jamieowen/color";

const grad = paletteGradientHSL([0.7, 0.5, 0.5], [1, 1, 1], 3);

export const TextFormatter: FC<{
  children: ReactNode;
  size?: string;
  lineHeight?: string;
}> = ({ children, size = "32px", lineHeight = "48px" }) => {
  // console.log("CHILDREN", children);
  const mappedChildren = Children.map(children, (node: ReactElement, i) => {
    // console.log("CHILD", typeof node, node);
    if (typeof node === "object") {
      // console.log("clone");
      return cloneElement(node, {
        ...node.props,
        key: i,
        style: {
          color: colorAsCSS(grad[i % (grad.length - 1)]),
        },
      });
    } else {
      return node;
    }
  });

  return (
    <Text
      variant="body_title"
      as="div"
      sx={{
        color: "#333",
        fontFamily: "roboto",
        // opacity: "0.3",
        fontSize: size,
        // fontWeight: "light",
        fontWeight: "light",
        // maxWidth: "80%",
        textAlign: "justify",
        // letterSpacing: "0.12rem",
        letterSpacing: "0.08rem",
        // lineHeight: "54px",
        lineHeight: lineHeight,
        textTransform: "uppercase",
        overflow: "scroll",
        strong: {
          fontStyle: "normal",
          fontWeight: "bold",
        },
        em: {
          fontStyle: "normal",
          fontWeight: "semibold",
        },
      }}
    >
      {mappedChildren}
    </Text>
  );
};
