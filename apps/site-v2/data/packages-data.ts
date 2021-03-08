import { PackageDataRoot } from "types";

/**
 * Data for github packages repo. Linking to various
 * code examples.
 */
export const packagesData: PackageDataRoot = {
  packages: [
    {
      href: "https://www.npmjs.com/package/@jamieowen/layout",
      title: "@jamieowen/layout",
      examples: [
        {
          id: "infinite-grid",
          href: "/packages/infinite-grid",
          iframe: "https://jamieowen.github.io/packages/infinite-grid.html",
          video: "/local/url",
          image: "",
          title: "Infinite Grid Variations",
          description:
            "Stream based grid/subgrid iterators. With szudzik pair indices for unique cell ids.",
        },
      ],
    },
    {
      href: "https://www.npmjs.com/package/@jamieowen/motion",
      title: "@jamieowen/motion",
      examples: [
        {
          id: "motion-trails",
          href: "/packages/motion-trails",
          iframe: "https://jamieowen.github.io/packages/motion-trails.html",
          video: "/local/url",
          image: "",
          title: "Motion Trails",
          description: "Part of an on going look a stream based motion system",
        },
      ],
    },
    {
      href: "https://www.npmjs.com/package/@jamieowen/webgl",
      title: "@jamieowen/webgl",
      examples: [
        {
          id: "gpgpu-state",
          href: "/packages/gpgpu-state",
          iframe: "https://jamieowen.github.io/packages/gpgpu-state.html",
          video: "/local/url",
          image: "",
          title: "GPGPU State",
          description:
            "State management abstractions for maintainting GPU state.",
        },
        {
          id: "gpgpu-particles",
          href: "/packages/gpgpu-particles",
          iframe: "https://jamieowen.github.io/packages/gpgpu-state.html",
          video: "/local/url",
          image: "",
          title: "GPGPU Particles",
          description:
            "GPU based particle system. Composable functions for emitters, forces & behaviours, written in @thi.ng/shader-ast ",
        },
      ],
    },
    // {
    //   href: "https://www.npmjs.com/package/@jamieowen/react",
    //   title: "@jamieowen/react",
    //   examples: [
    //     {
    //       slug: "react-layout-scheduler",
    //       title: "React Layout Scheduler",
    //       description: "Layout Scheduler",
    //       href: "https://jamieowen.github.io/packages/",
    //       image:
    //         "https://buffer.com/library/content/images/size/w1200/library/wp-content/uploads/2016/06/giphy.gif",
    //     },
    //   ],
    // },
  ],
};
