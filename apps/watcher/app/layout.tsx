'use client';

import React from 'react';
import SWRConfig from '@rosen-ui/swr-mock';

import { NoSsr, styled } from '@rosen-bridge/ui-kit';

import SideBar from './SideBar';
import Toolbar from './Toolbar';

import ThemeProvider from '@/_theme/ThemeProvider';

import mockedData from './_mock/mockedData';

const Root = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.secondary.dark,
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${theme.palette.gradient.a} 0%, ${theme.palette.gradient.b} 20%, ${theme.palette.gradient.c} 40%, ${theme.palette.gradient.d} 60%, ${theme.palette.gradient.e} 80%, ${theme.palette.gradient.f} 100%)`
      : 'none',
  [theme.breakpoints.down('tablet')]: {
    flexDirection: 'column',
    backgroundImage:
      theme.palette.mode === 'light'
        ? `linear-gradient(90deg, ${theme.palette.gradient.a} 0%, ${theme.palette.gradient.b} 20%, ${theme.palette.gradient.c} 40%, ${theme.palette.gradient.d} 60%, ${theme.palette.gradient.e} 80%, ${theme.palette.gradient.f} 100%)`
        : 'none',
  },
}));

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  minHeight: '100%',
  backgroundColor: theme.palette.background.default,
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderBottomLeftRadius: theme.shape.borderRadius * 2,
  paddingTop: theme.shape.borderRadius,
  paddingBottom: theme.shape.borderRadius * 3,
  paddingLeft: theme.shape.borderRadius * 2,
  paddingRight: theme.shape.borderRadius * 2,

  [theme.breakpoints.down('tablet')]: {
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: theme.shape.borderRadius * 2,
    borderBottomLeftRadius: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.shape.borderRadius * 6,
  },
}));

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    /**
     * TODO: get `lang` from url language path segment
     *
     * https://git.ergopool.io/ergo/rosen-bridge/ui/-/issues/13
     */
    <html lang="en">
      <body>
        <NoSsr>
          <ThemeProvider>
            <Root>
              <SideBar />
              <SWRConfig
                useMockedApis={
                  process.env.NEXT_PUBLIC_USE_MOCKED_APIS === 'true'
                }
                fakeData={mockedData}
              >
                <Main>
                  <Toolbar />
                  {children}
                </Main>
              </SWRConfig>
            </Root>
          </ThemeProvider>
        </NoSsr>
      </body>
    </html>
  );
};

export default RootLayout;
