import { Theme } from "theme-ui";

export const grids: Pick<Theme, "grids"> = {
  grids: {
    tech_list: {
      gap: "16px",
      maxWidth: "80%",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      ul: {
        display: "block",
        margin: "0px",
        padding: "0px",
        listStyleType: "none",
        fontFamily: "roboto",
        fontSize: "12px",
        lineHeight: "24px",
      },
    },

    /** Navigation Bar Grid */
    navigation: {
      gap: "1rem",
      gridTemplateColumns: "1fr 2fr 1fr",
    },
    /** Main 4 Col Grid - PHASE OUT??*/
    primary: {
      width: "100%",
      gap: "1rem",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
    grid_2: {
      width: "100%",
      gap: "6rem",
      gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr"],
    },
    grid_3: {
      width: "100%",
      gap: "3rem",
      gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"],
    },
    grid_cap: {
      width: "100%",
      gap: "0rem",
      gridTemplateColumns: ["1fr", "1fr", "1fr"],
    },
    /** Media Grid */
    media_grid: {
      overflow: "hidden",
      gap: "3rem",
    },
  },
};
