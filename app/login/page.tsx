'use client'
import React, { useEffect, useState , useContext} from 'react';

import { Typography, Box, Stack, TextField, Button, Container } from '@mui/material';
import { AppContext} from '@/components/AppContextProvider';
import { authenticateWithCreds } from '@/components/apiClient/auth';
import { AuthContext } from '@/components/AuthContextProvider';
import { redirect } from 'next/navigation';

const title = "Ad Composer"
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {tenantId, tenantName} = useContext(AppContext);
    const {user, userLoggedIn} = useContext(AuthContext);

    useEffect(()=>{
        console.log(`Login: useEffect = tenantId is ${tenantId}`);
    },[tenantId, tenantName]);


    // we are logged in already, redirect to /home
    if (user) {
        console.log("login: user already logged in, redirecting to home");
        redirect('/home');
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        authenticateWithCreds(username,password)
        .then(user=> {
            if (user) {
                console.log('login: user authenticated');
                // console.log(user);
                userLoggedIn(user);
            }
            else {
                console.log('login: user auth failed');
            }
        })
    };

    
    // console.log(`Login render: tenantId: ${tenantId}`);

    if (tenantId==-1) return (<></>); // suppress the initial render that happens before the app context is loaded

    return (
        <Container component="main" maxWidth="xs" sx={{ border: 1, mt: 8 }}>
            <Stack direction="column" sx={{ m: 2, alignItems: 'center' }}>
                <Typography variant="h4">{`${title}`}</Typography>
                <Typography variant="body1">{`${tenantName}`}</Typography>
                <Box sx={{ mt: 1, width: "100%" }}>
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 0, my: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Stack>
        </Container>
    );
};

export default Login;
