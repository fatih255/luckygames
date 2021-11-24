import { ReactElement, ReactNode, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import type { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../customtw.css';
import LayoutWrapper from '../layouts/LayoutWrapper';
import { store } from '../redux/store';


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  return <Provider store={store}>
    <LayoutWrapper {...pageProps}>
      <Component {...pageProps} />
    </LayoutWrapper>
  </Provider>
}


export default MyApp
