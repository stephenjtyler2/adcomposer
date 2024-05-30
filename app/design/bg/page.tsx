'use client'

import React, { useContext, useState } from 'react';
import { PageContainer } from '@/components/scaffold/PageContainer';
import ImageViewer from './ImageViewer';
import { Box, Divider, Stack } from '@mui/material';
import ImageGeneratorForm from '../ImageGeneratorForm';
import { generateImage as ApiGenerateImage } from '@/components/apiClient/image';
import { ImageAspectRatio, ApiImage, ApiLibrarySearchResults } from '@backend/apitypes';
import LibrarySearch from '@/components/controlledFormFields/LibrarySearch';
import Recents from './Recents';
import FileUploader from '@/components/FileUploader';

import { deleteImage } from '@/components/apiClient/image';
import { addImageToLibrary } from '@/components/apiClient/image';
import ImageSearchResults from '@/components/LibrarySearchResults';
import { AuthContext } from '@/components/contexts/AuthContext';
import LibrarySearchResults from '@/components/LibrarySearchResults';

const rightWidth = 400;
const noImageText = 'Search the library, upload or generate a new background.'

type MainViewContents = "Image" | "SearchResults";

export default function Page() {

  const [imageGenerationPending, setImageGenerationPending] = useState(false);
  const [imageInfo, setImageInfo] = useState<ApiImage | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<ApiLibrarySearchResults>({images: [], ads: []});
  const [mainView, setMainView] = useState<MainViewContents>("Image");

  const authContext = useContext(AuthContext);

  const handleFileUploaded = (imageInfo: ApiImage) => {
    console.log("file uploaed");
    console.log(imageInfo);
    setImageInfo(imageInfo);
    setMainView("Image");
  }

  const handleDeleteImage = async () => {
    if (imageInfo && imageInfo.id) {
      const success: boolean = await deleteImage(authContext, imageInfo.id);
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
      const response = await addImageToLibrary(authContext, imageInfo.id);
      if (response && response.ok) {
        const imgInfo = await response.json();
        setImageInfo(imgInfo as ApiImage);
      }
      else {
        console.log("add to library failed");
        console.log(response);
      }
    }
  }

  const handleSearchResults=(results: ApiLibrarySearchResults) => {
    setSearchResults(results);
    setMainView("SearchResults");
  }

  const generateImage = async (prompt: string, aspectRatio: ImageAspectRatio) => {
    setMainView("Image");
    setImageGenerationPending(true);
    try {
      const response = await ApiGenerateImage(authContext, prompt, aspectRatio);
      if (!response.ok) {
        console.log("Fetch of generated image failed");
        console.log(response);
        setImageGenerationPending(false);
      }
      else {
        const imgInfo = await response.json();
        setImageInfo(imgInfo as ApiImage);
        setImageGenerationPending(false);
      }
    }
    catch (error) {
      console.log(error);
      setImageGenerationPending(false);
    }
  }

  //        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", border: 2, borderColor: "motionPoint.borders", mr: 2, p: 1 }}>

  function renderSideBar() {
    return (
      <Stack sx={{ height: "100%", borderLeft:0, borderColor: "motionPoint.borders", px:1 }}>  
        <Box sx={{ p:2, alignSelf: "end" }}>
          <FileUploader onUploadSuccess={handleFileUploaded} />
        </Box>
        <Divider />
        <Box sx={{ border: 0, borderColor: "motionPoint.borders", p:1, my:2 }}>
          <ImageGeneratorForm showTitle={true} onGenerate={generateImage} generateButtonDisabled={imageGenerationPending} />
        </Box>
        <Divider />
        <Box sx={{ flexGrow:1, border: 0, borderColor: "motionPoint.borders", p:1 }}>
          <Recents />
        </Box>
      </Stack >

    );
  }

  function renderMainPanel() {
    return (
      <Stack direction="column" sx={{ height: "100%", }}>
        <Box sx={{mb:1}}>
          <LibrarySearch assetTypeFilters={['Background']} onSearchResults = {handleSearchResults}/>
        </Box>
        <Box sx={{ border:2, borderRadius: 2, borderColor: "motionPoint.borders", p: 1, flexGrow: 1 }}>
          {mainView=="Image" && 
          <ImageViewer
            imageInfo={imageInfo}
            imageGenerationPending={imageGenerationPending}
            noImageText={noImageText}
            onSaveToLibrary={handleSaveImageToLibrary}
            onRemoveFromLibrary={handleDeleteImage} />
          }
          {mainView =="SearchResults" && <LibrarySearchResults results = {searchResults} />}
        </Box>
      </Stack>
    );
  }

  return (
    <PageContainer title="Backgrounds">
      <Stack direction="row" sx={{ width: "100%", height: '100%' }}>
        <Box id="box-left" sx={{ flexGrow: 1, p:1, mx: 1, mb: 1, border:1, borderRadius:2, borderColor: "motionPoint.borders", backgroundColor:"motionPoint.mainPanelBackground" }}>
          {renderMainPanel()}
        </Box>
        <Box id="box-right" sx={{ minWidth: rightWidth, ml: 1, mb: 0 }}>
          {renderSideBar()}
        </Box>
      </Stack>
    </PageContainer>
  );
}