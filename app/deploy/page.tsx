'use client'

import * as React from 'react';
import { Typography } from '@mui/material';
import { PageProps } from '@/.next/types/app/layout';

export default function Page(props: PageProps) {
  console.log(props);
  return (
    <>
        <ResponsiveAppBar/>
        <Typography variant="h1">Deploy</Typography>
    </>
  );
}