import { ApiImage } from '@backend/apitypes';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import ImageGeneratorForm from './ImageGeneratorForm';

type PageProps = {
    onBackgroundSet: (newBackground: ApiImage | null) => void
}

const rightWidth = 400;


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const BackgroundMaker = (props: PageProps) => {
    const [image, setImage] = useState<ApiImage | null>(null);
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function handleImageGenerate(prompt: string, imageAspectRatio: ImageAspectRatio): void {
        throw new Error('Function not implemented.');
    }


    const renderImage = () => {
        return (
            <Box>
                {image && <Box component="img" src={image.imgUrl} />}
                {image == null &&
                    <Box sx={{ border: 1, width: 500, height: 500 }}>
                        <center><Typography variant="body1">No Image Set</Typography></center>
                    </Box>
                }
            </Box>
        );
    }
    const renderTabPanel = () => {

        return (
            <Box width="100%">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Library" {...a11yProps(0)} />
                        <Tab label="From Text" {...a11yProps(1)} />
                        <Tab label="Patterns" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    Search Library
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ImageGeneratorForm onGenerate={handleImageGenerate} generateButtonDisabled={false} showTitle={false}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
            </Box>
        );
    }
    return (
        <Stack direction="row">
            <Box flexGrow={1}>
                {renderImage()}
            </Box>
            <Box sx={{ width: rightWidth }}>
                {renderTabPanel()}
            </Box>

        </Stack>

    );
}