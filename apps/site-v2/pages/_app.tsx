import { FC, Fragment, useEffect, useLayoutEffect, useMemo } from "react";
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
  ContentIFrame,
  // Navigation,
} from "../components/common";
import { Styled, Text, ThemeProvider } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";

import "styles/globals.css";
import { useColorMode } from "theme-ui";
import { ScrollProvider } from "components/context/ScrollContext";
import { useRouter } from "next/router";

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

const Soon = () => {
  return (
    <Text sx={{ margin: "32px" }}>
      Undergoing refurbishment.{" "}
      <Text as="span" sx={{ fontSize: "24px" }}>
        👍
      </Text>
    </Text>
  );
};

const DevSwitch = ({ children, path }) => {
  // const dev = process.env.NODE_ENV === "development";
  const dev = true; //path !== "/";
  return <Fragment>{dev ? children : <Soon />}</Fragment>;
};

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
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
        <ContentSwitch>
          <Component {...pageProps} />
        </ContentSwitch>
      </Providers>
    </Fragment>
  );
};

const ContentSwitch: FC<{}> = ({ children }) => {
  const router = useRouter();
  return (
    <DevSwitch path={router.asPath}>
      {router.asPath.includes("/packages/") ||
      router.asPath.includes("/play/") ? (
        <FullScreenContent>{children}</FullScreenContent>
      ) : (
        <RegularSiteContent>{children}</RegularSiteContent>
      )}
    </DevSwitch>
  );
};

const RegularSiteContent: FC<any> = ({ children }) => {
  const projectsPage = isProjectsPage();
  return (
    <Fragment>
      {/* <ContentIFrame src="" enabled={false} pointerEvents={false} /> */}
      {/* <Header>
        <Menu />
        {/* <SidePanel /> */}
      {/* <FooterCopyright className="opq5" copyright={false} /> */}
      {/* </Header> */}
      <ContentContainer>
        {children}
        {/* {!projectsPage && (
          // See ProjectsMDX Wrapper.
          <Footer>
            <FooterNavigation />
            <FooterCopyright />
          </Footer>
        )} */}
      </ContentContainer>
    </Fragment>
  );
};

const FullScreenContent: FC<any> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

const ColorSwitch: FC<{}> = () => {
  const [, setColor] = useColorMode();
  useEffect(() => {
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
