import { PackageDataRoot } from "types";

/**
 * Data for github packages repo. Linking to various
 * code examples.
 */
export const packagesData: PackageDataRoot = {
  packages: [
    {
      href: "https://www.npmjs.com/package/@jamieowen/layout",
      // title: "@jamieowen/layout",
      title: "",
      examples: [
        {
          id: "infinite-grid",
          href: "/packages/infinite-grid",
          iframe: "https://jamieowen.github.io/packages/infinite-grid.html",
          video:
            "https://fra1.digitaloceanspaces.com/jamieowen/videos/packages/infinite-grid.mp4",
          image: "/assets/videos/packages/infinite-grid.jpg",
          title: "Infinite Grid Variations",
          code: "https://github.com/jamieowen/packages/blob/develop/examples/src/infinite-grid-example.ts",
          description:
            "Stream based, grid & seeded subgrid iterators. With szudzik pair indices for unique cell ids.",
        },
        {
          id: "motion-trails",
          href: "/packages/motion-trails",
          iframe: "https://jamieowen.github.io/packages/motion-trails.html",
          video:
            "https://fra1.digitaloceanspaces.com/jamieowen/videos/packages/motion-trails.mp4",
          image: "/assets/videos/packages/motion-trails.jpg",
          title: "Motion Trails",
          code: "https://github.com/jamieowen/packages/blob/develop/examples/src/motion-trails-example.ts",
          description: "Initial test for a stream based motion library.",
        },
        {
          id: "gpgpu-state",
          href: "/packages/gpgpu-state",
          iframe: "https://jamieowen.github.io/packages/gpgpu-state.html",
          video:
            "https://fra1.digitaloceanspaces.com/jamieowen/videos/packages/gpgpu-state.mp4",
          image: "/assets/videos/packages/gpgpu-state.jpg",
          title: "GPGPU State",
          code: "https://github.com/jamieowen/packages/blob/develop/examples/src/gpgpu-state.ts",
          description:
            "State management abstractions for maintaining GPU state.",
        },
      ],
    },
    // {
    //   href: "https://www.npmjs.com/package/@jamieowen/motion",
    //   title: "@jamieowen/motion",
    //   examples: [],
    // },
    // {
    //   href: "https://www.npmjs.com/package/@jamieowen/webgl",
    //   title: "@jamieowen/webgl",
    //   examples: [
    //     // {
    //     //   id: "gpgpu-particles",
    //     //   href: "/packages/gpgpu-particles",
    //     //   iframe: "https://jamieowen.github.io/packages/gpgpu-state.html",
    //     //   video: "/assets/packages/gpgpu-particles.mp4",
    //     //   image: "",
    //     //   title: "GPGPU Particles",
    //     //   description:
    //     //     "GPU based particle system. Composable functions for emitters, forces & behaviours, written in @thi.ng/shader-ast ",
    //     // },
    //   ],
    // },
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
