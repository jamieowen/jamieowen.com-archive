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
          slug: "infinite-grid",
          title: "Infinite Grid Variations",
          description:
            "Stream based grid/subgrid iterators. With szudzik pair indices for unique cell ids.",
          href: "https://jamieowen.github.io/packages/",
          image:
            "https://buffer.com/library/content/images/size/w1200/library/wp-content/uploads/2016/06/giphy.gif",
        },
      ],
    },
    {
      href: "https://www.npmjs.com/package/@jamieowen/motion",
      title: "@jamieowen/motion",
      examples: [
        {
          slug: "motion-trails",
          title: "Motion Trails",
          description: "Part of an on going look a stream based motion system",
          href: "https://jamieowen.github.io/packages/",
          image:
            "https://buffer.com/library/content/images/size/w1200/library/wp-content/uploads/2016/06/giphy.gif",
        },
      ],
    },
    {
      href: "https://www.npmjs.com/package/@jamieowen/webgl",
      title: "@jamieowen/webgl",
      examples: [
        {
          slug: "gpgpu-state",
          title: "GPGPU State",
          description:
            "State management abstractions for maintainting GPU state.",
          href: "https://jamieowen.github.io/packages/",
          image:
            "https://buffer.com/library/content/images/size/w1200/library/wp-content/uploads/2016/06/giphy.gif",
        },
        {
          slug: "gpgpu-particles",
          title: "GPGPU Particles",
          description:
            "GPU based particle system. Composable functions for emitters, forces & behaviours, written in @thi.ng/shader-ast ",
          href: "https://jamieowen.github.io/packages/",
          image:
            "https://buffer.com/library/content/images/size/w1200/library/wp-content/uploads/2016/06/giphy.gif",
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
