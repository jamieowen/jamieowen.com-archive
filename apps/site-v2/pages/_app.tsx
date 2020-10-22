import { FC, useContext } from "react";
import { PageRoot } from "../components/PageRoot";
import { Heading } from "theme-ui";
import { writing } from "../services/require-pages";
import { NextPageContext } from "next";
import App from "next/app";
import { fetchPages } from "../services/fetch-pages";
import { Navigation } from "../components/navigation";

const MyApp: FC<any> = ({ Component, pages, router }) => {
  return (
    <PageRoot>
      <Navigation items={pages.pages} />
      <Component />
    </PageRoot>
  );
};

// @ts-ignore
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const pages = await fetchPages();
  return {
    ...appProps,
    pages,
  };
};

export default MyApp;

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
