import * as React from 'react';

import { Box, Typography } from '@mui/material';
import PageHeader from './PageHeader';
import NavDrawer from './NavDrawer';

type P = {
    title: string,
};

export function PageContainer(props: React.PropsWithChildren<P>) {
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", height: '100vh' }}>
            <Box sx={{ display: 'flex', flexGrow:1, m: 0, p: 0 }}>
                <NavDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0, height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ justifyContent: 'flex-start' }}>
                            <PageHeader title={props.title} />
                        </Box>
                        <Box sx={{ justifyContent: 'center', flexGrow: 1 }}>
                            {props.children}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ justifyContent: 'flex-end', border: 0, py: 1, mb: 0, ml: 0, mr: 0, bgcolor: 'primary.main', color: 'motionPoint.contrastText' }}>
                <center>
                    <Typography variant='body2'>© MotionPoint Corporation 2024.  All Rights Reserved.</Typography>
                </center>
            </Box>
        </Box >

    );
}

