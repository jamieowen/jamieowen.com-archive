import { FC } from "react";
import { Container, useColorMode } from "theme-ui";
import { colors } from "components/theme/colors";

export const SidePanel: FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();

  const colorModes = [
    colors.initialColorModeName,
    ...Object.keys(colors.colors.modes),
  ].map((key, i) => {
    return (
      <div
        key={i}
        onClick={() => {
          setColorMode(key);
        }}
      >
        {key}
      </div>
    );
  });
  return <Container variant="side_panel">{colorModes}</Container>;
};
