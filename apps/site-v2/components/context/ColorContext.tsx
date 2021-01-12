import { useContext, createContext, useMemo, FC } from "react";
import {
  complement,
  parseCss,
  colorAsCSS,
  paletteForegroundBackground,
  paletteColorRangeHSL,
} from "@jamieowen/color";

type Color = string;
export type ColorPalette = {
  background: Color;
  foreground: Color;
  backgroundRange: Color[];
  foregroundRange: Color[];
  // complements: {
  //   primary: Color;
  //   secondary: Color;
  //   tertiary: Color;
  //   primaryRange: Color[];
  //   secondaryRange: Color[];
  //   tertiaryRange: Color[];
  // };
};

export type IColorContext = {
  palette: ColorPalette;
};

export const ColorContext = createContext<IColorContext>(null!);
export const useColorContext = () => useContext(ColorContext);

export const ColorContextProvider: FC<any> = ({ children }) => {
  const color = "hotpink";
  const value = useMemo<IColorContext>(() => {
    const base = parseCss(color);
    const fgbg = paletteForegroundBackground(base);
    const bg = fgbg[0];
    const fg = fgbg[1];
    const bgRange = paletteColorRangeHSL(bg, { steps: 3, range: 0.08 });
    const fgRange = paletteColorRangeHSL(fg, { steps: 3, range: 0.08 });
    return {
      palette: {
        background: colorAsCSS(bg),
        foreground: colorAsCSS(fg),
        foregroundRange: fgRange.map(colorAsCSS),
        backgroundRange: bgRange.map(colorAsCSS),
      },
    };
  }, [color]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
