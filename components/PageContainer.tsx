import React, { useContext } from 'react';
import { redirect } from "next/navigation";

import { Box, Typography } from '@mui/material';
import PageHeader from './PageHeader';
import NavDrawer from './NavDrawer';
import { AuthContext } from './AuthContext';

type P = {
    title: string,
};

export function PageContainer(props: React.PropsWithChildren<P>) {
    // extracting data from usesession as session
    const authContext = useContext(AuthContext);

    // checking if sessions exists - any page wrapped in this component is required to be logged in.
    if (!authContext.user) {
        console.log('PageContainer: no logged in user, redirecting to /login');
        redirect('/login');
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", height: '100vh' }}>
            <Box sx={{ display: 'flex', flexGrow: 1, m: 0, p: 0 }}>
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

