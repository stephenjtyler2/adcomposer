'use client';

import dynamic from 'next/dynamic'

import "./globals.css";

import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/config/theme';
import type { AppProps } from "next/app";
import createEmotionCache from '@/config/createEmotionCache';
import AuthContextProvider from "@/components/AuthContextProvider";

const AppContextProvider = dynamic(() => import('../components/AppContextProvider'), {
  ssr: false, // dynamic import forces the render to ONLY happen client side
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const emotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>AdComposer</title>
        <meta name="description" content="AdComposer" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppContextProvider>
          <AuthContextProvider>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
              </ThemeProvider>
            </CacheProvider>
          </AuthContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
