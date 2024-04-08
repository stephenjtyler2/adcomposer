'use client'

import React, { useState } from 'react';
import { PageProps } from '@/.next/types/app/layout';
import { PageContainer } from '@/lib/client/components/PageContainer';
import ImageViewer from './ImageViewer';
import { Box, Divider, Stack } from '@mui/material';
import ImageGeneratorForm from './ImageGeneratorForm';
import { generateImage as ApiGenerateImage } from '@/lib/client/apiClient/image';
import { ImageAspectRatio, ImageInfo } from '@backend/apitypes';
import LibrarySearch from '@/lib/client/components/controlledFormFields/LibrarySearch';
import Recents from './Recents';
import FileUploader from '@/lib/client/components/FileUploader';

import { deleteImage } from '@/lib/client/apiClient/image';
import { addImageToLibrary } from '@/lib/client/apiClient/image';

const rightWidth = 400;
const noImageText = 'Search the library, upload or generate a new background.'

export default function Page() {

  const [imageGenerationPending, setImageGenerationPending] = useState(false);
  const [imageInfo, setImageInfo] = useState<ImageInfo | undefined>(undefined);

  const handleFileUploaded = (imageInfo: ImageInfo) => {
    console.log("file uploaed");
    console.log(imageInfo);
    setImageInfo(imageInfo);
  }

  const handleDeleteImage = async () => {
    if (imageInfo && imageInfo.id) {
      const success: boolean = await deleteImage(imageInfo.id);
      if (success) {
        console.log("delete succeeded");
        setImageInfo(undefined);
      }
      else {
        console.log("delete failed");
      }
    }
  }
  const handleSaveImageToLibrary = async () => {
    if (imageInfo && imageInfo.id) {
      const response = await addImageToLibrary(imageInfo.id);
      if (response && response.ok) {
        const imgInfo = await response.json();
        setImageInfo(imgInfo as ImageInfo);
      }
      else {
        console.log("add to library failed");
        console.log(response);
      }
    }
  }

  const generateImage = async (prompt: string, aspectRatio: ImageAspectRatio) => {
    setImageGenerationPending(true);
    try {
      const response = await ApiGenerateImage(prompt, aspectRatio);
      if (!response.ok) {
        console.log("Fetch of generated image failed");
        console.log(response);
        setImageGenerationPending(false);
      }
      else {
        const imgInfo = await response.json();
        setImageInfo(imgInfo as ImageInfo);
        setImageGenerationPending(false);
      }
    }
    catch (error) {
      console.log(error);
      setImageGenerationPending(false);
    }
  }


  function renderSideBar() {
    return (
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column", border: 2, borderColor: "motionPoint.borders", mr: 2, p: 1 }}>
        <Box sx={{ mb: 2 }}>
          <ImageGeneratorForm onGenerate={generateImage} generateButtonDisabled={imageGenerationPending} />
        </Box>
        <Divider />
        <Box sx={{ mt: 2, flexGrow: 1 }}>
          <Recents />
        </Box>
      </Box>

    );
  }
  //      <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column', border: 0, flexGrow: 1, p: 0, justifyContent: "center" }}>

  function renderMainPanel() {
    return (
      <Stack direction="column" sx={{ height: "100%", }}>
        <Stack direction="row" sx={{ mb: 1 }} alignItems="center">
          <Box sx={{ mr: 1 }}>
            <FileUploader onUploadSuccess={handleFileUploaded} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <LibrarySearch assetTypeFilter='Backgrounds' />
          </Box>
        </Stack>
        <Box sx={{ border: 2, p: 1, borderColor: "motionPoint.borders", flexGrow: 1 }}>
          <ImageViewer
            imageInfo={imageInfo}
            imageGenerationPending={imageGenerationPending}
            noImageText={noImageText}
            onSaveToLibrary={handleSaveImageToLibrary}
            onRemoveFromLibrary={handleDeleteImage} />
        </Box>
      </Stack>
    );
  }

  return (
    <PageContainer title="Background Designer">
      <Stack direction="row" sx={{ width: "100%", height: '100%' }}>
        <Box id="box-left" sx={{ border: 0, flexGrow: 1, mx: 1, mb: 1 }}>
          {renderMainPanel()}
        </Box>
        <Box id="box-right" sx={{ border: 0, minWidth: rightWidth, ml: 1, mb: 1 }}>
          {renderSideBar()}
        </Box>
      </Stack>
    </PageContainer>
  );
}