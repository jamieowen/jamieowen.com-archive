import { Children, cloneElement, FC, ReactElement, ReactNode } from "react";
import { Container, Text } from "theme-ui";
import { paletteGradientHSL, colorAsCSS } from "@jamieowen/color";

const grad = paletteGradientHSL([0.7, 0.5, 0.5], [1, 1, 1], 3);

export const TextFormatter: FC<{ children: ReactNode }> = ({ children }) => {
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
        fontFamily: "roboto",
        fontSize: "24px",
        fontWeight: "light",
        letterSpacing: "0.15rem",
        lineHeight: "42px",
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
