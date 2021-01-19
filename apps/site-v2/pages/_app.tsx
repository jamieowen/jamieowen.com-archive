import { FC, Fragment } from "react";
import App, { AppProps } from "next/app";
import Head from "next/head";
import theme from "../components/theme";
import { Footer, Navigation } from "../components/common";
import { ThemeProvider } from "theme-ui";
// import { Scheduler, LayoutObserver } from "@jamieowen/motion-layout";
// import { MatterProvider } from "../components/physics/MatterContext";
// import { IntersectionProvider } from "../components//motion/IntersectionContext";
// import { GenerativeGridProvider } from "../components/generative-grid";

import "styles/globals.css";
import { ColorContextProvider } from "../components/context/ColorContext";
import { AppStateContextProvider } from "components/context/AppStateContext";

const Fonts = () => {
  return (
    <Fragment>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Work+Sans:wght@300;400;600;700&display=swap"
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
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=yes, minimum-scale=1.0, maximum-scale=1.0"
        ></meta>
        <Fonts />
      </Head>
      <AppStateContextProvider>
        <ThemeProvider theme={theme}>
          <ColorContextProvider>
            {/* <Scheduler> */}
            {/* <Navigation /> */}
            {/* <LayoutObserver rootMargin="-10% 0%"> */}
            <Component {...pageProps} />
            {/* </LayoutObserver> */}
            {/* <Footer /> */}
            {/* </Scheduler> */}
          </ColorContextProvider>
        </ThemeProvider>
      </AppStateContextProvider>
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
