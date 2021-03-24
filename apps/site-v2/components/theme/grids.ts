import { Theme } from "theme-ui";

export const grids: Pick<Theme, "grids"> = {
  grids: {
    tech_list: {
      gap: ["8px", "16px"],
      gridTemplateColumns: ["1fr", "1fr 1fr"],
      ul: {
        display: "block",
        margin: "0px",
        padding: "0px",
        listStyleType: "none",
        fontFamily: "body",
        // fontSize: ["8px", "12px"],
        fontSize: "12px",
        lineHeight: "24px",
      },
      li: {
        // padding: 0,
        // margin: 0,
        // height: "24px",
        lineHeight: "24px",
      },
    },

    packages_grid: {
      gap: "16px",
      gridTemplateColumns: ["1fr", "1fr 1fr"],
    },

    grid_2: {
      gap: "16px",
      gridTemplateColumns: ["1fr", "1fr 1fr"],
    },
  },
};
