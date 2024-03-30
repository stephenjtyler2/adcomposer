'use client';

import { Inter } from "next/font/google";
import "./globals.css";
// import { Metadata } from 'next';

import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/lib/client/config/theme';
import type {AppProps} from "next/app";
import createEmotionCache from '@/lib/client/config/createEmotionCache';
/*
export const metadata: Metadata = {
  title: "MotionPoint AdComposer",
  description: "Build and deploy ads at scale",
  viewport: "initial-scale=1, width=device-width"
}
*/
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const emotionCache = createEmotionCache();

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
