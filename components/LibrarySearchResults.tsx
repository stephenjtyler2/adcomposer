import React from 'react';
import { Box, Grid, Typography, Stack } from '@mui/material';
import { ApiLibrarySearchResults } from '@backend/apitypes';


export type Props = {
    results: ApiLibrarySearchResults
}

export default function LibrarySearchResults({results}: Props) {

    const renderNoResults = () => (
        <Stack direction="row" justifyContent = "center" alignItems = "center" sx = {{width:"100%", height: "100%"}}>
            <Typography variant = "body1">Search Found No Results</Typography>
        </Stack>
    )
    const renderResults =() => (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {results.images.map((image) => (
                <Grid item xs={2}>
                    <Box component="img" sx={{ maxWidth: 250, maxHeight: 250 }} src={image.imgUrl}/>
                </Grid>
            ))
            }
            {results.ads.map((ad) => (
                <Grid item xs={2}>
                    <Box component="img" sx={{ maxWidth: 250, maxHeight: 250 }} src={ad.name}/>
                </Grid>
            ))
            }
        </Grid>
    );

    console.log("Render Search Results");
    return (results && (results.images.length>0 || results.ads.length>0) ? renderResults(): renderNoResults())
}