import { PackageDataRoot } from "types";

/**
 * Data for sketches / play
 */
export const sketchesData: PackageDataRoot = {
  packages: [
    {
      href: "",
      title: "Sketches",
      examples: [
        {
          id: "color-palette-grid",
          href: "/play/color-palette-grid",
          iframe:
            "https://jamieowen.github.io/jamieowen.com-archive/color-scene-grid.html",
          video: "",
          // "https://fra1.digitaloceanspaces.com/jamieowen/videos/sketches/color-palette-grid.mp4",
          image: "/assets/videos/sketches/color-palette-grid.jpg",
          title: "Color Palette Grid",
          code: "https://github.com/jamieowen/jamieowen.com-archive/blob/master/sketches/src/color-scene-grid.ts",
          description:
            "Color theory grid, with generative, color wheel based palettes.",
        },
        {
          id: "curl-particles",
          href: "/play/curl-particles",
          iframe:
            "https://jamieowen.github.io/jamieowen.com-archive/particles/particles-basics.html",
          video: "",
          //"https://fra1.digitaloceanspaces.com/jamieowen/videos/sketches/particles-basics.mp4",
          image: "/assets/videos/sketches/particles-basics.jpg",
          title: "Curl Particles",
          code: "https://github.com/jamieowen/jamieowen.com-archive/blob/master/sketches/src/particles/particles-basics.ts",
          description: "Simple curl noise and GPGPU state sim.",
        },
        // {
        //   slug: "/play/color-grid",
        //   title: "Skin Color Wheel",
        //   description: "",
        //   href: "https://jamieowen.github.io/packages/",
        //   image:
        //     "https://buffer.com/library/content/images/size/w1200/library/wp-content/uploads/2016/06/giphy.gif",
        // },
      ],
    },
  ],
};
