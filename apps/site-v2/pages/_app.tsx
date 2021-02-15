import { FC, Fragment } from "react";
import App, { AppProps } from "next/app";
import Head from "next/head";
import theme from "../components/theme";
import { Footer, Navigation } from "../components/common";
import { ThemeProvider } from "theme-ui";
// import { MatterProvider } from "../components/physics/MatterContext";
// import { IntersectionProvider } from "../components//motion/IntersectionContext";
// import { GenerativeGridProvider } from "../components/generative-grid";

const Fonts = () => {
  return (
    <Fragment>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Work+Sans:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
    </Fragment>
  );
};

const MyApp: FC<AppProps> = ({ Component, router, children, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Page Root</title>
        <link rel="icon" href="/favicon.ico" />
        <Fonts />
      </Head>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
};

// @ts-ignore
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   const pages = []; //await fetchPages();
//   return {
//     ...appProps,
//     pages,
//   };
// };

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
