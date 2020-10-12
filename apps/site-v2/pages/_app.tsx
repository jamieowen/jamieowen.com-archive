import { FC, useContext } from "react";
import { PageRoot } from "../components/PageRoot";
import { Heading } from "theme-ui";
import { writing } from "../services/require-pages";
import { NextPageContext } from "next";

const App: FC<any> = ({ Component, pageProps, ...rest }) => {
  console.log("Writing :", writing);
  return (
    <PageRoot>
      <Heading as="h1">A Title for Everyone!</Heading>
      <Component {...pageProps} />
    </PageRoot>
  );
};

// @ts-ignore
App.getInitialProps = (ctx: NextPageContext) => {
  if (ctx.req) {
  }
};

export default App;

/**
 *
 * FUCKING BLOG???
 *
 *
 * https://github.com/vercel/next.js/tree/canary/examples/blog-starter/pages
 * https://github.com/hashicorp/next-mdx-enhanced
 * https://github.com/hashicorp/next-mdx-remote
 * https://stackoverflow.com/questions/54059179/what-is-require-context
 * https://johnpolacek.com/building-a-blog-with-nextjs-and-mdx
 * https://www.smashingmagazine.com/2020/09/build-blog-nextjs-mdx/
 * https://nextjs.org/learn/basics/data-fetching
 *
 * https://github.com/gvergnaud/nextjs-dynamic-routes
 * https://github.com/vercel/next.js/issues/2131
 *
 * https://www.npmjs.com/package/worker-farm
 *
 *
 */
