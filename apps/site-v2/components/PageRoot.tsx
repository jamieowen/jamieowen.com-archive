import { FC, Fragment } from 'react';
import Head from 'next/head';
import theme from './theme';
import { ThemeProvider } from 'theme-ui';

/**
 * Wraps the top level next.js _app component.
 * So defines the top level HOC across all pages.
 * 
 * @param param0
 */
export const PageRoot:FC<any> = ({
  children
})=>{

  return (
    <Fragment>
      <Head>
        <title>Page Root</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </Fragment>
  )

}