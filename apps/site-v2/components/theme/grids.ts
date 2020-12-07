import { Theme } from "theme-ui";

export const grids: Pick<Theme, "grids"> = {
  grids: {
    /** Navigation Bar Grid */
    navigation: {
      gap: "1rem",
      gridTemplateColumns: "1fr 2fr 1fr",
    },
    /** Main 4 Col Grid */
    primary: {
      width: "100%",
      gap: "1rem",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
    grid_3: {
      width: "100%",
      gap: "1rem",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    /** Media Grid */
    media_grid: {
      overflow: "hidden",
      gap: "3rem",
    },
  },
};