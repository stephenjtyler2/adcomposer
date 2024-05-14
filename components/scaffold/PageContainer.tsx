import React, { useContext, useEffect, useState } from 'react';
import { redirect } from "next/navigation";

import { Box, Stack, Typography } from '@mui/material';
import PageHeader from './PageHeader';
import NavDrawer from './NavDrawer';
import { AuthContext } from '../contexts/AuthContext';
import { keepAlive } from '../apiClient/auth';


type P = {
    title: string,
};

const keepAliveIntervalDefault="5"; // minutes
const keepAliveInterval = parseInt(process.env.NEXT_PUBLIC_KEEP_ALIVE_INTERVAL||keepAliveIntervalDefault) * 60 * 1000;  // milliseconds

// Container in which all authenticated pages are contained.    Provides the app scaffolding (nav, appbar, footer).
export function PageContainer(props: React.PropsWithChildren<P>) {
    // extracting data from usesession as session
    const authContext = useContext(AuthContext);
    const [keepAliveTime, setKeepAliveTime] = useState<number>(Date.now());

    // This useEffect hook will run every keepAliveInterval milliseconds and will call keepalive
    // This will ensure that if the access token expires, the refresh token gest used to generate a new one
    // so that when the user returns to the session, they will be able to resume their session and not get 
    // redirected to login (which would happen if they were to make an api request with both access and refresh tokens expired.)
    useEffect(() => {
        const timeoutId = setTimeout(() => setKeepAliveTime(Date.now()), keepAliveInterval);
        if (authContext.user) {
            // console.log("PageContainer:useEffect processing keep alive");
            keepAlive(authContext)
            .catch(e => {
                console.log("Exception in keep alive");
            });
        }

        // Return function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [keepAliveTime])

    // checking if sessions exists - any page wrapped in this component is required to be logged in.
    if (!authContext.user) {
        console.log('PageContainer: no logged in user, redirecting to /login');
        redirect('/login');
    }

    return (
        <Stack sx={{ height: '100vh', bgcolor: "motionPoint.appBackground" }}>
            <Stack direction="row" sx={{ flexGrow: 1, m: 0, p: 0 }}>
                <NavDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0, height: '100%' }}>
                    <Stack sx={{ height: '100%' }}>
                        <Box sx={{ justifyContent: 'flex-start' }}>
                            <PageHeader title={props.title} />
                        </Box>
                        <Box sx={{ justifyContent: 'center', flexGrow: 1 }}>
                            {props.children}
                        </Box>
                    </Stack>
                </Box>
            </Stack>
            <Box sx={{ justifyContent: 'flex-end', border: 0, py: 1, mb: 0, mx: 0, bgcolor: 'primary.main', color: 'motionPoint.contrastText' }}>
                <center>
                    <Typography variant='body2'>© MotionPoint Corporation 2024.  All Rights Reserved.</Typography>
                </center>
            </Box>
        </Stack >
    );
}

