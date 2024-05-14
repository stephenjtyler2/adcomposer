'use client'

import React, { useState } from 'react';
import { PageProps } from '@/.next/types/app/layout';
import { PageContainer } from '@/components/scaffold/PageContainer';
import { Box, Stack, } from '@mui/material';
import LibrarySearch from '@/components/controlledFormFields/LibrarySearch';
import { ApiLibrarySearchResults } from '@backend/apitypes';
import LibrarySearchResults from '@/components/LibrarySearchResults';
import CreateStaticAdWizard from './CreateStaticAdWizard';

type MainViewContents = "Ad" | "SearchResults";
const rightWidth = 0;//400;

export default function Page(props: PageProps) {
  console.log(props);

  const [searchResults, setSearchResults] = useState<ApiLibrarySearchResults>({ images: [], ads: [] });
  const [mainView, setMainView] = useState<MainViewContents>("Ad");

  const handleSearchResults = (results: ApiLibrarySearchResults) => {
    setSearchResults(results);
    setMainView("SearchResults");
  }

  const renderMainPanel = () => {
    return (
      <Stack direction="column" sx={{ height: "100%", }}>
        <Box sx={{ mb: 1 }}>
          <LibrarySearch assetTypeFilters={['Static Ad']} onSearchResults={handleSearchResults} />
        </Box>
        <Box sx={{ border: 2, borderRadius: 2, borderColor: "motionPoint.borders", p: 1, flexGrow: 1 }}>
          {mainView == "Ad" && <CreateStaticAdWizard/>}
          {mainView == "SearchResults" && <LibrarySearchResults results={searchResults} />}
        </Box>
      </Stack>

    );

  }
  const renderSideBar = () => (<></>);

  return (
    <PageContainer title="Static Ads">
      <Stack direction="row" sx={{ width: "100%", height: '100%' }}>
        <Box id="box-left" sx={{ flexGrow: 1, p: 1, mx: 1, mb: 1, border: 1, borderRadius: 2, borderColor: "motionPoint.borders", backgroundColor: "motionPoint.mainPanelBackground" }}>
          {renderMainPanel()}
        </Box>
        <Box id="box-right" sx={{ minWidth: rightWidth, ml: 1, mb: 0 }}>
          {0==0 && renderSideBar()}
        </Box>
      </Stack>

    </PageContainer>
  );
}