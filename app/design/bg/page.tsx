'use client'

import React, {useState} from 'react';
import { PageProps } from '@/.next/types/app/layout';
import { PageContainer} from '@/lib/client/components/PageContainer';
import { Box , Typography} from '@mui/material';
import ImageGeneratorForm from './ImageGeneratorForm';

const leftWidth = 320;

export default function Page(props: PageProps) {

  const generateImage = (prompt:string) => {
    alert(prompt);

  }

  const renderLeftPanelContent = () => (<>
    <ImageGeneratorForm onGenerate = {generateImage}/>
  </>);

  const renderRightPanelContent = () => (
    <Box>
      <Typography variant='body1'>Rest Here</Typography>
    </Box>
  );

  return (
    <PageContainer title="Background Designer">
      <Box sx={{ display: 'flex', height:'100%' }}>
        <Box id="box-left" sx={{ border:1, width: leftWidth , mx:1, mb:1}}>
          {renderLeftPanelContent()}
        </Box>
        <Box id="box-right" sx={{ border:1, flexGrow: 1, mx:1, mb:1}}>
          {renderRightPanelContent()}
        </Box>
      </Box>
    </PageContainer>
  );
}