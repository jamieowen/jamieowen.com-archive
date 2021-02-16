import { FC, Fragment, useLayoutEffect, useMemo } from "react";
import App, { AppProps } from "next/app";
import Head from "next/head";
import theme from "../components/theme";
import {
  ContentContainer,
  Footer,
  Header,
  Menu,
  NavigationDataProvider,
  // SidePanel,
  WeatherProvider,
  ProjectMDXWrapper,
  FooterCopyright,
  FooterNavigation,
  isProjectsPage,
  // Navigation,
} from "../components/common";
import { ThemeProvider } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";

import "styles/globals.css";
import { useColorMode } from "theme-ui";
import { ScrollProvider } from "components/context/ScrollContext";

const Fonts = () => {
  return (
    <Fragment>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
        rel="stylesheet"
      />
    </Fragment>
  );
};

const MyApp: FC<AppProps> = ({ Component, router, children, pageProps }) => {
  const projectsPage = isProjectsPage();
  return (
    <Fragment>
      <Head>
        <title>jamieowen.com</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Fonts />
      </Head>
      <Providers>
        <Header>
          <Menu />
          {/* <SidePanel /> */}
          {/* <FooterCopyright className="opq5" copyright={false} /> */}
        </Header>
        <ContentContainer>
          <Component {...pageProps} />
          {!projectsPage && (
            // See ProjectsMDX Wrapper.
            <Footer>
              <FooterNavigation />
              <FooterCopyright />
            </Footer>
          )}
        </ContentContainer>
      </Providers>
    </Fragment>
  );
};

const ColorSwitch: FC<{}> = () => {
  const [, setColor] = useColorMode();
  useLayoutEffect(() => {
    setColor("blue");
  }, []);
  return <Fragment />;
};

const Providers: FC<{ pageProps?: any }> = ({ children, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider
        components={{
          wrapper: ProjectMDXWrapper,
        }}
      >
        <ScrollProvider>
          <ColorSwitch />
          <WeatherProvider>
            <NavigationDataProvider>{children}</NavigationDataProvider>
          </WeatherProvider>
        </ScrollProvider>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default MyApp;
