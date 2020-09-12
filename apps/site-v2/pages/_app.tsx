import { FC } from 'react';
import { PageRoot } from '../components/PageRoot';

export const ApplicationRoot:FC<any> = (
  { Component, pageProps }
)=>{

  return (
    <PageRoot>
      <Component {...pageProps} />
    </PageRoot>
  )

}

export default ApplicationRoot;