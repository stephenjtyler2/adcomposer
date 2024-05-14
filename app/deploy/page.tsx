'use client'

import * as React from 'react';
import { PageProps } from '@/.next/types/app/layout';
import { PageContainer } from '@/components/scaffold/PageContainer';

export default function Page(props: PageProps) {
  console.log(props);
  return (
    <PageContainer title="Deploy"/>
  );
}